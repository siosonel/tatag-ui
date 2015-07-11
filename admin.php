<!DOCTYPE html>
<html>
<head>
	<title>Admin</title>	
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
			<a href="/ui/wallet">Wallet</a> |
			<a href="/ui/team">Teams</a> |
			<span class='fi-refresh'>&nbsp;</span><a href="/ui/admin" style="color: #000;">Admin</a>
		</div>
	</div>

	<div id='mainWrapper'>	
		<div id='brandsWrapper' class="row"></div>
		<div id='aboutWrapper' class="row"></div>
		<div id='membersWrapper' class="row"></div>
		<div id='memberAccountsWrapper' class="row"></div>
		<div id='accountsWrapper' class="row"></div>
		<div id='accountHoldersWrapper' class="row"></div>
		<div id='throttlesWrapper' class="row"></div>
		<div id='filtersWrapper' class="row"></div>
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
			<a class="close-reveal-modal">×</a>
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
			<a class="close-reveal-modal">×</a>
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
			<a class="close-reveal-modal">×</a>
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
			<a class="close-reveal-modal">×</a>
		</div>
		
		<div id='filtersModal' class="reveal-modal medium formModal" style='min-height:50vh; top:30px;' data-reveal>
			<div id='fitlersForm'>		
				<h4 id='filters-formTitle'></h4>
				<form>
					<div class='row' id='filterID-formDiv' style='display:none'>
						<div class='columns small-12'>
							<label>Filter ID#<input type='text' id='filters-filter_id' value='' disabled='disabled'/></label>
						</div>
					</div>				
					<div class='row' id='filtersOtherId-formDiv'>
						<div class='columns small-12'>
							<label>Other ID#<input type='text' id='filters-other_id' value='' placeholder='Nearby ...' disabled='disabled'/></label>
						</div>
					</div>
					<!--<div class='row' id='filtersOtherName-formDiv'>
						<div class='columns small-12'>
							<label>Brand Name<input type='text' id='filters-other_name' value='' disabled='disabled'/></label>
						</div>
					</div>-->
					<div class='row'>
						<div class='columns small-12'>
							<label>Accept<input type='text' id='filters-accept' value='' /></label>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label>Reason<input type='text' id='filters-reason' value='' />
							</label>
						</div>
					</div>
				</form>
				<button id='filters-submit'>Submit</button>&nbsp;
				<button id='filters-cancel'>Cancel</button>
			</div>
			<a class="close-reveal-modal">×</a>
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
							<label>Mission<textarea id='about-mission'/></textarea></label>
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
			<a class="close-reveal-modal">×</a>
		</div>
	</div>
	
	<script src='js/adminMain.js'></script>
	<script src='js/adminBrands.js'></script>
	<script src='js/adminAbout.js'></script>
	<script src='js/adminMembers.js'></script>
	<script src='js/adminMemberAccounts.js'></script>
	<script src='js/adminAccounts.js'></script>
	<script src='js/adminAccountHolders.js'></script>
	<script src='js/adminRecords.js'></script>
	<script src='js/adminForms.js'></script>
	<script src='js/adminThrottles.js'></script>
	<script src='js/adminFilters.js'></script>
	<script>
		var types = <?php echo file_get_contents(TATAG_DOMAIN ."/ref/brand_classification.json"); ?>;
		var locs = <?php echo file_get_contents(TATAG_DOMAIN ."/ref/countries.json"); ?>;
	
		var app = adminMain(<?php echo '{"userid":"'.$_SESSION['TOKEN_ID'].'","pass":"'.$_SESSION['TOKEN_VAL'].'", "baseURL": "'. TATAG_DOMAIN .'"}'; ?>);		
	</script>
		
	<?php include "me.php" ?>
</body>
</html>