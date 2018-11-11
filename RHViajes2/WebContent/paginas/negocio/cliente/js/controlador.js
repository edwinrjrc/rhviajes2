var clientesapp = angular.module('clientesapp',['ngAnimate', 'ngSanitize','ui.bootstrap']);

clientesapp.controller('admclientectrl', function($scope,$http,$document){
	$scope.listaClientes = [];
	$scope.itemsXpagina = 6;
	$scope.currentPage = 1;
	$scope.totalItems = 0;
	$scope.maxSize = 5;
	
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
	
	$scope.listarEstadoCivil = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listar',tipoMaestro:9}}).then(
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
								 $scope.listaEstadoCivil = response.data.objeto;
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	$scope.listarEstadoCivil();
	
	$scope.listarClientes = function (){
		$http({method: 'POST', url: '../../../servlets/ServletCliente', params:{accion:'listar'}}).then(
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
								 $scope.listaClientes = response.data.objeto;
								 $scope.totalItems = $scope.listaClientes.length;
								 $scope.listaFiltrada = filtrar($scope.listaFiltrada, $scope.currentPage, $scope.listaClientes);
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	$scope.listarClientes();
	
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
		$scope.listaFiltrada = filtrar($scope.listaFiltrada, $scope.currentPage, $scope.listaClientes);
	};
	
	$scope.buscarClientes = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCliente', params:{accion:'buscar', formulario: $scope.formularioBusqueda}}).then(
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
								 $scope.listaClientes = response.data.objeto;
								 $scope.totalItems = $scope.listaClientes.length;
								 $scope.listaFiltrada = filtrar($scope.listaFiltrada, $scope.currentPage, $scope.listaClientes);
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	
	$scope.nuevoRegistroCliente = function (){
		location.href="nuevocliente.jsp";
	};
});