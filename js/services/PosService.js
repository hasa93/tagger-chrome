angular.module('TaggerApp').
factory('PosService', function($http, $q){
	var o = {};

	o.getProductById = function(id){
		var deferred = $q.defer();

		$http.get('http://localhost:3000/api/product/find/id/' + id).then(function(response){
			deferred.resolve(response.data[0]);
		}, function(err){
			deferred.reject(err);
		});

		return deferred.promise;
	}

	o.getProductCount = function(id){
		var deferred = $q.defer();

		$http.get('http://localhost:3000/api/get/count/' + id).then(function(response){
			deferred.resolve(response.data[0]);
		}, function(err){
			console.log("Request error: " + err);
			deferred.reject(err);
		});

		return deferred.promise;
	}

	o.getInventoryLevels = function(){
		var deferred = $q.defer();

		var dummyInventory = [{
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
			}];

		$http.get('http://localhost:3000/api/get/inventory').then(function(repsonse){
			deferred.resolve(response.data[0]);
		}, function(err){
			console.log("Request error: " + err);
			//return dummy inventory data. Should be removed before release
			deferred.resolve(dummyInventory); //This should be a reject in release
		});

		return deferred.promise;
	}

	return o;
});