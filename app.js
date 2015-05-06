// MODULE

var weatherApp = angular.module("weatherApp", ['ngRoute', 'ngResource']);

weatherApp.config(function($routeProvider) {

	$routeProvider

	.when('/', {
		templateUrl:"views/home.html",
		controller:"homeController",
		controllerAs:"home"

	})
	.when('/forecast', {
		templateUrl:"views/forecast.html",
		controller:"forecastController",
		controllerAs:"forecast"

	})
	.when('/forecast/:days', {
		templateUrl:"views/forecast.html",
		controller:"forecastController",
		controllerAs:"forecast"
	})
	.otherwise({
		redirectTo:'/'
	})
});

// Services

weatherApp.service('cityService', function() {

	this.city = "New York, NY";

});

weatherApp.service('forecastService', ['$resource',function($resource) {

	var self = this;

	var apiKey = "c5619901934de5840a17ad7d6082c1ac";

	this.getWeather = function(city, days) {

	    var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

		return weatherAPI.get( { q: city, cnt: days, APPID: apiKey});

		
	};

		// TESTING CHART

	// $scope.jsonurl = $resource("http://openweathermap.org/data/2.1/history/city/?id=524901&cnt=80", {
	// 	callback:"JSON_CALLBACK"}, {get:{method:"JSONP"}});

	// $scope.sampleChart = $scope.jsonurl.get(jsonurl, getData).error(errorHandler);

}]);

// Controllers

weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {

	 // TODO: may need to remove city service, seems unnecessary
	var self = this;
	self.city = cityService.city;

	$scope.$watch('city', function() {

		cityService.city = self.city;
	
	});

	// this.searchCity = function(new_city) {
	// 	cityService.city = new_city;
	// };

	this.getForecast = function() {
		$location.path("/forecast");
	}

}]);

weatherApp.controller('forecastController', ['$scope', '$routeParams','cityService','forecastService', function($scope, $routeParams, cityService, forecastService) {

	this.city = cityService.city;

	this.days = $routeParams.days || '2';

	this.options = ['2', '5', '7'];

	this.weatherResult = forecastService.getWeather(this.city, this.days)

	
	// Conversion & Formatting functions

	this.convertToFahrenheit = function(degK) {

		return Math.round(1.8*(degK - 273) + 32);

	}

	this.formatDate = function(dt) {

		return new Date(dt * 1000); 

	}


}]);