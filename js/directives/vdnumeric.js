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
.directive('vdNumeric', function($rootScope){
	return{
		restrict: 'A',
		link: function(scope, elem, attr){	
			var priority = 1;

			$rootScope.$on('SUBMIT', function(val){
				var invalidated = elem.data().invalidated;

				var isNumeric = function(string){
					if(isFinite(string) && parseInt(string) > -1){
						return true;
					}
					else{
						return false;
					}
				}

				if(elem.val() != '' && !isNumeric(elem.val()) && !invalidated){
					elem.addClass('input-error');
					elem.after('<div class="error-title"> Input must be a number </div>');
					elem.data("invalidated", true);
					elem.data("priority", priority);
					console.log('not numeric');
					console.log(elem.data().priority);
				}
				else if(isNumeric(elem.val()) && invalidated && elem.data().priority >= priority){
					elem.removeClass('input-error');					
					elem.next().remove();
					elem.data("invalidated", false);
					elem.data("priority", -1);
				}
			});			
		}
	}
});