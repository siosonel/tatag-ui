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
	
	<style></style>
</head>
<body>
	<div id='login_provider'></div>
		
	<?php include 'teamsTopDivs.php' ?>	
	
	<div id='mainWrapper'>	
		<div id='brandsWrapper' class="row"></div>
		<div id='aboutWrapper' class="row"></div>
		<div id='membersWrapper' class="row"></div>
		<div id='accountsWrapper' class="row"></div>
		<div id='throttlesWrapper' class="row"></div>
		<div id='promosWrapper' class="row"></div>
		<div id='recordsWrapper' class="row">
			<div id='recordsTitle'></div>
			<div id='recordsType' class='row'>
				<button id='records-issued' class='columns small-2 tiny'>Added</button>
				<button id='records-revTransfer' class='columns small-2 tiny'>N=>N</button>
				<button id='records-expTransfer' class='columns small-2 tiny'>P=>P</button>
				<button id='records-intrause' class='columns small-2 tiny'>Intra</button>
				<button id='records-inflow' class='columns small-2 tiny'>Inflow</button>
				<button id='records-outflow' class='columns small-2 tiny'>Outflow</button>
			</div>
			<div id='recordsItems'></div>
		</div>		
	</div>	
		
	
	<div id='acceptModal' class="reveal-modal medium formModal" style='min-height:50vh; top:30px;' data-reveal>
		<div id='acceptForm'>		
			<h4 id='accept-formTitle'></h4>
			<form>
				<div class='row'>
					<div class='columns small-12'>
						<label>Join on (yyyy-mm-dd hh:mm:ss)<input type='text' id='accept-joined' value='' /></label>
					</div>
				</div>
			</form>
			<button id='accept-submit'>Submit</button>&nbsp;
			<button id='accept-cancel'>Cancel</button>
		</div>
		<a class="close-reveal-modal">×</a>
	</div>
	
	<div id='revokeModal' class="reveal-modal medium formModal" style='min-height:50vh; top:30px;' data-reveal>
		<div id='revokeForm'>		
			<h4 id='revoke-formTitle'></h4>
			<form>
				<div class='row'>
					<div class='columns small-12'>
						<label>Revoke on (yyyy-mm-dd hh:mm:ss)<input type='text' id='revoke-revoked' value='' /></label>
					</div>
				</div>
			</form>
			<button id='revoke-submit'>Submit</button>&nbsp;
			<button id='revoke-cancel'>Cancel</button>
		</div>
		<a class="close-reveal-modal">×</a>
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
					<!--<div class='row'>
						<div class='columns small-12'>
							<label>Image URL<input type='text' id='promos-imageURL' value='' /></label>
						</div>
					</div>						
					<div class='row'>
						<div class='columns small-12'>
							<label>Link<input type='text' id='promos-infoURL' value='' /></label>
						</div>
					</div>-->
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
	
	<script src='js/teamMain.js'></script>
	<script src='js/teamBrands.js'></script>
	<script src='js/teamAbout.js'></script>
	<script src='js/teamMembers.js'></script>
	<script src='js/teamAccounts.js'></script>
	<script src='js/teamRecords.js'></script>
	<script src='js/teamThrottles.js'></script>
	<script src='js/adminPromos.js'></script>
	<script src='js/adminForms.js'></script>
	<script>
		var types = <?php echo file_get_contents(TATAG_DOMAIN ."/ref/brand_classification.json"); ?>;
		var locs = <?php echo file_get_contents(TATAG_DOMAIN ."/ref/countries.json"); ?>;
		var byIso3 = {};
		locs.map(function (d) {byIso3[d[3]]=d;});
		
		var app = teamMain(<?php echo '{"userid":"'.$_SESSION['TOKEN_ID'].'","pass":"'.$_SESSION['TOKEN_VAL'].'", "baseURL": "'. TATAG_DOMAIN .'"}'; ?>);		
	</script>
	
	<?php include "me.php" ?>
</body>
</html>