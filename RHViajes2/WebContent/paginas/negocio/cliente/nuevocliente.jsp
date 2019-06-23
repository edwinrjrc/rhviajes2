<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es" ng-app="clientesapp">
<head>
<!-- META SECTION -->
<title>RHViajes 2</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="icon" href="favicon.ico" type="image/x-icon" />
<!-- END META SECTION -->
<!-- CSS INCLUDE -->
<link rel="stylesheet" type="text/css" id="theme"
	href="/RHViajes2/recursos/css/theme-white.css" />
<!-- EOF CSS INCLUDE -->
</head>
<body>
	<!-- START PAGE CONTAINER -->
	<div class="page-container">
		<div class="page-sidebar">
			<jsp:include page="/recursos/include/menu.jsp"></jsp:include>
		</div>
		<!-- PAGE CONTENT -->
		<div class="page-content" ng-controller="admclientectrl">
			<!-- START X-NAVIGATION VERTICAL -->
			<ul class="x-navigation x-navigation-horizontal x-navigation-panel">
				<!-- TOGGLE NAVIGATION -->
				<li class="xn-icon-button"><a href="#"
					class="x-navigation-minimize"><span class="fa fa-dedent"></span></a>
				</li>
				<!-- END TOGGLE NAVIGATION -->
				<!-- SEARCH -->
				<li class="xn-search">
					<form role="form">
						<input type="text" name="search" placeholder="Search..." />
					</form>
				</li>
				<!-- END SEARCH -->
				<!-- SIGN OUT -->
				<li class="xn-icon-button pull-right"><a href="#"
					class="mb-control" data-box="#mb-signout"><span
						class="fa fa-sign-out"></span></a></li>
				<!-- END SIGN OUT -->
				<!-- MESSAGES -->
				<li class="xn-icon-button pull-right"><a href="#"><span
						class="fa fa-comments"></span></a>
					<div class="informer informer-danger">4</div>
					<div
						class="panel panel-primary animated zoomIn xn-drop-left xn-panel-dragging">
						<div class="panel-heading">
							<h3 class="panel-title">
								<span class="fa fa-comments"></span> Messages
							</h3>
							<div class="pull-right">
								<span class="label label-danger">4 new</span>
							</div>
						</div>
						<div class="panel-body list-group list-group-contacts scroll"
							style="height: 200px;">
							<a href="#" class="list-group-item">
								<div class="list-group-status status-online"></div> <img
								src="/RHViajes2/recursos/images/user2.jpg" class="pull-left"
								alt="John Doe" /> <span class="contacts-title">John Doe</span>
								<p>Praesent placerat tellus id augue condimentum</p>
							</a> <a href="#" class="list-group-item">
								<div class="list-group-status status-away"></div> <img
								src="/RHViajes2/recursos/images/user2.jpg" class="pull-left"
								alt="Dmitry Ivaniuk" /> <span class="contacts-title">Dmitry
									Ivaniuk</span>
								<p>Donec risus sapien, sagittis et magna quis</p>
							</a> <a href="#" class="list-group-item">
								<div class="list-group-status status-away"></div> <img
								src="/RHViajes2/recursos/images/user2.jpg" class="pull-left"
								alt="Nadia Ali" /> <span class="contacts-title">Nadia
									Ali</span>
								<p>Mauris vel eros ut nunc rhoncus cursus sed</p>
							</a> <a href="#" class="list-group-item">
								<div class="list-group-status status-offline"></div> <img
								src="/RHViajes2/recursos/images/user2.jpg" class="pull-left"
								alt="Darth Vader" /> <span class="contacts-title">Darth
									Vader</span>
								<p>I want my money back!</p>
							</a>
						</div>
						<div class="panel-footer text-center">
							<a href="pages-messages.html">Show all messages</a>
						</div>
					</div></li>
				<!-- END MESSAGES -->
				<!-- TASKS -->
				<li class="xn-icon-button pull-right"><a href="#"><span
						class="fa fa-tasks"></span></a>
					<div class="informer informer-warning">3</div>
					<div
						class="panel panel-primary animated zoomIn xn-drop-left xn-panel-dragging">
						<div class="panel-heading">
							<h3 class="panel-title">
								<span class="fa fa-tasks"></span> Tasks
							</h3>
							<div class="pull-right">
								<span class="label label-warning">3 active</span>
							</div>
						</div>
						<div class="panel-body list-group scroll" style="height: 200px;">
							<a class="list-group-item" href="#"> <strong>Phasellus
									augue arcu, elementum</strong>
								<div class="progress progress-small progress-striped active">
									<div class="progress-bar progress-bar-danger"
										role="progressbar" aria-valuenow="50" aria-valuemin="0"
										aria-valuemax="100" style="width: 50%;">50%</div>
								</div> <small class="text-muted">John Doe, 25 Sep 2014 / 50%</small>
							</a> <a class="list-group-item" href="#"> <strong>Aenean
									ac cursus</strong>
								<div class="progress progress-small progress-striped active">
									<div class="progress-bar progress-bar-warning"
										role="progressbar" aria-valuenow="80" aria-valuemin="0"
										aria-valuemax="100" style="width: 80%;">80%</div>
								</div> <small class="text-muted">Dmitry Ivaniuk, 24 Sep 2014 /
									80%</small>
							</a> <a class="list-group-item" href="#"> <strong>Lorem
									ipsum dolor</strong>
								<div class="progress progress-small progress-striped active">
									<div class="progress-bar progress-bar-success"
										role="progressbar" aria-valuenow="95" aria-valuemin="0"
										aria-valuemax="100" style="width: 95%;">95%</div>
								</div> <small class="text-muted">John Doe, 23 Sep 2014 / 95%</small>
							</a> <a class="list-group-item" href="#"> <strong>Cras
									suscipit ac quam at tincidunt.</strong>
								<div class="progress progress-small">
									<div class="progress-bar" role="progressbar"
										aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
										style="width: 100%;">100%</div>
								</div> <small class="text-muted">John Doe, 21 Sep 2014 /</small><small
								class="text-success"> Done</small>
							</a>
						</div>
						<div class="panel-footer text-center">
							<a href="pages-tasks.html">Show all tasks</a>
						</div>
					</div></li>
				<!-- END TASKS -->
			</ul>
			<!-- END X-NAVIGATION VERTICAL -->

			<!-- START BREADCRUMB -->
			<ul class="breadcrumb">
				<li><a href="#">Home</a></li>
				<li><a href="#">Tables</a></li>
				<li class="active">Basic</li>
			</ul>
			<!-- END BREADCRUMB -->
			<!-- PAGE CONTENT WRAPPER -->
			<div class="page-content-wrap">
				<div class="row">
					<div class="col-md-12">
						<form class="form-horizontal" enctype="multipart/mixed stream">
							<div class="panel panel-default">
								<div class="panel-heading">
									<h5 class="panel-title">Administrar Clientes</h5>
								</div>
								<div class="panel-body">
									<div class="panel panel-default tabs">
										<ul class="nav nav-tabs" role="tablist">
											<li class="active"><a href="#tab-basica" role="tab"
												data-toggle="tab">Información Basica</a></li>
											<li><a href="#tab-direcciones" role="tab"
												data-toggle="tab">Direcciones</a></li>
											<li><a href="#tab-contactos" role="tab"
												data-toggle="tab">Contactos</a></li>
											<li><a href="#tab-adjuntos" role="tab" data-toggle="tab">Archivos
													Adjuntos</a></li>
										</ul>
										<div class="panel-body tab-content">
											<div class="tab-pane active" id="tab-basica">
												<div class="row">
													<div class="form-group">
														<label class="col-md-2 col-xs-12 control-label">Tipo
															Documento</label>
														<div class="col-md-4 col-xs-12">
															<select class="form-control" id="idseltipodocumento"
																ng-model="cliente.tipoDocumento"
																ng-change="consultarConfiguracionServicio()">
																<option value="">-Seleccione-</option>
																<option ng-repeat="item in listaTipoDocumento"
																	ng-value="item.codigoEntero">{{item.nombre}}</option>
															</select>
														</div>
														<label class="col-md-2 col-xs-12 control-label">Número
															Documento</label>
														<div class="col-md-4 col-xs-12">
															<input class="form-control" type="text" id="numdocumento"
																ng-model="cliente.numeroDocumento">
														</div>
													</div>
													<div class="form-group"
														ng-show="mostrarPersona || mostrarEmpresa">
														<label class="col-md-2 col-xs-12 control-label">Nombres</label>
														<div class="col-md-10 col-xs-12">
															<input class="form-control" type="text"
																ng-model="cliente.nombres" id="nombrescliente">
														</div>
													</div>
													<div class="form-group" ng-show="mostrarEmpresa">
														<label class="col-md-2 col-xs-12 control-label">Nombre
															Comercial</label>
														<div class="col-md-10 col-xs-12">
															<input class="form-control" type="text" id="nombrecomercial"
																ng-model="cliente.nombreComercial">
														</div>
													</div>
													<div class="form-group" ng-show="mostrarEmpresa">
														<label class="col-md-2 col-xs-12 control-label">Razón
															Social</label>
														<div class="col-md-10 col-xs-12">
															<input class="form-control" type="text"
																ng-model="cliente.razonSocial" id="razonsocial">
														</div>
													</div>
													<div class="form-group" ng-show="mostrarPersona">
														<label class="col-md-2 col-xs-12 control-label">Apellido
															Paterno</label>
														<div class="col-md-4 col-xs-12">
															<input class="form-control" type="text" id="apellidopaterno"
																ng-model="cliente.apellidoPaterno">
														</div>
														<label class="col-md-2 col-xs-12 control-label">Apellido
															Materno</label>
														<div class="col-md-4 col-xs-12">
															<input class="form-control" type="text" id="apellidomaterno"
																ng-model="cliente.apellidoMaterno">
														</div>
													</div>
													<div class="form-group" ng-show="mostrarPersona">
														<label class="col-md-2 col-xs-12 control-label">Estado
															Civil</label>
														<div class="col-md-4 col-xs-12">
															<select class="form-control"
																ng-model="cliente.idEstadoCivil" id="idestadocivil">
																<option value="">-Seleccione-</option>
																<option ng-repeat="item in listaEstadoCivil"
																	ng-value="item.codigoEntero">{{item.nombre}}</option>
															</select>
														</div>
														<label class="col-md-2 col-xs-12 control-label">Genero</label>
														<div class="col-md-4 col-xs-12">
															<select class="form-control" ng-model="cliente.idGenero"
																ng-change="consultarConfiguracionServicio()" id="idgenero">
																<option value="">-Seleccione-</option>
																<option value="M">Masculino</option>
																<option value="F">Femenino</option>
															</select>
														</div>
													</div>
													<div class="form-group"
														ng-show="mostrarPersona || mostrarEmpresa">
														<label class="col-md-2 col-xs-12 control-label">Fecha
															Nacimiento</label>
														<div class="col-md-4 col-xs-12">
															<input class="form-control" type="date"
																ng-model="cliente.fechaNacimiento" id="fechanacimiento">
														</div>
														<label class="col-md-2 col-xs-12 control-label">&nbsp;</label>
														<div class="col-md-4 col-xs-12">&nbsp;</div>
													</div>
													<div class="form-group" ng-show="mostrarPersona">
														<label class="col-md-2 col-xs-12 control-label">Número
															Pasaporte</label>
														<div class="col-md-4 col-xs-12">
															<input class="form-control" type="text"
																ng-model="cliente.numeroPasaporte" id="numeropasaporte">
														</div>
														<label class="col-md-2 col-xs-12 control-label">Fecha
															Vcto Pasaporte</label>
														<div class="col-md-4 col-xs-12">
															<input class="form-control" type="date"
																ng-model="cliente.fechaVctoPasaporte" id="fechavctopasaporte">
														</div>
													</div>
												</div>
											</div>
											<div class="tab-pane" id="tab-direcciones">
												<div class="row">
													<div class="col-md-12">
														<table class="table">
															<thead>
																<tr>
																	<th colspan="5">
																		<button class="btn btn-primary" data-toggle="modal"
																			id="idbtnAddDireccion" type="button"
																			data-target="#modalDireccion"
																			ng-click="nuevaDireccion()">Agregar</button>
																	</th>
																</tr>
																<tr>
																	<th>Id</th>
																	<th>Direccion</th>
																	<th>Ubigeo</th>
																	<th>Es Principal</th>
																	<th></th>
																</tr>
															</thead>
															<tbody>
																<tr ng-repeat="dir in listaDirecciones">
																	<td>{{dir.id}}</td>
																	<td>{{dir.direccion}}</td>
																	<td>{{dir.ubigeo}}</td>
																	<td><span ng-show="dir.esPrincipal">Si</span><span
																		ng-show="!dir.esPrincipal">No</span></td>
																	<td><a href="#" ng-click="editar(dir.id)"><span
																			class="fa fa-edit"></span></a><a href="#"><span
																			class="fa fa-trash-o"></span></a></td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
												<div class="modal" id="modalDireccion" tabindex="-1"
													role="dialog" aria-labelledby="largeModalHead"
													aria-hidden="true">
													<div class="modal-dialog modal-lg">
														<div class="modal-content">
															<div class="modal-header">
																<button type="button" class="close" data-dismiss="modal">
																	<span aria-hidden="true">&times;</span><span
																		class="sr-only">Close</span>
																</button>
																<h4 class="modal-title" id="largeModalHead">Agregar
																	Direccion</h4>
															</div>
															<div class="modal-body">
																<div class="row">
																	<div class="col-md-12">
																		<div class="panel panel-default tabs">
																			<ul class="nav nav-tabs" role="tablist">
																				<li class="active"><a href="#tab-direccion"
																					role="tab" data-toggle="tab">Dirección</a></li>
																				<li><a href="#tab-telefono" role="tab"
																					data-toggle="tab">Teléfono</a></li>
																			</ul>
																			<div class="panel-body tab-content">
																				<div class="tab-pane active" id="tab-direccion">
																					<div class="row">
																						<div class="col-md-12">
																							<div class="form-group">
																								<label class="col-md-2 col-xs-12 control-label">Via</label>
																								<div class="col-md-4 col-xs-12">
																									<select class="form-control"
																										ng-model="direccion.idVia" id="idvia">
																										<option value="">-Seleccione-</option>
																										<option ng-repeat="item in listaTiposVia"
																											ng-value="item.codigoEntero">{{item.nombre}}</option>
																									</select>
																								</div>
																								<label class="col-md-2 col-xs-12 control-label">Nombre
																									Via</label>
																								<div class="col-md-4 col-xs-12">
																									<input type="text" class="form-control"
																										ng-model="direccion.nombreVia" id="nombrevia">
																								</div>
																							</div>
																							<div class="form-group">
																								<label class="col-md-2 col-xs-12 control-label">Número</label>
																								<div class="col-md-4 col-xs-12">
																									<input type="text" class="form-control"
																										ng-model="direccion.numero">
																								</div>
																								<label class="col-md-2 col-xs-12 control-label">Interior</label>
																								<div class="col-md-4 col-xs-12">
																									<input type="text" class="form-control"
																										ng-model="direccion.interior">
																								</div>
																							</div>
																							<div class="form-group">
																								<label class="col-md-2 col-xs-12 control-label">Manzana</label>
																								<div class="col-md-4 col-xs-12">
																									<input type="text" class="form-control"
																										ng-model="direccion.manzana">
																								</div>
																								<label class="col-md-2 col-xs-12 control-label">Lote</label>
																								<div class="col-md-4 col-xs-12">
																									<input type="text" class="form-control"
																										ng-model="direccion.lote">
																								</div>
																							</div>
																							<div class="form-group">
																								<label class="col-md-2 col-xs-12 control-label">Pais</label>
																								<div class="col-md-4 col-xs-12">
																									<select class="form-control"
																										ng-model="direccion.idPais">
																										<option value="">-Seleccione-</option>
																										<option ng-repeat="item in listaPaises"
																											ng-value="item.codigoCadena">{{item.nombre}}</option>
																									</select>
																								</div>
																								<label class="col-md-2 col-xs-12 control-label"></label>
																								<label class="col-md-4 col-xs-12 control-label"></label>
																							</div>
																							<div class="form-group">
																								<label class="col-md-2 col-xs-12 control-label">Departamento</label>
																								<div class="col-md-4 col-xs-12">
																									<select class="form-control"
																										ng-model="direccion.idDepartamento"
																										ng-change="listarProvincias()">
																										<option value="">-Seleccione-</option>
																										<option ng-repeat="item in listaDepartamentos"
																											ng-value="item.codigoCadena">{{item.nombre}}</option>
																									</select>
																								</div>
																								<label class="col-md-2 col-xs-12 control-label">Provincia</label>
																								<div class="col-md-4 col-xs-12">
																									<select class="form-control"
																										ng-model="direccion.idProvincia"
																										ng-change="listarDistritos()">
																										<option value="">-Seleccione-</option>
																										<option ng-repeat="item in listaProvincias"
																											ng-value="item.codigoCadena">{{item.nombre}}</option>
																									</select>
																								</div>
																							</div>
																							<div class="form-group">
																								<label class="col-md-2 col-xs-12 control-label">Distrito</label>
																								<div class="col-md-4 col-xs-12">
																									<select class="form-control"
																										ng-model="direccion.idDistrito">
																										<option value="">-Seleccione-</option>
																										<option ng-repeat="item in listaDistritos"
																											ng-value="item.codigoCadena">{{item.nombre}}</option>
																									</select>
																								</div>
																								<label class="col-md-2 col-xs-12 control-label">Es
																									oficina Principal</label>
																								<div class="col-md-4 col-xs-12">
																									<input type="checkbox"
																										ng-model="direccion.esPrincipal" />
																								</div>
																							</div>
																							<div class="form-group">
																								<label class="col-md-2 col-xs-12 control-label">Referencia</label>
																								<div class="col-md-4 col-xs-12">
																									<textarea class="form-control" rows="5"
																										cols="50" ng-model="direccion.referencia"></textarea>
																								</div>
																								<label class="col-md-2 col-xs-12 control-label">Observaciones</label>
																								<div class="col-md-4 col-xs-12">
																									<textarea class="form-control" rows="5"
																										cols="50" ng-model="direccion.observaciones"></textarea>
																								</div>
																							</div>
																						</div>
																					</div>
																				</div>
																				<div class="tab-pane" id="tab-telefono">
																					<div class="row">
																						<div class="col-md-12">
																							<table class="table">
																								<thead>
																									<tr>
																										<td colspan="2">
																											<button class="btn btn-primary" type="button"
																												ng-click="agregarTelefono()">Agregar</button>
																										</td>
																									</tr>
																									<tr>
																										<th></th>
																										<th>Número</th>
																									</tr>
																								</thead>
																								<tbody>
																									<tr ng-repeat="item in listaTelefonos">
																										<td></td>
																										<td><input type="text"
																											class="form-control" style="width: 50%"
																											ng-model="item.numero"></td>
																									</tr>
																								</tbody>
																							</table>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div class="modal-footer">
																<button type="button" id="idbtnAgregarDireccion"
																	class="btn btn-primary" ng-click="agregarDireccion()">Agregar</button>
																<button type="button" id="idbtnCerrarModal"
																	class="btn btn-default" data-dismiss="modal">Close</button>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="tab-pane" id="tab-contactos">
												<div class="row">
													<div class="col-md-12">
														<table class="table">
															<thead>
																<tr>
																	<th colspan="5">
																		<button class="btn btn-primary" data-toggle="modal"
																			id="idbtnAddContacto" type="button"
																			data-target="#modalContacto"
																			ng-click="nuevoContacto()">Agregar</button>
																	</th>
																</tr>
																<tr>
																	<th>Id</th>
																	<th>Nombres</th>
																	<th>Apellidos</th>
																	<th>Telefono</th>
																	<th></th>
																</tr>
															</thead>
															<tbody>
																<tr ng-repeat="item in listaContactos">
																	<td>{{item.id}}</td>
																	<td>{{item.nombres}}</td>
																	<td>{{item.apellidoPaterno}}
																		{{item.apellidoMaterno}}</td>
																	<td></td>
																	<td><a href="#" ng-click="editarContacto(item.id)"><span
																			class="fa fa-edit"></span></a><a href="#"><span
																			class="fa fa-trash-o"></span></a></td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
												<div class="modal" id="modalContacto" tabindex="-1"
													role="dialog" aria-labelledby="largeModalHead"
													aria-hidden="true">
													<div class="modal-dialog modal-lg">
														<div class="modal-content">
															<div class="modal-header">
																<button type="button" class="close" data-dismiss="modal">
																	<span aria-hidden="true">&times;</span><span
																		class="sr-only">Close</span>
																</button>
																<h4 class="modal-title" id="largeModalHead">Agregar
																	Contacto</h4>
															</div>
															<div class="modal-body">
																<div class="row">
																	<div class="col-md-12">
																		<div class="panel panel-default tabs">
																			<ul class="nav nav-tabs" role="tablist">
																				<li class="active"><a href="#tab-contacto"
																					role="tab" data-toggle="tab">Contacto</a></li>
																				<li><a href="#tab-telefono2" role="tab"
																					data-toggle="tab">Teléfonos</a></li>
																			</ul>
																			<div class="panel-body tab-content">
																				<div class="tab-pane active" id="tab-contacto">
																					<div class="row">
																						<div class="col-md-12">
																							<div class="form-group">
																								<label class="col-md-2 col-xs-12 control-label">Tipo
																									Documento</label>
																								<div class="col-md-4 col-xs-12">
																									<select class="form-control"
																										ng-model="contacto.idtipodocumento">
																										<option value="">-Seleccione-</option>
																										<option ng-repeat="item in listaTipoDocumento"
																											ng-value="item.codigoEntero">{{item.nombre}}</option>
																									</select>
																								</div>
																								<label class="col-md-2 col-xs-12 control-label">Número
																									Documento</label>
																								<div class="col-md-4 col-xs-12">
																									<input type="text" class="form-control"
																										ng-model="contacto.numeroDocumento">
																								</div>
																							</div>
																							<div class="form-group">
																								<label class="col-md-2 col-xs-12 control-label">Apellido
																									Paterno</label>
																								<div class="col-md-4 col-xs-12">
																									<input type="text" class="form-control"
																										ng-model="contacto.apellidoPaterno">
																								</div>
																								<label class="col-md-2 col-xs-12 control-label">Apellido
																									Materno</label>
																								<div class="col-md-4 col-xs-12">
																									<input type="text" class="form-control"
																										ng-model="contacto.apellidoMaterno">
																								</div>
																							</div>
																							<div class="form-group">
																								<label class="col-md-2 col-xs-12 control-label">Nombres</label>
																								<div class="col-md-10 col-xs-12">
																									<input type="text" class="form-control"
																										ng-model="contacto.nombres">
																								</div>
																							</div>
																							<div class="form-group">
																								<label class="col-md-2 col-xs-12 control-label">Area</label>
																								<div class="col-md-4 col-xs-12">
																									<select ng-model="contacto.area"
																										class="form-control">
																										<option value="">-Seleccione-</option>
																										<option ng-repeat="item in listaAreas"
																											ng-value="item.codigoEntero">{{item.nombre}}</option>
																									</select>
																								</div>
																								<label class="col-md-2 col-xs-12 control-label">Anexo</label>
																								<div class="col-md-4 col-xs-12">
																									<input type="text" class="form-control"
																										ng-model="contacto.anexo">
																								</div>
																							</div>
																						</div>
																					</div>
																				</div>
																				<div class="tab-pane" id="tab-telefono2">
																					<div class="row">
																						<div class="col-md-12">
																							<table class="table">
																								<thead>
																									<tr>
																										<td colspan="2">
																											<button class="btn btn-primary" type="button"
																												ng-click="agregarTelefonoContacto()">Agregar</button>
																										</td>
																									</tr>
																									<tr>
																										<th></th>
																										<th>Número</th>
																									</tr>
																								</thead>
																								<tbody>
																									<tr ng-repeat="item in listaTeleContacto">
																										<td></td>
																										<td><input type="text"
																											class="form-control" style="width: 50%"
																											ng-model="item.numero"></td>
																									</tr>
																								</tbody>
																							</table>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div class="modal-footer">
																<button type="button" id="idbtnAgregarContacto"
																	class="btn btn-primary" ng-click="agregarContacto()">Agregar</button>
																<button type="button" id="idbtnCerrarModalContacto"
																	class="btn btn-default" data-dismiss="modal">Close</button>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="tab-pane" id="tab-adjuntos">
												<div class="row">
													<div class="col-md-12">
														<table class="table">
															<thead>
																<tr>
																	<th colspan="4">
																		<button class="btn btn-primary" data-toggle="modal"
																			id="idbtnAddAdjunto" type="button"
																			data-target="#modalAdjunto" ng-click="nuevoAdjunto()">Agregar</button>
																	</th>
																</tr>
																<tr>
																	<th>Id</th>
																	<th>Tipo Archivo</th>
																	<th>Descripción</th>
																	<th></th>
																</tr>
															</thead>
															<tbody>
																<tr ng-repeat="item in listaAdjuntos">
																	<td>{{item.id}}</td>
																	<td>{{item.tipoAdjunto.nombre}}</td>
																	<td>{{item.descripcion}}</td>
																	<td><a href="#"><span class="fa fa-trash-o"></span></a>
																		<a href="#"><span class="fa fa-download"></span></a></td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
												<div class="modal" id="modalAdjunto" tabindex="-1"
													role="dialog" aria-labelledby="largeModalHead"
													aria-hidden="true">
													<div class="modal-dialog modal-lg">
														<div class="modal-content">
															<div class="modal-header">
																<button type="button" class="close" data-dismiss="modal">
																	<span aria-hidden="true">&times;</span><span
																		class="sr-only">Close</span>
																</button>
																<h4 class="modal-title" id="largeModalHead">Agregar
																	Adjunto</h4>
															</div>
															<div class="modal-body">
																<div class="row">
																	<div class="col-md-12">
																		<div class="form-group">
																			<label class="col-md-2 col-xs-12 control-label">Tipo
																				Adjunto</label>
																			<div class="col-md-4 col-xs-12">
																				<select class="form-control"
																					ng-model="adjunto.idtipodocumento">
																					<option value="">-Seleccione-</option>
																					<option ng-repeat="item in listaTipoAdjuntos"
																						ng-value="item.codigoEntero">{{item.nombre}}</option>
																				</select>
																			</div>
																			<label class="col-md-2 col-xs-12 control-label"></label>
																			<label class="col-md-4 col-xs-12 control-label"></label>
																		</div>
																		<div class="form-group">
																			<label class="col-md-2 col-xs-12 control-label">Adjunto</label>
																			<div class="col-md-10 col-xs-12">
																				<input type="file" ngf-select="" ng-model="archivo"
																					class="form-control">
																			</div>
																		</div>
																		<div class="form-group">
																			<label class="col-md-2 col-xs-12 control-label">Descripción</label>
																			<div class="col-md-10 col-xs-12">
																				<textarea rows="10" cols="100"
																					ng-model="adjunto.descripcion" class="form-control"></textarea>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div class="modal-footer">
																<button type="button" id="idbtnAgregarAdjunto"
																	class="btn btn-primary"
																	ng-click="uploadDocumento(archivo)">Cargar</button>
																<button type="button" id="idbtnCerrarModalAdjunto"
																	class="btn btn-default" data-dismiss="modal">Close</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="panel-footer">
									<div class="row">
										<div class="col-md-12 col-xs-12">
											<button class="btn btn-primary" type="button"
												data-toggle="modal"
										data-target="#modal_confirmacion">
												<span class="fa fa-save"></span>Grabar
											</button>
										</div>
									</div>
								</div>
								<div class="modal" id="modal_confirmacion" tabindex="-1"
									role="dialog" aria-labelledby="defModalHead" aria-hidden="true">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal"
													id="btnCerrarModalConfirmacion">
													<span aria-hidden="true">&times;</span><span
														class="sr-only">Close</span>
												</button>
												<h4 class="modal-title" id="defModalHead">Confirmación</h4>
											</div>
											<div class="modal-body">¿Estas seguro de grabar?</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-default"
													ng-click="guardarCliente()">Si</button>
												<button type="button" class="btn btn-default"
													data-dismiss="modal">No</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
					<!-- END PAGE CONTENT WRAPPER -->
				</div>
			</div>
			<!-- END PAGE CONTENT -->
		</div>
		<!-- END PAGE CONTAINER -->
	</div>
	<!-- MESSAGE BOX-->
	<div class="message-box animated fadeIn" data-sound="alert"
		id="mb-remove-row">
		<div class="mb-container">
			<div class="mb-middle">
				<div class="mb-title">
					<span class="fa fa-times"></span> Remove <strong>Data</strong> ?
				</div>
				<div class="mb-content">
					<p>Are you sure you want to remove this row?</p>
					<p>Press Yes if you sure.</p>
				</div>
				<div class="mb-footer">
					<div class="pull-right">
						<button class="btn btn-success btn-lg mb-control-yes">Yes</button>
						<button class="btn btn-default btn-lg mb-control-close">No</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END MESSAGE BOX-->

	<!-- MESSAGE BOX-->
	<div class="message-box animated fadeIn" data-sound="alert"
		id="mb-signout">
		<div class="mb-container">
			<div class="mb-middle">
				<div class="mb-title">
					<span class="fa fa-sign-out"></span> Log <strong>Out</strong> ?
				</div>
				<div class="mb-content">
					<p>Are you sure you want to log out?</p>
					<p>Press No if youwant to continue work. Press Yes to logout
						current user.</p>
				</div>
				<div class="mb-footer">
					<div class="pull-right">
						<a href="pages-login.html" class="btn btn-success btn-lg">Yes</a>
						<button class="btn btn-default btn-lg mb-control-close">No</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END MESSAGE BOX-->
	<!-- START SCRIPTS -->
	<!-- START PLUGINS -->
	<script type="text/javascript"
		src="/RHViajes2/recursos/js/jquery.min.js"></script>
	<script type="text/javascript"
		src="/RHViajes2/recursos/js/jquery-ui.min.js"></script>
	<script type="text/javascript"
		src="/RHViajes2/recursos/js/bootstrap.min.js"></script>
	<!-- END PLUGINS -->

	<!-- START THIS PAGE PLUGINS-->
	<script type='text/javascript'
		src='/RHViajes2/recursos/js/icheck.min.js'></script>
	<script type="text/javascript"
		src="/RHViajes2/recursos/js/jquery.mCustomScrollbar.min.js"></script>
	<script type="text/javascript"
		src="/RHViajes2/recursos/js/moment.min.js">
		
	</script>
	<script type="text/javascript"
		src="/RHViajes2/recursos/js/bootstrap-datepicker.js"></script>
	<script type="text/javascript"
		src="/RHViajes2/recursos/js/bootstrap-select.js">
		
	</script>
	<script type="text/javascript"
		src="/RHViajes2/recursos/js/demo_tables.js"></script>
	<!-- END THIS PAGE PLUGINS-->

	<!-- START TEMPLATE -->

	<script type="text/javascript" src="/RHViajes2/recursos/js/plugins.js"></script>
	<script type="text/javascript" src="/RHViajes2/recursos/js/actions.js"></script>
	<!-- END TEMPLATE -->
	<!-- END SCRIPTS -->
	<script type="text/javascript"
		src="/RHViajes2/recursos/js/angular.min.js"></script>
	<script type="text/javascript"
		src="/RHViajes2/recursos/js/angular-animate.min.js">
		
	</script>
	<script type="text/javascript"
		src="/RHViajes2/recursos/js/angular-sanitize.min.js"></script>
	<script src="/RHViajes2/recursos/js/ui-bootstrap-tpls-2.1.1.js"
		type="text/javascript"></script>
	<script src="/RHViajes2/recursos/js/ng-file-upload-shim.min.js"
		type="text/javascript">
		
	</script>
	<script src="/RHViajes2/recursos/js/ng-file-upload.min.js"
		type="text/javascript">
		
	</script>

	<script type="text/javascript"
		src="/RHViajes2/paginas/negocio/cliente/js/controlador.js"></script>
</body>
</html>