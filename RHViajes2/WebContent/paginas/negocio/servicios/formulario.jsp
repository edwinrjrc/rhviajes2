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
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
	background-color: #fefefe;
	margin: auto;
	padding: 20px;
	border: 1px solid #888;
	width: 80%;
	height: 200px;
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


</style>
<script src='https://ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular.min.js'></script>
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
			<h3>Registrar Venta</h3>
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
						<td><span class="campoFormulario">Tipo Servicio</span></td>
						<td><select><option>-Seleccione-</option></select></td>
						<td><span class="campoFormulario">Empresa Proveedor</span></td>
						<td><select><option>-Seleccione-</option></select></td>
					</tr>
					<tr>
						<td><span class="campoFormulario"><a href="#"
								onclick="modalShow()">Ruta</a></span></td>
						<td colspan="3"></td>
					</tr>
					<tr>
						<td><span class="campoFormulario"><a href="#">Pasajeros</a></span></td>
						<td colspan="3"></td>
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
						<td><input type="text" keyboard-poster
							post-function="searchFlight" name="origen" class="dataFormulario"
							placeholder="Origen" list="_countries" ng-model="tramo.origen"> <datalist id="_countries">
								<select style="display: none;" id="_select" name="_select"
									ng-model='tramo.origen2' 
									ng-options='k as v for (k,v) in countries'></select>
							</datalist></td>
						<td><input type="datetime-local" class="dataFormulario"
							ng-model="tramo.fechaSalida"></td>
						<td><input type="text" keyboard-poster
							post-function="searchFlight" name="destino" class="dataFormulario"
							placeholder="Destino" list="_countries2" ng-model="tramo.destino"> <datalist id="_countries2">
								<select style="display: none;" id="_select2" name="_select2"
									ng-model='tramo.destino2' 
									ng-options='k as v for (k,v) in countries'></select>
							</datalist></td>
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
						<td colspan="7" align="center"><button>Aceptar</button>
							<button ng-click="modalclose()">Cerrar</button></td>
					</tr>
				</tfoot>
			</table>
		</div>

	</div>

	<!-- The Modal -->
	<div id="modalPasajeros" class="modal">

		<!-- Modal content -->
		<div class="modal-content">
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