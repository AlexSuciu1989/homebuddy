
<html>
    <head>
        <title>HomeBuddy</title>
        <link rel="stylesheet" href="./css/style-login.css">
        <link rel="shortcut icon" href="/resources/favicon.png">
        <script src="./js/register.js"></script>
    </head>

    <body>
        <img src="./resources/Logo HomeBuddy.png">
        <div class="registerform">
            <form action="./php/registerSQL.php" method="POST" >

                <label>Account name</label>
                <input type="text" id="account" class="loginInput" name="account" placeholder="Choose an account name"><br><br>

                <label>E-mail Adress</label>
                <input type="text" id="email" class="loginInput" name="email" placeholder="Enter a valid email adress"><br><br>

                <label>User</label>
                <input type="text" id="member" class="loginInput" name="member" placeholder="Enter your user"><br><br>

                <label>Password</label>
                <input type="password" placeholder="Password" id="password" name="password" class="loginInput" oninput="validatePassword()" required><br><br>

                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm Password" id="confirm_password" class="loginInput" oninput ="validatePassword()"  required><br><br>

                <input type="submit" name="Submit" class="LoginButton" title="Update" value="Create new account"><br><br>
                <input type="button" value="Cancel" class="LoginButton" onclick="window.location.href='/index.html';">

            </form>

        </div>
    </body>
</html>