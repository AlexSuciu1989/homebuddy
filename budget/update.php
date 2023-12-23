    <?php
    // Your database connection credentials
    $servername = "localhost"; // Remove the port number
    $username = "homebudd_alex";
    $password = "Desire1989";
    $dbname = "homebudd_db";
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    // Get data from the POST request
    $id = $_POST['id'];
    $columnName = $_POST['column_name'];
    $newValue = $_POST['new_value'];
    
    // Update the database table
    $sql = "UPDATE buget SET $columnName = '$newValue' WHERE id = $id";
    
    if ($conn->query($sql) === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . $conn->error;
    }
    
    $conn->close();
    ?>
    