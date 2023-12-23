<html>
    <head>
        
        <link rel="stylesheet" href="/menu/menu_style.css">
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

        <link rel="shortcut icon" href="/resources/favicon.png">
        <script src="/menu/menu.js"></script>
       <?php include './menu/menuFromSQL.php'; ?>
       <?php include './menu/recipeFromSQL.php'; ?>
       <?php include './menu/search.php'; ?>
    </head>
    
    <body> 
        <div class="topbar">     
        
            <img src="./resources/Logo HomeBuddy.png">
            
            
                <ul>
                    <li> <a href="account.php">Account</a> </li>
                    <li> <a href="budget.php">Budget</a> </li>
                    <li> <a href="menu.php">Menu</a></li>
                </ul>

            <div class="user-welcome">
                    <?php
                        // Iti aduce user-nameul in fisier, iar daca nu esti logat te directioneaza
                        session_start();

                        // Verifica daca userul e logat
                        if (isset($_SESSION['account'])) {
                            $accountName = $_SESSION['account'];
                            echo "Buna, $accountName!";
                        } else {
                            // Redirect
                            header("Location: index.html");
                            exit();
                        }
                    ?>
                </div>
        </div>

        <div class=app>
           
                <div class="week-table" id="saptamana">
                      
                        <div class="weekday">
                            <div class="week-table-cell">Luni</div>
                            <div class="week-table-cell" id="luni"></div>
                        </div>

                        <div class="weekday">
                            <div class="week-table-cell">Marti</div>
                            <div class="week-table-cell" id="marti"></div>
                        </div>

                        <div class="weekday">
                            <div class="week-table-cell">Miercuri</div>
                            <div class="week-table-cell" id="miercuri"></div>
                        </div>

                        <div class="weekday">
                            <div class="week-table-cell">Joi</div>
                            <div class="week-table-cell" id="joi"></div>
                        </div>

                        <div class="weekday">
                            <div class="week-table-cell">Vineri</div>
                            <div class="week-table-cell" id="vineri"></div>
                        </div>

                        <div class="weekday">
                            <div class="week-table-cell">Sambata</div>
                            <div class="week-table-cell" id="sambata"></div>
                        </div>

                        <div class="weekday">
                            <div class="week-table-cell">Duminica</div>
                            <div class="week-table-cell" id="duminica"></div>
                        </div>
                </div>
                <div class=submit-form>
                        <form method="POST" action="/menu/menuToSQL.php"> 
                            <input type="hidden" name="luni_hidden" id="luni_hidden">
                            <input type="hidden" name="marti_hidden" id="marti_hidden">
                            <input type="hidden" name="miercuri_hidden" id="miercuri_hidden">
                            <input type="hidden" name="joi_hidden" id="joi_hidden">
                            <input type="hidden" name="vineri_hidden" id="vineri_hidden">
                            <input type="hidden" name="sambata_hidden" id="sambata_hidden">
                            <input type="hidden" name="duminica_hidden" id="duminica_hidden">
                            <input type="submit" name="Submit-weekdays" value="Salveaza meniul" id="Submit-weekdays">
                        </form>
                </div>
            <button class="btn-new-recipe" onclick="popup_menu()">Adauga Reteta Noua</button> <!-- Butonul de adaugare -->
            <div class="container-retete">
                
                <div class="retete" id="micdejun">
                    <div class="retete_titlu">Mic Dejun</div>
                </div>

                <div class="retete" id="pranz">
                    <div class="retete_titlu">Pranz</div>
                </div>

                <div class="retete" id="cina">
                    <div class="retete_titlu">Cina</div>
                </div>

                <div class="retete" id="gustari">
                    <div class="retete_titlu">Gustari</div>
                </div>
            </div>
            
            <div class="popup-menu"> <!-- Formularul de introducere date (popup) -->
                <div class="popup-menu" id="myPopup-menu">
                    <!--<img src="/resources/xmark-solid.svg" width="30" height="30" alt="close" Title="close" id="popupClose" onclick="popupClose()"> -->

                    <form class="popup-form" method="POST" action="/menu/recipeToSQL.php">
                        <div class="close-pop" onclick="popupClose()">+</div>
                        <input type="text" name="nume_reteta" placeholder="Nume reteta"><br>

                        <label>Categorie</label>
                        <select name="categorie">
                            <option>Mic Dejun</option>
                            <option>Pranz</option>
                            <option>Cina</option>
                            <option>Gustari</option>
                        </select><br>

                        <label>Dificultate</label>
                        <select name="dificultate">
                            <option>Scazuta</option>
                            <option>Medie</option>
                            <option>Ridicata</option>
                            <option>Nivel Gordon Ramsey</option>
                        </select><br>
                        <textarea rows="3" cols="60" name="descriere" placeholder="Descriere"></textarea><br>
                        <textarea rows="5" cols="60" name="ingrediente" placeholder="Ingrediente"></textarea><br>
                        <textarea rows="5" cols="60" name="mod_de_preparare" placeholder="Mod de preparare"></textarea><br>

                        <input type="submit" name="Submit" value="Submit" id="Submit">
                    </form>
                </div>
            </div>


            <div class="popup-recipe"> <!-- Formularul de introducere date (popup) -->
                <div class="popup-recipe" id="myPopup-recipe">

                    <p>aici vine reteta</p>

                    <input type="text" id="outputField">

                </div>
            </div>

        </div>

        <input type="text" id="luni2" name="luni2" value='<?php echo $row['luni']??''; ?>' readonly hidden>    
        <input type="text" id="marti2" name="marti2" value='<?php echo $row['marti']??''; ?>' readonly hidden> 
        <input type="text" id="miercuri2" name="miercuri2" value='<?php echo $row['miercuri']??''; ?>' readonly hidden> 
        <input type="text" id="joi2" name="joi2" value='<?php echo $row['joi']??''; ?>' readonly hidden> 
        <input type="text" id="vineri2" name="vineri2" value='<?php echo $row['vineri']??''; ?>' readonly hidden> 
        <input type="text" id="sambata2" name="sambata2" value='<?php echo $row['sambata']??''; ?>' readonly hidden> 
        <input type="text" id="duminica2" name="duminica2" value='<?php echo $row['duminica']??''; ?>' readonly hidden> 

        
        <?php

