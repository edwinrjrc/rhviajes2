var consultaservicioapp = angular.module('consultaservicioapp', ['ngAnimate', 'ngSanitize','ui.bootstrap']);

consultaservicioapp.controller('consultaservicioctrl', function($scope, $http){
	$scope.servicioVenta = {};
	
	var consultarServicio = function(){
		$http({method: 'POST', url: '../../../servlets/ServletServicioAgencia', params:{accion:'verServicio'}}).then(
				 function successCallback(response) {
					 if (response.data.exito == undefined){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.objeto == undefined || response.data.objeto == null){
							 location.href="../../../";
						 }
						 else{
							 $scope.servicioVenta = response.data.objeto;
							 $scope.listaDetalleServicio = response.data.objeto.listaDetalleServicio;
							 for (var i=0; i<$scope.listaDetalleServicio.length; i++){
								 $scope.listaDetalleServicio[i].id = i+1;
								 $scope.listaDetalleServicio[i].enlace1 = "#detalle"+$scope.listaDetalleServicio[i].id;
								 $scope.listaDetalleServicio[i].enlace2 = "detalle"+$scope.listaDetalleServicio[i].id;
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	consultarServicio();
	
	$scope.listaServiciosHijos = [];
	$scope.listaPasajeros = [];
	$scope.mostrarHijos = function(iddetalle){
		for (var i=0; i<$scope.listaDetalleServicio.length; i++){
			if ($scope.listaDetalleServicio[i].codigoEntero == iddetalle){
				$scope.listaServiciosHijos = $scope.listaDetalleServicio[i].serviciosHijos;
				$scope.listaPasajeros = $scope.listaDetalleServicio[i].listaPasajeros;
				break;
			}
		}
		
	}
});