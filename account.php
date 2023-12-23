<html>
    <head>
        <title>Homebuddy - MyAccount</title>
        <link rel="stylesheet" href="/account/account-style.css">

        <link rel="stylesheet" href="./budget/style.css"/>

        <link rel="shortcut icon" href="/resources/favicon.png">

    </head>

    <body>
        <div class="topbar">
        
            <img src="/resources/Temp family pic.jpg" class="avatar" height="60" >        
            
            <div class="menu"> <!-- Meniul -->
                <ul>
                    <li> <a href="account.php"><img src="/resources/user-solid.svg" width="20" height="20" alt="User" title="User"   id="activeMenu"></a> </li>
                    <li> <a href="budget.php"><img src="/resources/receipt-solid.svg" width="20" height="20" alt="Cheltuieli" title="Tranzactii"></a> </li>
                    <li> <a href="menu.php"><img src="/resources/utensils-solid.svg" width="20" height="20" alt="Meniu" title="Meniu"></a></li>
                </ul>
             </div>
        </div>

 
        <div class="user-welcome-account">
            <img src="/resources/Temp family pic.jpg" class="avatar-account" height="200" >
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

        <div class="container-account">
            <label>Schimba fotografia de profil</label>
            <br><br>
            <input type=file>
            <br>
            <br>
            <input type=submit value="Upload">
            <br><br>
            <label>Adauga membrii familiei</label>
            <br><br>
            <span><input type=text><input type=text><input type=text></span>
            <br><br>
            <label>Schimba parola</label>
            <br><br>
            <label>Parola actuala</label>
            <input type=text>
            <br>
            <label>Parola noua</label>
            <input type=text>
            <br>
            <label>Confirma parola noua</label>
            <input type=text>

        </div>
    </body>
</html>