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
		<div class='large-12' id='titleBar'><b>Admin</b></div>
	</div>
	<div id='mainWrapper'>	
		<div id='brandsWrapper'></div>
		<div id='membersWrapper'></div>
		<div id='accountsWrapper'></div>
		<div id='issuedWrapper'></div>		
	</div>	
	
	<div id='membersModal' class="reveal-modal medium formModal" style='min-height:50vh; top:30px;' data-reveal>
		<div id='membersForm'>		
			<h4>Edit Membership</h4>
			<form>
				<div class='row'>
					<div class='columns large-8 medium-8 small-8'>
						<label>Role<input type='text' id='members-role' value='' /></label>
					</div>
					<div class='columns large-4 medium-4 small-4'>
						<label>Hours per week<input type='text' id='members-hours' value='' /></label>
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
			<h4>Edit Account Information</h4>
			<form>
				<div class='row'>
					<div class='columns large-8 medium-8 small-8'>
						<label>Name<input type='text' id='accounts-name' value='' /></label>
					</div>
					<div class='columns large-4 medium-4 small-4'>
						<label>Permission<input type='text' id='accounts-authcode' value='' /></label>
					</div>
				</div>
			</form>
			<button id='accounts-submit'>Submit</button>&nbsp;
			<button id='accounts-cancel'>Cancel</button>
		</div>
		<a class="close-reveal-modal">×</a>
	</div>
	
	<script src='js/adminMain.js'></script>
	<script src='js/adminBrands.js'></script>
	<script src='js/adminMembers.js'></script>
	<script src='js/adminAccounts.js'></script>
	<script src='js/adminBudgetIssued.js'></script>
	<script src='js/adminForms.js'></script>
	<script>
		var app = adminMain();		
	</script>
</body>
</html>