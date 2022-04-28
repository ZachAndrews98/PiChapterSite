use piChapter;

CREATE TABLE `piChapter`.`brothers` (
  `brother_id` INT NOT NULL AUTO_INCREMENT,
  `last_name` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `grad_year` VARCHAR(45) NOT NULL,
  `major` VARCHAR(45) NOT NULL,
  `minor` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `role_id` INT NULL,
  PRIMARY KEY (`brother_id`));


LOAD DATA INFILE '/var/lib/mysql-files/full_list.csv'
INTO TABLE brothers
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- DROP TABLE IF EXISTS graduates;
--
-- create table graduates (
-- 	id int AUTO_INCREMENT PRIMARY KEY,
-- 	last_name varchar(20),
-- 	first_name varchar(20),
--   year int,
-- 	major varchar(36),
-- 	minor varchar(36),
-- 	email varchar(36),
-- 	phone varchar(10),
-- 	password varchar(255),
-- 	role varchar(15)
-- );
--
-- LOAD DATA INFILE '/var/lib/mysql-files/graduates.csv'
-- INTO TABLE graduates
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- create table events (
-- 	id int AUTO_INCREMENT PRIMARY KEY,
-- 	title varchar(20),
-- 	event_date date,
-- 	event_time time
-- );
