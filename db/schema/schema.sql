use brothers;

DROP TABLE IF EXISTS brothers;

create table brothers (
	last_name varchar(20),
	first_name varchar(20),
  year int,
	major varchar(36),
	minor varchar(36),
	email varchar(36),
	phone varchar(10)
);

LOAD DATA INFILE '/var/lib/mysql-files/brothers.txt' INTO TABLE brothers;

DROP TABLE IF EXISTS grads;

create table grads (
	last_name varchar(20),
	first_name varchar(20),
  year int,
	major varchar(36),
	minor varchar(36),
	email varchar(36),
	phone varchar(10)
);

DROP TABLE IF EXISTS users;

create table users (
	username varchar(20),
	password varchar(30),
	email varchar(30),
	permission varchar(5)
);
