<?php
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");
include 'db-connect.php'; // Assuming this file contains the database connection

if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $dataRetrieved = new stdClass();

    // Assuming $eventDataObj is supposed to be the JSON data received in the POST request
    $clickedItemID = file_get_contents('php://input');
    $jsonData = json_decode($clickedItemID, true);

    if ($jsonData === null) {
        echo "Error decoding JSON data";
        exit;
    }

    $eventID = $jsonData; // 'eventdate' should match the key in your JSON data

    $sql = "DELETE FROM agenda WHERE id = ?";

    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $eventID);

    if (mysqli_stmt_execute($stmt)) {
        echo "Event deleted successfully";
    } else {
        echo "Error deleting event: " . mysqli_error($conn);
    }

    mysqli_stmt_close($stmt);
} else {
    echo "Invalid request method";
}

mysqli_close($conn);
?>
