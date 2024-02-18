<?php
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");
include 'db-connect.php'; // Assuming this file contains the database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dataRetrieved = new stdClass();

    // Assuming $eventDataObj is supposed to be the JSON data received in the POST request
    $eventDataObj = file_get_contents('php://input');
    $jsonData = json_decode($eventDataObj, true);

    if ($jsonData === null) {
        echo "Error decoding JSON data";
        exit;
    }

    $eventdate = $jsonData['eventdate']; // 'eventdate' should match the key in your JSON data
    $addedevent = $jsonData['addedevent']; // 'addedevent' should match the key in your JSON data
    $user = $jsonData['user']; // 'user' should match the key in your JSON data

    $sql = "INSERT INTO agenda (eventdate, addedevent, username) VALUES (?, ?, ?)";

    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "sss", $eventdate, $addedevent, $user);

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
