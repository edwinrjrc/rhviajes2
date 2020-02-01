var comprobantesapp = angular.module('comprobantesapp',['ngAnimate', 'ngSanitize','ui.bootstrap','ngFileUpload']);

comprobantesapp.controller('consultacomproctrl',function($scope,$http,$document,$timeout,$compile, Upload){
	$scope.formularioBusqueda = {};
	$scope.itemsXpagina = 6;
	$scope.currentPage = 1;
	$scope.totalItems = 0;
	$scope.maxSize = 5;
	
	var fechasComprobante = function(){
		$scope.formularioBusqueda.fechaHasta = new Date();
		$scope.formularioBusqueda.fechaDesde = new Date();
		$scope.formularioBusqueda.fechaDesde.setDate($scope.formularioBusqueda.fechaHasta.getDate() - 30);
	}
	fechasComprobante();
	
	var listarTipoDocumento = function(){
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
		$scope.editor = false;
		$scope.buscador = true;
	};
	listarTipoDocumento();
	
	var listarTipoComprobante = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listar',tipoMaestro:16}}).then(
				 function successCallback(response) {
					 if (response.data.exito == undefined){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.estadoConsulta = response.data.exito;
							 if ($scope.estadoConsulta){
								 $scope.mensaje = response.data.mensaje;
								 $scope.listaTipoComprobante = response.data.objeto;
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	listarTipoComprobante();
	
	$scope.consultaComprobantes = function(){
		$http({method: 'POST', url: '../../../servlets/ServletComprobante', params:{accion:'consulta',formulario:$scope.formularioBusqueda}}).then(
				 function successCallback(response) {
					 if (response.data.exito == undefined){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.estadoConsulta = response.data.exito;
							 if ($scope.estadoConsulta){
								 $scope.mensaje = response.data.mensaje;
								 $scope.listaComprobantes = response.data.objeto;
								 $scope.totalItems = $scope.listaComprobantes.length;
								 $scope.listaFiltrada = filtrar($scope.listaFiltrada, $scope.currentPage, $scope.listaComprobantes);
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	
	var filtrar = function(listaFiltrar, paginaActual, listaTotal){
		listaFiltrar = [];
	    var limiteInferior = (paginaActual-1)*$scope.itemsXpagina;
	    var limiteSuperior = (paginaActual*$scope.itemsXpagina)-1;
	    
	    for(i = 0 ; i < listaTotal.length; i++){
	    	if(i>=limiteInferior && i<=limiteSuperior){
	    		listaFiltrar[listaFiltrar.length] = listaTotal[i];
	    	}
	    }
	    return listaFiltrar;
	};
	
	$scope.pageChanged = function() {
		$scope.listaFiltrada = filtrar($scope.listaFiltrada, $scope.currentPage, $scope.listaComprobantes);
	};
	
	$scope.verDetalleComprobante = function(idComprobante){
		$scope.detalle = {};
		for (var i=0; i<$scope.listaComprobantes.length; i++){
			if ($scope.listaComprobantes[i].codigoEntero == idComprobante){
				$scope.detalle = $scope.listaComprobantes[i];
				break;
			}
		}
		$scope.detalle.titular.nombreCompleto = $scope.detalle.titular.nombres+" "+$scope.detalle.titular.apellidoPaterno+" "+$scope.detalle.titular.apellidoMaterno;
		$http({method: 'POST', url: '../../../servlets/ServletComprobante', params:{accion:'consultaDetalle',idComprobante:$scope.detalle.codigoEntero}}).then(
				 function successCallback(response) {
					 if (response.data.exito == undefined){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.estadoConsulta = response.data.exito;
							 if ($scope.estadoConsulta){
								 $scope.detalle.detalle = response.data.objeto.detalleComprobante;
								 for (var i=0; i<$scope.detalle.detalle.length; i++){
									 $scope.detalle.detalle[i].flagImprimir = true;
								 }
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	
	$scope.verDetalleComprobante2 = function(idComprobante){
		$scope.detalle = {};
		for (var i=0; i<$scope.listaComprobantes.length; i++){
			if ($scope.listaComprobantes[i].codigoEntero == idComprobante){
				$scope.detalle = $scope.listaComprobantes[i];
				break;
			}
		}
		$scope.detalle.titular.nombreCompleto = $scope.detalle.titular.nombres+" "+$scope.detalle.titular.apellidoPaterno+" "+$scope.detalle.titular.apellidoMaterno;
		$http({method: 'POST', url: '../../../servlets/ServletComprobante', params:{accion:'consultaDetalle',idComprobante:$scope.detalle.codigoEntero}}).then(
				 function successCallback(response) {
					 if (response.data.exito == undefined){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.estadoConsulta = response.data.exito;
							 if ($scope.estadoConsulta){
								 $scope.detalle.detalle = response.data.objeto.detalleComprobante;
								 $scope.detalle.feComprobante = new Date($scope.detalle.fechaComprobante);
								 for (var i=0; i<$scope.detalle.detalle.length; i++){
									 $scope.detalle.detalle[i].flagMoverDetalle = false;
								 }
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
		$scope.editor = true;
		$scope.buscador = false;
	}
	
	$scope.enviarAOtroComprobante = function(){
		$scope.detalle.fechaComprobante = $scope.detalle.feComprobante;
		$http({method: 'POST', url: '../../../servlets/ServletComprobante', params:{accion:'grabarEditar',comprobante:$scope.detalle}}).then(
				 function successCallback(response) {
					 if (response.data.exito == undefined){
						 location.href="../../../";
					 }
					 else{
						 $scope.mensajeError = response.data.mensaje;
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.estadoConsulta = response.data.exito;
							 if ($scope.estadoConsulta){
								 $scope.detalle = response.data.objeto;
								 $scope.detalle.titular.nombreCompleto = $scope.detalle.titular.nombres+" "+$scope.detalle.titular.apellidoPaterno+" "+$scope.detalle.titular.apellidoMaterno;
								 $scope.detalle.detalle = response.data.objeto.detalleComprobante;
								 $scope.detalle.feComprobante = new Date($scope.detalle.fechaComprobante);
								 for (var i=0; i<$scope.detalle.detalle.length; i++){
									 $scope.detalle.detalle[i].flagMoverDetalle = false;
								 }
							 }
							 document.getElementById("idbtnExito").click();
						 }
						 else {
							 document.getElementById("idbtnError").click();
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	
	$scope.regresar = function(){
		$scope.editor = false;
		$scope.buscador = true;
		$scope.detalle = null;
	}
	
	$scope.generaComprobanteImpresion = function(){
		$http({method: 'POST', url: '../../../servlets/ServletComprobante', params:{accion:'comprobanteImpresion',comprobante:$scope.detalle}}).then(
				 function successCallback(response) {
					 if (response.data.exito == undefined){
						 location.href="../../../";
					 }
					 else{
						 var datos = response.data.objeto.datos;
						 var byteArray = new Uint8Array(datos);
						 var a = window.document.createElement('a');
						 a.href = window.URL.createObjectURL(new Blob([byteArray], { type: response.data.objeto.contentType }));
						 a.download = response.data.objeto.nombreArchivo;
						 // Append anchor to body.
						 document.body.appendChild(a)
						 a.click();
						 // Remove anchor from body
						 document.body.removeChild(a)
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	
	$scope.generaComprobanteDigital = function(){
		$http({method: 'POST', url: '../../../servlets/ServletComprobante', params:{accion:'comprobanteDigital',comprobante:$scope.detalle}}).then(
				 function successCallback(response) {
					 if (response.data.exito == undefined){
						 location.href="../../../";
					 }
					 else{
						 var datos = response.data.objeto.datos;
						 var byteArray = new Uint8Array(datos);
						 var a = window.document.createElement('a');
						 a.href = window.URL.createObjectURL(new Blob([byteArray], { type: response.data.objeto.contentType }));
						 a.download = response.data.objeto.nombreArchivo;
						 // Append anchor to body.
						 document.body.appendChild(a)
						 a.click();
						 // Remove anchor from body
						 document.body.removeChild(a)
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	
	$scope.exportarTodo = function(){
		$http({method: 'POST', url: '../../../servlets/ServletComprobante', params:{accion:'exportarTodo'}}).then(
				 function successCallback(response) {
					 if (response.data.exito == undefined){
						 location.href="../../../";
					 }
					 else{
						 var datos = response.data.objeto.datos;
						 var byteArray = new Uint8Array(datos);
						 var a = window.document.createElement('a');
						 a.href = window.URL.createObjectURL(new Blob([byteArray], { type: response.data.objeto.contentType }));
						 a.download = response.data.objeto.nombreArchivo;
						 // Append anchor to body.
						 document.body.appendChild(a)
						 a.click();
						 // Remove anchor from body
						 document.body.removeChild(a)
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
});