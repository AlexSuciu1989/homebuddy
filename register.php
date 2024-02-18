
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>HomeBuddy</title>
        <link rel="stylesheet" href="./css/style-login.css">
        <link rel="shortcut icon" href="/resources/favicon.png">
        <script src="./js/register.js"></script>
    </head>

    <body>
        <div class="container mt-5">
            <div class="row d-flex justify-content-center">
                <div class="col-lg-4">
                    <div class="px-5 mb-3">
                        <img class="img-fluid" src="./resources/Logo HomeBuddy.png">
                    </div>
                    <div class="login p-2  ">
                        <form action="./php/registerSQL.php" class="mt-4" method="POST" >
                        <div class="my-1 mx-4">
                                <label>Account name</label>
                                <input type="text" id="account" class="loginInput  form-control" name="account" placeholder="Choose an account name">
                            </div>
                            <div class="my-1 mx-4">
                                <label>E-mail Adress</label>
                                <input type="text" id="email" class="loginInput  form-control" name="email" placeholder="Enter a valid email adress">
                            </div>
                            <div class="my-1 mx-4">
                                <label>User</label>
                                <input type="text" id="member" class="loginInput  form-control" name="member" placeholder="Enter your user">
                            </div>
                            <div class="my-1 mx-4">
                                <label>Password</label>
                                <input type="password" placeholder="Password" id="password" name="password" class="loginInput  form-control" oninput="validatePassword()" required>
                            </div>
                            <div class="my-1 mx-4">
                                <label>Confirm Password</label>
                                <input type="password" placeholder="Confirm Password" id="confirm_password" class="loginInput  form-control" oninput ="validatePassword()"  required>
                            </div>
                            <div class="my-1 mx-4">
                                <input type="submit" name="Submit" class="LoginButton btn btn-secondary text-white m-4" title="Update" value="Create new account">
                                <input type="button" value="Cancel" class="LoginButtonbtn btn btn-light m-4" onclick="window.location.href='/';">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>