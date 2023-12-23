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

    $nume_reteta = $_POST["nume_reteta"];
    $categorie = $_POST["categorie"];
    $dificultate = $_POST["dificultate"];
    $descriere = $_POST["descriere"];
    $ingrediente = $_POST["ingrediente"];
    $mod_de_preparare = $_POST["mod_de_preparare"];
}


// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$sql = "INSERT INTO recipes (
    nowdate ,
    account_name ,
    nume_reteta , 
    categorie , 
    dificultate , 
    descriere , 
    ingrediente , 
    mod_de_preparare
    )
VALUES (
    '$nowdate' ,
    '$accountName' ,
    '$nume_reteta' ,
    '$categorie' ,
    '$dificultate' ,
    '$descriere' , 
    '$ingrediente' ,
    '$mod_de_preparare'
    )";

if (mysqli_query($conn, $sql)) {
    header("Location: ../menu.php");
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>