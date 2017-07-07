<!DOCTYPE html>
<html ng-app="rhviajeslogin" lang="es">
<head>
<meta charset="UTF-8">
<title>RHViajes</title>
<script src="<%= request.getContextPath() %>/resources/js/jquery.min.js" type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/resources/js/angular.min.js" type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/resources/js/bootstrap.min.js" type="text/javascript"></script>
<script type="text/javascript" src="<%= request.getContextPath() %>/resources/js/loginapp.js">
</script>
<link href="<%= request.getContextPath() %>/resources/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
<style type="text/css">
.panel-heading {
	padding: 5px 15px;
}

.panel-footer {
	padding: 1px 15px;
	color: #A0A0A0;
}

.profile-img {
	margin: 0 auto 10px;
	display: block;
}

.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
       -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
          transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
</style>
</head>
<body>
	<div class="container" style="margin-top: 40px">
		<div class="row">
			<div class="col-sm-6 col-md-4 col-md-offset-4">
				<div class="panel panel-default">
					<div class="panel-heading">
						<strong>Iniciar Sesión</strong>
					</div>
					<div class="panel-body">
						<form role="form" action="j_security_check" method="POST">
							<fieldset>
								<div class="row">
									<div class="center-block">
										<img class="profile-img" src="<%= request.getContextPath() %>/resources/images/logosistema-01.jpg"/>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-12 col-md-10 col-md-offset-1">
										<div class="form-group">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-user"></i>
												</span> <input class="form-control" placeholder="Username"
													name="j_username" type="text" autofocus>
											</div>
										</div>
										<div class="form-group">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="glyphicon glyphicon-lock"></i>
												</span> <input class="form-control" placeholder="Password"
													name="j_password" type="password" value="">
											</div>
										</div>
										<div class="form-group">
											<input type="submit" class="btn btn-lg btn-primary btn-block"
												value="Sign in">
										</div>
									</div>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>