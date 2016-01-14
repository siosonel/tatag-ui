<?php

function request($domain,$method,$data) {	
	$context=stream_context_create(array("http" => array(
		"method" => $method,
		"content" => json_encode($data), 
		"header" => "Content-type: application/json\nAuthorization: Basic ". base64_encode('consumer-'. CONSUMER_ID .":". CONSUMER_SECRET),
		"timeout"=>3, 
		"max_redirects"=>2
	)));
	
	$contents = file_get_contents($domain,0,$context);
	$data = json_decode($contents);
	return ($data ? $data->{'@graph'} : new stdClass());
}