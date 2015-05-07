<?php
define('SITE_PATH', '../b2b.nexsense.com');
define('DOMAIN', 'b2b.nexsense.com');
define('SECURE_URL', 'https://b2b.nexsense.com');
define('BASE_URL', '//b2b.nexsense.com');
define('AJAX_URL', '//b2b.nexsense.com');

function __autoload($class_name) {
   include 'model/' . $class_name . '.php';
}
