angular.module('TaggerApp')
.provider('config', function(){
	this.config = {};

	this.$get = function(){
		return this;
	}
})