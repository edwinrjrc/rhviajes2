
var rhViajesInicioApp = angular.module('rhviajesinicio', ['menuapp','ngAnimate','ngSanitize','ui.bootstrap']);

rhViajesInicioApp.controller('serviciosventaCtrl', ['$scope','$http', function($scope, $http){
	$scope.servicioregistradoexito = false;
	$scope.servicioregistradoerror = false;
	$scope.tituloPagina = "Administrar Registro Servicio";
	$scope.buscar = true;
	
}]);