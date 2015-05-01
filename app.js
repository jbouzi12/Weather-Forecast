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


weatherApp.service('cityService', function() {

	var self = this;
	this.city = "New York, NY";

});

weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {

	$scope.city = cityService.city;

	$scope.$watch('city', function() {
		cityService.city = $scope.city;
	})


}]);

weatherApp.controller('forecastController', ['$scope','cityService', function($scope, cityService) {

	$scope.city = cityService.city;


}]);