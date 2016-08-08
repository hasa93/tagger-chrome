angular.module('TaggerApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/main");

	$stateProvider
	.state('main', {
		url: '/main',
		views:{
			'': { 
					templateUrl: '/templates/cashiermain.html',
					controller: 'CashierCtrl'
				}
		}
	})
	.state('main.posview', {
		templateUrl: '/templates/postable.html',
		controller: 'PosCtrl'
	})
	.state('main.voucherview', {
		templateUrl: '/templates/voucherview.html',
		controller: 'VoucherCtrl'
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