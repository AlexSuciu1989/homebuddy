<?php
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");
include 'db-connect.php'; // Assuming this file contains the database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dataRetrieved = new stdClass();

    // Assuming $eventDataObj is supposed to be the JSON data received in the POST request
    $rowData = file_get_contents('php://input');
    $jsonData = json_decode($rowData, true);

    if ($jsonData === null) {
        echo "Error decoding JSON data";
        exit;
    }

    $date = $jsonData['date']; // 'eventdate' should match the key in your JSON data
    $amount = $jsonData['amount']; // 'addedevent' should match the key in your JSON data
    $description = $jsonData['description']; // 'user' should match the key in your JSON data
    $tag = $jsonData['tag'];
    $type = $jsonData['type'];
    $key = $jsonData['key'];
    $username = $jsonData['username'];

    $sql = "INSERT INTO budget (adddate, amount, tag, adddescription, addtype, addkey, username) VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "sssssss", $date, $amount, $tag, $description, $type, $key, $username);

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
