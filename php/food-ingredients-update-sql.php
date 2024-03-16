<?php
header("Access-Control-Allow-Methods: UPDATE");
header("Access-Control-Allow-Headers: Content-type");
header("Access-Control-Allow-Origin: *");

include 'db-connect.php';

if ($_SERVER["REQUEST_METHOD"] == "UPDATE") {
    $dataRetrieved = new stdClass();

    $ingredientsToBeUpdated = file_get_contents('php://input');
    $jsonData = json_decode($ingredientsToBeUpdated, true);

    if ($jsonData === null) {
        echo "Error decoding JSON data";
        exit;
    }

    foreach ($jsonData as $ingredientUpdate) {
        $recipeTitle = $ingredientUpdate['recipeTitle'];
        $ingredientID = $ingredientUpdate['ingredientID'];
        $ingredientName = $ingredientUpdate['ingredientName'];
        $ingredientQuantity = $ingredientUpdate['ingredientQuantity'];
        $ingredientUnit = $ingredientUpdate['ingredientUnit'];
        $username = $ingredientUpdate['username'];

        $sql = "UPDATE ingrediente SET numeingredient=?, cantitateingredient=?, unitateingredient=? WHERE id=?";

        $stmt = mysqli_prepare($conn, $sql);

        mysqli_stmt_bind_param($stmt, "ssss", $ingredientName, $ingredientQuantity, $ingredientUnit, $ingredientID);

        if (mysqli_stmt_execute($stmt)) {
            echo "Ingredients updated successfully";
        } else {
            echo "Error updating Ingredients: " . mysqli_error($conn);
        }

        mysqli_stmt_close($stmt);
    }
} else {
    echo "Invalid request method";
}

mysqli_close($conn);
?>
