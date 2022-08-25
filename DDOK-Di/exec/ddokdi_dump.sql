-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: i7a102.p.ssafy.io    Database: ddokdi
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

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
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area` (
  `zone` varchar(255) NOT NULL,
  PRIMARY KEY (`zone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES ('A'),('B'),('C');
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calendar`
--

DROP TABLE IF EXISTS `calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendar` (
  `calendar_id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`calendar_id`),
  KEY `FK7lyt2gd8862h9hhn5ne38l51i` (`user_id`),
  CONSTRAINT `FK7lyt2gd8862h9hhn5ne38l51i` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar`
--

LOCK TABLES `calendar` WRITE;
/*!40000 ALTER TABLE `calendar` DISABLE KEYS */;
INSERT INTO `calendar` VALUES (5,1),(65,61),(70,66),(75,71),(80,76),(85,81),(90,86),(97,93),(126,122),(131,127),(136,132),(187,183);
/*!40000 ALTER TABLE `calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `desk_setting`
--

DROP TABLE IF EXISTS `desk_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `desk_setting` (
  `desk_setting_id` bigint NOT NULL,
  `desk_height` float DEFAULT NULL,
  `desk_index` bigint DEFAULT NULL,
  `monitor_height` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`desk_setting_id`),
  KEY `FK89h6ogb6uv3mv8qaiha533gaw` (`user_id`),
  CONSTRAINT `FK89h6ogb6uv3mv8qaiha533gaw` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `desk_setting`
--

LOCK TABLES `desk_setting` WRITE;
/*!40000 ALTER TABLE `desk_setting` DISABLE KEYS */;
INSERT INTO `desk_setting` VALUES (2,16,1,1,1),(3,15.3,2,1,1),(4,15.3,3,1,1),(62,16,1,1,61),(63,15.3,2,1,61),(64,15.3,3,1,61),(67,16.8,1,1,66),(68,15.5,2,1,66),(69,15.5,3,1,66),(72,16,1,1,71),(73,15.3,2,1,71),(74,13.3,3,1,71),(77,16,1,1,76),(78,15.3,2,1,76),(79,15.3,3,1,76),(82,18,1,3,81),(83,15.3,2,1,81),(84,14,3,1,81),(87,16,1,1,86),(88,15.3,2,1,86),(89,15.3,3,1,86),(94,17.3,1,3,93),(95,18.3,2,1,93),(96,15,3,1,93),(123,16,1,1,122),(124,15.3,2,1,122),(125,15.3,3,1,122),(128,16,1,1,127),(129,15.3,2,1,127),(130,15.3,3,1,127),(133,16,1,1,132),(134,15.3,2,1,132),(135,15.3,3,1,132),(184,16.5,1,1,183),(185,15.8,2,1,183),(186,15.8,3,1,183);
/*!40000 ALTER TABLE `desk_setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (214);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jwt_bank`
--

DROP TABLE IF EXISTS `jwt_bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jwt_bank` (
  `ticket` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `jwt` varchar(255) NOT NULL,
  PRIMARY KEY (`ticket`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jwt_bank`
--

