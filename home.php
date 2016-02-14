<?php 
$protocol = (isset($_SERVER['HTTPS']) AND $_SERVER['HTTPS']) ? 'https' : 'http';
$ProtDomain = $protocol ."://". $_SERVER['SERVER_NAME'];

?><!DOCTYPE html>
<html>
<head>
	<title>Home</title>	
	<link rel="icon" type="image/png" href="css/logo5.png">
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	
	<link rel="stylesheet" href="/ui/css/normalize.css">
	
	<script type="text/javascript" src="/common2/lib/jQuery/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="/node_modules/q/q.js"></script>
	<script type="text/javascript" src="/ui/js/phlatSimple.js"></script>
	<script type="text/javascript" src="/ui/js/phlatDriver.js"></script>
	
  	<link rel="stylesheet" href="/common2/lib/foundation-5.3.3/css/foundation.min.css">
	<link rel="stylesheet" href="/common2/lib/foundation-5.3.3/icons/foundation-icons.css">
	
  <!--<link rel="stylesheet" type="text/css" href="/common2/lib/slick/slick.css"/>
  <link rel="stylesheet" type="text/css" href="/common2/lib/slick/slick-theme.css"/>
	<script type="text/javascript" src="/common2/lib/slick/slick.min.js"></script>-->
		
	<link rel="stylesheet" href="/ui/css/admin.css">
	<link rel="stylesheet" href="/ui/css/home.css">
	<style>
		#mainWrapper {
			overflow: hidden;
		}

		#rateImgDiv {
			min-height: 391px;
		}

		#compareDiv .row {
			margin-bottom: 1rem;
		}

		#compareDiv .small-6 {
			padding-left: 2rem;
			padding-right: 2rem;
		}
	</style>
</head>
<body>
	<div id='login_provider'></div>
	<div class='row'>
		<div class='small-12' id='titleBar'>
			<span class='fi-refresh'>&nbsp;</span><a href="/ui/home" style="color: #000;">Home</a> |
			<a href="/ui/wallet">Wallet</a> |
			<a href="/ui/my-teams">Teams</a>
		</div>
	</div>
	
	<div id='viewTypeDiv' class='row'>
		<button id='aboutViewPrompt' class='small-4 tiny'>About</button>
		<button id='promosViewPrompt' class='small-4 tiny'>Promos</button>
		<!--<button id='ratingsViewPrompt' class='small-3 tiny'>Ratings</button>-->
		<button id='vizViewPrompt' class='small-4 tiny'>Viz</button>
	</div>

	<div id='mainWrapper'>
		<?php
			$handler = str_replace("/", "", $_GET['_url']);
			if ($handler=='home' AND $_SESSION['TOKEN_ID']) $handler = "home-promos";
			if (!$handler OR $handler=='home' OR !file_exists("$handler.php")) $handler = "home-about";

			include "$handler.php"; 
		?>
	</div>	
	
	<script>
		var app = homeMain(<?php echo '{'
			.'"userid":"'.$_SESSION['TOKEN_ID'].'",'
			.'"pass":"'.$_SESSION['TOKEN_VAL'].'",'
			.'"baseURL": "'. TATAG_DOMAIN .'"'
		.'}'; ?>);
	</script>
	
	<script>
	</script>
	
	<?php include "me.php" ?>
</body>
</html>