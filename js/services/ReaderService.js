angular.module('TaggerApp')
.factory('ReaderService', function($q, $rootScope){
	var o = {
		connectionOptions: {
			bitrate: 115200,
			name: 'nfc-conn'
		}
	};

	var streamString = "";
	var readingUids = false;

	o.getAvailableDevices = function(){
		console.log(o.connectionOptions);

		var deferred = $q.defer();

		chrome.serial.getDevices(function(devs){
			console.log(devs);
			deferred.resolve(devs);
		});

		return deferred.promise;
	}

	o.connectReader = function(device){
		chrome.serial.connect(device, o.connectionOptions, function(connStat){
			console.log(connStat);
		});

		chrome.serial.onReceive.addListener(function(stream){
			stream = new Uint8Array(stream.data);

			streamString = stream.reduce(function(str, charByte){
				charByte = String.fromCharCode(charByte);

				if(charByte == 'n'){
					console.log("Scanned Tag");
				}

				if(charByte == 'w'){
					console.log("Writing to Buffer");
				}

				if(charByte == 'r'){
					console.log("In Read Mode");
					readingUids = true;
					return str += "";
				}

				if(charByte == '!'){
					console.log("Read Error");
				}

				if(charByte == 's'){
					readingUids = false;
					console.log("Reading Stopped");
					console.log(str);

					var uids = str.split('*');
					uids.splice(0, 1);

					//Filter duplicate uids due to serial communication failures
					uniqueUids = uids.filter(function(elem, pos){
						if(uids.indexOf(elem) == pos){
							return true;
						}
					})

					$rootScope.$broadcast('TAGS_DETECTED', { tags : uniqueUids });

					return "";
				}

				if(readingUids){
					return str += charByte;
				}

				return str += "";
			}, streamString);
		});

		chrome.serial.onReceiveError.addListener(function(receive){
			if(receive.error === "device_lost"){
				console.log(receive);

				$rootScope.$apply(function(){
					$rootScope.readerDisconnected = true;
				})
			}
		});
	}

	o.setBitRate = function(bitrate){
		o.connectionOptions.bitrate = bitrate;
	}

	return o;
})