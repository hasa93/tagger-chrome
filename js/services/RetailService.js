angular.module('TaggerApp')
.factory('RetailService', function($q, $http, config){
	var o = {}
	var baseApiUrl = config.locals.apiUrl;
	var invoiceItems = [];
	var total = 0;
	var voucherAmount = 0;

	var inInvoice = function(product){
		for(var i = 0; i < invoiceItems.length; i++){
			var id = product.id;

			if(id === invoiceItems[i].id){
				invoiceItems[i].qty += 1;
				total += product.price;
				return true;
			}
		}
		return false;
	}

	var insertToInvoiceList = function(product){
		if(!inInvoice(product) && product !== undefined){
				invoiceItems.push(product);
				total += product.price;
		}
	}

	o.createVoucher = function(voucher){
		var deferred = $q.defer();

		$http.post(baseApiUrl + 'retail/create/voucher', voucher)
		.then(function(response){
			deferred.resolve({ status: "SUCCESS" });
		}, function(err){
			deferred.reject({ status: "FAILURE", error: err });
		});

		return deferred.promise;
	}

	o.getVoucher = function(voucher_id){
		var deferred = $q.defer();

		$http.get(baseApiUrl + 'retail/find/voucher/' + voucher_id)
		.then(function(response){

			response = response.data[0];
			var voucher = {
				id: response.vouch_id,
				amount: response.vouch_amount,
				branch: response.branch_name,
				expiry: response.exp_date.split('T')[0]
			}

			deferred.resolve({ status: 'SUCCESS', data: voucher });
		}, function(err){
			deferred.reject({ status: "FAILURE", error: err});
		});

		return deferred.promise;
	}

	o.createInvoice = function(ticket){
		var deferred = $q.defer();

		$http.post(baseApiUrl + 'retail/create/invoice', ticket).then(function(response){
			deferred.resolve({ status: "SUCCESS", message: response });
		}, function(err){
			deffered.reject({ status:"ERROR", message: err });
		});

		return deferred.promise;
	}

	o.claimVoucher = function(voucher){
		voucherAmount += voucher.amount;
		total -= voucher.amount;

		if(total < 0){
			total = 0;
		}

	}

	o.insertProduct = function(product){
		insertToInvoiceList(product);
		console.log(invoiceItems);
	}

	o.removeProduct = function(index){
		invoiceItems.splice(index, 1);
	}

	o.dropQuantity = function(index){
		if(invoiceItems[index].qty == 1){
			o.removeProduct(index);
			return;
		}

		invoiceItems[index].qty -=1;
	}

	o.getInvoiceList = function(){
		return invoiceItems;
	}

	o.getInvoiceTotal = function(){
		return total;
	}

	o.getVoucherAmount = function(){
		return voucherAmount;
	}

	o.resetInvoice = function(){
		invoiceItems = [];
		total = 0;
		voucherAmount = 0;
	}

	return o;
});