CREATE TABLE IF NOT EXISTS `piChapter`.`brothers` (
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

CREATE TABLE IF NOT EXISTS `piChapter`.`executives` (
  `executive_id` INT NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(45) NOT NULL,
  `brother_id` VARCHAR(45),
  PRIMARY KEY (`executive_id`));
  
CREATE TABLE IF NOT EXISTS `piChapter`.`roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) NOT NULL,
  `role_rank` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`role_id`));

INSERT INTO `piChapter`.`executives` (
	role_name,
    brother_id
) VALUES (
	"Historian",
    1
);

INSERT INTO `piChapter`.`brothers` (
	last_name,
	first_name,
	grad_year,
	major,
	minor,
	email,
	phone
) VALUES (
	"Andrews",
    "Zachary",
    "2020",
    "Computer Science",
    "Economics",
    "zachandr98@gmail.com",
    "5187950065"
);

INSERT INTO `piChapter`.`roles` (
	role_name
) VALUES (
	"Graduate"
);