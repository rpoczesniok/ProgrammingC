<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rafal";

$operacja = $_POST['operacja'];
// $operacja = 2;
switch ($operacja) {
    case 1:
        $typZgloszenia = $_POST['typZgloszenia'];
        $imieNazwisko = $_POST['imieNazwisko'];
        $tel = $_POST['tel'];
        $email = $_POST['email'];
        $tresc = $_POST['tresc'];

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $conn->query("SET NAMES 'utf8'");
        $sql = "insert into formkontaktowy (typZgloszeniaId, imieNazwisko, email, tresc, telefon) ";
        $sql .= "values(" . $typZgloszenia . ", '" . $imieNazwisko . "', '" . $email . "', '" . $tresc . "', '" . $tel . "')";

        if ($conn->query($sql) === TRUE) {
            echo '{"status": 1}';
        } else {
            echo '{"status": 0}';
        }
        break;
    case 2:
        session_start();
        if (!isset($_SESSION["zalogowany"])) {
            echo '{"status": 0, "error": "Proszę się zalogować"}';
            return;
        }

        if ($_SESSION["zalogowany"] == 0) {
            echo '{"status": 0, "error": "Proszę się zalogować"}';
            return;
        }

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $conn->query("SET NAMES 'utf8'");
        $sql = file_get_contents('./SQL/formKontaktowy.sql');

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

            echo '{"status": 1, "dane": [' . $return . ']}';
        } else {
            echo '{"status": 1, "dane": []}';
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
        $sql = "delete from formkontaktowy where formkontaktowy.id = " . $id;

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
