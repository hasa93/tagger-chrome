angular.module('TaggerApp')
.directive('searchPopup', function(RetailService){

	var linkFn = function(scope, elem, attr){

		var themes = {
			purple:{
				headerColor: 'metro-purple',
				inputColor: 'input-purple'
			},

			yellow:{
				headerColor: 'metro-sunflower',
				inputColor: 'input-sunflower'
			},

			blue:{
				headerColor: 'metro-peterriver',
				inputColor: 'input-peterriver'
			},

			green:{
				headerColor: 'metro-greensea',
				inputColor: 'input-greensea'
			}

		};

		if(attr.cancel != undefined){
			scope.cancelEnabled = true;
		}

		scope.style = themes[scope.theme];
	}

	return{
		restrict: 'E',
		transclude: true,
		scope: {
			title: '@',
			searchTitle: '@',
			icon: '@',
			theme: '@',
			cancel: '&',
			confirm: '&',
			bindSearch: '=',
			bindValidation: '='
		},
		link: linkFn,
		templateUrl: 'templates/searchtemplate.html'
	}
});