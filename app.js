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
		d10:"01d.png",
		d20:"02d.png",
		d30:"03d.png",
		d40:"04d.png",
		d90:"09d.png",
		d01:"09d.png",
		d11:"11d.png",
		d31:"13d.png",
		d05:"50d.png",
		n10:"01n.png",
		n20:"02n.png",
		n40:"02n.png",
		n90:"09d.png",
		n01:"09d.png",
		n11:"11d.png",
		n31:"13d.png",
		n05:"50n.png"
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

.controller('forecastController', ['$scope', '$routeParams','cityService','weatherForecast','weatherIcons', function($scope, $routeParams, cityService, weatherForecast, weatherIcons) {

	var self = this; 

	self.city = cityService.city;

	self.isF = true;

	self.days = $routeParams.days || '2';

	self.options = ['2', '5', '7'];
	self.weatherIcons = weatherIcons;

	console.log(self.weatherIcons);

	self.weatherResult = weatherForecast.getWeather(self.city, self.days)

	console.log(self.weatherResult);
	// Conversion & Formatting functions

	self.reverse = function(s) {
		return s.toString().split('').reverse.join('');
	};

	self.convertToCelsius = function(degK) {

		self.isF = false;

		return Math.round(degK - 273);

	};

	self.convertToFahrenheit = function(degK) {

		self.isF = true;

		return Math.round(1.8*(degK - 273) + 32);

	};

	this.formatDate = function(dt) {

		return new Date(dt * 1000); 

	};


}]);