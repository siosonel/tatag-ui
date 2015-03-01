<!DOCTYPE html>
<html>
<head>
	<title>Login</title>	
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="/common2/lib/foundation-5.3.3/css/foundation.min.css">
	<link rel="stylesheet" href="/common2/lib/foundation-5.3.3/icons/foundation-icons.css">
	<style>
		body {
			background: #fff;
			color: #222;
			padding: 0;
			margin: 0;
			font-family: "Helvetica Neue","Helvetica",Helvetica,Arial,sans-serif;
			font-weight: normal;
			font-style: normal;
			line-height: 150%;
			position: relative;
			cursor: default;
			text-align: center;
			background-color: #ececec;
		}	
	</style>
</head>
<body>
	<br /><br />
	<h2>Login using</h2>
	<p>
		<a href='<?php echo "$location&provider=gp&next=$next"; ?>'>
			<span class='fi-social-google-plus large' style='font-size: 30px; color: #dd4b39;'>&nbsp;&nbsp;</span>
		</a>
		<a href='<?php echo "$location&provider=fb&next=$next"; ?>'>
			<span class='fi-social-facebook large' style='font-size: 30px; color: #3b5998;'>&nbsp;&nbsp;</span>
		</a>
		<a href='<?php echo "$location&provider=tw&next=$next"; ?>'>
			<span class='fi-social-twitter large' style='font-size: 30px; color:#55acee;'>&nbsp;&nbsp;</span>
		</a>
	</p>
</body>
</html>