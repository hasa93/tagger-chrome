angular.module('TaggerApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider, $httpProvider, configProvider){

	$httpProvider.interceptors.push('InterceptorService');

	configProvider.locals = {
		apiUrl: 'http://ec2-54-218-53-126.us-west-2.compute.amazonaws.com:3000/api/',
		branchId: 1
	}

	$urlRouterProvider.otherwise("/login");

	$stateProvider
	.state('cashier', {
		url: '/cashier',
		templateUrl: '/templates/cashier/cashiermain.html',
		controller: 'CashierCtrl',
		params:{
			authenticate: true,
			defaultChildState: 'cashier.posview'
		}
	})
	.state('cashier.posview', {
		templateUrl: '/templates/cashier/postable.html',
		controller: 'PosCtrl'
	})
	.state('cashier.voucherview', {
		templateUrl: '/templates/cashier/voucherview.html',
		controller: 'VoucherCtrl',
		params:{
			voucher: {}
		}
	})
	.state('cashier.returnview', {
		templateUrl: '/templates/cashier/returnview.html',
		controller: 'ReturnCtrl'
	})
	.state('cashier.validatevoucher', {
		templateUrl: '/templates/cashier/validatevoucherform.html',
		controller: 'VoucherCtrl',
		params:{
			voucher: {}
		}
	})
	.state('cashier.returnform',{
		templateUrl: '/templates/cashier/returnform.html',
		controller: 'ReturnCtrl'
	})
	.state('cashier.createvoucher', {
		templateUrl: '/templates/cashier/createvoucherform.html',
		controller: 'VoucherCtrl',
		params: {
			voucher: {}
		}
	})
	.state('login',{
		url: '/login',
		templateUrl: '/templates/login.html',
		controller:'LoginCtrl'
	})
	.state('reset',{
		url: '/reset',
		templateUrl: '/templates/resetpassword.html',
		controller:'LoginCtrl'
	})
	.state('admin',{
		url: '/admin',
		templateUrl: '/templates/admin/adminmain.html',
		controller: 'AdminCtrl',
		params:{
			authenticate: true,
			defaultChildState: 'admin.dashboard'
		}
	})
	.state('admin.dashboard',{
		url: '/admin',
		templateUrl:'/templates/admin/dashboard.html',
		controller: 'DashCtrl'
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
		controller: 'CashierMgtCtrl',
		params: {
			cashiers: { isArray : true }
		}
	})
	.state('admin.cashierdeleteview', {
		templateUrl: '/templates/admin/deletecashierview.html',
		controller: 'CashierMgtCtrl',
		params:{
			cashiers: { isArray: true }
		}
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
		controller: 'ProductsMgtCtrl',
		params:{
			products: { isArray: true }
		}
	})
	.state('admin.deleteproductsview', {
		templateUrl: '/templates/admin/deleteproductsview.html',
		controller: 'ProductsMgtCtrl',
		params:{
			products: { isArray: true }
		}
	})
	.state('admin.updatestockview', {
		templateUrl: '/templates/admin/updatestockview.html',
		controller: 'ProductsMgtCtrl'
	})
	.state('admin.productstats', {
		templateUrl: '/templates/admin/statview.html',
		controller: 'StatCtrl'
	});
})
.run(function($state, $rootScope, AuthService){
	$rootScope.$on('$stateChangeSuccess', function(event, toState){
		if(toState.params){
			if(toState.params.authenticate && !AuthService.isLoggedIn){
				$state.go('login');
			}
			var defaultChild = toState.params.defaultChildState;
			$state.go(defaultChild);
		}
	});
});