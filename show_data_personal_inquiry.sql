-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: show_data
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `personal_inquiry`
--

DROP TABLE IF EXISTS `personal_inquiry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_inquiry` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `inquiry_title` varchar(255) NOT NULL,
  `inquiry_content` text NOT NULL,
  `inquiry_date` date DEFAULT NULL,
  `userID` varchar(255) DEFAULT NULL,
  `answer` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7881536 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_inquiry`
--

LOCK TABLES `personal_inquiry` WRITE;
/*!40000 ALTER TABLE `personal_inquiry` DISABLE KEYS */;
INSERT INTO `personal_inquiry` VALUES (3,'htcss@naver.com','ㄴㅁㅇㅇㅈㄻㅁㅈㄹㅈㄹㅈㅁㄹㅈㅁ','ㅁㅈㅇㅁㅈㅇㅇㅁㅈㅇㅇㅇㅁㅈㅇㅁㅁㅈㅇㅇㅇㅁㅈㅇㅁㅇㅁㅁㅈㅇㅇㅇㅁㅈㅇㅁㅈㅇㅁㅇㅁㅈㅇㅇㅁㅈㅇㅇㅇㅁㅈㅇㅁㅁㅈㅇㅇㅇㅁㅈㅇㅁㅇㅁㅁㅈㅇㅇㅇㅁㅈㅇㅁㅈㅇㅁㅁㅈㅇㅇㅇㅁㅈㅇㅁㅁㅈㅇㅇㅇㅁㅈㅇㅁㅇㅁㅁㅈㅇㅇㅇㅁㅈㅇㅁㅈㅇㅁ','2023-10-26','html','ㅁㄷㄴㄻㄴㄹㄷㄴㄻㄴㄷ'),(13,'htcss@naver.com','ㅁㄷㄴㄹㄴㄷㄻㄷㄹ','ㅁㄴㄷㄻㄴㄷㄻㄷㄴ','2023-10-18','html','ㅁㄷㄻㄹㄷㄴㄻㄷㄹ'),(14,'asef@naver.com','1234','1234','2023-10-30','html',NULL),(15,'htcss@naver.com','ㄷㄹㄷㄹㄷㄹ','ㅁㄴㄷㄻㄴㄷㄹㄷㄴㄹ','2023-10-18','html',NULL),(17,'html@naver.com','1234','1234','2023-10-30','html',NULL),(24,'ANLKESNF@naver.com','123','123','2023-10-30','html',NULL),(26,'1234','1234','123','2023-10-30','html',NULL),(30,'htcss@naver.com','티켓 취소','취소하고싶어요','2023-10-26','html',NULL),(32,'ㅁㄷㄻㄹㄷㅁㄻㄻㄻㄴㄷㄹ','ㅁㄷㄻㄹㄷㅁㄹㄷㅁㄴㄹㄷㅁㄴㄻ','ㅁㄹㄷㄻㄻㄷㄻㄴㄷㄴㄷㄹ','2023-10-26',NULL,NULL),(33,'eafaef','aesfeaa','aesfeafaesf','2023-10-18',NULL,NULL),(34,'efaefefef@faefa.com','efaefaefa','aesfaefasf','2023-10-18',NULL,NULL),(38,'ㄻㄴㄷㄻㄴㄹ','ㅁㄷㄻㄷㄴㄹㄷㄴㅁㄹ','ㅁㄴㄷㄻㄴㄹㄷㄹ','2023-10-18',NULL,NULL),(46,'ㅁㄷㄴㄻㄹㄴㄹ','ㅁㄷㄻㄷㄴㄻㄷㄹㄷㄹ','ㅈㅁㅇㅇ','2023-10-18',NULL,NULL),(55,'ㅁㄷㄻㄻㄻㄹ','ㅁㄷㄹㄷㄻㄹ','ㅁㄷㄹㄻㄷㄹ','2023-10-26',NULL,NULL),(58,'test2','test2','test2','2023-10-27','html',NULL),(72,'asfaes@naver.com','12345','12345','2023-10-28','html',NULL),(90,'asdasasd','asdasdsadas','asdsdsdsasa','2023-10-18',NULL,NULL),(91,'test','test','test','2023-10-27','',NULL),(96,'dflejisefjq','erjfleiafeilj','efesfsef','2023-10-21',NULL,NULL),(123,'asefasf','asefasfasf','asefasf','2023-10-18',NULL,NULL),(3373869,'1234','1234','1234','2023-10-31',NULL,NULL),(3394895,'1234@naver.com','1234','1234','2023-10-30',NULL,NULL),(4533648,'1234','1234','123412451','2023-10-31','java',NULL),(6346288,'adw@naver.com','123','123','2023-10-31',NULL,NULL),(7881535,'aflfjek@naver.com','1234','1234','2023-10-31',NULL,NULL);
/*!40000 ALTER TABLE `personal_inquiry` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-01 15:36:45
