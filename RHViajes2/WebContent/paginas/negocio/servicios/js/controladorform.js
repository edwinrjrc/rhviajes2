var serviciosformapp = angular.module('serviciosformapp', []);

var ruta = {};
/*
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
});*/

serviciosformapp.controller('formctrl', ['$scope','$http', function($scope, $http) {
	$scope.listaMaestroServicio = [];
	$scope.detalleServicio = {};
	$scope.listarMaestroServicios = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listarMaestroServicios'}}).then(
				 function successCallback(response) {
					 console.log('Exito en la llamada');
					 $scope.estadoConsulta = response.data.exito;
					 if ($scope.estadoConsulta){
						 $scope.mensaje = response.data.mensaje;
						 $scope.listaMaestroServicio = response.data.objeto;
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	$scope.listarMaestroServicios();
	var modal = document.getElementById('modalRuta');
	// When the user clicks the button, open the modal 
	modalShow = function() {
		modal.style.display = "block";
	};
	$scope.configuracionServicio = {};
	
	$scope.consultarConfiguracionServicio = function(){
		$http({method: 'POST', url: '../../../servlets/ServletServicioAgencia', params:{accion:'consultarConfiguacion',formulario:$scope.detalleServicio}}).then(
				 function successCallback(response) {
					 console.log('Exito en la llamada');
					 $scope.configuracionServicio = response.data.objeto;
					 $scope.configuracionServicio.muestraPasajeros = true;
					 listarEmpresasServicio();
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	$scope.listaProveedores = [];
	listarEmpresasServicio = function(){
		$http({method: 'POST', url: '../../../servlets/ServletServicioAgencia', params:{accion:'proveedoresXServicio',formulario:$scope.detalleServicio}}).then(
				 function successCallback(response) {
					 console.log('Exito en la llamada');
					 $scope.listaProveedores = response.data.objeto;
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
}]);

serviciosformapp.controller('formmodalrutactrl', function($scope, $http) {
	$scope.selectedCountry = {};	
	$scope.countries = {};
	$scope.listaAerolineas = [];
	$scope.error = {};
	$scope.listaDestinos = [];
	$scope.listarDestinos = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listarDestinos',tipoMaestro:1}}).then(
				 function successCallback(response) {
					 console.log('Exito en la llamada');
					 $scope.estadoConsulta = response.data.exito;
					 if ($scope.estadoConsulta){
						 $scope.mensaje = response.data.mensaje;
						 $scope.listaDestinos = response.data.objeto;
						 /*for (var i=0; i<listaDestinos.length; i++){
							 var item = listaDestinos[i];
							 availableTags.push(item.descripcion+"("+item.codigoIATA+")")
						 }*/
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	$scope.listarDestinos();
	$scope.listarAerolineas = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listarAerolineas'}}).then(
				 function successCallback(response) {
					 console.log('Exito en la llamada');
					 $scope.estadoConsulta = response.data.exito;
					 if ($scope.estadoConsulta){
						 $scope.mensaje = response.data.mensaje;
						 $scope.listaAerolineas = response.data.objeto;
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	$scope.listarAerolineas();
	$scope.listaTramos = [];
	$scope.agregarTramo = function(){
		if ($scope.listaTramos.length == 0){
			var tramo = {};
			tramo.precioTramo = 0;
			tramo.id = 1;
		}
		else{
			var tramo = {};
			var tramoAnterior = $scope.listaTramos[$scope.listaTramos.length-1];
			tramo.id = parseInt(tramoAnterior.id) + 1;
			tramo.origen = tramoAnterior.destino;
			tramo.precioTramo = 0;
			tramo.codigoAerolinea = tramoAnterior.codigoAerolinea
		}
		$scope.listaTramos.push(tramo);
	};
	$scope.agregarTramoRegreso = function(){
		if ($scope.listaTramos.length > 0){
			var tramo = {};
			for (var i=$scope.listaTramos.length-1; i>=0; i--){
				var tramoAnterior = $scope.listaTramos[i];
				tramo = {};
				tramo.id = $scope.listaTramos.length;
				tramo.origen = tramoAnterior.destino;
				tramo.destino = tramoAnterior.origen;
				tramo.precioTramo = 0;
				tramo.codigoAerolinea = tramoAnterior.codigoAerolinea;
				$scope.listaTramos.push(tramo);
			}
		}
	}
	$scope.eliminarTramo = function(id){
		var idx = 0;
		for (var i=0; i<$scope.listaTramos.length; i++){
			var tramo = $scope.listaTramos[i];
			if (tramo.id == id){
				idx = i;
				break;
			}
		}
		$scope.listaTramos.splice(idx,1);
	};
	$scope.mostrarError = false;
	$scope.aceptarRuta = function (){
		if (validarRuta()){
			ruta.tramos = $scope.listaTramos;
			$scope.modalclose();
		}
		else{
			$scope.mostrarError = true;
		}
	};
	$scope.modalclose = function(){
		var modal = document.getElementById('modalRuta');
		modal.style.display = "none";
	};
	
	validarRuta = function(){
		for (var i=0; i<$scope.listaTramos.length; i++){
			var tramo = $scope.listaTramos[i];
			if (tramo.origen == "" || tramo.origen == "undefined" || tramo.origen == null){
				$scope.error = "Ingrese el origen del tramo "+tramo.id;
				return false;
			}
			else if (tramo.fechaSalida == "" || tramo.fechaSalida == "undefined" || tramo.fechaSalida == null){
				$scope.error = "Ingrese la fecha salida del tramo "+tramo.id;
				return false;
			}
			else if (tramo.destino == "" || tramo.destino == "undefined" || tramo.destino == null){
				$scope.error = "Ingrese el destino del tramo "+tramo.id;
				return false;
			}
			else if (tramo.fechaLlegada == "" || tramo.fechaLlegada == "undefined" || tramo.fechaLlegada == null){
				$scope.error = "Ingrese la fecha de llegada del tramo "+tramo.id;
				return false;
			}
			else if (tramo.codigoAerolinea == "" || tramo.codigoAerolinea == "undefined" || tramo.codigoAerolinea == null){
				$scope.error = "Seleccione la aerolinea del tramo "+tramo.id;
				return false;
			}
		}
		$scope.mostrarError = false;
		return true;
	};
});

/*
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
*/