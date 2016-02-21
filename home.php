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
	
  	<link rel="stylesheet" href="/ui/bower_components/foundation/css/foundation.css">
	<link rel="stylesheet" href="/ui/bower_components/foundation-icon-fonts/foundation-icons.css">
		
	<link rel="stylesheet" href="/ui/css/admin.css">
	<link rel="stylesheet" href="/ui/css/home.css">
	<style>
		#mainWrapper {
			margin-bottom:2rem;
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

		#helpMenu.open {
		   
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
	<div id='helpPrompt' data-dropdown='helpMenu' data-options='is_hover:true; hover_timeout: 5000'>Help/FAQ</div>	
	<ul id='helpMenu' class='f-dropdown alignRight' data-dropdown-content>
		<li><a href='/ui/home-faq'>FAQ</a></li>
		<li>Tutorial (work in progress)</li>
		<li><a href='https://github.com/siosonel/tatag-ui/issues'>Feature Requests, Bugs</a></li>
		<li><a href='https://tatag.cc/api/ref/docs.html'>API Documentation</a></li>
		<li><a href='https://github.com/siosonel/tatag-api/'>API source code</a></li>
		<li><a href='https://github.com/siosonel/tatag-ui/'>Wallet source code</a></li>
	</ul> 
	
	<div id='viewTypeDiv' class='row'>
		<button id='aboutViewPrompt' class='small-4 tiny'>About</button>
		<button id='promosViewPrompt' class='small-4 tiny'>Promos</button>
		<!--<button id='ratingsViewPrompt' class='small-3 tiny'>Ratings</button>-->
		<button id='vizViewPrompt' class='small-4 tiny'>Viz</button>
	</div>

	<script src="/ui/bower_components/jquery/dist/jquery.min.js"></script>
	<script src="/ui/bower_components/q/q.js"></script>
	<script src="/ui/bower_components/foundation/js/foundation.min.js"></script>
	<script src="/ui/bower_components/foundation/js/foundation/foundation.reveal.js"></script>
	<script src="/ui/bower_components/foundation/js/foundation/foundation.accordion.js"></script>
	<script src="/ui/bower_components/foundation/js/foundation/foundation.dropdown.js"></script>
	
	<script src="/ui/js/phlatSimple.js"></script>
	<script src="/ui/js/phlatDriver.js"></script>

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
	
	<?php include "me.php" ?>
</body>
</html>