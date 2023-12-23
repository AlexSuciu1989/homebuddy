<?php
$hostname = "localhost:3306";
$username = "homebudd_alex";
$password = "Desire1989";
$database = "homebudd_db";

session_start();
  if (isset($_SESSION['account'])) {
    $accountName = $_SESSION['account'];
  }
$car1_name = $_POST["car1_name"];
$car2_name = $_POST["car2_name"];

// Se realizeaza conexiunea cu serverul de SQL
$connection = mysqli_connect($hostname, $username, $password, $database);

// Se verifica conexiunea
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

// Primul Query
$sql1 = "SELECT * FROM expenses WHERE (car1_name LIKE '%$car1_name%' AND username LIKE '%$accountName%')"."ORDER BY DataSiOra DESC LIMIT 1";
$result1 = mysqli_query($connection, $sql1);

if (!$result1) {
    die("First query failed: " . mysqli_error($connection));
}
    $row1 = mysqli_fetch_assoc($result1);


// Al doilea Query
$sql2 = "SELECT * FROM expenses WHERE (car1_name LIKE '%$car2_name%' AND username LIKE '%$accountName%')"."ORDER BY DataSiOra DESC LIMIT 1";
$result2 = mysqli_query($connection, $sql2);

if (!$result2) {
    die("Second query failed: " . mysqli_error($connection));
}

$row2 = mysqli_fetch_assoc($result2);

// Al treilea Query
$sql3 = "SELECT * FROM expenses WHERE username LIKE '%$accountName%'"."ORDER BY DataSiOra DESC LIMIT 1";
$result3 = mysqli_query($connection, $sql3);

if (!$result3) {
    die("Second query failed: " . mysqli_error($connection));
}

$row3 = mysqli_fetch_assoc($result3);

// Inchide conexiunea cu baza de date SQL
mysqli_close($connection);
?>