LOCK TABLES `jwt_bank` WRITE;
/*!40000 ALTER TABLE `jwt_bank` DISABLE KEYS */;
INSERT INTO `jwt_bank` VALUES ('1301','root@ssafy.com','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290QHNzYWZ5LmNvbSIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJpYXQiOjE2NjA4MzM1NTMsImV4cCI6MTY2MzQyNTU1M30.dm8hOjBs8im9BtV8HqvGzv_b2cuXSR5xfMPi4EgWHH4'),('3363','inyoung@ssafy.com','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpbnlvdW5nQHNzYWZ5LmNvbSIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV0sImlhdCI6MTY2MDgyODIzNSwiZXhwIjoxNjYzNDIwMjM1fQ.o25mb0KAYM1GLCsrjkiB8Vdpe3jhyrrJQoO7m0LC4H8'),('4658','leesanghyeon@ssafy.com','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZWVzYW5naHllb25Ac3NhZnkuY29tIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjYwODI0MzMyLCJleHAiOjE2NjM0MTYzMzJ9.r4VpVDPX1OQYsiHVXIEQ00bzZlkfJoOq-qKHF725OKc'),('7560','rudalsd@naver.com','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJydWRhbHNkQG5hdmVyLmNvbSIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV0sImlhdCI6MTY2MDgxMjA2NiwiZXhwIjoxNjYzNDA0MDY2fQ.ObuOuGBxl3I3xrYSkENA-Ou46H8VLQu-5ombKd7L-ng'),('7943','bem2183@naver.com','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiZW0yMTgzQG5hdmVyLmNvbSIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV0sImlhdCI6MTY2MDgzNDAxNiwiZXhwIjoxNjYzNDI2MDE2fQ.20mjqLvg6AZY4QRsDnPiEL0ohpvAHAR4xh0dkNoFLt8'),('7998','nkim10@ssafy.com','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJua2ltMTBAc3NhZnkuY29tIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjYwNzg2ODA5LCJleHAiOjE2NjMzNzg4MDl9.-kpHs7WfuT8dHckPOBwOJaObC4cuhNIbr-ruw3Gk9io'),('9228','suhpysiss@ssafy.com','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWhweXNpc3NAc3NhZnkuY29tIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjYwODI5NzE4LCJleHAiOjE2NjM0MjE3MTh9.OL9Eb8cObYLL1fovZRve0K5Qm61nIoRWhDLypy5krKI');
/*!40000 ALTER TABLE `jwt_bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat` (
  `seat_id` bigint NOT NULL,
  `is_full` bit(1) NOT NULL,
  `is_vertical` bit(1) DEFAULT NULL,
  `left_pos` bigint DEFAULT NULL,
  `seat_number` bigint NOT NULL,
  `top_pos` bigint DEFAULT NULL,
  `area` varchar(255) NOT NULL,
  PRIMARY KEY (`seat_id`),
  KEY `FK7u06gota5gnejdrauwkcac0j1` (`area`),
  CONSTRAINT `FK7u06gota5gnejdrauwkcac0j1` FOREIGN KEY (`area`) REFERENCES `area` (`zone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (1,_binary '\0',_binary '',241,1,51,'A'),(6,_binary '\0',_binary '',500,1,150,'B'),(7,_binary '\0',_binary '',802,2,172,'B'),(8,_binary '\0',_binary '',249,4,12,'B'),(10,_binary '\0',_binary '',630,3,-1,'B'),(13,_binary '\0',_binary '',577,8,86,'B'),(14,_binary '\0',_binary '',423,9,147,'B'),(16,_binary '\0',_binary '',280,4,130,'A'),(17,_binary '\0',_binary '\0',201,5,209,'A'),(18,_binary '\0',_binary '',280,2,51,'A'),(19,_binary '\0',_binary '',241,3,130,'A'),(20,_binary '\0',_binary '\0',279,6,209,'A'),(27,_binary '\0',_binary '',808,13,50,'A'),(28,_binary '\0',_binary '',849,14,50,'A'),(29,_binary '\0',_binary '',808,15,129,'A'),(30,_binary '\0',_binary '',849,16,130,'A'),(31,_binary '\0',_binary '\0',769,17,208,'A'),(32,_binary '\0',_binary '\0',848,18,208,'A'),(44,_binary '\0',_binary '',448,1,150,'C'),(46,_binary '\0',_binary '',701,3,157,'C'),(116,_binary '\0',_binary '',500,2,150,'C'),(162,_binary '\0',_binary '',533,8,46,'A'),(163,_binary '\0',_binary '',491,9,124,'A'),(164,_binary '\0',_binary '',532,10,124,'A'),(165,_binary '\0',_binary '',492,7,46,'A'),(166,_binary '\0',_binary '\0',532,12,204,'A'),(188,_binary '\0',_binary '\0',452,11,203,'A');
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo`
--

DROP TABLE IF EXISTS `todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo` (
  `todo_id` bigint NOT NULL,
  `content` longtext,
  `todo_datetime_end` datetime DEFAULT NULL,
  `datetime_start` datetime DEFAULT NULL,
  `notice_time` bigint DEFAULT NULL,
  `priority` varchar(20) NOT NULL DEFAULT 'NORMAL',
  `title` varchar(255) NOT NULL,
  `calendar_id` bigint DEFAULT NULL,
  PRIMARY KEY (`todo_id`),
  KEY `FKs6grjt2iu9ql2on17r2g7w8q3` (`calendar_id`),
  CONSTRAINT `FKs6grjt2iu9ql2on17r2g7w8q3` FOREIGN KEY (`calendar_id`) REFERENCES `calendar` (`calendar_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo`
--

LOCK TABLES `todo` WRITE;
/*!40000 ALTER TABLE `todo` DISABLE KEYS */;
INSERT INTO `todo` VALUES (91,'맛난게 뭐있지','2022-08-03 11:03:00','2022-08-03 11:03:00',NULL,'VERYIMPORTANT','배고프다',85),(92,'똑디 발표','2022-08-19 12:00:00','2022-08-19 12:00:00',60,'VERYIMPORTANT','공통프로젝트 발표',90),(98,'노','2022-08-18 01:09:00','2022-08-18 01:09:00',10,'NORMAL','노말',97),(99,'임포턴트','2022-08-18 02:11:00','2022-08-18 02:11:00',10,'IMPORTANT','임포턴트',97),(100,'베리임포턴트','2022-08-18 11:15:00','2022-08-18 11:15:00',10,'VERYIMPORTANT','베리임포턴트부터',97),(101,'팀미팅','2022-08-18 11:33:00','2022-08-18 11:27:00',5,'NORMAL','미팅',90),(102,'노말','2022-08-19 13:45:00','2022-08-19 00:45:00',30,'NORMAL','노말',97),(104,'ㅇㅇ','2022-08-09 11:51:00','2022-08-09 00:51:00',10,'NORMAL','노맘ㄹ',97),(105,'ㅇㅇㅇ','2022-08-10 03:53:00','2022-08-10 01:53:00',15,'IMPORTANT','임포',97),(106,'ㄴㄴ','2022-08-01 03:54:00','2022-08-01 01:54:00',60,'VERYIMPORTANT','베리',97),(107,'베리','2022-08-29 00:56:00','2022-08-29 00:54:00',60,'VERYIMPORTANT','베리',97),(108,'노말','2022-08-25 02:55:00','2022-08-25 01:55:00',30,'NORMAL','노말',97),(109,'임포','2022-08-21 01:56:00','2022-08-21 00:56:00',1440,'IMPORTANT','임포',97),(110,'임포','2022-08-07 01:57:00','2022-08-07 00:57:00',5,'IMPORTANT','임포',97),(111,'베리','2022-08-14 01:58:00','2022-08-14 00:58:00',10,'VERYIMPORTANT','베리',97),(112,'노말','2022-08-06 01:58:00','2022-08-06 00:58:00',10,'NORMAL','노말',97),(113,'ㄴㄴ','2022-08-23 19:16:00','2022-08-23 18:16:00',10,'NORMAL','노말',97),(114,'편의점커피','2022-08-18 15:35:00','2022-08-18 15:30:00',10,'IMPORTANT','커피한잔',85),(115,'ㄴㄴㄴ','2022-08-18 18:36:00','2022-08-18 17:36:00',5,'NORMAL','네번째',97),(117,'ㄴㄴ','2022-08-18 22:12:00','2022-08-18 22:09:00',5,'NORMAL','ㄴㄴㄴ',97),(119,'22','2022-08-25 20:20:00','2022-08-25 18:19:00',30,'IMPORTANT','2',97),(120,'sss','2022-08-16 17:39:00','2022-08-16 16:39:00',15,'VERYIMPORTANT','very',97),(121,'ddd','2022-08-19 18:13:00','2022-08-19 17:11:00',10,'IMPORTANT','dddd',97),(156,'gg','2022-08-24 22:47:00','2022-08-24 21:47:00',10,'NORMAL','first',97),(190,'멀티캠퍼스 출근','2022-08-01 09:00:00','2022-08-01 09:00:00',10,'IMPORTANT','멀티캠퍼스 출근',70),(191,'멀티캠퍼스 출근','2022-08-03 09:00:00','2022-08-03 09:00:00',10,'IMPORTANT','멀티캠퍼스 출근',70),(192,'멀티캠퍼스 출근','2022-08-08 09:00:00','2022-08-08 09:00:00',10,'IMPORTANT','멀티캠퍼스 출근',70),(193,'멀티캠퍼스 출근','2022-08-10 09:00:00','2022-08-10 09:00:00',10,'IMPORTANT','멀티캠퍼스 출근',70),(194,'멀티캠퍼스 출근','2022-08-17 09:00:00','2022-08-17 09:00:00',10,'IMPORTANT','멀티캠퍼스 출근',70),(198,'키오스크 기능 개발','2022-08-02 09:00:00','2022-08-02 09:00:00',10,'NORMAL','공통 프로젝트',70),(199,'태블릿 기능 개발','2022-08-04 09:00:00','2022-08-04 09:00:00',10,'NORMAL','공통 프로젝트',70),(202,'태블릿 기능 개발','2022-08-12 09:00:00','2022-08-12 09:00:00',10,'NORMAL','공통 프로젝트',70),(203,'태블릿 기능 개발','2022-08-16 09:00:00','2022-08-16 09:00:00',10,'NORMAL','공통 프로젝트',70),(205,'발표 및 시연 연습','2022-08-18 09:00:00','2022-08-18 09:00:00',10,'VERYIMPORTANT','공통 프로젝트 마무리',70),(206,'맛난게 뭐있지','2022-08-18 13:23:00','2022-08-17 12:23:00',NULL,'VERYIMPORTANT','배고프다',85),(207,'발표','2022-08-19 17:00:00','2022-08-19 13:00:00',10,'VERYIMPORTANT','공통 프로젝트 발표',70),(208,'태블릿 기능 개발','2022-08-01 09:00:00','2022-08-01 09:00:00',10,'NORMAL','공통 프로젝트',70),(209,'태블릿 기능 개발','2022-08-03 09:00:00','2022-08-03 09:00:00',10,'NORMAL','공통 프로젝트',70),(210,'태블릿 기능 개발','2022-08-08 09:00:00','2022-08-08 09:00:00',10,'NORMAL','공통 프로젝트',70),(211,'태블릿 기능 개발','2022-08-10 09:00:00','2022-08-10 09:00:00',10,'NORMAL','공통 프로젝트',70),(212,'태블릿 기능 개발','2022-08-17 09:00:00','2022-08-17 09:00:00',10,'NORMAL','공통 프로젝트',70),(213,'커피','2022-08-18 14:35:00','2022-08-18 13:34:00',10,'IMPORTANT','편의점',85);
/*!40000 ALTER TABLE `todo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `todo_priority_id` bigint NOT NULL,
  `role` varchar(255) NOT NULL,
  `user_role_id` bigint NOT NULL,
  PRIMARY KEY (`user_role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_user_id` bigint NOT NULL,
  `roles` varchar(255) DEFAULT NULL,
  KEY `FK5gikiw021w6y16a8t5vjwqwyj` (`user_user_id`),
  CONSTRAINT `FK5gikiw021w6y16a8t5vjwqwyj` FOREIGN KEY (`user_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_status`
--

DROP TABLE IF EXISTS `user_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_status` (
  `user_status_id` bigint NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`user_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_status`
--

LOCK TABLES `user_status` WRITE;
/*!40000 ALTER TABLE `user_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL,
  `email` varchar(255) NOT NULL,
  `employee_number` bigint NOT NULL,
  `height` bigint DEFAULT NULL,
  `login_card_number` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `notice_display` bit(1) NOT NULL,
  `notice_sound` bit(1) NOT NULL,
  `notice_vibration` bit(1) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  `user_role` varchar(255) NOT NULL,
  `user_status` varchar(255) NOT NULL,
  `seat_id` bigint DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  KEY `FKale51db8idf1l5rl19twal7gf` (`seat_id`),
  CONSTRAINT `FKale51db8idf1l5rl19twal7gf` FOREIGN KEY (`seat_id`) REFERENCES `seat` (`seat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'root@ssafy.com',5556599,0,NULL,'관리자',_binary '',_binary '',_binary '','$2a$10$1uOaYoHb4GwxOnpCH5ealOG8U855w.MMgosbvuQTPaPt3zMKXOaEC','010-0000-0000','관리자',NULL,'ROLE_ADMIN','OnLine',NULL),(61,'suhpysiss@ssafy.com',8127221,172,NULL,'신희재',_binary '',_binary '',_binary '','$2a$10$OKz3uT7XXrufRxiw30puNOwYercfdsMsFVK6gWuds5Wo5IdxSKeuq','010-0000-0000','팀원',NULL,'ROLE_USER','InOtherWork',NULL),(66,'rudalsd@naver.com',5538448,183,'e2c388db9cfcd903c938fdff58782a11a9152db3b27e4369e977af59c0c4264f','어우권',_binary '',_binary '',_binary '','$2a$10$CPriOVpGkTWP1F3wFVti7er9710xxMrex3oerS64qSaqtXnFcslDq','010-1111-2222','팀장',NULL,'ROLE_USER','InOtherWork',NULL),(71,'yongwook@ssafy.com',3662511,165,NULL,'이용욱',_binary '',_binary '',_binary '','$2a$10$cSFY/mVtD/xBsi./UTACEelDYImX/TT/1yTiwRMo5NJkZuRq1zsCy','010-9291-3796','팀원',NULL,'ROLE_USER','OffLine',NULL),(76,'nkim10@ssafy.com',3585178,162,NULL,'김나영',_binary '',_binary '',_binary '','$2a$10$T5qn.vcnUTrQLowxuphC6uMgpVHRNaKAPfymWE6l4esHmxV8YQPIS','010-0000-0000','크루',NULL,'ROLE_USER','InOtherWork',NULL),(81,'kbs@naver.com',3386322,182,NULL,'김병수',_binary '',_binary '',_binary '','$2a$10$y/4Wu9OFvm.Upye9MdEM4ON1dHKwBPVGEysYZ.jGJh2EvuUKDIVtq','010-1234-1111','팀원',NULL,'ROLE_USER','OffLine',NULL),(86,'inyoung@ssafy.com',10,170,NULL,'호인영',_binary '',_binary '',_binary '','$2a$10$lWV0dYtlJ4lDZmx8ugmIxOmdTuu5ZwGUN9FcLdXH2vUpexXMP.y2S','01026778997','팀원',NULL,'ROLE_USER','OnLine',NULL),(93,'bem2183@naver.com',3252069,177,NULL,'배윤호',_binary '',_binary '',_binary '','$2a$10$6/Xpk12DKeQFrMrYKYtdA.teh3HdcMex6ObrkLfKt/s5G78La6eEO','010-0000-0000','신입',NULL,'ROLE_USER','OnLine',NULL),(122,'hyojeong@ssafy.com',9322038,165,NULL,'장효정',_binary '',_binary '',_binary '','$2a$10$BXJgHbfF4iOiyLsm0u46B.zMrTtxj.Qf95vHRZvA0Kxg8j/xGlUXa','010-0000-0000','신입',NULL,'ROLE_USER','OffLine',NULL),(127,'dang@ssafy.com',7862525,162,NULL,'당현아',_binary '',_binary '',_binary '','$2a$10$ETSJW8Yn/kuGjl1pXj8Rx.MdlrtnXRC6jV5jWCtvZD4rNbM9Ivl06','010-0000-0000','신입',NULL,'ROLE_USER','OffLine',NULL),(132,'leesanghyeon@ssafy.com',5647249,178,NULL,'이상현',_binary '',_binary '',_binary '','$2a$10$ithtnPoVjaWf.ZxWC0z2ku2lcYjcjkF2HmQN7LzfJViGcG//LWhPS','010-0000-0000','신입',NULL,'ROLE_USER','OnLine',NULL),(183,'ssafy@ssafy.com',8796461,173,NULL,'김싸피',_binary '',_binary '',_binary '','$2a$10$HAl5Um1Zo.qyMyN96ZtLHeIQPRKcYlsptsJXaiRU73b2yECzDHVBu','010-0000-0000','신입',NULL,'ROLE_USER','OffLine',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-18 23:51:09
