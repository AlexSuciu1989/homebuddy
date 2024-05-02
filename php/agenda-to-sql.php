<?php
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");
include 'db-connect.php'; // Assuming this file contains the database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dataRetrieved = new stdClass();

    // Assuming $eventDataArray is supposed to be the JSON array received in the POST request
    $eventDataArray = json_decode(file_get_contents('php://input'), true);

    if ($eventDataArray === null || !is_array($eventDataArray)) {
        echo "Error decoding JSON data";
        exit;
    }

    foreach ($eventDataArray as $eventData) {
        $eventdate = $eventData['eventdate']; // 'eventdate' should match the key in your JSON data
        $addedevent = $eventData['addedevent']; // 'addedevent' should match the key in your JSON data
        $user = $eventData['user']; // 'user' should match the key in your JSON data
        $repeating = $eventData['repeating'];
        $responsible = $eventData['responsible'];
        $tags = $eventData['tags'];
        $unit = $eventData['unit'];
        $enddate = $eventData['endRepetition'];

        $sql = "INSERT INTO agenda (eventdate, addedevent, username, recurenta, unitate, tagevent, membru, enddate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "ssssssss", $eventdate, $addedevent, $user, $repeating, $unit, $tags, $responsible, $enddate);

        if (mysqli_stmt_execute($stmt)) {
            echo "Event added successfully";
        } else {
            echo "Error adding event: " . mysqli_error($conn);
        }

        mysqli_stmt_close($stmt);
    }
} else {
    echo "Invalid request method";
}

mysqli_close($conn);
?>
