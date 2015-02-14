<!DOCTYPE html>
<html>
<head>
	<title>Teams</title>
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
		<div class='small-12 medium-9 large-6 columns' id='titleBar'><b>Teams</b></div>		
	</div>
	<div class='row'>
		<div id='mainWrapper' class='small-12 medium-9 large-6 columns '>	
			<div id='brandsWrapper'></div>
			<div id='aboutWrapper'></div>
			<div id='membersWrapper'></div>
			<div id='accountsWrapper'></div>
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
	
	<script src='js/teamMain.js'></script>
	<script src='js/teamBrands.js'></script>
	<script src='js/teamAbout.js'></script>
	<script src='js/teamMembers.js'></script>
	<script src='js/teamAccounts.js'></script>
	<script src='js/teamRecords.js'></script>
	<script>
		var app = teamMain();		
	</script>
</body>
</html>