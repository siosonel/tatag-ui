<?php

$handler = trim($_GET['_url'], " \/\\\t\n\r\0\x0B");
include "$handler.php";
