<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\OAuth;
use League\OAuth2\Client\Provider\Google;




date_default_timezone_set('Etc/UTC');

require './vendor/autoload.php';
require './vendor/PHPMailer/PHPMailer/src/Exception.php';
require './vendor/PHPMailer/PHPMailer/src/PHPMailer.php';
require './vendor/PHPMailer/PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    // $mail->SMTPDebug = SMTP::DEBUG_OFF;
    $mail->isSMTP();
    $mail->Host       = 'ssl://smtp.gmail.com ';
    $mail->SMTPAuth   = false;
    $mail->Username   = 'testmailphp98@gmail.com';
    $mail->Password   = 'TestAs#@s!@aH';
    // $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->AuthType = 'XOAUTH2';
    $mail->Port       = 465;

    $email = 'testmailphp98@gmail.com';




    $mail->setFrom('hacks@onet.pl', 'Bertillo.pl');
    $mail->addAddress('hacks@onet.pl');

    $data = json_decode(file_get_contents("php://input"), true);

    $mail->CharSet = "UTF-8";
    $mail->isHTML(true);
    $mail->Subject = 'Wiadomość ze strony Bertillo.pl' ;
    $mail->Body    = "<b>" . 'Imię: ' . "</b>" . $data["userName"] . "<br>" . "<b>" .'E-mail: ' .  "</b>" . $data["userEmail"] . "<br>" . "<b>" ."Nr. tel: " .  "</b>" . $data["userTel"] . "<br>" ."<b>" . "Wiadomość: " .  "</b>" . $data["userMsg"] ;
    $mail->AltBody = "<b>" . 'Imię: ' . "</b>" . $data["userName"] . "<br>" . "<b>" .'E-mail: ' .  "</b>" . $data["userEmail"] . "<br>" . "<b>" ."Nr. tel: " .  "</b>" . $data["userTel"] . "<br>" ."<b>" . "Wiadomość: " .  "</b>" . $data["userMsg"] ;

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>