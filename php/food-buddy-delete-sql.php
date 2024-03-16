<?php
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");
include 'db-connect.php'; // Assuming this file contains the database connection

if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $dataRetrieved = new stdClass();

    $recipeObject = file_get_contents('php://input');
    $jsonData = json_decode($recipeObject, true);

    if ($jsonData === null) {
        echo "Error decoding JSON data";
        exit;
    }

    $recipeID = $jsonData["recipeID"]; // Assuming the key in your JSON data is 'itemID'
    $user = $jsonData['user'];
 
    $sql = "DELETE FROM retete WHERE id=? AND user=?";

    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ss", $recipeID, $user);

    if (mysqli_stmt_execute($stmt)) {
        echo "Recipe deleted successfully"; // Corrected the response message
    } else {
        echo "Error deleting Recipe: " . mysqli_error($conn);
    }

    mysqli_stmt_close($stmt);
} else {
    echo "Invalid request method";
}

mysqli_close($conn);
?>