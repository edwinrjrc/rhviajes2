<!DOCTYPE html>
<html ng-app="serviciosformapp" lang="es">
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
<link
	href="<%=request.getContextPath()%>/resources/css/jquery-ui.min.css"
	rel="stylesheet" type="text/css" />
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

div.tab {
	overflow: hidden;
	border: 1px solid #ccc;
	background-color: #f1f1f1;
}

/* Style the buttons inside the tab */
div.tab button {
	background-color: inherit;
	float: left;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 5px 20px;
	transition: 0.3s;
}

/* Change background color of buttons on hover */
div.tab button:hover {
	background-color: #ddd;
}

/* Create an active/current tablink class */
div.tab button.active {
	background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
	display: none;
	padding: 6px 12px;
	border: 1px solid #ccc;
	border-top: none;
}

.campoFormulario {
	font-family: sans-serif;
	font-size: 8pt;
	font-weight: bold;
	text-align: center;
}

.dataFormulario {
	font-family: sans-serif;
	font-size: 8pt;
	height: 15px;
}

.dataTabla {
	font-family: sans-serif;
	font-size: 9pt;
	text-align: center;
}
/* The Modal (background) */
.modal {
	display: none; /* Hidden by default */
	position: fixed; /* Stay in place */
	z-index: 1; /* Sit on top */
	padding-top: 100px; /* Location of the box */
	left: 0;
	top: 0;
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	overflow: scroll; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
	background-color: #fefefe;
	margin: auto;
	padding: 20px;
	border: 1px solid #888;
	width: 90%;
	height: 400px;
	overflow-y: auto;
}

/* The Close Button */
.close {
	color: #aaaaaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
}

.close:hover, .close:focus {
	color: #000;
	text-decoration: none;
	cursor: pointer;
}

