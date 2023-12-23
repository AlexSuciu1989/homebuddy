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

    $result_recipe = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $categoryRecipes = array(
      'Mic Dejun' => array(),
      'Pranz' => array(),
      'Cina' => array(),
      'Gustari' => array()
  );
  
  // Assuming $result_recipe is an array of recipes
  foreach ($result_recipe as $row_recipe) {
      $categorie = $row_recipe['categorie'];
      $nume_retete = $row_recipe['nume_retete'];
  
      // Assign the recipe to the corresponding category array
      $categoryRecipes[$categorie][] = $nume_retete;
  }
  
  // Display input fields for each category

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

?>
