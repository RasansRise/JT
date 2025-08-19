<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Variables
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $tel = trim($_POST['tel']);
    $message = trim($_POST['message']);

    // Email validation
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        
		// Prevent header injection
        $pattern = "/(content-type|bcc:|cc:|to:)/i";
        if (preg_match($pattern, $name) || preg_match($pattern, $email) || preg_match($pattern, $message)) {
            exit("Invalid input");
        }

        // إعدادات الإيميل
        $to = "info@jt.com.sa";  // Replace with your email
        $subject = "New Contact Form Message from $name";
        
        $body = "
        <strong>Name:</strong> $name <br>
        <strong>Email:</strong> $email <br>
        <strong>Phone:</strong> $tel <br><br>
        <strong>Message:</strong> <br>$message
        ";

        $headers = "From: $name <$email>\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8\r\n";

        // Send email
        if (mail($to, $subject, $body, $headers)) {
            echo "success";
        } else {
            echo "error";
        }
    } else {
        echo "Invalid email";
    }
}
?>
