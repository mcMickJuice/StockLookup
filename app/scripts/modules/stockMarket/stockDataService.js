(function(){
	function StockDataService($http, apiSettings){
		function _buildHttpConfig(action,params){
			var url = apiSettings.apiEndPoint + action + '/json'
			return {
				method: 'get',
				params: params,
				// responseType: 'json',
				url: url
			}
		}

		function _parseAndReturn(response){
			// var jsObjs = JSON.parse(response);
			// return jsObjs.data;
			return response.data;
		}

		function _createStockListing(response){
			
			var data = _parseAndReturn(response);
			if(data.Message){
				return {
					error: true,
					message: data.Message
				};
			}
			var isUp = data.ChangePercent >= 0;
			return {
				symbol: data.Symbol,
				currentPrice: {
					price: data.LastPrice.toFixed(2),
					isUp: isUp
				},
				high: data.High.toFixed(2),
				low: data.Low.toFixed(2),
				change: {
					price : data.ChangePercent.toFixed(3) + '%',
					isUp: isUp
				}
			}
		}

		// function _encodeJson(obj){
		// 	var json  = JSON.stringify(obj);
		// 	return EncodeUriComponent(json); //what if document is not available here?
		// }

		function lookupSymbols(query){
			//build Url
			var endpoint = apiSettings.entityEndpoints.Lookup;
			var config = _buildHttpConfig(endpoint,{input: query});

			return $http(config)
				.then(_parseAndReturn)
		}

		function getQuote(symbol){
			var endpoint = apiSettings.entityEndpoints.Quote;
			var config = _buildHttpConfig(endpoint, {symbol: symbol})

			return $http(config)
				.then(_createStockListing)
		}

		function getQuotes(symbols){
			return Promise.all(symbols.map(function(sym){
				return getQuote(sym);
			}));
		}

		function getChartData(symbol,chartOptions){
			// var encodedJson = encodeJson(chartOptions);
			var endpoint = apiSettings.entityEndpoints.InteractiveChart;
			var config = _buildHttpConfig(endpoint, {parameters: encodedJson})

			return $http(config)
			.then(_parseAndReturn)
		}

		return {
			lookupSymbols: lookupSymbols,
			getQuote: getQuote,
			getQuotes: getQuotes,
			getChartData: getChartData
		}
	}

	angular.module('stockDataModule')
	.factory('stockDataService',['$http','apiSettings',StockDataService]);
}())