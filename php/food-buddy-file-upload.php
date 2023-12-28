<?php
$targetDirectory = "../uploads/";

if (!file_exists($targetDirectory)) {
    mkdir($targetDirectory, 0777, true);
}

$targetFile = $targetDirectory . basename($_FILES["file"]["name"]);

if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
    echo json_encode(['message' => 'File uploaded successfully']);
} else {
    echo json_encode(['error' => 'Error uploading file']);
}
?>