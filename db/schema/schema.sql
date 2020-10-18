use brothers;

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


LOAD DATA INFILE '/var/lib/mysql-files/brothers.txt' INTO TABLE brothers;

DROP TABLE IF EXISTS graduates;

create table graduates (
	id int AUTO_INCREMENT PRIMARY KEY,
	last_name varchar(20),
	first_name varchar(20),
  year int,
	major varchar(36),
	minor varchar(36),
	email varchar(36),
	phone varchar(10),
	password varchar(255)
);

LOAD DATA INFILE '/var/lib/mysql-files/graduates.txt' INTO TABLE graduates;

create table events (
	id int AUTO_INCREMENT PRIMARY KEY,
	title varchar(20),
	event_date date,
	event_time time
)
