// MODULE

var weatherApp = angular.module("weatherApp", ['ngRoute', 'ngResource']);

weatherApp.config(function($routeProvider) {

	$routeProvider

	.when('/', {
		templateUrl:"views/home.html",
		controller:"homeController"

	})
	.when('', {
		templateUrl:"views/forecast.html",
		controller:"forecastController"

	})

});

weatherApp.controller('homeController', ['$scope', function($scope) {




}]);

weatherApp.controller('forecastController', ['$scope', function($scope) {



}]);