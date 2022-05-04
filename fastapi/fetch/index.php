<?php
    session_start();

    if (isset($_SESSION["username"])) {
        header("location: crudPreguntas.php");
        exit();
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body{ font: 14px sans-serif; }
        .wrapper{ width: 360px; padding: 20px; position: absolute; top:  50%; left: 50%; transform: translate(-50%,-50%); border-width: 1px; border-style: solid; border-color: black; }
    </style>
</head>
<body>
    
    <div class="wrapper">
        <h2>Login</h2>
        <p>Please fill in your credentials to login.</p>

        <form action="includes/login.inc.php" method="post">
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" placeholder="Username">
            </div>    
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="Password">
            </div>
            <button type="submit" name="submit">Login</button>
        </form>
    </div>
    <?php
        if(isset($_GET["error"])) {
            if ($_GET["error"] == "emptyInput") {
                echo "<p>Fill in all fields!</p>";
            }
            else if ($_GET["error"] == "wronglogin") {
                echo "<p>Credentials are invalid!</p>";
            }
        }
    ?>
</body>
</html>