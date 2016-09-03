angular.module('TaggerApp')
.provider('config', function(){
	this.locals = {};

	this.$get = function(){
		return this;
	}
})