<!DOCTYPE html>
<html>
<head>
	<title>Teams</title>	
	<link rel="icon" type="image/png" href="css/logo5.png">
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	
	<link rel="stylesheet" href="css/normalize.css">
  	<link rel="stylesheet" href="/common2/lib/foundation-5.3.3/css/foundation.min.css">
	<link rel="stylesheet" href="/common2/lib/foundation-5.3.3/icons/foundation-icons.css">
	
	<link rel="stylesheet" href="css/admin.css">
	
	<style>
		.brandItem {
			text-align: left;
		}
	</style>
</head>
<body>
	<div id='login_provider'></div>

	<script src="/ui/bower_components/jquery/dist/jquery.min.js"></script>
	<?php include 'teamsTopDivs.php' ?>	
	
	<div id='mainWrapper'>	
		<div id='brandsWrapper' class="row"></div>
	</div>	


	<script src="/ui/bower_components/jquery/dist/jquery.min.js"></script>
	<script src="/ui/bower_components/q/q.js"></script>
	
	<script src="/ui/bower_components/foundation/js/foundation.min.js"></script>
	<script src="/ui/bower_components/foundation/js/foundation/foundation.reveal.js"></script>
	<script src="/ui/bower_components/foundation/js/foundation/foundation.dropdown.js"></script>

	<script src="/ui/js/phlatSimple.js"></script>
	<script src="/ui/js/phlatDriver.js"></script>

	<script src='/ui/js/searchMain.js'></script>
	<script src='/ui/js/searchBrands.js'></script>
	<script src='/ui/js/adminForms.js'></script>
	<script>
		var types = <?php echo file_get_contents(TATAG_DOMAIN ."/ref/brand_classification.json"); ?>;
		var locs = <?php echo file_get_contents(TATAG_DOMAIN ."/ref/countries.json"); ?>;
		var byIso3 = {};
		locs.map(function (d) {byIso3[d[3]]=d;});
		
		var app = searchMain(<?php echo '{"userid":"'.$_SESSION['TOKEN_ID'].'","pass":"'.$_SESSION['TOKEN_VAL'].'", "baseURL": "'. TATAG_DOMAIN .'"}'; ?>);		
	</script>
	
	<?php include "me.php" ?>
</body>
</html>