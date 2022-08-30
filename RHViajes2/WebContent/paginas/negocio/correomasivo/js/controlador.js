var correomasivoapp = angular.module('correomasivoapp',['ngAnimate', 'ngSanitize','ui.bootstrap','ngFileUpload']);


correomasivoapp.controller('enviocorreoctrl',function($scope, $http, $document, $timeout, $compile, Upload){
	$scope.itemsXpagina = 12;
	$scope.currentPage = 1;
	$scope.totalItems = 0;
	$scope.maxSize = 5;
	$scope.listaCorreos = null;
	
	var consultaComprobantes = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCorreoMasivo', params:{accion:'correosCliente'}}).then(
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
								 $scope.listaCorreos = response.data.objeto;
								 $scope.totalItems = $scope.listaCorreos.length;
								 $scope.listaFiltrada = filtrar($scope.listaFiltrada, $scope.currentPage, $scope.listaCorreos);
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	consultaComprobantes();
	
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
		$scope.listaFiltrada = filtrar($scope.listaFiltrada, $scope.currentPage, $scope.listaCorreos);
	};
	
	$scope.enviarCorreos = function(file, resumable){
		$scope.errorMsg = null;
	    uploadUsingUpload(file, resumable);
	}

	  
  $scope.chunkSize = 100000;
  function uploadUsingUpload(file, resumable) {
    file.upload = Upload.upload({
      url: '../../../servlets/ServletCorreoMasivo?accion=cargaArchivo',
      resumeSizeUrl: resumable ? '../../../servlets/ServletCorreoMasivo?accion=cargaArchivo&name=' + encodeURIComponent(file.name) : null,
      resumeChunkSize: resumable ? $scope.chunkSize : null,
      headers: {
        'optional-header': 'header-value'
      },
      data: {file: file},
      params: {}
    });

    file.upload.then(function (response) {
      $timeout(function () {
    	  
      });
    }, function (response) {
      if (response.status > 0){
    	  $scope.errorMsg = response.status + ': ' + response.data;
      }
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });

    file.upload.xhr(function (xhr) {
      // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
    });
  }
	
});