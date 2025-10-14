SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
CREATE TABLE `expenses` (
  `id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `category` varchar(255) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
INSERT INTO `expenses` (`id`, `amount`, `category`, `date`) VALUES
(1, 35, 'Food', '2025-08-31'),
(2, 15, 'Restaurant', '2025-09-02'),
(3, 25, 'Restaurant', '2025-09-02');
CREATE TABLE `income` (
  `id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `source` varchar(255) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
INSERT INTO `income` (`id`, `amount`, `source`, `date`) VALUES
(2, 1400, 'Salary', '2025-09-01');
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
INSERT INTO `user` (`id`, `email`, `name`, `lastname`, `password`) VALUES
(1, 'test@gmail.com', 'test', 'test', '$argon2id$v=19$m=65536,t=3,p=4$fjhLeWdudmItq2mS/C45lg$sWWDidAMlU1qyozcV4UaE+av5CYSFXQtd/gOigtQkJw'),
(2, 'yassine59958@gmail.com', 'Deplanque', 'Yassine', '$argon2id$v=19$m=65536,t=3,p=4$Trt7iTSylxCPhijguG3StA$uiQzSjrEMQDdAKLoPndBrBzlIFQdt3gBAPy7O5ynBbY'),
(3, 'test1@gmail.com', 'test', 'test', '$argon2id$v=19$m=65536,t=3,p=4$DlAVNdRMb6/tqTv/Zp4hzQ$migEQ838QugtAvQPn4Ka9XtKnxWuKGrcZzsc2fw4PPI'),
(4, 'darkaoui@gmail.com', 'Darkaoui', 'Brioit', '$argon2id$v=19$m=65536,t=3,p=4$OPXZX1ZBncmR9WPZb6ITAQ$Te0D/kh2IeovitNgbBArn49fMHb7wYQBdYxqMehh0X8'),
(5, 'werg', 'werg', 'weg', '$argon2id$v=19$m=65536,t=3,p=4$NKoD3TsOrLCINcDeAj2j5A$7HglRcjD6o2fKUgtsVp9hE0eHCBbpQJG1xytvki+hYo'),
(6, 'werh', 'werg', 'wehr', '$argon2id$v=19$m=65536,t=3,p=4$IoFcap329UfQ1+Oqj9uc5w$lC8yutrbgrF8Dh7nGA6Auio/g1ceZecATopMaeKcVZk');
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `income`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `income`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;
