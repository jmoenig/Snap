/* MQTTExtension.js - add MQTT protocol to Snap!
 * ===========================================
 * MQTT library developed by Xavier Pi
 * Modified by Simon Walters and Xavier Pi
 * and converted into an extension
 * November 2021
 * V1.1 - change back to using standard naming e.g payload not message
 * V1.2.0 added in code from pixavier to improve sub and unsub 9May2022 
 * V1.3.0 added in code from pixavier brokerKey to enable more than one connection to the same broker with different users  
 * V1.4.0 30Jun22 handle binary payloads correctly
 * V1.5.0 29Dec22 handle utf8 character payloads correctly
 * V1.5.2 20Jan23 change subscribe default to be text and accept boolean to change to binary (corrected 18:23)
 * V1.5.3 22Jan23 make old subscribe block be compatible with new extension code
 * V1.5.4 15Feb22 When returning text to Snap!, restore explicitly making payload into a string.  Also restore cymplecy.uk instead of simplesi.cloud
 * V1.6.0 13Oct2023 If binary options selected then pub expects payload to be a flat List (values 0-255) and sub will return a List
 * V1.6.1 05Jan2024 "binary" replaced by "buffer mode"
 * V1.6.2 17Jan2023 bugfix -remove automatic convert JSON to Snap! list
 * V1.7.0 12Jul2024 Add in maximum QoS for subscribe
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

		broker = broker ? broker.trim() : '';
		let brokerKey = broker;
		if (broker.indexOf('|') >= 0) {
			broker = broker.substr(broker.indexOf('|') + 1);
		}

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
		} else if (wsbroker == 'ws://vps656540.ovh.net') {
			wsbroker = wsbroker + ':8080'
		} else if (wsbroker == 'ws://test.mosquitto.org') {
			wsbroker = wsbroker + ':8080'
		} else if (broker == 'broker.xmqtt.net') {
			wsbroker = wsbroker + '/mqtt'
		} else if (wsbroker == 'wss://cymplecy.uk') {
			wsbroker = wsbroker + ':8084'
		} else if (wsbroker == 'ws://cymplecy.uk') {
			wsbroker = wsbroker + ':8083'
		} else if (wsbroker == 'ws://localhost') {
			wsbroker = wsbroker + ':9001'
		}
		//log(wsbroker)
		try {
			stage.mqtt[brokerKey].end(true);
		} catch (e){}
		delete stage.mqtt[brokerKey];

		stage.mqtt[brokerKey] = mqtt.connect(wsbroker, opts);

		stage.mqtt[brokerKey].on('connect', function(connack) {
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

		stage.mqtt[brokerKey].stream.on('error', function(error) {
			log('error event triggered');
			try{
				stage.mqtt[brokerKey].end();
			}catch(e){}
			delete stage.mqtt[brokerKey];
			try {
				proc.doSetVar('connection status', 'failed to connect to ' + broker);
			} catch(e) {}
			  //alert(error.message);
		});


	}

);


SnapExtensions.primitives.set(
	'mqt_sub(broker,topic,callback,options)',
	function (broker,topic,callback,options) {
		/* github.com/pixavier/mqtt4snap  */
		/* adapted into extension by cymplecy 26Nov21 */
        /* modified 13OCt2023 by cymplecy to return binary data as a list */
		/* modified 11Jul2024 by pixavier to add paramete	 for qos */
		function log(txt) {
			console.log('mqt_sub: ', new Date().toString(), txt);
		}

		function arrayToList(data) {
			if (!Array.isArray(data)) {
				return data;
			}
			return new List(data.map((x) => arrayToList(x)));
		}

		broker = broker ? broker.trim() : '';
		let brokerKey = broker;
		if (broker.indexOf('|') >= 0) {
			broker = broker.substr(broker.indexOf('|') + 1);
		}
		
		topic = topic ? topic.trim() : topic;
		options = JSON.parse(options);
		const opts = {};
		if (options['qos']) {
			opts.qos = Number(options['qos']);
		}

		let stage =  this.parentThatIsA(StageMorph);

		if (!('mqtt' in stage)){
			log('No connection to any broker ' + broker);
			throw new Error('No connection to any broker '+broker);
		}

		if (stage.mqtt[brokerKey]) {
			try {stage.mqtt[brokerKey].unsubscribe(topic);}catch(e){}
		} else {
			log('No connection to broker ' + broker);
			throw new Error('No connection to broker '+broker);
		}

		stage.mqtt[brokerKey].subscribe(topic, opts);
		
		let mqttListener = function (aTopic, payload) {
			if (!mqttWildcard(aTopic, topic)) {return;}
			let p = new Process();
			if (options['mode'] && options['mode'] == true) {
				newPayload = new List(payload);
			} else {
				newPayload = payload.toString();
			}

			try {
				p.initializeFor(callback, new List([newPayload, aTopic]));
			} catch(e) {
				p.initializeFor(callback, new List([]));
			}
			stage.threads.processes.push(p);
		};
		
		mqttListener.topic = topic;
		stage.mqtt[brokerKey].on('message', mqttListener);

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
	'mqt_pub(broker,topic,payload,options)',
	function (broker,topic,payload,options) {
		/* original code from github.com/pixavier/mqtt4snap  */
		/* adapted into extension by cymplecy 26Nov21 */
		/* modified 05Sep2021 by cymplecy to add parameters for qos and retain flag */
        /* modified 13Oct2023 by cymplecy to handle binary data in a list */
		function log(txt) {
			console.log('mqt_pub: ', new Date().toString(), txt);
		}

		broker = broker ? broker.trim() : '';
		let brokerKey = broker;
		if (broker.indexOf('|') >= 0) {
			broker = broker.substr(broker.indexOf('|') + 1);
		}
		
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

		//console.log(payload.contents);
		//console.log(new Uint8Array(payload.contents));

		let stage =  this.parentThatIsA(StageMorph);

		if (!('mqtt' in stage)){
			log('No connection to any broker ' + broker);
			throw new Error('No connection to any broker ' + broker);
		}

		if(!stage.mqtt[brokerKey]){
			log('No connection to broker ' + broker);
			throw new Error('No connection to broker ' + broker);
		}

		//let prefix = window.location.protocol == 'https:'?'wss':'ws';
		//let wsbroker = prefix+'://'+broker;
		try{
			let client = stage.mqtt[brokerKey];
			if (options['mode'] && options['mode'] == true) {
				client.publish(topic, new Uint8Array(payload.asArray()), opts);
			} else {
				client.publish(topic, '' + payload, opts);
			}
			//console.log(opts)
		} catch(e) {
			log('Failed to publish payload ' + payload);
			//console.log(e);
			throw e;
		}
	}
);

SnapExtensions.primitives.set(
	'mqt_disconnect(broker)',
	function (broker) {
		/* original code from github.com/pixavier/mqtt4snap  */
		/* adapted into extension by cymplecy 26Nov21 */

		let stage =  this.parentThatIsA(StageMorph);
		broker = broker ? broker.trim() : '';
		let brokerKey = broker;
		if (broker.indexOf('|') >= 0) {
			broker = broker.substr(broker.indexOf('|') + 1);
		}

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
				stage.mqtt[brokerKey].end(true);
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
				delete stage.mqtt[brokerKey];
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
			broker = broker ? broker.trim() : '';
			let brokerKey = broker;
			if (broker.indexOf('|') >= 0) {
				broker = broker.substr(broker.indexOf('|') + 1);
			}
			
			stage.mqtt[brokerKey].unsubscribe(topic);
			let listeners = stage.mqtt[brokerKey].listeners('message');
			//  https://github.com/mqttjs/async-mqtt/issues/31
			listeners.forEach((listener) => {
				//console.dir(listener);
				if (topic == listener.topic || topic == '#') {  // # = all
					stage.mqtt[brokerKey].removeListener('message', listener); 
				}
			});
		} catch(e){
		  //console.log(e);
		}
	}
);
