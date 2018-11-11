<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es" ng-app="serviciosformapp">
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
		<div class="page-content">
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
			<div class="page-content-wrap" ng-controller="formctrl">
				<div class="row">
					<div class="col-md-12">
						<form class="form-horizontal">
							<div class="panel panel-default tabs">
								<ul class="nav nav-tabs" role="tablist">
									<li class="active"><a href="#tab-first" role="tab"
										data-toggle="tab">Información Venta</a></li>
									<li><a href="#tab-second" role="tab" data-toggle="tab">Servicios</a></li>
								</ul>
								<div class="panel-body tab-content">
									<div class="tab-pane active" id="tab-first">
										<div class="form-group">
											<label class="col-md-2 col-xs-12 control-label">Cliente</label>
											<div class="col-md-4 col-xs-12">
												<table>
													<tr>
														<td style="width: 90%"><input type="text"
															style="width: 90%;" class="form-control"
															ng-disabled="true"
															ng-model="servicioVenta.cliente.nombreCompleto"></td>
														<td style="width: 10%"><button data-toggle="modal"
																type="button" data-target="#modalClientes"
																class="btn btn-primary" ng-click="buscarCliente(1)">
																<i class="fa fa-search" aria-hidden="true"></i>
															</button></td>
													</tr>
												</table>
											</div>
											<label class="col-md-2 col-xs-12 control-label">Agente
												de Viajes</label>
											<div class="col-md-4 col-xs-12">
												<select class="form-control"
													ng-model="servicioVenta.codigoVendedor"><option
														value="">-Seleccione el agente-</option>
													<option ng-repeat="item in listaVendedores"
														ng-value="item.codigoEntero">{{item.nombres}}
														{{item.apellidoPaterno}}</option></select>
											</div>
										</div>
										<div class="form-group">
											<label class="col-md-2 col-xs-12 control-label">Fecha
												Servicio</label>
											<div class="col-md-4 col-xs-12">
												<input type="date" class="form-control"
													ng-model="servicioVenta.fechaServicio">
											</div>
											<label class="col-md-2 col-xs-12 control-label">Moneda
												Facturación</label>
											<div class="col-md-4 col-xs-12">
												<select class="form-control"
													ng-model="servicioVenta.monedaFacturacion"><option
														value="">-Seleccione-</option>
													<option ng-repeat="item in listaMonedas"
														ng-value="item.codigoEntero">{{item.nombre}}</option></select>
											</div>
										</div>
										<div class="modal" id="modalClientes" tabindex="-1"
											role="dialog" aria-labelledby="largeModalHead"
											aria-hidden="true">
											<div class="modal-dialog modal-lg">
												<div class="modal-content">
													<div class="modal-header">
														<button type="button" class="close" data-dismiss="modal">
															<span aria-hidden="true">&times;</span><span
																class="sr-only">Close</span>
														</button>
														<h4 class="modal-title" id="largeModalHead">Buscar
															Cliente</h4>
													</div>
													<div class="modal-body">
														<div class="row">
															<div class="col-md-12">
																<div class="form-group">
																	<label class="col-md-2 col-xs-12 control-label">Tipo
																		Documento</label>
																	<div class="col-md-4 col-xs-12">
																		<select class="form-control"
																			ng-model="busquedaCliente.tipoDocumento">
																			<option value="">-Seleccione-</option>
																			<option ng-repeat="item in listaTipoDocumento"
																				ng-value="item.codigoEntero">{{item.nombre}}</option>
																		</select>
																	</div>
																	<label class="col-md-2 col-xs-12 control-label">Número
																		Documento</label>
																	<div class="col-md-4 col-xs-12">
																		<input type="text" class="form-control"
																			ng-model="busquedaCliente.numeroDocumento">
																	</div>
																</div>
																<div class="form-group">
																	<label class="col-md-2 col-xs-12 control-label">Cliente</label>
																	<div class="col-md-10 col-xs-12">
																		<input type="text" class="form-control"
																			ng-model="busquedaCliente.nomCliente">
																	</div>
																</div>
																<div class="form-group" align="center">
																	<button type="button" class="btn btn-primary"
																		ng-click="buscarCliente(1)">
																		<i class="fa fa-search" aria-hidden="true"></i>Buscar
																	</button>
																</div>
																<table class="table">
																	<thead>
																		<tr>
																			<th>Documento</th>
																			<th>Cliente</th>
																			<th>Opcion</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr ng-repeat="item in listaClientes">
																			<td>{{item.documentoIdentidad.tipoDocumento.nombre}}-{{item.documentoIdentidad.numeroDocumento}}</td>
																			<td>{{item.nombres}}</td>
																			<td><a href="#"
																				ng-click="seleccionarCliente(item.codigoEntero)"><i
																					class="fa fa-hand-o-left" aria-hidden="true"></i>
																					Este</a></td>
																		</tr>
																	</tbody>
																	<tfoot>
																		<tr>
																			<td colspan="3" align="center">
																				<ul uib-pagination total-items="totalItems"
																					ng-model="currentPage" max-size="maxSize"
																					class="pagination-sm" boundary-links="true"
																					num-pages="numPages" ng-change="pageChanged()"></ul>
																			</td>
																		</tr>
																	</tfoot>
																</table>
															</div>
														</div>
													</div>
													<div class="modal-footer">
														<button type="button" id="idbtnCerrarModal"
															class="btn btn-default" data-dismiss="modal">Close</button>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="tab-pane" id="tab-second">
										<div class="form-group">
											<label class="col-md-2 col-xs-12 control-label">Tipo
												Servicio</label>
											<div class="col-md-4 col-xs-12">
												<select class="form-control"
													ng-model="detalleServicio.idTipoServicio"
													ng-change="consultarConfiguracionServicio()">
													<option value="">-Seleccione-</option>
													<option ng-repeat="item in listaMaestroServicio"
														ng-value="item.codigoEntero">{{item.nombre}}</option>
												</select>
											</div>
											<label class="col-md-2 col-xs-12 control-label"
												ng-show="configuracionServicio.muestraProveedor">Empresa
												Proveedora</label>
											<div class="col-md-4 col-xs-12">
												<select class="form-control"
													ng-show="configuracionServicio.muestraProveedor"
													ng-model="detalleServicio.idProveedor"
													ng-change="seleccionarProveedor()">
													<option value="">-Seleccione-</option>
													<option ng-repeat="item in listaProveedores"
														ng-value="item.codigoEntero">{{item.nombreProveedor}}</option>
												</select>
											</div>
										</div>
										<div class="form-group"
											ng-show="configuracionServicio.muestraRuta">
											<a href="#" onclick="modalShow()" data-toggle="modal"
												data-target="#modalRuta"><label
												class="col-md-2 col-xs-12 control-label">Ruta</label></a>
											<div class="col-md-10 col-xs-12">{{descripcionRuta}}</div>
										</div>
										<div class="modal" id="modalRuta" tabindex="-1" role="dialog"
											aria-labelledby="largeModalHead" aria-hidden="true">
											<div class="modal-dialog modal-lg">
												<div class="modal-content" style="width: 1100px;">
													<div class="modal-header">
														<button type="button" class="close" data-dismiss="modal">
															<span aria-hidden="true">&times;</span><span
																class="sr-only">Close</span>
														</button>
														<h4 class="modal-title" id="largeModalHead">Agregar
															Ruta</h4>
													</div>
													<div class="modal-body">
														<div class="row">
															<div class="col-md-12">
																<table class="table">
																	<thead>
																		<tr ng-show="mostrarError">
																			<td colspan="5">{{error}}</td>
																		</tr>
																		<tr>
																			<td><a href="#" ng-click="agregarTramo()">Agregar
																					Tramo</a></td>
																			<td><a href="#" ng-click="agregarTramoRegreso()">Agregar
																					Tramo Regreso</a></td>
																			<td colspan="3"></td>
																		</tr>
																		<tr>
																			<th>Origen</th>
																			<th>Fecha Salida</th>
																			<th>Destino</th>
																			<th>Fecha Llegada</th>
																			<th>Aerolinea</th>
																			<th>Eliminar</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr ng-repeat="item in listaTramos">
																			<td><select ng-model="item.origen.id"
																				class="form-control">
																					<option value="">-Seleccione-</option>
																					<option ng-repeat="op in listaDestinos"
																						ng-value="op.codigoEntero">({{op.codigoIATA}}){{op.descripcion}}</option>
																			</select></td>
																			<td><input class="form-control"
																				ng-model="item.fechaSalida" type="datetime-local"></td>
																			<td><select class="form-control"
																				ng-model="item.destino.id">
																					<option value="">-Seleccione-</option>
																					<option ng-repeat="op in listaDestinos"
																						ng-value="op.codigoEntero">({{op.codigoIATA}}){{op.descripcion}}</option>
																			</select></td>
																			<td><input class="form-control"
																				ng-model="item.fechaLlegada" type="datetime-local"></td>
																			<td><select class="form-control"
																				ng-id="idselaerolinea"
																				ng-model="item.codigoAerolinea">
																					<option value="">-Seleccione-</option>
																					<option ng-repeat="op in listaAerolineas"
																						ng-value="op.codigoEntero">{{op.nombreComercial}}</option>
																			</select></td>
																			<td align="center"><a href="#"
																				ng-click="eliminarTramo(item.id)"><i
																					class="fa fa-trash-o" aria-hidden="true"></i></a></select></td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>
													<div class="modal-footer">
														<button type="button" id="idbtnAceptarModal"
															ng-click="aceptarRuta()" class="btn btn-default">Aceptar</button>
														<button type="button" id="idbtnCerrarModalRuta"
															class="btn btn-default" data-dismiss="modal">Close</button>
													</div>
												</div>
											</div>
										</div>
										<div class="form-group"
											ng-show="configuracionServicio.muestraPasajeros">
											<a href="#" ng-click="mostrarModalPasajeros()"
												data-toggle="modal" data-target="#modalPasajeros"> <label
												class="col-md-2 col-xs-12 control-label">Pasajeros</label></a>
											<div class="col-md-10 col-xs-12">{{descripcionPasajeros}}</div>
										</div>
										<div class="modal" id="modalPasajeros" tabindex="-1"
											role="dialog" aria-labelledby="largeModalHead"
											aria-hidden="true">
											<div class="modal-dialog modal-lg">
												<div class="modal-content" style="width: 1100px;">
													<div class="modal-header">
														<button type="button" class="close" data-dismiss="modal"
															id="idbtnclosemodalpasajeros">
															<span aria-hidden="true">&times;</span><span
																class="sr-only">Close</span>
														</button>
														<h4 class="modal-title" id="largeModalHead2">Agregar
															Pasajeros</h4>
													</div>
													<div class="modal-body">
														<div class="row">
															<div class="col-md-12">
																<div class="form-group">
																	<label class="col-md-2 col-xs-12 control-label">Tipo
																		Documento</label>
																	<div class="col-md-4 col-xs-12">
																		<select class="form-control" id="idseltipodocumento"
																			ng-model="pasajero.tipoDocumento">
																			<option value="">-Seleccione-</option>
																			<option ng-repeat="item in listaTipoDocumento"
																				ng-value="item.codigoEntero">{{item.nombre}}</option>
																		</select>
																	</div>
																	<label class="col-md-2 col-xs-12 control-label">Número
																		Documento</label>
																	<div class="col-md-3 col-xs-12">
																		<input type="text" class="form-control" id="idnumdoc"
																			ng-model="pasajero.numeroDocumento"
																			style="text-transform: uppercase;">
																	</div>
																	<div class="col-md-1 col-xs-12">
																		<button class="btn" ng-click="consultarPaxsSistema()">
																			<span class="fa fa-search"></span>
																		</button>
																	</div>
																</div>
																<div class="form-group">
																	<label class="col-md-2 col-xs-12 control-label">Nombres</label>
																	<div class="col-md-4 col-xs-12">
																		<input type="text" class="form-control" id="idnombres"
																			ng-model="pasajero.nombres"
																			style="text-transform: uppercase;">
																	</div>
																	<label class="col-md-2 col-xs-12 control-label">Nacionalidad</label>
																	<div class="col-md-4 col-xs-12">
																		<select class="form-control"
																			style="text-transform: uppercase;"
																			id="idnacionalidad" ng-model="pasajero.nacionalidad">
																			<option value="">-Seleccione-</option>
																			<option ng-repeat="item in listaNacionalidad"
																				ng-value="item.codigoEntero">{{item.nombre}}</option>
																		</select>
																	</div>
																</div>
																<div class="form-group">
																	<label class="col-md-2 col-xs-12 control-label">Apellido
																		Paterno</label>
																	<div class="col-md-4 col-xs-12">
																		<input type="text" class="form-control"
																			id="idapepaterno" ng-model="pasajero.apePaterno"
																			style="text-transform: uppercase;">
																	</div>
																	<label class="col-md-2 col-xs-12 control-label">Apellido
																		Materno</label>
																	<div class="col-md-4 col-xs-12">
																		<input type="text" class="form-control"
																			id="idapematerno" ng-model="pasajero.apeMaterno"
																			style="text-transform: uppercase;">
																	</div>
																</div>
																<div class="form-group">
																	<label class="col-md-2 col-xs-12 control-label">Teléfono
																		1</label>
																	<div class="col-md-4 col-xs-12">
																		<input type="text" class="form-control" id="idtelef1"
																			ng-model="pasajero.telefono1">
																	</div>
																	<label class="col-md-2 col-xs-12 control-label">Teléfono
																		2</label>
																	<div class="col-md-4 col-xs-12">
																		<input type="text" class="form-control" id="idtelef2"
																			ng-model="pasajero.telefono2">
																	</div>
																</div>
																<div class="form-group">
																	<label class="col-md-2 col-xs-12 control-label">Correo
																		Electronico</label>
																	<div class="col-md-4 col-xs-12">
																		<input type="text" class="form-control" id="idcorreo"
																			ng-model="pasajero.correoElectronico"
																			style="text-transform: uppercase;">
																	</div>
																	<label class="col-md-2 col-xs-12 control-label">Relación</label>
																	<div class="col-md-4 col-xs-12">
																		<select class="form-control" id="idrelacion"
																			ng-model="pasajero.codigoRelacion">
																			<option value="">-Seleccione-</option>
																			<option ng-repeat="item in listaRelaciones"
																				ng-value="item.codigoEntero">{{item.nombre}}</option>
																		</select>
																	</div>
																</div>
																<div class="form-group">
																	<label class="col-md-2 col-xs-12 control-label">Número
																		Pasajero Frecuente</label>
																	<div class="col-md-4 col-xs-12">
																		<input type="text" class="form-control"
																			style="text-transform: uppercase;"
																			ng-model="pasajero.numPasajeroFrecuente">
																	</div>
																	<label class="col-md-2 col-xs-12 control-label">Aerolinea</label>
																	<div class="col-md-4 col-xs-12">
																		<select class="form-control"
																			ng-model="pasajero.aerolinea"><option
																				value="">-Seleccione-</option>
																			<option ng-repeat="item in listaAerolineas"
																				ng-value="item.codigoEntero">{{item.nombreComercial}}</option></select>
																	</div>
																</div>
																<div class="form-group">
																	<label class="col-md-2 col-xs-12 control-label">Fecha
																		Vcto Pasaporte</label>
																	<div class="col-md-4 col-xs-12">
																		<input type="date" class="form-control"
																			ng-model="pasajero.fechaVctoPasaporte">
																	</div>
																	<label class="col-md-2 col-xs-12 control-label">Fecha
																		Nacimiento</label>
																	<div class="col-md-4 col-xs-12">
																		<input type="date" class="form-control"
																			ng-model="pasajero.fechaNacimiento">
																	</div>
																</div>
																<div class="form-group">
																	<label class="col-md-2 col-xs-12 control-label">Código
																		Reserva</label>
																	<div class="col-md-4 col-xs-12">
																		<input type="text" class="form-control"
																			ng-model="pasajero.codigoReserva"
																			style="text-transform: uppercase;">
																	</div>
																	<label class="col-md-2 col-xs-12 control-label">Número
																		Boleto</label>
																	<div class="col-md-4 col-xs-12">
																		<input type="text" class="form-control"
																			ng-model="pasajero.numBoleto"
																			style="text-transform: uppercase;">
																	</div>
																</div>
																<div class="form-group" align="center">
																	<button type="button" ng-click="agregarPasajero()"
																		class="btn">Agregar</button>
																</div>
															</div>
														</div>
														<br>
														<div class="row">
															<div class="col-md-12">
																<table class="table">
																	<thead>
																		<tr>
																			<th>Nombres</th>
																			<th>Apellido Paterno</th>
																			<th>Apellido Materno</th>
																			<th>Correo Electronico</th>
																			<th>Teléfono 1</th>
																			<th>Teléfono 2</th>
																			<th>Relación</th>
																			<th>Opciones</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr ng-repeat="item in listaPasajeros">
																			<td>{{item.nombres}}</td>
																			<td>{{item.apePaterno}}</td>
																			<td>{{item.apeMaterno}}</td>
																			<td>{{item.correoElectronico}}</td>
																			<td>{{item.telefono1}}</td>
																			<td>{{item.telefono2}}</td>
																			<td>{{item.relacion}}</td>
																			<td><a href="#"
																				ng-click="consultaLocalPaxs(item.id)"><i
																					class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
																				<a href="#" ng-click="eliminarPasajero(item.id)"><i
																					class="fa fa-trash-o" aria-hidden="true"></i></a></td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>
													<div class="modal-footer" align="center">
														<button type="button" id="idbtnCerrarModal2"
															class="btn btn-default" ng-click="aceptarPasajeros()">Aceptar</button>

													</div>
												</div>
											</div>
										</div>
										<div class="form-group"
											ng-show="configuracionServicio.muestraHotel">
											<label class="col-md-2 col-xs-12 control-label"
												ng-show="configuracionServicio.muestraHotel">Hotel</label>
											<div class="col-md-4 col-xs-12"
												ng-show="configuracionServicio.muestraHotel">
												<select class="form-control"
													ng-model="detalleServicio.idHotel"
													ng-show="configuracionServicio.muestraHotel"><option
														value="">-Seleccione-</option>
													<option ng-repeat="item in listaHoteles"
														ng-value="item.codigoEntero">{{item.nombreComercial}}</option></select>
											</div>
											<label class="col-md-2 col-xs-12 control-label"
												ng-show="configuracionServicio.muestraOperadora">Operador</label>
											<div class="col-md-4 col-xs-12"
												ng-show="configuracionServicio.muestraOperadora">
												<select class="form-control"
													ng-model="detalleServicio.idOperador"
													ng-show="configuracionServicio.muestraOperadora"><option
														value="">-Seleccione-</option>
													<option ng-repeat="item in listaOperadores"
														ng-value="item.codigoEntero">{{item.nombreComercial}}</option></select>
											</div>
										</div>
										<div class="form-group"
											ng-show="configuracionServicio.muestraDescServicio">
											<label class="col-md-2 col-xs-12 control-label"
												ng-show="configuracionServicio.muestraDescServicio">Descripcion</label>
											<div class="col-md-10 col-xs-12"
												ng-show="configuracionServicio.muestraDescServicio">
												<textarea class="form-control" rows="10" cols="80"
													style="height: 50px; width: 600px;"
													ng-model="detalleServicio.descripcionServicio"
													ng-show="configuracionServicio.muestraDescServicio"></textarea>
											</div>
										</div>
										<div class="form-group"
											ng-show="configuracionServicio.muestraCantidad || configuracionServicio.muestraPrecioBase">
											<label class="col-md-2 col-xs-12 control-label"
												ng-show="configuracionServicio.muestraCantidad">Cantidad</label>
											<div class="col-md-4 col-xs-12">
												<input style="width: 50px; text-align: right;"
													class="form-control" type="number"
													ng-model="detalleServicio.cantidad"
													ng-show="configuracionServicio.muestraCantidad">
											</div>
											<label class="col-md-2 col-xs-12 control-label"
												ng-show="configuracionServicio.muestraPrecioBase">Precio
												Base</label>
											<div class="col-md-4 col-xs-12">
												<div class="col-md-4 col-xs-12">
													<input ng-model="detalleServicio.precioBaseInicial"
														style="width: 100px; text-align: right;"
														class="form-control" type="number"
														ng-show="configuracionServicio.muestraPrecioBase">
												</div>
												<div class="col-md-4 col-xs-12">
													<select ng-model="detalleServicio.idmoneda"
														ng-show="configuracionServicio.muestraPrecioBase"
														class="form-control" ng-change="consultarTipoCambio()"><option
															ng-repeat="item in listaMonedas"
															ng-value="item.codigoEntero">{{item.nombre}}</option></select>
												</div>
												<div class="col-md-4 col-xs-12">
													<input type="checkbox" ng-model="detalleServicio.conIgv"
														ng-show="configuracionServicio.muestraPrecioBase && muestraAplicaIgv"><span
														ng-show="configuracionServicio.muestraPrecioBase && muestraAplicaIgv">Con
														IGV</span>
												</div>
											</div>
										</div>
										<div class="form-group" ng-show="configuracionServicio.muestraFechaServicio || configuracionServicio.muestraFechaRegreso">
											<label class="col-md-2 col-xs-12 control-label" ng-show="configuracionServicio.muestraFechaServicio">Fecha Servicio</label>
											<div class="col-md-4 col-xs-12" ng-show="configuracionServicio.muestraFechaServicio">
												<input type="date" class="form-control" ng-model="detalleServicio.fechaServicio">
											</div>
											<label class="col-md-2 col-xs-12 control-label" ng-show="configuracionServicio.muestraFechaRegreso">Fecha Regreso</label>
											<div class="col-md-4 col-xs-12" ng-show="configuracionServicio.muestraFechaRegreso">
												<input type="date" class="form-control" ng-model="detalleServicio.fechaRegreso">
											</div>
										</div>
										<div class="form-group"
											ng-show="muestraServicioPadre && !detalleServicio.tipoServicio.servicioPadre">
											<label class="col-md-2 col-xs-12 control-label">Servicio
												Padre</label>
											<div class="col-md-4 col-xs-12">
												<select class="form-control"
													ng-model="detalleServicio.servicioPadre.codigo">
													<option value="">-Seleccione-</option>
													<option ng-repeat="item in listaServiciosPadre"
														ng-value="item.codigo">{{item.descripcion}}</option>
												</select>
											</div>
										</div>
										<div class="form-group">
											<label class="col-md-2 col-xs-12 control-label"
												ng-show="muestraAplicaIgv">Aplicar IGV</label>
											<div class="col-md-4 col-xs-12" ng-show="muestraAplicaIgv">
												<input ng-model="detalleServicio.aplicaIgv"
													style="width: 100px; text-align: right;" type="checkbox"
													ng-show="muestraAplicaIgv">
											</div>
											<label class="col-md-2 col-xs-12 control-label"
												ng-show="configuracionServicio.muestraPrecioBase">Tarifa
												Negociada</label>
											<div class="col-md-4 col-xs-12">
												<input ng-model="detalleServicio.tarifaNegociada"
													style="width: 100px; text-align: right;" type="checkbox"
													ng-show="configuracionServicio.muestraPrecioBase">
											</div>
										</div>
										<div class="form-group" ng-show="muestraComision">
											<label class="col-md-2 col-xs-12 control-label"
												ng-show="muestraComision">Tipo Valor Comisión</label>
											<div class="col-md-4 col-xs-12">
												<select class="form-control"
													ng-model="detalleServicio.tipoComision"><option
														value="">-Seleccione-</option>
													<option value="1">Porcentaje (%)</option>
													<option value="2">Monto Fijo</option></select>
											</div>
											<label class="col-md-2 col-xs-12 control-label"
												ng-show="muestraComision">Valor Comisión</label>
											<div class="col-md-4 col-xs-12">
												<input class="form-control" type="number"
													ng-model="detalleServicio.valorComision"
													style="width: 80px; text-align: right;">
											</div>
										</div>
										<div class="form-group" ng-show="muestraComision">
											<label class="col-md-2 col-xs-12 control-label"
												ng-show="muestraComision">Aplicar IGV</label>
											<div class="col-md-4 col-xs-12">
												<input type="checkbox"
													ng-model="detalleServicio.aplicaIgvComision">
											</div>
										</div>
										<div class="form-group" align="center"
											ng-show="detalleServicio.idTipoServicio != null">
											<button class="btn btn-primary" ng-click="agregarServicio()"
												ng-show="nuevoServicio">Agregar</button>
											<button class="btn btn-primary"
												ng-click="actualizarServicio()" ng-show="editaServicio">Actualizar</button>
											<button class="btn btn-primary" ng-click="limpiar()">Limpiar</button>
											<button class="btn btn-primary" ng-click="cancelar()">Cancelar</button>
										</div>
										<div class="form-group">
											<table style="width: 90%;" align="center" class="table">
												<thead>
													<tr>
														<th class="cabeceraTabla">Unid.</th>
														<th class="cabeceraTabla">Fecha Servicio</th>
														<th class="cabeceraTabla">Servicio - Descripción</th>
														<th class="cabeceraTabla">Proveedor</th>
														<th class="cabeceraTabla">Precio Unitario</th>
														<th class="cabeceraTabla">Total</th>
														<th class="cabeceraTabla">Opción</th>
													</tr>
												</thead>
												<tbody>
													<tr ng-repeat="item in listaDetalleServicio">
														<td class="dataTabla">{{item.cantidad}}</td>
														<td class="dataTabla">{{item.fechaServicio | date :
															'dd/MM/yyyy'}}</td>
														<td class="dataTablaCadena">{{item.descripcionServicio}}</td>
														<td class="dataTabla">{{item.servicioProveedor.proveedor.nombre}}</td>
														<td class="dataTablaNumero">{{item.monedaFacturacion.simboloMoneda}} {{item.precioUnitario |
															number : 2}}</td>
														<td class="dataTablaNumero">{{item.monedaFacturacion.simboloMoneda}} {{item.totalServicio |
															number : 2}}</td>
														<td class="dataTabla"><a href="#"
															ng-click="eliminarServicio(item.codigoEntero)"><i
																class="fa fa-trash-o" aria-hidden="true"></i></a> <a
															href="#" ng-click="consultaServicio(item.codigoEntero)"><i
																class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="form-group">
											<table style="width: 90%;" align="center">
												<tr>
													<td><strong>Total Comisión</strong></td>
													<td align="right"><strong>{{simboloMonedaFacturacion}}
															{{servicioVenta.totalComision | number:2}}</strong></td>
												</tr>
												<tr>
													<td><strong>Total Fee</strong></td>
													<td align="right"><strong>{{simboloMonedaFacturacion}}
															{{servicioVenta.totalFee | number:2}}</strong></td>
												</tr>
												<tr>
													<td><strong>Total Servicios</strong></td>
													<td align="right"><strong>{{simboloMonedaFacturacion}}
															{{servicioVenta.totalServicios | number:2}}</strong></td>
												</tr>
											</table>
										</div>
									</div>
								</div>
								<div class="panel-footer">
									<button class="btn btn-primary pull-right" data-toggle="modal"
										data-target="#modal_confirmacion">
										Grabar<span class="fa fa-floppy-o fa-right"></span>
									</button>
									<button class="btn btn-primary pull-right" onclick="location.href='/RHViajes2/paginas/negocio/servicios/adm.jsp'">
										Cancelar<span class="fa fa-times"></span>
									</button>
								</div>
								<button class="btn btn-success mb-control"
									data-box="#message-box-success" id="idbtnExito" type="button"
									style="display: none;">BotonExito</button>
								<button type="button" style="display: none;">BotonError</button>
							</div>
							<div class="modal" id="modal_confirmacion" tabindex="-1"
								role="dialog" aria-labelledby="defModalHead" aria-hidden="true">
								<div class="modal-dialog">
									<div class="modal-content">
										<div class="modal-header">
											<button type="button" class="close" data-dismiss="modal"
												id="btnCerrarModalConfirmacion">
												<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
											</button>
											<h4 class="modal-title" id="defModalHead">Confirmación</h4>
										</div>
										<div class="modal-body">¿Estas seguro de grabar?</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-default"
												ng-click="grabarVenta()">Si</button>
											<button type="button" class="btn btn-default"
												data-dismiss="modal">No</button>
										</div>
									</div>
								</div>
							</div>
							<div class="message-box message-box-success animated fadeIn"
								id="message-box-success">
								<div class="mb-container">
									<div class="mb-middle">
										<div class="mb-title">
											<span class="fa fa-check"></span> Exito
										</div>
										<div class="mb-content">
											<p>Se grabo venta satisfactoriamente</p>
										</div>
										<div class="mb-footer">
											<button ng-click="aceptarMensajeExito()"
												class="btn btn-default btn-lg pull-right mb-control-close">Aceptar</button>
										</div>
									</div>
								</div>
							</div>
							<div class="message-box message-box-danger animated fadeIn"
								data-sound="fail" id="message-box-sound-2">
								<div class="mb-container">
									<div class="mb-middle">
										<div class="mb-title">
											<span class="fa fa-times"></span> Error!
										</div>
										<div class="mb-content">
											<p>{{mensajeError}}</p>
										</div>
										<div class="mb-footer">
											<button
												class="btn btn-default btn-lg pull-right mb-control-close">Aceptar</button>
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
		src="/RHViajes2/recursos/js/angular-animate.min.js"></script>
	<script type="text/javascript"
		src="/RHViajes2/recursos/js/angular-sanitize.min.js"></script>
	<script src="/RHViajes2/recursos/js/ui-bootstrap-tpls-2.1.1.js"
		type="text/javascript"></script>
	<script type="text/javascript"
		src="/RHViajes2/paginas/negocio/servicios/js/controladorform.js"></script>
</body>
</html>