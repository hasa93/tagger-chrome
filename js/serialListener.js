
var serialListener = function(port, bitrate){
	this.port = port;
	this.bitrate = bitrate || 9600;

	console.log(this.port);
	console.log(this.bitrate);
}

serialListener.prototype.init = function(){
 chrome.serial.connect(this.port, { name: "nfc-conn", bitrate: this.bitrate }, function(conInfo){
	console.log(conInfo);
 });
 this.attachErrorListener();
}

serialListener.prototype.attachErrorListener = function(cb){

	var defaultFn = function(err){
		console.log("Connection Error");
		console.log(err);
	}

	chrome.serial.onReceiveError.addListener(cb || defaultFn);
}
 

serialListener.prototype.getDevices = function()
{
	chrome.serial.getDevices(function(devs){
		console.log(devs);
		return devs;
	});
}

serialListener.prototype.attachReadCb = function(cb){
	chrome.serial.onReceive.addListener(cb);
}