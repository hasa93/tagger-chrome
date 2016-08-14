angular.module('TaggerApp')
.controller('ProductsMgtCtrl', function($scope, $state){

	var searchType = "";
	$scope.showSearch = false;

	$scope.goToCreateProductsView = function(){
		$state.go('admin.createproductsview');
	}

	$scope.searchProducts = function(action){
		$scope.showSearch = true;
		searchType = action;
	}

	$scope.cancelSearch = function(){
		$scope.showSearch = false;
	}

	$scope.confirmSearch = function(){
		if(searchType === 'deleteProduct'){
			$state.go('admin.deleteproductsview');
		}
		else if(searchType === 'updateProduct'){
			$state.go('admin.updateproductsview');
		}
		else if(searchType === 'updateStock'){
			$state.go('admin.updatestockview')
		}
	}
});