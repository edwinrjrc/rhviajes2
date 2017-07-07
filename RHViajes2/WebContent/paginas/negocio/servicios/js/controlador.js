var serviciosapp = angular.module('serviciosapp', ['ngAnimate', 'ngSanitize']);

serviciosapp.controller('serviciosventaCtrl',function($scope,$http,$document){
	$scope.tituloPagina = 'Administrar Registro Servicios';
	$scope.buscar = true;
	$scope.nuevo = false;
	$scope.editar = false;
	$scope.formularioBusqueda = {};
	$scope.formularioBusqueda.fechaHasta = new Date();
	$scope.formularioBusqueda.fechaDesde = new Date();
	$scope.formularioBusqueda.fechaDesde.setDate($scope.formularioBusqueda.fechaDesde.getDate()-7);
	$scope.listaFiltrada = [];
	$scope.listaVentas = [];
	$scope.itemsXpagina = 5;
	$scope.currentPage = 1;
	$scope.totalItems = 0;
	$scope.paginas = 0;
	$scope.listaTipoDocumento = [];
	
	$scope.nuevoRegistroVenta = function (){
		$scope.buscar = false;
		$scope.nuevo = true;
		$scope.editar = false;
	};
	
	$scope.listarVentas = function(){
		$scope.listaFiltrada = [];
		
		$http({method: 'POST', url: '../../../servlets/ServletServicioAgencia', params:{accion:'listar',formulario:$scope.formularioBusqueda}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.formulario = response.data.objeto;
							 $scope.activaBotones = response.data.exito;
							 $scope.estadoConsulta = response.data.exito;
							 $scope.mensaje = response.data.mensaje;
							 $scope.mostrarMensajeError = true;
							 $scope.listaVentas = response.data.objeto;
							 $scope.paginas = parseInt($scope.listaVentas.length/$scope.itemsXpagina);
							 $scope.paginas = $scope.paginas + 1;
							 $scope.listaFiltrada = filtrar($scope.listaFiltrada, $scope.currentPage, $scope.listaVentas);
						 }
					 }
					
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	
	
	$scope.buscarVentas = function(){
		$http({method: 'POST', url: '../../../servlets/ServletServicioAgencia', params:{accion:'buscar',formulario:$scope.formularioBusqueda}}).then(
				 function successCallback(response) {
					 if (response.data.exito == "undefined"){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 console.log('Exito en la llamada');
							 $scope.activaBotones = response.data.exito;
							 $scope.estadoConsulta = response.data.exito;
							 if ($scope.estadoConsulta){
								 $scope.mensaje = response.data.mensaje;
								 $scope.listaVentas = response.data.objeto;
								 $scope.paginas = parseInt($scope.listaVentas.length/$scope.itemsXpagina);
								 $scope.paginas = $scope.paginas + 1;
								 $scope.listaFiltrada = filtrar($scope.listaFiltrada, $scope.currentPage, $scope.listaVentas);
							 }
						 }
					 }
					 
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	
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
	
	$scope.principio = function(pagina){
		$scope.listaFiltrada = filtrar($scope.listaFiltrada, 1, $scope.listaVentas);
		$scope.currentPage = 1;
	};
	
	$scope.anterior = function(pagina){
		if (pagina > 1){
			pagina = pagina - 1;
		}
		$scope.currentPage = pagina;
		$scope.listaFiltrada = filtrar($scope.listaFiltrada, pagina, $scope.listaVentas);
	};
	
	$scope.siguiente = function(pagina){
		if (pagina < $scope.paginas){
			pagina = pagina + 1;
		}
		$scope.currentPage = pagina;
		$scope.listaFiltrada = filtrar($scope.listaFiltrada, pagina, $scope.listaVentas);
	};
	
	$scope.final = function(pagina){
		$scope.currentPage = $scope.paginas;
		$scope.listaFiltrada = filtrar($scope.listaFiltrada, $scope.paginas, $scope.listaVentas);
	};
	
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
		$scope.listaFiltrada = filtrar($scope.listaFiltrada, $scope.currentPage, $scope.listaVentas);
	};
	
	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};
	
	console.log("Consulta");
	$scope.listarTipoDocumento();
	$scope.listarVentas();
});