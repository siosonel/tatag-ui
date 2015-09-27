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
	<link rel="icon" type="image/png" href="css/logo5.png">
	
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
	<!--<link rel="stylesheet" href="/common2/lib/foundation-5.3.3/icons/foundation-icons.css">-->
	<style>
		body p {
			text-align: left;
			padding: 0 1rem;
		}
		
		h3, h4 {		
			font-size: 1.125rem;
			margin: 0.75rem 1.25rem;
		} 
	</style>
</head>
<body>
	<div style='padding: 0.75rem; text-align: center;'>
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

<!--<a href="https://twitter.com/share" class="twitter-share-button" data-via="edgarsioson">Tweet</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>-->

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
</script>
</body>
</html>
