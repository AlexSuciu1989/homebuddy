<?php
include 'db-connect.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $rawData = file_get_contents("php://input");


    $jsonData = json_decode($rawData, true);

    if ($jsonData === null) {
        echo "Error decoding JSON data";
        exit;
    }
    $data = $jsonData['familyMembersArray'];
}

$sql = "UPDATE logintable SET telefon = ?, membru1 = ?, membru2 = ?, membru3 = ?, membru4 = ? WHERE account = ?";


$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "ssssss", $data[1], $data[2], $data[3], $data[4], $data[5], $data[0]);

if (mysqli_stmt_execute($stmt)) {
    echo "Data updated successfully";

} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
