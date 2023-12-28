<?php
include 'db-connect.php';

// Process login form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $acc = $_POST["account"];
    $pass = $_POST["password"];

    // Query to check if the user exists
    $sql = "SELECT * FROM logintable WHERE account = ?";
    
    // Using prepared statement to prevent SQL injection
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $acc);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($result)) {
        // Verify the hashed password
        if (password_verify($pass, $row['pass'])) {
            // Successful login
            $_SESSION['account'] = $acc; // Store the username in a session variable
            header("Location: ../food-buddy.html"); // Redirect
            exit(); // Make sure to exit after redirection
        } else {
            // Invalid password
            echo "Invalid username or password.";
        }
    } else {
        // User does not exist
        echo "Invalid username or password.";
    }

    // Close the prepared statement
    mysqli_stmt_close($stmt);
}

// Close the database connection
mysqli_close($conn);
?>