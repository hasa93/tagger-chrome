angular.module('TaggerApp')
.directive('errorText', function($rootScope){
	return{
		restrict: 'A',
		transclude: true,

		link: function(scope, elem, attr){

			var isInvalidated = false;

			$rootScope.$watch('isValid', function(newVal, prevVal){
				if(newVal == false){
					console.log($rootScope.isValid);

					attr.$observe('errorText', function(value){
						if(value){
							if(isInvalidated){
								elem.next().remove();
							}

							elem.addClass('input-error');
							elem.after('<div class="error-title">' + value + '</div>');
							isInvalidated = true;
						}
						else if(isInvalidated){
							elem.removeClass('input-error');
							elem.next().remove();
							isInvalidated = false;
						}
					});
				}
			});
		}
	}
});