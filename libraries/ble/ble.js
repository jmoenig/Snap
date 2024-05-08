function BLEController (stage) {
    this.init(stage);
};

BLEController.prototype.init = function (stage) {
    this.stage = stage;
    this.device = undefined;
    this.service = undefined;
    this.rx_char = undefined;
    this.sendInProgress = false;
    this.buffer = [];
};

BLEController.BLE_PACKET_LEN = 240;

BLEController.prototype.connect = async function (serviceUUID, rxUUIX, txUUID) {
    this.device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [ serviceUUID ] }]
    });

    this.device.addEventListener(
        'gattserverdisconnected',
        this.onDisconnect.bind(this)
    );

    const server = await this.device.gatt.connect();
    this.service = await server.getPrimaryService(serviceUUID);
    const tx_char = await this.service.getCharacteristic(txUUID);
    this.rx_char = await this.service.getCharacteristic(rxUUIX);
    await tx_char.startNotifications();

    // bind overrides the default this=tx_char to this=the NimBLESerial
    tx_char.addEventListener(
        'characteristicvaluechanged',
        this.onReceive.bind(this)
    );

    this.sendInProgress = false;
    console.log('BLE connected');
};

BLEController.prototype.onReceive = function (event) {
    var data = new Uint8Array(event.target.value.buffer);
    this.buffer.push(...data);
};

BLEController.prototype.onDisconnect = function (event) {
    this.stage.ble = null;
    console.log('BLE disconnected');
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
    if (this.device != undefined) {
        this.device.gatt.disconnect();
    }
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
    function () { return this.parentThatIsA(StageMorph).ble != undefined; }
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
        // Write the given data (a Uint8Array) and return the number of bytes
        // written. If not busy, start writeLoop with as much data as we can
        // send.
        var data = new Uint8Array(data.itemsArray());
        if (ble.rx_char == undefined) {
            throw TypeError("Not connected");
        }
        if (ble.sendInProgress) {
            return 0;
        }
        var byteCount = 
            (data.length > BLEController.BLE_PACKET_LEN) ?
            BLEController.BLE_PACKET_LEN :
            data.length;
        ble.write(data.subarray(0, byteCount));
        return byteCount;
    }
);

