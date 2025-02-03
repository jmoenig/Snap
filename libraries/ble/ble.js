function BLEController (stage) {
    this.init(stage);
};

BLEController.prototype.init = function (stage) {
    this.stage = stage;
    this.connected = false;
    this.device = undefined;
    this.rx_char = undefined;
    this.sendInProgress = false;
    this.lastReceiveTime = Date.now();
    this.buffer = [];
    this.snapBLEprocessBlockDef =
        this.stage.globalBlocks.find(
            def => def.spec == '__mb_process_data__'
        );
};

BLEController.prototype.connect = async function (serviceUUID, rxUUIX, txUUID) {
    var newDev = await navigator.bluetooth.requestDevice({
        filters: [{ services: [ serviceUUID ] }]
    });

    if (this.device != newDev) {
        newDev.addEventListener(
            'gattserverdisconnected',
            this.onDisconnect.bind(this)
        );
    }

    this.device = newDev;

    const server = await this.device.gatt.connect();
    const service = await server.getPrimaryService(serviceUUID);
    this.rx_char = await service.getCharacteristic(rxUUIX);
    const tx_char = await service.getCharacteristic(txUUID);
    await tx_char.startNotifications();

    // bind overrides the default this=tx_char to this=the NimBLESerial
    tx_char.addEventListener(
        'characteristicvaluechanged',
        this.onReceive.bind(this)
    );

    this.sendInProgress = false;
    this.connected = true;
};

BLEController.prototype.onReceive = function (event) {
    world.schedule(
        () => this.processData(new Uint8Array(event.target.value.buffer))
    );
};

BLEController.prototype.processData = function (data) {
    this.buffer.push(...data);
    if (this.snapBLEprocessBlockDef) {
        var block = this.snapBLEprocessBlockDef.blockInstance();
        if (block) {
            block.parent = this.stage;
            try {
                invoke(
                    block,
                    null,       // args
                    this.stage  // receiver
                );
            } catch (err) {
                throw(err);
            }
        }
    }
};

BLEController.prototype.onDisconnect = function (event) {
    this.connected = false;
};

BLEController.prototype.write = async function (data) {
    this.sendInProgress = true;
    // try to send the given data
    try {
        await this.rx_char.writeValue(data);
        this.sendInProgress = false;
        return;
    } catch (error) {
        // for now: print the error but keep trying to send
        // later: check error an give up if BLE disconnected
        throw new Error(error);
    }
};

BLEController.prototype.disconnect = function () {
    this.connected = false;
    if (this.device != undefined) {
        this.device.gatt.disconnect();
    }
    this.rx_char = undefined;
};

SnapExtensions.primitives.set(
    'ble_connect(serviceUUID, rxUUIX, txUUID)',
    function (serviceUUID, rxUUIX, txUUID) {
        var stage = this.parentThatIsA(StageMorph);
        if (!stage.ble) { stage.ble = new BLEController(stage); }
        stage.ble.connect(serviceUUID, rxUUIX, txUUID);
    }
);

SnapExtensions.primitives.set(
    'ble_disconnect()',
    function () {
        var stage = this.parentThatIsA(StageMorph);
        stage.ble?.disconnect();
    }
);

SnapExtensions.primitives.set(
    'ble_connected()',
    function () {
        var stage = this.parentThatIsA(StageMorph);
        return ((stage.ble?.device != undefined) && (stage.ble?.connected));
    }
);

SnapExtensions.primitives.set(
    'ble_read()',
    function () {
        var ble = this.parentThatIsA(StageMorph).ble;
        if (ble) {
            var buf = ble.buffer;
            ble.buffer = [];
            return new List(buf);
        }
        return new List();
    }
);

SnapExtensions.primitives.set(
    'ble_write(data)',
    function (data) {
        var ble = this.parentThatIsA(StageMorph).ble;
        if (ble && !ble.sendInProgress) {
            // Write the given data (a Uint8Array) and return the number of bytes written.
            const BLE_MAX_WRITE = 240;
            var data = new Uint8Array(data.itemsArray());
            if (ble.rx_char == undefined) {
                throw TypeError("Not connected");
            }
            var byteCount =
                (data.length > BLEController.BLE_MAX_WRITE) ?
                BLEController.BLE_MAX_WRITE :
                data.length;
            ble.write(data.subarray(0, byteCount));
            return byteCount;
        }
        return 0;
    }
);
