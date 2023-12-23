<?php

include 'db-connect.php';

$sql = "SELECT * FROM toasts ORDER BY id DESC LIMIT 20";
$result = $conn->query($sql);

$data = array();

if($result->num_rows > 0){
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($data);

$conn->close();

?>