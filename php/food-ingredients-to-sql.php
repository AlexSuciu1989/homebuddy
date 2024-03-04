<?php
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-type");
header("Access-Control-Allow-Origin: *");

include 'db-connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dataRetrieved = new stdClass();

    $ingredientsArray = file_get_contents('php://input');
    $jsonData = json_decode($ingredientsArray, true);

    if ($jsonData === null) {
        echo "Error decoding JSON data";
        exit;
    }

    foreach ($jsonData as $ingredient) {
        $recipeName = $ingredient['recipe'];
        $ingredientName = $ingredient['name'];
        $quantity = $ingredient['quantity'];
        $unit = $ingredient['unit'];
        $user = $ingredient['username'];

        $sql = "INSERT INTO ingrediente (username, reteta, numeingredient, cantitateingredient, unitateingredient) VALUES (?, ?, ?, ?, ?)";

        $stmt = mysqli_prepare($conn, $sql);

        mysqli_stmt_bind_param($stmt, "sssss", $user, $recipeName, $ingredientName, $quantity, $unit);

        if (mysqli_stmt_execute($stmt)) {
            echo "Ingredients added successfully";
        } else {
            echo "Error adding Ingredients: " . mysqli_error($conn);
        }

        mysqli_stmt_close($stmt);
    }
} else {
    echo "Invalid request method";
}

mysqli_close($conn);
?>
