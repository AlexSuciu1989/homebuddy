<?php

// delete_record.php

// Your database connection credentials
$servername = "localhost"; // Remove the port number if not needed
$username = "homebudd_alex";
$password = "Desire1989";
$dbname = "homebudd_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Assuming you have a database connection established
    $id = $_POST['id'];

    // Perform the SQL DELETE operation
    $sql = "DELETE FROM buget WHERE id = $id";

    // Execute the query, handle errors as needed
    if ($conn->query($sql) === TRUE) {
        echo 'Record deleted successfully';
    } else {
        echo 'Error deleting record: ' . $conn->error;
    }
}

// Close the database connection
$conn->close();
?>