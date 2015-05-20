(function(){
	'use strict';

	function StockCtrl($scope,stockDataService, $stateParams,appConfig ){
		var self = this;
		self.title = "Title";
		self.symbols = appConfig.defaultSymbols;

		$scope.lookupSymbols = function(query){
			stockDataService.lookupSymbols(query)
			.then(function(response){
				self.symResults = response;
			})
		};

		$scope.lookupQuote = function(symbol){
			stockDataService.getQuote(symbol)
			.then(function(response){
				if(response.error){
					console.log(response.message);
				}else{
					self.quotes.push(response);					
				}
			}).catch(onError);

		};

		$scope.lookupChartData = function(symbol){
			stockDataService.getChartData(symbol)
			.then(function(response){
				self.chartDataResults = response;
			}).catch(onError);

		};

		// $scope.getQuotes = function()
		var getQuotes = function(){
			var symbols = self.symbols;
			stockDataService.getQuotes(symbols)
			.then(function(response){
				if(response.error){
					console.log(response.message);
				}else{
					self.quotes = response;
				}
				
				$scope.$apply()
			}).catch(onError);
		};

		function onError(error){
			console.error(error);
		}

		function init(){
			if($stateParams.symbol){ //detail page
				getQuoteInfo($stateParams.symbol);
			}else{
				getQuotes();
			}
		}
		init();

	}

	angular.module('stockMarketApp')
	.controller('stockCtrl',['$scope','stockDataService','$stateParams','appConfig',StockCtrl]);
}());