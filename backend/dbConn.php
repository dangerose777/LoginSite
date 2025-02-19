<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "loginsitedb";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connecting Error: " . $conn->connect_error);
}
?>