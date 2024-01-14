<?php
include 'db-connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $acc = $_POST["account"];
    $pass = $_POST["password"];
    $dataRetrieved = new stdClass();

    $sql = "SELECT * FROM logintable WHERE account = ?";
    
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $acc);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($result)) {
        // Verify the hashed password
        if (password_verify($pass, $row['pass'])) {
            // Successful login

            $dataRetrieved->account = $row['account'];
            $dataRetrieved->membru1 = $row['membru1'];
            $dataRetrieved->membru2 = $row['membru2'];
            $dataRetrieved->membru3 = $row['membru3'];
            $dataRetrieved->membru4 = $row['membru4'];

            header('Content-Type: application/json');
            echo json_encode($dataRetrieved);
            exit(); // Stop further execution

        } else {
            echo "Invalid password.";
            exit(); // Stop further execution
        }
    } else {
        echo "Invalid username.";
        exit(); // Stop further execution
    }

    mysqli_stmt_close($stmt);
}

mysqli_close($conn);
?>
