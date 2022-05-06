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
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    
    <div class="container">

        <div class="container--title">
            <h1>Naatik CRUD</h1>
            <img src="../chatbot/img/Logo-header.svg" alt="">
        </div>

        <div class="container--login">
            <div class="container--text">
                <h2>Login</h2>
                <p>Por favor ingresa con tus credenciales.</p>
            </div>
            
            <form action="includes/login.inc.php" method="post">
                <div class="form-group">
                    <input type="text" name="username" placeholder="Usuario">
                </div>    
                <div class="form-group">
                    <input type="password" name="password" placeholder="Contraseña">
                </div>
                <button type="submit" name="submit">Login</button>
            </form>
            <?php
                if(isset($_GET["error"])) {
                    if ($_GET["error"] == "emptyInput") {
                        echo "<p class='error'>Fill in all fields!</p>";
                    }
                    else if ($_GET["error"] == "wronglogin") {
                        echo "<p class='error'>Credentials are invalid!</p>";
                    }
                }
            ?>
        </div>
    </div>

</body>
</html>