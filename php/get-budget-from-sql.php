<?php
header("Access-Control-Allow-Origin: *");
include 'db-connect.php';

// $cookieName = "username";
$budgetdata = array();

// if (isset($_GET['loggedUser'])) {
//     $storedUsername = $_GET['loggedUser'];


$sql = "SELECT * FROM budget WHERE username ='' ";
$stmt = $conn->prepare($sql);
// $stmt->bind_param("s", $storedUsername);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $budgetdata[] = $row;
    }
}
// }

header('Content-Type: application/json');
echo json_encode($budgetdata);

$conn->close();

?>