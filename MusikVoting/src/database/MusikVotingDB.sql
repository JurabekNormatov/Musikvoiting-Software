-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: localhost    Database: MusikVotingDB
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `T_Gast`
--

DROP TABLE IF EXISTS `T_Gast`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_Gast` (
  `gast_id` int NOT NULL AUTO_INCREMENT,
  `vname` varchar(50) DEFAULT NULL,
  `nname` varchar(50) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`gast_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_Gast`
--

LOCK TABLES `T_Gast` WRITE;
/*!40000 ALTER TABLE `T_Gast` DISABLE KEYS */;
INSERT INTO `T_Gast` VALUES (1,'Jaime','Lennister',NULL),(2,'Cersei','Lennister',NULL),(3,'Daenerys','Targaryen',NULL),(4,'jurabek','normatow',NULL),(5,'test','test',NULL),(6,'testq','testq',NULL),(7,'test1','test1',NULL),(8,'test3','test3',NULL),(9,'test4','test4',NULL),(10,'test 10','test 10',NULL),(11,'te','test',NULL),(12,'test12','test12',NULL),(13,'Jurabek','Normatov',NULL),(14,'test111','test111',NULL),(15,'J','N',NULL),(16,'lsjf','df',NULL),(17,'q','q',NULL),(18,'rr','rr',NULL),(19,'t','t',NULL),(20,'1','1',NULL),(21,'2','1',NULL),(22,'3','3',NULL),(23,'test123','test123',NULL),(24,'gast1','gast1',NULL),(25,'121','123',NULL),(26,'test98','test98','$2b$10$1oXRxU0EnILNX7nOSUPBe.h.GCBCt63YWd8sq.shCa9wiNH.2CLIG');
/*!40000 ALTER TABLE `T_Gast` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_Gastgeber`
--

DROP TABLE IF EXISTS `T_Gastgeber`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_Gastgeber` (
  `gastgeber_id` int NOT NULL AUTO_INCREMENT,
  `vname` varchar(50) DEFAULT NULL,
  `nname` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`gastgeber_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_Gastgeber`
--

LOCK TABLES `T_Gastgeber` WRITE;
/*!40000 ALTER TABLE `T_Gastgeber` DISABLE KEYS */;
INSERT INTO `T_Gastgeber` VALUES (1,'Tyrion','Lennister');
/*!40000 ALTER TABLE `T_Gastgeber` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_Musikwunsch`
--

DROP TABLE IF EXISTS `T_Musikwunsch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_Musikwunsch` (
  `song_id` int NOT NULL AUTO_INCREMENT,
  `titel` varchar(100) DEFAULT NULL,
  `genre` varchar(50) DEFAULT NULL,
  `bandname` varchar(100) DEFAULT NULL,
  `votes_count` int DEFAULT '0',
  PRIMARY KEY (`song_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_Musikwunsch`
--

LOCK TABLES `T_Musikwunsch` WRITE;
/*!40000 ALTER TABLE `T_Musikwunsch` DISABLE KEYS */;
INSERT INTO `T_Musikwunsch` VALUES (1,'Raining Blood','Thrash Metal','Slayer',13),(2,'Nothing Else Matters','Ballade','Metallica',10),(3,'Atemlos durch die Nacht','Schlager','Helene Fischer',8),(4,'Die Wahrheit über die Liebe','Schlager','Helene Fischer',2),(5,'Master of Puppets','Thrash Metal','Metallica',3),(6,'Hallelujah','Pop','Leonard Cohen',11);
/*!40000 ALTER TABLE `T_Musikwunsch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_Playlist`
--

DROP TABLE IF EXISTS `T_Playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_Playlist` (
  `playlist_id` int NOT NULL AUTO_INCREMENT,
  `f_gastgeber_id` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`playlist_id`),
  KEY `f_gastgeber_id` (`f_gastgeber_id`),
  CONSTRAINT `T_Playlist_ibfk_1` FOREIGN KEY (`f_gastgeber_id`) REFERENCES `T_Gastgeber` (`gastgeber_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_Playlist`
--

LOCK TABLES `T_Playlist` WRITE;
/*!40000 ALTER TABLE `T_Playlist` DISABLE KEYS */;
INSERT INTO `T_Playlist` VALUES (1,1,'Party-Time'),(11,1,'test2'),(12,1,'test3'),(14,1,'test4');
/*!40000 ALTER TABLE `T_Playlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_Playlist_Song`
--

DROP TABLE IF EXISTS `T_Playlist_Song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_Playlist_Song` (
  `playlist_id` int NOT NULL,
  `song_id` int NOT NULL,
  `position` int DEFAULT NULL,
  PRIMARY KEY (`playlist_id`,`song_id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `T_Playlist_Song_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `T_Playlist` (`playlist_id`),
  CONSTRAINT `T_Playlist_Song_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `T_Musikwunsch` (`song_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_Playlist_Song`
--

LOCK TABLES `T_Playlist_Song` WRITE;
/*!40000 ALTER TABLE `T_Playlist_Song` DISABLE KEYS */;
INSERT INTO `T_Playlist_Song` VALUES (1,1,1),(1,2,2),(1,3,5),(1,4,NULL),(1,5,3),(1,6,4);
/*!40000 ALTER TABLE `T_Playlist_Song` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_Vote`
--

DROP TABLE IF EXISTS `T_Vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_Vote` (
  `vote_id` int NOT NULL AUTO_INCREMENT,
  `f_gast_id` int DEFAULT NULL,
  `f_song_id` int DEFAULT NULL,
  `datum` date DEFAULT NULL,
  `zeit` time DEFAULT NULL,
  PRIMARY KEY (`vote_id`),
  KEY `f_gast_id` (`f_gast_id`),
  KEY `f_song_id` (`f_song_id`),
  CONSTRAINT `T_Vote_ibfk_1` FOREIGN KEY (`f_gast_id`) REFERENCES `T_Gast` (`gast_id`),
  CONSTRAINT `T_Vote_ibfk_2` FOREIGN KEY (`f_song_id`) REFERENCES `T_Musikwunsch` (`song_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_Vote`
--

LOCK TABLES `T_Vote` WRITE;
/*!40000 ALTER TABLE `T_Vote` DISABLE KEYS */;
INSERT INTO `T_Vote` VALUES (1,1,1,'2023-11-24','12:00:00'),(2,2,2,'2023-11-24','12:05:00'),(3,3,3,'2023-11-24','12:10:00'),(4,1,5,'2023-11-24','12:15:00'),(6,3,1,'2023-11-24','12:25:00'),(7,1,2,'2023-11-24','12:30:00'),(9,3,5,'2023-11-24','12:40:00'),(10,1,1,'2023-11-24','12:45:00');
/*!40000 ALTER TABLE `T_Vote` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-11 14:30:07
