(function(globals) {

    class EmbeddedNetsBloxAPI {
        constructor(element) {
            this.element = element;
            this._requests = {};
            this.listeners = {};
            this.listeners.action = [];

            const receiveMessage = event => {
                const data = event.data;
                const {type} = data;
                if (type === 'reply') {
                    const {id} = data;
                    const request = this._requests[id];
                    if (request) {
                        request.resolve(data);
                        delete this._requests[id];
                    }
                } else {
                    const handlers = this.listeners[type];
                    handlers.forEach(fn => fn(data.data));
                }
            };

            window.addEventListener('message', receiveMessage, false);
        }

        async getProjectXML() {
            const reqData = {type: 'export-project'};
            const data = await this.reqReply(reqData);
            return data.xml;
        }

        async getUsername() {
            const reqData = {type: 'get-username'};
            const data = await this.reqReply(reqData);
            return data.username;
        }

        async addActionListener(fn) {
            this.listeners.action.push(fn);
            this.call({
                type: 'emit-actions',
            });
        }

        async import(name, content) {
            this.call({
                type: 'import',
                name: name,
                content: content,
            });
        }

        genUuid() {
            return Date.now() + Math.floor(Math.random() * 1000);
        }

        reqReply(reqData) {
            const id = this.genUuid();
            const deferred = defer();
            this._requests[id] = deferred;
            reqData.id = id;
            this.call(reqData);

            setTimeout(() => {
                const deferred = this._requests[id];
                if (deferred) {
                    deferred.reject(new Error('Timeout Exceeded'));
                    delete this._requests[id];
                }
            }, 5000);

            return deferred.promise;
        }

        call(msgData) {
            this.element.contentWindow.postMessage(msgData, '*');
        }
    }

    function defer() {
        const deferred = {};
        deferred.promise = new Promise((resolve, reject) => {
            deferred.resolve = resolve;
            deferred.reject = reject;
        });
        return deferred;
    }

    globals.EmbeddedNetsBloxAPI = EmbeddedNetsBloxAPI;
})(this);
