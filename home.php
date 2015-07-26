<!DOCTYPE html>
<html>
<head>
	<title>Home</title>	
	<link rel="icon" type="image/png" href="css/logo5.png">
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	
	<link rel="stylesheet" href="css/normalize.css">
	
	<script type="text/javascript" src="/common2/lib/jQuery/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="/node_modules/q/q.js"></script>
	<script type="text/javascript" src="js/apiClass.js"></script>
	
	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places"></script>
	
	<script src="/common2/lib/foundation-5.3.3/js/foundation/foundation.js"></script>
	<script src="/common2/lib/foundation-5.3.3/js/foundation/foundation.reveal.js"></script>
  <link rel="stylesheet" href="/common2/lib/foundation-5.3.3/css/foundation.min.css">
	<link rel="stylesheet" href="/common2/lib/foundation-5.3.3/icons/foundation-icons.css">
	
	<link rel="stylesheet" href="css/admin.css">
	
	<style></style>
</head>
<body>
	<div id='login_provider'></div>
	<div class='row'>
		<div class='small-12' id='titleBar'>
			<span class='fi-refresh'>&nbsp;</span><a href="/ui/home" style="color: #000;">Home</a> |
			<a href="/ui/wallet">Wallet</a> |
			<a href="/ui/team">Teams</a> |
			<a href="/ui/admin">Admin</a>
		</div>
	</div>

	<div id='mainWrapper'>
		<div id='homeWrapper'>
			<b>My Ratings &#9658;</b>
		</div>
		<div id='ratingsWrapper' class="row"></div>
	</div>
	
	<div>	
		<div id='ratingsModal' class="reveal-modal medium formModal" style='min-height:50vh; top:30px;' data-reveal>
			<div id='ratingsForm'>		
				<h4 id='ratings-formTitle'></h4>
				<form>
					<div class='row' id='ratingID-formDiv' style='display:none'>
						<div class='columns small-12'>
							<label>Rating ID#<input type='text' id='ratings-rating_id' value='' disabled='disabled'/></label>
						</div>
					</div>				
					<div class='row' id='ratingsBrandId-formDiv'>
						<div class='columns small-12'>
							<label>Brand ID# or Name<input type='text' id='ratings-brand_id' value='' placeholder='Nearby ...' disabled='disabled'/></label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label>Rating (0-100)<input type='text' id='ratings-rating' value='' /></label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label>Reason<input type='text' id='ratings-reason' value='' />
							</label>
						</div>
					</div>
				</form>
				<button id='ratings-submit'>Submit</button>&nbsp;
				<button id='ratings-cancel'>Cancel</button>
			</div>
			<a class="close-reveal-modal">×</a>
		</div>
	</div>
	
	<script src='js/homeMain.js'></script>
	<script src='js/adminForms.js'></script>
	<script src='js/homeRatings.js'></script>
	<script>	
		var app = homeMain(<?php echo '{"userid":"'.$_SESSION['TOKEN_ID'].'","pass":"'.$_SESSION['TOKEN_VAL'].'", "baseURL": "'. TATAG_DOMAIN .'"}'; ?>);		
	</script>
		
	<?php include "me.php" ?>
</body>
</html>