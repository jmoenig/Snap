import { Emitter } from "./events.js";

export class WebSerialTransport extends Emitter {
    constructor(port) {
      super();
      this.port = port;
  
      this.reader = port.readable.getReader();
      this.writer = port.writable.getWriter();
  
      this.emit("open");

      this.listen()
    }
  
    async listen() {
      const { port, reader } = this;
  
      // Listen to data coming from the serial device.
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            // Allow the serial port to be closed later.
            reader.releaseLock();
            break;
          }
          // value is a Uint8Array.
          // console.log(new TextDecoder().decode(value));
    
          this.emit("data", value);
        }
      } catch(err) {
        console.warn(err)
        this.emit("close");
      } 
    }
  
    async write(data, cb) {
      const { port, writer } = this;
  
      this.emit("write", data);
      await writer.write(data);
  
      // Allow the serial port to be closed later.
      // writer.releaseLock();
  
      if (typeof cb === 'function') {
          cb()
      }
    }
  }
  
