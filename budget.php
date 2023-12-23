<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Homebuddy - Budget</title>

        <script src="./budget/budget.js"></script> <!-- Javascriptul -->

        <link rel="stylesheet" href="./budget/style.css"/> <!-- Stylesheetul -->
        
        <link rel="shortcut icon" href="/resources/favicon.png">

        <?php include("./budget/budgetFromSQL.php");?> <!-- include fisierul care face legatura cu SQL si aduce datele in tabel -->
    </head>
    <body>

<!-- MENIU-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->  
        <div class="topbar">
        
            <img src="/resources/Temp family pic.jpg" class="avatar" height="60" >        
            
            <div class="menu"> <!-- Meniul -->
                <ul>
                    <li> <a href="account.php"><img src="/resources/user-solid.svg" width="20" height="20" alt="User" title="User" ></a> </li>
                    <li> <a href="budget.php"><img src="/resources/receipt-solid.svg" width="20" height="20" alt="Cheltuieli" title="Tranzactii" id="activeMenu"></a> </li>
                    <li> <a href="menu.php"><img src="/resources/utensils-solid.svg" width="20" height="20" alt="Meniu" title="Meniu"></a></li>
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

        </div>
<!-- MENIU-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->  


<!-- EMILIA-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->    
<div class="buget">
    
</div>
<!-- EMILIA-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->


<!-- ALEX-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->         
        
        <div class="popup"> <!-- Formularul de introducere date (popup) -->
            <div class="popup" id="myPopup">
                <img src="/resources/xmark-solid.svg" width="30" height="30" alt="close" Title="close" id="popupClose" onclick="popupClose()">
                <h2>Adauga o inregistrare noua</h2>

                <form method="POST" action="/budget/budgetSQL.php">

                <div class="row">
                    <div class="column">
                    <label>Tip</label><br>
                    <select id="tranzactie_tip" name="tranzactie_tip" onchange="subtip()">
                        <option value=""></option>
                        <optgroup label="Venituri">
                        <option value="Salariu">Salariu</option>
                        <option value="Alte surse venit">Alte surse de venit</option>
                        <optgroup label="Cheltuieli">
                        <option value="Casa">Casa</option>
                        <option value="Masina">Masina</option>
                        <option value="Banca">Banca</option>
                        <option value="Educatie">Educatie</option>
                        <option value="Sanatate">Sanatate</option>
                        <option value="Alte cheltuieli">Alte cheltuieli</option>
                    </select>
                    <br><br>

                    <label>Date</label><br>
                    <input type="date" id="dataselect" name="dataselect">
                    <br><br>


                    </div>
                    <div class="column">
                        <label>Subtip</label><br>
                        <select class="tranzactie_subtip" id="tranzactie_subtip" name="tranzactie_subtip">
                        </select>
                        <br><br>

                        <labeL>Valoare</labeL><br>
                        <input type="text" id="valoare" name="valoare" oninput="valoare_INT()">
                        <br><br>
                    
                    </div>

                   
                </div>
                <label>Descriere</label><br>
                    <input type="text" id="descriere" name="descriere" >
                    <br><br>

                    <label>Perioada</label>
                    <select id="perioada" name="perioada">
                        <option value="0"></option>
                        <option value="1">1 Luna</option>
                        <option value="3">3 Luni</option>
                        <option value="6">6 Luni</option>
                        <option value="9">9 Luni</option>
                        <option value="12">12 Luni</option>
                    </select>
                    <br><br>

                    <input type="submit" name="Submit" value="Submit" id="Submit">
                </form>
            </div>
        </div>

        <div class="tablediv">
        

            <div class="tablefilter"> <!-- Casutele de cauta in tabel -->
                <div class="adaugabtn">
                    <button id="AdaugaTranzactie" onclick="popup()">Inregistrare Noua</button> <!-- Butonul de adaugare -->
                </div>
            </div>


<!-- ALEX--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------> 

<div class="table">
        <div class="table-row header">
            <div class="table-cell">Tip</div>
            <div class="table-cell">Subtip</div>
            <div class="table-cell">Data</div>
            <div class="table-cell">Descriere</div>
            <div class="table-cell">Valoare</div>
            <div class="table-cell">Perioada</div>
            <div class="table-cell">Actions</div>


        </div>
        <!-- Loop through your data and create rows -->
        <?php
        // Assuming you have fetched your data from the database as before
        while($row = $result->fetch_assoc()) {
            echo '<div class="table-row" id="table-row">';
            echo '<div name="tranzactie_tip" data-column="tranzactie_tip" class="table-cell" ">' . $row['tranzactie_tip'] . '</div>';
            echo '<div name="tranzactie_subtip" data-column="tranzactie_subtip" class="table-cell" ">' . $row['tranzactie_subtip'] . '</div>';
            echo '<div name="dataselect" data-column="dataselect" class="table-cell" ondblclick="editCell(this, ' . $row['id'] . ')">' . $row['dataselect'] . '</div>';
            echo '<div name="descriere" data-column="descriere" class="table-cell" ondblclick="editCell(this, ' . $row['id'] . ')">' . $row['descriere'] . '</div>';
            echo '<div name="valoare" data-column="valoare" class="table-cell" ondblclick="editCell(this, ' . $row['id'] . ')">' . $row['valoare'] . '</div>';
            echo '<div name="perioada" data-column="perioada" class="table-cell"  ondblclick="editCell(this, ' . $row['id'] . ')">' . $row['perioada'] . '</div>';
            echo '<div class="table-cell"><button onclick="deleteRecord(' . $row['id'] . ')">Delete</button></div>';

            echo '</div>';
        }
        ?>
    </div>


    </body>
</html>