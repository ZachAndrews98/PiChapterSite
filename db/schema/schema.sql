use piChapter;

DROP TABLE IF EXISTS brothers;

create table brothers (
	id int AUTO_INCREMENT PRIMARY KEY,
	last_name varchar(20),
	first_name varchar(20),
  year int,
	major varchar(36),
	minor varchar(36),
	email varchar(36),
	phone varchar(10),
	password varchar(255),
	role varchar(15)
);


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
