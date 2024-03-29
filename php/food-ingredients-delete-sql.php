<?php
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");
include 'db-connect.php';

if($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $ingredientIdObject = file_get_contents('php://input');
    $jsonData = json_decode($ingredientIdObject, true);

    if($jsonData === null) {
        echo "Error decoding JSON data";
        exit;
    }

    $ingredientID = $jsonData;

    $sql = "DELETE FROM ingrediente WHERE id =?";
    
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $ingredientID);

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