<?php
header("Access-Control-Allow-Origin: *");
include 'db-connect.php';

$weeknumber = urldecode($_POST['weeknumber']);
$currentYear = date("Y");

if (isset($_GET['loggedUser'])) {
    $storedUsername = $_GET['loggedUser'];


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
