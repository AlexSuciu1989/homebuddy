<?php
header("Access-Control-Allow-Methods: UPDATE");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");
include 'db-connect.php'; // Assuming this file contains the database connection

if ($_SERVER["REQUEST_METHOD"] == "UPDATE") {
    $dataRetrieved = new stdClass();

    // Assuming $itemObject is supposed to be the JSON data received in the POST request
    $itemObject = file_get_contents('php://input');
    $jsonData = json_decode($itemObject, true);

    if ($jsonData === null) {
        echo "Error decoding JSON data";
        exit;
    }

    $eventID = $jsonData["itemID"]; // Assuming the key in your JSON data is 'itemID'
    $eventStatus = $jsonData["itemStatus"]; // Assuming the key in your JSON data is 'itemStatus'

    $sql = "UPDATE agenda SET addedevent = ? WHERE id = ?";

    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ss", $eventStatus, $eventID);

    if (mysqli_stmt_execute($stmt)) {
        echo "Event updated successfully"; // Corrected the response message
    } else {
        echo "Error updating event: " . mysqli_error($conn);
    }

    mysqli_stmt_close($stmt);
} else {
    echo "Invalid request method";
}

mysqli_close($conn);
?>
