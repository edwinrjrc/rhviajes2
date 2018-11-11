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
			<div class="page-content-wrap" ng-controller="admclientectrl">
				<div class="row">
					<div class="col-md-12">
						<form class="form-horizontal">
							<div class="panel panel-default">
								<div class="panel-heading">
									<h5 class="panel-title">Administrar Clientes</h5>
								</div>
								<div class="panel-body">
									<div class="form-group">
										<label class="col-md-2 col-xs-12 control-label">Cliente</label>
										<div class="col-md-8 col-xs-12">
											<input type="text" class="form-control"
												ng-model="formularioBusqueda.nombreCliente">
										</div>
									</div>
									<div class="form-group">
										<label class="col-md-2 col-xs-12 control-label">Tipo
											Documento</label>
										<div class="col-md-3 col-xs-12">
											<select class="form-control"
												ng-model="formularioBusqueda.tipoDocumento">
												<option value="">-Seleccione-</option>
												<option ng-repeat="item in listaTipoDocumento"
													ng-value="item.codigoEntero">{{item.nombre}}</option>
											</select>
										</div>
										<label class="col-md-2 col-xs-12 control-label">Número
											Documento</label>
										<div class="col-md-3 col-xs-12">
											<input type="text" class="form-control"
												name="numeroDocumento"
												ng-model="formularioBusqueda.numeroDocumento">
										</div>
									</div>
									<div class="form-group">
										<div class="col-md-10 col-xs-12" align="center">
											<button class="btn btn-primary" ng-click="limpiarBusqueda()">Limpiar</button>
											<button class="btn btn-primary" ng-click="buscarClientes()">Buscar</button>
											<button class="btn btn-primary" ng-click="nuevoRegistroCliente()">Nuevo</button>
										</div>
									</div>
								</div>
								<div class="panel-body">
									<table class="table">
										<thead>
											<tr>
												<th style="width: 5%; text-align: center;"></th>
												<th style="width: 10%; text-align: center;">Documento</th>
												<th style="width: 30%; text-align: center;">Nombre</th>
												<th style="width: 40%; text-align: center;">Dirección</h>
												<th style="width: 10%; text-align: center;">Teléfono</th>
												<th style="width: 5%; text-align: center;"></th>
											</tr>
										</thead>
										<tbody>
											<tr ng-repeat="item in listaFiltrada">
												<td style="width: 5%; text-align: center;"></td>
												<td style="width: 10%; text-align: left;">{{item.documentoIdentidad.tipoDocumento.nombre}} - {{item.documentoIdentidad.numeroDocumento}}</td>
												<td style="width: 30%; text-align: left;">{{item.nombres}} {{item.apellidoPaterno}} {{item.apellidoMaterno}}</td>
												<td style="width: 40%; text-align: left;">{{item.direccion.direccion}}</td>
												<td style="width: 10%; text-align: center;">{{item.telefonoMovil.numeroTelefono}}</td>
												<td style="width: 5%; text-align: center;"></td>
												
											</tr>
										</tbody>
										<tfoot>
											<tr>
												<td colspan="7" align="center">
													<ul uib-pagination total-items="totalItems"
														ng-model="currentPage" max-size="maxSize"
														class="pagination-sm" boundary-links="true"
														ng-change="pageChanged()" items-per-page="itemsXpagina"
														first-text="Inicio" last-text="Fin" next-text="Siguiente"
														previous-text="anterior"></ul>
												</td>
											</tr>
										</tfoot>
									</table>
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
		type="text/javascript">
		
	</script>
	<script type="text/javascript"
		src="/RHViajes2/paginas/negocio/cliente/js/controlador.js"></script>
</body>
</html>