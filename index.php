<?php
if (isset($_GET['token_id']) AND is_numeric($_GET['token_id']) AND isset($_GET['otk'])) {
	include_once("common.php");
	
	$domain = "http://localhost/tatag/token/". $_GET['token_id'] ."?otk=". $_GET['otk'];
	$data = request($domain, "POST", new stdClass());
	
	if (is_array($data)) { 
		session_start(); 
		$_SESSION['TOKEN_ID'] = 'token-'.$data[0]->token_id;
		$_SESSION['TOKEN_VAL'] = $data[0]->token_val;
	} 
} //echo '{"userid":'.$_SESSION['TOKEN_ID'].',"pwd":"'.$_SESSION['TOKEN_VAL'].'"}'; exit();


if (!$_SESSION['TOKEN_ID']) {
	include_once("common.php");
	
	$domain = "http://localhost/tatag/token";
	$data = request($domain, "POST", array()); 
	$token_id = $data[0]->token_id;
	$otk = $data[0]->otk; echo "?token_id=$token_id&otk=$otk&next=". urlencode('http://localhost/ui/');
	
	//header("location: http://localhost/tatag/login.php?token_id=$token_id&otk=$otk&next=". urlencode('http://localhost/ui/'));
}
else {		
	$handler = trim($_GET['_url'], " \/\\\t\n\r\0\x0B");
	include "$handler.php";
}


