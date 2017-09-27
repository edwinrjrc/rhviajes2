var serviciosformapp = angular.module('serviciosformapp', []);

var ruta = {};
var pasajeros = [];
/*
 * var config = serviciosformapp.config(['$httpProvider',function($httpProvider) {
 * $httpProvider.defaults.useXDomain = true; delete
 * $httpProvider.defaults.headers.common['X-Requested-With']; }]);
 * 
 * var servicio=config.service('Geolocator', function($q, $http) {
 * this.searchFlight = function(term) { var deferred = $q.defer();
 * $http({method: 'POST', url: '../../../servlets/ServletServicioAgencia',
 * params:{accion:'listarDestinos',tipoMaestro:1}}).then( function
 * successCallback(response) { console.log('Exito en la llamada'); var
 * estadoConsulta = response.data.exito; var destinos = {}; if (estadoConsulta){
 * listaDestinos = response.data.objeto; for (var i=0; i<listaDestinos.length;
 * i++){ var item = listaDestinos[i];
 * destinos[item.descripcion+"("+item.codigoIATA+")"] = item.codigoIATA; } }
 * deferred.resolve(destinos); }, function errorCallback(response) {
 * deferred.reject(arguments); console.log('Error en la llamada'); }); return
 * deferred.promise; }; });
 */

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
	$scope.servicioVenta = {};
	$scope.detalleServicio = {};
	$scope.servicioVenta.totalComision = 0;
	$scope.servicioVenta.totalServicios = 0;
	$scope.detalleServicio.conIgv = true;
	$scope.muestraAplicaIgv = false;
	$scope.listaServiciosPadre = [];
	$scope.muestraServicioPadre = false;
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
							 $scope.detalleServicio.tipoServicio = response.data.objeto2;
							 listarEmpresasServicio();
							 listarHoteles();
							 listarOperadores();
							 $scope.detalleServicio.idmoneda = $scope.servicioVenta.monedaFacturacion; 
							 $scope.muestraServicioPadre = true;
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
		$http({method: 'POST', url: '../../../servlets/ServletServicioAgencia', params:{accion:'consultarAplicaIgv',idservicio:$scope.detalleServicio.idTipoServicio}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.muestraAplicaIgv = response.data.objeto;
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
        $scope.detalleServicio.descpasajeros = "";
        for (var i=0; i<$scope.detalleServicio.pasajeros.length; i++){
        	var paxs = $scope.detalleServicio.pasajeros[i];
        	$scope.detalleServicio.descpasajeros = $scope.detalleServicio.descpasajeros + paxs.nombres+" "+paxs.apePaterno + " / ";
        }
        $scope.detalleServicio.cantidad = $scope.detalleServicio.pasajeros.length;
        $scope.detalleServicio.ruta = servicioCompartido.ruta;
    });
	
	$scope.seleccionarProveedor = function(){
		$scope.muestraComision = true;
		$scope.detalleServicio.servicioProveedor = {};
		$scope.detalleServicio.servicioProveedor.proveedor = {};
		$scope.detalleServicio.servicioProveedor.proveedor.id = $scope.detalleServicio.idProveedor; 
	}
	var valorIgv =0;
    $scope.consultaValorIGV = function(){
    	$http({method: 'POST', url: '../../../servlets/ServletParametros', 
			params:{accion:'consultarIGV'}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 valorIgv = parseFloat(response.data.objeto);
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
    $scope.consultaValorIGV();
	
	$scope.consultaComision = function(){
		
	}
	
	$scope.listaDetalleServicio = [];
	$scope.agregarServicio = function(){
		var tipoCambio = 1;
		if ($scope.detalleServicio.idmoneda != $scope.servicioVenta.monedaFacturacion){
			var form = {};
			form.monedaOrigen = $scope.detalleServicio.idmoneda;
			form.monedaDestino = $scope.servicioVenta.monedaFacturacion;
			form.fecha = $scope.servicioVenta.fechaServicio;
			$http({method: 'POST', url: '../../../servlets/ServletConsultas', 
				params:{accion:'consultaTipoCambio',formulario:form}}).then(
					 function successCallback(response) {
						 if (response.data.exito == "undefined" || response.data.exito == undefined){
							 location.href="../../../";
						 }
						 else{
							 if (response.data.exito){
								 console.log('Exito en la llamada');
								 tipoCambio = response.data.objeto;
							 }
						 }
				  }, function errorCallback(response) {
					     console.log('Error en la llamada');
				  });
		}
		var form = {};
		form.tipoServicio = $scope.detalleServicio.idTipoServicio;
		$http({method: 'POST', url: '../../../servlets/ServletConsultas', 
			params:{accion:'consultaTipoServicio',formulario:form}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.detalleServicio.tipoServicio = response.data.objeto;
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
		if(!$scope.detalleServicio.tipoServicio.servicioPadre){
			for(var i=0; i<$scope.listaDetalleServicio.length; i++){
				var detalle = $scope.listaDetalleServicio[0];
				if (detalle.codigoEntero==$scope.detalleServicio.codigoServicioPadre){
					if ($scope.detalleServicio.fechaServicio ==null|| $scope.detalleServicio.fechaServicio ==undefined){
						$scope.detalleServicio.fechaServicio = detalle.fechaServicio;
						$scope.detalleServicio.fechaServicio = detalle.fechaServicio;
					}
					if ($scope.detalleServicio.cantidad == 0 || $scope.detalleServicio.cantidad == undefined) {
						$scope.detalleServicio.cantidad = detalle.cantidad;
					}
					break;
				}
			}
		}
		if ($scope.detalleServicio.fechaServicio ==null|| $scope.detalleServicio.fechaServicio ==undefined){
			$scope.detalleServicio.fechaServicio = new Date();
		}
		if ($scope.detalleServicio.tipoServicio.servicioPadre && ($scope.detalleServicio.fechaServicio == null || $scope.detalleServicio.fechaServicio == undefined)){
			if ($scope.detalleServicio.ruta != null && $scope.detalleServicio.ruta != undefined){
				if ($scope.detalleServicio.ruta.tramos != null && $scope.detalleServicio.ruta.tramos != undefined){
					$scope.detalleServicio.fechaServicio = $scope.detalleServicio.ruta.tramos[0].fechaSalida;
				}
			}
			else{
				$scope.detalleServicio.fechaServicio = new Date();
				$scope.detalleServicio.fechaIda = new Date();
			}
		}
		if ($scope.configuracionServicio.muestraProveedor){
			for(var i=0; i<$scope.listaProveedores.length; i++){
				if ($scope.listaProveedores[i].codigoEntero == $scope.detalleServicio.servicioProveedor.proveedor.id){
					$scope.detalleServicio.servicioProveedor.proveedor.nombre = $scope.listaProveedores[i].nombreProveedor;
					break;
				}
			}
		}
		if($scope.configuracionServicio.muestraAerolinea){
			if ($scope.detalleServicio.idAerolinea ==null || $scope.detalleServicio.idAerolinea ==undefined){
				form.idProveedor = $scope.detalleServicio.idAerolinea;
				$http({method: 'POST', url: '../../../servlets/ServletConsultas', 
					params:{accion:'consultarProveedor',formulario:form}}).then(
						 function successCallback(response) {
							 if (response.data.exito == "undefined"){
								 location.href="../../../";
							 }
							 else{
								 if (response.data.exito){
									 console.log('Exito en la llamada');
									 $scope.detalleServicio.aerolinea = response.data.objeto;
								 }
							 }
					  }, function errorCallback(response) {
						     console.log('Error en la llamada');
					  });
			}
		}
		if($scope.configuracionServicio.muestraOperadora){
			if ($scope.detalleServicio.idOperador ==null || $scope.detalleServicio.idOperador ==undefined){
				form.idProveedor = $scope.detalleServicio.idOperador;
				$http({method: 'POST', url: '../../../servlets/ServletConsultas', 
					params:{accion:'consultarProveedor',formulario:form}}).then(
						 function successCallback(response) {
							 if (response.data.exito == "undefined"){
								 location.href="../../../";
							 }
							 else{
								 if (response.data.exito){
									 console.log('Exito en la llamada');
									 $scope.detalleServicio.operador = response.data.objeto;
								 }
							 }
					  }, function errorCallback(response) {
						     console.log('Error en la llamada');
					  });
			}
		}
		if($scope.configuracionServicio.muestraHotel){
			if ($scope.detalleServicio.idHotel ==null || $scope.detalleServicio.idHotel ==undefined){
				form.idProveedor = $scope.detalleServicio.idHotel;
				$http({method: 'POST', url: '../../../servlets/ServletConsultas', 
					params:{accion:'consultarProveedor',formulario:form}}).then(
						 function successCallback(response) {
							 if (response.data.exito == "undefined"){
								 location.href="../../../";
							 }
							 else{
								 if (response.data.exito){
									 console.log('Exito en la llamada');
									 $scope.detalleServicio.hotel = response.data.objeto;
								 }
							 }
					  }, function errorCallback(response) {
						     console.log('Error en la llamada');
					  });
			}
		}
		if ($scope.detalleServicio.descripcionServicio == null || $scope.detalleServicio.descripcionServicio == undefined){
			$scope.detalleServicio.descripcionServicio = generarDescripcionServicio($scope.detalleServicio)
		}
		else{
			$scope.detalleServicio.descripcionServicio = generarDescripcionServicio($scope.detalleServicio) + $scope.detalleServicio.descripcionServicio;
		}
		$scope.detalleServicio.descripcionServicio = $scope.detalleServicio.descripcionServicio.toUpperCase();
		
		if ($scope.detalleServicio.cantidad == 0 || $scope.detalleServicio.cantidad == undefined) {
			$scope.detalleServicio.cantidad = 1;
		}
		$scope.detalleServicio.precioUnitario = tipoCambio * $scope.detalleServicio.precioBaseInicial;
		$scope.detalleServicio.total = $scope.detalleServicio.cantidad * $scope.detalleServicio.precioUnitario;
		if ($scope.detalleServicio.aplicaIgv){
			if ($scope.detalleServicio.conIgv){
				$scope.detalleServicio.precioSinIgv = $scope.detalleServicio.total / (1+valorIgv);
				$scope.detalleServicio.montoIgv = $scope.detalleServicio.total - $scope.detalleServicio.total;
				$scope.detalleServicio.totalServicio = $scope.detalleServicio.precioSinIgv + $scope.detalleServicio.montoIgv;
			}
			else{
				$scope.detalleServicio.precioSinIgv = $scope.detalleServicio.total;
				$scope.detalleServicio.montoIgv = $scope.detalleServicio.total * valorIgv;
				$scope.detalleServicio.totalServicio = $scope.detalleServicio.precioSinIgv + $scope.detalleServicio.montoIgv;
			}
		}
		else{
			if ($scope.detalleServicio.conIgv){
				$scope.detalleServicio.precioSinIgv = $scope.detalleServicio.total / (1+valorIgv);
				$scope.detalleServicio.montoIgv = $scope.detalleServicio.total - $scope.detalleServicio.total;
				$scope.detalleServicio.totalServicio = $scope.detalleServicio.precioSinIgv + $scope.detalleServicio.montoIgv;
			}
			else{
				$scope.detalleServicio.precioSinIgv = $scope.detalleServicio.total;
				$scope.detalleServicio.montoIgv = $scope.detalleServicio.total * 0;
				$scope.detalleServicio.totalServicio = $scope.detalleServicio.precioSinIgv + $scope.detalleServicio.montoIgv;
			}
		}
		if ($scope.muestraComision){
			if ($scope.detalleServicio.tipoComision == "1"){
				$scope.detalleServicio.totalComision = $scope.detalleServicio.totalServicio * $scope.detalleServicio.valorComision/100;
				if ($scope.detalleServicio.aplicaIgvComision){
					$scope.detalleServicio.totalIgvComision = $scope.detalleServicio.totalComision * valorIgv;
					$scope.detalleServicio.totalComision = $scope.detalleServicio.totalComision + $scope.detalleServicio.totalIgvComision;
				}
			}
			else if($scope.detalleServicio.tipoComision == "2"){
				$scope.detalleServicio.totalComision = $scope.detalleServicio.valorComision;
				$scope.detalleServicio.totalIgvComision = $scope.detalleServicio.totalComision / (1+valorIgv);
			}
		}
		if ($scope.detalleServicio.totalComision != null && $scope.detalleServicio.totalComision != undefined){
			$scope.servicioVenta.totalComision = $scope.servicioVenta.totalComision + $scope.detalleServicio.totalComision;
		}
		$scope.servicioVenta.totalServicios = $scope.servicioVenta.totalServicios + $scope.detalleServicio.totalServicio;
		if($scope.detalleServicio.tipoServicio.esfee){
			$scope.servicioVenta.totalFee = $scope.servicioVenta.totalFee + $scope.detalleServicio.totalServicio;
		}
		$scope.detalleServicio.codigoEntero = $scope.listaDetalleServicio.length;
		$scope.listaDetalleServicio.push($scope.detalleServicio);
		
		if ($scope.detalleServicio.tipoServicio.servicioPadre){
			var servicio = {};
			servicio.codigo = $scope.listaServiciosPadre.length;
			servicio.descripcion = generaDescripcionCorta($scope.detalleServicio); 
			$scope.listaServiciosPadre.push(servicio);
		}
		$scope.detalleServicio = {};
		$scope.configuracionServicio = {};
		$scope.muestraComision = false;
		$scope.muestraAplicaIgv = false;
		$scope.muestraServicioPadre = false;
	}
	
	generarDescripcionServicio = function(detalle){
		var descripcion = "";
		descripcion = descripcion + $scope.detalleServicio.tipoServicio.nombre + " ";
		if ($scope.configuracionServicio.muestraRuta) {
			// descripcion = descripcion +
			// detalle.getRuta().getTramos().get(0).getOrigen().getDescripcion()
			// + " / ";
			for (var i=0; i<detalle.ruta.tramos.length; i++){
				var tramo = detalle.ruta.tramos[i];
				descripcion = descripcion +tramo.origen.descripcion+ ">" + tramo.destino.descripcion;
				if (i<detalle.ruta.tramos.length){
					descripcion = descripcion + " / ";
				}
			}
		}
		
		if ($scope.detalleServicio.aplicaIgv){
			descripcion = descripcion + "Inc. IGV";
		}
		/*
		 * if (configuracion.isMuestraAerolinea()) { descripcion = descripcion + "
		 * con " + detalle.getAerolinea().getNombre() + " "; }
		 */
		/*if (configuracion.isMuestraFechaServicio()) {
			descripcion = descripcion + " desde "
					+ sdf.format(detalle.getFechaIda());
		}
		if (configuracion.isMuestraFechaRegreso()) {
			descripcion = descripcion + " hasta "
					+ sdf.format(detalle.getFechaRegreso());
		}
		if (configuracion.isMuestraHotel()) {
			descripcion = descripcion + " en hotel "
					+ detalle.getHotel().getNombre();
		}
		/*
		 * if (configuracion.isMuestraCodigoReserva()) { descripcion =
		 * descripcion + " con codigo de reserva: " +
		 * detalle.getCodigoReserva(); } if
		 * (configuracion.isMuestraNumeroBoleto()) { descripcion = descripcion + "
		 * numero de boleto: " + detalle.getNumeroBoleto(); }
		 */
		return descripcion;
	}
	
	var generaDescripcionCorta = function(detalle){
		var descripcion = "";
		descripcion = descripcion + $scope.detalleServicio.tipoServicio.nombre + " ";
		if ($scope.configuracionServicio.muestraRuta) {
			for (var i=0; i<detalle.ruta.tramos.length; i++){
				var tramo = detalle.ruta.tramos[i];
				descripcion = descripcion + tramo.origen.codigoIATA+ ">" + tramo.destino.codigoIATA;
			}
		}
		return descripcion;
	}
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
								 /*
									 * for (var i=0; i<listaDestinos.length;
									 * i++){ var item = listaDestinos[i];
									 * availableTags.push(item.descripcion+"("+item.codigoIATA+")") }
									 */
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
			tramo.origen = {};
			tramo.precioTramo = 0;
			tramo.id = 1;
		}
		else{
			var tramo = {};
			var tramoAnterior = $scope.listaTramos[$scope.listaTramos.length-1];
			tramo.id = parseInt(tramoAnterior.id) + 1;
			tramo.origen = {};
			tramo.origen.id = tramoAnterior.destino;
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
				tramo.origen = {};
				tramo.origen = tramoAnterior.destino;
				tramo.destino = {};
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
			ruta.tramos = [];
			ruta.descripcion = "";
			for(var i=0; i<$scope.listaTramos.length; i++){
				var tramo = $scope.listaTramos[i];
				var tramoBusqueda = encontrarDescripcionDestino(tramo.origen.id);
				tramo.origen.descripcion = tramoBusqueda.descripcion;
				tramo.origen.codigoIATA = tramoBusqueda.codigoIATA;
				tramoBusqueda = encontrarDescripcionDestino(tramo.destino.id);
				tramo.destino.descripcion = tramoBusqueda.descripcion;
				tramo.destino.codigoIATA = tramoBusqueda.codigoIATA;
				ruta.descripcion = ruta.descripcion + tramo.origen.descripcion + " > " + tramo.destino.descripcion;
				if (i<$scope.listaTramos.length){
					ruta.descripcion = ruta.descripcion + " / ";
				}
				ruta.tramos.push(tramo);
			}
			//ruta.tramos = $scope.listaTramos;
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
	var encontrarDescripcionDestino = function(id){
		for(var i=0; i<$scope.listaDestinos.length; i++){
			if ($scope.listaDestinos[i].codigoEntero == id){
				return $scope.listaDestinos[i];
			}
		}
	}
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
 * .directive('keyboardPoster', function($parse, $timeout){ var
 * DELAY_TIME_BEFORE_POSTING = 0; return function(scope, elem, attrs) {
 * 
 * var element = angular.element(elem)[0]; var currentTimeout = null;
 * 
 * element.oninput = function() { var model = $parse(attrs.postFunction); var
 * poster = model(scope);
 * 
 * if(currentTimeout) { $timeout.cancel(currentTimeout) } currentTimeout =
 * $timeout(function(){ poster(angular.element(element).val()); },
 * DELAY_TIME_BEFORE_POSTING) } } })
 */