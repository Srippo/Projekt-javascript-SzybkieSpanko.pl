-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: noclegi
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `rezerwacje`
--

DROP TABLE IF EXISTS `rezerwacje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rezerwacje` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imie` varchar(50) DEFAULT NULL,
  `nazwisko` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefon` varchar(15) DEFAULT NULL,
  `miasto` varchar(50) DEFAULT NULL,
  `data_zameldowania` date DEFAULT NULL,
  `data_wymeldowania` date DEFAULT NULL,
  `liczba_doroslych` int DEFAULT NULL,
  `liczba_dzieci` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `object_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rezerwacje`
--

LOCK TABLES `rezerwacje` WRITE;
/*!40000 ALTER TABLE `rezerwacje` DISABLE KEYS */;
INSERT INTO `rezerwacje` VALUES (1,'Filip','Szreder','filip.szreder.slupsk@gmail.com','531292630','Ustka','2025-01-01','2025-01-08',2,1,'2024-12-29 19:44:40',1),(2,'Maciej','Piasecki','MaciejPiasecki@gmail.com','123456789','Łomża','2025-01-01','2025-01-08',2,1,'2024-12-29 19:49:41',1),(3,'Filip','Szreder','filip.szreder.slupsk@gmail.com','531292630','Słupsk','2025-01-01','2025-01-08',1,1,'2024-12-29 20:58:14',3),(4,'Filip','Kowalski','filipkowalski@gmail.com','123456777','Kraków','2024-12-29','2024-12-30',1,0,'2024-12-29 21:07:13',2),(5,'Damian','Guz','damianguz@gmail.com','123876598','Reda','2025-01-08','2025-01-15',1,2,'2025-01-08 09:24:42',1),(6,'Damian','Guz','damianguz@gmail.com','123876598','Reda','2025-01-08','2025-01-09',1,0,'2025-01-08 09:26:08',1),(7,'Maciej','Guz','Maciejguz@wp.cz','876438542','Pilsno','2025-01-08','2025-01-22',2,1,'2025-01-08 10:54:11',1),(8,'gvy','jhvg','ugy@gvygvyv.com','987888654','Pilsno','2025-01-16','2025-01-23',1,1,'2025-01-16 12:34:50',1),(9,'Janusz','Lewandowski','lewandowski@example.com','111222333','Warszawa','2025-01-20','2025-01-22',1,1,'2025-01-20 13:23:47',1),(10,'jan','morsztyn','morsztyn@example.com','222333444','Wrocław','2025-01-20','2025-01-22',1,1,'2025-01-20 13:24:21',1),(11,'Filip','Szreder','filip.szreder.slupsk@gmail.com','531292630','Przewłoka','2025-01-20','2025-01-23',1,1,'2025-01-20 19:28:12',1),(12,'Filip','Szreder','filip.szreder.slupsk@gmail.com','531292630','Przewłoka','2025-02-01','2025-02-08',1,1,'2025-01-20 19:33:48',2),(13,'Filip','Szreder','filip.szreder.slupsk@gmail.com','531292630','Przewłoka','2025-02-01','2025-02-08',1,1,'2025-01-20 19:34:02',2),(14,'Filip','Szreder','filip.szreder.slupsk@gmail.com','531292630','Przewłoka','2025-02-01','2025-02-08',1,1,'2025-01-20 19:37:45',2),(15,'Filip','Szreder','filip.szreder.slupsk@gmail.com','531292630','Przewłoka','2025-02-01','2025-02-08',1,2,'2025-01-20 19:38:18',2),(16,NULL,NULL,NULL,NULL,NULL,'2025-01-20','2025-01-25',NULL,NULL,'2025-01-20 19:39:45',1),(17,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-01-20 19:43:44',NULL),(18,'Filip','Szreder','filip.szreder.slupsk@gmail.com','531292630','Przewłoka','2025-02-01','2025-02-08',1,1,'2025-01-20 19:50:39',1);
/*!40000 ALTER TABLE `rezerwacje` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-20 22:16:49
