<?php

$serverName = "localhost";
$dbUsername = "Tec";
$dbPassword = "tecPass.2274";
$dbName = "chatbot";

$conn = mysqli_connect($serverName,$dbUsername,$dbPassword,$dbName);

if (!$conn) {
    die("Connection failed: ". mysqli_connect_error());
} 
