<?php
$targetDirectory = "../uploads/";

// Validate and sanitize file name
$fileName = basename($_FILES["file"]["name"]);
$targetFile = $targetDirectory . $fileName;

// Check file type and size (example: allow only JPEG and PNG images less than 5MB)
$allowedFileTypes = ["jpg", "jpeg", "png"];
$maxFileSize = 5 * 1024 * 1024; // 5 MB

$fileExtension = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

if (!in_array($fileExtension, $allowedFileTypes) || $_FILES["file"]["size"] > $maxFileSize) {
    echo json_encode(['error' => 'Invalid file type or size']);
    http_response_code(400); // Bad Request
    exit;
}

if (!file_exists($targetDirectory)) {
    mkdir($targetDirectory, 0777, true);
}

if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
    echo json_encode(['message' => 'File uploaded successfully', 'fileName' => $fileName]);
} else {
    echo json_encode(['error' => 'Error uploading file']);
    http_response_code(500); // Internal Server Error
}
?>
