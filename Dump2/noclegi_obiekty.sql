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
-- Table structure for table `obiekty`
--

DROP TABLE IF EXISTS `obiekty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `obiekty` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `object_name` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `avbl` tinyint(1) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `max_guests` int DEFAULT NULL,
  `coords_lat` decimal(10,8) DEFAULT NULL,
  `coords_lon` decimal(11,8) DEFAULT NULL,
  `descript` text,
  `address` varchar(255) DEFAULT NULL,
  `address_line` varchar(255) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `distance` float DEFAULT NULL,
  `attribute1` varchar(255) DEFAULT NULL,
  `attribute1_description` text,
  `attribute2` varchar(255) DEFAULT NULL,
  `attribute2_description` text,
  `roomDetails` varchar(255) DEFAULT NULL,
  `roomDetailsDescription` text,
  `urgent` varchar(255) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT '0.0',
  `reviews_count` int DEFAULT '0',
  `descriptionLong` text,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obiekty`
--

LOCK TABLES `obiekty` WRITE;
/*!40000 ALTER TABLE `obiekty` DISABLE KEYS */;
INSERT INTO `obiekty` VALUES (1,'Złota 44','Warszawa',1,500.00,6,52.23100000,21.00200000,'Luksusowy apartament typu Penthouse na najwyższym piętrze ikonicznego drapacza chmur. Rozkoszuj się pełnym widokiem Warszawy.','Śródmieście, Warszawa','ul. Złota 44','00-120','Polska','images/Zlota44.jpg',0.2,'Bezpłatna taksówka z lotniska','Ciesz się bezpłatnym, prywatnym przejazdem taksówką z lotniska do miejsca zakwaterowania. Przysługuje on w przypadku rezerwacji dla maksymalnie 6 osób, a dostawcą oferty jest SzybkieSpanko.pl','Oferta limitowana','Otrzymujesz niższą cenę, ponieważ ten obiekt ma ustawioną Ofertę Limitowaną. Ta oferta trwa maks. 48 godzin.','Apartament typu Penthouse z 2 sypialniami','1 prywatny apartament, 2 sypialnie, 120m²','Na naszej stronie został tylko 1 w takiej cenie!',9.4,100,'Niezapomniane wrażenia na wysokości – Złota 44 Penthouse\nZłota 44 Penthouse to najbardziej luksusowy apartament w samym sercu Warszawy, mieszczący się na najwyższych piętrach ikonicznego wieżowca zaprojektowanego przez światowej sławy architekta Daniela Libeskinda. Ten ekskluzywny apartament oferuje niepowtarzalne widoki na panoramę stolicy, od Pałacu Kultury i Nauki aż po malownicze brzegi Wisły.\n\nKażdy szczegół w Złota 44 Penthouse został zaprojektowany z myślą o komforcie i elegancji. Przestronne, nowocześnie urządzone wnętrza obejmują:\n\nGłówną sypialnię z łóżkiem typu king-size oraz bezpośrednim dostępem do łazienki wykończonej w marmurze Carrara.\nPrzestronny salon, którego ogromne, panoramiczne okna pozwalają cieszyć się niesamowitymi widokami zarówno w dzień, jak i w nocy.\nW pełni wyposażoną kuchnię, dostosowaną zarówno do przygotowywania romantycznych kolacji, jak i profesjonalnych spotkań biznesowych.\nStrefę relaksu, w której znajdziesz prywatną saunę oraz jacuzzi z widokiem na Warszawę.\nPenthouse został wyposażony w najnowocześniejsze technologie, takie jak inteligentny system zarządzania oświetleniem i temperaturą, a także dźwiękoszczelne okna, które zapewniają pełną prywatność i ciszę, nawet w tętniącym życiem centrum miasta.\n\nDo dyspozycji gości pozostaje również piętro rekreacyjne wieżowca Złota 44, gdzie można skorzystać z:\n\nBasenu o długości 25 metrów, z widokiem na centrum Warszawy.\nProfesjonalnego centrum fitness z najnowszym sprzętem do ćwiczeń.\nEkskluzywnego spa oferującego szeroką gamę zabiegów relaksacyjnych.\nZłota 44 Penthouse to idealne miejsce zarówno na romantyczny weekend, jak i na luksusowy pobyt biznesowy. Jego lokalizacja w ścisłym centrum Warszawy sprawia, że najważniejsze atrakcje stolicy, takie jak Stare Miasto, Zamek Królewski czy Teatr Wielki, są na wyciągnięcie ręki.\n\nNiepowtarzalna lokalizacja, niesamowite udogodnienia i dbałość o detale sprawiają, że Złota 44 Penthouse to najlepszy wybór dla osób, które oczekują najwyższego standardu i niezapomnianych wrażeń.'),(2,'Hotel Marriot','Warszawa',1,450.00,4,52.22755000,21.00411800,'Luksusowe pokoje w słynnym hotelu Marriot','Centrum, Warszawa','Aleje Jerozolimskie','00-698','Polska','images/Marriot.jpg',0.3,'Bezpłatne Wi-Fi','Darmowe Wi-Fi dostępne w całym obiekcie.','Promocja','Tylko dzisiaj niższa cena!','Pokój hotelowy z 2 łóżkami king-size','Pokój z balkonem, 45m²','Ostatni w tej cenie!',9.2,250,'Hotel Marriott to oaza komfortu i luksusu, oferująca niezrównane doświadczenia zarówno dla podróżujących służbowo, jak i turystów. Położony w sercu miasta, hotel jest doskonałym punktem wypadowym do odkrywania lokalnych atrakcji, jednocześnie zapewniając spokojne i relaksujące środowisko.\n\nGoście mogą cieszyć się elegancko urządzonymi pokojami, które łączą nowoczesny styl z przytulnym klimatem. Każdy pokój wyposażony jest w najwyższej klasy udogodnienia, w tym wygodne łóżka, szybki internet, duże telewizory z płaskim ekranem oraz przestronne łazienki z luksusowymi kosmetykami.\n\nHotel Marriott oferuje również szeroką gamę udogodnień, które sprostają oczekiwaniom najbardziej wymagających gości. Znajdziesz tu nowoczesne centrum fitness, kryty basen, a także strefę wellness z saunami i zabiegami spa, które pozwolą Ci zregenerować siły po dniu pełnym wrażeń. Restauracja na miejscu serwuje wykwintne dania, przygotowywane z lokalnych, sezonowych składników, a hotelowy bar to idealne miejsce na wieczorne koktajle w stylowym otoczeniu.\n\nDla gości biznesowych Marriott oferuje w pełni wyposażone sale konferencyjne, które można dostosować do różnorodnych potrzeb, od kameralnych spotkań po duże eventy. Profesjonalny zespół personelu zapewni, że każde wydarzenie będzie zorganizowane na najwyższym poziomie.\n\nGościnność jest sercem filozofii Marriott – przyjazny i pomocny personel zawsze chętnie pomoże, dbając o każdy szczegół Twojego pobytu. Niezależnie od celu podróży, Marriott to miejsce, które zapewni Ci wyjątkowe wspomnienia i chęć powrotu.'),(3,'Domek Luksusowy','Barkocin',1,400.00,5,54.14455000,17.21252000,'Luksusowy domek ze świetnym wyposażeniem','Kaszubska Ostoja',NULL,NULL,NULL,'images/domekLuksusowy.jpg',50,'Bezpłatne Wi-Fi','Darmowe Wi-Fi dostępne w całym obiekcie.','Darmowy Parking','Darmowy parking na terenie obiektu','1 łóżko King-size, 2 łóżka pojedyncze, rozsuwana sofa','Apartament z 2 sypialniami i balkonem 80m²','Ostatni w tej cenie!',0.0,0,NULL);
/*!40000 ALTER TABLE `obiekty` ENABLE KEYS */;
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
