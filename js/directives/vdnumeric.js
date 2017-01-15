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
				var elemPriority = elem.data().priority;

				var isValid = function(string){
					if(string === '') return true;
					if(isFinite(string) && parseInt(string) > -1){
						return true;
					}
					else{
						return false;
					}
				}

				if(!isValid(elem.val())){
					//The element is invalid under current validator
					$rootScope.isValid = false;

					if(!invalidated){
						//The element has not been validated before so add label
						elem.addClass('input-error');
						elem.after('<div class="error-title"> Input must be a number </div>');
						elem.data("invalidated", true);
						elem.data("priority", priority);
					}
					else if(invalidated && elemPriority > priority){
						//The element is checked before and invalidated by
						//a previous validator with less priority. So remove
						//it's label
						elem.next().remove();
						elem.after('<div class="error-title"> Input must be a number </div>');
						elem.data("priority", priority);
					}

				}
				else{
					if(invalidated && elemPriority == priority){
						elem.next().remove();
						elem.removeClass('input-error');
						elem.data("invalidated", false);
						$rootScope.isValid = true;
					}
				}

				// if(elem.val() != '' && !isNumeric(elem.val()) && (!invalidated || elemPriority > priority)){
				// 	elem.addClass('input-error');
				// 	elem.after('<div class="error-title"> Input must be a number </div>');
				// 	elem.data("invalidated", true);
				// 	elem.data("priority", priority);

				// 	$rootScope.isValid = false;
				// }
				// else if(isNumeric(elem.val()) && invalidated && elem.data().priority >= priority){
				// 	elem.removeClass('input-error');
				// 	elem.next().remove();
				// 	elem.data("invalidated", false);
				// 	elem.data("priority", -1);
				// }
			});
		}
	}
});