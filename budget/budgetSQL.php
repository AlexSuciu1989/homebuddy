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


$tranzactie_tip = $_POST["tranzactie_tip"];
$tranzactie_subtip = $_POST["tranzactie_subtip"];

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $dataselect = $_POST["dataselect"];
}
$descriere = $_POST["descriere"];

$valoare = $_POST["valoare"];
$perioada = $_POST["perioada"];

if($tranzactie_tip !== "salariu" Xor $tranzactie_tip == "alte surse venit"){
    $valoare = "-" . $valoare;
}

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$sql = "INSERT INTO buget (
    nowdate ,
    account_name ,
    tranzactie_tip , 
    tranzactie_subtip , 
    dataselect ,
    descriere ,
    valoare ,
    perioada
    )
VALUES (
    '$nowdate' ,
    '$accountName' ,
    '$tranzactie_tip' , 
    '$tranzactie_subtip' , 
    '$dataselect' , 
    '$descriere' ,
    '$valoare' ,
    '$perioada'
    )";

if (mysqli_query($conn, $sql)) {
    header("Location: ../budget.php");
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>