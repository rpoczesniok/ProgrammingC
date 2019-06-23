<?php
session_start();
?>
<!DOCTYPE html>

<html lang="pl-PL">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Moja strona internetowa - Usługi informatyczne</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./CSS/style.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet">
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script> -->
    <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>

<body>
    <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

    <!-- <div class="popup" id="popup">
        <form action="#" method="post">
            <div><label for="usluga">Usługa</label></div>
            <div><textarea name="usluga" id="usluga" class="formularzPole" required></textarea></div>
            <div><label for="cena">Cena</label></div>
            <div><input type="number" min="0.00" max="10000.00" step="0.01" name="cena" id="cena" class="formularzPole" required /></div>
            <div><input type="checkbox" name="cenaOd" id="cenaOd" value="" class="formularzPole" style="width: auto; margin-top: 1rem; margin-right: 0.5rem;"><span>Cena od</span></div>
            <div><button id="popup-przyciskWyslij">Dodaj</button></div>
        </form>
    </div> -->

    <header>
        <div id="header-nazwa">
            <div class="menu">
                <button class="menu-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <img src="https://randomuser.me/api/portraits/men/15.jpg" alt="">
            <h1 class="header-nazwa">Rafał Pocześniok - usługi informatyczne</h1>



            <?php
            if (!empty($_SESSION["zalogowany"]) && $_SESSION["zalogowany"] = 1) {
                echo '<div class="header-logowanie-ctn zalogowany">';
                echo '  <a href="#">';
                echo '      <div class="header-logowanie-icon">';
                echo '          <i class="material-icons">';
                echo '              account_circle';
                echo '          </i>';
                echo '      </div>';
                echo '      <div class="header-logowanie-txt">';
                echo '          <span>' . $_SESSION["imie"] . ' ' . $_SESSION["nazwisko"] . '</span>';
                echo '      </div>';
                echo '  </a>';
                echo '  <div class="header-menu">';
                echo '      <div class="menu-wiersz">';
                echo '      <a href="formKontakt">Formularz kontaktowy</a>';
                echo '      </div>';
                echo '      <div class="menu-wiersz">';
                echo '      <a href="wyloguj">Wyloguj</a>';
                echo '      </div>';
                echo '  </div>';
                echo '</div>';
            } else {
                echo '<div class="header-logowanie-ctn">';
                echo '    <a href="#">';
                echo '        <div class="header-logowanie-icon">';
                echo '            <i class="material-icons">';
                echo '                account_circle';
                echo '            </i>';
                echo '        </div>';
                echo '        <div class="header-logowanie-txt">';
                echo '            <span>Zaloguj</span>';
                echo '        </div>';
                echo '    </a>';
                echo '    <div class="header-logowanie">';
                echo '        <form class="header-logowanie-form">';
                echo '            <div class="logowanie-wiersz">';
                echo '                <label for="username"><i class="material-icons">account_circle</i></label>';
                echo '                <input type="text" id="username" name="username" required>';
                echo '            </div>';
                echo '            <div class="logowanie-wiersz">';
                echo '                <label for="password"><i class="material-icons">https</i></label>';
                echo '                <input type="password" id="password" name="password" required>';
                echo '            </div>';
                echo '            <div class="logowanie-wiersz">';
                echo '                <button type="submit">Zaloguj</button>';
                echo '            </div>';
                echo '        </form>';
                echo '    </div>';
                echo '</div>';
            }

            ?>
        </div>

        <nav>
            <ul class="nav">
                <li class="nav-element"><a href="index">Strona główna</a></li>
                <li class="nav-element"><a href="oMnie">O mnie</a></li>
                <li class="nav-element"><a href="porady">Porady</a></li>
                <li class="nav-element"><a href="oferta">Oferta</a></li>
                <li class="nav-element"><a href="kontakt">Kontakt</a></li>
                <li class="nav-element"><a href="hobby">Hobby</a></li>
            </ul>
        </nav>
    </header>
    <section id="artykul">
        <div class="artykul">
            <h2 class="artykul-naglowek">dddd</h2>
            <div class="artykul-tresc">
            </div>
        </div>

        <div class="logo">
            <img src="" alt="">
            <div class="data-czas"></div>
        </div>

    </section>

    <script src="./JS/skrypt.js"></script>
    <script src="./JS/skryptJQ.js"></script>
</body>

</html>