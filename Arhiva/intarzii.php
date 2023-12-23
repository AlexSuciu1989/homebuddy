<?php

   

$servername = "DESKTOP-5PSO7TP";
$username = "admin";
$password = "lucifer";
$dbname = "mydb";
$date = date('Y-m-d H:i:s');
$intarzii = $_POST["intarzii"];

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$sql = "INSERT INTO anunturi (DataSiOra, Nume, anunt)
VALUES ('$date', 'Alex', '$intarzii')";

if (mysqli_query($conn, $sql)) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>