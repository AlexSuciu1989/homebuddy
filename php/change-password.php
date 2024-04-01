<?php
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");
include 'db-connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $loginInfo = file_get_contents('php://input');
    $jsonData = json_decode($loginInfo, true);

    if ($jsonData === null) {
        $response = array("error" => "Error decoding JSON data");
        echo json_encode($response);
        exit;
    }

    $user = $jsonData['user'];
    $pass = $jsonData['pass'];

    $sql = "SELECT * FROM logintable WHERE account = ?";
    
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $user);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($result)) {
        if (password_verify($pass, $row['pass'])) {
            $response = array("message" => "Login successful");
            echo json_encode($response);
        } else {
            $response = array("error" => "Invalid password");
            echo json_encode($response);
        }
    }

    mysqli_stmt_close($stmt);
}

mysqli_close($conn);
?>
