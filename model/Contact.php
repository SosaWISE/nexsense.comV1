<?php
class Contact {

    /*** Sends a message to Inside Sales from a contact form ***/
	static function schedule_installation($firstname, $lastname, $email, $phone, $zip, $equipmentlist, $contractlength, $downpayment, $monthlypayment, $duetoday) {

        $headers .= "Organization: Nexsense" . "\r\n";
        $headers .= "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type: text/plain; charset=iso-8859-1" . "\r\n";
        $headers .= "X-Priority: 3" . "\r\n";
        $headers .= "X-Mailer: PHP". phpversion() ."\r\n";
        if ($email) {
            $headers .= "From: $email" . "\r\n";
            $headers .= "Reply-To: no-reply@nexsense.com" . "\r\n";
        }
        else {
            $headers .= "From: no-reply@nexsense.com" . "\r\n";
            $headers .= "Reply-To: no-reply@nexsense.com" . "\r\n";
        }
        $emailto = 'jjenne@nexsense.com, dfreitas@nexsense.com';
        $subject = "Nexsense.com Installation Request";

        // prepare email body text
        $body = "";
        $body .= "Name: $firstname $lastname\n";
        $body .= "Email: $email\n";
        $body .= "Phone: (" . substr($phone, 0, 3) . ") " . substr($phone, 3, 3) . "-" . substr($phone, 6) . "\n";
        $body .= "Zip: $zip\n";
        $body .= "\n\n";
        $body .= "The customer used the pick your price tool on nexsense.com and chose the following rates:\n";
        $body .= "Contract length: $contractlength months\n";
        $body .= "Downn payment: \$" . number_format($downpayment, 2) . "\n";
        $body .= "\nHis/her quote given online was:\n";
        $body .= "Monthly payment: \$" . number_format($monthlypayment, 2) . "\n";
        $body .= "Due today: \$" . number_format($duetoday, 2) . "\n\n";

        if ($equipmentlist) {
            $body .= "The customer chose the following equipment:\n\n";
            $points = 0;
            foreach ($equipmentlist as $item) {
                $body .= $item->qty . ' - ' . $item->name . "\n";
                $points += $item->points*$item->qty;
            }
            $body .= "\nTotal points: $points\n\n";
        }
        
        // send email
        $success = mail($emailto, $subject, $body, $headers);

        return $success;
	}



    /*** Sends a message from a contact form ***/
    static function send_message($name, $email, $department, $message, $age) {
        switch($email) {
            case 'sales':
                $emailto = 'sales@nexsense.com, dfreitas@nexsense.com, bcarter@nexsense.com';
                break;
            case 'billing':
                $emailto = 'billing@nexsense.com, bcarter@nexsense.com';
                break;
            case 'advertising':
                $emailto = 'jjenne@nexsense.com';
                break;
            case 'support':
            default:
                $emailto = 'support@nexsense.com';
                break;
        }


        $headers .= "Organization: Nexsense" . "\r\n";
        $headers .= "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type: text/plain; charset=iso-8859-1" . "\r\n";
        $headers .= "X-Priority: 3" . "\r\n";
        $headers .= "X-Mailer: PHP". phpversion() ."\r\n";
        $headers .= "From: no-reply@nexsense.com" . "\r\n";
        $headers .= "Reply-To: no-reply@nexsense.com" . "\r\n";

        $subject = "Nexsense.com Contact Form";

        $errors = false;

        // honeypot
        if (!empty($age))
            $errors = true;

        // name
        if (!empty($name))
            $name = trim($name);
        else
            $errors = true;

        // email
        if (!empty($email))
            $email = trim($email);
        else
            $errors = true;

        if (!$errors) {

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
            $body .= "Message: ";
            $body .= $message;
            $body .= "\n";
            
            // send email 
            $success = mail($emailto, $subject, $body, $headers);
            return $success;
        }

        return false;

    }


    /*** Sends a referral to the sales team ***/
    static function submit_referral($referrer, $referral) {
        try {
            // Plain text email
            $headers .= "Organization: Nexsense" . "\r\n";
            $headers .= "Content-type: text/plain\r\n";
            $headers .= "From: no-reply@nexsense.com" . "\r\n";
            $headers .= "Reply-To: no-reply@nexsense.com" . "\r\n";

            $emailto = 'jjenne@nexsense.com';
            $subject = "New referral from nexsense.com";


            $body = '';
            $body .= "Guess what!\r\n\r\n";
            $body .= "You've received an actual referral from nexsense.com!\r\n\r\n";
            $body .= "REFERRER:\r\n";

            if ($referrer->customerId)
                $body .= "Customer ID: " . $referrer->customerId . "\r\n";
            else {
                $body .= $referrer->firstName . " " . $referrer->lastName . "\r\n";
                $body .= $referrer->address . "\r\n";
                if ($referrer->address2)
                    $body .= $referrer->address2 . "\r\n";
                $body .= $referrer->city . ', ' . $referrer->state . ' ' . $referrer->zip . "\r\n";
            }

            $body .= "\r\nREFERRED LEAD\r\n";
            $body .= $referral->firstName . " " . $referral->lastName . "\r\n";
            $body .= $referral->address . "\r\n";
            if ($referral->address2)
                $body .= $referral->address2 . "\r\n";
            $body .= $referral->city . ', ' . $referral->state . ' ' . $referral->zip . "\r\n\r\n";
            $body .= "Email: " . $referral->email . "\r\n";
            $body .= "Phone: " . $referral->phone . "\r\n";
            $body .= "\r\n";


            // send email
            $success = mail($emailto, $subject, $body, $headers);

            if ($success)
                $response = true;
            else {
                $error = error_get_last();
                $response = "mail() didn't send: " . $error['message'];
            }
        }
        catch (Exception $ex) {
            $response = $ex->getMessage();
        }

        return $response;
    }    


