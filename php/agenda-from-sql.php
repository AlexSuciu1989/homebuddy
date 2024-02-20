<?php
header("Access-Control-Allow-Origin:*");
    include 'db-connect.php';

    $cookieName = "username";
    $dataRetrieved = array();

if (isset($_GET['loggedUser'])) {
    $storedUsername = $_GET['loggedUser'];

        $sql = "SELECT id, eventdate, addedevent, username, eventstatus FROM agenda WHERE username = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $storedUsername);
        $stmt->execute();
        $result = $stmt->get_result();

        if($result->num_rows > 0){
            while($row = $result->fetch_assoc()) {
                $dataRetrieved[] = $row;
            }
        }
    }
    header('Content-Type: application/json');
    echo json_encode($dataRetrieved);

    $conn->close();

?>