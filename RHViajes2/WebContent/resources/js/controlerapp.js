var appinicio = angular.module('rhmayoristainicio', ['ngRoute','menuapp']);

appinicio.controller('CtrlMenu',['$scope', function($scope){
	$scope.enlace = false;
	
	$scope.inicioMenu = function(){
		$scope.enlace = true;
	};
	
	$scope.usuariosMenu = function(){
		$scope.enlace = true;
	};
	
	$scope.rolesMenu = function(){
		$scope.enlace = true;
	};
}]);

appinicio.controller('InicioCtrl', function($scope){
	
});

appinicio.controller('SeguridadCtrl', ['$scope','$http', function($scope, $http){
	$scope.listaUsuarios = {};
	$scope.listaRoles = {};
	
	$scope.listarUsuario = function(){
		$http({method: 'GET', url: 'http://localhost:8080/RHViajesMayWeb/ServletSeguridad', 
			params: {accion:'listarCatalogos'}}).then(
				function successCallback(response){
					$scope.listaUsuarios = response.data.usuarios;
					$scope.listaRoles = response.data.roles;
					rol = {"id":-1,"nombre":"-Seleccione-"};
					$scope.listaRoles.push(rol);
				},
				function errorCallback(response){
					console.log('Response error');
				});
	};
	
	$scope.enviaForm = function(isValid){
		if (true){
			$http({method: 'GET', url: 'http://localhost:8080/RHViajesMayWeb/ServletSeguridad', 
				params: {accion:'ingresarUsuario', formulario: $scope.beanUsuario}}).then(
					function successCallback(response){
						console.log('Response success ingresarUsuario');
						
					},
					function errorCallback(response){
						console.log('Response error');
					});
		}
	};

	$scope.nuevoUsuario = function(){
		console.log('llamando a usuario');
		location.href="#/nuevoUsuario";
	};
	
	$scope.listarUsuario();
	$scope.beanUsuario = {};
	$scope.beanUsuario.rol = {};
	$scope.beanUsuario.rol.id = -1;
}]);


appinicio.config(function ($routeProvider) {
    $routeProvider.
    when('/inicio', {
        templateUrl: 'idInicio',
        controller: 'InicioCtrl'
    }).
    when('/seguridad', {
        templateUrl: 'idAdmSeguridad',
        controller: 'SeguridadCtrl'
    }).
    when('/nuevoUsuario', {
        templateUrl: 'idNuevoUsuario',
        controller: 'SeguridadCtrl'
    }).
    otherwise({
        redirectTo: '/inicio'
    });
});