<?php
    include 'db-connect.php';

    $cookieName = "username";
    $dataRetrieved = array();
    
    if (isset($_COOKIE[$cookieName])) {
        $storedUsername = $_COOKIE[$cookieName];
    
        // Use prepared statement to prevent SQL injection
        $sql = "SELECT telefon, membru1, membru2, membru3, membru4 FROM logintable WHERE account = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $storedUsername);
        $stmt->execute();
        $result = $stmt->get_result();
    
    if ($result->num_rows > 0){
        while($row = $result->fetch_assoc()) {
            $dataRetrieved[] = $row;
        }
    }
    }
    header('Content-Type: application/json');
    echo json_encode($dataRetrieved);

    $conn->close();

?>