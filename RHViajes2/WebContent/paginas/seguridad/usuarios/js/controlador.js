var usuariosapp = angular.module('seguridadusuariosapp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

usuariosapp.controller('usuariosCtrl', ['$scope','$http', function($scope, $http){
	$scope.listaRoles = {};
	$scope.listaUsuarios = {};
	$scope.usuario = {};
	$scope.editar = false;
	$scope.nuevo = false;
	$scope.buscar = true;
	$scope.usuarioCreadoConExito = false;
	$scope.usuarioNoCreado = false;
	$scope.tituloPagina = "Administrar Usuarios";
	$scope.mensaje ="";
	$scope.fechaNacimiento;
	$scope.formularioBusqueda = {};
	$scope.totalItems = 0;
	$scope.currentPage = 1;
	$scope.itemsXpagina = 5;

	$scope.setPage = function (pageNo) {
	    $scope.currentPage = pageNo;
	};

	$scope.pageChanged = function() {
	    filtrar();
	};

	$scope.listaFiltrada = [];
	  
	var filtrar = function(){
	    $scope.listaFiltrada = [];
	    var limiteInferior = ($scope.currentPage-1)*$scope.itemsXpagina;
	    var limiteSuperior = ($scope.currentPage*$scope.itemsXpagina)-1;
	    for(i = 0 ; i < $scope.listaUsuarios.length; i++){
	      if(i>=limiteInferior && i<=limiteSuperior){
	        $scope.listaFiltrada[$scope.listaFiltrada.length] = $scope.listaUsuarios[i];
	      }
	    }
	};
	
	$scope.listarRoles = function(){
		$http({method: 'POST', url: 'http://localhost:8080/RHViajes2/servlets/ServletRol'}).then(
				function successCallback(response){
					$scope.listaRoles = response.data.roles;
				},
				function errorCallback(response){
					console.log('Response error');
				});
	};
	
	$scope.listarUsuarios = function(){
		$http({method: 'POST', url: 'http://localhost:8080/RHViajes2/servlets/ServletUsuario', 
			params: {accion:'listar'}}).then(
				function successCallback(response){
					$scope.listaUsuarios = response.data.usuarios;
					$scope.totalItems = $scope.listaUsuarios.length;
					filtrar();
				},
				function errorCallback(response){
					console.log('Response error');
				});
	};
	
	$scope.buscarUsuario = function(){
		$http({method: 'POST', url: '../../../servlets/ServletUsuario', 
			params: {accion:'buscar', formulario: $scope.formularioBusqueda}}).then(
				function successCallback(response){
					$scope.listaUsuarios = response.data.usuarios;
					$scope.totalItems = $scope.listaUsuarios.length;
					filtrar();
				},
				function errorCallback(response){
					console.log('Response error');
				});
	};
	
	/*$scope.editarUsuario = function(id){
		$http({method: 'POST', url: 'http://localhost:8080/RHViajes2/servlets/ServletUsuario', 
			params: {accion:'consultaEdicion', idUsuario: id}}).then(
				function successCallback(response){
					$scope.usuario = response.data.usuarioBean;
					console.log($scope.usuario.fechaNacimiento);
					$scope.fechaNacimiento = new Date($scope.usuario.fechaNacimiento);
					$scope.editar = true;
					$scope.buscar = false;
					$scope.tituloPagina = "Editar Usuarios";
				},
				function errorCallback(response){
					console.log('Response error');
				});
	};*/
	
	$scope.grabarUsuario = function(){
		if ($scope.nuevo){
			var error = false;
			$scope.usuarioCreadoConExito = false;
			$scope.usuarioNoCreado = false;
			$("#idtxtusuario").attr("class", "form-group");
			$("#idtxtpassword").attr("class", "form-group");
			$("#idselrol").attr("class", "form-group");
			$("#idtxtnombres").attr("class", "form-group");
			$("#idtxtapepaterno").attr("class", "form-group");
			$("#idtxtapematerno").attr("class", "form-group");
			$("#idtxtfecnacimiento").attr("class", "form-group");
			
			if ($scope.usuario.usuario == "" || $scope.usuario.usuario == undefined){
				$("#idtxtusuario").attr("class", "form-group has-error");
				error = true;
			}
			if ($scope.usuario.password == "" || $scope.usuario.password == undefined){
				$("#idtxtpassword").attr("class", "form-group has-error");
				error = true;
			}
			if ($scope.usuario.repassword == "" || $scope.usuario.repassword == undefined){
				$("#idtxtpassword").attr("class", "form-group has-error");
				error = true;
			}
			if ($scope.usuario.repassword != $scope.usuario.password){
				$("#idtxtpassword").attr("class", "form-group has-error");
				error = true;
			}
			if ($scope.usuario.rol == "" || $scope.usuario.rol == undefined){
				$("#idselrol").attr("class", "form-group has-error");
				error = true;
			}
			if ($scope.usuario.nombres == "" || $scope.usuario.nombres == undefined){
				$("#idtxtnombres").attr("class", "form-group has-error");
				error = true;
			}
			if ($scope.usuario.apellidoPaterno == "" || $scope.usuario.apellidoPaterno == undefined){
				$("#idtxtapepaterno").attr("class", "form-group has-error");
				error = true;
			}
			if ($scope.usuario.apellidoMaterno == "" || $scope.usuario.apellidoMaterno == undefined){
				$("#idtxtapematerno").attr("class", "form-group has-error");
				error = true;
			}
			if ($scope.fechaNacimiento == "" || $scope.fechaNacimiento == undefined){
				$("#idtxtfecnacimiento").attr("class", "form-group has-error");
				error = true;
			}
			if (error){
				return;
			}
			
			$http({method: 'POST', url: 'http://localhost:8080/RHViajes2/servlets/ServletUsuario', 
				params: {accion:'grabarNuevoUsuario', beanUsuario: $scope.usuario}}).then(
					function successCallback(response){
						console.log('Usuario Nuevo');
						$scope.editar = false;
						$scope.nuevo = false;
						$scope.buscar = true;
						$scope.mensaje = "Usuario Nuevo Creado";
						$scope.usuarioCreadoConExito = true;
						$scope.usuarioNoCreado = false;
					},
					function errorCallback(response){
						$scope.mensaje = "Usuario Nuevo No Creado";
						$scope.usuarioNoCreado = true;
					});
		}
		else if($scope.editar){
			var error = false;
			$scope.usuarioCreadoConExito = false;
			$scope.usuarioNoCreado = false;
			$("#idselrol").attr("class", "form-group");
			$("#idtxtnombres").attr("class", "form-group");
			$("#idtxtapepaterno").attr("class", "form-group");
			$("#idtxtapematerno").attr("class", "form-group");
			$("#idtxtfecnacimiento").attr("class", "form-group");
			
			if ($scope.usuario.rol == "" || $scope.usuario.rol == undefined){
				$("#idselrol").attr("class", "form-group has-error");
				error = true;
			}
			if ($scope.usuario.nombres == "" || $scope.usuario.nombres == undefined){
				$("#idtxtnombres").attr("class", "form-group has-error");
				error = true;
			}
			if ($scope.usuario.apellidoPaterno == "" || $scope.usuario.apellidoPaterno == undefined){
				$("#idtxtapepaterno").attr("class", "form-group has-error");
				error = true;
			}
			if ($scope.usuario.apellidoMaterno == "" || $scope.usuario.apellidoMaterno == undefined){
				$("#idtxtapematerno").attr("class", "form-group has-error");
				error = true;
			}
			if ($scope.fechaNacimiento == "" || $scope.fechaNacimiento == undefined){
				$("#idtxtfecnacimiento").attr("class", "form-group has-error");
				error = true;
			}
			if (error){
				return;
			}
			
			$http({method: 'POST', url: 'http://localhost:8080/RHViajes2/servlets/ServletUsuario', 
				params: {accion:'grabarEditaUsuario', beanUsuario: $scope.usuario}}).then(
					function successCallback(response){
						$scope.editar = false;
						$scope.nuevo = false;
						$scope.buscar = true;
						$scope.mensaje = "Usuario Actualizado";
						$scope.usuarioCreadoConExito = true;
						$scope.usuarioNoCreado = false;
					},
					function errorCallback(response){
						$scope.mensaje = "Usuario No Actualizado";
						$scope.usuarioNoCreado = true;
					});
		}
	}
	
	$scope.editarUsuario = function (id){
		$scope.editar = true;
		$scope.nuevo = false;
		$scope.buscar = false;
		for (var i=0; i<$scope.listaUsuarios.length; i++){
			var usuario = $scope.listaUsuarios[i];
			if (usuario.codigoEntero == id){
				$scope.usuario = usuario;
				$scope.usuario.rol = [];
				$scope.fechaNacimiento = new Date(usuario.fechaNacimiento+"Z");
				for (var j=0; j<usuario.listaRoles.length; j++){
					$scope.usuario.rol.push(usuario.listaRoles[j].codigoEntero+"");  
				}
				break;
			}
		}
	};
	
	$scope.nuevoUsuario = function(){
		$scope.editar = false;
		$scope.nuevo = true;
		$scope.buscar = false;
		$scope.tituloPagina = "Nuevo Usuario";
	};
	
	$scope.buscador = function(){
		$scope.editar = false;
		$scope.nuevo = false;
		$scope.buscar = true;
		$scope.tituloPagina = "Administrar Usuarios";
	};
	
	$scope.listarRoles();
	$scope.listarUsuarios();
	
	
	$scope.today = function() {
	    $scope.usuario.fechaNacimiento = new Date();
	  };
	  $scope.today();

	  $scope.clear = function() {
	    $scope.usuario.fechaNacimiento = null;
	  };

	  $scope.inlineOptions = {
	    customClass: getDayClass,
	    minDate: new Date(),
	    showWeeks: true
	  };

	  $scope.dateOptions = {
	    dateDisabled: disabled,
	    formatYear: 'yy',
	    maxDate: new Date(2020, 5, 22),
	    minDate: new Date(),
	    startingDay: 1
	  };

	  // Disable weekend selection
	  function disabled(data) {
	    var date = data.date,
	      mode = data.mode;
	    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
	  }

	  $scope.toggleMin = function() {
	    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
	    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
	  };

	  $scope.toggleMin();

	  $scope.open1 = function() {
	    $scope.popup1.opened = true;
	  };

	  $scope.open2 = function() {
	    $scope.popup2.opened = true;
	  };

	  $scope.setDate = function(year, month, day) {
	    $scope.dt = new Date(year, month, day);
	  };

	  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  $scope.format = $scope.formats[0];
	  $scope.altInputFormats = ['M!/d!/yyyy'];

	  $scope.popup1 = {
	    opened: false
	  };

	  $scope.popup2 = {
	    opened: false
	  };

	  var tomorrow = new Date();
	  tomorrow.setDate(tomorrow.getDate() + 1);
	  var afterTomorrow = new Date();
	  afterTomorrow.setDate(tomorrow.getDate() + 1);
	  $scope.events = [
	    {
	      date: tomorrow,
	      status: 'full'
	    },
	    {
	      date: afterTomorrow,
	      status: 'partially'
	    }
	  ];

	  function getDayClass(data) {
	    var date = data.date,
	      mode = data.mode;
	    if (mode === 'day') {
	      var dayToCheck = new Date(date).setHours(0,0,0,0);

	      for (var i = 0; i < $scope.events.length; i++) {
	        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

	        if (dayToCheck === currentDay) {
	          return $scope.events[i].status;
	        }
	      }
	    }

	    return '';
	  }
	  
}]);


usuariosapp.directive('usuariosApp', function() {
  return {
	    templateUrl: './../../../paginas/seguridad/usuarios/formulario.html'
  };
});

usuariosapp.directive('menuSistema', function() {
  return {
	    templateUrl: 'http://localhost:8080/RHViajes2/resources/include/menu.jsp'
	  };
	});

usuariosapp.$inject = ['$scope', '$filter'];

usuariosapp.directive("customSort", function() {
	return {
	    restrict: 'A',
	    transclude: true,    
	    scope: {
	      order: '=',
	      sort: '='
	    },
	    template : 
	      ' <a ng-click="sort_by(order)" style="color: #555555;">'+
	      '    <span ng-transclude></span>'+
	      '    <i ng-class="selectedCls(order)"></i>'+
	      '</a>',
	    link: function(scope) {
	                
	    // change sorting order
	    scope.sort_by = function(newSortingOrder) {       
	        var sort = scope.sort;
	        
	        if (sort.sortingOrder == newSortingOrder){
	            sort.reverse = !sort.reverse;
	        }                    
	
	        sort.sortingOrder = newSortingOrder;        
	    };
	   
	    scope.selectedCls = function(column) {
	        if(column == scope.sort.sortingOrder){
	            return ('icon-chevron-' + ((scope.sort.reverse) ? 'down' : 'up'));
	        }
	        else{            
	            return'icon-sort' 
	        } 
	    };      
	  }// end link
	}
});