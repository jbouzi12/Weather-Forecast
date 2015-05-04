// MODULE

var weatherApp = angular.module("weatherApp", ['ngRoute', 'ngResource']);

weatherApp.config(function($routeProvider) {

	$routeProvider

	.when('/', {
		templateUrl:"views/home.html",
		controller:"homeController"

	})
	.when('/forecast', {
		templateUrl:"views/forecast.html",
		controller:"forecastController"

	})
	.when('/forecast/:days', {
		templateUrl:"views/forecast.html",
		controller:"forecastController"
	})
});


weatherApp.service('cityService', function() {

	this.city = "New York, NY";

});

// Controllers

weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {

	$scope.city = cityService.city;

	$scope.$watch('city', function() {

		cityService.city = $scope.city;
	
	});


}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams','cityService', function($scope, $resource, $routeParams, cityService) {

	$scope.city = cityService.city;

	$scope.days = $routeParams.days || '2';

	$scope.forecastOptions = ['2', '5', '7'];

	// Weather API

	var apiKey = "c5619901934de5840a17ad7d6082c1ac";

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

	$scope.weatherResult = $scope.weatherAPI.get( { q: $scope.city, cnt: $scope.days, APPID: apiKey});

	console.log($scope.weatherResult);
	// TESTING CHART

	// $scope.jsonurl = $resource("http://openweathermap.org/data/2.1/history/city/?id=524901&cnt=80", {
	// 	callback:"JSON_CALLBACK"}, {get:{method:"JSONP"}});

	// $scope.sampleChart = $scope.jsonurl.get(jsonurl, getData).error(errorHandler);
	
	// Format & Conversion Methods

	$scope.convertToFahrenheit = function(degK) {

		return Math.round(1.8*(degK - 273) + 32);

	}

	$scope.formatDate = function(dt) {

		return new Date(dt * 1000); 

	}


}]);