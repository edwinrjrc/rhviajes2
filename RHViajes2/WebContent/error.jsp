<!DOCTYPE html>
<html lang="en" class="body-full-height" ng-app="rhviajeslogin">
<head>
<!-- META SECTION -->
<title>RHViajes 2</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="icon" href="favicon.ico" type="image/x-icon" />
<!-- END META SECTION -->
<!-- CSS INCLUDE -->
<link rel="stylesheet" type="text/css" id="theme" href="/RHViajes2/recursos/css/theme-white.css" />
<!-- EOF CSS INCLUDE -->
<script src="/RHViajes2/recursos/js/angular.min.js" type="text/javascript"></script>
<script src="/RHViajes2/recursos/js/loginapp.js" type="text/javascript"></script>
</head>
<body>
	<div class="login-container">
		<div class="login-box animated fadeInDown">
			<div class="login-logo"></div>
			<div class="login-body">
				<div class="login-title">
					<strong>Bienvenido</strong>, Inicie aqui
				</div>
				<form action="j_security_check" class="form-horizontal" method="post">
					<div class="form-group">
						<div class="col-md-12">
							<input type="text" class="form-control" placeholder="Username" name="j_username" />
						</div>
					</div>
					<div class="form-group">
						<div class="col-md-12">
							<input type="password" class="form-control"
								placeholder="Password" name="j_password"/>
						</div>
					</div>
					<div class="form-group">
						<div class="col-md-6">
						</div>
						<div class="col-md-6">
							<button class="btn btn-info btn-block">Ingresar</button>
						</div>
					</div>
					<span style="color: red;">Error en el proceso de autenticacion, vuelva a intentar</span>
				</form>
			</div>
			<div class="login-footer">
				<div class="pull-left">&copy; RhViajes 2</div>
				<div class="pull-right">
					Gerencia de Sistemas - RH Sistemas
				</div>
			</div>
		</div>
	</div>
</body>
</html>