<?php

if (isset($_POST["submit"])) {

    $username = $_POST["username"];
    $pwd = $_POST["password"];

    require_once './dbh.inc.php';
    require_once './functions.inc.php';

    if (emptyInputLogin($username, $pwd) !== false) {
        header("location: ../index.php?error=emptyInput");
        exit();
    }

    loginUser($conn,$username,$pwd);
}
else {
    header("location: ../index.php");
    exit();
}