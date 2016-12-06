angular.module('TaggerApp').
factory('PosService', function($http, $q, config){
	var o = {};
	var baseApiUrl = config.locals.apiUrl;
	var objUrls = [];

	o.getProductById = function(id){
		var deferred = $q.defer();

		$http.get(baseApiUrl + 'product/find/id/' + id).then(function(response){
			deferred.resolve(response.data[0]);
		}, function(err){
			deferred.reject(err);
		});

		return deferred.promise;
	}

	o.getProductsByName = function(name){
		var deferred = $q.defer();

		$http.get(baseApiUrl + 'product/find/name/' + name).then(function(response){
			deferred.resolve(response.data);
		}, function(err){
			deferred.reject({ status: 'ERROR', error: err });
		});

		return deferred.promise;
	}

	o.getProductByTag = function(tagId){
		var deferred = $q.defer();

		$http.get(baseApiUrl + 'product/find/uid/' + tagId).then(function(response){
			console.log(response.data);
			deferred.resolve(response.data[0]);
		}, function(err){
			deferred.reject(err);
		});

		return deferred.promise;
	}

	o.getProductCount = function(id){
		var deferred = $q.defer();

		$http.get(baseApiUrl + 'get/count/' + id).then(function(response){
			deferred.resolve(response.data[0]);
		}, function(err){
			console.log("Request error: " + err);
			deferred.reject(err);
		});

		return deferred.promise;
	}

	o.deleteProductById = function(prodId){
		var deferred = $q.defer();

		$http.post(baseApiUrl + 'product/delete/' + prodId).then(function(response){
			deferred.resolve({ status: "SUCCESS" });
		}, function(err){
			deferred.resolve({ status: "FAILED", error: err });
		});

		return deferred.promise;
	}

	o.updateProductById = function(prodId, newData){
		var deferred = $q.defer();

		$http.post(baseApiUrl + 'product/update/' + prodId, newData, {
			transformRequest: angular.identity,
			headers: { 'Content-Type' : undefined }
		}).then(function(response){
			deferred.resolve({ status: "SUCCESS" });
		}, function(err){
			deferred.resolve({ status: "FAILED", error: err });
		});

		return deferred.promise;
	}

	o.getInventoryLevels = function(){
		var deferred = $q.defer();

		var dummyInventory = [{
				'prod_id': '0001',
				'label': 'Ck y/a jeans',
				'value': 1000
			},
			{
				'prod_id': '0002',
				'label': 'FreshPumkin diapies',
				'value': 200
			},
			{
				'prod_id': '0003',
				'label': 'Atlantic pacifiers',
				'value': 400
			},
			{
				'prod_id': '0004',
				'label': 'SuperF4 Quad w/calibration',
				'value': 20
			}];

		$http.get(baseApiUrl + 'get/inventory').then(function(repsonse){
			deferred.resolve(response.data[0]);
		}, function(err){
			console.log("Request error: " + err);
			//return dummy inventory data. Should be removed before release
			deferred.resolve(dummyInventory); //This should be a reject in release
		});

		return deferred.promise;
	}

	o.insertProduct = function(product){
		var deferred = $q.defer();

		$http.post(baseApiUrl + 'product/insert', product, {
			transformRequest: angular.identity,
			headers: { 'Content-Type' : undefined }
		}).then(function(res){
			product.productId = res.data.insertId;
			deferred.resolve({ status: "SUCCESS", product: product });
		}, function(err){
			deferred.reject({ status: "FAILURE", error: err })
		})

		return deferred.promise;
	}

	o.getSalesData = function(startDate, endDate){
		//Return dummy data for now
		var salesData = [{
			label: '2016-08-16',
			value: 12000
		},
		{
			label: '2016-08-17',
			value: 15000
		},
		{
			label: '2016-08-19',
			value: 7000
		},
		{
			label: '2016-08-20',
			value: 10000
		},
		{
			label: '2016-08-23',
			value: 9500
		}];

		return salesData;
	}

	o.getProductList = function(){
		var deferred = $q.defer();

		$http.get(baseApiUrl + 'product/list').then(function(response){
			deferred.resolve(response.data);
		}, function(err){
			deferred.reject({ status: "ERROR", error: "Failed to fetch products"})
		});

		return deferred.promise;
	}


	o.pushObjUrl = function(objUrl){
		objUrls.push(objUrl);
	}

	o.revokeObjUrls = function(){
		objUrls.forEach(function(elem){
			console.log(elem);
			URL.revokeObjectURL(elem);
		});
		objUrls = [];
	}

	return o;
});