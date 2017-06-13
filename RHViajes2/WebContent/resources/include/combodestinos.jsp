<!DOCTYPE html>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/angular.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/combodestinos.js"></script>
<div ng-app=myApp ng-controller=myController>
	<input type="text" keyboard-poster post-function="searchFlight"
		name="first_name" placeholder="Hyderabad, India" list="_countries"
		style='margin-bottom: 100px'>
	<datalist id="_countries">
		<select style="display: none;" id="_select" name="_select"
			ng-model='selectedCountry' ng-options='k as v for (k,v) in countries'></select>
	</datalist>
</div>
