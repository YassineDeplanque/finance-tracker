-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 14 oct. 2025 à 08:45
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `finance`
--

-- --------------------------------------------------------

--
-- Structure de la table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
CREATE TABLE IF NOT EXISTS `expenses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` float NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `date` date NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_expenses_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `expenses`
--

INSERT INTO `expenses` (`id`, `amount`, `category`, `date`, `user_id`) VALUES
(1, 35, 'Food', '2025-08-31', 1),
(2, 15, 'Restaurant', '2025-09-02', 1),
(3, 25, 'Restaurant', '2025-09-02', 1);

-- --------------------------------------------------------

--
-- Structure de la table `income`
--

DROP TABLE IF EXISTS `income`;
CREATE TABLE IF NOT EXISTS `income` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` float NOT NULL,
  `source` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `date` date NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_income_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `income`
--

INSERT INTO `income` (`id`, `amount`, `source`, `date`, `user_id`) VALUES
(2, 1400, 'Salary', '2025-09-01', 1);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `name`, `lastname`, `password`) VALUES
(1, 'test@gmail.com', 'test', 'test', '$argon2id$v=19$m=65536,t=3,p=4$fjhLeWdudmItq2mS/C45lg$sWWDidAMlU1qyozcV4UaE+av5CYSFXQtd/gOigtQkJw'),
(2, 'yassine59958@gmail.com', 'Deplanque', 'Yassine', '$argon2id$v=19$m=65536,t=3,p=4$Trt7iTSylxCPhijguG3StA$uiQzSjrEMQDdAKLoPndBrBzlIFQdt3gBAPy7O5ynBbY'),
(3, 'test1@gmail.com', 'test', 'test', '$argon2id$v=19$m=65536,t=3,p=4$DlAVNdRMb6/tqTv/Zp4hzQ$migEQ838QugtAvQPn4Ka9XtKnxWuKGrcZzsc2fw4PPI'),
(4, 'darkaoui@gmail.com', 'Darkaoui', 'Brioit', '$argon2id$v=19$m=65536,t=3,p=4$OPXZX1ZBncmR9WPZb6ITAQ$Te0D/kh2IeovitNgbBArn49fMHb7wYQBdYxqMehh0X8'),
(5, 'werg', 'werg', 'weg', '$argon2id$v=19$m=65536,t=3,p=4$NKoD3TsOrLCINcDeAj2j5A$7HglRcjD6o2fKUgtsVp9hE0eHCBbpQJG1xytvki+hYo'),
(6, 'werh', 'werg', 'wehr', '$argon2id$v=19$m=65536,t=3,p=4$IoFcap329UfQ1+Oqj9uc5w$lC8yutrbgrF8Dh7nGA6Auio/g1ceZecATopMaeKcVZk');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `fk_expenses_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `income`
--
ALTER TABLE `income`
  ADD CONSTRAINT `fk_income_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
