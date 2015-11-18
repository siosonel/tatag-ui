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
	
	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places"></script>
	
	<script src="/common2/lib/foundation-5.3.3/js/foundation/foundation.js"></script>
	<script src="/common2/lib/foundation-5.3.3/js/foundation/foundation.reveal.js"></script>
  <link rel="stylesheet" href="/common2/lib/foundation-5.3.3/css/foundation.min.css">
	<link rel="stylesheet" href="/common2/lib/foundation-5.3.3/icons/foundation-icons.css">
	
  <link rel="stylesheet" type="text/css" href="/common2/lib/slick/slick.css"/>
  <link rel="stylesheet" type="text/css" href="/common2/lib/slick/slick-theme.css"/>
	<script type="text/javascript" src="/common2/lib/slick/slick.min.js"></script>
		
	<link rel="stylesheet" href="/ui/css/admin.css">
	<link rel="stylesheet" href="/ui/css/home.css">
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
		<button id='aboutViewPrompt' class='small-3 tiny'>About</button>
		<button id='ratingsViewPrompt' class='small-3 tiny'>Ratings</button>
		<button id='vizViewPrompt' class='small-3 tiny'>Viz</button>
		<button id='promosViewPrompt' class='small-3 tiny'>Promos</button>
	</div>

	<div id='mainWrapper'>
		<div id='ratingsWrapper' class="row"></div>
		
		<div id='vizWrapper'></div>		
		
		<div id='promosWrapper' class="row"></div>
		
		<div id='aboutWrapper'>
			<div id='aboutBanner'>
				<img src='/ui/css/logo5.png' class='aboutLogo'/>
				<div>
					<h1>tatag.cc</h1>
					<h5>invert the economy</h5>
				</div>
			</div>
			
			<div class='aboutItem' id='howItWorks'>
				<h4>Turn your team's<br />budgets <i>into</i> digital currency.</h4>
				<ul style='width: 33rem; max-width: 90%; margin: 1.5rem auto;'>
					<li><b>Use your expense budget</b> to pay for goods and services.</li>
					<li><b>Use your revenue budget</b> to accept payments from reputable teams.</li>
					<li><b>Replenish</b> your budgets as needed.</li>
				</ul>
				<p>If your team maintains a <i>good reputation</i> and <i>reasonable budgets</i>, 
				you will be able to easily transact with other teams. If your ethics or products are 
				questionable, they'll refuse to transact with you.</p>
			</div>			
			<!--<div class='aboutItem' id='howItWorks'>
				<h4>No funding? <i>No problem!</i></h4>
				<ul style='width: 33rem; max-width: 90%; margin: 1rem auto;'>
					<li><b>Set your team's budgets</b>: these are automatically funded.</li>
					<li><b>Use your expense budget</b> to pay for goods and services.</li>
					<li><b>Use your revenue budget</b> to accept payments from reputable teams.</li>
					<li><b>Repeat the budget cycle</b> to replenish what gets used.</li>
				</ul>
				<p>That's it. Tatag.cc is <i>not</i> a platform for raising money from lenders, investors, or donors. 
				Instead, we help teams establish their <a href='#b-as-c'>budgets as digital currency</a>, using strict
				accounting rules and data-driven reputation tracking.</p>
			</div>-->
			<div class='aboutItem'>
				<h4>Support what you believe in</h4>
				<p>
					<i>Would you refuse payments from <br /><span id='workType'></span>?</i>
				</p>
				<div id='rateImgDiv'>
					<div><img src='/ui/images/woman-farmer.jpg' class='rateImg'/></div>
					<div><img src='/ui/images/polluter.jpg' class='rateImg' title='&copy; Jonathan Kos-Read'/></div>
					<div><img src='/ui/images/programmer.jpg' class='rateImg'/></div>					
					<div><img src='/ui/images/coal-mine.jpg' class='rateImg'/></div>
					<div><img src='/ui/images/street-sweeper.jpg' class='rateImg'/></div>
					<div><img src='/ui/images/teacher.jpg' class='rateImg'/></div>
				</div>
			</div>
			<div class='aboutItem' style='position: relative;'>
				<h4>Influence the future</h4>
				<p id='vizSimpleExplained' style='margin-bottom: 0.2rem;'></p>			
				<button class='tiny' id='vizSimpleNext'></button>
				<div id='vizSimple'>
					<div id='yAxisLabel'>Relative Market Influence <span class='axisArrow'>&rarr;</span></div>
					<div id='xAxisLabel'>Relative Wealth <span class='axisArrow'>&rarr;</span></div>
				</div>
				<div id='vizSimpleBtnDiv'></div>
				<div id='vizSimpleNote'></div>
			</div>
			<div class='aboutItem'>
				<h4>Try our platform</h4>
				<p>
					<i>Promote a sustainable economy</i>
				</p>
				<ul style='width: 33rem; max-width: 90%; margin: 1.5rem auto;'>
					<li>Search the <a href='home-promos'>promotions list</a> to buy products or donate to projects</li>
					<li>See the <a href='home-ratings'>average of ratings</a> given by users to organizations and companies</li>
					<li>Learn from the <a href='home-viz'>data visualizations</a> of budget activity as influenced by brand reputation</li>
				</ul>
				<p style='margin: 2rem auto; width: 40rem; max-width: 95%;'>Tatag.cc is <i>not</i> a platform for raising money from lenders, investors, or donors. 
					Instead, we help teams establish their <a href='#b-as-c'>budgets as digital currency</a>, using strict
					accounting rules and data-driven reputation tracking.</p>
			</div>
			<div class='aboutVid'>
				<h4>Inverted Design</h4>
				<iframe width="98%" height="350rem" src="https://www.youtube.com/embed/r71QSqVWUFc" frameborder="0" allowfullscreen></iframe>
			</div>
			<div class='aboutItem' id=''>
				<a name='b-as-c'></a>
				<h4>Budgets-as-Currency</h4>
				<button class='tiny' id='vizGoalsNext'></button>
				<div id='acceptOrRejectDiv' style='display: none'>
					<button class='tiny' id='acceptPaymentBtn'>Accept</button>
					<span> OR </span>
					<button class='tiny' id='rejectPaymentBtn'>Reject</button>					
				</div>
				<p id='vizGoalsDesign'></p>		
				<div id='vizGoals'></div>				
			</div>
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
		
	<div id='promosModal' class="reveal-modal medium formModal" style='min-height:50vh; top:30px;' data-reveal>
		<div id='promosForm'>		
			<h4 id='promos-formTitle'></h4>
			<form>
				<div class='row' id='promoID-formDiv'>
					<div class='columns small-12'>
						<label>Promos ID#<input type='text' id='promos-promo_id' value='' disabled='disabled'/></label>
					</div>
				</div>	
				
				<div id='promoDetailsDiv'>
					<div class='row'>
						<div class='columns small-12'>
							<label>Name<input type='text' id='promos-name' value='' /></label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label>Description<textarea rows='3' id='promos-description'></textarea></label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-6'>
							<label>Amount<input type='text' id='promos-amount' value='' /></label>
						</div>
						<div class='columns small-6'>
							<label>Expires<input type='text' id='promos-expires' value='2016-12-31 00:00:00' /></label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-6'>
							<label for='promos-keyword'><b>Keyword</b> for promo code,<br /> 
								e.g. <b>food</b>-111, <b>ride</b>-18
							</label>
						</div>
						<div class='columns small-6'>
							<input type='text' id='promos-keyword' value='ad' /></label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label>Image URL<input type='text' id='promos-imageURL' value='' /></label>
						</div>
					</div>						
					<div class='row'>
						<div class='columns small-12'>
							<label>Link<input type='text' id='promos-iinfoURL' value='' /></label>
						</div>
					</div>
				</div>
				
				<div id='promoRelayDiv'>
					<div id='promoHolderIdDiv' class='row'>
						<div class='columns small-12'>
							<label>Route payments to<br />(revenue account w/ 'x' authcode): <select id='promos-holder_id'></select></label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>Limits on usage per week</div>
					</div>
					<div class='row'>
						<div class='columns small-4'>
							<label>Total<input type='text' id='promos-by_all_limit' value='25' /></label>
						</div>
						<div class='columns small-4'>
							<label>By brand<input type='text' id='promos-by_brand_limit' value='5' /></label>
						</div>
						<div class='columns small-4'>
							<label>By user<input type='text' id='promos-by_user_limit' value='2' /></label>
						</div>
					</div>
					<div class='row'>						
						<div class='columns small-8'>
							<label for='promos-by_user_wait'>Before reusing, a user must wait (in hours)</label>
						</div>				
						<div class='columns small-4'>
							<input type='text' id='promos-by_user_wait' value='24' />
						</div>
					</div>
				</div>
			</form>
			<button id='promos-submit'>Submit</button>&nbsp;
			<button id='promos-cancel'>Cancel</button>
		</div>
		<a class="close-reveal-modal">×</a>
	</div>		
	
	<!--<div>
		<style>
			#promoIframe {
				display: none;
				position: absolute;
				top: 10%;
				left: 10%;
			}
		</style>
		<iframe src='/ad/2' id='promoIframe' width='80%' height='100%'></iframe>
	</div>-->
	
	
	<script src='/ui/js/homeMain.js'></script>
	<script src='/ui/js/adminForms.js'></script>
	<script src='/ui/js/homeRatings.js'></script>
	<script src='/ui/js/homePromos.js'></script>
	<script src='/ui/js/homeViz.js'></script>
	<script src='/ui/js/homeAbout.js'></script>
	<script src='/ui/js/autoComplete.js'></script>
	
	<script type="text/javascript" src="/ui/lib/d3/d3.v3.min.js"></script>
	<script type="text/javascript" src="/ui/lib/colorbrewer.js"></script>
	<script type="text/javascript" src="/ui/js/vizSimple.js"></script>
	<script type="text/javascript" src="/ui/js/vizGoals.js"></script>
	
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
		
		$(document).ready(function () {
			var workType = [
				//"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", 
				"a farmer's cooperative", "a heavy polluter", "open-source contributors", "a strip mining company", "a sanitation agency", "a school"
			];
			
			$('#workType').html(workType[0]);
			
			$('#rateImgDiv').slick({
				dots: true,
				infinite: true,
				speed: 500,
				cssEase: 'linear',
				arrows: true
			}).on('beforeChange', function(event, slick, currentSlide, nextSlide){ 
				$('#workType').html(workType[nextSlide]);
			});
		});
	</script>
	
	<script>		
		$(document).ready(function () {
			var vizSimple = vizSimpleBase(); 
			vizSimple.checkWidth = setInterval(vizSimple.init, 1000);
			
			var vizGoals = vizGoalsBase(); 
			vizGoals.checkWidth = setInterval(vizGoals.init, 1000);
			
			$('#accessSkew').on('change',vizSimple.resetData);
			$(window).on('resize', function () {vizSimple(); vizGoals();});
		});
	</script>
	
	<?php include "me.php" ?>
</body>
</html>