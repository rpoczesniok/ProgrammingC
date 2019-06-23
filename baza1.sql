-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 24 Maj 2019, 17:18
-- Wersja serwera: 10.1.40-MariaDB
-- Wersja PHP: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Baza danych: `rafal`
--
CREATE DATABASE IF NOT EXISTS `rafal` DEFAULT CHARACTER SET utf8 COLLATE utf8_polish_ci;
USE `rafal`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `formkontaktowy`
--

DROP TABLE IF EXISTS `formkontaktowy`;
CREATE TABLE `formkontaktowy` (
  `id` int(11) NOT NULL,
  `typZgloszeniaId` int(11) NOT NULL,
  `imieNazwisko` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `tresc` varchar(1000) NOT NULL,
  `data` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `telefon` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `formkontaktowy`
--

INSERT INTO `formkontaktowy` (`id`, `typZgloszeniaId`, `imieNazwisko`, `email`, `tresc`, `data`, `telefon`) VALUES
(17, 3, 'Marcin Rozik', 'rozik.marcin@gmail.com', 'dfsdfsadf', '2019-05-23 19:23:39', '665842265');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `oferta`
--

DROP TABLE IF EXISTS `oferta`;
CREATE TABLE `oferta` (
  `id` int(11) NOT NULL,
  `typZgloszeniaId` int(11) NOT NULL,
  `nazwa` char(200) COLLATE utf8_polish_ci NOT NULL,
  `cena` decimal(10,2) NOT NULL,
  `cenaOd` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `oferta`
--

INSERT INTO `oferta` (`id`, `typZgloszeniaId`, `nazwa`, `cena`, `cenaOd`) VALUES
(1, 1, 'Diagnostyka uszkodzeń', '30.00', 0),
(2, 1, 'Wymiana podzespołów (karty, pamięci, dyski, czytniki CD/DVD, zasilacze)', '25.00', 0),
(3, 1, 'Wymiana podzespołów (płyta główna, procesor, obudowa)', '40.00', 0),
(4, 1, 'Czyszczenie wnętrza komputera wraz z układem chłodzenia z kurzu', '40.00', 0),
(5, 1, 'Czyszczenie wnętrza komputera wraz z układem chłodzenia i wymianą pasty termoprzewodzącej', '50.00', 0),
(6, 2, 'Kompleksowa instalacja systemów operacyjnych z rodziny Windows wraz z kompletem sterowników, aktualizacji i podstawowym oprogramowaniem', '80.00', 0),
(8, 2, 'Archiwizacja danych na płytach DVD', '15.00', 0),
(9, 2, 'Instalacja oprogramowania, sterowników', '20.00', 1),
(10, 2, 'Odzyskiwanie danych', '50.00', 1),
(11, 2, 'Usuwanie wirusów, malware, spyware, złośliwego oprogramowania', '30.00', 1),
(12, 3, 'Konfiguracja routera / access pointa pod kątem dostępu do internetu', '50.00', 0),
(13, 3, 'Konfiguracja połączenia z internetem w komputerze (internet mobilny, WiFi, LAN)', '25.00', 0),
(14, 4, 'Projekt i wykonanie strony internetowej', '250.00', 1),
(15, 4, 'Rejestracja domen, usług hostingowych', '20.00', 1),
(16, 4, 'Konfiguracja kont pocztowych, FTP w ramach hostingu współdzielonego', '20.00', 1),
(17, 4, 'Konfiguracja domen', '20.00', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `typzgloszen`
--

DROP TABLE IF EXISTS `typzgloszen`;
CREATE TABLE `typzgloszen` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `typzgloszen`
--

INSERT INTO `typzgloszen` (`id`, `nazwa`) VALUES
(3, 'Sieci komputerowe, łącza internetowe'),
(4, 'Strony internetowe, poczta email, domeny'),
(2, 'Systemy operacyjne, sterowniki, oprogramowanie'),
(1, 'Usługi serwisowe i modernizacyjne komputerów stacjonarnych');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `uzytkownik`
--

DROP TABLE IF EXISTS `uzytkownik`;
CREATE TABLE `uzytkownik` (
  `id` int(11) NOT NULL,
  `login` char(50) NOT NULL,
  `haslo` char(50) NOT NULL,
  `imie` char(100) NOT NULL,
  `nazwisko` char(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `uzytkownik`
--

INSERT INTO `uzytkownik` (`id`, `login`, `haslo`, `imie`, `nazwisko`) VALUES
(1, 'rafal', 'rafal12345', 'Rafał', 'Pocześniok');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `formkontaktowy`
--
ALTER TABLE `formkontaktowy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_form_kont_typ_zgl` (`typZgloszeniaId`);

--
-- Indeksy dla tabeli `oferta`
--
ALTER TABLE `oferta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_oferta_typ_zgl` (`typZgloszeniaId`);

--
-- Indeksy dla tabeli `typzgloszen`
--
ALTER TABLE `typzgloszen`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_nazwa` (`nazwa`);

--
-- Indeksy dla tabeli `uzytkownik`
--
ALTER TABLE `uzytkownik`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `formkontaktowy`
--
ALTER TABLE `formkontaktowy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT dla tabeli `oferta`
--
ALTER TABLE `oferta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT dla tabeli `typzgloszen`
--
ALTER TABLE `typzgloszen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `uzytkownik` 
--
ALTER TABLE `uzytkownik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `formkontaktowy`
--
ALTER TABLE `formkontaktowy`
  ADD CONSTRAINT `FK_form_kont_typ_zgl` FOREIGN KEY (`typZgloszeniaId`) REFERENCES `typzgloszen` (`id`) ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `oferta`
--
ALTER TABLE `oferta`
  ADD CONSTRAINT `FK_oferta_typ_zgl` FOREIGN KEY (`typZgloszeniaId`) REFERENCES `typzgloszen` (`id`) ON UPDATE CASCADE;
COMMIT;
