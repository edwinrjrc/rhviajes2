<!DOCTYPE html>
<html lang="es" ng-app="prohibidoapp">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Sistema RHViajes version 2">
<meta name="author" content="rhsistemas">
<title>RHViajes</title>
<link
	href="<%=request.getContextPath()%>/resources/css/bootstrap.min.css"
	rel="stylesheet" type="text/css" />
<link
	href="<%=request.getContextPath()%>/resources/css/metisMenu.min.css"
	rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/timeline.css"
	rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/sb-admin-2.css"
	rel="stylesheet" type="text/css" />
<link
	href="<%=request.getContextPath()%>/resources/css/font-awesome.min.css"
	rel="stylesheet" type="text/css" />
<script src="<%=request.getContextPath()%>/resources/js/jquery.min.js"
	type="text/javascript"></script>
<script
	src="<%=request.getContextPath()%>/resources/js/bootstrap.min.js"
	type="text/javascript"></script>
<script
	src="<%=request.getContextPath()%>/resources/js/metisMenu.min.js"
	type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/raphael-min.js"
	type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/morris.min.js"
	type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/angular.min.js"
	type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/paginas/js/inicioapp.js"
	type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/menu.js"
	type="text/javascript"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/angular-route.min.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/angular-animate.min.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/ui-bootstrap-tpls-2.1.1.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/angular-sanitize.min.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/validator.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/paginas/prohibido/js/controlador.js"></script>
</head>
<body>
	<div id="wrapper">
		<menu-sistema></menu-sistema>

		<div id="page-wrapper">
			<div class="row">
				<div class="col-lg-12">
					<h3 class="page-header">
						<i class="fa fa-lock" aria-hidden="true"></i>&nbsp;Prohibido
					</h3>
				</div>
				<!-- /.col-lg-12 -->
			</div>
			<div class="row">
				<div class="col-lg-6">Lo sentimos no tiene permiso para
					acceder a esta opción</div>
				<div class="col-lg-6"><img src="<%=request.getContextPath()%>/resources/img/seguridad-informatica.png"/></div>
			</div>
		</div>
	</div>
</body>
</html>