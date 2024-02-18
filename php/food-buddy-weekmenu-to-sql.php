<?php
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");
include 'db-connect.php';

$nowdate = date('Y-m-d');

$weekno = urldecode($_POST['weekno']);  // Line 6

$username = urldecode($_POST['username']);
// Assuming you want to treat each day's data as a comma-separated string
$mon = $_POST['mon'];
$tue = $_POST['tue'];
$wed = $_POST['wed'];
$thu = $_POST['thu'];
$fri = $_POST['fri'];
$sat = $_POST['sat'];
$sun = $_POST['sun'];

$sql = "INSERT INTO meniu (nowdate, weekno, mon, tue, wed, thu, fri, sat, sun, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = mysqli_prepare($conn, $sql);

// Assuming $nowdate is user-generated, validate and sanitize it
$nowdate = filter_var($nowdate, FILTER_SANITIZE_STRING);

mysqli_stmt_bind_param($stmt, "ssssssssss", $nowdate, $weekno, $mon, $tue, $wed, $thu, $fri, $sat, $sun, $username);

if (mysqli_stmt_execute($stmt)) {
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
    echo "Data inserted successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
?>
