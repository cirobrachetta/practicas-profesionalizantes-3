CREATE SCHEMA IF NOT EXISTS `actividad-3` DEFAULT CHARACTER SET utf8 ;
USE `actividad-3` ;

-- -----------------------------------------------------
-- Tables `actividad-3`.`country, city`, `country_city`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `actividad-3`.`user` (
  `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL UNIQUE,
  `password` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `actividad-3`.`group` (
  `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL UNIQUE,
  `description` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `actividad-3`.`action` (
  `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL UNIQUE,
  `description` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `actividad-3`.`web_api` (
  `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
  `id_action` INT UNSIGNED NOT NULL,
  `url` VARCHAR(256) NOT NULL UNIQUE,
  `http_method` VARCHAR(45) NOT NULL,
  FOREIGN KEY (`id_action`) REFERENCES `action` (`id`),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `actividad-3`. `user_groups`(
  `id_user` INT UNSIGNED NOT NULL,
  `id_group` INT UNSIGNED NOT NULL,
  FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  FOREIGN KEY (`id_group`) REFERENCES `group` (`id`),
  PRIMARY KEY (`id_user`, `id_group`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `actividad-3`. `group_permissions`(
  `id_group` INT UNSIGNED NOT NULL,
  `id_action` INT UNSIGNED NOT NULL,
  FOREIGN KEY (`id_group`) REFERENCES `group` (`id`),
  FOREIGN KEY (`id_action`) REFERENCES `action` (`id`),
  PRIMARY KEY (`id_group`, `id_action`))
ENGINE = InnoDB;