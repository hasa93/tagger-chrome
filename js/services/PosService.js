angular.module('TaggerApp').
factory('PosService', function($http){
	var o = {};

	o.getProductById = function(id, callBack){
		$http.get('http://localhost:3000/api/get/product/' + id).then(function(response){
			callBack(response);
		}, function(err){
			console.log("Request error: " + err);
		});
	}

	o.getProductCount = function(id, callBack){
		$http.get('http://localhost:3000/api/get/count/' + id).then(function(response){
			callBack(response);
		}, function(err){
			console.log("Request error: " + err);
		});
	}

	o.getInventoryLevels = function(callBack){
		$http.get('http://localhost:3000/api/get/inventory').then(function(repsonse){
		}, function(err){
			console.log("Request error: " + err);
			//return dummy inventory data. Should be removed before release
			callBack([{
				'prod_id': '0001',
				'prod_name': 'Ck y/a jeans',
				'prod_level': 1000
			},
			{
				'prod_id': '0002',
				'prod_name': 'FreshPumkin diapies',
				'prod_level': 200
			},
			{
				'prod_id': '0003',
				'prod_name': 'Atlantic pacifiers',
				'prod_level': 400
			},
			{
				'prod_id': '0004',
				'prod_name': 'SuperF4 Quad w/calibration',
				'prod_level': 20
			}])
		});
	}

	return o;
});