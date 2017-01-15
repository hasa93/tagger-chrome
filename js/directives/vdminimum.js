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
			var isDestroyed = false;

			var isValid = function(string){
				console.log(string);

				if(string.length > 0 && string.length < attr.vdMinimum){
					console.log("vdMinimum failed");
					return false;
				}
				console.log("vdMinimum passed");
				return true;
			}

			scope.$on('$destroy', function(){
				console.log('destroyed')
				isDestroyed = true;
			});

			if(isDestroyed){
				return;
			}

			$rootScope.$on('SUBMIT', function(val){
				var invalidated = elem.data().invalidated;
				var elemPriority = elem.data().priority;

				if(!isValid(elem.val())){
					//The element is invalid under current validator
					$rootScope.isValid = false;

					if(!invalidated){
						//The element has not been validated before so add label
						elem.addClass('input-error');
						elem.after('<div class="error-title"> Input must be at least ' + attr.vdMinimum + ' </div>');
						elem.data("invalidated", true);
						elem.data("priority", priority);
					}
					else if(invalidated && elemPriority > priority){
						//The element is checked before and invalidated by
						//a previous validator with less priority. So remove
						//it's label
						elem.next().remove();
						elem.after('<div class="error-title"> Input must be at least ' + attr.vdMinimum + ' </div>');
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
			});
		}
	}
});