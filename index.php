<?php 
require_once "config.php";

session_start(); 
if (isset($_GET['clearSession']) OR isset($_GET['provider'])) $_SESSION['TOKEN_ID']=0;
if (isset($_GET['clearSession'])) exit();
if (!isset($_SESSION['TOKEN_ID'])) $_SESSION['TOKEN_ID'] = 0;
if (!isset($_SESSION['TOKEN_EXP'])) $_SESSION['TOKEN_EXP'] = 0;
if (!isset($_SESSION['TOKEN_VAL'])) $_SESSION['TOKEN_VAL'] = 0;

if (isset($_GET['token_id']) AND is_numeric($_GET['token_id']) AND isset($_GET['otk'])) {
	include_once("common.php");
	$_SESSION['TOKEN_ID'] = 0;
	$_SESSION['TOKEN_EXP'] = 0;
	
	$domain = TATAG_DOMAIN ."/token/". $_GET['token_id'] ."?otk=". $_GET['otk'];
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
	require_once "common.php";
	
	$data = request(TATAG_DOMAIN ."/token", "POST", new stdClass()); 
	$token_id = $data[0]->token_id;
	$otk = $data[0]->otk;
		
	$nextParams = array();
	if (isset($_GET['to'])) $nextParams[] = 'to='. $_GET['to'];
	if (isset($_GET['amount'])) $nextParams[] = 'amount='. $_GET['amount'];
	$nextParams = implode("&", $nextParams);
	
	$next = urlencode(UI_DOMAIN."/$handler?$nextParams");
	$location = TATAG_DOMAIN ."/login.php?token_id=$token_id&otk=$otk";
	$provider = isset($_GET['provider']) ? $_GET['provider'] : ''; //exit($next);
	
	if (!$provider) include_once "ui_login.php";
	else header("location: ". TATAG_DOMAIN ."/login.php?token_id=$token_id&otk=$otk&provider=$provider&next=$next");
}
else {
	include "$handler.php";
}


