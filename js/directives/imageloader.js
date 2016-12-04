angular.module('TaggerApp')
.directive('thumbLoader', function($http, config, PosService){
	var baseUrl = config.locals.apiUrl;
	baseUrl = baseUrl.substring(0, baseUrl.length - 4);

	var linkFn = function(scope, elem, attrs){
		var imageUrl = attrs.src;
		console.log(baseUrl + imageUrl);

		$http.get(baseUrl + imageUrl, { responseType: "blob" }).then(function(response){
			var objUrl = URL.createObjectURL(response.data);
			PosService.pushObjUrl(objUrl);
			console.log(elem.attr);
			elem.attr('src', objUrl);
		}, function(err){
			console.log(err);
		});
	}

	return{
		restrict: 'A',
		link: linkFn
	}
})