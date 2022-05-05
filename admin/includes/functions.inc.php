<?php

function emptyInputLogin($username, $pwd) {
    $result = false;
    
    if (empty($username) || empty($pwd)) {
        $result = true;
    }

    return $result;

}

function uidExists($conn,$username) {
    $sql = "SELECT * FROM login WHERE username = ?;";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        header("location: ../index.php?error=stmtfailed");
        exit();
    }

    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($resultData)) {
        return $row;
    }
    else {
        $result = false;
        return $result;
    }

    mysqli_stmt_close($stmt);
}

function loginUser($conn,$username, $pwd) {
    $uidExists = uidExists($conn,$username);

    if ($uidExists === false) {
        header("location: ../index.php?error=wronglogin");
        exit();
    }
    
    $pwdHashed = $uidExists["password"];
    $checkPwd = password_verify($pwd,$pwdHashed);

    if ($checkPwd === false) {
        header("location: ../index.php?error=wronglogin");
        exit();
    }
    else if ($checkPwd === true) {
        session_start();
        $_SESSION["userid"] = $uidExists["id"];
        $_SESSION["username"] = $uidExists["username"];
        header("location: ../crudPreguntas.php");
        exit();
    }
}