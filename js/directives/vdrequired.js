/*
*Validation Priorities
*These values control the order of overriding. 
*Only a directive with priority value below an already
*invalidating directive can override invalidated behavior
*of the element
*
* required    :    0
* numeric	  :    1
* maximum     :    2
* minimum     :    3
*/

angular.module('TaggerApp')
.directive('vdRequired', function($rootScope){
	return{
		restrict: 'A',
		link: function(scope, elem, attr){
			var priority = 0;

			$rootScope.$on('SUBMIT', function(val){
				var invalidated = elem.data().invalidated;

				if(elem.val() === '' && !invalidated){
					elem.addClass('input-error');
					elem.after('<div class="error-title"> Required </div>');
					elem.data("invalidated", true);
					elem.data("priority", priority);
				}
				else if(elem.val() != '' && invalidated && elem.data().priority >= priority ){
					elem.removeClass('input-error');
					elem.next().remove();				
					elem.data("invalidated", false);
					elem.data("priority", -1);
				}
			});			
		}
	}
});