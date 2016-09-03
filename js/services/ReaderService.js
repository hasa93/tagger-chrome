angular.module('TaggerApp')
.factory('ReaderService', function($q){
	var o = {
		connectionOptions: {
			bitrate: 9600,
			name: 'nfc-conn'
		}
	};

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
		var deffered = $q.defer();

		chrome.serial.connect(device, o.connectionOptions, function(connStat){
			console.log(connStat);
		});

		return deferred.promise;
	}

	o.onReceive = function(){
		return chrome.serial.onReceive();
	}

	o.onError = function(){
		return chrome.serial.onReceiveError();
	}

	return o;
})