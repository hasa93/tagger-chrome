angular.module('TaggerApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/admin");

	$stateProvider
	.state('cashier', {
		url: '/cashier',
		templateUrl: '/templates/cashier/cashiermain.html',
		controller: 'CashierCtrl'
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
		controller: 'PosCtrl'
	})
	.state('login',{
		url: '/login',
		templateUrl: '/templates/login.html',
		controller:'LoginCtrl'
	})
	.state('admin',{
		url: '/admin',
		templateUrl: '/templates/admin/adminmain.html',
		controller: 'AdminCtrl'
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
		controller: 'SignUpController'
	})
	.state('admin.cashierupdateview', {
		templateUrl: '/templates/admin/updatecashierview.html'
	})
	.state('admin.cashierdeleteview', {
		templateUrl: '/templates/admin/deletecashierview.html'
	});
});