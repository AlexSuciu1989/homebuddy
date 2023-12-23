<?php

try {
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=homebudd_db', 'homebudd_alex', 'Desire1989');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    session_start();
  if (isset($_SESSION['account'])) {
    $accountName = $_SESSION['account'];
  }
  
    $query = "
        SELECT
            categorie,
            GROUP_CONCAT(DISTINCT nume_reteta) AS nume_retete
        FROM
            recipes
        WHERE
            account_name LIKE '%$accountName%'
        GROUP BY
            categorie;
    ";

    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($result as $row) {
        $categorie = $row['categorie'];
        $nume_retete = $row['nume_retete'];

        echo "Category: $categorie<br>";
        echo "Recipes: $nume_retete<br><br>";
    }

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
