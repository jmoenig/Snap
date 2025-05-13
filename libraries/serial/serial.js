function SerialController (stage) {
    this.init(stage);
};

SerialController.prototype.init = function (stage) {
    this.stage = stage;
    this.connected = false;
    this.disconnecting = false;
    this.sendInProgress = false;
    this.port = undefined;
    this.reader = undefined;
    this.writer = undefined;
    this.buffer = [];
    this.snapSerialProcessBlockDef =
        this.stage.globalBlocks.find(
            def => def.spec == '__mb_process_data__'
        );
};

SerialController.prototype.connect = async function (baudrate) {
    this.port = await navigator.serial.requestPort();
    this.port.ondisconnect = this.onDisconnect;
    await this.port.open({ baudRate: baudrate });
    this.reader = await this.port.readable.getReader();
    this.writer = await this.port.writable.getWriter();
    this.connected = true;
    this.sendInProgress = false;
    this.readerLoop();
};

SerialController.prototype.disconnect = async function () {
    this.disconnecting = true;
    await this.reader.releaseLock(); 
    // readerLoop will take over, as read() is now unlocked
};

SerialController.prototype.close = async function () {
    await this.writer.releaseLock();
    await this.port.close();

    this.port = undefined;
    this.reader = undefined;
    this.writer = undefined;
    this.connected = false;
    this.sendInProgress = false;
    this.disconnecting = false;
};

SerialController.prototype.readerLoop = async function () {
    try {
        while (this.connected && !this.disconnecting) {
            const { value, done } = await this.reader.read();
            if (value) {
                this.processData(value);
            }
            if (done) {
                this.close();
                return;
            }
        }
        this.close();
    } catch (error) {
        this.close();
    }
};

SerialController.prototype.processData = function (data) {
    this.buffer = this.buffer.concat(Array.from(data));
    if (this.snapSerialProcessBlockDef) {
        var block = this.snapSerialProcessBlockDef.blockInstance();
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

SerialController.prototype.write = async function (data) {
    this.sendInProgress = true;
    // try to send the given data
    try {
        await this.writer.write(data);
        this.sendInProgress = false;
        return;
    } catch (error) {
        // for now: print the error but keep trying to send
        throw new Error(error);
    }
};


SerialController.prototype.onDisconnect = function (event) {
    // defer disconnection for readerLoop to handle
    this.disconnecting = true;
};

SnapExtensions.primitives.set(
    'ser_connect(baudrate)',
    function (baudrate) {
        var stage = this.parentThatIsA(StageMorph);
        if (!stage.serial) { stage.serial = new SerialController(stage); }
        stage.serial.connect(baudrate);
    }
);

SnapExtensions.primitives.set(
    'ser_disconnect()',
    function () {
        var stage = this.parentThatIsA(StageMorph);
        if (stage.serial) {
            stage.serial.disconnect();
        }
    }
);

SnapExtensions.primitives.set(
    'ser_connected()',
    function () {
        var stage = this.parentThatIsA(StageMorph);
        return ((stage.serial?.port != undefined) && (stage.serial?.connected));
    }
);

SnapExtensions.primitives.set(
    'ser_read()',
    function () {
        var serial = this.parentThatIsA(StageMorph).serial;
        if (serial) {
            var buf = serial.buffer;
            serial.buffer = [];
            return new List(buf);
        }
        return new List();
    }
);

SnapExtensions.primitives.set(
    'ser_write(data)',
    function (data) {
        var serial = this.parentThatIsA(StageMorph).serial;
        if (serial && !serial.sendInProgress) {
            // Write the given data (a Uint8Array) and return the number of bytes written.
            const SERIAL_MAX_WRITE = 240;
            var data = new Uint8Array(data.itemsArray());
            if (serial.writer == undefined) {
                throw TypeError("Not connected");
            }
            var byteCount =
                (data.length > SERIAL_MAX_WRITE) ?
                SERIAL_MAX_WRITE :
                data.length;
            serial.write(data.subarray(0, byteCount));
            return byteCount;
        }
        return 0;
    }
);