button {
	background: #3498db;
	background-image: -webkit-linear-gradient(top, #3498db, #174663);
	background-image: -moz-linear-gradient(top, #3498db, #174663);
	background-image: -ms-linear-gradient(top, #3498db, #174663);
	background-image: -o-linear-gradient(top, #3498db, #174663);
	background-image: linear-gradient(to bottom, #3498db, #174663);
	-webkit-border-radius: 4;
	-moz-border-radius: 4;
	border-radius: 4px;
	-webkit-box-shadow: 0px 1px 2px #666666;
	-moz-box-shadow: 0px 1px 2px #666666;
	box-shadow: 0px 1px 2px #666666;
	font-family: Arial;
	color: #ffffff;
	font-size: 11px;
	padding: 8px 20px 9px 20px;
	text-decoration: none;
}

button:hover {
	background: #3cb0fd;
	background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
	background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
	background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
	background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
	background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
	text-decoration: none;
}

button :active {
	position: relative;
	top: 1px;
}

.error {
	font-family: sans-serif;
	font-size: 9pt;
	font-weight: bold;
	text-indent: 10px;
	color: #8f0404;
	border-radius: 4px 4px 4px 4px;
	-moz-border-radius: 4px 4px 4px 4px;
	-webkit-border-radius: 4px 4px 4px 4px;
	background-color: #ffadad;
	border: 1px solid #8f0404;
	width: 100%;
	height: 30px;
}

.subtitulo {
	font-family: sans-serif;
}
</style>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/angular.min.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/paginas/negocio/servicios/js/controladorform.js"></script>
<script type="text/javascript">
	function openCity(evt, cityName) {
		// Declare all variables
		var i, tabcontent, tablinks;

		// Get all elements with class="tabcontent" and hide them
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}

		// Get all elements with class="tablinks" and remove the class "active"
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className
					.replace(" active", "");
		}

		// Show the current tab, and add an "active" class to the button that opened the tab
		document.getElementById(cityName).style.display = "block";
		evt.currentTarget.className += " active";
	}
</script>
</head>
<body>
	<div ng-controller="formctrl">
		<div>
			<table>
				<tr>
					<td><a
						href="<%=request.getContextPath()%>/paginas/negocio/servicios/adm.jsp">Registrar
							Venta</a></td>
				</tr>
			</table>
		</div>
		<div>
			<h3 class="subtitulo">Registrar Venta</h3>
			<div class="tab">
				<button class="tablinks" onclick="openCity(event, 'informacion')">Información
					Venta</button>
				<button class="tablinks" onclick="openCity(event, 'servicios')">Servicios</button>
			</div>
			<div id="informacion" class="tabcontent">
				<table
					style="margin: 0px; border-width: 0px; padding: 0px; width: 100%; border-spacing: 0px;"
					border="0">
					<tr>
						<td style="width: 20%"><span class="campoFormulario">Cliente</span></td>
						<td style="width: 80%"><input type="text" style="width: 90%;"></td>
					</tr>
					<tr>
						<td style="width: 20%"><span class="campoFormulario">Fecha
								Servicio</span></td>
						<td style="width: 80%"><input type="date"></td>
					</tr>
					<tr
						style="margin: 0px; border-width: 0px; padding: 0px; border-spacing: 0px;">
						<td colspan="2"
							style="margin: 0px; border-width: 0px; padding: 0px; border-spacing: 0px;"><table
								style="margin: 0px; width: 100%; border-width: 0px; padding: 0px; border-spacing: 0px;"
								border="0">
								<tr>
									<td style="width: 20%"><span class="campoFormulario">Agente
											Viajes</span></td>
									<td style="width: 30%"><select><option>-Seleccione
												el agente-</option></select></td>
									<td style="width: 20%"><span class="campoFormulario">Moneda
											Facturación</span></td>
									<td style="width: 30%"><select><option>-Seleccione-</option></select></td>
								</tr>
							</table></td>
					</tr>
				</table>
			</div>

			<div id="servicios" class="tabcontent">
				<span class="campoFormulario">Datos Servicio</span>
				<hr>
				<table
					style="margin: 0px; border-width: 0px; padding: 0px; width: 100%; border-spacing: 0px;">
					<tr>
						<td style="width: 15%"><span class="campoFormulario">Tipo
								Servicio</span></td>
						<td style="width: 35%"><select class="dataFormulario"
							ng-model="detalleServicio.tipoServicio"
							ng-change="consultarConfiguracionServicio()">
								<option ng-repeat="item in listaMaestroServicio"
									ng-value="item.codigoEntero">{{item.nombre}}</option>
						</select></td>
						<td style="width: 15%"><span class="campoFormulario"
							ng-show="configuracionServicio.muestraProveedor">Empresa
								Proveedor</span></td>
						<td style="width: 35%"><select class="dataFormulario"
							ng-show="configuracionServicio.muestraProveedor"
							ng-model="detalleServicio.idProveedor">
								<option>-Seleccione-</option>
								<option ng-repeat="item in listaProveedores"
									ng-value="item.codigoEntero">{{item.nombreProveedor}}</option>
						</select></td>
					</tr>
					<tr>
						<td style="width: 15%"><span class="campoFormulario"
							ng-show="configuracionServicio.muestraRuta"><a href="#"
								onclick="modalShow()">Ruta</a></span></td>
						<td colspan="3" style="width: 85%"><span
							ng-show="configuracionServicio.muestraRuta"></span></td>
					</tr>
					<tr>
						<td style="width: 15%"><span class="campoFormulario"
							ng-show="configuracionServicio.muestraPasajeros"><a
								href="#">Pasajeros</a></span></td>
						<td colspan="3" style="width: 85%"><span
							ng-show="configuracionServicio.muestraPasajeros"></span></td>
					</tr>
					<tr>
						<td style="width: 15%"><span class="campoFormulario"
							ng-show="configuracionServicio.muestraHotel">Hotel</span></td>
						<td style="width: 35%"><select class="dataFormulario"
							ng-model="detalleServicio.idHotel"
							ng-show="configuracionServicio.muestraHotel"><option>-Seleccione-</option>
								<option ng-repeat="item in listaHoteles"
									ng-value="item.codigoEntero">{{item.nombreComercial}}</option></select></td>
						<td style="width: 15%"><span class="campoFormulario"
							ng-show="configuracionServicio.muestraOperadora">Operador</span></td>
						<td style="width: 35%"><select class="dataFormulario"
							ng-model="detalleServicio.idOperador"
							ng-show="configuracionServicio.muestraOperadora"><option>-Seleccione-</option>
								<option ng-repeat="item in listaOperadores"
									ng-value="item.codigoEntero">{{item.nombreComercial}}</option></select></td>
					</tr>
					<tr>
						<td style="width: 15%"><span class="campoFormulario"
							ng-show="configuracionServicio.muestraDescServicio">Descripción
								Servicio</span></td>
						<td colspan="3"><textarea class="dataFormulario" rows="10"
								cols="80" style="height: 50px; width: 600px;"
								ng-model="detalleServicio.descripcionServicio"
								ng-show="configuracionServicio.muestraDescServicio"></textarea></td>
					</tr>
					<tr>
						<td style="width: 15%"><span class="campoFormulario"
							ng-model="detalleServicio.cantidad"
							ng-show="configuracionServicio.muestraCantidad">Cantidad</span></td>
						<td style="width: 35%"><input
							style="width: 50px; text-align: right;" class="dataFormulario"
							type="number" ng-model="detalleServicio.cantidad"
							ng-show="configuracionServicio.muestraCantidad"></td>
						<td style="width: 15%"><span class="campoFormulario"
							ng-show="configuracionServicio.muestraPrecioBase">Precio
								Base</span></td>
						<td style="width: 35%"><input
							ng-model="detalleServicio.precioBase"
							style="width: 150px; text-align: right;" class="dataFormulario"
							type="number" ng-show="configuracionServicio.muestraPrecioBase"><select
							ng-show="configuracionServicio.muestraPrecioBase"
							class="dataFormulario"><option
									ng-repeat="item in listaMonedas" ng-value="item.codigoEntero">{{item.nombre}}</option></select></td>
					</tr>
					<tr>
						<td><span class="campoFormulario">Aplica IGV</span></td>
						<td><input type="checkbox" ng-model="detalle" 
							ng-model="detalleServicio.aplicaIgv"></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td colspan="4"><span class="campoFormulario">Datos
								Comisión Servicio</span>
							<hr></td>
					</tr>
					<tr>
						<td><span class="campoFormulario">Tipo Valor Comisión</span></td>
						<td><select class="dataFormulario"><option>-Seleccione-</option>
								<option value="1">Porcentaje (%)</option>
								<option value="2">Monto Fijo</option></select></td>
						<td><span class="campoFormulario">Valor Comisión</span></td>
						<td><input class="dataFormulario" type="number"></td>
					</tr>
					<tr>
						<td><span class="campoFormulario">Aplicar IGV</span></td>
						<td><input type="checkbox"></td>
						<td><span class="campoFormulario">Tarifa Negociada</span></td>
						<td><input type="checkbox"></td>
					</tr>
					<tr>
						<td colspan="4" align="center"><button>Agregar</button></td>
					</tr>
					<tr>
						<td colspan="4"><br> <br> <span
							class="campoFormulario">Servicios Agregados</span>
							<hr>
							<table style="width: 90%;" align="center">
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
									<tr>
										<td class="dataTabla">1</td>
										<td class="dataTabla">23/05/2017</td>
										<td class="dataTabla">BOLETO AEREO -
											LIMA>MIAMI/MIAMI>LIMA</td>
										<td class="dataTabla">COSTAMAR</td>
										<td class="dataTabla">1,022.02</td>
										<td class="dataTabla">1,022.02</td>
										<td class="dataTabla"><a href="#"><span>(-)</span></a></td>
									</tr>
								</tbody>
							</table></td>
					</tr>
				</table>
			</div>
		</div>
		<div align="center">
			<br>
			<button>Grabar</button>
		</div>
	</div>

	<!-- The Modal -->
	<div id="modalRuta" class="modal" ng-controller="formmodalrutactrl">
		<!-- Modal content -->
		<div class="modal-content">
			<div class="error" ng-show="mostrarError">
				<span>{{error}}</span>
			</div>
			<span class="campoFormulario">Detalle Ruta Servicio</span>
			<hr>
			<table
				style="margin: 0px; border-width: 0px; padding: 0px; width: 100%; border-spacing: 0px;">
				<thead>
					<tr>
						<td colspan="7"><button ng-click="agregarTramo()">Agregar
								Tramo</button>
							<button ng-click="agregarTramoRegreso()">Agregar Tramo
								Regreso</button></td>
					</tr>
					<tr>
						<td class="cabeceraTabla">Origen</td>
						<td class="cabeceraTabla">Fecha Salida</td>
						<td class="cabeceraTabla">Destino</td>
						<td class="cabeceraTabla">Fecha Llegada</td>
						<td class="cabeceraTabla">Precio Tramo</td>
						<td class="cabeceraTabla">Aerolinea</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					<tr ng-repeat="tramo in listaTramos">
						<td><select ng-model='tramo.origen' class="dataFormulario">
								<option>-Seleccione-</option>
								<option ng-repeat="item in listaDestinos"
									ng-value="item.codigoEntero">{{item.descripcion}}({{item.codigoIATA}})
								</option>
						</select></td>
						<td><input type="datetime-local" class="dataFormulario"
							ng-model="tramo.fechaSalida"></td>
						<td><select ng-model='tramo.destino' class="dataFormulario">
								<option ng-repeat="item in listaDestinos"
									ng-value="item.codigoEntero">{{item.descripcion}}({{item.codigoIATA}})</option>
						</select></td>
						<td><input type="datetime-local" class="dataFormulario"
							ng-model="tramo.fechaLlegada"></td>
						<td><input type="number" class="dataFormulario"
							ng-model="tramo.precioTramo" value="0" size="20"></td>
						<td><select class="dataFormulario"
							ng-model="tramo.codigoAerolinea"><option>-Seleccione-</option>
								<option ng-repeat="item in listaAerolineas"
									ng-value="item.codigoEntero">{{item.nombreComercial}}</option></select></td>
						<td><button ng-click="eliminarTramo(tramo.id)">-</button></td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td colspan="7" align="center"><button
								ng-click="aceptarRuta()">Aceptar</button>
							<button ng-click="modalclose()">Cerrar</button></td>
					</tr>
				</tfoot>
			</table>
		</div>

	</div>

	<!-- The Modal -->
	<div id="modalPasajeros" class="modal">

		<!-- Modal content -->
		<div class="modal-content" style="height: 600px;">
			<span class="campoFormulario">Detalle Pasajeros</span>
			<hr>
			<table
				style="margin: 0px; border-width: 0px; padding: 0px; width: 100%; border-spacing: 0px;">
				<tr>
					<td><span class="campoFormulario">Tipo Documento</span></td>
					<td><select><option>-Seleccione-</select></td>
					<td><span class="campoFormulario">Número Documento</span></td>
					<td><input type="text"></td>
				</tr>
				<tr>
					<td><span class="campoFormulario">Nombres</span></td>
					<td><input type="text"></td>
					<td><span class="campoFormulario">Nacionalidad</span></td>
					<td><select><option>-Seleccione-</select></td>
				</tr>
				<tr>
					<td><span class="campoFormulario">Apellido Paterno</span></td>
					<td><input type="text"></td>
					<td><span class="campoFormulario">Apellido Materno</span></td>
					<td><input type="text"></td>
				</tr>
				<tr>
					<td><span class="campoFormulario">Apellido Paterno</span></td>
					<td><input type="text"></td>
					<td><span class="campoFormulario">Apellido Materno</span></td>
					<td><input type="text"></td>
				</tr>
				<tr>
					<td><span class="campoFormulario">Teléfono 1</span></td>
					<td><input type="tel"></td>
					<td><span class="campoFormulario">Teléfono 2</span></td>
					<td><input type="tel"></td>
				</tr>
				<tr>
					<td><span class="campoFormulario">Correo Electrónico</span></td>
					<td><input type="email"></td>
					<td><span class="campoFormulario">Relación</span></td>
					<td><select><option>-Seleccione-</select></td>
				</tr>
				<tr>
					<td><span class="campoFormulario">Número pasajero
							frecuente</span></td>
					<td><input type="text"></td>
					<td><span class="campoFormulario">Aerolinea</span></td>
					<td><select><option>-Seleccione-</select></td>
				</tr>
				<tr>
					<td><span class="campoFormulario">Fecha Vcto Pasaporte</span></td>
					<td><input type="date"></td>
					<td><span class="campoFormulario">Fecha Nacimiento</span></td>
					<td><input type="date"></td>
				</tr>
				<tr>
					<td><span class="campoFormulario">Código Reserva</span></td>
					<td><input type="text"></td>
					<td><span class="campoFormulario">Número Boleto</span></td>
					<td><input type="text"></td>
				</tr>
			</table>
			<table
				style="margin: 0px; border-width: 0px; padding: 0px; width: 100%; border-spacing: 0px;">
				<tr>
					<td><button>Agregar</button></td>
				</tr>
			</table>
			<table
				style="margin: 0px; border-width: 0px; padding: 0px; width: 100%; border-spacing: 0px;">
				<thead>
					<tr>
						<td><span class="campoFormulario">Nombres</span></td>
						<td><span class="campoFormulario">Apellido Paterno</span></td>
						<td><span class="campoFormulario">Apellido Materno</span></td>
						<td><span class="campoFormulario">Correo Electrónico</span></td>
						<td><span class="campoFormulario">Telefono 1</span></td>
						<td><span class="campoFormulario">Telefono 2</span></td>
						<td><span class="campoFormulario">Relación</span></td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td colspan="8"><button>Aceptar</button></td>
					</tr>
				</tfoot>
			</table>
		</div>

	</div>
</body>
</html>