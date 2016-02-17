<style>
	#funding .funding-wrapper {
		position: absolute;
		opacity: 0;
	}

	.funding-wrapper h5 {
		margin-top: -0.5rem;
	}

	.funding-title {
		position: absolute;
	}

	.funding-advantage {
		color: #11aa55;
		font-weight: 700;
		font-style: italic;
	}

	#funding-team, #funding-market, #funding-regulation {
		cursor: pointer;
	}

	#funding-rightUpper, #funding-rightLower { 
		width: 100%; 
		top: 30%; 
		text-align: center; 
		margin: auto; 
		padding: 0 3rem
	}

	#funding-rightLower ul {
		padding-left: 1rem;
	}
</style>

<div id='aboutWrapper'>
	<div id='aboutBanner'>
		<img src='/ui/css/logo5.png' class='aboutLogo'/>
		<div>
			<h1>tatag.cc</h1>
			<h5>invert the economy</h5>
		</div>
	</div>
	
	<div class='aboutItem' id='howItWorks'>
		<h5><i>No funding? No problem!</i></h5>
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

	<div class='aboutItem' id='funding' style='position:relative; height:35rem;'>
		<!--<h4>Data-driven platform</h4>-->

		<!--
		<div id='funding-leftUpper' class='funding-wrapper' style='max-width: 32%; top: 30%; left: 20%;'></div>
		<div id='funding-leftLower' class='funding-wrapper' style='max-width: 32%; top: 50%; left: 20%;'></div>
		-->

		<div id='funding-team' class='funding-wrapper' style='top: 20%; left: 20%;'>
			<span class='fi-dollar-bill large' style='font-size: 3rem; color:#009988;'></span>
			<h5>Practical</h5>			
		</div>
		<div id='funding-market' class='funding-wrapper' style='top: 20%; left: 45%;'>
			<span class='fi-heart large' style='font-size: 3rem; color:#bb5555;'></span>
			<h5>Ethical</h5>
		</div>
		<div id='funding-regulation' class='funding-wrapper' style='top: 20%; left: 70%;'>
			<span class='fi-wrench' style='font-size: 3rem; color:#555555;'></span>
			<h5>Technical</h5>
		</div>

		<div id='funding-rightUpper' class='funding-wrapper' style='top: 30%'></div>
		<div id='funding-rightLower' class='funding-wrapper' style='top: 45%; left: -0.1'></div>

		<div id='funding-nextBtn' class='funding-wrapper' style='top: 65%; left: 44%;'>
			<button class='tiny' id='vizFundingNext'>next &#9658;</button>
		</div>
	</div>

	<div id='try-it' class='aboutItem' style='position: relative; min-height: 23rem; padding-top: 3rem;'>
		<h4>Try it!</h4>
		<ul style='width: 33rem; max-width: 90%; margin: 1.5rem auto;'>
			<li>Browse <a href='/ui/home-promos'>the promos</a></li>
			<li>Link to a <a href='https://tatag.cc/ad/1' target='oss-1'>promo page</a> or <a href='https://tatag.cc/for/oss-1' target='oss-1'>recipient token (oss-1)</a> anywhere
			</li>
			<li>
				<a href='https://github.com/siosonel/tatag-api/blob/master/CONTRIBUTING.md'>Develop apps</a>, 
				see the <a href='https://tatag.cc/api/ref/docs.html'>API documentation</a>
			</li>
		</ul>
		<p>or learn more below</p>
	</div>

	<div id='advantages' class='aboutItem' style='position: relative;'>
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


	<div id='budgets-as-currency' class='aboutItem' id=''>
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
	<?php if (1 || SITE!='dev') { ?>
		<div class='aboutVid'>
			<h4>Inverted Design</h4>
			<iframe width="98%" height="350rem" src="https://www.youtube.com/embed/r71QSqVWUFc" frameborder="0" allowfullscreen></iframe>
		</div>
	<?php } ?>
	</div>
</div>

<script type="text/javascript" src="/ui/lib/d3/d3.v3.min.js"></script>
<script type="text/javascript" src="/ui/lib/colorbrewer.js"></script>

<script src='/ui/js/homeMain.js'></script>	
<script src='/ui/js/homeAbout.js'></script>
<script type="text/javascript" src="/ui/js/vizSimple.js"></script>
<script type="text/javascript" src="/ui/js/vizGoals.js"></script>
<script type="text/javascript" src="/ui/js/vizFunding.js"></script>

<script>
	$(document).ready(function () {
		var vizSimple = vizSimpleBase(); 
		vizSimple.checkWidth = setInterval(vizSimple.init, 1000);
		
		var vizGoals = vizGoalsBase(); 
		vizGoals.checkWidth = setInterval(vizGoals.init, 1000);
		
		$('#accessSkew').on('change',vizSimple.resetData);
		$(window).on('resize', function () {
			vizSimple(); 
			vizGoals(); 
			vizFunding(0);
		});
	});
</script>
