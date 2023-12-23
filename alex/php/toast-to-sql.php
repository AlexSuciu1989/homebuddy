<?php

include 'db-connect.php';

$userName = urldecode($_POST['userName']);
$familyMember = urldecode($_POST['familyMember']);
$dateTime = urldecode($_POST['dateTime']);
$toastContent = urldecode($_POST['toastContent']);

// Using prepared statements to prevent SQL injection
$sql = "INSERT INTO toasts (username, member, nowdatetime, toast) VALUES (?, ?, ?, ?)";

$stmt = mysqli_prepare($conn, $sql);

// Bind parameters
mysqli_stmt_bind_param($stmt, "ssss", $userName, $familyMember, $dateTime, $toastContent);

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