angular.module('TaggerApp')
.factory('MessengerService', function(config){
	var o = {};
	var socket = {};

	o.connect = function(){
		socket = io.connect('http://ec2-54-186-114-41.us-west-2.compute.amazonaws.com:3000');

		socket.on('hello', function(message){
			console.log(message.text);
		});
	}

	o.receiveMessages = function(callBack){
		socket.on('UPDATE_MESSAGES', function(msg){
			socket.emit('GET_MESSAGES', { branchName: config.locals.branchName });
		});

		socket.on('BRANCH_MESSAGES', function(msg){
			callBack(msg);
		});
	}

	o.requestUpdate = function(){
		socket.emit('GET_MESSAGES', { branchName: config.locals.branchName });
	}

	o.sendLogin = function(cashier){
		socket.emit('CASHIER_LOGGED_IN', cashier);
	}

	return o;
})