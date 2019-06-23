<?php
session_start();

$_SESSION["zalogowany"] = 0;
unset($_SESSION["imie"]);
unset($_SESSION["nazwisko"]);
echo    '{"status": 1}';
