angular.module('TaggerApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider, configProvider){

	configProvider.locals = {
		apiUrl: 'http://localhost:3000/api/',
		branchId: 1
	}

	$urlRouterProvider.otherwise("/admin");

	$stateProvider
	.state('cashier', {
		url: '/cashier',
		templateUrl: '/templates/cashier/cashiermain.html',
		controller: 'CashierCtrl',
		params:{
			defaultChildState: 'cashier.posview',
			data:{
				role: 'cashier',
				authenticate: true
			}
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
			data:{
				role: 'admin',
				authenticate: true
			}
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
	});
})

.run(function($rootScope, $state, AuthService){
	$rootScope.$on('$stateChangeSuccess', function(event, toState){
		if(toState.params){
			var defaultChild = toState.params.defaultChildState;
			$state.go(defaultChild);
		}
	});

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams){
		var requireAuthentication = toState.params.data.authenticate;
		var userRole = toState.params.data.role;

		if(requireAuthentication && !AuthService.isLoggedIn()){
			$state.go('login');
			event.preventDefault();
		}
	});
});