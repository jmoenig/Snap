/* MQTTExtension.js - add MQTT protocol to Snap!
 * ===========================================
 * MQTT library developed by Xavier Pi
 * Modified by Simon Walters
 * and converted into an extension
 * November 2021
 * V1.1 - change back to using standard naming e.g payload not message
 */



SnapExtensions.primitives.set(
    'mqt_connect(broker,callback,options)',
    function (broker,callback,options,proc) {
        /* original code from github.com/pixavier/mqtt4snap  */
        /* adapted into extension by cymplecy 26Nov21 */
        /* modified to add in keepalive parameter by cymplecy 23Nov21 */
        function log(txt) {
            console.log('mqt_connect: ', new Date().toString(), txt);
        }

        broker = broker ? broker.trim() : broker;

        options = JSON.parse(options);
        const opts = {};
        if (options['username']) {
            opts.username = options['username'];
            if (options["password"]) {
                opts.password = options['password'];
            } else {
                opts.password = '';
            }
        }

        if (options["keepalive"]) {
            opts.keepalive = Number(options["keepalive"]);
        }

        var stage = this.parentThatIsA(StageMorph);

        if (!('mqtt' in stage)){
            stage.mqtt = [];
        }

        let wsbroker;

        if (broker.startsWith('ws://')) {
            wsbroker = broker;
        } else if (broker.startsWith('wss://')) {
            wsbroker = broker;
        } else {
            let prefix;
            prefix = window.location.protocol == 'https:'?'wss':'ws';
            wsbroker = prefix + '://' + broker;
        }
        if (wsbroker == 'wss://broker.emqx.io') {
            wsbroker = wsbroker + ':8084/mqtt'
        } else if (wsbroker == 'ws://broker.emqx.io') {
            wsbroker = wsbroker + ':8083/mqtt'
        } else if (broker == 'mqtt.eclipseprojects.io') {
            wsbroker = wsbroker + '/mqtt'
        } else if (wsbroker == 'wss://test.mosquitto.org') {
            wsbroker = wsbroker + ':8081'
        } else if (wsbroker == 'ws://test.mosquitto.org') {
            wsbroker = wsbroker + ':8080'
        } else if (broker == 'broker.xmqtt.net') {
            wsbroker = wsbroker + '/mqtt'
        } else if (wsbroker == 'wss://simplesi.cloud') {
            wsbroker = wsbroker + ':8084'
        } else if (wsbroker == 'ws://simplesi.cloud') {
            wsbroker = wsbroker + ':8083'
        } else if (wsbroker == 'ws://localhost') {
            wsbroker = wsbroker + ':9001'
        }
        //log(wsbroker)
        try {
            stage.mqtt[broker].end(true);
        } catch (e){}
        delete stage.mqtt[broker];

        stage.mqtt[broker] = mqtt.connect(wsbroker, opts);

        stage.mqtt[broker].on('connect', function(connack) {
            log('Connected to ' + wsbroker);
            if (callback) {
                let p = new Process();
                p.initializeFor(callback, new List(["all"]))
                //console.log("here1")
                stage.threads.processes.push(p);
                //log('Callback process pushed');
            }
            try {
                proc.doSetVar('connection status', 'connected');
            } catch(e) {}
        });

        stage.mqtt[broker].stream.on('error', function(error) {
            log('error event triggered');
            try{
                stage.mqtt[broker].end();
            }catch(e){}
            delete stage.mqtt[broker];
            try {
                proc.doSetVar('connection status', 'failed to connect to ' + broker);
            } catch(e) {}
              //alert(error.message);
        });


    }

);


SnapExtensions.primitives.set(
    'mqt_pub(broker,topic,payload,options)',
    function (broker,topic,payload,options) {
        /* original code from github.com/pixavier/mqtt4snap  */
        /* adapted into extension by cymplecy 26Nov21 */
        /* modified 5 Sep2021 by cymplecy to add parameters for qos and retain flag */
        function log(txt) {
            console.log('mqt_pub: ', new Date().toString(), txt);
        }

        broker = broker ? broker.trim() : broker;
        topic = topic ? topic.trim() : topic;
        //payload not trimmed as might have real leading/trailing spaces
        //console.log(options)
        options = JSON.parse(options);
        const opts = {};
        if (options['qos']) {
            opts.qos = Number(options['qos']);
        }
        if (options["retain"]) {
            opts.retain = options["retain"];
        }

        let stage =  this.parentThatIsA(StageMorph);

        if (!('mqtt' in stage)){
            log('No connection to any broker ' + broker);
            throw new Error('No connection to any broker ' + broker);
        }

        if(!stage.mqtt[broker]){
            log('No connection to broker ' + broker);
            throw new Error('No connection to broker ' + broker);
        }

        //let prefix = window.location.protocol == 'https:'?'wss':'ws';
        //let wsbroker = prefix+'://'+broker;


        try{
            let client = stage.mqtt[broker];
            client.publish(topic, '' + payload, opts);
            //console.log(opts)
        } catch(e) {
            log('Failed to publish payload ' + payload);
        //  console.log(e);
            throw e;
        }
    }
);

