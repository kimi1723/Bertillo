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
    $mail->SMTPDebug = SMTP::DEBUG_OFF;                   
    $mail->isSMTP();                                        
    $mail->Host       = 'smtp.gmail.com ';                    
    $mail->SMTPAuth   = true;                                  
    $mail->Username   = 'testmailphp98@gmail.com';                   
    $mail->Password   = 'TestAs#@s!@aH';                               
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            
    $mail->SMTPAuth = true;
    $mail->AuthType = 'XOAUTH2';
    $mail->Port       = 465;                                    

    $email = 'testmailphp98@gmail.com';
    $clientId = '703730296199-kaunhgu3e0od4fa9lk2qme5f8n0chafa.apps.googleusercontent.com';
    $clientSecret = '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';
    $refreshToken = '1//0cUmvEcBpUxUKCgYIARAAGAwSNwF-L9Ir15xQdA2Uwvcj_OJuPSEL2xR6e1TJ7PnBhJVR5bCAuPFIwAEv909Nt5Po8pDe5mWVDqU';

    $provider = new Google(
      [
          'clientId' => $clientId,
          'clientSecret' => $clientSecret,
      ]
  );
  $mail->setOAuth(
    new OAuth(
        [
            'provider' => $provider,
            'clientId' => $clientId,
            'clientSecret' => $clientSecret,
            'refreshToken' => $refreshToken,
            'userName' => $email,
        ]
    )
);
    $mail->setFrom('biuro@bertillo.pl', 'Bertillo.pl');
    $mail->addAddress('biuro@bertillo.pl');              

    $data = json_decode(file_get_contents("php://input"), true);

    $mail->CharSet = "UTF-8";
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Wiadomość ze strony Bertillo.pl' ;
    $mail->Body    = "<b>" . 'Imię: ' . "</b>" . $data["userName"] . "<br>" . "<b>" .'E-mail: ' .  "</b>" . $data["userEmail"] . "<br>" . "<b>" ."Nr. tel: " .  "</b>" . $data["userTel"] . "<br>" ."<b>" . "Wiadomość: " .  "</b>" . $data["userMsg"] ;
    $mail->AltBody = "<b>" . 'Imię: ' . "</b>" . $data["userName"] . "<br>" . "<b>" .'E-mail: ' .  "</b>" . $data["userEmail"] . "<br>" . "<b>" ."Nr. tel: " .  "</b>" . $data["userTel"] . "<br>" ."<b>" . "Wiadomość: " .  "</b>" . $data["userMsg"] ;

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>