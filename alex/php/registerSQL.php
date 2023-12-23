<?php

include 'db-connect.php';

$acc = $_POST["account"];
$email = $_POST["email"];
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

$sql = "INSERT INTO logintable (account, email , pass)
VALUES ('$acc', '$email' , '$hashedPassword')";

if (mysqli_query($conn, $sql)) {
  echo "New record created successfully";
  header("Location: ../index.html"); // Redirect
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

}

$stmt->close();
$conn->close();
?>