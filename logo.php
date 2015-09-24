<?php
header('content-type: image/svg+xml');
$brand = (isset($_GET['brand']) AND $_GET['brand']) ? $_GET['brand'] : '{brand_name}';

if ($brand) echo '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';

?><svg version="1.1"
     baseProfile="full"
     width="100%" height="100%"
     xmlns="http://www.w3.org/2000/svg">

  <rect width="100%" height="100%" fill="rgba(100,150,200,0.5)" />

  <circle cx="50%" cy="50%" r="30%" fill="rgba(200,100,150,0.5)" />

  <text x="50%" y="50%" font-size="3rem" text-anchor="middle" fill="white"><?php echo $brand; ?></text>

</svg>