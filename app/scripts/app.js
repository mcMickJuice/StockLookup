'use strict';

/**
 * @ngdoc overview
 * @name stockMarketApp
 * @description
 * # stockMarketApp
 *
 * Main module of the application.
 */
angular
  .module('stockMarketApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'stockDataModule'
  ]).config(function($stateProvider, $urlRouterProvider){
  	$urlRouterProvider.otherwise('/home');

  	$stateProvider
  		.state('home',{
  			url: '/',
  			templateUrl: 'views/home.html',
  			controller: 'homeCtrl',
  			controllerAs: 'ctrl'
  		})
  		.state('stocks',{
  			url:'/stocks',
  			templateUrl: 'views/stockIndex.html',
  			controller: 'stockCtrl',
  			controllerAs: 'ctrl'
  		})
      .state('stocks.detail',{
        url:'/stocks/:symbol',
        templateUrl: 'views/stockDetail.html',
        controller: 'stockCtrl',
        controllerAs: 'ctrl'
      });
  });
