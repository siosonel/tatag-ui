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
	<script type="text/javascript" src="/ui/js/apiClass.js"></script>
	
	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places"></script>
	
	<script src="/common2/lib/foundation-5.3.3/js/foundation/foundation.js"></script>
	<script src="/common2/lib/foundation-5.3.3/js/foundation/foundation.reveal.js"></script>
  <link rel="stylesheet" href="/common2/lib/foundation-5.3.3/css/foundation.min.css">
	<link rel="stylesheet" href="/common2/lib/foundation-5.3.3/icons/foundation-icons.css">
	
	<link rel="stylesheet" href="/ui/css/admin.css">
	
  <link rel="stylesheet" type="text/css" href="/common2/lib/slick/slick.css"/>
  <link rel="stylesheet" type="text/css" href="/common2/lib/slick/slick-theme.css"/>
	<script type="text/javascript" src="/common2/lib/slick/slick.min.js"></script>
	
	<style>
		#ratingsWrapper, #vizWrapper, #promosWrapper, #aboutWrapper {
			display: none;
			left: 0%;
		}
	
		#aboutWrapper {
			text-align: center;
			width: 100%;
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
		
		#aboutBanner {
			padding: 1rem 0.1rem;
			margin: 0 0.1rem 0.3rem 0.1rem;
			background-color: transparent;
			text-align: center;
		}
		
		#aboutBanner h1 {
			color: #333;
			margin-bottom: 0;
		}
		
		#aboutBanner h5 {
			font-style: italic;
		}
		
		.aboutItem {
			padding: 1rem 0.2rem 1rem 0.2rem;
			margin: 0.3rem 0.1rem;
			background-color: #fff;
		}
		
		.aboutVid {
			padding: 1rem 0.1rem 1rem 0.1rem;
			margin: 0.3rem 0.1rem;
			background-color: #fff;
		}
		
		#aboutWrapper h4 {
			text-align: center; 
			padding-left: 0.3rem;
			margin-bottom: 0;
		}
		
		#aboutWrapper p {
			padding: 0 0.5rem 0rem 0.5rem;
			text-align: center;
		}
		
		#aboutWrapper ul {
			padding: 0 0.5rem 0rem 0.5rem;
			text-align: left;
			width: 80%;
			margin: auto;
		}
		
		#aboutWrapper .slick-dots {
			text-align: center;
			margin-left: 0;
		}
		
		.rateImg {
			width: 80%;
		}
		
		.slick-slide img {
			display: inline;
		}
		
		.slick-prev:before {
			color: #555;
		}
		
		.slick-next:before {
			color: #555;
		}
		
		.slick-prev {
			left: 0;
			z-index: 99999;
		}
		
		.slick-next {
			right: 5px;
			z-index: 99999;
		}
		
		button:focus, div:focus {
			outline:0;
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
				<h1>tatag.cc</h1>
				<h5>invert the economy</h5>
			</div>
			<div class='aboutItem'>
				<h4>Rate</h4>
				<p>
					<i>Would you accept the currency issued by<br /><span id='workType' style='text-decoration: underline;'></span>?</i>
				</p>
				<div id='rateImgDiv'>
					<!--<div><img src='images/accept-payment.jpg' class='rateImg'/></div>-->
					<div><img src='images/woman-farmer.jpg' class='rateImg'/></div>
					<div><img src='images/polluter.jpg' class='rateImg' title='&copy; Jonathan Kos-Read'/></div>
					<div><img src='images/teacher.jpg' class='rateImg'/></div>
					<div><img src='images/coal-mine.jpg' class='rateImg'/></div>
					<div><img src='images/street-sweeper.jpg' class='rateImg'/></div>
				</div>
			</div>
			<div class='aboutItem'>
				<h4>Visualize</h4>
				<p>
					<i>What happens when public opinion has a strong influence on market access?</i>
				</p>
				<div id='vizSimple'></div>
				<div id='vizSimpleBtnDiv'></div>
			</div>
			<div class='aboutItem'>
				<h4>Try</h4>
				<p>
					<i>Our platform for a sustainable economy</i>
				</p>
				<ul>
					<li>Issue your own <b>currency brand</b> as <b>budgets</b>. In other words, your budget is your currency.</li>
					<li>To maintain traceability, we cancel corresponding expense and revenue budget amounts when two currency issuers transact.</li>
					<li>Select a brand <b>evaluator bot</b> to provide real-time advisory on whether to accept or reject a payment offer.</li>
					<li>Rate, buy, donate, advertise promotions, merge with another currency brand, etc.</li> 
				</ul>
			</div>
			<div class='aboutVid'>
				<h4>Inverted Design</h4>
				<iframe width="98%" height="350rem" src="https://www.youtube.com/embed/r71QSqVWUFc" frameborder="0" allowfullscreen></iframe>
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
	
	<script src='/ui/js/homeMain.js'></script>
	<script src='/ui/js/adminForms.js'></script>
	<script src='/ui/js/homeRatings.js'></script>
	<script src='/ui/js/homePromos.js'></script>
	<script src='/ui/js/homeViz.js'></script>
	<script src='/ui/js/homeAbout.js'></script>
	<script src='/ui/js/autoComplete.js'></script>
	
	<script type="text/javascript" src="lib/d3/d3.v3.min.js"></script>
	<script type="text/javascript" src="lib/colorbrewer.js"></script>
	
	<script type="text/javascript" src="lib/e4/e4.js"></script>
	<script type="text/javascript" src="lib/e4/e4_chart_helpers.js"></script>
	<script type="text/javascript" src="lib/e4/esd3pathgen.js"></script>
	
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
				"a farmer cooperative", "a heavy polluter", "a school", "a strip mining company", "a sanitation agency"
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
	
	<style>
		#vizSimple {
			position: relative;
			height: 15rem;
			margin: auto;
			margin-bottom: 2rem;
			width: 60%;
			margin-bottom: 2rem;
		}
	
		#vizSimple .datapt {
			position: absolute;
			border-radius: 0.3rem;
			border: 1px solid #777;
			background-color: rgba(0,255,255,0.4);
		}
		
		#vizSimpleBtnDiv {
			width: 100%;
		}
	</style>
	
	<script>
		function vizSimpleBase() {
			var dataset, min, max, prop='qty', dataPtDivs;
			var totalPts=100;
			var height = 1*d3.select('#vizSimple').style('height').replace('px',''); 
			var width; 
			
			
			function main(propName) {
				prop = propName;
				setMinMax(dataset);
				dataPtDivs.transition().duration(2000)
					//.style('left', getLeftPos)
					.style('top', getTopPos)
			}
			
			function init() {			
				dataset = getData();
				setMinMax(dataset);
				
				dataPtDivs = d3.select('#vizSimple')
					.selectAll('datapt')
					.data(dataset)
				.enter().append('div')
					.attr('class', 'datapt')
					.style('left', getLeftPos)
					.style('top', getTopPos)
					.style('font-weight', function (d) {return 200+d[prop]*5})
					.style('font-size', function (d) {return (0.7+d[prop]) + 'rem'})
					.style('line-height', function (d) {return (0.7+d[prop]) + 'rem'})
					.style('opacity', function (d) {return Math.max(0.6, d[prop]);})
					.html('$');
				
				var propNames = ['qty', 'qRepute', 'bqRepute'];
				var btnLabels = {
					qty: 'Wealth Only', 
					qRepute: ' ... with Reputation', 
					bqRepute: ' ... and Issuance'
				};
				
				d3.select('#vizSimpleBtnDiv').selectAll('button')
					.data(propNames)
				.enter().append('button')
					.attr('class', 'tiny')
					.html(function (d) {return btnLabels[d];});
					
				$('button', '#vizSimpleBtnDiv').click(function (e) {
					main(e.target.__data__);
				});
			}
			
			function getData() {
				var d = [];
				var x0 = 0.00001, x1 = 1; //value range
				var n = 2, p = n+1, q = 1/p; //exponents
				var y0 = Math.pow(x0,p), y1 = Math.pow(x1,p), yDiff = y1-y0; //simplifies the qty formula below
				var reputeMin = 0.4, reputeVar = 1 - reputeMin; //reputation settings
				var budgetVar = 0.5; //simulates the variation in how much budget a currency brand could issue
				
				// qty formula adapted from Wolfram as described in
				// http://stackoverflow.com/questions/918736/random-number-generator-that-produces-a-power-law-distribution
				for(var i=0; i<totalPts; i++) {
					var qty = 1 - Math.pow((yDiff*Math.random() + y0),q);
					var repute = reputeMin + Math.random()*reputeVar;
					var budget = qty + Math.random()*budgetVar;
					
					d.push({
						i: i/100,
						qty: qty,
						qRepute: qty*repute,
						bqRepute: budget*repute,
						budget: budget
					});
				}
				
				return d;	
			}
			
			function setMinMax(d) {
				var arr=[], range;
				for(var i=0; i<d.length; i++) arr.push(d[i][prop]);
				range = d3.extent(arr);
				min = range[0];
				max = range[1];
			}
			
			function valSort(a,b) {
				return a[prop]-b[prop]
			}
			
			function getLeftPos(d,i) {
				return prop=='bqRepute' ? width*(1 - (max - d.budget)/max) + 'px'
					: width*(1 - (max - d.qty)/max) + 'px';
			}
			
			function getTopPos(d) {
				return height*(max - d[prop])/max + 'px'
			}
			
			main.init = function () {
				width = 0.9*d3.select('#vizSimple').style('width').replace('px','');
				if (typeof width != 'number') return;
				
				clearInterval(main.checkWidth);
				init();
			}
			
			return main;
		}
		
		$(document).ready(function () {
			var vizSimple = vizSimpleBase(); 
			vizSimple.checkWidth = setInterval(vizSimple.init, 1000);
		});
	</script>
	
	<?php include "me.php" ?>
</body>
</html>