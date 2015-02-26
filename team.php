<!DOCTYPE html>
<html>
<head>
	<title>Teams</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	
	<link rel="stylesheet" href="css/normalize.css">
	
	<script type="text/javascript" src="/common2/lib/jQuery/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="/node_modules/q/q.js"></script>
	<script type="text/javascript" src="js/apiClass.js"></script>
	
	<script src="/common2/lib/foundation-5.3.3/js/foundation/foundation.js"></script>
	<script src="/common2/lib/foundation-5.3.3/js/foundation/foundation.reveal.js"></script>
  <link rel="stylesheet" href="/common2/lib/foundation-5.3.3/css/foundation.min.css">
	<link rel="stylesheet" href="/common2/lib/foundation-5.3.3/icons/foundation-icons.css">
	
	<link rel="stylesheet" href="css/admin.css">
	
	<style></style>
</head>
<body>
	<div class="row">
		<div class='small-12' id='titleBar'><b>Teams</b></div>		
	</div>
	<div class='row'>
		<div id='mainWrapper' class='small-12 medium-9 large-6 columns '>	
			<div id='brandsWrapper'></div>
			<div id='aboutWrapper'></div>
			<div id='membersWrapper'></div>
			<div id='accountsWrapper'></div>
			<div id='throttlesWrapper'></div>
			<div id='recordsWrapper'>
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
		
		<div class='small-0 medium-3 large-6 columns' >&nbsp;</div>
	</div>
	
	<div id='acceptModal' class="reveal-modal medium formModal" style='min-height:50vh; top:30px;' data-reveal>
		<div id='acceptForm'>		
			<h4 id='accept-formTitle'></h4>
			<form>
				<div class='row'>
					<div class='columns small-12'>
						<label>Join on<input type='text' id='accept-joined' value='' /></label>
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
						<label>Revoke on<input type='text' id='revoke-revoked' value='' /></label>
					</div>
				</div>
			</form>
			<button id='revoke-submit'>Submit</button>&nbsp;
			<button id='revoke-cancel'>Cancel</button>
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
	<script src='js/adminForms.js'></script>
	<script>
		var app = teamMain(<?php echo '{"userid":"'.$_SESSION['TOKEN_ID'].'","pass":"'.$_SESSION['TOKEN_VAL'].'"}'; ?>);		
	</script>
</body>
</html>