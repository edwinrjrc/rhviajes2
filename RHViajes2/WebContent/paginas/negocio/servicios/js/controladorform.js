var serviciosformapp = angular.module('serviciosformapp', []);

var ruta = {};
var pasajeros = [];
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

serviciosformapp.factory('servicioCompartido', function($rootScope) {
    var servicioCompartido = {};
    servicioCompartido.pasajeros = [];
    servicioCompartido.setPasajeros = function(paxs) {
        this.pasajeros = paxs;
        this.emitirItem();
    };
    servicioCompartido.ruta = [];
    servicioCompartido.setRuta = function(ruta) {
        this.ruta = ruta;
        this.emitirItem();
    };
    servicioCompartido.emitirItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };
    return servicioCompartido;
});

var formctrl = serviciosformapp.controller('formctrl', function($scope, $http,servicioCompartido) {
	$scope.listaMaestroServicio = [];
	$scope.detalleServicio = {};
	$scope.listarMaestroServicios = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listarMaestroServicios'}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.mensaje = response.data.mensaje;
							 $scope.listaMaestroServicio = response.data.objeto;
						 }
						 else{
							 console.log('Error en la llamada');
						 }
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
	var modalPasajeros = document.getElementById('modalPasajeros');
	modalShowPasajeros = function() {
		modalPasajeros.style.display = "block";
	};
	
	$scope.configuracionServicio = {};
	
	$scope.consultarConfiguracionServicio = function(){
		$http({method: 'POST', url: '../../../servlets/ServletServicioAgencia', params:{accion:'consultarConfiguacion',formulario:$scope.detalleServicio}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.configuracionServicio = response.data.objeto;
							 $scope.configuracionServicio.muestraPasajeros = true;
							 listarEmpresasServicio();
							 listarHoteles();
							 listarOperadores();
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	$scope.listaProveedores = [];
	listarEmpresasServicio = function(){
		$http({method: 'POST', url: '../../../servlets/ServletServicioAgencia', params:{accion:'proveedoresXServicio',formulario:$scope.detalleServicio}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.listaProveedores = response.data.objeto;
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	$scope.listaHoteles = [];
	listarHoteles = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'proveedoresXTipo',formulario:{tipoServicio:6}}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.listaHoteles = response.data.objeto;
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	$scope.listaOperadores = [];
	listarOperadores = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'proveedoresXTipo',formulario:{tipoServicio:3}}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.listaOperadores = response.data.objeto;
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	
	$scope.listaMonedas = [];
	listarMonedas = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listar',tipoMaestro:18}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.listaMonedas = response.data.objeto;
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	listarMonedas();
	
	$scope.$on('handleBroadcast', function() {
        $scope.detalleServicio.pasajeros = servicioCompartido.pasajeros;
        $scope.detalleServicio.ruta = servicioCompartido.ruta;
    });
	
	$scope.seleccionarProveedor = function(){
		$scope.muestraComision = true;
	}
	
	$scope.consultaComision = function(){
		
	}
	
	$scope.listaDetalleServicio = [];
});

var formmodalrutactrl =  serviciosformapp.controller('formmodalrutactrl', function($scope, $http, servicioCompartido) {
	$scope.selectedCountry = {};	
	$scope.countries = {};
	$scope.listaAerolineas = [];
	$scope.error = {};
	$scope.listaDestinos = [];
	$scope.listarDestinos = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listarDestinos',tipoMaestro:1}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
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
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	$scope.listarDestinos();
	$scope.listarAerolineas = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listarAerolineas'}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.estadoConsulta = response.data.exito;
							 if ($scope.estadoConsulta){
								 $scope.mensaje = response.data.mensaje;
								 $scope.listaAerolineas = response.data.objeto;
							 }
						 }
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
			servicioCompartido.setRuta(ruta);
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


var formmodalpasajeros = serviciosformapp.controller('formmodalpasajeros', function($scope,$http,servicioCompartido){
	$scope.pasajero = {};
	$scope.listaPasajeros = [];
	$scope.listaTipoDocumento = [];
	$scope.editar = false;
	$scope.nuevo = true;
	$scope.listarTipoDocumento = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listar',tipoMaestro:1}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.estadoConsulta = response.data.exito;
							 if ($scope.estadoConsulta){
								 $scope.mensaje = response.data.mensaje;
								 $scope.listaTipoDocumento = response.data.objeto;
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	$scope.listarTipoDocumento();
	$scope.listaNacionalidad = [];
	$scope.listarNacionalidad = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listarNacionalidad'}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.estadoConsulta = response.data.exito;
							 if ($scope.estadoConsulta){
								 $scope.mensaje = response.data.mensaje;
								 $scope.listaNacionalidad = response.data.objeto;
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	$scope.listarNacionalidad();
	$scope.listaAerolineas = [];
	$scope.listarAerolineas = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listarAerolineas'}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.estadoConsulta = response.data.exito;
							 if ($scope.estadoConsulta){
								 $scope.mensaje = response.data.mensaje;
								 $scope.listaAerolineas = response.data.objeto;
							 }
						 }
					 }
					 
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	$scope.listarAerolineas();
	$scope.listaRelaciones = [];
	$scope.listarRelaciones = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listarCatalogoMaestro'}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.estadoConsulta = response.data.exito;
							 if ($scope.estadoConsulta){
								 $scope.mensaje = response.data.mensaje;
								 $scope.listaRelaciones = response.data.objeto;
							 }
						 }
					 }
					 
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	$scope.listarRelaciones();
	$scope.mostrarError = false;
	$scope.agregarPasajero = function(){
		if(validarPasajero()){
			$scope.pasajero.id = $scope.listaPasajeros.length +1;
			for(var i=0; i<$scope.listaRelaciones.length; i++){
				if($scope.listaRelaciones[i].codigoEntero == $scope.pasajero.codigoRelacion){
					$scope.pasajero.relacion = $scope.listaRelaciones[i].nombre;
					break;
				}
			}
			$scope.listaPasajeros.push($scope.pasajero);
			$scope.pasajero = {};
			$scope.mostrarError = false;
		}
		else{
			$scope.mostrarError = true;
		}
		$scope.editar = false;
		$scope.nuevo = true;
	}
	
	validarPasajero = function(){
		var pasj = $scope.pasajero;
		if (pasj.tipoDocumento == "" || pasj.tipoDocumento == "undefined" || pasj.tipoDocumento == null){
			$scope.error = "Seleccione el tipo de documento";
			return false;
		}
		else if (pasj.numeroDocumento == "" || pasj.numeroDocumento == "undefined" || pasj.numeroDocumento == null){
			$scope.error = "Ingrese el número de documento";
			return false;
		}
		else if (pasj.nombres == "" || pasj.nombres == "undefined" || pasj.nombres == null){
			$scope.error = "Ingrese los nombres";
			return false;
		}
		else if (pasj.apePaterno == "" || pasj.apePaterno == "undefined" || pasj.apePaterno == null){
			$scope.error = "Ingrese el apellido paterno";
			return false;
		}
		else if (pasj.apeMaterno == "" || pasj.apeMaterno == "undefined" || pasj.apeMaterno == null){
			$scope.error = "Ingrese el apellido materno";
			return false;
		}
		else if (pasj.codigoRelacion == "" || pasj.codigoRelacion == "undefined" || pasj.codigoRelacion == null){
			$scope.error = "Seleccione la relacion";
			return false;
		}
		else if (pasj.nacionalidad == "" || pasj.nacionalidad == "undefined" || pasj.nacionalidad == null){
			$scope.error = "Seleccione la nacionalidad";
			return false;
		}
		return true;
	}
	
	$scope.eliminarPasajero=function(id){
		var idx = 0;
		for (var i=0; i<$scope.listaPasajeros.length; i++){
			var paxs = $scope.listaPasajeros[i];
			if (paxs.id == id){
				idx = i;
				break;
			}
		}
		$scope.listaPasajeros.splice(idx,1);
	}
	$scope.consultaLocalPaxs = function(id){
		var idx = 0;
		for (var i=0; i<$scope.listaPasajeros.length; i++){
			var paxs = $scope.listaPasajeros[i];
			if (paxs.id == id){
				idx = i;
				break;
			}
		}
		$scope.pasajero = $scope.listaPasajeros[idx];
		$scope.editar = true;
		$scope.nuevo = false;
	}
	$scope.actualizarPaxs = function(){
		var idx = 0;
		for (var i=0; i<$scope.listaPasajeros.length; i++){
			var paxs = $scope.listaPasajeros[i];
			if (paxs.id == $scope.pasajero.id){
				idx = i;
				break;
			}
		}
		$scope.listaPasajeros.splice(idx,1);
		
		if(validarPasajero()){
			$scope.pasajero.id = $scope.listaPasajeros.length +1;
			for(var i=0; i<$scope.listaRelaciones.length; i++){
				if($scope.listaRelaciones[i].codigoEntero == $scope.pasajero.codigoRelacion){
					$scope.pasajero.relacion = $scope.listaRelaciones[i].nombre;
					break;
				}
			}
			$scope.listaPasajeros.push($scope.pasajero);
			$scope.pasajero = {};
			$scope.mostrarError = false;
		}
		else{
			$scope.mostrarError = true;
		}
		$scope.editar = false;
		$scope.nuevo = true;
	}
	$scope.consultarPaxsSistema = function(){
		$http({method: 'POST', url: '../../../servlets/ServletServicioAgencia', params:{accion:'consultarPasajero', formulario: $scope.pasajero}}).then(
				 function successCallback(response) {
					 if (typeof response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.estadoConsulta = response.data.exito;
							 $scope.mensaje = response.data.mensaje;
							 var paxs = response.data.objeto;
							 if(paxs == null){
								 $scope.error = "No se encontro pasajero";
								 $scope.mostrarError = true;
							 }
							 else{
								 $scope.pasajero.nombres = paxs.nombres;
								 if (typeof paxs.pais != "undefined"){
									 $scope.pasajero.nacionalidad = paxs.pais.codigoEntero;
								 }
								 $scope.pasajero.apePaterno = paxs.apellidoPaterno;
								 $scope.pasajero.apeMaterno = paxs.apellidoMaterno;
								 if (typeof paxs.telefonoMovil != "undefined"){
									 $scope.pasajero.telefono1 = paxs.telefonoMovil.numeroTelefono;
								 }
								 $scope.pasajero.correoElectronico = paxs.correoElectronico;
								 $scope.pasajero.fechaVctoPasaporte = new Date(paxs.fechaVctoPasaporte);
								 $scope.pasajero.fechaNacimiento = new Date(paxs.fechaNacimiento);
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	$scope.aceptarPasajeros = function(){
		var modalPasajeros = document.getElementById('modalPasajeros');
		modalPasajeros.style.display = "none";
		servicioCompartido.setPasajeros($scope.listaPasajeros);
	}
});

formctrl.$inject = ['$scope', 'servicioCompartido'];
formmodalrutactrl.$inject = ['$scope', 'servicioCompartido'];
formmodalpasajeros.$inject = ['$scope', 'servicioCompartido'];
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