<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rafal";

$operacja = $_POST['operacja'];
// $operacja = 2;
switch ($operacja) {
    case 1:
        $typZgloszenia = $_POST['typZgloszeniaId'];
        $usluga = $_POST['usluga'];
        $cena = $_POST['cena'];
        $cenaOd = $_POST['cenaOd'];

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $conn->query("SET NAMES 'utf8'");
        $sql = "insert into oferta (typZgloszeniaId, nazwa, cena, cenaOd) ";
        $sql .= "values(" . $typZgloszenia . ", '" . $usluga . "', " . $cena . ", " . $cenaOd . ")";

        if ($conn->query($sql) === TRUE) {
            echo '{"status": 1}';
        } else {
            echo '{"status": 0}';
        }
        break;
    case 2:
        session_start();

        $zalogowany = 1;
        if (!isset($_SESSION["zalogowany"])) {
            $zalogowany = 0;
        } elseif ($_SESSION["zalogowany"] == 0) {
            $zalogowany = 0;
        }

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $conn->query("SET NAMES 'utf8'");

        if ($zalogowany == 1) {
            $sql = file_get_contents('./SQL/ofertaAll.sql');
        } else {
            $sql = file_get_contents('./SQL/oferta.sql');
        }

        $result = $conn->query($sql);

        $conn->close();

        $return = '';
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                if (!empty($return)) {
                    $return .= ',';
                }
                $return .= json_encode($row);
            };

            echo '{"status": 1, "zalogowany": ' . $zalogowany . ', "dane": [' . $return . ']}';
        } else {
            echo '{"status": 1, "zalogowany": ' . $zalogowany . ', "dane": []}';
        }
        break;
    case 3:
        session_start();
        if ($_SESSION["zalogowany"] == 0) {
            echo '{"status": 0, "error": "Proszę się zalogować"}';
            return;
        }

        $id = $_POST['id'];

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $conn->query("SET NAMES 'utf8'");
        $sql = "delete from oferta where oferta.id = " . $id;

        if ($conn->query($sql) === TRUE) {
            echo '{"status": 1}';
        } else {
            echo '{"status": 0}';
        }
        break;
    default:
        echo '{"status": 0}';
        break;
}
