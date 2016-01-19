<!DOCTYPE html>
<html>
<head>
	<title>Teams</title>	
	<link rel="icon" type="image/png" href="css/logo5.png">
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	
	<link rel="stylesheet" href="css/normalize.css">
	
	<script type="text/javascript" src="/common2/lib/jQuery/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="/node_modules/q/q.js"></script>
	<script type="text/javascript" src="/ui/js/phlatSimple.js"></script>
	<script type="text/javascript" src="/ui/js/phlatDriver.js"></script>
	
	<script src="/common2/lib/foundation-5.3.3/js/foundation/foundation.js"></script>
	<script src="/common2/lib/foundation-5.3.3/js/foundation/foundation.reveal.js"></script>
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
		
	<?php include 'teamsTopDivs.php' ?>	
	
	<div id='mainWrapper'>	
		<div id='brandsWrapper' class="row"></div>
	</div>	
	
	<script src='js/searchMain.js'></script>
	<script src='js/searchBrands.js'></script>
	<script src='js/adminForms.js'></script>
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