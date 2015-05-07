// MODULE

// TODO:
// - Create method for celcius conversion
// - Use ng-show/ng-click for 'f'&'c' buttons
// - create factory to serve as directory of weather images
	// - based on clouds '#' of forecast, 
	// 	 return that specific url for thumbnail
// - Add min/max temperature

angular.module("weatherApp", ['ngRoute', 'ngResource'])

.config(function($routeProvider) {

	$routeProvider

	.when('/', {
		templateUrl:"views/home.html",
		controller:"homeController",
		controllerAs:"homeCtrl"

	})
	.when('/forecast', {
		templateUrl:"views/forecast.html",
		controller:"forecastController",
		controllerAs:"forecastCtrl"

	})
	.when('/forecast/:days', {
		templateUrl:"views/forecast.html",
		controller:"forecastController",
		controllerAs:"forecastCtrl"
	})
	.otherwise({
		redirectTo:'/'
	})
})

// Services

.service('cityService', function() {

	this.city = "New York, NY";

})

.factory('weatherForecast', ['$resource',function weatherForecastFactory($resource) {

	var apiKey = "c5619901934de5840a17ad7d6082c1ac";

    var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
	
	return {
		getWeather:function(city, days) {
			return weatherAPI.get( { q:city, cnt: days, APPID: apiKey})
		}
	};		
	// TESTING CHART

	// $scope.jsonurl = $resource("http://openweathermap.org/data/2.1/history/city/?id=524901&cnt=80", {
	// 	callback:"JSON_CALLBACK"}, {get:{method:"JSONP"}});

	// $scope.sampleChart = $scope.jsonurl.get(jsonurl, getData).error(errorHandler);

}])

.factory('weatherIcons', function weatherIconsFactory() {
	return {
		01d:'01d.png',
		02d:'02d.png',
		03d:'03d.png',
		04d:'04d.png',
		09d:'09d.png',
		10d:'09d.png',
		11d:'11d.png',
		13d:'13d.png',
		50d:'50d.png',
		01n:'01n.png',
		02n:'02n.png',
		04n:'02n.png',
		09n:'09d.png',
		10n:'09d.png',
		11n:'11d.png',
		13n:'13d.png',
		50n:'50n.png'
	};
})

// Controllers

.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {

	 // TODO: Convert to use 'Controller as' convention
	$scope.city = cityService.city;
	// var self = this;
	// self.city = 'New York, NY';

	// self.updateCity = function(newCity) {
	// 	self.city = newCity;
	// }

	$scope.$watch('city', function() {

		cityService.city = $scope.city;
	
	});

	$scope.getForecast = function() {
		$location.path("/forecast");
	}

}])

.controller('forecastController', ['$scope', '$routeParams','cityService','weatherForecast', function($scope, $routeParams, cityService, weatherForecast) {

	var self = this; 

	self.city = cityService.city;

	self.isF = true;

	self.days = $routeParams.days || '2';

	self.options = ['2', '5', '7'];

	self.weatherResult = weatherForecast.getWeather(self.city, self.days)

	console.log(self.weatherResult);
	// Conversion & Formatting functions

	self.convertToCelsius = function(degK) {

		self.isF = false;

		return Math.round(degK - 273);

	}

	self.convertToFahrenheit = function(degK) {

		self.isF = true;

		return Math.round(1.8*(degK - 273) + 32);

	}

	this.formatDate = function(dt) {

		return new Date(dt * 1000); 

	}


}]);