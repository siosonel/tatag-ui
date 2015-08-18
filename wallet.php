<!DOCTYPE html>
<html>
<head>
	<title>Wallet</title>
	<link rel="icon" type="image/png" href="css/logo5.png">
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	
	<link rel="stylesheet" href="css/normalize.css">
	
	<script type="text/javascript" src="/common2/lib/jQuery/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="/node_modules/q/q.js"></script>
	<script type="text/javascript" src="js/apiClass.js"></script>
	
	<script src="/common2/lib/foundation-5.3.3/js/foundation/foundation.js"></script>
	<script src="/common2/lib/foundation-5.3.3/js/foundation/foundation.reveal.js"></script>
  <link rel="stylesheet" href="/common2/lib/foundation-5.3.3/css/foundation.min.css">
	<link rel="stylesheet" href="/common2/lib/foundation-5.3.3/icons/foundation-icons.css">
	
	<link rel="stylesheet" href="css/wallet.css">
	
	<style></style>
</head>
<body>
	<div id='login_provider'></div>
	<div class="row">
		<div class='small-12' id='titleBar'>
			<a href="/ui/home">Home</a> |
			<span class='fi-refresh'>&nbsp;</span><a href="/ui/wallet" style="color: #000;">Wallet</a> |
			<a href="/ui/team">Teams</a> | 
			<a href="/ui/admin">Admin</a>
		</div>
	</div>
	
	<div id='mainWrapper'>	
		<div class="row" id='accountsWrapper'></div>
		<div class="row" id='recordsWrapper'></div>
		<div class="row" id='relaysWrapper'></div>
		<button id='scrollTo' class='tiny'>more...</button>
	</div>	
	
	<div id='txnModal' class="reveal-modal medium" style='min-height:50vh; top:30px;' data-reveal>
		<div id='txnForm'>		
			<h4 id='txn-title'></h4>
			<form>
				<div class='row'>
					<div class='columns small-12' id='expenseSelectDiv'>
						<label>Expense account to use<select id='expenseAcctToUse'></select></label>
					</div>
				</div>
				<div class='row'>
					<div class='columns small-8' id='txnFromDiv'>
						<label>Recipient<input type='text' id='txn-from' value='' /></label>
					</div>
					<div class='columns small-8' id='txnToDiv'>
						<label>Recipient<input type='text' id='txn-to' value='' /></label>
					</div>
					<div class='columns small-4'>
						<label>amount<input type='text' id='txn-amount' value='' /></label>
					</div>
				</div>
				<div class='row'>
					<div class='columns small-12'>
						<label>note<input type='text' id='txn-note' value='' /></label>
					</div>
				</div>
				<input type='hidden' id='txn-orig_record_id' value='' /> 
			</form>
			<button id='txn-submit'>Submit</button>
		</div>
				
		<div id='relayInfo'></div>
		
		<a class="close-reveal-modal">×</a>
	</div>
	
	<div id='editModal' class="reveal-modal medium" style='min-height:50vh; top:30px;' data-reveal>
		<div id='editCard'>		
			<h4 id='edit-title'></h4>
			<form>
				<div class='row'>
					<div class='columns small-8'>
						<label>alias<input type='text' id='edit-alias' value='' /></label>
					</div>
					<div class='columns small-4'>
						<label>token<input type='text' id='edit-limkey' value='' /></label>
					</div>
				</div>
			</form>
			<button id='edit-submit'>Submit</button>&nbsp;
			<button id='editHolding-cancel'>Cancel</button>
		</div>
		
		<div id='editRelay'>		
			<h4 id='editRelay-title'></h4>
			<form>
				<div class='row'>
					<div class='columns small-12'>
						<label>Relay token for
							<select id='editRelay-txntype'>
								<option value='pn'>budget use</option>								
								<option value='np'>budget issuance</option>
							</select>
						</label>
					</div>
				</div>
				<div class='row'>
					<div class='columns small-12'>
						<label>Secret (optional)<input type='text' id='editRelay-secret' value='' /></label>
					</div>
				</div>
				<div class='row'>	
					<div class='columns small-6'>
						<label>Amount Min<input type='text' id='editRelay-amount_min' value='0.00' /></label>
					</div>
					<div class='columns small-6'>
						<label>Amount Max<input type='text' id='editRelay-amount_max' value='9999999.00' /></label>
					</div>
				</div>
				<div class='row'>
					<div class='columns small-12'>
						<label>Redirect (optional)<input type='text' id='editRelay-redirect' value='' /></label>
					</div>
				</div>
				<div class='row'>
					<div class='columns small-12'>
						<label>Tag (optional)<input type='text' id='editRelay-tag' value='' /></label>
					</div>
				</div>
				<div class='row'>
					<div class='columns small-12'>Limits on usage per week</div>
				</div>
				<div class='row'>
					<div class='columns small-6'>
						<label>Total<input type='text' id='editRelay-by_all_limit' value='25' /></label>
					</div>
					<div class='columns small-6'>
						<label>By brand<input type='text' id='editRelay-by_brand_limit' value='5' /></label>
					</div>
				</div>
				<div class='row'>
					<div class='columns small-6'>
						<label>By user<input type='text' id='editRelay-by_user_limit' value='2' /></label>
					</div>
					<div class='columns small-6'>
						<label>Reuse wait (in hours)<input type='text' id='editRelay-by_user_wait' value='48' /></label>
					</div>
				</div>
			</form>
			<button id='editRelay-submit'>Submit</button>&nbsp;
			<button id='editRelay-cancel'>Cancel</button>
		</div>
		
		<div id='editPrompt'>
			<p id='editRecordConfirm'></p>
			<input type='hidden' id='edit-status' value=''/>
			<button id='editRecord-submit'>Submit</button>&nbsp;
			<button id='editRecord-cancel'>Cancel</button>
		</div>
		
		<a class="close-reveal-modal">×</a>
	</div>
	
	<script type="text/javascript" src="js/walletMain.js"></script>
	<script type="text/javascript" src="js/walletCards.js"></script>
	<script type="text/javascript" src="js/walletRecords.js"></script>
	<script type="text/javascript" src="js/walletTxn.js"></script>
	<script type="text/javascript" src="js/walletEdit.js"></script>
	<script type="text/javascript" src="js/walletRelays.js"></script>
	<script>
		var app = walletMain(<?php echo '{"userid":"'.$_SESSION['TOKEN_ID'].'","pass":"'.$_SESSION['TOKEN_VAL'].'", "baseURL": "'. TATAG_DOMAIN .'"}'; ?>);
	</script>
	
	<?php include "me.php" ?>
</body>
</html>