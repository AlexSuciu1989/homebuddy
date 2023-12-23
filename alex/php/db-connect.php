<?php
$servername = "localhost:3306";
$username = "homebudd_alex";
$password = "Desire1989";
$dbname = "homebudd_db";



$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error) {
    die("Connection failed " . $conn->connect_error);
}

?>