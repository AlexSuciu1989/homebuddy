<?php
header("Access-Control-Allow-Origin: *");
include 'db-connect.php';


$cookieName = "username";
$data = array();

if (isset($_GET['loggedUser'])) {
    $storedUsername = $_GET['loggedUser'];


$sql = "SELECT * FROM toasts WHERE username = ? ORDER BY id DESC LIMIT 20";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $storedUsername);
$stmt->execute();
$result = $stmt->get_result();


if($result->num_rows > 0){
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}
}
header('Content-Type: application/json');
echo json_encode($data);

$conn->close();

?>