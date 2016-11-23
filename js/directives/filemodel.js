angular.module('TaggerApp')
.directive('fileHolder', function($parse){
	var linkFn = function(scope, elem, attrs){
		var model = $parse(attrs.fileHolder);
		var setter = model.assign;

		var reader = new FileReader();
		reader.addEventListener("load", function(){
			scope.$apply(function(){
				scope.thumbImage = reader.result;
			});
		})

		console.log("file model activated");

		elem.bind('change', function(){
			console.log("change...");
			scope.$apply(function(){
				var file = elem[0].files[0]
				console.log(file);
				setter(scope, file);
				reader.readAsDataURL(file);
			});
		});

	}

	return{
		restrict: 'A',
		link: linkFn
	}
});