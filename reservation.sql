-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: show_data
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `show_number` int NOT NULL AUTO_INCREMENT COMMENT '예매번호',
  `show_ID` char(45) NOT NULL COMMENT '공연 ID',
  `bank` char(45) DEFAULT NULL COMMENT '은행정보',
  `re_number` int NOT NULL COMMENT '예매표 개수',
  `cancel_date` char(45) NOT NULL COMMENT '취소가능일자',
  `re_date` char(45) NOT NULL COMMENT '예매한 날짜',
  `user_ID` varchar(10) NOT NULL COMMENT '예매한 유저 ID',
  `DATE` varchar(45) NOT NULL COMMENT '예매한공연날짜',
  `TIME` varchar(45) NOT NULL COMMENT '예매한 시간대',
  `seat_num` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '예매한 좌석',
  `price` int DEFAULT NULL COMMENT '가격',
  `show_name` char(45) DEFAULT NULL COMMENT '공연 이름',
  PRIMARY KEY (`show_number`),
  KEY `show_ID` (`show_ID`),
  KEY `user_ID` (`user_ID`),
  CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`show_ID`) REFERENCES `show_info` (`show_ID`),
  CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`user_ID`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (138,'PF182737','Sinhan',1,'2023. 10. 25.','2023. 11. 1.','ticket','2023. 11. 2.','11:00','a1',55200,'해녀의부엌(해녀 다이닝) [북촌]'),(139,'PF198206','Sinhan',1,'2023. 10. 25.','2023. 11. 1.','ticket','2023. 11. 4.','11:00','a1',20000,'1미터마술공연 [군산]');
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-01 16:42:16
