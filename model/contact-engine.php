<?php

$headers .= "Organization: Nexsense" . "\r\n";
$headers .= "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type: text/plain; charset=iso-8859-1" . "\r\n";
$headers .= "X-Priority: 3" . "\r\n";
$headers .= "X-Mailer: PHP". phpversion() ."\r\n";
$headers .= "From: no-reply@nexsense.com" . "\r\n";
$headers .= "Reply-To: no-reply@nexsense.com" . "\r\n";

$emailto = Trim(stripslashes($_POST['department']));
$subject = "Nexsense.com Contact Form";

$errors = false;

// honeypot
if (!empty($_REQUEST['age'])) {
	$errors = true;
}

// name
if (!empty($_REQUEST['name'])) {
	$name = Trim(stripslashes($_POST['name']));
} elseif ((!empty($_REQUEST['firstname']) && !empty($_REQUEST['lastname']))) {
	$name = Trim(stripslashes($_POST['firstname'])) . " " . Trim(stripslashes($_POST['lastname']));
} else {
	$errors = true;
}

// email
if (!empty($_REQUEST['email'])) {
	$email = Trim(stripslashes($_POST['email'])); 
} else {
	$errors = true;
}

if (!$errors) {
	// optional fields
	$department = Trim(stripslashes($_POST['department']));
	$message = Trim(stripslashes($_POST['message']));
	$phone = Trim(stripslashes($_POST['phone']));
	$zip = Trim(stripslashes($_POST['zip']));

	// prepare email body text
	$body = "";
	$body .= "Name: ";
	$body .= $name;
	$body .= "\n";
	$body .= "Email: ";
	$body .= $email;
	$body .= "\n";
	$body .= "Department: ";
	$body .= $department;
	$body .= "\n";
	$body .= "Phone: ";
	$body .= $phone;
	$body .= "\n";
	$body .= "Zip: ";
	$body .= $zip;
	$body .= "\n";
	$body .= "Message: ";
	$body .= $message;
	$body .= "\n";
	
	// send email 
	$success = mail($emailto, $subject, $body, $headers);

	print "Nice";
} else {
	print "Error";
}

?>