    /*** Sends an application for a sales position ***/
    static function submit_application($firstName, $lastName, $email, $phone, $resume, $zip, $sellYourself, $position, $office, $workHistory, $salesExperience) {

        try {
            date_default_timezone_set('America/Denver');

            // Plain text email with attachment
            $boundary = 'NXS-'.md5(date('r', time()));

            $headers .= "Organization: Nexsense" . "\r\n";
            $headers .= "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type: multipart/mixed; boundary=\"$boundary\"\r\n";
            $headers .= "From: no-reply@nexsense.com" . "\r\n";
            $headers .= "Reply-To: no-reply@nexsense.com" . "\r\n";

            $emailto = 'directsales@nexsense.com, bneiser@nexsense.com, jjenne@nexsense.com';
            $subject = "Sales Rep Application from Nexsense.com";

            $body = '';

            // plain text section
            $body .= "--$boundary\r\n";
            $body .= "Content-Type: text/plain; charset=\"iso-8859-1\"\r\n";
            $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";

            if (strtoupper($office) == 'FL-TAMPA') {
                $body .= "H,\r\n\r\n";
                $emailto .= ", htravlee@nexsense.com";
            }
            else
                $body .= "Hey Ben,\r\n\r\n";

            if ($position == 'sales-mgr')
                $body .= "You've received another application for a sales manager position from Nexsense.com.\r\n\r\n";
            else
                $body .= "You've received another application from a sales rep candidate on Nexsense.com.\r\n\r\n";
            $body .= "Name: " . $firstName . " " . $lastName . "\r\n";
            $body .= "Email: " . $email . "\r\n";
            $body .= "Phone: " . $phone . "\r\n";
            $body .= "Zip Code: " . $zip . "\r\n";
            $body .= "Area: " . $office . "\r\n";
            $body .= "\r\n";

            if (!empty($salesExperience)) {
                $body .= "This candidate doesn't have previous home security sales experience, but has listed some other experience as follows:\r\n";
                $body .= $salesExperience . "\r\n\r\n";
            }

            if (!empty($workHistory)) {
                $body .= "Previous home security experience:\r\n";
                for ($i=0; $i<count($workHistory); $i++) {
                    $body .= " - Worked for " . $workHistory[$i]->companyName . " for " . $workHistory[$i]->yearsWorked . " years and sold " . $workHistory[$i]->annualSales . " accounts each year\r\n";
                }
                $body .= "\r\n";
            }

            if (!empty($sellYourself)) {
                $body .= "Here's the candidate's 140-character pitch:\r\n";
                $body .= $sellYourself . "\r\n\r\n";
            }


            //$debugmsg = "checking for attachments:\r\n";

            // attachment
            if (!empty($resume)) {
                $p1 = strpos($resume, 'data:')+5;
                $p2 = strpos($resume, ';base64');

                //$contentType = null;
                $contentType = substr($resume, $p1, $p2 - $p1);

                //if (count($matches) > 1) {
                if ($contentType) {
                    $debugmsg .= "Adding attachment\r\n";

                    //$contentType = $matches[1];
                    $extension = substr($contentType, strpos($contentType, '/')+1);
                    $attachment = substr($resume, strpos($resume, 'base64,')+7);
                    $filename = $firstName . $lastName . '-resume.' . $extension;

                    $attachment = chunk_split($attachment);

                    $body .= "--$boundary\r\n";
                    $body .= "Content-Type: $contentType; name=\"$filename\"\r\n";
                    $body .= "Content-Description: $filename\r\n";
                    $body .= "Content-Disposition: attachment; filename=\"$filename\"\r\n";
                    $body .= "Content-Transfer-Encoding: base64\r\n\r\n";

                    $body .= $attachment;
                    $body .= "\r\n\r\n";
                }
                else
                    $debugmsg .= "Couldn't find base64 header\r\n";
            }
            else
                $debugmsg .= "No attachment found\r\n" . $resume . "\r\n";

            $body .= "--$boundary--";


            // send email
            $success = mail($emailto, $subject, $body, $headers);

            if ($success)
                $response = true; //array('status'=>1, 'message'=>'mail successfully sent'/*, 'debug'=>$debugmsg*/);
            else {
                $error = error_get_last();
                $response = $error['message'];//array('status'=>0, 'message'=>"mail() didn't send: " . $error['message']/*, 'debug'=>$debugmsg*/);
            }
        }
        catch (Exception $ex) {
            $response = $ex->getMessage(); //array('status'=>0, 'message'=>$ex->getMessage());
        }        

        return $response;
    }
}