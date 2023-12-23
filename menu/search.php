<?php
$hostname = "localhost:3306";
$username = "homebudd_alex";
$password = "Desire1989";
$database = "homebudd_db";

session_start();
  if (isset($_SESSION['account'])) {
    $accountName = $_SESSION['account'];
  }


  if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["numeReteta"])) {
    $numeReteta = $_POST["numeReteta"];
    echo "The value of numeReteta is: " . $numeReteta;
}



// Se realizeaza conexiunea cu serverul de SQL
$connection = mysqli_connect($hostname, $username, $password, $database);

// Se verifica conexiunea
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

// Primul Query
$sql1 = "SELECT * FROM recipes WHERE (nume_reteta LIKE '%$numeReteta%' AND account_name LIKE '%$accountName%')"."ORDER BY nume_reteta DESC";
$result1 = mysqli_query($connection, $sql1);

if (!$result1) {
    die("First query failed: " . mysqli_error($connection));
}
    $row1 = mysqli_fetch_assoc($result1);

// Inchide conexiunea cu baza de date SQL
mysqli_close($connection);

?>
