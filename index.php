<!DOCTYPE html>
<html>
<head>
	<title>Tatag UI</title>
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/ui.css">
	
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
	<div class="row" id='accountsWrapper'></div>
	<div id='txnForm' class="reveal-modal medium" style='min-height:50vh; top:30px;' data-reveal>
		<p id='txnFormContent'></p>
		<a class="close-reveal-modal">×</a>
	</div>

	<script type="text/javascript" src="js/ui.js"></script>
</body>
</html>