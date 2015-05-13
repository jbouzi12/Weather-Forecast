// MODULE

// TODO:
// - Use ng-show/ng-click for 'f'&'c' buttons
// - Add min/max temperature

angular.module("weatherApp", ['ngRoute', 'ngResource', 'ngAnimate'])

.config(['$routeProvider', function($routeProvider) {

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
}])

// Services

.service('cityService', function() {

	this.city = "New York, NY";

})

.directive('cityMap', function() {

	return {

		restrict:'E',
		template:"<div></div>",
		replace: true,
		link: function(scope, element, attrs) {

			var city = scope.forecastCtrl.city;

			var geocoder = new google.maps.Geocoder();


			var myLatLng = new google.maps.LatLng(40.75058, -73.99358);
			
			var mapOptions = {
				center: myLatLng,
				zoom: 12,
				mapTypeId: google.maps.MapTypeId.TERRAIN
			};
			
			var map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);

			var marker = new google.maps.Marker({
			    position: myLatLng,
			    map: map,
			    title: 'Forecast Location'
		    });

			geocoder.geocode({'address':city}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					map.setCenter(results[0].geometry.location);

				} else {

					alert('error');

				}
			});



		    marker.setMap(map);
		}

	};

})

.factory('weatherForecast', ['$resource',function weatherForecastFactory($resource) {

	var apiKey = "c5619901934de5840a17ad7d6082c1ac";

    var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
	
	return {
		getWeather:function(city, days) {
			return weatherAPI.get( { q:city, cnt: days, APPID: apiKey})
		}
	};		

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

	$scope.city = cityService.city;

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