<?php
header("Access-Control-Allow-Methods: UPDATE");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");
include 'db-connect.php'; // Assuming this file contains the database connection

if ($_SERVER["REQUEST_METHOD"] == "UPDATE") {
    $dataRetrieved = new stdClass();

    $recipeObject = file_get_contents('php://input');
    $jsonData = json_decode($recipeObject, true);

    if ($jsonData === null) {
        echo "Error decoding JSON data";
        exit;
    }

    $recipeID = $jsonData["recipeID"]; // Assuming the key in your JSON data is 'itemID'
    $title = $jsonData['title']; // 'eventdate' should match the key in your JSON data
    $category = $jsonData['category']; // 'addedevent' should match the key in your JSON data
    $dificulty = $jsonData['dificulty']; // 'user' should match the key in your JSON data
    $recipe = $jsonData['recipe'];
    $user = $jsonData['user'];
    $nowdate = date('Y-m-d');
    $sql = "UPDATE retete SET nowdate=?, titlu=?, categorie=?, dificultate=?, ingrediente=? WHERE id=? AND user=?";

    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "sssssss", $nowdate, $title, $category, $dificulty, $recipe, $recipeID, $user);

    if (mysqli_stmt_execute($stmt)) {
        echo "Recipe updated successfully"; // Corrected the response message
    } else {
        echo "Error updating Recipe: " . mysqli_error($conn);
    }

    mysqli_stmt_close($stmt);
} else {
    echo "Invalid request method";
}

mysqli_close($conn);
?>
