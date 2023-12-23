<?php

include 'db-connect.php';


$acc = $_POST["account"];
$email = $_POST["email"];
$pass = $_POST["password"];

$sql = "SELECT account FROM logintable WHERE email = ? AND pass = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $pass);

// Execute the query
if (!$stmt->execute()) {
    die("Error in query: " . $stmt->error);
}

// Get the result set
$result = $stmt->get_result();

$column = array();

// Process the result set
while ($row = $result->fetch_assoc()) {
  // Compare with $acc
    if ($row['account'] === $acc) {
        // Do something if there is a match
        echo "Match found";
    }
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>