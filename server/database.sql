-- phpMyAdmin SQL Dump
-- version 4.0.7
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Apr 29, 2015 at 04:18 PM
-- Server version: 5.5.43-0+deb8u1
-- PHP Version: 5.6.7-1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `modecaso`
--
CREATE DATABASE IF NOT EXISTS `modecaso` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `modecaso`;

-- --------------------------------------------------------

--
-- Table structure for table `experiment_categories`
--

CREATE TABLE IF NOT EXISTS `experiment_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project` int(11) NOT NULL,
  `participant` varchar(36) NOT NULL,
  `text` varchar(255) NOT NULL,
  `created` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project` (`project`),
  KEY `participant` (`participant`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=242 ;

-- --------------------------------------------------------

--
-- Table structure for table `experiment_models`
--

CREATE TABLE IF NOT EXISTS `experiment_models` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project` int(11) NOT NULL,
  `participant` varchar(36) NOT NULL,
  `category` int(11) NOT NULL,
  `card` int(11) NOT NULL,
  `created` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project` (`project`),
  KEY `participant` (`participant`),
  KEY `category` (`category`),
  KEY `card` (`card`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=896 ;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `key` varchar(10) NOT NULL,
  `lead` int(11) NOT NULL,
  `seed` varchar(36) NOT NULL,
  `completion` int(11) NOT NULL,
  `reminder` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created` int(11) NOT NULL,
  `last_modified` int(11) NOT NULL,
  `started` int(11) NOT NULL,
  `completed` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  KEY `lead` (`lead`),
  KEY `seed` (`seed`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

-- --------------------------------------------------------

--
-- Table structure for table `project_cards`
--

CREATE TABLE IF NOT EXISTS `project_cards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `tooltip` varchar(255) NOT NULL,
  `created` int(11) NOT NULL,
  `last_modified` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project` (`project`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=441 ;

-- --------------------------------------------------------

--
-- Table structure for table `project_messages`
--

CREATE TABLE IF NOT EXISTS `project_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created` int(11) NOT NULL,
  `last_modified` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project` (`project`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=25 ;

-- --------------------------------------------------------

--
-- Table structure for table `project_participants`
--

CREATE TABLE IF NOT EXISTS `project_participants` (
  `id` varchar(36) NOT NULL,
  `project` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `notified` int(11) NOT NULL,
  `reminded` int(11) NOT NULL,
  `timedout` int(11) NOT NULL,
  `last_save` int(11) NOT NULL,
  `completed` int(11) NOT NULL,
  `created` int(11) NOT NULL,
  `last_modified` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project` (`project`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(60) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created` int(11) NOT NULL,
  `last_modified` int(11) NOT NULL,
  `password_last_changed` int(11) NOT NULL,
  `last_login` int(11) NOT NULL,
  `last_login_from_ip` varchar(255) NOT NULL,
  `last_login_from_hostname` varchar(255) NOT NULL,
  `last_login_from_application` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

-- --------------------------------------------------------

--
-- Table structure for table `user_tokens`
--

CREATE TABLE IF NOT EXISTS `user_tokens` (
  `api_key` varchar(36) NOT NULL,
  `user` int(11) NOT NULL,
  `granted` int(11) NOT NULL,
  `expiry` int(11) NOT NULL,
  PRIMARY KEY (`api_key`),
  KEY `user` (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `experiment_categories`
--
ALTER TABLE `experiment_categories`
  ADD CONSTRAINT `experiment_categories_ibfk_1` FOREIGN KEY (`project`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `experiment_categories_ibfk_2` FOREIGN KEY (`participant`) REFERENCES `project_participants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `experiment_models`
--
ALTER TABLE `experiment_models`
  ADD CONSTRAINT `experiment_models_ibfk_1` FOREIGN KEY (`project`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `experiment_models_ibfk_2` FOREIGN KEY (`participant`) REFERENCES `project_participants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `experiment_models_ibfk_3` FOREIGN KEY (`category`) REFERENCES `experiment_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `experiment_models_ibfk_4` FOREIGN KEY (`card`) REFERENCES `project_cards` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`lead`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `project_cards`
--
ALTER TABLE `project_cards`
  ADD CONSTRAINT `project_cards_ibfk_1` FOREIGN KEY (`project`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_messages`
--
ALTER TABLE `project_messages`
  ADD CONSTRAINT `project_messages_ibfk_1` FOREIGN KEY (`project`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_participants`
--
ALTER TABLE `project_participants`
  ADD CONSTRAINT `project_participants_ibfk_1` FOREIGN KEY (`project`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD CONSTRAINT `user_tokens_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
