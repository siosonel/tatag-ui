<!DOCTYPE html>
<html>
<head>
	<title>Admin</title>
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/admin.css">
	<link rel="stylesheet" href="/common2/lib/foundation-5.3.3/icons/foundation-icons.css">
	
	<script type="text/javascript" src="/common2/lib/jQuery/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="/node_modules/q/q.js"></script>
	<script type="text/javascript" src="js/apiClass.js"></script>
	
	<script src="/common2/lib/foundation-5.3.3/js/foundation/foundation.js"></script>
	<script src="/common2/lib/foundation-5.3.3/js/foundation/foundation.reveal.js"></script>
  <link rel="stylesheet" href="/common2/lib/foundation-5.3.3/css/foundation.min.css">
	<link rel="stylesheet" href="/common2/lib/foundation-5.3.3/icons/foundation-icons.css">
	
	<style></style>
</head>
<body>
	<div class="row">
		<div class='medium-3 large-6 columns' id='titleBar'>&nbsp;</div>
		<div class='small-12 medium-9 large-6 columns' id='titleBar'><b>Admin</b></div>		
	</div>
	<div class='row'>
		<div id='mainWrapper' class='small-12 medium-9 large-6 columns '>	
			<div id='brandsWrapper'></div>
			<div id='aboutWrapper'></div>
			<div id='membersWrapper'></div>
			<div id='memberAccountsWrapper'></div>
			<div id='accountsWrapper'></div>
			<div id='accountHoldersWrapper'></div>
			<div id='recordsWrapper'>
				<div id='recordsTitle'></div>
				<div id='recordsType' class='row'>
					<button id='records-issued' class='columns small-2 tiny'>Added</button>
					<button id='records-revTransfer' class='columns small-2 tiny'>N-to-N</button>
					<button id='records-expTransfer' class='columns small-2 tiny'>P-to-P</button>
					<button id='records-intrause' class='columns small-2 tiny'>Intra</button>
					<button id='records-inflow' class='columns small-2 tiny'>Inflow</button>
					<button id='records-outflow' class='columns small-2 tiny'>Outflow</button>
				</div>
				<div id='recordsItems'></div>
			</div>		
		</div>	
		
		<div class='small-0 medium-3 large-6 columns' >&nbsp;</div>
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
						<div class='columns small-8'>
							<label>Name<input type='text' id='accounts-name' value='' /></label>
						</div>
						<div class='columns small-4'>
							<label>Permission<input type='text' id='accounts-authcode' value='' /></label>
						</div>
					</div>
					<div class='row' style='text-align: center;' id='accounts-sign-row'>
						<div class='columns small-4'>
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
							<label>Permission<input type='text' id='holders-authcode' value='' /></label>
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
							<label>Mission<textarea id='about-mission'/></textarea>
						</div>
					</div>
					<div class='row'>
						<div class='columns small-12'>
							<label>Description<textarea id='about-description'/></textarea>
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
	<script>
		var app = adminMain(<?php echo '{"userid":"'.$_SESSION['TOKEN_ID'].'","pass":"'.$_SESSION['TOKEN_VAL'].'"}'; ?>);		
	</script>
</body>
</html>