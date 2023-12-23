<?php

   

$servername = "localhost:3306";
$username = "homebudd_alex";
$password = "Desire1989";
$dbname = "homebudd_db";
$date = date('Y-m-d H:i:s');

session_start();
  if (isset($_SESSION['account'])) {
    $accountName = $_SESSION['account'];
  }

$car1_name = $_POST["car1_name"];
$car1_Asigurare_Data_txtbox = $_POST["car1_Asigurare_Data_txtbox"];
$car1_Asigurare_Perioada_txtbox = $_POST["car1_Asigurare_Perioada_txtbox"];
$car1_Asigurare_RON_txtbox = $_POST["car1_Asigurare_RON_txtbox"];
$car1_ITP_Data_txtbox = $_POST["car1_ITP_Data_txtbox"];
$car1_ITP_Perioada_txtbox = $_POST["car1_ITP_Perioada_txtbox"];
$car1_ITP_RON_txtbox = $_POST["car1_ITP_RON_txtbox"];
$car1_Rovigneta_Data_txtbox = $_POST["car1_Rovigneta_Data_txtbox"];
$car1_Rovigneta_Perioada_txtbox = $_POST["car1_Rovigneta_Perioada_txtbox"];
$car1_Rovigneta_RON_txtbox = $_POST["car1_Rovigneta_RON_txtbox"];
$car2_name = $_POST["car2_name"];
$car2_Asigurare_Data_txtbox = $_POST["car2_Asigurare_Data_txtbox"];
$car2_Asigurare_Perioada_txtbox = $_POST["car2_Asigurare_Perioada_txtbox"];
$car2_Asigurare_RON_txtbox = $_POST["car2_Asigurare_RON_txtbox"];
$car2_ITP_Data_txtbox = $_POST["car2_ITP_Data_txtbox"];
$car2_ITP_Perioada_txtbox = $_POST["car2_ITP_Perioada_txtbox"];
$car2_ITP_RON_txtbox = $_POST["car2_ITP_RON_txtbox"];
$car2_Rovigneta_Data_txtbox = $_POST["car2_Rovigneta_Data_txtbox"];
$car2_Rovigneta_Perioada_txtbox = $_POST["car2_Rovigneta_Perioada_txtbox"];
$car2_Rovigneta_RON_txtbox = $_POST["car2_Rovigneta_RON_txtbox"];
$Curent_Data_txtbox = $_POST["Curent_Data_txtbox"];
$Curent_RON_txtbox = $_POST["Curent_RON_txtbox"];
$Gaz_Data_txtbox = $_POST["Gaz_Data_txtbox"];
$Gaz_RON_txtbox = $_POST["Gaz_RON_txtbox"];
$Apa_Data_txtbox = $_POST["Apa_Data_txtbox"];
$Apa_RON_txtbox = $_POST["Apa_RON_txtbox"];
$Telefon1_Data_txtbox = $_POST["Telefon1_Data_txtbox"];
$Telefon1_RON_txtbox = $_POST["Telefon1_RON_txtbox"];
$Telefon2_Data_txtbox = $_POST["Telefon2_Data_txtbox"];
$Telefon2_RON_txtbox = $_POST["Telefon2_RON_txtbox"];
$Internet_Data_txtbox = $_POST["Internet_Data_txtbox"];
$Internet_RON_txtbox = $_POST["Internet_RON_txtbox"];
$Televiziune_Data_txtbox = $_POST["Televiziune_Data_txtbox"];
$Televiziune_RON_txtbox = $_POST["Televiziune_RON_txtbox"];
$Netflix_Data_txtbox = $_POST["Netflix_Data_txtbox"];
$Netflix_RON_txtbox = $_POST["Netflix_RON_txtbox"];
$Disney_Data_txtbox = $_POST["Disney_Data_txtbox"];
$Disney_RON_txtbox = $_POST["Disney_RON_txtbox"];
$HBOmax_Data_txtbox = $_POST["HBOmax_Data_txtbox"];
$HBOmax_RON_txtbox = $_POST["HBOmax_RON_txtbox"];

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$sql = "INSERT INTO expenses (DataSiOra, username, car1_name , car1_Asigurare_Data_txtbox , car1_Asigurare_Perioada_txtbox , car1_Asigurare_RON_txtbox , car1_ITP_Data_txtbox , car1_ITP_Perioada_txtbox , car1_ITP_RON_txtbox , car1_Rovigneta_Data_txtbox , car1_Rovigneta_Perioada_txtbox , car1_Rovigneta_RON_txtbox ,car2_name , car2_Asigurare_Data_txtbox , car2_Asigurare_Perioada_txtbox , car2_Asigurare_RON_txtbox , car2_ITP_Data_txtbox , car2_ITP_Perioada_txtbox , car2_ITP_RON_txtbox , car2_Rovigneta_Data_txtbox , car2_Rovigneta_Perioada_txtbox , car2_Rovigneta_RON_txtbox , Curent_Data_txtbox , Curent_RON_txtbox , Gaz_Data_txtbox , Gaz_RON_txtbox , Apa_Data_txtbox , Apa_RON_txtbox , Telefon1_Data_txtbox , Telefon1_RON_txtbox , Telefon2_Data_txtbox , Telefon2_RON_txtbox , Internet_Data_txtbox , Internet_RON_txtbox , Televiziune_Data_txtbox , Televiziune_RON_txtbox , Netflix_Data_txtbox , Netflix_RON_txtbox , Disney_Data_txtbox , Disney_RON_txtbox , HBOmax_Data_txtbox , HBOmax_RON_txtbox)
VALUES ('$date', '$accountName', '$car1_name', '$car1_Asigurare_Data_txtbox' , '$car1_Asigurare_Perioada_txtbox' , '$car1_Asigurare_RON_txtbox' , '$car1_ITP_Data_txtbox' , '$car1_ITP_Perioada_txtbox' , '$car1_ITP_RON_txtbox' , '$car1_Rovigneta_Data_txtbox' , '$car1_Rovigneta_Perioada_txtbox' , '$car1_Rovigneta_RON_txtbox' , '$car2_name' , '$car2_Asigurare_Data_txtbox' , '$car2_Asigurare_Perioada_txtbox' , '$car2_Asigurare_RON_txtbox' , '$car2_ITP_Data_txtbox' , '$car2_ITP_Perioada_txtbox' , '$car2_ITP_RON_txtbox' , '$car2_Rovigneta_Data_txtbox' , '$car2_Rovigneta_Perioada_txtbox' , '$car2_Rovigneta_RON_txtbox' , '$Curent_Data_txtbox' , '$Curent_RON_txtbox' , '$Gaz_Data_txtbox' , '$Gaz_RON_txtbox' , '$Apa_Data_txtbox' , '$Apa_RON_txtbox' , '$Telefon1_Data_txtbox' , '$Telefon1_RON_txtbox' , '$Telefon2_Data_txtbox' , '$Telefon2_RON_txtbox' , '$Internet_Data_txtbox' , '$Internet_RON_txtbox' , '$Televiziune_Data_txtbox' , '$Televiziune_RON_txtbox' , '$Netflix_Data_txtbox' , '$Netflix_RON_txtbox' , '$Disney_Data_txtbox' , '$Disney_RON_txtbox' , '$HBOmax_Data_txtbox' , '$HBOmax_RON_txtbox')";

if (mysqli_query($conn, $sql)) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>