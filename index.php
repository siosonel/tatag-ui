<?php 
session_start(); 
if (isset($_GET['clearSession']) OR isset($_GET['provider'])) $_SESSION['TOKEN_ID']=0;
if (isset($_GET['clearSession'])) exit();

if (isset($_GET['token_id']) AND is_numeric($_GET['token_id']) AND isset($_GET['otk'])) {
	include_once("common.php");
	$_SESSION['TOKEN_ID'] = 0;
	$_SESSION['TOKEN_EXP'] = 0;
	
	$domain = "http://localhost/tatag/token/". $_GET['token_id'] ."?otk=". $_GET['otk'];
	$data = request($domain, "POST", new stdClass());
	
	if (is_array($data) AND $data[0]) { 
		$_SESSION['TOKEN_ID'] = 'token-'.$data[0]->token_id;
		$_SESSION['TOKEN_VAL'] = $data[0]->token_val;
		$_SESSION['TOKEN_EXP'] = time() + 3600;
	} //else {print_r($data); exit();}
}


$handler = trim($_GET['_url'], " \/\\\t\n\r\0\x0B");
if (!$handler) $handler='wallet'; 	

if (
	!isset($_SESSION) 
	OR !$_SESSION['TOKEN_ID']
	OR !$_SESSION['TOKEN_VAL']
	OR time() > $_SESSION['TOKEN_EXP']
) {
	include_once("common.php");
	
	$domain = "http://localhost/tatag/token";
	$data = request($domain, "POST", new stdClass()); 
	$token_id = $data[0]->token_id;
	$otk = $data[0]->otk; 
	$next = urlencode("http://localhost/ui/$handler");
	$provider = isset($_GET['provider']) ? "&provider=". $_GET['provider'] : '';
	
	header("location: http://localhost/tatag/login.php?token_id=$token_id&otk=$otk". $provider ."&next=$next");
}
else {
	include "$handler.php";
}


