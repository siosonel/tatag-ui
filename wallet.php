<!DOCTYPE html>
<html>
<head>
	<title>Wallet</title>
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/wallet.css">
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
		<div class='large-12' id='titleBar'><b>Wallet</b></div>
	</div>
	<div id='mainWrapper'>	
		<div class="row" id='accountsWrapper'></div>
		<div class="row" id='recordsWrapper'></div>
	</div>	
	
	<div id='txnModal' class="reveal-modal medium" style='min-height:50vh; top:30px;' data-reveal>
		<div id='txnForm'>		
			<h4 id='txn-title'></h4>
			<form>
				<div class='row'>
					<div class='columns large-4 medium-4 small-4'>
						<label>from<input type='text' id='txn-from' value='' /></label>
					</div>
					<div class='columns large-4 medium-4 small-4'>
						<label>to<input type='text' id='txn-to' value='' /></label>
					</div>
					<div class='columns large-4 medium-4 small-4'>
						<label>amount<input type='text' id='txn-amount' value='' /></label>
					</div>
				</div>
				<div class='row'>
					<div class='columns large-12 medium-12 small-12'>
						<label>note<input type='text' id='txn-note' value='' /></label>
					</div>
				</div>
				<input type='hidden' id='txn-orig_record_id' value='' /> 
			</form>
			<button id='txn-submit'>Submit</button>
		</div>
				
		<div id='relayInfo'></div>
		
		<a class="close-reveal-modal">�</a>
	</div>
	
	<div id='editModal' class="reveal-modal medium" style='min-height:50vh; top:30px;' data-reveal>
		<div id='editForm'>		
			<h4 id='edit-title'></h4>
			<form>
				<div class='row'>
					<div class='columns large-8 medium-8 small-8'>
						<label>alias<input type='text' id='edit-alias' value='' /></label>
					</div>
					<div class='columns large-4 medium-4 small-4'>
						<label>token<input type='text' id='edit-limkey' value='' /></label>
					</div>
				</div>
			</form>
			<button id='edit-submit'>Submit</button>
		</div>
				
		<div id='editPrompt'>
			<p id='editRecordConfirm'></p>
			<input type='hidden' id='edit-status' value=''/>
			<button id='editRecord-submit'>Submit</button>&nbsp;
			<button id='editRecord-submit'>Cancel</button>
		</div>
		
		<a class="close-reveal-modal">�</a>
	</div>
	
	<script type="text/javascript" src="js/walletMain.js"></script>
	<script type="text/javascript" src="js/walletCards.js"></script>
	<script type="text/javascript" src="js/walletRecords.js"></script>
	<script type="text/javascript" src="js/walletTxn.js"></script>
	<script type="text/javascript" src="js/walletEdit.js"></script>
	<script>
		var app = walletMain();		
	</script>
</body>
</html>