<?php 
$protocol = (isset($_SERVER['HTTPS']) AND $_SERVER['HTTPS']) ? 'https' : 'http';
$ProtDomain = $protocol ."://". $_SERVER['SERVER_NAME'];

?><!DOCTYPE html>
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
	
	<style>
		#ratingsWrapper, #vizWrapper, #promosWrapper, #aboutWrapper {
			display: none;
			left: 0%;
		}
	
		#aboutWrapper {
			text-align: center;
			width: 100%;
			padding-left: 10px;
		}
	
		#ratingsDivPrompt {}
		
		#addRatingLink {
			cursor: pointer;
		}
		
		#addRatingLink:hover {
			color: #00f;
		}
		
		#ratings-rating	{
			display: inline;
			width: 30%;
			font-size: 2em;
			vertical-align: top;
			height: 1.2em;
			margin: -10px 0 0 10px;
			text-align: center;
		}
		
		#ratings-slider {
			width: 60%;
		}
		
		#autoCompleteMatchedDisplay {
			border: 1px solid #eee;
			margin-top: -17px;
			list-style-type: none;
		}
		
		#autoCompleteMatchedDisplay li {
			/*margin-top: -17px;*/
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
		<button id='ratingsViewPrompt' class='small-3 tiny'>Ratings</button>
		<button id='vizViewPrompt' class='small-3 tiny'>Viz</button>
		<button id='promosViewPrompt' class='small-3 tiny'>Promos</button>
		<button id='aboutViewPrompt' class='small-3 tiny'>About</button>
	</div>

	<div id='mainWrapper'>
		<div id='ratingsWrapper' class="row"></div>
		
		<div id='vizWrapper'></div>		
		
		<div id='promosWrapper' class="row"></div>
		
		<div id='aboutWrapper'>
			<iframe width="100%" height="350rem" src="https://www.youtube.com/embed/r71QSqVWUFc" frameborder="0" allowfullscreen></iframe>
		</div>
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
							<label for='ratings-rating'>Rating (0-100) &nbsp;&nbsp;&nbsp;</label>
							<input type='range' id='ratings-slider' min='0' max='100' value='90' onchange='app.ratings.setRatingBySlider()' oninput='app.ratings.setRatingBySlider()'/>
							<input type='text' id='ratings-rating' value='90' onchange='app.ratings.setSliderByText()'/>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label for='ratings-reason'>Reason</label><input type='text' id='ratings-reason' value='' />
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
	<script src='js/homePromos.js'></script>
	<script src='js/homeViz.js'></script>
	<script src='js/homeAbout.js'></script>
	<script src='js/autoComplete.js'></script>
	<script>	
		var autocompleteSource = [
			'artistry',
			'product quality', 'price', 'customer service',
			'technical excellence',
			'ethics', 'organizational culture',
			'union relations',
			'social responsibility', 'community involvment',
			'environmental impact', 'climate responsibility',
			'fair trade', 
			'dietary health'
		];
	
		var app = homeMain(<?php echo '{"userid":"'.$_SESSION['TOKEN_ID'].'","pass":"'.$_SESSION['TOKEN_VAL'].'", "baseURL": "'. TATAG_DOMAIN .'"}'; ?>);		
		resize();
		$(window).resize(resize);
		
		function resize() {
			var width = $('body').width();
			$('#arrowFrame').attr('height', width<400 ? 710 : 610);
			$('#chordFrame').attr('height', width<400 ? 400 : width+100);
		}
	</script>
		
	<?php include "me.php" ?>
</body>
</html>