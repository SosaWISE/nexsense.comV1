<?php
define('SITE_PATH', '../nexsense.com');
define('DOMAIN', 'nexsense.com');
define('SECURE_URL', 'https://nexsense.com');
define('BASE_URL', '//nexsense.com');
define('AJAX_URL', '//nexsense.com');

function __autoload($class_name) {
   include 'model/' . $class_name . '.php';
}
