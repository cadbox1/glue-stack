# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.21)
# Database: glue
# Generation Time: 2018-10-31 12:59:00 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table organisation
# ------------------------------------------------------------

LOCK TABLES `organisation` WRITE;
/*!40000 ALTER TABLE `organisation` DISABLE KEYS */;

INSERT INTO `organisation` (`id`, `name`, `statusId`, `active`, `createdDate`, `modifiedDate`)
VALUES
	(3,'The First Organisation',1,b'1','2018-10-31 20:54:49','2018-10-31 20:54:49'),
	(4,'Second Organisation',1,b'1','2018-10-31 20:58:10','2018-10-31 20:58:10');

/*!40000 ALTER TABLE `organisation` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table task
# ------------------------------------------------------------

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;

INSERT INTO `task` (`id`, `organisationId`, `name`, `notes`, `userId`, `statusId`, `active`, `createdDate`, `modifiedDate`)
VALUES
	(4,3,'Tour De France','A bike tour in france',4,2,b'1','2018-10-31 20:56:04','2018-10-31 20:56:39'),
	(5,3,'Go on Moon','',5,2,b'1','2018-10-31 20:56:36','2018-10-31 20:56:40'),
	(6,3,'Come to Perth','Perth, Australia',NULL,0,b'1','2018-10-31 20:57:02','2018-10-31 20:57:02'),
	(7,3,'Go to Mars','Mars Mars',4,0,b'1','2018-10-31 20:57:30','2018-10-31 20:57:30');

/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `organisationId`, `email`, `password`, `firstName`, `lastName`, `active`, `createdDate`, `modifiedDate`)
VALUES
	(4,3,'NeilArmstrong@gmail.com','$2a$10$i4xjZr/xe2.Xu334JO.aCuUmfTXUKJIa2bjTcdQ9IniNkRv8dIc3i','Neil','Armstrong',b'1','2018-10-31 20:54:49','2018-10-31 20:54:49'),
	(5,3,'LanceArmstrong@gmail.com','$2a$10$NmqUEFZ5at.OwpjMbIDkJukSj79o4JCbEXOP9Zlaiw58FoPinXoDS','Lance','Armstrong',b'1','2018-10-31 20:55:17','2018-10-31 20:55:17'),
	(6,4,'AccessDenied@gmail.com','$2a$10$W3xOxjMNFh4N09E41GwPbOcz29Nnl93Q11ypTj1peHd5HCbl7OV3q','No','Access',b'1','2018-10-31 20:58:10','2018-10-31 20:58:10');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
