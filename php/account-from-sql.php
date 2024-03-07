<?php
header("Access-Control-Allow-Origin: *");
include 'db-connect.php';

$cookieName = "username";
$dataRetrieved = array();

// Check if the loggedUser parameter is set
if (isset($_GET['loggedUser'])) {
    $storedUsername = $_GET['loggedUser'];

    // Use prepared statement to prevent SQL injection
    $sql = "SELECT telefon, membru1, membru2, membru3, membru4, email FROM logintable WHERE account = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $storedUsername);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $dataRetrieved[] = $row;
        }
    }
}

header('Content-Type: application/json');
echo json_encode($dataRetrieved);

$conn->close();
?>
