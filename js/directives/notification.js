angular.module('TaggerApp')
.directive('notification', function(){
	var linkFn = function(scope, elem, attr){
		scope.close = function(message){
			scope.action(message);
		}
	}

	return{
		restrict: 'E',
		link: linkFn,
		scope:{
			type: '@',
			action: '=',
			text: '@'
		},
		templateUrl: "templates/directives/notification.html"
	}
});