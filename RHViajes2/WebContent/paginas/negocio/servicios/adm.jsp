<!DOCTYPE html>
<html lang="es" ng-app="serviciosapp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="description" content="Sistema RHViajes version 2">
<meta name="author" content="rhsistemas">
<title>RHViajes 2</title>
<script type="text/javascript"
	src="../../../resources/js/angular.min.js"></script>
<script type="text/javascript"
	src="../../../resources/js/angular-sanitize.min.js"></script>
<script type="text/javascript"
	src="../../../resources/js/angular-animate.min.js"></script>
<script type="text/javascript" src="js/controlador.js"></script>
<style type="text/css">
.cabeceraTabla {
	font-family: sans-serif;
	font-size: 10pt;
	font-weight: bold;
	text-align: center;
	background-color: #E3DFDE;
	border-color: gray;
	border-width: 1px;
}

.dataTabla {
	font-family: sans-serif;
	font-size: 9pt;
	text-align: center;
}

.campoFormulario {
	font-family: sans-serif;
	font-size: 9pt;
	font-weight: bold;
	text-align: center;
}
.datoCampoForm{
	font-family: sans-serif;
	font-size: 9pt;
}
.subtitulo{
 font-family: sans-serif;
}
</style>
</head>
<body>
	<div id="wrapper">
		<div>
			<table>
				<tr>
					<td><a
						href="<%=request.getContextPath()%>/paginas/negocio/servicios/adm.jsp">Registrar
							Venta</a></td>
				</tr>
			</table>
		</div>
		<div id="page-wrapper" ng-controller="serviciosventaCtrl">
			<h3 class="subtitulo">Administrar Registro de Venta</h3>
			<table style="margin: 0px; width: 100%; border-spacing: 0px;"
				border="0">
				<tr style="margin: 0px;">
					<td style="width: 20%"><span class="campoFormulario">Id
							Venta</span></td>
					<td style="width: 80%"><input type="number" name="idVenta"
						ng-model="formularioBusqueda.idVenta"></td>
				</tr>
				<tr style="margin: 0px;">
					<td style="width: 20%"><span class="campoFormulario">Cliente</span></td>
					<td style="width: 80%"><input type="text" name="nomcliente"
						ng-model="formularioBusqueda.nomCliente" style="width: 100%;"></td>
				</tr>
				<tr style="margin: 0px;">
					<td colspan="2"><table
							style="margin: 0px; width: 100%; border-spacing: 0px;" border="0">
							<tr>
								<td style="width: 20%"><span class="campoFormulario">Tipo
										Documento</span></td>
								<td style="width: 30%"><select class="datoCampoForm"
									ng-model="formularioBusqueda.tipoDocumento"><option
											ng-repeat="item in listaTipoDocumento" ng-value="item.codigoEntero">{{item.nombre}}</option></select></td>
								<td style="width: 20%"><span class="campoFormulario">Número
										Documento</span></td>
								<td style="width: 30%"><input type="text" class="datoCampoForm"
									name="numeroDocumento"
									ng-model="formularioBusqueda.numeroDocumento"></td>
							</tr>
						</table></td>
				</tr>
				<tr style="margin: 0px;">
					<td colspan="2">
						<table style="margin: 0px; width: 100%; border-spacing: 0px;"
							border="0">
							<tr>
								<td style="width: 20%"><span class="campoFormulario">Fecha
										Desde</span></td>
								<td style="width: 30%"><input type="date" name="fechadesde"
									ng-model="formularioBusqueda.fechaDesde" class="datoCampoForm"></td>
								<td style="width: 20%"><span class="campoFormulario">Fecha
										Hasta</span></td>
								<td style="width: 30%"><input type="date" name="fechahasta"
									ng-model="formularioBusqueda.fechaHasta" class="datoCampoForm"></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td colspan="2" align="center"><button>Limpiar
							Busqueda</button>
						<button ng-click="buscarVentas()">Buscar</button>
						<button onclick="location.href='formulario.jsp'">Registrar
							Venta</button></td>
				</tr>
			</table>
			<table style="margin: 0px; width: 100%;" border="0">
				<thead>
					<tr>
						<td class="cabeceraTabla">Id</td>
						<td class="cabeceraTabla">Cliente</td>
						<td class="cabeceraTabla">Fecha Compra</td>
						<td class="cabeceraTabla">Monto Compra</td>
						<td class="cabeceraTabla">Estado Pago</td>
						<td class="cabeceraTabla">Estado Servicio</td>
						<td class="cabeceraTabla">Opciones</td>
					</tr>
				</thead>
				<tbody>
					<tr ng-repeat="detalle in listaFiltrada">
						<td class="dataTabla">{{detalle.codigoEntero}}</td>
						<td class="dataTabla">{{detalle.cliente.nombres}}</td>
						<td class="dataTabla">{{detalle.fechaServicio}}</td>
						<td class="dataTabla">{{detalle.montoTotalServicios}}</td>
						<td class="dataTabla">{{detalle.estadoPago.nombre}}</td>
						<td class="dataTabla">{{detalle.estadoServicio.nombre}}</td>
						<td class="dataTabla">Opciones</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td colspan="7" align="center">
							<table>
								<tr>
									<td><a href="#" ng-click="principio(currentPage)"><<</a></td>
									<td><a href="#" ng-click="anterior(currentPage)"><</a></td>
									<td>Pagina Actual : {{currentPage}}</td>
									<td><a href="#" ng-click="siguiente(currentPage)">></a></td>
									<td><a href="#" ng-click="final(currentPage)">>></a></td>
								</tr>
							</table>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
</body>
</html>