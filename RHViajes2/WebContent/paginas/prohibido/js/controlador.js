var prohibidoapp = angular.module('prohibidoapp',[]);

prohibidoapp.directive('menuSistema', function() {
	  return {
		    templateUrl: 'http://localhost:8080/RHViajes2/resources/include/menu.jsp'
		  };
		});
