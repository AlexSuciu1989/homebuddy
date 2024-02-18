<?php
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");
include 'db-connect.php'; // Assuming this file contains the database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dataRetrieved = new stdClass();

    // Assuming $eventDataObj is supposed to be the JSON data received in the POST request
    $recipeObject = file_get_contents('php://input');
    $jsonData = json_decode($recipeObject, true);

    if ($jsonData === null) {
        echo "Error decoding JSON data";
        exit;
    }

    $title = $jsonData['title']; // 'eventdate' should match the key in your JSON data
    $category = $jsonData['category']; // 'addedevent' should match the key in your JSON data
    $dificulty = $jsonData['dificulty']; // 'user' should match the key in your JSON data
    $recipe = $jsonData['recipe'];
    $image = $jsonData['image'];
    $user = $jsonData['user'];
    $nowdate = date('Y-m-d');
$sql = "INSERT INTO retete (nowdate, titlu, categorie, dificultate, ingrediente, uploadedfile, user) VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = mysqli_prepare($conn, $sql);

// Bind parameters
mysqli_stmt_bind_param($stmt, "sssssss", $nowdate, $title, $category, $dificulty, $recipe, $image, $user);

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
