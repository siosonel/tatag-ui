<?php 
require_once "config.php";

$time = time();
$expiration = $time + 5400;

session_start(); 
if (isset($_GET['clearSession']) OR isset($_GET['logout']) OR isset($_GET['provider'])) $_SESSION['TOKEN_ID']=0;
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
		$_SESSION['TOKEN_EXP'] = $expiration;
	} //else {print_r($data); exit();}
}


$handler = trim($_GET['_url'], " \/\\\t\n\r\0\x0B");

if (!$handler OR strpos($handler,'home')!==false) $handler='home'; 	
else if (strpos($handler,'wallet')!==false OR strpos($handler,'pay')!==false) $handler='wallet';

if (((isset($_GET['login']) AND $_GET['login']) 
		OR $handler != 'home'
	) && (
	!isset($_SESSION) 
	OR !$_SESSION['TOKEN_ID']
	OR !$_SESSION['TOKEN_VAL']
	OR $time > $_SESSION['TOKEN_EXP']
)) {
	require_once "common.php";
	
	$data = request(TATAG_DOMAIN ."/token", "POST", new stdClass()); 
	$token_id = $data[0]->token_id;
	$otk = $data[0]->otk;
		
	$nextParams = array();
	if (isset($_GET['to'])) $nextParams[] = 'to='. $_GET['to'];
	if (isset($_GET['amount'])) $nextParams[] = 'amount='. $_GET['amount'];
	if (isset($_GET['note'])) $nextParams[] = 'note='. $_GET['note'];
	$nextParams = implode("&", $nextParams);
	
	$next = urlencode(UI_DOMAIN."/$handler?$nextParams");
	$location = TATAG_DOMAIN ."/login.php?token_id=$token_id&otk=$otk";
	$provider = isset($_GET['provider']) ? $_GET['provider'] : ''; //exit($next);
	
	//rely on tatag api to list all login providers, instead of assuming which ones are allowed
	header("location: ". TATAG_DOMAIN ."/login.php?token_id=$token_id&otk=$otk&next=$next");
}
else {
	$_SESSION['TOKEN_EXP'] = $expiration; 
	include "$handler.php";
}