foreach ($categoryRecipes as $categoryName => $recipes) {
    echo "<label hidden>$categoryName:</label><br>";

    // Display input fields for recipes in this category
    foreach ($recipes as $recipe) {
        echo "<input type='text' name='${categoryName}_recipes[]' id='$categoryName' value='$recipe' readonly hidden><br>";
    }

    echo "<br>";
}

?>
   
   <input type="text" name="numeReteta" id="numeReteta" value="Omleta" hidden>
    <div id="result"></div>
    <script>
        document.querySelector('input[name="numeReteta"]').addEventListener('input', function() {
            var numeReteta = this.value;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/menu/search.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    document.getElementById("result").innerHTML = xhr.responseText;
                }
            };
            xhr.send("numeReteta=" + numeReteta);
        });
    </script>

<input type="text" value='<?php echo $row1['dificultate']??''; ?>'readonly hidden>
<?php echo $numeReteta; ?>


<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["numeReteta"])) {
    $numeReteta = $_POST["numeReteta"];
    echo "The value of numeReteta is: " . $numeReteta;
}
?>
<?php
// ... Your previous code for database connection and query ...

// Check if there are any results
if (count($result_recipe_full) > 0) {
    echo '<table border="1">';
    echo '<tr><th>Recipe Name</th><th>Category</th><th>Difficulty</th><th>Description</th><th>Ingredients</th><th>Preparation</th></tr>';

    foreach ($result_recipe_full as $row) {
        echo '<tr>';
        echo '<td>' . htmlspecialchars($row['nume_reteta']) . '</td>';
        echo '<td>' . htmlspecialchars($row['categorie']) . '</td>';
        echo '<td>' . htmlspecialchars($row['dificultate']) . '</td>';
        echo '<td>' . htmlspecialchars($row['descriere']) . '</td>';
        echo '<td>' . htmlspecialchars($row['ingrediente']) . '</td>';
        echo '<td>' . htmlspecialchars($row['mod_de_preparare']) . '</td>';
        echo '</tr>';
    }

    echo '</table>';
} else {
    echo 'No recipes found for this account.';
}
?>


    </body>
    
</html>