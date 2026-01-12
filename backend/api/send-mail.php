<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require __DIR__ . "/../vendor/autoload.php";

use Dotenv\Dotenv;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$dotenv = Dotenv::createImmutable(__DIR__ . "/..");
$dotenv->load();

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON"]);
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = $_ENV["SMTP_HOST"];
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV["SMTP_EMAIL"];
    $mail->Password = $_ENV["SMTP_PASSWORD"];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = (int) $_ENV["SMTP_PORT"];

    $mail->setFrom($_ENV["SMTP_EMAIL"], $_ENV["MAIL_FROM_NAME"]);
    $mail->addAddress($_ENV["MAIL_TO"]);
    $mail->addReplyTo($data["email"], $data["name"]);

    $mail->isHTML(true);
    $mail->Subject = "New Business Inquiry Received via HHBOS Website";
    $mail->Body = '
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>New Website Inquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#ffffff;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;padding:40px 0;">
  <tr>
    <td align="center">

      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#111;border-radius:10px;overflow:hidden;border:1px solid #222;">

        <!-- HEADER -->
        <tr>
          <td style="padding:24px 32px;background:linear-gradient(90deg,#ff6b1f,#ff914d);color:#ffffff;">
            <img src="https://via.placeholder.com/160x60?text=HHBOS" alt="HH Back Office Services" width="160" style="display:block;margin-bottom:10px;">
            <p style="margin:0;font-size:14px;opacity:0.95;">
              New Website Inquiry
            </p>
          </td>
        </tr>

        <!-- CONTENT -->
        <tr>
          <td style="padding:32px;color:#eaeaea;">
            <p style="margin:0 0 18px;font-size:15px;line-height:1.6;">
              You have received a new inquiry through the HH Back Office Services website.
              Please find the details below for your review and follow-up.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
              <tr>
                <td style="padding:8px 0;color:#aaa;width:120px;">Full Name</td>
                <td style="padding:8px 0;color:#fff;">' . htmlspecialchars($data["name"]) . '</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#aaa;">Email Address</td>
                <td style="padding:8px 0;color:#fff;">' . htmlspecialchars($data["email"]) . '</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#aaa;">Contact Number</td>
                <td style="padding:8px 0;color:#fff;">' . htmlspecialchars($data["phone"]) . '</td>
              </tr>
            </table>

            <!-- MESSAGE -->
            <div style="margin-top:22px;">
              <p style="margin:0 0 8px;color:#aaa;font-size:13px;">
                Message from the sender
              </p>
              <div style="padding:16px;background:#1a1a1a;border-radius:6px;color:#ffffff;font-size:14px;line-height:1.6;">
                ' . nl2br(htmlspecialchars($data["message"])) . '
              </div>
            </div>

            <!-- REPLY BUTTON -->
            <div style="margin-top:28px;">
              <a href="mailto:' . htmlspecialchars($data["email"]) . '" 
                 style="display:inline-block;padding:12px 24px;
                        background:#ff6b1f;color:#ffffff;
                        text-decoration:none;border-radius:6px;
                        font-size:14px;font-weight:600;">
                Reply to Inquiry
              </a>
            </div>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="padding:18px 32px;background-color:#0d0d0d;color:#888;font-size:12px;text-align:center;">
            © ' . date("Y") . ' HH Back Office Services.<br>
            This message was received from the official website contact form.
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
</body>
</html>
';

    $mail->send();
    echo json_encode(["success" => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => $mail->ErrorInfo
    ]);
}

