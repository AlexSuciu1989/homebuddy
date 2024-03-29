<?php
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");
include 'db-connect.php'; // Assuming this file contains the database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dataRetrieved = new stdClass();

    // Assuming $eventDataObj is supposed to be the JSON data received in the POST request
    $toast = file_get_contents('php://input');
    $jsonData = json_decode($toast, true);

    if ($jsonData === null) {
        echo "Error decoding JSON data";
        exit;
    }

    $toastContent = $jsonData['content']; // 'eventdate' should match the key in your JSON data
    $dateTime = $jsonData['date']; // 'addedevent' should match the key in your JSON data
    $userName = $jsonData['user']; // 'user' should match the key in your JSON data
    $familyMember = $jsonData['member'];

$sql = "INSERT INTO toasts (username, member, nowdatetime, toast) VALUES (?, ?, ?, ?)";

$stmt = mysqli_prepare($conn, $sql);

// Bind parameters
mysqli_stmt_bind_param($stmt, "ssss", $userName, $familyMember, $dateTime, $toastContent);

    if (mysqli_stmt_execute($stmt)) {
        echo "Event added successfully";
    } else {
        echo "Error adding event: " . mysqli_error($conn);
    }

    mysqli_stmt_close($stmt);
} else {
    echo "Invalid request method";
}

mysqli_close($conn);
?>
