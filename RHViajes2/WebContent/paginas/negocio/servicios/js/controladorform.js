var serviciosformapp = angular.module('serviciosformapp', ['ngAnimate', 'ngSanitize','ui.bootstrap']);
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
    servicioCompartido.cliente = {};
    servicioCompartido.setCliente = function(cliente) {
        this.cliente = cliente;
        this.emitirItem();
    }
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
	$scope.servicioVenta.totalFee = 0;
	$scope.detalleServicio.conIgv = true;
	$scope.muestraAplicaIgv = false;
	$scope.listaServiciosPadre = [];
	$scope.muestraServicioPadre = false;
	$scope.listaVendedores = [];
	$scope.servicioVenta.monedaFacturacion = 2;
	$scope.busquedaCliente = {};
	$scope.tamaniopag = 10;
	$scope.currentPage = 1;
	$scope.totalItems = 0;
	$scope.maxSize = 3;
	$scope.numPages = 0;
	$scope.listaTramos = [];
	$scope.descripcionRuta = null;
	$scope.descripcionPasajeros = null;
	$scope.simboloMonedaFacturacion = "";
	$scope.nuevoServicio = true;
	$scope.editaServicio = false;
	$scope.indiceServicios = 0;
	$scope.ruta = [];
	
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
	mostrarModalCliente = function(){
		var modalcliente = document.getElementById('modalcliente');
		modalcliente.style.display = "block";
	}
	
	var vendedores = function(){
		$http({method: 'POST', url: '../../../servlets/ServletServicioAgencia', params:{accion:'consultarVendedores'}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.listaVendedores = response.data.objeto;
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	vendedores();
	
	$scope.configuracionServicio = {};
	
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
	
	$scope.consultarConfiguracionServicio = function(){
		$scope.nuevoServicio = true;
		$scope.descripcionPasajeros = null;
		$scope.descripcionRuta = null;
		$scope.configuracionServicio = {};
		$scope.muestraComision = false;
		$scope.muestraAplicaIgv = false;
		$scope.muestraServicioPadre = false;
		$scope.detalleServicio.idProveedor = null;
		$http({method: 'POST', url: '../../../servlets/ServletServicioAgencia', params:{accion:'consultarConfiguacion',formulario:$scope.detalleServicio}}).then(
				 function successCallback(response) {
					 if (response.data.exito == undefined){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.configuracionServicio = response.data.objeto;
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
							 for (var i=0; i<$scope.listaMonedas.length; i++){
								 if ($scope.servicioVenta.monedaFacturacion == $scope.listaMonedas[i].codigoEntero){
									 $scope.simboloMonedaFacturacion = $scope.listaMonedas[i].abreviatura;
									 break;
								 }
							 }
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
        $scope.servicioVenta.cliente = servicioCompartido.cliente;
        $scope.servicioVenta.cliente.nombreCompleto = $scope.servicioVenta.cliente.nombres+" "+$scope.servicioVenta.cliente.apellidoPaterno+" "+$scope.servicioVenta.cliente.apellidoMaterno;
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
		if ($scope.detalleServicio.tipoServicio.servicioPadre && ($scope.detalleServicio.fechaServicio == null || $scope.detalleServicio.fechaServicio == undefined)){
			if ($scope.detalleServicio.ruta != null && $scope.detalleServicio.ruta != undefined){
				if ($scope.detalleServicio.ruta.tramos != null && $scope.detalleServicio.ruta.tramos != undefined){
					$scope.detalleServicio.fechaServicio = $scope.detalleServicio.ruta.tramos[0].fechaSalida;
					$scope.detalleServicio.fechaRegreso = $scope.detalleServicio.ruta.tramos[$scope.detalleServicio.ruta.tramos.length-1].fechaSalida;
				}
			}
			else{
				$scope.detalleServicio.fechaServicio = new Date();
				$scope.detalleServicio.fechaIda = new Date();
			}
		}
		else{
			if ($scope.detalleServicio.fechaServicio == null || $scope.detalleServicio.fechaServicio == undefined || $scope.detalleServicio.fechaServicio == ""){
				for (var i=0; i<$scope.listaDetalleServicio.length; i++){
					if ($scope.listaDetalleServicio[i].codigoEntero == $scope.detalleServicio.servicioPadre.codigo){
						$scope.detalleServicio.fechaServicio = new Date($scope.listaDetalleServicio[i].fechaServicio);
						$scope.detalleServicio.fechaIda = new Date($scope.listaDetalleServicio[i].fechaServicio);
						break;
					}
				} 
			}
		}
		if ($scope.configuracionServicio.muestraProveedor){
			$scope.detalleServicio.servicioProveedor = {};
			$scope.detalleServicio.servicioProveedor.proveedor = {};
			for(var i=0; i<$scope.listaProveedores.length; i++){
				if ($scope.listaProveedores[i].codigoEntero == $scope.detalleServicio.idProveedor){
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
			if ($scope.detalleServicio.idOperador !=null && $scope.detalleServicio.idOperador !=undefined){
				form.idProveedor = $scope.detalleServicio.idOperador;
				for (var i=0; i<$scope.listaOperadores.length; i++){
					if ($scope.listaOperadores[i].codigoEntero == form.idProveedor){
						$scope.detalleServicio.operador = $scope.listaOperadores[i];
						break;
					}
				}
			}
		}
		if($scope.configuracionServicio.muestraHotel){
			if ($scope.detalleServicio.idHotel != null && $scope.detalleServicio.idHotel != undefined){
				form.idProveedor = $scope.detalleServicio.idHotel;
				for (var i=0; i<$scope.listaHoteles.length; i++){
					if ($scope.listaHoteles[i].codigoEntero == form.idProveedor){
						$scope.detalleServicio.hotel = $scope.listaHoteles[i];
						break;
					}
				}
			}
		}
		$scope.detalleServicio.descripcionServicio = generarDescripcionServicio($scope.detalleServicio);
		$scope.detalleServicio.descripcionServicio = $scope.detalleServicio.descripcionServicio.toUpperCase();
		
		if ($scope.detalleServicio.cantidad == 0 || $scope.detalleServicio.cantidad == undefined) {
			$scope.detalleServicio.cantidad = 1;
		}
		if ($scope.detalleServicio.tipoServicio.esFee){
			$scope.detalleServicio.cantidad = 1;
		}
		
		$scope.detalleServicio.precioUnitario = tipoCambio * $scope.detalleServicio.precioBaseInicial;
		var total = $scope.detalleServicio.cantidad * $scope.detalleServicio.precioUnitario;
		if ($scope.detalleServicio.aplicaIgv){
			if ($scope.detalleServicio.conIgv){// si ya tiene el igv hay que sacarle el igv
				$scope.detalleServicio.precioSinIgv = total / (1 + valorIgv);
				$scope.detalleServicio.montoIgv = total - $scope.detalleServicio.precioSinIgv;
			}
			else{// si no tiene el igv se debe calcular el igv
				$scope.detalleServicio.precioSinIgv = total;
				$scope.detalleServicio.montoIgv = $scope.detalleServicio.precioSinIgv * valorIgv;
			}
		}
		else{
			if ($scope.detalleServicio.conIgv){
				$scope.detalleServicio.precioSinIgv = total / (1 + valorIgv);
				$scope.detalleServicio.montoIgv = total - $scope.detalleServicio.precioSinIgv;
			}
			else{
				$scope.detalleServicio.precioSinIgv = total;
				$scope.detalleServicio.montoIgv = total * 0;
			}
		}
		$scope.detalleServicio.totalServicio = $scope.detalleServicio.precioSinIgv + $scope.detalleServicio.montoIgv;
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
				$scope.detalleServicio.totalIgvComision = $scope.detalleServicio.totalComision / (1 + valorIgv);
			}
		}
		$scope.detalleServicio.codigoEntero = $scope.listaDetalleServicio.length+1;
		$scope.detalleServicio.moneda = {};
		$scope.detalleServicio.moneda.idMoneda = $scope.detalleServicio.idmoneda;
		if ($scope.nuevoServicio){
			$scope.listaDetalleServicio.push($scope.detalleServicio);
		}
		if ($scope.detalleServicio.tipoServicio.servicioPadre){
			var servicio = {};
			servicio.codigo = $scope.listaServiciosPadre.length + 1;
			servicio.descripcion = generaDescripcionCorta($scope.detalleServicio);
			if ($scope.nuevoServicio && !$scope.detalleServicio.tipoServicio.esFee){
				$scope.listaServiciosPadre.push(servicio);
			}
		}
		$scope.servicioVenta.totalFee = 0;
		$scope.servicioVenta.totalComision = 0;
		$scope.servicioVenta.totalServicios = 0;
		for (var i=0; i<$scope.listaDetalleServicio.length; i++){
			var servicioA = $scope.listaDetalleServicio[i];
			if(servicioA.tipoServicio.esFee){
				$scope.servicioVenta.totalFee = $scope.servicioVenta.totalFee + servicioA.totalServicio;
			}
			if (servicioA.totalComision != undefined && servicioA.totalComision != null){
				$scope.servicioVenta.totalComision = $scope.servicioVenta.totalComision + servicioA.totalComision;
			}
			$scope.servicioVenta.totalServicios = $scope.servicioVenta.totalServicios + servicioA.totalServicio;
		}
		$scope.descripcionPasajeros = null;
		$scope.descripcionRuta = null;
		$scope.detalleServicio = {};
		$scope.configuracionServicio = {};
		$scope.muestraComision = false;
		$scope.muestraAplicaIgv = false;
		$scope.muestraServicioPadre = false;
		$scope.nuevoServicio = false;
		$scope.editaServicio = false;
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
	
	$scope.grabarVenta = function(){
		$scope.servicioVenta.detalle = $scope.listaDetalleServicio;
		document.getElementById('btnCerrarModalConfirmacion').click();
		$http({method: 'POST', url: '../../../servlets/ServletServicioAgencia', params:{accion:'guardar',servicio:$scope.servicioVenta}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.estadoConsulta = response.data.exito;
							 if ($scope.estadoConsulta){
								 /*$scope.mensaje = response.data.mensaje;
								 location.href="/RHViajes2/paginas/negocio/servicios/adm.jsp";*/
								 document.getElementById('idbtnExito').click();
							 }
							 else{
								 $scope.mensajeError = response.data.mensaje;
								 document.getElementById('idbtnError').click();
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	
	$scope.aceptarMensajeExito = function(){
		location.href="/RHViajes2/paginas/negocio/servicios/adm.jsp";
	}
	
	$scope.buscarCliente = function(numpagina){
		$scope.busquedaCliente.tamaniopag = $scope.tamaniopag;
		$scope.busquedaCliente.numpag = numpagina;
		$http({method: 'POST', url: '../../../servlets/ServletServicioAgencia', params:{accion:'buscarCliente',formulario:$scope.busquedaCliente}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.estadoConsulta = response.data.exito;
							 if ($scope.estadoConsulta){
								 $scope.listaClientes = response.data.objeto;
								 $scope.totalItems = $scope.listaClientes[0].totalRegistros;
								 $scope.numPages = response.data.paginas;
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	
	$scope.pageChanged = function() {
		$scope.buscarCliente($scope.currentPage);
	};
	
	$scope.setPage = function (pageNo) {
		$scope.buscarCliente(pageNo);
	};
	
	$scope.seleccionarCliente = function(id){
		for(var i=0; i<$scope.listaClientes.length; i++){
			if ($scope.listaClientes[i].codigoEntero == id){
				$scope.servicioVenta.cliente = $scope.listaClientes[i];
				document.getElementById('idbtnCerrarModal').click();
				break;
			}
		}
	}
	
	$scope.agregarTramo = function(){
		if ($scope.listaTramos.length == 0){
			var tramo = {};
			tramo.origen = {};
			tramo.id = 1;
		}
		else{
			var tramo = {};
			var tramoAnterior = $scope.listaTramos[$scope.listaTramos.length-1];
			tramo.id = parseInt(tramoAnterior.id) + 1;
			tramo.origen = {};
			tramo.origen.id = tramoAnterior.destino.id;
			tramo.codigoAerolinea = tramoAnterior.codigoAerolinea;
		}
		$scope.listaTramos.push(tramo);
	}
	$scope.agregarTramoRegreso = function(){
		for (var i=$scope.listaTramos.length; i>0; i--){
			var tramoAnterior = $scope.listaTramos[i-1];
			var tramo = {};
			tramo.id = $scope.listaTramos.length;
			tramo.origen = {};
			tramo.origen.id = tramoAnterior.destino.id;
			tramo.destino = {};
			tramo.destino.id = tramoAnterior.origen.id;
			tramo.codigoAerolinea = tramoAnterior.codigoAerolinea;
			$scope.listaTramos.push(tramo);
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
				$scope.descripcionRuta = ruta.descripcion;
				if (i<$scope.listaTramos.length){
					ruta.descripcion = ruta.descripcion + " / ";
				}
				ruta.tramos.push(tramo);
			}
			$scope.ruta = ruta;
			//servicioCompartido.setRuta(ruta);
			$scope.detalleServicio.ruta = ruta;
			var btncloseRuta = document.getElementById('idbtnCerrarModalRuta');
			btncloseRuta.click();
		}
		else{
			$scope.mostrarError = true;
		}
	};
	validarRuta = function(){
		//$('#idselaerolinea').removeClass('error');
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
				//$('#idselaerolinea').addClass('error');
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
			var pasj = $scope.pasajero;
			if (!(pasj.nombres == "" || pasj.nombres == "undefined" || pasj.nombres == null)){
				$scope.pasajero.nombres = $scope.pasajero.nombres.toUpperCase();
			}
			if (!(pasj.apePaterno == "" || pasj.apePaterno == "undefined" || pasj.apePaterno == null)){
				$scope.pasajero.apePaterno = $scope.pasajero.apePaterno.toUpperCase();
			}
			if (!(pasj.apeMaterno == "" || pasj.apeMaterno == "undefined" || pasj.apeMaterno == null)){
				$scope.pasajero.apeMaterno = $scope.pasajero.apeMaterno.toUpperCase();
			}
			if (!(pasj.correoElectronico == "" || pasj.correoElectronico == "undefined" || pasj.correoElectronico == null)){
				$scope.pasajero.correoElectronico = $scope.pasajero.correoElectronico.toUpperCase();
			}
			if (!(pasj.codigoReserva == "" || pasj.codigoReserva == "undefined" || pasj.codigoReserva == null)){
				$scope.pasajero.codigoReserva = $scope.pasajero.codigoReserva.toUpperCase();
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
		var correcto = true;
		var pasj = $scope.pasajero;
		$('#idseltipodocumento').removeClass('error');
		$('#idnumdoc').removeClass('error');
		$('#idnombres').removeClass('error');
		$('#idnacionalidad').removeClass('error');
		$('#idapepaterno').removeClass('error');
		$('#idapematerno').removeClass('error');
		$('#idtelef1').removeClass('error');
		$('#idrelacion').removeClass('error');
		if (pasj.tipoDocumento == "" || pasj.tipoDocumento == "undefined" || pasj.tipoDocumento == null){
			$('#idseltipodocumento').addClass('error');
			correcto = false;
		}
	    if (pasj.numeroDocumento == "" || pasj.numeroDocumento == "undefined" || pasj.numeroDocumento == null){
			$('#idnumdoc').addClass('error');
			correcto = false;
		}
		if (pasj.nombres == "" || pasj.nombres == "undefined" || pasj.nombres == null){
			$('#idnombres').addClass('error');
			correcto = false;
		}
		if (pasj.apePaterno == "" || pasj.apePaterno == "undefined" || pasj.apePaterno == null){
			$('#idapepaterno').addClass('error');
			correcto = false;
		}
		if (pasj.apeMaterno == "" || pasj.apeMaterno == "undefined" || pasj.apeMaterno == null){
			$('#idapematerno').addClass('error');
			correcto = false;
		}
		if (pasj.codigoRelacion == "" || pasj.codigoRelacion == "undefined" || pasj.codigoRelacion == null){
			$('#idrelacion').addClass('error');
			correcto = false;
		}
		if (pasj.nacionalidad == "" || pasj.nacionalidad == "undefined" || pasj.nacionalidad == null){
			$('#idnacionalidad').addClass('error');
			correcto = false;
		}
		return correcto;
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
		$scope.descripcionPasajeros = "";
		for (var i=0; i<$scope.listaPasajeros.length; i++){
			var paxs = $scope.listaPasajeros[i];
			if (1+i == $scope.listaPasajeros.length){
				$scope.descripcionPasajeros = $scope.descripcionPasajeros + paxs.nombres + " " + paxs.apePaterno;
			}
			else{
				$scope.descripcionPasajeros = $scope.descripcionPasajeros + paxs.nombres + " " + paxs.apePaterno + "/";
			}
		}
		$scope.detalleServicio.cantidad = $scope.listaPasajeros.length;
		$scope.detalleServicio.pasajeros = $scope.listaPasajeros;
		var btnclosePasajeros = document.getElementById('idbtnclosemodalpasajeros');
		btnclosePasajeros.click();
	}
	
	$scope.eliminarServicio = function (id){
		var idx = 0;
		var servicio = {};
		for (var i=0;i<$scope.listaDetalleServicio.length; i++){
			servicio = $scope.listaDetalleServicio[i];
			if (servicio.codigoEntero == id){
				idx = i;
				break;
			}
		}
		eliminarServiciosHijo(id);
		$scope.listaDetalleServicio.splice(idx,1);
		$scope.servicioVenta.totalFee = 0;
		$scope.servicioVenta.totalComision = 0;
		$scope.servicioVenta.totalServicios = 0;
		for (var i=0; i<$scope.listaDetalleServicio.length; i++){
			var servicioA = $scope.listaDetalleServicio[i];
			if($scope.detalleServicio.tipoServicio.esFee){
				$scope.servicioVenta.totalFee = $scope.servicioVenta.totalFee + servicioA.totalServicio;
			}
			if (servicioA.totalComision != undefined && servicioA.totalComision != null){
				$scope.servicioVenta.totalComision = $scope.servicioVenta.totalComision + servicioA.totalComision;
			}
			$scope.servicioVenta.totalServicios = $scope.servicioVenta.totalServicios + servicioA.totalServicio;
		}
	}
	
	var eliminarServiciosHijo = function(id){
		var idx = 0;
		var servicio = {};
		var mas = false;
		for (var i=0;i<$scope.listaDetalleServicio.length; i++){
			servicio = $scope.listaDetalleServicio[i];
			if (servicio.codigoEntero == id){
				idx = i;
				break;
			}
		}
		if (servicio.tipoServicio.servicioPadre){
			for (var j=0;j<$scope.listaDetalleServicio.length; j++){
				var servicio2 = $scope.listaDetalleServicio[j];
				if (!servicio2.tipoServicio.servicioPadre){
					if (servicio2.servicioPadre.codigo == id){
						$scope.listaDetalleServicio.splice(j,1);
						mas = true;
						break;
					}
				}
			}
		}
		if (mas){
			eliminarServiciosHijo(id);
		}
	}
	
	$scope.consultaServicio = function(id){
		var idx = 0;
		for (var i=0;i<$scope.listaDetalleServicio.length; i++){
			if ($scope.listaDetalleServicio[i].codigoEntero == id){
				idx = i;
				break;
			}
		}
		$scope.indiceServicios = idx;
		$scope.detalleServicio = $scope.listaDetalleServicio[idx];
		$scope.listaTramos = [];
		for (var i=0; i<$scope.detalleServicio.ruta.tramos.length; i++){
			$scope.listaTramos.push($scope.detalleServicio.ruta.tramos[i]);
		}
		var idProv = $scope.detalleServicio.idProveedor;
		$scope.consultarConfiguracionServicio();
		$scope.detalleServicio.idProveedor = idProv;
		$scope.seleccionarProveedor();
		$scope.pasajeros = $scope.detalleServicio.pasajeros;
		$scope.editaServicio = true;
		$scope.nuevoServicio = false;
		$scope.aceptarRuta();
		$scope.aceptarPasajeros();
		$scope.listarDestinos();
		$scope.listarAerolineas();
		$scope.detalleServicio.cantidad = $scope.listaPasajeros.length;
		//$scope.detalleServicio.idProveedor = 
	}
	$scope.actualizarServicio = function(){
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
		if ($scope.detalleServicio.tipoServicio.servicioPadre && ($scope.detalleServicio.fechaServicio == null || $scope.detalleServicio.fechaServicio == undefined)){
			if ($scope.detalleServicio.ruta != null && $scope.detalleServicio.ruta != undefined){
				if ($scope.detalleServicio.ruta.tramos != null && $scope.detalleServicio.ruta.tramos != undefined){
					$scope.detalleServicio.fechaServicio = $scope.detalleServicio.ruta.tramos[0].fechaSalida;
					$scope.detalleServicio.fechaRegreso = $scope.detalleServicio.ruta.tramos[$scope.detalleServicio.ruta.tramos.length-1].fechaSalida;
				}
			}
			else{
				$scope.detalleServicio.fechaServicio = new Date();
				$scope.detalleServicio.fechaIda = new Date();
			}
		}
		if ($scope.configuracionServicio.muestraProveedor){
			$scope.detalleServicio.servicioProveedor = {};
			$scope.detalleServicio.servicioProveedor.proveedor = {};
			for(var i=0; i<$scope.listaProveedores.length; i++){
				if ($scope.listaProveedores[i].codigoEntero == $scope.detalleServicio.idProveedor){
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
			if ($scope.detalleServicio.idOperador !=null && $scope.detalleServicio.idOperador !=undefined){
				form.idProveedor = $scope.detalleServicio.idOperador;
				for (var i=0; i<$scope.listaOperadores.length; i++){
					if ($scope.listaOperadores[i].codigoEntero == form.idProveedor){
						$scope.detalleServicio.operador = $scope.listaOperadores[i];
						break;
					}
				}
			}
		}
		if($scope.configuracionServicio.muestraHotel){
			if ($scope.detalleServicio.idHotel != null && $scope.detalleServicio.idHotel != undefined){
				form.idProveedor = $scope.detalleServicio.idHotel;
				for (var i=0; i<$scope.listaHoteles.length; i++){
					if ($scope.listaHoteles[i].codigoEntero == form.idProveedor){
						$scope.detalleServicio.hotel = $scope.listaHoteles[i];
						break;
					}
				}
			}
		}
		$scope.detalleServicio.descripcionServicio = generarDescripcionServicio($scope.detalleServicio);
		$scope.detalleServicio.descripcionServicio = $scope.detalleServicio.descripcionServicio.toUpperCase();
		
		if ($scope.detalleServicio.cantidad == 0 || $scope.detalleServicio.cantidad == undefined) {
			$scope.detalleServicio.cantidad = 1;
		}
		if ($scope.detalleServicio.tipoServicio.esFee){
			$scope.detalleServicio.cantidad = 1;
		}
		
		$scope.detalleServicio.precioUnitario = tipoCambio * $scope.detalleServicio.precioBaseInicial;
		var total = $scope.detalleServicio.cantidad * $scope.detalleServicio.precioUnitario;
		if ($scope.detalleServicio.aplicaIgv){
			if ($scope.detalleServicio.conIgv){// si ya tiene el igv hay que sacarle el igv
				$scope.detalleServicio.precioSinIgv = total / (1 + valorIgv);
				$scope.detalleServicio.montoIgv = total - $scope.detalleServicio.precioSinIgv;
			}
			else{// si no tiene el igv se debe calcular el igv
				$scope.detalleServicio.precioSinIgv = total;
				$scope.detalleServicio.montoIgv = $scope.detalleServicio.precioSinIgv * valorIgv;
			}
		}
		else{
			if ($scope.detalleServicio.conIgv){
				$scope.detalleServicio.precioSinIgv = total / (1 + valorIgv);
				$scope.detalleServicio.montoIgv = total - $scope.detalleServicio.precioSinIgv;
			}
			else{
				$scope.detalleServicio.precioSinIgv = total;
				$scope.detalleServicio.montoIgv = total * 0;
			}
		}
		$scope.detalleServicio.totalServicio = $scope.detalleServicio.precioSinIgv + $scope.detalleServicio.montoIgv;
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
				$scope.detalleServicio.totalIgvComision = $scope.detalleServicio.totalComision / (1 + valorIgv);
			}
		}
		$scope.listaDetalleServicio[$scope.indiceServicios] = $scope.detalleServicio;
		
		$scope.servicioVenta.totalFee = 0;
		$scope.servicioVenta.totalComision = 0;
		$scope.servicioVenta.totalServicios = 0;
		for (var i=0; i<$scope.listaDetalleServicio.length; i++){
			var servicioA = $scope.listaDetalleServicio[i];
			if($scope.detalleServicio.tipoServicio.esFee){
				$scope.servicioVenta.totalFee = $scope.servicioVenta.totalFee + servicioA.totalServicio;
			}
			if (servicioA.totalComision != undefined && servicioA.totalComision != null){
				$scope.servicioVenta.totalComision = $scope.servicioVenta.totalComision + servicioA.totalComision;
			}
			$scope.servicioVenta.totalServicios = $scope.servicioVenta.totalServicios + servicioA.totalServicio;
		}
		$scope.detalleServicio = {};
		$scope.descripcionPasajeros = null;
		$scope.descripcionRuta = null;
		$scope.configuracionServicio = {};
		$scope.muestraComision = false;
		$scope.muestraAplicaIgv = false;
		$scope.muestraServicioPadre = false;
		$scope.nuevoServicio = false;
		$scope.editaServicio = false;
	}
	$scope.cancelar = function(){
		$scope.descripcionPasajeros = null;
		$scope.descripcionRuta = null;
		$scope.detalleServicio = {};
		$scope.configuracionServicio = {};
		$scope.muestraComision = false;
		$scope.muestraAplicaIgv = false;
		$scope.muestraServicioPadre = false;
		$scope.nuevoServicio = false;
		$scope.editaServicio = false;
		$scope.listaTramos = [];
	}
});
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