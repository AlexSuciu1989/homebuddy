<?php

$servername = "localhost:3306";
$username = "homebudd_alex";
$password = "Desire1989";
$dbname = "homebudd_db";

$nowdate = date('Y-m-d H:i:s');

session_start();
  if (isset($_SESSION['account'])) {
    $accountName = $_SESSION['account'];
  }

  if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $luni = $_POST["luni_hidden"];
    $marti = $_POST["marti_hidden"];
    $miercuri = $_POST["miercuri_hidden"];
    $joi = $_POST["joi_hidden"];
    $vineri = $_POST["vineri_hidden"];
    $sambata = $_POST["sambata_hidden"];
    $duminica = $_POST["duminica_hidden"];

}


// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$sql = "INSERT INTO weekmenu (
    nowdate ,
    account_name ,
    luni , 
    marti , 
    miercuri , 
    joi , 
    vineri , 
    sambata ,
    duminica
    )
VALUES (
    '$nowdate' ,
    '$accountName' ,
    '$luni' ,
    '$marti' ,
    '$miercuri' ,
    '$joi' , 
    '$vineri' ,
    '$sambata' ,
    '$duminica'
    )";

if (mysqli_query($conn, $sql)) {
    header("Location: ../menu.php");
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>