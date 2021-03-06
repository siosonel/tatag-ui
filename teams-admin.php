<!DOCTYPE html>
<html>
<head>
	<title>Admin</title>	
	<link rel="icon" type="image/png" href="css/logo5.png">
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	
	<link rel="stylesheet" href="css/normalize.css">
  	<link rel="stylesheet" href="/common2/lib/foundation-5.3.3/css/foundation.min.css">
	<link rel="stylesheet" href="/common2/lib/foundation-5.3.3/icons/foundation-icons.css">
	
	<link rel="stylesheet" href="css/admin.css">
</head>
<body>
	<div id='login_provider'></div>
	
	
	<script src="/ui/bower_components/jquery/dist/jquery.min.js"></script>
	<?php include 'teamsTopDivs.php' ?>
	
	<div id='mainWrapper'>	
		<div id='brandsWrapper' class="row"></div>
		<div id='aboutWrapper' class="row"></div>
		<div id='membersWrapper' class="row"></div>
		<div id='memberHoldingsWrapper' class="row"></div>
		<div id='accountsWrapper' class="row"></div>
		<div id='accountHoldersWrapper' class="row"></div>
		<div id='promosWrapper' class="row"></div>
		<div id='throttlesWrapper' class="row"></div>
		<div id='recordsWrapper' class="row">
			<div id='recordsTitle'></div>
			<div id='recordsType' class='row'>
				<button id='records-issued' class='columns small-2 tiny'>Added</button>
				<button id='records-revTransfer' class='columns small-2 tiny'>N=&gt;N</button>
				<button id='records-expTransfer' class='columns small-2 tiny'>P=&gt;P</button>
				<button id='records-intrause' class='columns small-2 tiny'>Intra</button>
				<button id='records-inflow' class='columns small-2 tiny'>Inflow</button>
				<button id='records-outflow' class='columns small-2 tiny'>Outflow</button>
			</div>
			<div id='recordsItems'></div>
		</div>				
	</div>
	
	<div>
		<div id='membersModal' class="reveal-modal medium formModal" style='min-height:50vh; top:30px;' data-reveal>
			<div id='membersForm'>		
				<h4 id='members-formTitle'>Edit Membership</h4>
				<form>
					<div class='row'>
						<div class='columns small-8'>
							<label>Role<input type='text' id='members-role' value='' /></label>
						</div>
						<div class='columns small-4'>
							<label>Hours per week<input type='text' id='members-hours' value='' /></label>
						</div>
					</div>
					<div class='row' style='text-align: center;' id='members-user_id-row'>
						<div class='columns small-4 small-centered'>
							<label>User Id<input type='text' id='members-user_id' value='' /></label>
						</div>
					</div>
				</form>
				<button id='members-submit'>Submit</button>&nbsp;
				<button id='members-cancel'>Cancel</button>
			</div>
			<a class="close-reveal-modal">�</a>
		</div>
		
		<div id='accountsModal' class="reveal-modal medium formModal" style='min-height:50vh; top:30px;' data-reveal>
			<div id='accountsForm'>		
				<h4 id='accounts-formTitle'></h4>
				<form>
					<div class='row'>
						<div class='columns small-12'>
							<label>Name<input type='text' id='accounts-name' value='' /></label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label>Permission: <b>c</b>=create, <b>f</b>=transfer from, <b>t</b>=transfer to, <b>i</b>=internal use, <b>x</b>=external use
								<input type='text' id='accounts-authcode' value='' />
							</label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label>Throttle ID (optional usage limit)
								<input type='text' id='accounts-throttle_id' value='' />
							</label>
						</div>
					</div>
					<div class='row' style='text-align: center;' id='accounts-sign-row'>
						<div class='columns small-12'>
							<label>Sign (-1 OR 1)<input type='text' id='accounts-sign' value='' /></label>
						</div>
					</div>
				</form>
				<button id='accounts-submit'>Submit</button>&nbsp;
				<button id='accounts-cancel'>Cancel</button>
			</div>
			<a class="close-reveal-modal">�</a>
		</div>
		
		<div id='holdersModal' class="reveal-modal medium formModal" style='min-height:50vh; top:30px;' data-reveal>
			<div id='holdersForm'>		
				<h4 id='holders-formTitle'>Edit Account Information</h4>
				<form>
					<div class='row'>
						<div class='columns small-12'>
							<label>Permission: <b>c</b>=create, <b>f</b>=transfer from, <b>t</b>=transfer to, <b>i</b>=internal use, <b>x</b>=external use
								<input type='text' id='holders-authcode' value='' />
							</label>
						</div>
					</div>			
					<div class='row' style='text-align: center;' id='holders-new-row'>
						<div class='columns small-6'>
							<label>User ID<input type='text' id='holders-user_id' value='' /></label>
						</div>
						<div class='columns small-6'>
							<label>Account ID<input type='text' id='holders-account_id' value='' /></label>
						</div>
					</div>
				</form>
				<button id='holders-submit'>Submit</button>&nbsp;
				<button id='holders-cancel'>Cancel</button>
			</div>
			<a class="close-reveal-modal">�</a>
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
			<a class="close-reveal-modal">�</a>
		</div>		
		
		<div id='throttlesModal' class="reveal-modal medium formModal" style='min-height:50vh; top:30px;' data-reveal>
			<div id='throttlesForm'>		
				<h4 id='throttles-formTitle'></h4>
				<form>
					<div class='row' id='throttleID-formDiv'>
						<div class='columns small-12'>
							<label>Throttle ID#<input type='hidden' id='throttles-throttle_id' value='' disabled='disabled'/></label>
						</div>
					</div>				
					<div class='row'>
						<div class='columns small-12'>
							<label>Apply to last seconds=<input type='text' id='throttles-period' value='' /></label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label>Total limit<input type='text' id='throttles-by_all' value='' />
							</label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label>Limit by brand<input type='text' id='throttles-by_brand' value='' /></label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label>Limit by user<input type='text' id='throttles-by_user' value='' /></label>
						</div>
					</div>
				</form>
				<button id='throttles-submit'>Submit</button>&nbsp;
				<button id='throttles-cancel'>Cancel</button>
			</div>
			<a class="close-reveal-modal">�</a>
		</div>
		
		<div id='aboutModal' class="reveal-modal medium formModal" style='min-height:50vh; top:30px;' data-reveal>
			<div id='aboutForm'>		
				<h4 id='about-formTitle'></h4>
				<form>
					<div class='row'>
						<div class='columns small-12'>
							<label>Name<input type='text' id='about-name' value='' /></label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label>Purpose<textarea id='about-mission'/></textarea></label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label>Description<textarea id='about-description'/></textarea></label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label>URL<textarea id='about-url'/></textarea></label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label>Advisor<textarea id='about-advisor'/></textarea></label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label>Logo (image URL)<textarea id='about-logo'/></textarea></label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label>Type System
								<select id='about-type_system'/>
									<option value='nonprofit'>Nonprofit</option>
									<option value='for-profit'>For-profit</option>
									<option value='gov'>Government</option>
								</select>
							</label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label for='about-type_id'>Type Detail</label>
							<select id='about-type_id'/></select>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label for='about-country_code'>Country</label>
							<select id='about-country_code'/></select>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label>Phone Area Code
								<select id='about-area_code'/>
								</select>
							</label>
						</div>
					</div>
				</form>
				<button id='about-submit'>Submit</button>&nbsp;
				<button id='about-cancel'>Cancel</button>
			</div>
			<a class="close-reveal-modal">�</a>
		</div>
	</div>


	<script src="/ui/bower_components/q/q.js"></script>
	
	<script src="/ui/bower_components/foundation/js/foundation.min.js"></script>
	<script src="/ui/bower_components/foundation/js/foundation/foundation.reveal.js"></script>
	<script src="/ui/bower_components/foundation/js/foundation/foundation.dropdown.js"></script>

	<script src="/ui/js/phlatSimple.js"></script>
	<script src="/ui/js/phlatDriver.js"></script>

	<script src='/ui/js/adminMain.js'></script>
	<script src='/ui/js/adminBrands.js'></script>
	<script src='/ui/js/adminAbout.js'></script>
	<script src='/ui/js/adminMembers.js'></script>
	<script src='/ui/js/adminMemberHoldings.js'></script>
	<script src='/ui/js/adminAccounts.js'></script>
	<script src='/ui/js/adminAccountHolders.js'></script>
	<script src='/ui/js/adminRecords.js'></script>
	<script src='/ui/js/adminForms.js'></script>
	<script src='/ui/js/adminPromos.js'></script>
	<script src='/ui/js/adminThrottles.js'></script>
	<script>
		var types = <?php echo file_get_contents(TATAG_DOMAIN ."/ref/brand_classification.json"); ?>;
		var locs = <?php echo file_get_contents(TATAG_DOMAIN ."/ref/countries.json"); ?>;
	
		var app = adminMain(<?php echo '{"userid":"'.$_SESSION['TOKEN_ID'].'","pass":"'.$_SESSION['TOKEN_VAL'].'", "baseURL": "'. TATAG_DOMAIN .'"}'; ?>);		
	</script>
		
	<?php include "me.php" ?>

	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places"></script>
</body>
</html>