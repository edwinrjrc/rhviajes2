var applogin = angular.module('applogin',[]);

var controlador = applogin.controller('controllerLogin', ['$scope','$http', function($scope, $http){
	$scope.usuario = {};
	
	$scope.ingresarUsuario = function(){
		console.log('Llamada funcion');
		$http({method: 'GET', url: 'http://localhost:8080/RHViajesMayWeb/j_security_check', 
			params: {j_username:$scope.usuario.login, j_password: $scope.usuario.password}}).then(
				function successCallback(response){
					$scope.redirigir();
				},
				function errorCallback(response){
					console.log('Response error');
				});
	};
	
	$scope.redirigir = function(){
		$http({method: 'GET', url: 'http://localhost:8080/RHViajesMayWeb/ServletRedirigir'}).then(
				function successCallback(response){
					console.log('Response exito');
				},
				function errorCallback(response){
					console.log('Response error');
				});
	}
}]);