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
-- Table structure for table `cancelreservation`
--

DROP TABLE IF EXISTS `cancelreservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cancelreservation` (
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
  PRIMARY KEY (`show_number`),
  KEY `show_ID` (`show_ID`),
  KEY `user_ID` (`user_ID`),
  CONSTRAINT `reservation_ibfk_3` FOREIGN KEY (`show_ID`) REFERENCES `show_info` (`show_ID`),
  CONSTRAINT `reservation_ibfk_4` FOREIGN KEY (`user_ID`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancelreservation`
--

LOCK TABLES `cancelreservation` WRITE;
/*!40000 ALTER TABLE `cancelreservation` DISABLE KEYS */;
INSERT INTO `cancelreservation` VALUES (49,'PF182737','없음',1,'2023. 10. 20.','2023. 10. 27.','ticket','2023. 10. 27.','14:00','g9',69000),(134,'PF224470','Sinhan',1,'2023. 10. 25.','2023. 11. 1.','ticket','2023. 11. 4.','11:00','a1',12800),(138,'PF182737','Sinhan',1,'2023. 10. 25.','2023. 11. 1.','ticket','2023. 11. 2.','11:00','a1',55200);
/*!40000 ALTER TABLE `cancelreservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount_rate`
--

DROP TABLE IF EXISTS `discount_rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount_rate` (
  `bank` varchar(45) NOT NULL COMMENT 'Primary Key',
  `discount_rate` int NOT NULL,
  PRIMARY KEY (`bank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount_rate`
--

LOCK TABLES `discount_rate` WRITE;
/*!40000 ALTER TABLE `discount_rate` DISABLE KEYS */;
INSERT INTO `discount_rate` VALUES ('Hana',30),('KB',10),('Sinhan',20);
/*!40000 ALTER TABLE `discount_rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq` (
  `ID` int NOT NULL AUTO_INCREMENT COMMENT '질문사항 ID',
  `question` varchar(1000) NOT NULL COMMENT '질문',
  `answer` varchar(1000) NOT NULL COMMENT '답변',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq`
--

LOCK TABLES `faq` WRITE;
/*!40000 ALTER TABLE `faq` DISABLE KEYS */;
INSERT INTO `faq` VALUES (2,'회원 가입은 어떻게 하나요?',' [회원가입] 버튼 선택 > 아이디 및 비밀번호, 약관동의 '),(3,'휴대폰 번호를 변경하였습니다. ','휴대폰 번호가 변경되었다면 본인인증 변경을 진행해야 합니다.'),(4,'회원 탈퇴 신청을 하고 싶어요.','개인정보 도용 등으로 인한 원치 않은 서비스 탈퇴, 부정 이용 방지 등에 대비하기 위하여 서비스 탈퇴 요청 후 3일간 개인정보를 보관합니다.\n서비스 재 이용을 원하시는 경우, 탈퇴 신청 3일 후 서비스 재 가입하여 이용하시기 바랍니다.'),(5,'예매 시 할인 수단에는 어떤 것들이 있나요?','[신용(체크)카드]\n- KB국민, 신한, 하나 신용카드/체크카드로 할인이 가능합니다.');
/*!40000 ALTER TABLE `faq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `notification_ID` int NOT NULL AUTO_INCREMENT COMMENT '공지사항 ID',
  `title` varchar(1000) NOT NULL COMMENT '제목',
  `content` varchar(1000) NOT NULL COMMENT '내용',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`notification_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (3,'[공지] 10월 시스템 정기점검','점검일시 : 10월 2일(월) 02:00 ~ 08:00 점검이 끝나는 대로 서비스를 정상적으로 재개하도록 하겠습니다.','2023-09-25 00:03:59'),(4,'[공지] PAYCO 결제서비스 중지 안내','10월 9일(월)부터 PAYCO 결제가 불가능합니다. 불편을 드려 죄송합니다.','2023-10-06 03:00:00'),(5,'[연극] 괴물 - 대학로 티켓 오픈 안내','공연정보\n공연 기간 : 2023년 10월 13일(금) ~ 2023년 10월 29일(일)\n공연 시간 : 평일 20:00, 토 16:30, 일 15:00\n공연 장소 : 단막극장\n관람 시간 : 80분','2023-10-10 00:30:25'),(6,'[공지] 시스템 점검으로 인한 서비스 일시 중단 안내 (11월 8일 (수요일) 00:00 – 08:00)','점검이 끝나는 대로 서비스를 정상적으로 재개하도록 하겠습니다. 이용에 불편을 드려 대단히 죄송합니다.','2023-11-05 23:56:08');
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_inquiry`
--

DROP TABLE IF EXISTS `personal_inquiry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_inquiry` (
  `ID` int NOT NULL AUTO_INCREMENT,
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
INSERT INTO `personal_inquiry` VALUES (3,'htcss@naver.com','ㄴㅁㅇㅇㅈㄻㅁㅈㄹㅈㄹㅈㅁㄹㅈㅁ','ㅁㅈㅇㅁㅈㅇㅇㅁㅈㅇㅇㅇㅁㅈㅇㅁㅁㅈㅇㅇㅇㅁㅈㅇㅁㅇㅁㅁㅈㅇㅇㅇㅁㅈㅇㅁㅈㅇㅁㅇㅁㅈㅇㅇㅁㅈㅇㅇㅇㅁㅈㅇㅁㅁㅈㅇㅇㅇㅁㅈㅇㅁㅇㅁㅁㅈㅇㅇㅇㅁㅈㅇㅁㅈㅇㅁㅁㅈㅇㅇㅇㅁㅈㅇㅁㅁㅈㅇㅇㅇㅁㅈㅇㅁㅇㅁㅁㅈㅇㅇㅇㅁㅈㅇㅁㅈㅇㅁ','2023-10-26','html','ㅁㄷㄴㄻㄴㄹㄷㄴㄻㄴㄷ'),(13,'htcss@naver.com','ㅁㄷㄴㄹㄴㄷㄻㄷㄹ','ㅁㄴㄷㄻㄴㄷㄻㄷㄴ','2023-10-18','html','ㅁㄷㄻㄹㄷㄴㄻㄷㄹ'),(14,'asef@naver.com','1234','1234','2023-10-30','html',NULL),(15,'htcss@naver.com','ㄷㄹㄷㄹㄷㄹ','ㅁㄴㄷㄻㄴㄷㄹㄷㄴㄹ','2023-10-18','html',NULL),(17,'html@naver.com','1234','1234','2023-10-30','html',NULL),(24,'ANLKESNF@naver.com','123','123','2023-10-30','html',NULL),(26,'1234','1234','123','2023-10-30','html',NULL),(30,'htcss@naver.com','티켓 취소','취소하고싶어요','2023-10-26','html',NULL),(32,'ㅁㄷㄻㄹㄷㅁㄻㄻㄻㄴㄷㄹ','ㅁㄷㄻㄹㄷㅁㄹㄷㅁㄴㄹㄷㅁㄴㄻ','ㅁㄹㄷㄻㄻㄷㄻㄴㄷㄴㄷㄹ','2023-10-26',NULL,NULL),(33,'eafaef','aesfeaa','aesfeafaesf','2023-10-18',NULL,NULL),(34,'efaefefef@faefa.com','efaefaefa','aesfaefasf','2023-10-18',NULL,NULL),(38,'ㄻㄴㄷㄻㄴㄹ','ㅁㄷㄻㄷㄴㄹㄷㄴㅁㄹ','ㅁㄴㄷㄻㄴㄹㄷㄹ','2023-10-18',NULL,NULL),(46,'ㅁㄷㄴㄻㄹㄴㄹ','ㅁㄷㄻㄷㄴㄻㄷㄹㄷㄹ','ㅈㅁㅇㅇ','2023-10-18',NULL,NULL),(55,'ㅁㄷㄻㄻㄻㄹ','ㅁㄷㄹㄷㄻㄹ','ㅁㄷㄹㄻㄷㄹ','2023-10-26',NULL,NULL),(58,'test2','test2','test2','2023-10-27','html',NULL),(72,'asfaes@naver.com','12345','12345','2023-10-28','html',NULL),(90,'asdasasd','asdasdsadas','asdsdsdsasa','2023-10-18',NULL,NULL),(91,'test','test','test','2023-10-27','',NULL),(96,'dflejisefjq','erjfleiafeilj','efesfsef','2023-10-21',NULL,NULL),(123,'asefasf','asefasfasf','asefasf','2023-10-18',NULL,NULL),(3373869,'1234','1234','1234','2023-10-31',NULL,NULL),(3394895,'1234@naver.com','1234','1234','2023-10-30',NULL,NULL),(4229154,'1','23','34','2023-11-01','ticket',NULL),(4533648,'1234','1234','123412451','2023-10-31','java',NULL),(6346288,'adw@naver.com','123','123','2023-10-31',NULL,NULL),(7881535,'aflfjek@naver.com','1234','1234','2023-10-31',NULL,NULL);
/*!40000 ALTER TABLE `personal_inquiry` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (139,'PF198206','Sinhan',1,'2023. 10. 25.','2023. 11. 1.','ticket','2023. 11. 4.','11:00','a1',20000,'1미터마술공연 [군산]'),(140,'PF224790','기타',1,'2023. 10. 25.','2023. 11. 1.','ticket','2023. 11. 10.','19:30','a1',35000,'언행순 [부산]'),(141,'PF182737','Sinhan',3,'2023. 10. 26.','2023. 11. 2.','ticket','2023. 11. 11.','11:00','a1,a2,a3',165600,'해녀의부엌(해녀 다이닝) [북촌]'),(142,'PF191223','기타',1,'2023. 10. 26.','2023. 11. 2.','ticket','2023. 11. 4.','18:00','a1',144000,'한가족마술쇼: 온리포유 [송도]');
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_number` int NOT NULL AUTO_INCREMENT COMMENT '리뷰번호',
  `ID` varchar(10) NOT NULL COMMENT '유저ID',
  `show_name` char(45) NOT NULL COMMENT '공연 이름',
  `content` varchar(1000) NOT NULL COMMENT '내용',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rating` int DEFAULT NULL COMMENT '별점',
  PRIMARY KEY (`review_number`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (8,'abcde','난타 [제주]','재밌습니다.','2023-10-30 15:03:53',5),(9,'abcde','인피니티 플라잉 (INFINITY FLYING) [경주]','너무재밌어요.','2023-10-30 15:04:27',5),(12,'admin','몽연: 서동의 꽃','123','2023-10-31 02:45:45',1),(13,'ticket','해녀의부엌(해녀 다이닝) [북촌]','굿','2023-10-31 07:26:43',5);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `show_info`
--

DROP TABLE IF EXISTS `show_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `show_info` (
  `show_ID` char(45) NOT NULL COMMENT '공연 ID',
  `show_name` char(45) NOT NULL COMMENT '공연 이름',
  `location_code` char(45) NOT NULL COMMENT '지역코드',
  `show_location` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '공연 장소',
  `start_date` char(45) NOT NULL COMMENT '공연시작일',
  `end_date` char(45) NOT NULL COMMENT '공연종료일',
  `price` char(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '가격',
  `poster_url` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '공연 이미지',
  `seat` int NOT NULL COMMENT '좌석 수',
  `show_time` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '공연시간',
  `actor` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '공연출연진',
  PRIMARY KEY (`show_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `show_info`
--

LOCK TABLES `show_info` WRITE;
/*!40000 ALTER TABLE `show_info` DISABLE KEYS */;
INSERT INTO `show_info` VALUES ('PF136032','난타 [제주]','50','제주난타극장 (제주난타극장)','2012.04.01','2023.11.30','VIP석 60,000원, S석 50,000원, A석 40,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF136032_170227_153022.jpg',11,'월요일 ~ 일요일(17:00)',' '),('PF160272','해녀의 부엌: 해녀이야기','50','해녀의부엌 (해녀의부엌)','2018.12.31','2023.12.31','전석 63,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF160272_191231_111713.png',7,'목요일 ~ 금요일(12:00,17:30), 토요일 ~ 일요일(12:00,17:30)',' '),('PF182737','해녀의부엌(해녀 다이닝) [북촌]','50','해녀의부엌 [북촌] (해녀의부엌 [북촌])','2021.11.01','2023.11.30','전석 69,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF182737_211110_091124.PNG',85,'목요일 ~ 금요일(11:00,11:30,14:00,17:00), 토요일 ~ 일요일(11:00,11:30,14:00,17:00)',' '),('PF191223','한가족마술쇼: 온리포유 [송도]','28','메가박스 [송도] (메가박스 [송도])','2022.05.01','2024.01.01','한가족VIP패키지[5인] 180,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF191223_220617_113112.jpg',50,'토요일(18:00)',' '),('PF198206','1미터마술공연 [군산]','45','1미터마술 (1미터마술)','2022.09.18','2023.11.26','전석 25,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF198206_220915_134509.jpg',2,'금요일(13:00,15:00,17:00,19:00,21:00), 토요일 ~ 일요일(11:00,13:00,15:00,17:00,19:00,21:00), 월요일 ~ 금요일(14:00,16:00,17:00,18:00,19:00,20:00,21:00), HOL(17:00,19:00,21:00)','문태현, 박승룡'),('PF212601','담빛마술쇼 시즌2: DIARY [담양]','46','담빛 마술극장 (담빛 마술극장)','2023.02.04','2023.12.31','전석 15,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF212601_230203_111523.png',3,'토요일(11:00,14:00,17:00), 일요일(11:00,12:00,14:00,17:00), HOL(11:00,14:00,17:00)',' '),('PF214425','인피니티 플라잉 (INFINITY FLYING) [경주]','47','경주세계문화엑스포 (문화센터공연장)','2023.04.04','2023.11.30','전석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF214425_230306_135245.png',1,'수요일 ~ 금요일(14:30), 토요일 ~ 일요일(14:30), HOL(14:30)','황근색, 이영주, 김승혜 등'),('PF215955','매직프렌즈 마술쇼 시즌4: 피노키오','45','드림팩토리 (소극장)','2023.04.01','2023.12.31','전석 15,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF215955_230330_134512.png',0,'토요일 ~ 일요일(11:00,14:00,17:00)',' '),('PF219269','몽연: 서동의 꽃','45','전북예술회관 (공연장)','2023.06.02','2023.11.25','R석 30,000원, S석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF219269_230530_134507.png',0,'수요일 ~ 목요일(19:30), 금요일 ~ 토요일(15:00)','박동찬, 박준하, 김현지, 조은혜, 문종운, 한광희, 김응경 등'),('PF219384','조선셰프 한상궁 [전주]','45','전주한벽문화관 (야외공연장)','2023.06.09','2023.10.27','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF219384_230531_152903.gif',0,'금요일(20:00)',' '),('PF220036','사람, 꽃 피우다 [익산]','45','함라한옥마을체험관 (함라한옥마을체험관)','2023.06.10','2023.10.28','전석 10,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF220036_230612_172408.gif',5,'금요일(19:30), 토요일(19:30)',' '),('PF221059','사천_사천서커스','48','사천세계아트서커스 (사천세계아트서커스)','2023.06.27','2023.10.31','전석 25,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF221059_230627_151327.jpg',0,' ',' '),('PF221916','디즈니 100주년 기념 특별 콘서트, 킹스싱어즈','48','경상남도문화예술회관 (대공연장)','2023.10.19','2023.10.19','VIP석 60,000원, R석 50,000원, S석 40,000원, A석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF221916_230711_174649.jpg',0,'목요일(19:30)',' '),('PF222323','히사이시 조 영화음악 콘서트 [구미(앵콜)]','47','구미시문화예술회관 (대공연장)','2023.10.15','2023.10.15','R석 120,000원, S석 90,000원, A석 60,000원, B석 40,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF222323_230718_153735.gif',0,'일요일(17:00)','김재원, 김영준, 고관수, 배성우 등'),('PF222458','슈퍼스타 뽀로로 드림콘서트 [창원]','48','KBS홀 [창원] (KBS홀 [창원])','2023.10.14','2023.10.15','VIP석 55,000원, R석 45,000원, S석 35,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF222458_230720_130938.gif',0,'토요일 ~ 일요일(11:00,14:00,16:30)',' '),('PF222862','예울마루 실내악 페스티벌 [여수]','46','예울마루 (대극장)','2023.10.12','2023.10.15','R석 50,000원, S석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF222862_230727_121541.gif',0,'목요일 ~ 금요일(19:30), 토요일(19:30), 일요일(15:00)','한수진, 신윤경, 양성원, 조성현, 주연선, 채재일, 장현주 등'),('PF223260','엘사의 생일파티 [양산]','48','쌍벽루아트홀 (쌍벽루아트홀)','2023.10.15','2023.10.15','전석 44,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF223260_230803_113559.gif',0,'일요일(11:00,13:30,15:30)','김다솔, 서가영, 정승우, 송주리, 정민, 고승미, 구윤희 등'),('PF223554','폴포츠 내한 공연: Prime Time [거제]','48','거제문화예술회관 (대극장)','2023.10.18','2023.10.18','R석 55,000원, S석 44,000원, A석 33,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF223554_230808_151506.jpg',0,'수요일(20:00)','폴포츠, 김은혜, 김새별, 이형예, 김현진, 송희량'),('PF223583','웨딩브레이커 [광주]','29','기분좋은극장 [상무지구] (기분좋은극장 [상무지구])','2023.09.01','2023.10.15','전석 35,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF223583_230809_121922.gif',0,'화요일 ~ 금요일(20:00), 토요일 ~ 일요일(15:00,18:00), HOL(14:00,17:00)',' '),('PF223733','행복총량의 법칙 [대구]','27','문화예술전용극장CT (문화예술전용극장CT)','2023.09.20','2023.11.25','전석 40,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF223733_230810_153257.gif',0,'화요일 ~ 금요일(19:30), 토요일(15:00,18:00), 일요일(14:00,14:30,17:00), HOL(14:30)','하주원, 이조이 등'),('PF223827','연애하기 좋은 날 [전주]','45','한해랑아트홀 (한해랑아트홀)','2023.09.29','2023.11.05','전석 40,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF223827_230811_152949.gif',0,'수요일 ~ 금요일(19:30), 토요일(15:00,18:00), 일요일(15:00), HOL(15:00)','김정원, 서동은, 이현명, 한수빈, 정승지, 한설, 김이슬 등'),('PF223835','다니엘 뮐러 쇼트, 바흐 무반주 첼로 모음곡 I','28','아트센터 인천 (콘서트홀)','2023.10.15','2023.10.15','R석 70,000원, S석 50,000원, A석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF223835_230811_160102.gif',0,'일요일(13:00)','다니엘 뮐러 쇼트'),('PF223836','다니엘 뮐러 쇼트, 바흐 무반주 첼로 모음곡 II','28','아트센터 인천 (콘서트홀)','2023.10.15','2023.10.15','R석 70,000원, S석 50,000원, A석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF223836_230811_160446.gif',0,'일요일(17:00)','다니엘 뮐러 쇼트'),('PF224183','The Kandle [대구]','27','몬다코 (2층(카페))','2023.09.16','2023.10.29','VIP석 55,000원, R석 50,000원, S석 45,000원, A석 40,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF224183_230818_130953.png',0,'토요일 ~ 일요일(18:00,20:00)',' '),('PF224405','친정엄마와 2박 3일 [김해]','48','김해문화의전당 (마루홀)','2023.10.27','2023.10.28','R석 77,000원, S석 66,000원, A석 55,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF224405_230823_101614.gif',0,'금요일(19:30), 토요일(14:00,18:00)','강부자, 윤유선, 유정기, 김남진, 이요성, 김찬훈, 김민지'),('PF224470','피터팬과 마법의 풍선나무','48','창원 스타인웨이홀(상상플레이스, G.I.L. 아트홀) (창원 스타인웨이홀(상상플레이스, G.I.L. 아트홀))','2023.09.02','2023.11.26','전석 16,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF224470_230823_144155.jpg',1,'토요일 ~ 일요일(11:00,14:00,16:00)','안상욱, 정월, 장민호'),('PF224578','나도 해피엔딩을 쓰고싶어 [인천 서구]','28','청라복합문화센터 블루노바홀 (공연장)','2023.11.01','2023.11.02','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF224578_230825_102113.gif',0,'수요일 ~ 목요일(19:30)','조현영, 손지애, 이주광, 박건일, 김경민, 이민진, 김태윤 등'),('PF224604','행쇼 [부산]','26','BNK부산은행 조은극장 (2관)','2023.09.07','2024.01.07','전석 35,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF224604_230825_115154.gif',0,'화요일 ~ 금요일(19:00), 토요일 ~ 일요일(14:00,14:30,16:00,17:00,18:00), HOL(14:00,14:30,16:00,17:00,18:00)','박유진, 이예진, 천성운, 이재영, 최지윤, 현혜림, 이민경 등'),('PF224631','노래하는 고양이 키즈캣 [인천]','28','아띠홀 (아띠홀)','2023.10.13','2023.10.29','전석 22,900원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF224631_230825_140429.jpg',3,'금요일(16:30), 토요일 ~ 일요일(13:00,15:00)',''),('PF224790','언행순 [부산]','26','엠스테이지 [부산](구 한결아트홀) (엠스테이지 [부산](구 한결아트홀))','2023.08.31','2023.12.31','전석 35,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF224790_230829_113058.jpg',38,'목요일 ~ 금요일(19:30), 토요일(15:00), 일요일(17:00)','김태영, 김미소, 김정아, 김좋은, 진시은, 김성훈, 최휘정'),('PF224803','엠씨더맥스 이수 콘서트: 기행문 [대구]','47','천마아트센터 (그랜드홀)','2023.10.14','2023.10.15','R석 143,000원, S석 132,000원, A석 121,000원, B석 110,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF224803_230829_123451.jfif',0,'토요일(19:00), 일요일(18:00)','전광철'),('PF225153','러브액츄얼리 첫번째 사연: 크리스마스 특별공연 [부산]','26','부산메트로홀 (구. AN아트홀 광안) (부산메트로홀 (구. AN아트홀 광안))','2023.10.20','2023.12.31','전석 35,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF225153_230904_135340.jpg',0,'화요일 ~ 금요일(19:30), 토요일(15:00,18:00), 일요일(14:00,17:00), HOL(13:00,15:30,18:00)',' '),('PF225197','그림책 속 제주신화이야기 [제주]','50','BeIN(비인) (BeIN(비인))','2023.10.11','2023.10.27','전석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF225197_230905_101100.gif',0,'수요일(16:00), 목요일(19:00), 금요일(15:00), 토요일 ~ 일요일(11:00,15:00)',' '),('PF225252','커피콘서트 in 동구문화체육센터, 대니 구X박주원 집시 바이올린','28','인천동구문화체육센터 (공연장)','2023.10.18','2023.10.18','전석 15,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF225252_230908_104509.gif',0,'수요일(14:00)','대니구, 박주원'),('PF225299','이미자 노래인생 60년 기념 음악회 [광주]','29','예술의 전당 [광주] (구. 광주문화예술회관) (대극장)','2023.10.15','2023.10.15','R석 143,000원, S석 121,000원, A석 99,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF225299_230906_102012.jpg',0,'일요일(16:00)','이미자, 이택림, 로미나 알렉산드라 폴리누스'),('PF225324','어린이 서커스 마술쇼 [순천]','46','순천문화예술회관 (대극장)','2023.10.15','2023.10.15','전석 25,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF225324_230906_110312.gif',0,'일요일(13:00,15:00)',' '),('PF225334','영탁 단독 콘서트, TAK SHOW2: TAK\'S WORLD [전주]','45','한국소리문화의전당 (야외공연장)','2023.10.14','2023.10.15','SR석 143,000원, R석 132,000원, S석 121,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF225334_230906_112225.gif',0,'토요일 ~ 일요일(18:00)','박영탁'),('PF225440','재주많은 세친구 [인천]','28','인천어린이과학관 (강당)','2023.10.03','2023.12.03','전석 25,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF225440_230927_105039.gif',5,'토요일 ~ 일요일(11:30,13:30), HOL(11:30,13:30)',' '),('PF225477','딜리버리 [대구]','27','여우별아트홀 (여우별아트홀)','2023.09.28','2023.11.26','전석 40,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF225477_230908_110621.gif',0,'화요일 ~ 금요일(19:30), 토요일(15:00,18:00), 일요일(14:00,17:00)','박혜선, 김혜상, 한수빈, 김부연, 정성조, 김이슬, 정지원 등'),('PF225573','노자와 베토벤','26','해운대문화회관 (해운홀)','2023.10.18','2023.10.18','1층석 20,000원, 2층석 15,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF225573_230911_112717.jpg',0,'수요일(19:30)','오충근, 최진석, 김성준, 김주영, 미하엘 슈타우다허 등'),('PF225638','연애말고 결혼 [광주]','29','유스퀘어 문화관 (동산아트홀)','2023.10.01','2023.10.29','전석 35,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF225638_230911_153731.gif',0,'화요일 ~ 금요일(19:30), 토요일 ~ 일요일(14:00,17:00), HOL(14:00,17:00)','권후, 윤혁진, 박수현, 권신헤, 신광현, 채종국, 조슬비 등'),('PF225685','보잉보잉 [대구]','27','송죽씨어터 (송죽씨어터)','2023.10.12','2023.11.18','전석 40,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF225685_231011_125531.gif',0,'화요일 ~ 금요일(19:30), 토요일(15:00,18:00), 일요일(14:30,17:30)','김도준, 김진우, 최현규, 이호준, 강신혜, 고윤아, 박유은 등'),('PF225695','대한민국소극장열전, 요리조리 토리씨','47','소극장 공터 다 (소극장 공터 다)','2023.10.18','2023.10.18','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF225695_230912_110502.gif',0,'수요일(19:30)','윤성배, 이해린, 김장미, 손호섭, 윤혜현, 김초선'),('PF225718','겨울왕국: 겨울이야기 [수원]','41','수원청소년문화센터 (온누리아트홀)','2023.10.15','2023.10.15','전석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF225718_230912_131349.jpg',0,'일요일(11:00,13:00,15:00)',''),('PF225750','유니버설발레단, 돈키호테 [대구]','27','대구학생문화센터 (대공연장)','2023.10.27','2023.10.28','R석 40,000원, S석 30,000원, A석 20,000원, 휠체어석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF225750_230913_101447.png',0,'금요일(19:30), 토요일(15:00)',' '),('PF225810','앤 ANNE [인천]','28','인천동구문화체육센터 (공연장)','2023.10.27','2023.10.28','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF225810_230913_135306.gif',0,'금요일(14:00), 토요일(16:00)','박소연, 천우주, 이하린, 강인, 최현미, 김정은, 박선우 등'),('PF225816','DIGGING [대구]','27','어울아트센터(구. 대구북구문예회관) (함지홀(대공연장))','2023.10.19','2023.10.20','전석 15,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF225816_230913_141653.jpg',0,'목요일(11:00,19:30)','이선민, 김리하, 김현아, 남희경, 배효원, 최연진, 한소희 등'),('PF225936','대한민국소극장열전, 3.3kg','47','소극장 공터 다 (소극장 공터 다)','2023.10.19','2023.10.19','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF225936_230915_103801.gif',0,'목요일(19:30)','박지훈, 전소영, 김정현, 김준성, 홍바다, 강대현, 김정건 등'),('PF225937','신팽슬여사 행장기','27','소극장 소금창고 (소극장 소금창고)','2023.10.12','2023.10.22','전석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF225937_230915_104149.gif',0,'목요일(19:30), 토요일(15:00,19:00), 일요일(15:00)','이경자, 김정연, 김명일'),('PF225959','레볼루시오나리오 퀸텟 [통영]','48','통영국제음악당 (콘서트홀)','2023.10.15','2023.10.15','A석 50,000원, B석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF225959_230915_115034.gif',0,'일요일(15:00)','크리스티안 사라테, 세바스티안 프루사크, 호아킨 키테그로스키, 세르히로 리바스, 에스테반 팔라베야'),('PF226008','원스 어게인','27','봉산문화회관 (가온홀)','2023.10.14','2023.10.15','전석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226008_230918_104040.jpg',0,'토요일(15:00,19:00), 일요일(14:00)','유주연, 오태후, 손광혁, 이소희, 최지수, 주현주, 김담현 등'),('PF226027','판소리 다섯마당 청어람 [인천]','28','트라이보울 (공연장 (2층))','2023.10.27','2023.10.27','전석 10,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226027_230918_111450.gif',0,'금요일(19:30)','노병유, 권혁주, 민현기, 김성현, 김현승, 김재민, 진기동 등'),('PF226082','아기돼지 삼형제 [광주]','29','레미어린이극장 [광주수완] (레미어린이극장 [광주수완])','2023.10.07','2023.10.29','전석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226082_230918_140645.png',0,'토요일 ~ 일요일(12:00,14:00), HOL(12:00,14:00)',' '),('PF226143','황금알을 낳는 암탉 [대구]','27','대백프라자 (레오문화홀)','2023.10.14','2023.11.19','전석 10,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226143_230918_171935.jpg',0,'화요일 ~ 금요일(11:30), 토요일 ~ 일요일(11:30,13:30,15:30)',' '),('PF226162','라푼젤 [창원]','48','창원과학체험관 (다목적강당)','2023.10.07','2024.01.01','전석 35,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226162_230919_102911.png',0,'토요일 ~ 일요일(11:00,14:00), HOL(11:00,14:00)','공다향, 이대상, 이동주, 손채린, 안정모, 공예빈'),('PF226234','목련 아래의 디오니소스 [진주]','48','현장아트홀 (현장아트홀)','2023.10.27','2023.10.28','전석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226234_230920_101157.jpg',0,'금요일(19:30), 토요일(15:00,19:00)','박상종, 서진, 서태성, 서정식, 노준영'),('PF226258','IITERNITI BEGINS: The First Journey [광명]','41','IVEX STUDIO (하이퍼홀(5F))','2023.10.14','2023.10.15','VVIP석 100,000원, VIP석 80,000원, R석 50,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226258_230920_110124.gif',0,'토요일 ~ 일요일(15:00,19:00)',''),('PF226292','3.3kg [대구]','27','우전소극장 (우전소극장)','2023.10.27','2023.10.29','전석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226292_230920_121437.gif',0,'금요일(20:00), 토요일 ~ 일요일(17:00)','강대현, 박지훈, 전소영, 김정현, 김준성, 홍바다, 김정건 등'),('PF226355','성북동, 그 곳 [부산]','26','효로인디아트홀 (효로소극장)','2023.09.14','2023.11.05','전석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226355_230921_104206.jpg',0,'목요일 ~ 금요일(19:30), 토요일 ~ 일요일(15:00)','유미희, 변현주, 이현식, 전상미, 김다애, 김기백'),('PF226386','아기돼지 삼형제 [광주]','29','롯데마트 [월드컵] (행복을 주는 가족극장)','2023.10.01','2023.10.29','전석 15,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226386_230921_122923.gif',0,'월요일 ~ 금요일(10:20,16:00), 토요일 ~ 일요일(12:00,14:00,16:00), HOL(12:00,14:00,16:00)',' '),('PF226449','장수탕 선녀님 [밀양]','48','밀양아리랑아트센터 (대공연장)','2023.10.18','2023.10.19','R석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226449_230922_104519.jpg',0,'수요일 ~ 목요일(19:30)',' '),('PF226459','부산국제공연예술마켓, 더 클라운','26','부산시민회관 (대극장)','2023.10.15','2023.10.15','전석 10,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226459_230922_110643.gif',0,'일요일(14:30)','조현재, 이애경, 김서영, 강선영, 정수지, 신승희, 김혜정 등'),('PF226511','실패주의 페스티벌, 결혼 [대구]','27','우전소극장 (우전소극장)','2023.10.15','2023.10.17','전석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226511_230922_150911.gif',0,'일요일(17:00), 월요일 ~ 화요일(20:00)','김정현, 이경도, 남우희, 최예나'),('PF226514','내안의 그녀 [광주]','29','기분좋은극장 [상무지구] (기분좋은극장 [상무지구])','2023.10.19','2023.11.26','전석 35,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226514_230922_152000.gif',0,'화요일 ~ 금요일(20:00), 토요일 ~ 일요일(15:00,18:00)','전세기, 주재후, 권신혜, 허예슬, 김사우언, 김윤희'),('PF226599','더 쇼! 신라하다','47','경주세계문화엑스포 (문화센터공연장)','2023.10.21','2023.12.07','전석 50,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226599_230925_120817.gif',0,'화요일 ~ 금요일(19:00), 토요일 ~ 일요일(19:00)','남경주, 김동완, 박소현, 심건우, 김성현, 우정민, 권민주 등'),('PF226606','유토피아 [인천]','28','트라이보울 (공연장 (2층))','2023.10.18','2023.10.18','전석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226606_230925_123127.gif',0,'수요일(19:00)','최윤서, 최채은, 안제홍, 조명진, 김하람, 박형준'),('PF226641','환장할 진심','11','씨어터 쿰 (씨어터 쿰)','2023.10.11','2023.10.22','전석 35,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226641_230925_144508.gif',0,'화요일 ~ 금요일(19:30), 토요일 ~ 일요일(15:00,18:00)','전노민, 문현정, 손현준, 문진성, 류강주, 이예솔, 고규빈 등'),('PF226656','오래된 인연, Timeless','41','고양아람누리 (아람음악당)','2023.10.15','2023.10.15','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226656_230925_155751.jpg',0,'일요일(17:00)','김지현, 김소연, 백미숙, 김혜령, 이성요'),('PF226673','뿡뽕빵 방귀쟁이 [전주]','45','한국소리문화의전당 (명인홀)','2023.10.18','2023.10.20','전석 15,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226673_230926_095520.gif',0,'수요일 ~ 금요일(10:30)',' '),('PF226685','뺑파전 [양산]','48','양산문화예술회관 (대공연장)','2023.10.18','2023.10.18','전석무료','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226685_230926_101922.png',0,'수요일(19:30)','서정금, 최용석, 박선희, 이재현, 서영란, 김명진, 고희창'),('PF226693','다시날자 내일로 날아 [대구]','27','빈티지소극장 (빈티지소극장)','2023.10.19','2023.10.23','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226693_230926_104538.gif',0,'월요일(19:30), 목요일 ~ 금요일(19:30), 토요일 ~ 일요일(15:00,18:00)','이송희, 이동학, 이나경, 이순애, 김하나, 고찬혁, 서청수'),('PF226740','제88회 부산시립무용단 정기공연, The Legacy: 천상의 길','26','부산문화회관 (대극장)','2023.10.27','2023.10.27','R석 30,000원, S석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226740_230926_130049.jpg',0,'금요일(19:30)',' '),('PF226750','제4회 경산시립교향악단 정기연주회','47','천마아트센터 (그랜드홀)','2023.10.19','2023.10.19','전석무료','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226750_230926_133814.jpg',0,'목요일(19:30)','전희범, 김다미 등'),('PF226806','아기돼지 삼형제 [대학로]','11','스타스테이지 (스타스테이지)','2023.09.22','2023.10.29','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226806_230927_103552.gif',0,'토요일 ~ 일요일(10:50), HOL(10:50)',' '),('PF226838','부산국제공연예술마켓(BPAM), 조윤성의 재즈 타령','26','부산시민회관 (소극장)','2023.10.15','2023.10.15','전석 10,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226838_230927_114018.gif',0,'일요일(11:00)','조윤성, 황호규, 신동진, 이승희'),('PF226860','제22회 대구시립교향악단 대학생 협주곡의 밤 [대구]','27','대구콘서트하우스 (그랜드홀(대공연장))','2023.10.27','2023.10.27','전석무료','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226860_230927_145353.jfif',0,'금요일(19:30)','류명우, 김찬미, 최진향'),('PF226862','피스트: 여덟 개의 순간 [해남]','46','해남문화예술회관 (대공연장)','2023.10.19','2023.10.19','전석 10,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226862_230927_125214.gif',0,'목요일(19:00)','김모든, 김은주, 김재은, 류지수, 문경재, 이가영'),('PF226867','제10회 해운대재즈페스티벌, 한상원밴드','26','해운대문화회관 (해운홀)','2023.10.27','2023.10.27','VIP석 40,000원, R석 30,000원, S석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226867_230927_130626.jpg',0,'금요일(19:30)','한상원 등'),('PF226888','인사이드미','11','JTN 아트홀(구. 대학로예술마당) (2관)','2023.10.13','2023.12.31','전석 50,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226888_231004_094736.gif',2,'화요일 ~ 금요일(19:30), 토요일(15:00,19:00), 일요일(15:00)','윤채린, 김유림, 이재형, 서우연, 차윤오, 박세웅, 이정혁 등'),('PF226899','광주상설공연 (10월)','29','광주공연마루 (빛아트홀)','2023.10.01','2023.10.29','전석무료','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226899_231004_102317.jpg',0,'목요일 ~ 금요일(17:00), 토요일 ~ 일요일(17:00)',' '),('PF226901','32일의 식탁 [광주]','29','예술극장 통 (예술극장 통)','2023.10.19','2023.10.21','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226901_231004_103423.jpg',0,'목요일 ~ 금요일(20:00), 토요일(17:00)','김진희, 김은미'),('PF226919','금수SHOW','41','고양어울림누리 (별모래극장)','2023.10.18','2023.10.18','전석무료','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226919_231004_114848.jpg',0,'수요일(15:00)','이인애, 백지예, 김지강, 박진, 최희은, 한승효, 최승환'),('PF226927','NPAF 메인공연: 아트유프로젝트, 하울링','28','남동소래아트홀 (소래극장(대공연장))','2023.10.15','2023.10.15','전석무료','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226927_231004_121352.jpg',0,'일요일(17:00)',''),('PF226941','포항시립교향악단 협주곡의 밤','47','포항문화예술회관 (대공연장)','2023.10.19','2023.10.19','전석무료','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226941_231004_131554.png',0,'목요일(19:30)','박승유, 윤설현, 성나율, 이지수, 이예은 등'),('PF226942','말 안듣는 청개구리 [안산 고잔]','41','NC소극장 [안산고잔] (NC소극장 [안산고잔])','2023.10.28','2023.11.05','전석 25,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226942_231004_132641.jpeg',0,'토요일 ~ 일요일(12:00,14:00)',' '),('PF226976','굿모닝콘서트, 두드려 그려내다','26','을숙도문화회관 (소공연장)','2023.10.27','2023.10.27','전석 15,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF226976_231004_163544.jpg',0,'금요일(11:00)','이성은, 김나은, 곽선영, 이일순, 김영훈, 노선미'),('PF227002','안녕? 빨강머리 앤 [연천]','41','연천수레울아트홀 (대공연장)','2023.10.18','2023.10.18','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227002_231005_094300.gif',0,'수요일(10:00,11:30,14:30)','이승엽, 김지윤, 김미소, 문선혜, 류선우, 곽영은, 김혜라 등'),('PF227005','여자는 무엇으로 사는가 [부산]','26','하늘바람소극장 (하늘바람소극장)','2023.10.19','2023.10.26','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227005_231005_100246.gif',0,'월요일 ~ 금요일(19:30), 토요일 ~ 일요일(16:00)','구민주, 최현정, 이경진, 박지혜, 이채영'),('PF227012','라면 [밀양]','48','밀양아리랑아트센터 (소공연장)','2023.10.27','2023.10.28','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227012_231005_102514.jpg',0,'금요일(19:30), 토요일(17:00)',' '),('PF227013','조숙현 & 민혜성 피아노 듀오 리사이틀 [수원]','41','경기아트센터(구. 경기도문화의전당) (소극장)','2023.10.18','2023.10.18','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227013_231005_102812.gif',0,'수요일(19:30)','조숙현, 민혜성'),('PF227016','통진네시앤콘서트, 향기장수 이야기','41','통진두레문화센터 (두레홀)','2023.10.15','2023.10.15','전석 10,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227016_231005_103845.gif',0,'일요일(16:00)',''),('PF227023','정의의 사람들 [부산]','26','해운대문화회관 (고운홀)','2023.10.19','2023.10.21','전석 10,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227023_231005_110129.jpg',0,'목요일 ~ 금요일(19:30), 토요일(16:00)','서보기, 김성열, 이동현, 박호천, 이영준, 차승현, 손미나 등'),('PF227046','헝키 [부산]','26','가온아트홀 [부산] (1관)','2023.10.27','2023.12.31','전석 66,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227046_231005_124449.gif',0,'화요일 ~ 금요일(19:30), 토요일(15:00,19:00), 일요일(16:00)','정철호, 이승일, 최신권, 정윤호, 윤준호, 오석원, 한훈 등'),('PF227080','괴물 [대학로]','11','대학로단막극장 (대학로단막극장)','2023.10.13','2023.10.29','전석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227080_231005_144935.gif',2,'화요일 ~ 금요일(20:00), 토요일(16:30), 일요일(15:00)','박새미, 안지혜, 신요셉, 정남주'),('PF227143','공연예술축제 그라제: 소란, 우리여행 [광주]','29','예술의 전당 [광주] (구. 광주문화예술회관) (대극장)','2023.10.18','2023.10.18','전석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227143_231006_093615.jpg',0,'수요일(19:30)','고영배, 서면호, 편유일, 이태욱'),('PF227157','원로예술인과 함께하는 가을맞이 한국가곡의 향기, 지역순회 연주회 [광주]','29','예술의 전당 [광주] (구. 광주문화예술회관) (소극장)','2023.11.01','2023.11.01','R석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227157_231006_101224.jpg',0,'수요일(19:30)','박채옥, 임해철, 구성희, 임영빈, 김남경, 김백호, 김미옥 등'),('PF227168','제7회 인천시립교향악단 기획연주회, i 사랑 태교음악회','28','부평아트센터 (해누리극장)','2023.10.27','2023.10.27','전석무료','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227168_231006_104010.jpg',0,'금요일(19:30)','정한결, 이해원, 박진수, 최병혁'),('PF227181','우리가락 한마당 [의성]','47','의성문화회관 (의성문화회관)','2023.10.19','2023.10.19','전석 5,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227181_231006_111233.jpg',0,'목요일(19:00)','남상일, 최예림, 김재빈, 이희주 등'),('PF227197','청춘포차 [부산]','26','가마골소극장 (가마골소극장)','2023.10.20','2023.10.29','전석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227197_231006_123343.gif',0,'금요일(19:00), 토요일 ~ 일요일(19:00)','김홍식, 박미영, 이홍주, 강호석, 윤혜정, 송지훈, 김도형'),('PF227201','담빛마술쇼 시즌OFF 특별공연: 매직벌룬버블쇼 [담양]','46','담빛 마술극장 (담빛 마술극장)','2023.10.14','2024.02.25','전석 15,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227201_231006_124508.png',0,'토요일 ~ 일요일(11:00,14:00,17:00), HOL(11:00,14:00,17:00)',' '),('PF227208','마중 [부산]','26','공간소극장 [대연역] (공간소극장 [대연역])','2023.10.13','2023.10.21','전석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227208_231006_130610.jpg',0,'월요일 ~ 금요일(19:30), 토요일(16:00)','황미애, 전성호'),('PF227219','피노키오의 모험 [광교]','41','광교레이크아트홀 (광교레이크아트홀)','2023.10.28','2023.11.26','전석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227219_231006_133629.jpg',0,'토요일 ~ 일요일(11:00,14:00)','김태경, 김재호 등'),('PF227226','공연예술축제 그라제, 웅산: All that Jazz [광주]','29','예술의 전당 [광주] (구. 광주문화예술회관) (대극장)','2023.10.19','2023.10.19','R석 30,000원, 휠체어석 15,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227226_231006_140053.png',0,'목요일(19:30)','강재훈, 최우준, 신동하, 신동진, 박진경, 이정식, 한충은 등'),('PF227243','이상한 나라의 앨리스 [제주]','50','서귀포예술의전당 (대극장)','2023.10.27','2023.10.28','1층석 15,000원, 2층석 10,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227243_231010_093708.JPG',0,'금요일(19:30), 토요일(14:00,17:00)',' '),('PF227298','콜비츠와의 대화 [광주]','29','예술의 전당 [광주] (구. 광주문화예술회관) (소극장)','2023.10.17','2023.10.18','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227298_231010_122242.JPG',0,'화요일 ~ 수요일(19:30)','방수미, 양혜원, 이효인, 김주원, 박유빈'),('PF227312','손지우 바이올린 독주회 [인천]','28','엘림아트센터 (엘림홀)','2023.10.15','2023.10.15','전석 10,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227312_231010_130427.gif',0,'일요일(16:30)','손지우'),('PF227341','조난자들 [안양]','41','안양아트센터 (수리홀)','2023.10.14','2023.10.15','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227341_231010_142010.gif',0,'토요일 ~ 일요일(18:00)','한승우, 이민성, 박인환, 송하민'),('PF227354','토끼야 용궁가자 [의정부]','41','우리소극장 [의정부] (우리소극장 [의정부])','2023.10.14','2023.10.22','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227354_231010_145716.jpg',0,'토요일(12:00,14:00), 일요일(14:00,16:00)',' '),('PF227358','마크툽&박혜원&디에이드: 가을, 특별한 선물 [김천]','47','김천시문화예술회관 (대공연장)','2023.10.27','2023.10.27','R석 50,000원, S석 40,000원, A석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227358_231010_150823.jpg',0,'금요일(19:30)',' '),('PF227388','공연예술축제 그라제, 크랙샷: Rising Bullet [광주]','29','예술의 전당 [광주] (구. 광주문화예술회관) (소극장)','2023.10.19','2023.10.19','R석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227388_231010_163049.png',0,'목요일(19:30)',' '),('PF227428','제6회 작강연극제, 악연: 스무번째 생일 소원','26','부산예술회관 (부산예술회관)','2023.10.19','2023.10.19','전석 10,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227428_231010_182220.jpg',0,'목요일(19:30)','문석종, 하현우, 강우혁'),('PF227435','오브제 연극제, 돈키호테를 찾습니다 [대구]','27','아트벙커 (아트벙커)','2023.10.14','2023.10.15','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227435_231010_193113.png',0,'토요일(15:00,18:00), 일요일(15:00)','이나경'),('PF227437','오브제 연극제, 만나지 못한 친구 [대구]','27','아트벙커 (아트벙커)','2023.10.25','2023.10.29','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227437_231010_193922.png',0,'수요일 ~ 금요일(20:00), 토요일 ~ 일요일(15:00,18:00)','최우정, 김명일, 김진희, 윤규현, 강영은, 정아름'),('PF227458','제8회 단단페스티벌, 바디바디 체인지!','11','소극장 혜화당(구. 까망소극장) (소극장 혜화당(구. 까망소극장))','2023.10.18','2023.10.22','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227458_231011_101816.gif',0,'수요일 ~ 금요일(18:00), 토요일 ~ 일요일(16:00)','임원, 이상엽, 오혜민, 양수인, 김현선, 남도윤'),('PF227472','죽음과 소녀 [부산]','26','어댑터플레이스 (어댑터플레이스)','2023.10.13','2023.10.22','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227472_231011_104745.gif',0,'월요일 ~ 화요일(19:30), 목요일 ~ 금요일(19:30), 토요일 ~ 일요일(19:30)','박찬영, 홍승이, 윤준기'),('PF227473','QWER DEBUT 쇼케이스: Harmony from discord','11','무신사 개러지(구. 왓챠홀) (무신사 개러지(구. 왓챠홀))','2023.10.18','2023.10.18','전석 55,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227473_231011_104857.gif',0,'수요일(20:00)',' '),('PF227481','제14회 광주시립오페라단 정기공연, 토스카 콘체르탄테','29','국립아시아문화전당 (극장2)','2023.11.01','2023.11.02','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227481_231011_110616.jpg',0,'수요일 ~ 목요일(19:30)','김선희, 이다윗, 김성국, 김라희, 박기천, 양준모, 김형준 등'),('PF227511','윤지원 피아노 독주회','11','금호아트홀 연세 (금호아트홀 연세)','2023.10.16','2023.10.16','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227511_231011_131551.gif',0,'월요일(19:30)','윤지원'),('PF227557','만두 [광주]','29','공연일번지 (공연일번지)','2023.10.27','2023.10.29','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227557_231012_092639.jpg',0,'금요일(19:30), 토요일(15:00,18:00), 일요일(18:00)','김인영, 윤희철, 문진희, 이현숙, 이현구'),('PF227577','가요톱텐','47','문경문화예술회관 (대공연장)','2023.10.27','2023.10.27','전석 3,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227577_231012_103201.jpg',0,'금요일(19:30)','홍성민, 박규리, 박석주, 조윤진, 홍순목, 문준혁, 서지우 등'),('PF227630','제4회 대한민국 문화재 여기검 대제전','11','국립국악원 (우면당)','2023.10.18','2023.10.18','전석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227630_231012_130924.jpg',0,'수요일(19:00)','장승헌, 홍의진, 송현승, 강연진, 이정원, 장영미, 김춘희 등'),('PF227654','어린 왕자를 찾아줘','50','예술공간 오이 (예술공간 오이)','2023.10.21','2023.10.29','전석 15,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227654_231012_140313.jpeg',0,'토요일 ~ 일요일(16:00)',' '),('PF227728','나도 해피엔딩을 쓰고싶어 [인천 중구]','28','인천학생교육문화회관 (싸리재홀(대공연장))','2023.10.27','2023.10.28','전석무료','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227728_231013_123609.jpg',0,'금요일(14:00), 토요일(16:00)','오혜린, 조현영, 이주광, 박건일, 손지애, 김태윤, 김경민 등'),('PF227741','제150회 두레콘서트, 바이올리니스트 KoN 콘서트: 소녀의 눈물, 소녀의 내일','41','고양아람누리 (아람음악당)','2023.10.27','2023.10.27','전석 33,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227741_231013_131222.jpg',0,'금요일(20:00)','이일근, 손정윤, 이세희, 임슬기, 김현석, 장태희, 한순욱 등'),('PF227812','제20회 분당만돌린오케스트라 정기연주회','41','성남아트센터 (콘서트홀)','2023.10.27','2023.10.27','전석무료','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227812_231016_121720.jpg',0,'금요일(19:30)','서윤숙, 신명철 등'),('PF227838','양천구민을 위한 음악회, 스타메이드 뮤직 콘서트','11','양천문화회관 (대극장)','2023.10.18','2023.10.19','2층석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227838_231016_132830.gif',0,'수요일 ~ 목요일(18:00)','이은정, 최희진, 이성욱, 김선준, 한소민, 곽재성, 이영식 등'),('PF227840','이랑 x 셀럽 맷 음악 토크콘서트, 우리의 방','11','오페라하우스 [신도림] (지하소극장)','2023.10.18','2023.10.18','전석무료','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227840_231016_133109.jpg',0,'수요일(19:30)','이랑 등'),('PF227856','제26회 광주소극장축제 공식참여작, 아빠들의 소꿉장난','29','광주 민들레소극장 (광주 민들레소극장)','2023.10.26','2023.10.27','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227856_231016_140645.jpg',0,'목요일 ~ 금요일(19:30)','이영환, 한종신, 조유진, 현다현'),('PF227869','제5회 한음페스티벌 [부안]','45','부안예술회관 (공연장)','2023.10.19','2023.10.20','전석무료','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227869_231016_144707.png',0,'목요일(10:00,15:00,19:30), 금요일(10:00,19:30)','강민석, 유수영, 김은혜, 김호섭 등'),('PF227871','제86회 익산시립합창단 정기연주회, 함께','45','익산예술의전당 (대공연장)','2023.10.19','2023.10.19','전석무료','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227871_231016_145818.jpg',0,'목요일(19:30)','노기환 등'),('PF227904','또똣이 민박','41','인터미션 (소극장 아트홀)','2023.10.27','2023.11.05','전석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227904_231016_163456.jpg',0,'금요일(19:30), 토요일 ~ 일요일(15:00,19:00)','송하림, 최수연, 신창대, 김덕, 천진영, 배윤주, 이수현 등'),('PF227921','황금 물고기 [화성]','41','민들레연극마을 (사랑채극장)','2023.10.07','2023.10.28','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227921_231016_175410.jpg',0,'토요일(14:00,18:00)','송인현 등'),('PF227977','이야기로 들려주는 동물의 사육제, 생상스와 동물들의 비밀음악회 [인천]','28','학산소극장 (학산소극장)','2023.10.19','2023.10.19','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF227977_231017_110723.gif',0,'목요일(19:00)','김영아, 손희정, 최은선, 서보람, 이유라, 김계향, 박정현 등'),('PF228003','그놈은 예뻤다 [무안]','46','무안승달문화예술회관 (대공연장)','2023.10.27','2023.10.27','전석 5,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF228003_231017_125954.jpg',0,'금요일(19:30)','정태호, 김대성, 송병철, 심정은, 김현영, 유영우'),('PF228040','이송희 피아노 독주회: 빈으로부터의 로맨틱 스펙터클','27','대구콘서트하우스 (챔버홀(소공연장))','2023.10.19','2023.10.19','전석무료','http://www.kopis.or.kr/upload/pfmPoster/PF_PF228040_231018_101041.jfif',0,'목요일(19:30)','이송희, 이지희'),('PF228043','사대문 호랑이 [인천]','28','트라이보울 (공연장 (2층))','2023.11.01','2023.11.01','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF228043_231018_102633.jpg',0,'목요일 ~ 수요일(19:00)','구자경, 임상래, 김주희, 성하주, 전서진, 이현정, 최지섭 등'),('PF228114','넌센스 [경북 상주]','47','상주문화회관 (대공연장)','2023.10.27','2023.10.27','전석 5,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF228114_231018_135047.jpg',0,'금요일(19:30)',' '),('PF228142','ACC 수요극장, 춘향탈옥','29','국립아시아문화전당 (극장3)','2023.11.01','2023.11.01','전석무료','http://www.kopis.or.kr/upload/pfmPoster/PF_PF228142_231019_095201.jpg',0,'수요일(19:00)','공병우, 박하나, 서필, 김선정, 윤성회, 윤한성'),('PF228177','증발','50','제주문예회관 (대극장)','2023.10.18','2023.10.30','전석무료','http://www.kopis.or.kr/upload/pfmPoster/PF_PF228177_231019_112346.jpg',0,'월요일(15:00)','김호연, 김동현, 조현배, 지경민, 최민선, 박성현, 이혜상 등'),('PF228273','안산시립예술단 특별기획공연: 목요보노음악회','41','보노마루 (보노마루)','2023.10.19','2023.12.14','전석 5,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF228273_231020_142313.jpg',0,'목요일(19:00)',' '),('PF228442','마술사 제이티의 과학실험실 [부천]','41','부천문화원 솔안아트홀 (부천문화원 솔안아트홀)','2023.10.29','2023.11.19','전석 25,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF228442_231023_151438.gif',0,'일요일(14:00)',' '),('PF228541','소프라노 이정아 독창회: Reminisce [대구]','27','대구콘서트하우스 (챔버홀(소공연장))','2023.11.01','2023.11.01','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF228541_231024_134600.jpg',0,'수요일(19:30)','이정아, 남자은'),('PF228596','하나, 둘, 셋, 김치! [전주]','45','한옥마을아트홀 (한옥마을아트홀)','2023.10.13','2023.12.25','전석 20,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF228596_231025_143734.jpg',0,'화요일 ~ 금요일(19:30), 토요일(15:00,19:00)','진시라, 정윤경, 홍정은, 정찬호'),('PF228715','과학에 빠진 마술사 [인천 송도]','28','미리내 마술극단 [송도] (미리내 마술극단 [송도])','2023.10.28','2023.11.26','전석 30,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF228715_231026_160304.jpg',0,'토요일 ~ 일요일(11:00,14:00)','조민호, 이연우, 김우현, 유동균 , 조영훈, 김홍지'),('PF228928','빨간모자와 늑대 [광주]','29','롯데마트 [월드컵] (행복을 주는 가족극장)','2023.11.01','2023.11.29','전석 15,000원','http://www.kopis.or.kr/upload/pfmPoster/PF_PF228928_231031_094807.jpg',0,'화요일 ~ 금요일(16:00), 토요일 ~ 일요일(12:00,14:00,16:00)',' ');
/*!40000 ALTER TABLE `show_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `ID` varchar(10) NOT NULL COMMENT '유저ID',
  `pw` varchar(20) NOT NULL COMMENT '유저 pw',
  `tel` char(15) NOT NULL COMMENT '전화번호',
  `email` varchar(40) NOT NULL COMMENT '이메일',
  `mac_address` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '인증기기를 위한 맥주소',
  `rank` int DEFAULT NULL COMMENT '등급',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('abcde','fghi','010-1111-1111','abc@naver.com',NULL,1),('admin','admin','010-9999-9999','admin@naver.com',NULL,0),('html','css','010-5555-5555','htcss@naver.com',NULL,1),('java','mysql','010-6666-6666','jasql@naver.com',NULL,1),('login','pass','010-4444-4444','word@naver.com',NULL,1),('LOL','LCK','010-3333-3333','LOL@naver.com','00:d8:61:bc:c2:40',1),('ticket','ticket','010-2222-2222','def@naver.com','00:d8:61:bc:c2:40',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-02 11:15:37
