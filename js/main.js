angular.module('TaggerApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/main");

	$stateProvider
	.state('cashier', {
		url: '/main',
		templateUrl: '/templates/admindash.html',
		controller: 'AdminCtrl'
	})
	.state('cashier.Productmngview',{
		templateUrl:'/templates/Productmngview.html',
		controller:'AdminCtrl'
	})
	.state('cashier.posview', {
		templateUrl: '/templates/postable.html',
		controller: 'PosCtrl'
	})
	.state('cashier.voucherview', {
		templateUrl: '/templates/voucherview.html',
		controller: 'VoucherCtrl'
	})
	.state('cashier.returnview', {
		templateUrl: '/templates/returnview.html',
		controller: 'ReturnCtrl'
	})
	.state('cashier.validatevoucher', {
		templateUrl: '/templates/validatevoucher.html',
		controller: 'PosCtrl'
	})
	.state('cashier.returnform',{
		templateUrl: '/templates/returnform.html',
		controller: 'ReturnCtrl'
	})
	.state('cashier.createvoucher', {
		templateUrl: '/templates/createvoucher.html',
		controller: 'PosCtrl'
	})
	.state('login',{
		url: '/login',
		templateUrl: '/templates/login.html',
		controller:'LoginCtrl'
	})
	.state('admin',{
		templateUrl: '/templates/admindash.html',
		controller: 'AdminCtrl'
	});
});