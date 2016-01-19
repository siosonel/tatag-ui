<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>T-React ui</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-dom.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script type="text/javascript" src="/node_modules/q/q.js"></script>
	<script type="text/javascript" src="/ui/js/phlatSimple.js"></script>
	<script type="text/javascript" src="/ui/js/phlatDriver.js"></script>
	
	<style>
		.holding {
			margin: 1rem;
			padding: 1rem;
			background-color: #ececec;
		}
	</style>	
</head>
<body>	
	<div id="container"></div>
	
	<script type="text/babel" src="/ui/js/components/Editable.js"></script>
	<script type="text/babel" src="/ui/js/components/MyHoldings.js"></script>
	<script type="text/babel" src="/ui/js/components/App.js"></script>
	
	<script>
		function errHandler(err) {
			if (0 && err.message.search("Unauthorized")===0) main.me.modal();
			else console.log(err.message);
		}
	
		var api = phlatSimple({
			'userid': 21, 
			'pass': 'pass2',
			'baseURL': '/api/'
		});			
	</script>
</body>
</html>