/* Descargado desde http://www.codeseek.co/ */
angular.module('myApp', [])
.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
.service('Geolocator', function($q, $http){
  var API_URL = 'http://jjperezaguinaga.webscript.io/waymate?term=';
  this.searchFlight = function(term) {
    var deferred = $q.defer();
 $http.get(API_URL+term).then(function(flights){
   var _flights = {};
   var flights = flights.data;
   for(var i = 0, len = flights.length; i < len; i++) {
     _flights[flights[i].name] = flights[i].country;
   }
      deferred.resolve(_flights);
    }, function() {
      deferred.reject(arguments);
    });
    return deferred.promise;
  } 
})
.controller('myController', function($scope, $timeout, Geolocator) {
  $scope.selectedCountry = null;
  $scope.countries = {};
  $scope.mockSearchFlight = function() {
      $scope.countries= {
        'Zurich': 'Switzerland',
        'Canada': 'Vancouver',
        'Peru': 'Lima',
        'Chile': 'Santiago',
        'Colombia':'Bogota'
      }
  }
  $scope.searchFlight = function(term) {
    Geolocator.searchFlight(term).then(function(countries){
      $scope.countries = {
    	        'Zurich': 'Switzerland',
    	        'Canada': 'Vancouver',
    	        'Peru': 'Lima',
    	        'Chile': 'Santiago',
    	        'Colombia':'Bogota'
    	      };
    });
  }
})
.directive('keyboardPoster', function($parse, $timeout){
  var DELAY_TIME_BEFORE_POSTING = 0;
  return function(scope, elem, attrs) {
    
    var element = angular.element(elem)[0];
    var currentTimeout = null;
   
    element.oninput = function() {
      var model = $parse(attrs.postFunction);
      var poster = model(scope);
      
      if(currentTimeout) {
        $timeout.cancel(currentTimeout)
      }
      currentTimeout = $timeout(function(){
        poster(angular.element(element).val());
      }, DELAY_TIME_BEFORE_POSTING)
    }
  }
})