<html>
    <head>
        
        <title>My Project</title>
        <link rel="stylesheet" href="styles.css?v=<?php echo time(); ?>">
        <script src="Expenses.js"></script>
       <?php
include("ExpensesFromSQL.php");
?>

<script>
    window.onload = function() {
        Check_dates();
};
    
</script>

<script>
    window.onload = function(){
        Car2_visible();
};
</script>
    </head>

    <body>
    
        <div class="sidebar">
            <img src="resources/Temp family pic.jpg" width="100%"/>
           <div class="WelcomeUser">
           <?php
            // Iti aduce user-nameul in fisier, iar daca nu esti logat te directioneaza
            session_start();

            // Verifica daca userul e logat
            if (isset($_SESSION['account'])) {
                $accountName = $_SESSION['account'];
                echo "Welcome, $accountName!";
            } else {
                // Redirect
                header("Location: index.html");
                exit();
            }
            ?>
        </div>
            <ul>
                <li><a href="Dashboard.php">Dashboard</a></li>
                <li>To Do's</li>
                <li><a href="Calendar.html">Calendar</a></li>
                <li>Shopping list</li>
                <li><a href="Recipes.html">Recipes</a></li>
                <li>Bucket List</li>
                <li><a id="active" href="Expenses.php">Expenses</a></li>
            </ul>
        </div>
        <?php
            if(is_array($fetchData)){      
             $sn=1;
             foreach($fetchData as $data){
        ?>
        <?php $sn++;}}else{ ?>
        <?php echo $fetchData; ?>
        <?php }?>      
        <div class="expenses">
        <form id="TableForm" method="POST" action="/ExpensesSQL.php">
            <table id="tabMasina1">
                <tr>
                    <td colspane="3"><input type="button" id="car1_name_add" class="carNameAdd" value="Set car name" onclick="Modif_Car1_name()"></td>
                    <td colspan="4"><input type="text" id="car1_name" name="car1_name" class="carName" value='<?php echo $row1['car1_name']??''; ?>' readonly>
                </tr>
                <tr>
                    <td></td>
                    <td style="font-weight: bold;">Asigurare</td>
                    <td><input type="button" id="car1_Asigurare" class="expensesAdd" value="+" onclick="Modif_Car1_Asigurare()"></td>
                    <td style="font-weight: bold;">ITP</td>
                    <td><input type="button" id="car1_Asigurare" class="expensesAdd" value="+" onclick="Modif_Car1_ITP()"></td>
                    <td style="font-weight: bold;">Rovigneta</td>
                    <td><input type="button" id="car1_Asigurare" class="expensesAdd" value="+" onclick="Modif_Car1_Rovigneta()"></td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Data</td>
                    <td colspan="2">
                        <input type="text" id="car1_Asigurare_Data_txtbox" name="car1_Asigurare_Data_txtbox" value='<?php echo $row1['car1_Asigurare_Data_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="car1_ITP_Data_txtbox" name="car1_ITP_Data_txtbox" value='<?php echo $row1['car1_ITP_Data_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="car1_Rovigneta_Data_txtbox" name="car1_Rovigneta_Data_txtbox" value='<?php echo $row1['car1_Rovigneta_Data_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Perioada</td>
                    <td colspan="2">
                        <input type="text" id="car1_Asigurare_Perioada_txtbox" name="car1_Asigurare_Perioada_txtbox" value='<?php echo $row1['car1_Asigurare_Perioada_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="car1_ITP_Perioada_txtbox" name="car1_ITP_Perioada_txtbox" value='<?php echo $row1['car1_ITP_Perioada_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="car1_Rovigneta_Perioada_txtbox" name="car1_Rovigneta_Perioada_txtbox" value='<?php echo $row1['car1_Rovigneta_Perioada_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">RON</td>
                    <td colspan="2">
                        <input type="text" id="car1_Asigurare_RON_txtbox" name="car1_Asigurare_RON_txtbox" value='<?php echo $row1['car1_Asigurare_RON_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="car1_ITP_RON_txtbox" name="car1_ITP_RON_txtbox" value='<?php echo $row1['car1_ITP_RON_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="car1_Rovigneta_RON_txtbox" name="car1_Rovigneta_RON_txtbox" value='<?php echo $row1['car1_Rovigneta_RON_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                </tr>
            </table>
            <input type="button" id="car2_add" name="car2_add" value="Add New Car" class="carNameAdd" onclick=Car2_add()></button>
            
            <table id="tabMasina2" style="display: none;">
                <tr>
                    <td colspane="3"><input type="button" id="car2_name_add" class="carNameAdd" value="Set car name" onclick="Modif_Car2_name()"></td>
                    <td colspan="4"><input type="text" id="car2_name" name="car2_name" class="carName" value='<?php echo $row2['car2_name']??''; ?>' readonly>
                </tr>
                <tr>
                    <td></td>
                    <td style="font-weight: bold;">Asigurare</td>
                    <td><input type="button" id="car2_Asigurare" name="car2_Asigurare" class="expensesAdd" value="+" onclick="Modif_Car2_Asigurare()"></td>
                    <td style="font-weight: bold;">ITP</td>
                    <td><input type="button" id="car2_Asigurare" name="car2_Asigurare" class="expensesAdd" value="+" onclick="Modif_Car2_ITP()"></td>
                    <td style="font-weight: bold;">Rovigneta</td>
                    <td><input type="button" id="car2_Asigurare" name="car2_Asigurare" class="expensesAdd" value="+" onclick="Modif_Car2_Rovigneta()"></td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Data</td>
                    <td colspan="2">
                        <input type="text" id="car2_Asigurare_Data_txtbox" name="car2_Asigurare_Data_txtbox" value='<?php echo $row2['car2_Asigurare_Data_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="car2_ITP_Data_txtbox" name="car2_ITP_Data_txtbox" value='<?php echo $row2['car2_ITP_Data_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="car2_Rovigneta_Data_txtbox" name="car2_Rovigneta_Data_txtbox" value='<?php echo $row2['car2_Rovigneta_Data_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Perioada</td>
                    <td colspan="2">
                        <input type="text" id="car2_Asigurare_Perioada_txtbox" name="car2_Asigurare_Perioada_txtbox" value='<?php echo $row2['car2_Asigurare_Perioada_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="car2_ITP_Perioada_txtbox" name="car2_ITP_Perioada_txtbox" value='<?php echo $row2['car2_ITP_Perioada_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="car2_Rovigneta_Perioada_txtbox" name="car2_Rovigneta_Perioada_txtbox" value='<?php echo $row2['car2_Rovigneta_Perioada_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">RON</td>
                    <td colspan="2">
                        <input type="text" id="car2_Asigurare_RON_txtbox" name="car2_Asigurare_RON_txtbox" value='<?php echo $row2['car2_Asigurare_RON_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="car2_ITP_RON_txtbox" name="car2_ITP_RON_txtbox" value='<?php echo $row2['car2_ITP_RON_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="car2_Rovigneta_RON_txtbox" name="car2_Rovigneta_RON_txtbox" value='<?php echo $row2['car2_Rovigneta_RON_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                </tr>
            </table>

            <table id="tabEntertainment">
                <tr>
                    <td></td>
                    <td style="font-weight: bold;">Telefon 1</td>
                    <td><input type="button" id="Telefon1" name="Telefon1" class="expensesAdd" value="+" onclick="Modif_Telefon1()"></td>
                    <td style="font-weight: bold;">Telefon 2</td>
                    <td><input type="button" id="Telefon2" name="Telefon2" class="expensesAdd" value="+" onclick="Modif_Telefon2()"></td>
                    <td style="font-weight: bold;">Internet</td>
                    <td><input type="button" id="Internet" name="Internet" class="expensesAdd" value="+" onclick="Modif_Internet()"></td>
                    <td style="font-weight: bold;">Televiziune</td>
                    <td><input type="button" id="Televiziune" name="Televiziune" class="expensesAdd" value="+" onclick="Modif_Televiziune()"></td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Data</td>
                    <td colspan="2">
                        <input type="text" id="Telefon1_Data_txtbox" name="Telefon1_Data_txtbox" value='<?php echo $row3['Telefon1_Data_txtbox']??''; ?>'   class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="Telefon2_Data_txtbox" name="Telefon2_Data_txtbox" value='<?php echo $row3['Telefon2_Data_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="Internet_Data_txtbox" name="Internet_Data_txtbox" value='<?php echo $row3['Internet_Data_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="Televiziune_Data_txtbox" name="Televiziune_Data_txtbox" value='<?php echo $row3['Televiziune_Data_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">RON</td>
                    <td colspan="2">
                        <input type="text" id="Telefon1_RON_txtbox" name="Telefon1_RON_txtbox" value='<?php echo $row3['Telefon1_RON_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="Telefon2_RON_txtbox" name="Telefon2_RON_txtbox" value='<?php echo $row3['Telefon2_RON_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="Internet_RON_txtbox" name="Internet_RON_txtbox" value='<?php echo $row3['Internet_RON_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="Televiziune_RON_txtbox" name="Televiziune_RON_txtbox" value='<?php echo $row3['Televiziune_RON_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                </tr>
                <tr></tr>
                <tr>
                    <td></td>
                    <td style="font-weight: bold;">Netflix</td>
                    <td><input type="button" id="Netflix" name="Netflix" class="expensesAdd" value="+" onclick="Modif_Netflix()"></td>
                    <td style="font-weight: bold;">Disney+</td>
                    <td><input type="button" id="Disney" name="Disney" class="expensesAdd" value="+" onclick="Modif_Disney()"></td>
                    <td style="font-weight: bold;">HBO Max</td>
                    <td><input type="button" id="HBOmax" name="HBOmax" class="expensesAdd" value="+" onclick="Modif_HBOmax()"></td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Data</td>
                    <td colspan="2">
                        <input type="text" id="Netflix_Data_txtbox" name="Netflix_Data_txtbox" value='<?php echo $row3['Netflix_Data_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="Disney_Data_txtbox" name="Disney_Data_txtbox" value='<?php echo $row3['Disney_Data_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="HBOmax_Data_txtbox" name="HBOmax_Data_txtbox" value='<?php echo $row3['HBOmax_Data_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                </tr>
                <tr>
                <td style="font-weight: bold;">RON</td>
                <td colspan="2">
                        <input type="text" id="Netflix_RON_txtbox" name="Netflix_RON_txtbox" value='<?php echo $row3['Netflix_RON_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="Disney_RON_txtbox" name="Disney_RON_txtbox" value='<?php echo $row3['Disney_RON_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="HBOmax_RON_txtbox" name="HBOmax_RON_txtbox" value='<?php echo $row3['HBOmax_RON_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                </tr>
            </table>
            <table id="tabCasa">
                <tr>
                    <td></td>
                    <td style="font-weight: bold;">Curent</td>
                    <td><input type="button" id="Curent" class="expensesAdd" name="Curent" value="+" onclick="Modif_Curent()"></td>
                    <td style="font-weight: bold;">Gaz</td>
                    <td><input type="button" id="Gaz" class="expensesAdd" name="Gaz" value="+" onclick="Modif_Gaz()"></td>
                    <td style="font-weight: bold;">Apa</td>
                    <td><input type="button" id="Apa" class="expensesAdd" name="Apa" value="+" onclick="Modif_Apa()"></td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Data</td>
                    <td colspan="2">
                        <input type="text" id="Curent_Data_txtbox" name="Curent_Data_txtbox" value='<?php echo $row3['Curent_Data_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="Gaz_Data_txtbox" name="Gaz_Data_txtbox" value='<?php echo $row3['Gaz_Data_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="Apa_Data_txtbox" name="Apa_Data_txtbox" value='<?php echo $row3['Apa_Data_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">RON</td>
                    <td colspan="2">
                        <input type="text" id="Curent_RON_txtbox" name="Curent_RON_txtbox" value='<?php echo $row3['Curent_RON_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="Gaz_RON_txtbox" name="Gaz_RON_txtbox" value='<?php echo $row3['Gaz_RON_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" id="Apa_RON_txtbox" name="Apa_RON_txtbox" value='<?php echo $row3['Apa_RON_txtbox']??''; ?>'  class="expenseInput" readonly>
                    </td>
                </tr>
            </table>


            <br>
            <input type="submit" name="Submit" value="" id="Submit" title="Update">
        </div>   
        </form>

        <div class="expensesCalculations">
            <p>Here will be calculations</p>
            <Button value="Date check" onclick=Check_dates()>Check</button>
        </div>
    </body>
</html>