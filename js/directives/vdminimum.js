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
.directive('vdMinimum', function($rootScope){
	return{
		restrict: 'A',
		link: function(scope, elem, attr){
			var priority = 3;

			$rootScope.$on('SUBMIT', function(val){
				var invalidated = elem.data().invalidated;

				if(elem.val() != '' && elem.val().length < attr.vdMinimum && !invalidated){
					console.log("below " + attr.vdMinimum);
					elem.addClass('input-error');
					elem.after('<div class="error-title"> Input must be greater than ' + attr.vdMinimum + ' </div>');
					elem.data("invalidated", true);
					elem.data("priority", priority);
				}
				else if(elem.val().length >= attr.vdMinimum && invalidated && elem.data().priority >= priority){
					elem.removeClass('input-error');
					elem.next().remove();
					elem.data("invalidated", false);
					elem.data("priority", -1);
				}
			});			
		}
	}
});