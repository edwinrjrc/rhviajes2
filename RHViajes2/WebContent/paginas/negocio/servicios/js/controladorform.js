var serviciosformapp = angular.module('serviciosformapp', []);

var config = serviciosformapp.config(['$httpProvider',function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

var servicio=config.service('Geolocator', function($q, $http) {
	this.searchFlight = function(term) {
		var deferred = $q.defer();
		$http({method: 'POST', url: '../../../servlets/ServletServicioAgencia', params:{accion:'listarDestinos',tipoMaestro:1}}).then(
			 function successCallback(response) {
				 console.log('Exito en la llamada');
				 var estadoConsulta = response.data.exito;
				 var destinos = {};
				 if (estadoConsulta){
					 listaDestinos = response.data.objeto;
					 for (var i=0; i<listaDestinos.length; i++){
						 var item = listaDestinos[i];
						 destinos[item.descripcion+"("+item.codigoIATA+")"] = item.codigoIATA; 
					 }
				 }
				 deferred.resolve(destinos);
		  }, function errorCallback(response) {
			  	 deferred.reject(arguments);
			     console.log('Error en la llamada');
		  });
	      return deferred.promise;
	  	};
});

serviciosformapp.controller('formctrl', ['$scope','$http','$timeout', function($scope, $http, $timeout, Geolocator) {
	var availableTags = [];
	var listaDestinos = [];
	$scope.listarDestinos = function(){
		$http({method: 'POST', url: '../../../servlets/ServletServicioAgencia', params:{accion:'listarDestinos',tipoMaestro:1}}).then(
				 function successCallback(response) {
					 console.log('Exito en la llamada');
					 $scope.estadoConsulta = response.data.exito;
					 if ($scope.estadoConsulta){
						 $scope.mensaje = response.data.mensaje;
						 listaDestinos = response.data.objeto;
						 for (var i=0; i<listaDestinos.length; i++){
							 var item = listaDestinos[i];
							 availableTags.push(item.descripcion+"("+item.codigoIATA+")")
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	
	var modal = document.getElementById('modalRuta');

	// When the user clicks the button, open the modal 
	modalShow = function() {
		modal.style.display = "block";
	}
	
	$scope.listarDestinos();
}]);

servicio.controller('formmodalrutactrl', function($scope, $timeout, Geolocator) {
	$scope.selectedCountry = {};	
	$scope.countries = {};
	$scope.searchFlight = function(term) {
		Geolocator.searchFlight(term).then(function(countries){
	      $scope.countries = countries;
	    });
	};
	
	$scope.listaTramos = [];
	$scope.agregarTramo = function(){
		if ($scope.listaTramos.length == 0){
			var tramo = {};
			tramo.precioTramo = 0;
			$scope.listaTramos.push(tramo);
		}
	};
}).directive('keyboardPoster', function($parse, $timeout){
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
});