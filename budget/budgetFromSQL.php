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

$sql= "SELECT id, tranzactie_tip, tranzactie_subtip, dataselect, descriere, valoare, perioada FROM buget WHERE account_name LIKE '%$accountName%' ORDER BY id DESC";
$result = $conn->query($sql);

// Close the database connection
$conn->close();
?>
