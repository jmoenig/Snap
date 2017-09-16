// Cloud /////////////////////////////////////////////////////////////

export default class Cloud {
    constructor(url) {
        this.username = null;
        this.password = null; // hex_sha512 hashed
        this.url = url;
        this.session = null;
        this.limo = null;
        this.route = null;
        this.api = {};
    }

    clear() {
        this.username = null;
        this.password = null;
        this.session = null;
        this.limo = null;
        this.route = null;
        this.api = {};
    }

    hasProtocol() {
        return this.url.toLowerCase().indexOf('http') === 0;
    }

    setRoute(username) {
        const routes = 20;
        let userNum = 0;
        let i;

        for (i = 0; i < username.length; i += 1) {
            userNum += username.charCodeAt(i);
        }
        userNum = userNum % routes + 1;
        this.route = `.sc1m${userNum < 10 ? '0' : ''}${userNum}`;
    }

    // Cloud: Snap! API

    signup(username, email, callBack, errorCall) {
        // both callBack and errorCall are two-argument functions
        const request = new XMLHttpRequest();

        const myself = this;
        try {
            request.open(
                "GET",
                `${(this.hasProtocol() ? '' : 'http://')
    + this.url}SignUp?Username=${encodeURIComponent(username)}&Email=${encodeURIComponent(email)}`,
                true
            );
            request.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded"
            );
            request.withCredentials = true;
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.responseText) {
                        if (request.responseText.indexOf('ERROR') === 0) {
                            errorCall.call(
                                this,
                                request.responseText,
                                'Signup'
                            );
                        } else {
                            callBack.call(
                                null,
                                request.responseText,
                                'Signup'
                            );
                        }
                    } else {
                        errorCall.call(
                            null,
                            `${myself.url}SignUp`,
                            localize('could not connect to:')
                        );
                    }
                }
            };
            request.send(null);
        } catch (err) {
            errorCall.call(this, err.toString(), 'Snap!Cloud');
        }
    }

    getPublicProject(id, callBack, errorCall) {
        // id is Username=username&projectName=projectname,
        // where the values are url-component encoded
        // callBack is a single argument function, errorCall take two args
        const request = new XMLHttpRequest();

        const myself = this;
        try {
            request.open(
                "GET",
                `${(this.hasProtocol() ? '' : 'http://')
    + this.url}RawPublic?${id}`,
                true
            );
            request.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded"
            );
            request.withCredentials = true;
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.responseText) {
                        if (request.responseText.indexOf('ERROR') === 0) {
                            errorCall.call(
                                this,
                                request.responseText
                            );
                        } else {
                            callBack.call(
                                null,
                                request.responseText
                            );
                        }
                    } else {
                        errorCall.call(
                            null,
                            `${myself.url}Public`,
                            localize('could not connect to:')
                        );
                    }
                }
            };
            request.send(null);
        } catch (err) {
            errorCall.call(this, err.toString(), 'Snap!Cloud');
        }
    }

    resetPassword(username, callBack, errorCall) {
        // both callBack and errorCall are two-argument functions
        const request = new XMLHttpRequest();

        const myself = this;
        try {
            request.open(
                "GET",
                `${(this.hasProtocol() ? '' : 'http://')
    + this.url}ResetPW?Username=${encodeURIComponent(username)}`,
                true
            );
            request.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded"
            );
            request.withCredentials = true;
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.responseText) {
                        if (request.responseText.indexOf('ERROR') === 0) {
                            errorCall.call(
                                this,
                                request.responseText,
                                'Reset Password'
                            );
                        } else {
                            callBack.call(
                                null,
                                request.responseText,
                                'Reset Password'
                            );
                        }
                    } else {
                        errorCall.call(
                            null,
                            `${myself.url}ResetPW`,
                            localize('could not connect to:')
                        );
                    }
                }
            };
            request.send(null);
        } catch (err) {
            errorCall.call(this, err.toString(), 'Snap!Cloud');
        }
    }

    login(username, password, callBack, errorCall) {
        // both callBack and errorCall are two-argument functions
        const request = new XMLHttpRequest();

        const usr = JSON.stringify({'__h': password, '__u': username});
        const myself = this;
        this.setRoute(username);
        try {
            request.open(
                "POST",
                `${(this.hasProtocol() ? '' : 'http://') +
    this.url}?SESSIONGLUE=${this.route}`,
                true
            );
            request.setRequestHeader(
                "Content-Type",
                "application/json; charset=utf-8"
            );
            // glue this session to a route:
            request.setRequestHeader('SESSIONGLUE', this.route);
            request.withCredentials = true;
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.responseText) {
                        myself.api = myself.parseAPI(request.responseText);
                        myself.session = request.getResponseHeader('MioCracker')
                            .split(';')[0];
                        // set the cookie identifier:
                        myself.limo = this.getResponseHeader("miocracker")
                            .substring(
                                9,
                                this.getResponseHeader("miocracker").indexOf("=")
                            );
                        if (myself.api.logout) {
                            myself.username = username;
                            myself.password = password;
                            callBack.call(null, myself.api, 'Snap!Cloud');
                        } else {
                            errorCall.call(
                                null,
                                request.responseText,
                                'connection failed'
                            );
                        }
                    } else {
                        errorCall.call(
                            null,
                            myself.url,
                            localize('could not connect to:')
                        );
                    }
                }
            };
            request.send(usr);
        } catch (err) {
            errorCall.call(this, err.toString(), 'Snap!Cloud');
        }
    }

    reconnect(callBack, errorCall) {
        if (!(this.username && this.password)) {
            this.message('You are not logged in');
            return;
        }
        this.login(
            this.username,
            this.password,
            callBack,
            errorCall
        );
    }

    saveProject(ide, callBack, errorCall) {
        const myself = this;
        let pdata;
        let media;
        let size;
        let mediaSize;

        ide.serializer.isCollectingMedia = true;
        pdata = ide.serializer.serialize(ide.stage);
        media = ide.hasChangedMedia ?
                ide.serializer.mediaXML(ide.projectName) : null;
        ide.serializer.isCollectingMedia = false;
        ide.serializer.flushMedia();

        mediaSize = media ? media.length : 0;
        size = pdata.length + mediaSize;
        if (mediaSize > 10485760) {
            new DialogBoxMorph().inform(
                'Snap!Cloud - Cannot Save Project',
                'The media inside this project exceeds 10 MB.\n' +
                    'Please reduce the size of costumes or sounds.\n',
                ide.world(),
                ide.cloudIcon(null, new Color(180, 0, 0))
            );
            throw new Error('Project media exceeds 10 MB size limit');
        }

        // check if serialized data can be parsed back again
        try {
            ide.serializer.parse(pdata);
        } catch (err) {
            ide.showMessage(`Serialization of program data failed:\n${err}`);
            throw new Error(`Serialization of program data failed:\n${err}`);
        }
        if (media !== null) {
            try {
                ide.serializer.parse(media);
            } catch (err) {
                ide.showMessage(`Serialization of media failed:\n${err}`);
                throw new Error(`Serialization of media failed:\n${err}`);
            }
        }
        ide.serializer.isCollectingMedia = false;
        ide.serializer.flushMedia();

        ide.showMessage(`Uploading ${Math.round(size / 1024)} KB...`);
        myself.reconnect(
            () => {
                myself.callService(
                    'saveProject',
                    (response, url) => {
                        callBack.call(null, response, url);
                        myself.disconnect();
                        ide.hasChangedMedia = false;
                    },
                    errorCall,
                    [
                        ide.projectName,
                        pdata,
                        media,
                        pdata.length,
                        media ? media.length : 0
                    ]
                );
            },
            errorCall
        );
    }

    getProjectList(callBack, errorCall) {
        const myself = this;
        this.reconnect(
            () => {
                myself.callService(
                    'getProjectList',
                    (response, url) => {
                        callBack.call(null, response, url);
                        myself.disconnect();
                    },
                    errorCall
                );
            },
            errorCall
        );
    }

    changePassword(oldPW, newPW, callBack, errorCall) {
        const myself = this;
        this.reconnect(
            () => {
                myself.callService(
                    'changePassword',
                    (response, url) => {
                        callBack.call(null, response, url);
                        myself.disconnect();
                    },
                    errorCall,
                    [hex_sha512(oldPW), hex_sha512(newPW)]
                );
            },
            errorCall
        );
    }

    logout(callBack, errorCall) {
        this.clear();
        this.callService(
            'logout',
            callBack,
            errorCall
        );
    }

    disconnect() {
        this.callService(
            'logout',
            nop,
            nop
        );
    }

    // Cloud: backend communication

    callURL(url, callBack, errorCall) {
        // both callBack and errorCall are optional two-argument functions
        const request = new XMLHttpRequest();

        let stickyUrl;
        const myself = this;
        try {
            // set the Limo. Also set the glue as a query paramter for backup.
            stickyUrl = `${url}&SESSIONGLUE=${this.route}&_Limo=${this.limo}`;
            request.open('GET', stickyUrl, true);
            request.withCredentials = true;
            request.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded"
            );
            request.setRequestHeader('MioCracker', this.session);
            // Set the glue as a request header.
            request.setRequestHeader('SESSIONGLUE', this.route);
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request.responseText) {
                        const responseList = myself.parseResponse(
                            request.responseText
                        );
                        callBack.call(null, responseList, url);
                    } else {
                        errorCall.call(
                            null,
                            url,
                            'no response from:'
                        );
                    }
                }
            };
            request.send(null);
        } catch (err) {
            errorCall.call(this, err.toString(), url);
        }
    }

    callService(serviceName, callBack, errorCall, args) {
        // both callBack and errorCall are optional two-argument functions
        const request = new XMLHttpRequest();

        const service = this.api[serviceName];
        const myself = this;
        let stickyUrl;
        let postDict;

        if (!this.session) {
            errorCall.call(null, 'You are not connected', 'Cloud');
            return;
        }
        if (!service) {
            errorCall.call(
                null,
                `service ${serviceName} is not available`,
                'API'
            );
            return;
        }
        if (args && args.length > 0) {
            postDict = {};
            service.parameters.forEach((parm, idx) => {
                postDict[parm] = args[idx];
            });
        }
        try {
            stickyUrl = `${this.url}/${service.url}&SESSIONGLUE=${this.route}&_Limo=${this.limo}`;
            request.open(service.method, stickyUrl, true);
            request.withCredentials = true;
            request.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded"
            );
            request.setRequestHeader('MioCracker', this.session);
            request.setRequestHeader('SESSIONGLUE', this.route);
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    let responseList = [];
                    if (request.responseText &&
                            request.responseText.indexOf('ERROR') === 0) {
                        errorCall.call(
                            this,
                            request.responseText,
                            `${localize('Service:')} ${localize(serviceName)}`
                        );
                        return;
                    }
                    if (serviceName === 'login') {
                        myself.api = myself.parseAPI(request.responseText);
                    }
                    if (serviceName === 'getRawProject') {
                        responseList = request.responseText;
                    } else {
                        responseList = myself.parseResponse(
                            request.responseText
                        );
                    }
                    callBack.call(null, responseList, service.url);
                }
            };
            request.send(this.encodeDict(postDict));
        } catch (err) {
            errorCall.call(this, err.toString(), service.url);
        }
    }

    // Cloud: payload transformation

    parseAPI(src) {
        const api = {};
        let services;
        services = src.split(" ");
        services.forEach(service => {
            const entries = service.split("&");
            const serviceDescription = {};
            let parms;
            entries.forEach(entry => {
                const pair = entry.split("=");
                const key = decodeURIComponent(pair[0]).toLowerCase();
                const val = decodeURIComponent(pair[1]);
                if (key === "service") {
                    api[val] = serviceDescription;
                } else if (key === "parameters") {
                    parms = val.split(",");
                    if (!(parms.length === 1 && !parms[0])) {
                        serviceDescription.parameters = parms;
                    }
                } else {
                    serviceDescription[key] = val;
                }
            });
        });
        return api;
    }

    parseResponse(src) {
        const ans = [];
        let lines;
        if (!src) {return ans; }
        lines = src.split(" ");
        lines.forEach(service => {
            const entries = service.split("&");
            const dict = {};
            entries.forEach(entry => {
                const pair = entry.split("=");
                const key = decodeURIComponent(pair[0]);
                const val = decodeURIComponent(pair[1]);
                dict[key] = val;
            });
            ans.push(dict);
        });
        return ans;
    }

    parseDict(src) {
        const dict = {};
        if (!src) {return dict; }
        src.split("&").forEach(entry => {
            const pair = entry.split("=");
            const key = decodeURIComponent(pair[0]);
            const val = decodeURIComponent(pair[1]);
            dict[key] = val;
        });
        return dict;
    }

    encodeDict(dict) {
        let str = '';
        let pair;
        let key;
        if (!dict) {return null; }
        for (key in dict) {
            if (dict.hasOwnProperty(key)) {
                pair = `${encodeURIComponent(key)}=${encodeURIComponent(dict[key])}`;
                if (str.length > 0) {
                    str += '&';
                }
                str += pair;
            }
        }
        return str;
    }

    // Cloud: user messages (to be overridden)

    message(string) {
        alert(string);
    }
}