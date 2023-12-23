<?php

$servername = "localhost:3306";
$username = "homebudd_alex";
$password = "Desire1989";
$dbname = "homebudd_db";

session_start();
  if (isset($_SESSION['account'])) {
    $accountName = $_SESSION['account'];
  }

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// SQL query to select all data from the weekmenu table
$sql = "SELECT id, luni, marti, miercuri, joi, vineri, sambata, duminica FROM weekmenu WHERE account_name LIKE '%$accountName%' ORDER BY id DESC LIMIT 1 ";

// Execute the query
$result = $conn->query($sql);

// Check if the query was successful
$row = mysqli_fetch_assoc($result);

// Close the database connection
$conn->close();

?>
