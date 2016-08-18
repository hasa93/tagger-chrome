angular.module('TaggerApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/admin");

	$stateProvider
	.state('cashier', {
		url: '/cashier',
		templateUrl: '/templates/cashier/cashiermain.html',
		controller: 'CashierCtrl',
		params:{
			defaultChildState: 'cashier.posview'
		}
	})
	.state('cashier.posview', {
		templateUrl: '/templates/cashier/postable.html',
		controller: 'PosCtrl'
	})
	.state('cashier.voucherview', {
		templateUrl: '/templates/cashier/voucherview.html',
		controller: 'VoucherCtrl'
	})
	.state('cashier.returnview', {
		templateUrl: '/templates/cashier/returnview.html',
		controller: 'ReturnCtrl'
	})
	.state('cashier.validatevoucher', {
		templateUrl: '/templates/cashier/validatevoucherform.html',
		controller: 'PosCtrl'
	})
	.state('cashier.returnform',{
		templateUrl: '/templates/cashier/returnform.html',
		controller: 'ReturnCtrl'
	})
	.state('cashier.createvoucher', {
		templateUrl: '/templates/cashier/createvoucherform.html',
		controller: 'VoucherCtrl'
	})
	.state('login',{
		url: '/login',
		templateUrl: '/templates/login.html',
		controller:'LoginCtrl'
	})
	.state('admin',{
		url: '/admin',
		templateUrl: '/templates/admin/adminmain.html',
		controller: 'AdminCtrl',
		params:{
			defaultChildState: 'admin.dashboard'
		}
	})
	.state('admin.dashboard',{
		url: '/admin',
		templateUrl:'/templates/admin/dashboard.html',
		controller: 'ChartCtrl'
	})
	.state('admin.cashiermgtview', {
		templateUrl: '/templates/admin/cashiermgtview.html',
		controller: 'CashierMgtCtrl'
	})
	.state('admin.cashiersignupview', {
		templateUrl: '/templates/admin/cashiersignupview.html',
		controller: 'CashierMgtCtrl'
	})
	.state('admin.cashierupdateview', {
		templateUrl: '/templates/admin/updatecashierview.html',
		controller: 'CashierMgtCtrl'
	})
	.state('admin.cashierdeleteview', {
		templateUrl: '/templates/admin/deletecashierview.html',
		controller: 'CashierMgtCtrl'
	})
	.state('admin.productsmgtview', {
		templateUrl: '/templates/admin/productsmgtview.html',
		controller: 'ProductsMgtCtrl'
	})
	.state('admin.createproductsview', {
		templateUrl: '/templates/admin/createproductsview.html',
		controller: 'ProductsMgtCtrl'
	})
	.state('admin.updateproductsview', {
		templateUrl: '/templates/admin/updateproductsview.html',
		controller: 'ProductsMgtCtrl'
	})
	.state('admin.deleteproductsview', {
		templateUrl: '/templates/admin/deleteproductsview.html',
		controller: 'ProductsMgtCtrl'
	})
	.state('admin.updatestockview', {
		templateUrl: '/templates/admin/updatestockview.html',
		controller: 'ProductsMgtCtrl'
	});
})
.run(function($state, $rootScope){
	$rootScope.$on('$stateChangeSuccess', function(event, toState){
		var defaultChild = toState.params.defaultChildState;
		if(defaultChild){
			$state.go(defaultChild);
		}
	});
});