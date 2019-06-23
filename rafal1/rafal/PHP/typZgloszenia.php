<?php

session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rafal";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conn->query("SET NAMES 'utf8'");
$sql = "SELECT id, nazwa FROM typzgloszen order by nazwa";

$result = $conn->query($sql);

$conn->close();

if ($result->num_rows > 0) {
    $return = '';
    while ($row = $result->fetch_assoc()) {


        $return .= '<option value="' . $row['id'] . '">' . $row['nazwa'] . '</option>';
    }

    echo '<select id="typZgloszenia" class="formularzPole">' . $return . '</select>';
} else {
    echo    '{
    "status": 0
    }';
}
