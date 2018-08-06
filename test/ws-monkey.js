/* globals world */
/* eslint-disable no-console */

/*
* provides a helper for simulating a fragile websocket connection (SimianArmy)
*/

class WSMonkey {
    constructor(aWorld) {
    // TODO total desired duration
        this._world = aWorld || world;
        this._size = 200;
        this._connectedRatio = 0.7;
        this._durationRange = [200, 2000]; // ms
        this._playOver = false;
    }

    get ide() {
        return this._world.children[0];
    }

    disconnect() {
        console.debug('disconnecting WS');
        this.ide.sockets.onClose = () => {};
        this.ide.sockets.websocket.close();
    }

    get isClosed() {
        return this._status === 3;
    }

    get isOpen() {
        return this._status === 1;
    }

    get isCloseOrClosing() {
        return this._status >= 2;
    }

    get isOpenOrOpening() {
        return this._status < 2;
    }

    get _status() {
        return this.ide.sockets.websocket.readyState;
    }

    connect() {
        console.debug('connecting WS');
        delete this.ide.sockets.onClose;
        this.ide.sockets.onClose();
    }

    _genProfile() {
        let states = new Array(this._size)
            .fill(0)
            .map(() => {
                let r = Math.random();
                if (r < this._connectedRatio) return 1;
                return 0;
            });

        let durations = new Array(this._size)
            .fill(0)
            .map(() => this._randn_bm(this._durationRange[0], this._durationRange[1]));

        let profile = states.map((s, index) => {
            return {state: s, duration: Math.round(durations[index])};
        });

        return profile;
    }

    printProfile(profile) {
        const UNIT = 100; //ms
        let str = profile
            .map(plan => {
                let count = Math.round(plan.duration/UNIT);
                let icon = plan.state ?  '#' : '_';
                return new Array(count).fill(icon).join('');
            })
            .join('');
        console.log(str);
        return str;
    }

    _play(profile) {
        return new Promise(resolve => {
            console.log('playing profile');
            this.printProfile(profile);

            let act = () => {
                let plan = profile.shift();
                if (!plan || this._playOver) {
                    if (this.isCloseOrClosing) this.connect();
                    console.log('finished profile');
                    return resolve();
                }
                // if supposed to be open and it's closing or closed
                if (plan.state && this.isCloseOrClosing) {
                    this.connect();
                }
                // if supposed to be closed and it's opening or open
                if (!plan.state && this.isOpenOrOpening) {
                    this.disconnect();
                }
                setTimeout(act.bind(this), plan.duration);
            };
            act();
        });
    }

    async startPlaying() {
    // plan ahead
        let profile = this._genProfile();
        while (!this._playOver) {
            await this._play(profile);
        }
    }

    async stopPlaying() {
        this._playOver = true;
    }

    // using Box-Muller transform to get a normal distribution
    _randn_bm(min, max, skew=1) {
        var u = 0, v = 0;
        while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while(v === 0) v = Math.random();
        let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

        num = num / 10.0 + 0.5; // Translate to 0 -> 1
        if (num > 1 || num < 0) num = this._randn_bm(min, max, skew); // resample between 0 and 1 if out of range
        num = Math.pow(num, skew); // Skew
        num *= max - min; // Stretch to fill range
        num += min; // offset to min
        return num;
    }
}
