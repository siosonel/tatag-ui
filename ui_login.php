<!DOCTYPE html>
<html>
<head>
	<title>Login</title>	
	<link rel="icon" type="image/png" href="css/logo5.png">
	
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
		
		#wrapper {
			background-color:#fff;
			margin-top: 30px;
			width: 80%;
			padding: 30px 10px 10px 10px;
			margin: 50px auto;
		}
	</style>
</head>
<body>
	<div id='wrapper'>	
		<h2>Login using</h2>
		<p style='padding-left: 20px;'>
			<a href='<?php echo "$location&provider=gp&next=$next"; ?>'>
				<span class='fi-social-google-plus large' style='font-size: 49px; color: #dd4b39;'>&nbsp;&nbsp;</span>
			</a>
			<a href='<?php echo "$location&provider=fb&next=$next"; ?>'>
				<span class='fi-social-facebook large' style='font-size: 50px; color: #3b5998;'>&nbsp;&nbsp;</span>
			</a>
			<a href='<?php echo "$location&provider=tw&next=$next"; ?>'>
				<span class='fi-social-twitter large' style='font-size: 50px; color:#55acee;'>&nbsp;&nbsp;</span>
			</a>
			<span><br />-OR-<br /></span>
			<span>SMS text your email address to: <br /></span>
			<a href='sms:2564854476'>(256) 485-4476</a>
		</p>
	</div>
</body>
</html>