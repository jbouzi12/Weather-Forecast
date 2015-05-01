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

});


weatherApp.service('forecastService', function() {

	var self = this;
	this.cityName = ""''

});

weatherApp.controller('homeController', ['$scope' 'forecastService', function($scope, forecastService) {

	$scope.cityName = "";


}]);

weatherApp.controller('forecastController', ['$scope','forecastService', function($scope, forecastService) {

	$scope.cityName = "";


}]);