<?php

include 'db-connect.php';

$nowdate = date('Y-m-d');
$formTitle = urldecode($_POST['formTitle']);
$formCategory = urldecode($_POST['formCategory']);
$formDificulty = urldecode($_POST['formDificulty']);
$formTextarea = urldecode($_POST['formTextarea']);
$fileName = urldecode($_POST['fileName']);

// Using prepared statements to prevent SQL injection
$sql = "INSERT INTO retete (nowdate, titlu, categorie, dificultate, ingrediente, uploadedfile) VALUES (?, ?, ?, ?, ?, ?)";

$stmt = mysqli_prepare($conn, $sql);

// Bind parameters
mysqli_stmt_bind_param($stmt, "ssssss", $nowdate, $formTitle, $formCategory, $formDificulty, $formTextarea, $fileName);

// Execute the statement
if (mysqli_stmt_execute($stmt)) {
    header("Location: ../food-buddy.html");
    echo "New Record Created Successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

// Close the statement and connection
mysqli_stmt_close($stmt);
mysqli_close($conn);
?>