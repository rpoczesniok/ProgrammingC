<?php

session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rafal";

$login = $_POST['login'];
$pass = $_POST['haslo'];

/* $login = "rafal";
$pass = "rafal12345"; */

if (empty($login) || empty($pass)) {
    echo    '{"status": 0, "error": "Konto lub hasło jest nieprawidłowe. <br>Ponów próbę."}';
    return;
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conn->query("SET NAMES 'utf8'");
$sql = "SELECT * FROM uzytkownik where login = '" . $login . "' and haslo = '" . $pass . "'";

$result = $conn->query($sql);

$conn->close();

if ($result->num_rows > 0) {
    $_SESSION["zalogowany"] = 1;
    // output data of each row
    $row = $result->fetch_assoc();
    $_SESSION["login"] = $row["login"];
    $_SESSION["imie"] = $row["imie"];
    $_SESSION["nazwisko"] = $row["nazwisko"];

    echo '{"status": 1, "uzytkownik": {"id": "' . $row["id"] . '", "imie": "' . $row["imie"] . '", "nazwisko": "' . $row["nazwisko"] . '"}}';
} else {
    $_SESSION["zalogowany"] = 0;
    unset($_SESSION["imie"]);
    unset($_SESSION["nazwisko"]);
    echo    '{"status": 0, "error": "Konto lub hasło jest nieprawidłowe. <br>Ponów próbę."}';
}
