<?php

include 'db-connect.php';

$weeknumber = urldecode($_POST['weeknumber']);
$cookieName = "username";
$currentYear = date("Y");

if (isset($_COOKIE[$cookieName])){
    $storedUsername = $_COOKIE[$cookieName];


$sql = "SELECT * FROM meniu WHERE (weekno = ? AND username = ? AND YEAR(nowdate) = ?) ORDER BY `id` DESC LIMIT 1";

$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $weeknumber, $storedUsername, $currentYear);
$stmt->execute();

$result = $stmt->get_result();

$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}
}

header('Content-Type: application/json');
echo json_encode($data);
error_log('Week number: ' . $weeknumber);
$stmt->close();
$conn->close();

?>
