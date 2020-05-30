-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 24, 2020 at 06:30 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `evidencija_opreme_u_vrticu`
--

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS `vratiOpremu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `vratiOpremu` (IN `naziv_opreme` VARCHAR(255))  NO SQL
SELECT oprema.id, oprema.naziv, oprema.opis, tipovi_opreme.naziv as naziv_tipa FROM oprema INNER JOIN tipovi_opreme ON oprema.id_tipa = tipovi_opreme.id WHERE oprema.naziv LIKE CONCAT('%', naziv_opreme, '%')$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `oprema`
--

DROP TABLE IF EXISTS `oprema`;
CREATE TABLE IF NOT EXISTS `oprema` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(255) NOT NULL,
  `opis` varchar(500) NOT NULL,
  `id_tipa` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_tipa` (`id`,`id_tipa`),
  KEY `fk_tip` (`id_tipa`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `oprema`
--

INSERT INTO `oprema` (`id`, `naziv`, `opis`, `id_tipa`) VALUES
(1, 'Mali princ', 'Decija knjiga', 3),
(16, 'Bojanka za decu', 'Bojanka za uzrast 3-13 god', 5),
(19, 'Deciji tobogan', 'Tobogan za decu!', 6);

-- --------------------------------------------------------

--
-- Table structure for table `tipovi_opreme`
--

DROP TABLE IF EXISTS `tipovi_opreme`;
CREATE TABLE IF NOT EXISTS `tipovi_opreme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tipovi_opreme`
--

INSERT INTO `tipovi_opreme` (`id`, `naziv`) VALUES
(1, 'vaspitni'),
(2, 'obrazovni'),
(3, 'vaspitno-obrazovni'),
(5, 'didakticki'),
(6, 'kreativni');

-- --------------------------------------------------------

--
-- Table structure for table `vaspitaci`
--

DROP TABLE IF EXISTS `vaspitaci`;
CREATE TABLE IF NOT EXISTS `vaspitaci` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `korisnicko_ime` varchar(255) NOT NULL,
  `lozinka` varchar(500) NOT NULL,
  `datum_rodjenja` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `korisnicko_ime` (`korisnicko_ime`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vaspitaci`
--

INSERT INTO `vaspitaci` (`id`, `korisnicko_ime`, `lozinka`, `datum_rodjenja`) VALUES
(1, 'dejanb', '123123', '1996-05-12'),
(2, 'milutin', '123123', '2020-05-06');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `oprema`
--
ALTER TABLE `oprema`
  ADD CONSTRAINT `fk_tip` FOREIGN KEY (`id_tipa`) REFERENCES `tipovi_opreme` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
