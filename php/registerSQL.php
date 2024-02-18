<?php
header("Access-Control-Allow-Origin: *");
include 'db-connect.php';

$acc = $_POST["account"];
$email = $_POST["email"];
$userName = $_POST["member"];
$pass = $_POST["password"];
$hashedPassword = password_hash($pass, PASSWORD_DEFAULT);
$sql = "SELECT * FROM logintable WHERE account = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $acc);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Username already exists, handle accordingly (e.g., display an error message)
    echo "Username already exists. Please choose a different one.";
} else {

$sql = "INSERT INTO logintable (account, email, membru1 , pass)
VALUES ('$acc', '$email', '$userName' , '$hashedPassword')";

if (mysqli_query($conn, $sql)) {
  echo "New record created successfully";
  header("Location: ../"); // Redirect
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

}

$stmt->close();
$conn->close();
?>