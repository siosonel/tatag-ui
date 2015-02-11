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
	
	<script src='js/adminMain.js'></script>
	<script src='js/adminBrands.js'></script>
	<script src='js/adminMembers.js'></script>
	<script src='js/adminAccounts.js'></script>
	<script src='js/adminBudgetIssued.js'></script>
	<script>
		var app = adminMain();		
	</script>
</body>
</html>