var clientesapp = angular.module('clientesapp',['ngAnimate', 'ngSanitize','ui.bootstrap','ngFileUpload']);

clientesapp.controller('admclientectrl',function($scope,$http,$document,$timeout,$compile, Upload){
	$scope.listaClientes = [];
	$scope.itemsXpagina = 6;
	$scope.currentPage = 1;
	$scope.totalItems = 0;
	$scope.maxSize = 5;
	$scope.mostrarEmpresa = false;
	$scope.mostrarPersona = false;
	$scope.cliente = {};
	$scope.listaTelefonos = [];
	$scope.listaDirecciones = [];
	
	$scope.listarTipoDocumento = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listar',tipoMaestro:1}}).then(
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
					 if (response.data.exito == undefined){
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
	
	var consultarClientes = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCliente', params:{accion:'listar',numPagina:($scope.currentPage)}}).then(
				 function successCallback(response) {
					 if (response.data.exito == undefined){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 $scope.estadoConsulta = response.data.exito;
							 if ($scope.estadoConsulta){
								 $scope.mensaje = response.data.mensaje;
								 //$scope.listaClientes = response.data.objeto.listaClientes;
								 $scope.listaFiltrada = response.data.objeto.listaClientes;
								 $scope.totalItems = response.data.objeto.listaClientesCantidad;
								 //$scope.listaFiltrada = filtrar($scope.listaFiltrada, $scope.currentPage, $scope.listaClientes);
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	
	$scope.listarClientes = function (){
		consultarClientes();
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
		//$scope.listaFiltrada = filtrar($scope.listaFiltrada, $scope.currentPage, $scope.listaClientes);
		consultarClientes();
	};
	
	$scope.buscarClientes = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCliente', params:{accion:'buscar', formulario: $scope.formularioBusqueda}}).then(
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
	
	$scope.consultarConfiguracionServicio = function(){
		if ($scope.cliente.tipoDocumento == "3"){
			$scope.mostrarEmpresa = true;
			$scope.mostrarPersona = false;
		}
		else{
			$scope.mostrarEmpresa = false;
			$scope.mostrarPersona = true;
		}
	}
	
	listarTiposVia = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listar',tipoMaestro:2}}).then(
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
								 $scope.listaTiposVia = response.data.objeto;
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	listarTiposVia();
	
	listarDepartamentos = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listarDepartamentos'}}).then(
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
								 $scope.listaDepartamentos = response.data.objeto;
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	listarDepartamentos();
	
	$scope.listarProvincias = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listarProvincias', idDepartamento: $scope.direccion.idDepartamento}}).then(
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
								 $scope.listaProvincias = response.data.objeto;
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	
	$scope.listarDistritos = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listarDistritos', idDepartamento: $scope.direccion.idDepartamento, idProvincia: $scope.direccion.idProvincia}}).then(
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
								 $scope.listaDistritos = response.data.objeto;
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	
	listarPaises = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listarPaises'}}).then(
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
								 $scope.listaPaises = response.data.objeto;
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	listarPaises();
	
	listarAreas = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listarAreas'}}).then(
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
								 $scope.listaAreas = response.data.objeto;
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	}
	listarAreas();
	
	listarTipoAdjuntos = function(){
		$http({method: 'POST', url: '../../../servlets/ServletCatalogo', params:{accion:'listar',tipoMaestro:22}}).then(
				 function successCallback(response) {
					 if (response.data.exito == undefined){
						 location.href="../../../";
					 }
					 else{
						 if (response.data.exito){
							 $scope.estadoConsulta = response.data.exito;
							 if ($scope.estadoConsulta){
								 $scope.mensaje = response.data.mensaje;
								 $scope.listaTipoAdjuntos = response.data.objeto;
							 }
						 }
					 }
			  }, function errorCallback(response) {
				     console.log('Error en la llamada');
			  });
	};
	listarTipoAdjuntos();
	
	$scope.nuevaDireccion = function(){
		$scope.direccion = {};
		$scope.direccion.idPais = null;
		$scope.direccion.idDepartamento = null;
		$scope.direccion.idProvincia = null;
		$scope.direccion.idDistrito = null;
		$scope.listaTelefonos = [];
	}
	
	$scope.agregarTelefono = function(){
		var telefono = {};
		if ($scope.listaTelefonos == null){
			$scope.listaTelefonos = [];
		}
		$scope.listaTelefonos.push(telefono);
	}
	
	$scope.agregarDireccion = function(){
		$scope.direccion.listaTelefonos = $scope.listaTelefonos;
		if ($scope.listaDirecciones == null){
			$scope.listaDirecciones = [];
		}
		$scope.direccion.id = $scope.listaDirecciones.length + 1;
		$scope.direccion.direccion = generaDescripcionDireccion();
		$scope.direccion.ubigeo = generarDescripcionUbigeo();
		$scope.direccion.listaTelefonos = $scope.listaTelefonos;
		$scope.listaDirecciones.push($scope.direccion);
		$scope.cliente.listaDirecciones = $scope.listaDirecciones;
		document.getElementById('idbtnCerrarModal').click();
	}
	
	generaDescripcionDireccion = function(){
		var vdireccion = "";
		if ($scope.direccion.idVia != undefined && $scope.direccion.idVia != "" && $scope.direccion.idVia != ""){
			for (var i=0; i<$scope.listaTiposVia.length; i++){
				if ($scope.listaTiposVia[i].codigoEntero == $scope.direccion.idVia){
					vdireccion = vdireccion + $scope.listaTiposVia[i].nombre;
					break;
				}
			}
		}
		vdireccion = vdireccion + " " + $scope.direccion.nombreVia;
		vdireccion = vdireccion + " N° " + $scope.direccion.numero;
		if ($scope.direccion.interior != undefined && $scope.direccion.interior != null && $scope.direccion.interior != ""){
			vdireccion = vdireccion + " interior " + $scope.direccion.interior;
		}
		if ($scope.direccion.manzana != undefined && $scope.direccion.manzana != null && $scope.direccion.manzana != ""){
			vdireccion = vdireccion + " manzana " + $scope.direccion.manzana;
		}
		if ($scope.direccion.lote != undefined && $scope.direccion.lote != null && $scope.direccion.lote != ""){
			vdireccion = vdireccion + " lote " + $scope.direccion.lote;
		}
		if ($scope.direccion.idDepartamento != undefined && $scope.direccion.idDepartamento != null && $scope.direccion.idDepartamento != ""){
			for (var i=0; i<$scope.listaDepartamentos.length; i++){
				if ($scope.direccion.idDepartamento == $scope.listaDepartamentos[i].codigoCadena){
					vdireccion = vdireccion + " " + $scope.listaDepartamentos[i].nombre;
					break;
				}
			}
		}
		if ($scope.direccion.idProvincia != undefined && $scope.direccion.idProvincia != null && $scope.direccion.idProvincia != ""){
			for (var i=0; i<$scope.listaProvincias.length; i++){
				if ($scope.direccion.idProvincia == $scope.listaProvincias[i].codigoCadena){
					vdireccion = vdireccion + " " + $scope.listaProvincias[i].nombre;
					break;
				}
			}
		}
		if ($scope.direccion.idDistrito != undefined && $scope.direccion.idDistrito != null && $scope.direccion.idDistrito != ""){
			for (var i=0; i<$scope.listaDistritos.length; i++){
				if ($scope.direccion.idDistrito == $scope.listaDistritos[i].codigoCadena){
					vdireccion = vdireccion + " " + $scope.listaDistritos[i].nombre;
					break;
				}
			}
		}
		
		return vdireccion;
	}
	
	generarDescripcionUbigeo = function(){
		var vubigeo = "";
		if ($scope.direccion.idDepartamento != undefined && $scope.direccion.idDepartamento != ""){
			for (var i=0; i<$scope.listaDepartamentos.length; i++){
				if ($scope.listaDepartamentos[i].codigoCadena == $scope.direccion.idDepartamento){
					vubigeo = vubigeo + $scope.listaDepartamentos[i].nombre;
					break;
				}
			}
		}
		
		if ($scope.direccion.idProvincia != undefined && $scope.direccion.idProvincia != ""){
			for (var i=0; i<$scope.listaProvincias.length; i++){
				if ($scope.listaProvincias[i].codigoCadena == $scope.direccion.idProvincia){
					vubigeo = vubigeo + "-" + $scope.listaProvincias[i].nombre;
					break;
				}
			}
		}
		if ($scope.direccion.idDistrito != undefined && $scope.direccion.idDistrito != ""){
			for (var i=0; i<$scope.listaDistritos.length; i++){
				if ($scope.listaDistritos[i].codigoCadena == $scope.direccion.idDistrito){
					vubigeo = vubigeo + "-" + $scope.listaDistritos[i].nombre;
					break;
				}
			}
		}
		return vubigeo;
	}
	
	$scope.editar = function(id){
		$scope.nuevaDireccion();
		for (var i=0; i<$scope.listaDirecciones.length; i++){
			if (id == $scope.listaDirecciones[i].id	){
				$scope.direccion = $scope.listaDirecciones[i];
				break;
			}
		}
		$scope.listaTelefonos = $scope.direccion.listaTelefonos;
		
		document.getElementById('idbtnAddDireccion').click();
	}
	
	$scope.agregarContacto = function(){
		if ($scope.listaContactos == null){
			$scope.listaContactos = [];
		}
		$scope.contacto.id = $scope.listaContactos.length +1 ;
		$scope.contacto.listaTelefonos = $scope.listaTeleContacto;
		$scope.listaContactos.push($scope.contacto);
		$scope.cliente.listaContactos = $scope.listaContactos;
		document.getElementById('idbtnCerrarModalContacto').click();
	}
	
	$scope.agregarTelefonoContacto = function(){
		var telefono = {};
		if ($scope.listaTeleContacto == null){
			$scope.listaTeleContacto = [];
		}
		$scope.listaTeleContacto.push(telefono);
	}
	
	$scope.nuevoContacto = function(){
		$scope.contacto = null;
		$scope.listaTeleContacto = null;
	}
	
	$scope.editarContacto = function(id){
		$scope.nuevoContacto();
		for (var i=0; i<$scope.listaContactos.length; i++){
			if (id == $scope.listaContactos[i].id	){
				$scope.contacto = $scope.listaContactos[i];
				break;
			}
		}
		$scope.listaTeleContacto = $scope.contacto.listaTelefonos;
		
		document.getElementById('idbtnAddContacto').click();
	}
	
	$scope.uploadDocumento = function (file) {
	    $scope.formUpload = true;
	    if (file != null) {
	      $scope.upload(file);
	    }
	};
	
	$scope.upload = function (file, resumable) {
	    $scope.errorMsg = null;
	    /*if ($scope.howToSend === 1) {
	      uploadUsingUpload(file, resumable);
	    } else if ($scope.howToSend == 2) {
	      uploadUsing$http(file);
	    } else {
	      uploadS3(file);
	    }*/
	    uploadUsingUpload(file, resumable);
	  };
	  
	  $scope.chunkSize = 100000;
	  function uploadUsingUpload(file, resumable) {
	    file.upload = Upload.upload({
	      url: 'http://localhost:8080/RHViajes2/servlets/ServletCliente?accion=cargaArchivo',
	      resumeSizeUrl: resumable ? 'http://localhost:8080/RHViajes2/servlets/ServletCliente?accion=cargaArchivo&name=' + encodeURIComponent(file.name) : null,
	      resumeChunkSize: resumable ? $scope.chunkSize : null,
	      headers: {
	        'optional-header': 'header-value'
	      },
	      data: {file: file},
	      params: {adjunto: $scope.adjunto}
	    });

	    file.upload.then(function (response) {
	      $timeout(function () {
	    	  $scope.listaAdjuntos = response.data.objeto;
	    	  $scope.cliente.listaAdjuntos = [];
	    	  var miadjunto = {};
	    	  /*
	    	   * adjunto.setIdTipoDocumento(Double.valueOf(idtipodocumento).intValue());
					adjunto.setDescripcion(descripcion);
					adjunto.setNombreArchivo(nombreArchivo);
					adjunto.setId(adjuntos.size()+1);
					adjunto.setDatos(bytesArchivo);
					adjunto.setContent(content);
	    	   * */
	    	  for (var i=0; i<$scope.listaAdjuntos.length; i++){
	    		  $scope.listaAdjuntos[i].tipoAdjunto = {};
	    		  $scope.listaAdjuntos[i].tipoAdjunto.nombre = buscaTipoAdjunto($scope.listaAdjuntos[i].idTipoDocumento);
	    		  miadjunto.idTipoDocumento = $scope.listaAdjuntos[i].idTipoDocumento;
	    		  miadjunto.nombreArchivo = $scope.listaAdjuntos[i].nombreArchivo;
	    		  miadjunto.id = $scope.listaAdjuntos[i].id;
	    		  miadjunto.content = $scope.listaAdjuntos[i].content;
	    		  $scope.cliente.listaAdjuntos.push(miadjunto);
	    	  }
	    	  $scope.adjunto = {};
	    	  $scope.archivo = null;
	    	  document.getElementById('idbtnCerrarModalAdjunto').click();
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
	  
	  buscaTipoAdjunto = function(id){
		  for(var i=0; i<$scope.listaTipoAdjuntos.length; i++){
			  if ($scope.listaTipoAdjuntos[i].codigoEntero == id){
				  return $scope.listaTipoAdjuntos[i].nombre;
			  }
		  }
	  }
	  
	  
	  function uploadUsing$http(file) {
		    file.upload = Upload.http({
		      url: 'http://localhost:8080/RHViajes2/servlets/ServletCliente?accion=cargaArchivo',
		      method: 'POST',
		      headers: {
		        'Content-Type': file.type
		      },
		      data: file
		    });

		    file.upload.then(function (response) {
		      file.result = response.data;
		    }, function (response) {
		      if (response.status > 0)
		        $scope.errorMsg = response.status + ': ' + response.data;
		    });

		    file.upload.progress(function (evt) {
		      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
		    });
		  }
	  
	  function uploadS3(file) {
	    file.upload = Upload.upload({
	      url: $scope.s3url,
	      method: 'POST',
	      data: {
	        key: file.name,
	        AWSAccessKeyId: $scope.AWSAccessKeyId,
	        acl: $scope.acl,
	        policy: $scope.policy,
	        signature: $scope.signature,
	        'Content-Type': file.type === null || file.type === '' ? 'application/octet-stream' : file.type,
	        filename: file.name,
	        file: file
	      }
	    });

	    file.upload.then(function (response) {
	      $timeout(function () {
	        file.result = response.data;
	      });
	    }, function (response) {
	      if (response.status > 0)
	        $scope.errorMsg = response.status + ': ' + response.data;
	    });

	    file.upload.progress(function (evt) {
	      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
	    });
	    storeS3UploadConfigInLocalStore();
	  }
	  
	$scope.guardarCliente = function(){
		document.getElementById('btnCerrarModalConfirmacion').click();
		if (validarCliente()){
			$http({method: 'POST', url: '../../../servlets/ServletCliente', params:{accion:'guardar', cliente: $scope.cliente}}).then(
					 function successCallback(response) {
						 if (response.data.exito == undefined){
							 location.href="../../../";
						 }
						 else{
							 if (response.data.exito){
								 document.getElementById('idbtnExito').click();
							 }
							 else{
								 $scope.mensajeError = response.data.mensaje;
								 var boton = document.getElementById('idbtnError');
								 boton.click();
							 }
						 }
				  }, function errorCallback(response) {
					     console.log('Error en la llamada');
				  });
		}
	}
	
	var validarCliente = function(){
		var correcto = true;
		if ($scope.cliente.tipoDocumento == null && $scope.cliente.tipoDocumento == undefined){
			$('#idseltipodocumento').addClass('error');
			correcto = false;
		}
		return correcto;
	}
	
	$scope.aceptarMensajeExito = function(){
		location.href="/RHViajes2/paginas/negocio/cliente/adm.jsp";
	}
});