# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.7.12)
# Database: hammer2
# Generation Time: 2017-05-25 23:26:01 +0000
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

CREATE TABLE `organisation` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `statusID` int(11) unsigned NOT NULL,
  `active` bit(1) NOT NULL,
  `createdDate` datetime NOT NULL,
  `modifiedDate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


# Dump of table task
# ------------------------------------------------------------

CREATE TABLE `task` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `organisationId` int(11) unsigned NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `notes` varchar(255) DEFAULT NULL,
  `active` bit(1) NOT NULL,
  `createdDate` datetime NOT NULL,
  `modifiedDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `organisationId` (`organisationId`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`organisationId`) REFERENCES `organisation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table task_permission
# ------------------------------------------------------------

CREATE TABLE `task_permission` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) unsigned DEFAULT NULL,
  `userGroupId` int(11) unsigned DEFAULT NULL,
  `targetTaskId` int(11) unsigned DEFAULT NULL,
  `targetTaskGroupId` int(11) unsigned DEFAULT NULL,
  `childEntity` int(11) unsigned DEFAULT NULL,
  `readPermission` bit(1) DEFAULT NULL,
  `writePermission` bit(1) DEFAULT NULL,
  `executePermission` bit(1) DEFAULT NULL,
  `modifiedDate` date NOT NULL,
  `createdDate` date NOT NULL,
  `active` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `userGroupId` (`userGroupId`),
  KEY `targetTaskId` (`targetTaskId`),
  KEY `targetTaskGroupId` (`targetTaskGroupId`),
  CONSTRAINT `task_permission_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `task_permission_ibfk_2` FOREIGN KEY (`userGroupId`) REFERENCES `taskGroup` (`id`),
  CONSTRAINT `task_permission_ibfk_3` FOREIGN KEY (`targetTaskId`) REFERENCES `task` (`id`),
  CONSTRAINT `task_permission_ibfk_4` FOREIGN KEY (`targetTaskGroupId`) REFERENCES `taskGroup` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table task_taskGroup
# ------------------------------------------------------------

CREATE TABLE `task_taskGroup` (
  `taskId` int(11) unsigned NOT NULL,
  `taskGroupId` int(11) unsigned NOT NULL,
  KEY `taskId` (`taskId`),
  KEY `taskGroupId` (`taskGroupId`),
  CONSTRAINT `task_taskgroup_ibfk_1` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`),
  CONSTRAINT `task_taskgroup_ibfk_2` FOREIGN KEY (`taskGroupId`) REFERENCES `taskGroup` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table taskGroup
# ------------------------------------------------------------

CREATE TABLE `taskGroup` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `organisationId` int(11) unsigned NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `notes` varchar(255) DEFAULT NULL,
  `active` bit(1) NOT NULL,
  `createdDate` datetime NOT NULL,
  `modifiedDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `organisationId` (`organisationId`),
  CONSTRAINT `taskgroup_ibfk_1` FOREIGN KEY (`organisationId`) REFERENCES `organisation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table taskGroup_permission
# ------------------------------------------------------------

CREATE TABLE `taskGroup_permission` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) unsigned DEFAULT NULL,
  `userGroupId` int(11) unsigned DEFAULT NULL,
  `targetTaskGroupId` int(11) unsigned DEFAULT NULL,
  `read` bit(1) DEFAULT NULL,
  `write` bit(1) DEFAULT NULL,
  `modifedDate` date NOT NULL,
  `createdDate` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `userGroupId` (`userGroupId`),
  KEY `targetTaskGroupId` (`targetTaskGroupId`),
  CONSTRAINT `taskgroup_permission_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `taskgroup_permission_ibfk_2` FOREIGN KEY (`userGroupId`) REFERENCES `userGroup` (`id`),
  CONSTRAINT `taskgroup_permission_ibfk_3` FOREIGN KEY (`targetTaskGroupId`) REFERENCES `taskGroup` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table taskSchedule
# ------------------------------------------------------------

CREATE TABLE `taskSchedule` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `organisationId` int(11) unsigned NOT NULL,
  `taskId` int(11) unsigned NOT NULL,
  `userId` int(11) unsigned NOT NULL,
  `scheduledDate` datetime DEFAULT NULL,
  `timeToComplete` int(11) unsigned DEFAULT NULL,
  `statusID` int(11) NOT NULL,
  `active` bit(1) NOT NULL,
  `createdDate` datetime NOT NULL,
  `modifiedDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `taskId` (`taskId`),
  KEY `organisationId` (`organisationId`),
  KEY `userId` (`userId`),
  CONSTRAINT `taskschedule_ibfk_1` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`),
  CONSTRAINT `taskschedule_ibfk_2` FOREIGN KEY (`organisationId`) REFERENCES `organisation` (`id`),
  CONSTRAINT `taskschedule_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user
# ------------------------------------------------------------

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `organisationId` int(11) unsigned NOT NULL,
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` char(60) NOT NULL DEFAULT '',
  `firstName` varchar(255) NOT NULL DEFAULT '',
  `lastName` varchar(255) NOT NULL DEFAULT '',
  `active` bit(1) NOT NULL,
  `createdDate` datetime NOT NULL,
  `modifiedDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `organisationId` (`organisationId`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`organisationId`) REFERENCES `organisation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_permission
