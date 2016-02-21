<!DOCTYPE html>
<html>
<head>
	<title>Wallet</title>
	<link rel="icon" type="image/png" href="css/logo5.png">
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	
	<link rel="stylesheet" href="/ui/css/normalize.css">
	
  	<link rel="stylesheet" href="/ui/bower_components/foundation/css/foundation.css">
	<link rel="stylesheet" href="/ui/bower_components/foundation-icon-fonts/foundation-icons.css">
	
	<link rel="stylesheet" href="/ui/css/wallet.css">
	
	<style>
		#ordersWrapper, #itemizedWrapper {
			display: none;
		}
	</style>
</head>
<body>
	<div id='login_provider'></div>
	<div class="row">
		<div class='small-12' id='titleBar'>
			<a href="/ui/home">Home</a> |
			<span class='fi-refresh'>&nbsp;</span><a href="/ui/wallet" style="color: #000;">Wallet</a> |
			<a href="/ui/my-teams">Teams</a>
		</div>
	</div>
	<div id='helpPrompt' data-dropdown='helpMenu' data-options='is_hover:true; hover_timeout: 5000'>Help/FAQ</div>	
	<ul id='helpMenu' class='f-dropdown alignRight' data-dropdown-content>
		<li><a href='/ui/home-faq'>FAQ</a></li>
		<li>Tutorial (work in progress)</li>
		<li><a href='https://github.com/siosonel/tatag-ui/issues'>Feature Requests, Bugs</a></li>
		<li><a href='https://tatag.cc/api/ref/docs.html'>API Documentation</a></li>
		<li><a href='https://github.com/siosonel/tatag-api/'>API source code</a></li>
		<li><a href='https://github.com/siosonel/tatag-ui/'>Wallet source code</a></li>
	</ul> 
	
	<div id='viewTypeDiv' class='row'>		
		<button id='budgetsViewPrompt' class='small-4 tiny'>Budgets</button>
		<button id='ordersViewPrompt' class='small-4 tiny'>Orders</button>
		<button id='itemizedViewPrompt' class='small-4 tiny'>Itemized</button>
	</div>
	
	<div id='mainWrapper'>	
		<div class="row" id='accountsWrapper'></div>
		<div class="row" id='recordsWrapper'></div>
		<div class="row" id='relaysWrapper'></div>
		
		<div class="row" id='ordersWrapper'>
		<br />Under construction: This view will show promotional items that you paid for. A toggle will allow you to view your team's promo items that others have paid for.
		</div>
		
		<div class="row" id='itemizedWrapper'>
		<br />Under construction: This view will show your total expenses itemized by purchase or donation type.
		</div>
		
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
						<label>Recipient Token<input type='text' id='txn-from' value='' /></label>
					</div>
					<div class='columns small-8' id='txnToDiv'>
						<label>Recipient Token<input type='text' id='txn-to' value='' /></label>
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
			<button id='txn-cancel'>Cancel</button>
		</div>
				
		<div id='relayInfo'></div>
		
		<a class="close-reveal-modal">×</a>
	</div>
	
	<div id='editModal' class="reveal-modal medium" style='min-height:50vh; top:30px;' data-reveal>
		<div id='editBudget'>		
			<h4 id='edit-title'></h4>
			<form>
				<div class='row'>
					<div class='columns small-12'>
						<label>alias<input type='text' id='edit-alias' value='' /></label>
					</div>
				</div>
				<div class='row'>
					<div class='columns small-12'>
						<label for='edit-limkey' style='display: inline;'>Recipient token <span id='editRelayId'></span>-</label>
						<input type='text' id='edit-limkey' value='' style='display: inline; width: 30%'/>
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
						<label>Recipient token for
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
					<div class='columns small-4'>
						<label>Total<input type='text' id='editRelay-by_all_limit' value='25' /></label>
					</div>
					<div class='columns small-4'>
						<label>By brand<input type='text' id='editRelay-by_brand_limit' value='5' /></label>
					</div>
					<div class='columns small-4'>
						<label>By user<input type='text' id='editRelay-by_user_limit' value='2' /></label>
					</div>
				</div>
				<div class='row'>
					<div class='columns small-8'>
						<label for='editRelay-by_user_wait'>Before reusing, a user must wait (in hours)</label>
					</div>				
					<div class='columns small-4'>
						<input type='text' id='editRelay-by_user_wait' value='24' />
					</div>
				</div>
			</form>
			<button id='editRelay-submit'>Submit</button>&nbsp;
			<button id='editRelay-cancel'>Cancel</button>
		</div>
		
		<div id='editRecord'>
			<p id='editRecordConfirm'></p>
			<input type='hidden' id='edit-status' value=''/>
			<button id='editRecord-submit'>Submit</button>&nbsp;
			<button id='editRecord-cancel'>Cancel</button>
		</div>
		
		<a class="close-reveal-modal">×</a>
	</div>
	

	<script src="/ui/bower_components/jquery/dist/jquery.min.js"></script>
	<script src="/ui/bower_components/q/q.js"></script>	
	<script src="/ui/bower_components/foundation/js/foundation.min.js"></script>
	<script src="/ui/bower_components/foundation/js/foundation/foundation.reveal.js"></script>
	<script src="/ui/bower_components/foundation/js/foundation/foundation.dropdown.js"></script>
	
	<script src="/ui/js/phlatSimple.js"></script>
	<script src="/ui/js/phlatDriver.js"></script>
	
	<script src="/ui/js/walletMain.js"></script>
	<script src="/ui/js/walletBudgets.js"></script>
	<script src="/ui/js/walletRecords.js"></script>
	<script src="/ui/js/walletTxn.js"></script>
	<script src="/ui/js/walletEdit.js"></script>
	<script src="/ui/js/walletRelays.js"></script>
	<script src="/ui/js/walletOrders.js"></script>
	<script src="/ui/js/walletItemized.js"></script>
	<script>
		var app = walletMain(<?php echo '{"userid":"'.$_SESSION['TOKEN_ID'].'","pass":"'.$_SESSION['TOKEN_VAL'].'", "baseURL": "'. TATAG_DOMAIN .'"}'; ?>);
	</script>
	
	<?php include "me.php" ?>
</body>
</html>