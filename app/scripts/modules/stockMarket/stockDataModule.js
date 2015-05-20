(function(){
	angular.module('stockDataModule',[])
	.constant('apiSettings',{
		apiEndPoint: 'http://dev.markitondemand.com/Api/v2/',
		entityEndpoints: {
			Quote: 'Quote',
			Lookup: 'Lookup',
			InteractiveChart: 'InteractiveChart'
		}	
	})
}())