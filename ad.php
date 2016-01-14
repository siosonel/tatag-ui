<?php
require_once "config.php";
require_once("common.php");

if (!isset($_GET['promo_id']) OR !is_numeric($_GET['promo_id'])) exit('Invalid or missing promo_id value.');

$promo_id = $_GET['promo_id']; 
$data = request(TATAG_DOMAIN ."/promo/$promo_id", "GET", new stdClass()); 
if (isset($data->error)) exit($data->error); 

$promo = $data[0];


$shortTitle =  substr($promo->name,0,80);
$shortDesc =  substr($promo->description,0,120);
$amount = number_format($promo->amount, 2, ".", ",");

$metaDescription = "By $promo->brand_name, $amount XTE for $promo->recipientToken. $shortDesc ...";

$h = strlen($promo->name) > 80 ? 'h4' : 'h3';
?><html>
<head>
	<title>Promo</title>	
	<link rel="icon" type="image/png" href="/ui/css/logo5.png">
	
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	
	<meta property="og:image" content="<?php echo $promo->imageURL; ?>"/>
	<meta property="og:image:url" content="<?php echo $promo->imageURL; ?>"/>
	<meta property="og:url" content="<?php echo "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"; ?>"/>
	<meta property="og:title" content="<?php echo $promo->name; ?>"/>
	<meta property="og:description" content="<?php echo $metaDescription; ?>"/>
	
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="@tatagcc">
	<meta name="twitter:title" content="<?php echo $promo->name ?>">
	<meta name="twitter:description" content="<?php echo $metaDescription ?>">
	<meta name="twitter:image" content="<?php echo $promo->imageURL ?>">

	<!--<script type="text/javascript">var switchTo5x=true;</script>
	<script type="text/javascript" src="https://ws.sharethis.com/button/buttons.js"></script>-->
	
  <link rel="stylesheet" href="/common2/lib/foundation-5.3.3/css/foundation.min.css">
	<link rel="stylesheet" href="/common2/lib/foundation-5.3.3/icons/foundation-icons.css">
  <link rel="stylesheet" href="/ui/css/admin.css">
	<link rel="stylesheet" href="/ui/css/home.css">
	<style>		
		body {
			background-color: #ececec;
		}
		
		#aboutBanner {
			max-width: 600px;
			margin: 0 auto;
		}
		
		#mainDiv {
			max-width: 600px;
			margin: 5px auto 0.5rem auto;
			padding: 1.25rem 0.75rem 0.75rem 0.75rem;
			text-align: center;
			background-color: #fff;
			/*border-bottom: 1px solid #ccc;*/
		}
		
		#mainDiv p {
			text-align: left;
			padding: 0 1rem;
		}
		
		#mainDiv h3, #mainDiv h4 {		
			font-size: 1.125rem;
			margin: 0.75rem 1.25rem;
		} 
	</style>
</head>
<body>
	
	<!--<div id='login_provider'></div>
	<div class='row'>
		<div class='small-12' id='titleBar'>
			<span class='fi-refresh'>&nbsp;</span><a href="/ui/home" style="color: #000;">Home</a> |
			<a href="/ui/wallet">Wallet</a> |
			<a href="/ui/my-teams">Teams</a>
		</div>
	</div>
	
	<div id='viewTypeDiv' class='row'>
		<button id='aboutViewPrompt' class='small-3 tiny' onclick='reload(this)'>About</button>
		<button id='ratingsViewPrompt' class='small-3 tiny' onclick='reload(this)'>Ratings</button>
		<button id='vizViewPrompt' class='small-3 tiny' onclick='reload(this)'>Viz</button>
		<button id='promosViewPrompt' class='small-3 tiny' style='color: rgb(255, 255, 0);' onclick='reload(this)'>Promos</button>
	</div>-->

	<div id='aboutBanner'>
		<h5 style='text-decoration: underline;' id='bannerTitle'>tatag.cc promos</span></h5>
	</div>
	
	<div id='mainDiv' class='panel'>
	<?php echo "
		<img src='$promo->imageURL' />
		<$h>$promo->name</$h>
		<h5 style='margin-bottom: 0.1rem;'>By $promo->brand_name</h5>
		<button class='small' onclick='checkout()'>$amount XTE</button>
		<p>$promo->description</p>
		
		<p>Recipient token: <a href='$promo->payLink'>$promo->recipientToken</a>.</p>
		
		<p><b>Promo code usage limits per week:</b><br />
		$promo->by_user_limit per user, $promo->by_brand_limit by brand, $promo->by_all_limit total.<br /> 
		In addition, a user must wait $promo->by_user_wait hours before reusing this promo code.</p>
		
		<p><b>Expires</b>: $promo->expires</p>
		<br />
		"; 
	?>
</div>

<div>
	<span class='st_facebook_large' displayText='Facebook'></span>
	<span class='st_twitter_large' displayText='Tweet'></span>
	<span class='st_pinterest_large' displayText='Pinterest'></span>
	<span class='st_googleplus_large' displayText='Google +'></span>
	<span class='st_tumblr_large' displayText='Tumblr'></span>
	<span class='st_email_large' displayText='Email'></span>
</div>

<script type="text/javascript">
	/*stLight.options({
		publisher: "5d4b36c2-d150-488e-b2f5-6e332e795b81", 
		doNotHash: false, 
		doNotCopy: false,
		hashAddressBar: false
	});*/
	
	function checkout() {
		window.open("<?php echo $promo->payLink ?>");
	}
	
	function reload(target) {	
		var elemId = target.id.toLowerCase();
		var view = elemId.search('rating') != -1 ? 'ratings'
			: elemId.search('promo') != -1 ?  'promos'
			: elemId.search('viz') != -1 ?  'viz'
			: elemId.search('about') != -1 ?  'about'
			: '';
		
		if (view) {
			var loc = window.location; //console.log(loc.protocol+'//'+ loc.host + "/ui/home-"+ view);
			loc.href = loc.protocol+'//'+ loc.host + "/ui/home-"+ view;
		}
	};
	
	var bannerTitle = document.getElementById('bannerTitle');
	var ref = document.referrer.split("://"); 
	
	if (ref[1] && ref[1].search(window.location.hostname)==0) {
		bannerTitle.innerHTML = "Back to tatag.cc promos";
		bannerTitle.onclick = function () {window.history.back();};
	}
	else {
		bannerTitle.onclick = function () {
			window.location.href='<?php echo UI_DOMAIN ?>/home-promos';
		};		
	}
	
</script>

</body>
</html>