# ------------------------------------------------------------

CREATE TABLE `user_permission` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) unsigned DEFAULT NULL,
  `userGroupId` int(11) unsigned DEFAULT NULL,
  `targetUserId` int(11) unsigned DEFAULT NULL,
  `targetUserGroupId` int(11) unsigned DEFAULT NULL,
  `childEntity` int(11) unsigned DEFAULT NULL,
  `readPermission` bit(1) DEFAULT NULL,
  `writePermission` bit(1) DEFAULT NULL,
  `executePermission` bit(1) DEFAULT NULL,
  `modifiedDate` date NOT NULL,
  `createdDate` date NOT NULL,
  `active` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `userGroupId` (`userGroupId`),
  KEY `targetUserId` (`targetUserId`),
  KEY `targetUserGroupId` (`targetUserGroupId`),
  CONSTRAINT `user_permission_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `user_permission_ibfk_2` FOREIGN KEY (`userGroupId`) REFERENCES `userGroup` (`id`),
  CONSTRAINT `user_permission_ibfk_3` FOREIGN KEY (`targetUserId`) REFERENCES `user` (`id`),
  CONSTRAINT `user_permission_ibfk_4` FOREIGN KEY (`targetUserGroupId`) REFERENCES `userGroup` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_userGroup
# ------------------------------------------------------------

CREATE TABLE `user_userGroup` (
  `userId` int(11) unsigned NOT NULL,
  `userGroupId` int(11) unsigned NOT NULL,
  PRIMARY KEY (`userId`,`userGroupId`),
  KEY `userGroupId` (`userGroupId`),
  CONSTRAINT `user_usergroup_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `user_usergroup_ibfk_2` FOREIGN KEY (`userGroupId`) REFERENCES `userGroup` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table userGroup
# ------------------------------------------------------------

CREATE TABLE `userGroup` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `organisationId` int(11) unsigned NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `notes` varchar(255) DEFAULT NULL,
  `active` bit(1) NOT NULL,
  `createdDate` datetime NOT NULL,
  `modifiedDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `organisationId` (`organisationId`),
  CONSTRAINT `usergroup_ibfk_1` FOREIGN KEY (`organisationId`) REFERENCES `organisation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table userGroup_permission
# ------------------------------------------------------------

CREATE TABLE `userGroup_permission` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) unsigned DEFAULT NULL,
  `userGroupId` int(11) unsigned DEFAULT NULL,
  `targetUserGroupId` int(11) unsigned DEFAULT NULL,
  `read` bit(1) DEFAULT NULL,
  `write` bit(1) DEFAULT NULL,
  `modifedDate` date NOT NULL,
  `createdDate` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `userGroupId` (`userGroupId`),
  KEY `targetUserGroupId` (`targetUserGroupId`),
  CONSTRAINT `usergroup_permission_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `usergroup_permission_ibfk_2` FOREIGN KEY (`userGroupId`) REFERENCES `userGroup` (`id`),
  CONSTRAINT `usergroup_permission_ibfk_3` FOREIGN KEY (`targetUserGroupId`) REFERENCES `taskGroup` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