SnapExtensions.primitives.set(
    'mqt_sub(broker,topic,callback,options)',
    function (broker,topic,callback,options) {
        /* github.com/pixavier/mqtt4snap  */
        /* adapted into extension by cymplecy 26Nov21 */
        function log(txt) {
            console.log('mqt_sub: ', new Date().toString(), txt);
        }

        broker = broker ? broker.trim() : broker;
        topic = topic ? topic.trim() : topic;

        let stage =  this.parentThatIsA(StageMorph);

        if (!('mqtt' in stage)){
            log('No connection to any broker ' + broker);
            throw new Error('No connection to any broker '+broker);
        }

        //let prefix = window.location.protocol == 'https:'?'wss':'ws';
        //let wsbroker = prefix+'://'+broker;

        if (stage.mqtt[broker]) {
            try {stage.mqtt[broker].unsubscribe(topic);}catch(e){}
        } else {
            log('No connection to broker ' + broker);
            throw new Error('No connection to broker '+broker);
        }

        stage.mqtt[broker].subscribe(topic);

        let mqttListener = function (aTopic, payload) {
        //  if (aTopic !== topic) { return; }
          if (!mqttWildcard(aTopic, topic)) {return;}
          let p = new Process();
          try {
              p.initializeFor(callback, new List([payload.toString() , aTopic]));
          } catch(e) {
              p.initializeFor(callback, new List([]));
          }
          stage.threads.processes.push(p);
        };

        stage.mqtt[broker].on('message', mqttListener);

        let mqttWildcard = function (topic, wildcard) {
            if (topic === wildcard) {return true;}
            else if (wildcard === '#') {return true;}

            var res = [];
            var t = String(topic).split('/');
            var w = String(wildcard).split('/');
            var i = 0;
            for (var lt = t.length; i < lt; i++) {
                if (w[i] === '+') {
                    res.push(t[i]);
                } else if (w[i] === '#') {
                    res.push(t.slice(i).join('/'));
                    return true;
                } else if (w[i] !== t[i]) {
                    return false;
                }
            }
            if (w[i] === '#') {i += 1;}
            return (i === w.length) ? true : false;
        }
    }
);

SnapExtensions.primitives.set(
    'mqt_disconnect(broker)',
    function (broker) {
        /* original code from github.com/pixavier/mqtt4snap  */
        /* adapted into extension by cymplecy 26Nov21 */

        let stage =  this.parentThatIsA(StageMorph);

        try {
            if(broker=='all'){
                for(let brok of Object.keys(stage.mqtt)){
                    try {
                        stage.mqtt[brok].end(true);
                    } catch (e0) {
                        //console.log('e0');
                        //console.log(e0);
                    }
                }
            } else {
                stage.mqtt[broker].end(true);
            }
        } catch(e1){
            //console.log('e1');
            //console.log(e1);
        }
        try{
            if(broker=='all'){
                try {
                    delete stage.mqtt;
                    stage.mqtt=[];
                } catch (e2) {
                    //console.log('e2');
                    //console.log(e2);
                }
            } else {
                delete stage.mqtt[broker];
            }
        } catch(e3){
            //console.log('e3');
            //console.log(e3);
        }
    }
);

SnapExtensions.primitives.set(
    'mqt_unsub(broker,topic)',
    function (broker,topic) {
        /* original code from github.com/pixavier/mqtt4snap  */
        /* adapted into extension by cymplecy 26Nov21 */

        let stage =  this.parentThatIsA(StageMorph);
        try{
          stage.mqtt[broker].unsubscribe(topic);
          let listeners = stage.mqtt[broker].listeners('message');
        //  https://github.com/mqttjs/async-mqtt/issues/31
          listeners.forEach((listener) => {
              //console.dir(listener);
              stage.mqtt[broker].removeListener('message', listener);
            })
        } catch(e){
          //console.log(e);
        }
    }
)

