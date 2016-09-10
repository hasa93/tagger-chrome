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
.directive('vdMaximum', function($rootScope){
	return{
		restrict: 'A',
		link: function(scope, elem, attr){
			var priority = 2;

			$rootScope.$on('SUBMIT', function(val){
				var invalidated = elem.data().invalidated;

				if(elem.val() != '' && elem.val().length > attr.vdMaximum && !invalidated){
					console.log('above ' + attr.vdMaximum);
					elem.addClass('input-error');
					elem.after('<div class="error-title"> Input cannot be greater than ' + attr.vdMaximum + ' </div>');
					elem.data("invalidated", true);
					elem.data("priority", priority);
				}
				else if(elem.val().length <= attr.vdMaximum && invalidated && elem.data().priority >= priority){
					elem.removeClass('input-error');
					elem.next().remove();
					elem.data("invalidated", false);
					elem.data("priority", -1);
				}
			});			
		}
	}
});