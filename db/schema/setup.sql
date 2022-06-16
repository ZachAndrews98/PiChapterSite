-- SETUP TABLES

CREATE TABLE IF NOT EXISTS `piChapter`.`brothers` (
  `brother_id` INT NOT NULL AUTO_INCREMENT,
  `last_name` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `grad_year` VARCHAR(45) NOT NULL,
  `major` VARCHAR(45) NOT NULL,
  `minor` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45),
  `phone` VARCHAR(45),
  `role_id` INT NULL,
  PRIMARY KEY (`brother_id`));

-- USE SETUP_EXECUTIVES STORED PROCEDURE INSTEAD
-- CREATE TABLE IF NOT EXISTS `piChapter`.`executives` (
--   `executive_id` INT NOT NULL AUTO_INCREMENT,
--   `role_name` VARCHAR(45) NOT NULL,
--   `brother_id` VARCHAR(45) NOT NULL,
--   PRIMARY KEY (`executive_id`));

-- USE SETUP_ROLES STORED PROCEDURE INSTEAD
-- CREATE TABLE IF NOT EXISTS `piChapter`.`roles` (
--   `role_id` int NOT NULL AUTO_INCREMENT,
--   `role_name` varchar(45) NOT NULL,
--   `role_rank` varchar(45) DEFAULT NULL,
--   PRIMARY KEY (`role_id`));


-- STORED PROCEDURES

-- INSERT BROTHER
DROP procedure IF EXISTS `insert_brother`;

DELIMITER $$
USE `piChapter`$$
CREATE DEFINER=`zach`@`%` PROCEDURE `insert_brother` (
	in_last_name VARCHAR(45),
	in_first_name VARCHAR(45),
	in_grad_year VARCHAR(45),
	in_major VARCHAR(45),
	in_minor VARCHAR(45),
	in_email VARCHAR(45),
	in_phone VARCHAR(45),
    in_role_id INT
)
BEGIN
IF (SELECT brother_id FROM `piChapter`.`brothers` WHERE last_name = in_last_name AND first_name = in_first_name AND email = in_email) IS NOT NULL
THEN
	SIGNAL SQLSTATE '45000' SET 
	MESSAGE_TEXT = 'Brother already exist';
ELSE
	INSERT INTO `piChapter`.`brothers` (
		last_name,
		first_name,
		grad_year,
		major,
		minor,
		email,
		phone,
		role_id
	) VALUES (
		in_last_name,
		in_first_name,
		in_grad_year,
		in_major,
		in_minor,
		in_email,
		in_phone,
		IF(in_role_id IS NOT NULL, in_role_id, 1)
	);
END IF;
END$$

DELIMITER ;

-- GET ALL BROTHERS WITH FILTERS
DROP procedure IF EXISTS `get_brothers`;

DELIMITER $$
USE `piChapter`$$
CREATE DEFINER=`zach`@`%` PROCEDURE `get_brothers` (
	in_last_name VARCHAR(45),
	in_first_name VARCHAR(45),
	in_grad_year VARCHAR(45),
	in_major VARCHAR(45),
	in_minor VARCHAR(45),
	in_email VARCHAR(45),
	in_phone VARCHAR(45),
    in_role_id INT
)
BEGIN
	SELECT
        b.brother_id,
        b.last_name,
        b.first_name,
        b.grad_year,
        b.major,
        b.minor,
        b.email,
        b.phone,
        r.role_name as chapter_role,
        r.role_rank as chapter_rank,
        e.role_name as executive_role
    FROM
        brothers b
    LEFT JOIN roles r
        ON b.role_id = r.role_id
    LEFT JOIN executives e
        ON b.brother_id = e.brother_id
	WHERE
		IFNULL(b.last_name LIKE CONCAT("%",in_last_name,"%"), true) AND
        IFNULL(b.first_name LIKE CONCAT("%",in_first_name,"%"), true) AND
        IFNULL(b.grad_year = in_grad_year, true) AND
        IFNULL(b.major = in_major, true) AND
        IFNULL(b.minor = in_minor, true) AND
        IFNULL(b.email = in_email, true) AND
        IFNULL(b.phone = in_phone, true) AND
        IFNULL(b.role_id = in_role_id, true);
END$$

DELIMITER ;

-- UPDATE BROTHER
DROP procedure IF EXISTS `update_brother`;

DELIMITER $$
USE `piChapter`$$
CREATE DEFINER=`zach`@`%` PROCEDURE `update_brother` (
	in_brother_id INT,
	in_last_name VARCHAR(45),
	in_first_name VARCHAR(45),
	in_grad_year VARCHAR(45),
	in_major VARCHAR(45),
	in_minor VARCHAR(45),
	in_email VARCHAR(45),
	in_phone VARCHAR(45),
    in_role_id INT
)
BEGIN
IF (SELECT brother_id FROM `piChapter`.`brothers` WHERE brother_id = in_brother_id) IS NULL
THEN
	SIGNAL SQLSTATE '45000' SET 
	MESSAGE_TEXT = 'Brother not found';
ELSE
	UPDATE `piChapter`.`brothers`
	SET
		last_name = IF (in_last_name IS NOT NULL, in_last_name, last_name),
		first_name = IF (in_first_name IS NOT NULL, in_first_name, first_name),
		grad_year = IF (in_grad_year IS NOT NULL, in_grad_year, grad_year),
		major = IF (in_major IS NOT NULL, in_major, major),
		minor = IF (in_minor IS NOT NULL, in_minor, minor),
		email = IF (in_email IS NOT NULL, in_email, email),
		phone = IF (in_phone IS NOT NULL, in_phone, phone),
		role_id = IF (in_role_id IS NOT NULL, in_role_id, role_id)
	WHERE
		brother_id = in_brother_id;
END IF;
END$$

DELIMITER ;


-- GET BROTHER BY ID

DROP procedure IF EXISTS `get_brother`;

DELIMITER $$
USE `piChapter`$$
CREATE DEFINER=`zach`@`%` PROCEDURE `get_brother` (
	in_brother_id INT
)
BEGIN
	IF (SELECT brother_id FROM brothers WHERE brother_id = in_brother_id) IS NOT NULL
    THEN
		SELECT
			b.brother_id,
			b.last_name,
			b.first_name,
			b.grad_year,
			b.major,
			b.minor,
			b.email,
			b.phone,
			r.role_name as chapter_role,
			r.role_rank as chapter_rank,
            e.role_name as executive_role
		FROM
			brothers b
		LEFT JOIN roles r
			ON b.role_id = r.role_id
		LEFT JOIN executives e
			ON b.brother_id = e.brother_id
		WHERE
			b.brother_id = in_brother_id;
	ELSE
		SIGNAL SQLSTATE '45000' SET
        MESSAGE_TEXT = 'Brother not found.';
    END IF;
END$$

DELIMITER ;


-- DELETE BROTHER

DROP procedure IF EXISTS `delete_brother`;

DELIMITER $$
USE `piChapter`$$
CREATE DEFINER=`zach`@`%` PROCEDURE `delete_brother` (
	in_brother_id INT
)
BEGIN
	IF (SELECT brother_id FROM brothers WHERE brother_id = in_brother_id) IS NOT NULL
    THEN
		DELETE FROM brothers
        WHERE
			brother_id = in_brother_id;
    ELSE
		SIGNAL SQLSTATE '45000' SET
        MESSAGE_TEXT = 'Brother not found.';
    END IF;
END$$

DELIMITER ;


-- GET ONLY UNDERGRADUATES

DROP procedure IF EXISTS `piChapter`.`get_undergraduates`;
;

DELIMITER $$
USE `piChapter`$$
CREATE DEFINER=`zach`@`%` PROCEDURE `get_undergraduates`(
	in_last_name VARCHAR(45),
	in_first_name VARCHAR(45),
	in_grad_year VARCHAR(45),
	in_major VARCHAR(45),
	in_minor VARCHAR(45),
	in_email VARCHAR(45),
	in_phone VARCHAR(45),
    in_role_id INT
)
BEGIN
	SELECT
        b.brother_id,
        b.last_name,
        b.first_name,
        b.grad_year,
        b.major,
        b.minor,
        b.email,
        b.phone,
        r.role_name as chapter_role,
        r.role_rank as chapter_rank,
        e.role_name as executive_role
    FROM
        brothers b
    LEFT JOIN roles r
        ON b.role_id = r.role_id
    LEFT JOIN executives e
        ON b.brother_id = e.brother_id
	WHERE
		IFNULL(b.last_name LIKE CONCAT("%",in_last_name,"%"), true) AND
        IFNULL(b.first_name LIKE CONCAT("%",in_first_name,"%"), true) AND
        IFNULL(b.grad_year = in_grad_year, true) AND
        IFNULL(b.major = in_major, true) AND
        IFNULL(b.minor = in_minor, true) AND
        IFNULL(b.email = in_email, true) AND
        IFNULL(b.phone = in_phone, true) AND
        IFNULL(b.role_id = in_role_id, true) AND
        b.role_id != 3;
END$$

DELIMITER ;




-- SETUP EXECUTIVES

DROP procedure IF EXISTS `setup_executives`;

DELIMITER $$
USE `piChapter`$$
CREATE DEFINER=`zach`@`%` PROCEDURE `setup_executives`()
BEGIN
	IF (SELECT TABLE_SCHEMA FROM information_schema.tables WHERE table_schema = 'piChapter' AND table_name = 'executives') IS NULL
    THEN
		CREATE TABLE IF NOT EXISTS `piChapter`.`executives` (
			`executive_id` INT NOT NULL AUTO_INCREMENT,
			`role_name` VARCHAR(45) NOT NULL,
			`brother_id` VARCHAR(45),
		PRIMARY KEY (`executive_id`));
		INSERT INTO `piChapter`.`executives` (
			role_name
		) VALUES 
		("President"),("Treasurer"),("Recording Secretary"),("Corresponding Secretary"),("Historian");
	END IF;
END$$

DELIMITER ;

-- Execute above stored procedure to setup table
CALL `piChapter`.`setup_executives`();

-- GET EXECUTIVES

DROP procedure IF EXISTS `get_executives`;

DELIMITER $$
USE `piChapter`$$
CREATE DEFINER=`zach`@`%` PROCEDURE `get_executives` ()
BEGIN
	SELECT
		e.role_name,
        b.brother_id,
		b.last_name,
		b.first_name,
		b.grad_year,
		b.major,
		b.minor,
		b.email,
		b.phone
	FROM
		executives e
	LEFT JOIN brothers b
		ON e.brother_id = b.brother_id;
END$$

DELIMITER ;


-- GET EXECUTIVE

DROP procedure IF EXISTS `get_executive`;

DELIMITER $$
USE `piChapter`$$
CREATE DEFINER=`zach`@`%` PROCEDURE `get_executive` (
	in_exec_name VARCHAR(45)
)
BEGIN
	SELECT
		e.role_name,
        b.brother_id,
		b.last_name,
		b.first_name,
		b.grad_year,
		b.major,
		b.minor,
		b.email,
		b.phone
	FROM
		executives e
	LEFT JOIN brothers b
		ON e.brother_id = b.brother_id
	WHERE
		LOWER(e.role_name) = LOWER(in_exec_name);
END$$

DELIMITER ;


-- UPDATE EXECUTIVE

DROP procedure IF EXISTS `update_executive`;

DELIMITER $$
USE `piChapter`$$
CREATE DEFINER=`zach`@`%` PROCEDURE `update_executive` (
	in_exec_name VARCHAR(45),
    in_brother_id INT
)
BEGIN
	IF (SELECT brother_id FROM brothers WHERE brother_id = in_brother_id) IS NOT NULL
    THEN
		UPDATE executives
		SET
			brother_id = in_brother_id
		WHERE
			LOWER(role_name) = LOWER(in_exec_name);
	ELSE
		SIGNAL SQLSTATE '45000' SET
        MESSAGE_TEXT = 'Brother not found.';
    END IF;
END$$

DELIMITER ;


-- SETUP ROLES
DROP procedure IF EXISTS `setup_roles`;

DELIMITER $$
USE `piChapter`$$
CREATE DEFINER=`zach`@`%` PROCEDURE `setup_roles`()
BEGIN
	IF (SELECT TABLE_SCHEMA FROM information_schema.tables WHERE table_schema = 'piChapter' AND table_name = 'roles') IS NULL
    THEN
		CREATE TABLE IF NOT EXISTS `piChapter`.`roles` (
        `role_id` int NOT NULL AUTO_INCREMENT,
        `role_name` varchar(45) NOT NULL,
        `role_rank` varchar(45) DEFAULT NULL,
        PRIMARY KEY (`role_id`));
		INSERT INTO `piChapter`.`roles` (
			role_name
		) VALUES 
		("Pledge"),("Brother"),("Graduate");
	END IF;
END$$

DELIMITER ;

-- Execute above stored procedure to setup table
CALL `piChapter`.`setup_roles`();


-- INSERT ROLE

DROP procedure IF EXISTS `insert_role`;

DELIMITER $$
USE `piChapter`$$
CREATE DEFINER=`zach`@`%` PROCEDURE `insert_role` (
	in_role_name VARCHAR(45),
    in_role_rank VARCHAR(45)
)
BEGIN
	IF (SELECT role_id FROM roles WHERE role_name = in_role_name AND role_rank = in_role_rank) IS NULL
    THEN
		INSERT INTO `piChapter`.`roles` (
			role_name,
            role_rank
		) VALUES (
			in_role_name,
            in_role_rank
		);
    ELSE
		SIGNAL SQLSTATE '45000' SET 
		MESSAGE_TEXT = 'Role already exists';
    END IF;
END$$

DELIMITER ;

-- GET ROLES

DROP procedure IF EXISTS `get_roles`;

DELIMITER $$
USE `piChapter`$$
CREATE DEFINER=`zach`@`%` PROCEDURE `get_roles` (
	in_role_name VARCHAR(45)
)
BEGIN
	SELECT
		role_id,
        role_name,
        role_rank
	FROM
		roles
	WHERE
		role_name LIKE IF(in_role_name IS NOT NULL, CONCAT("%",in_role_name,"%"), TRUE);
END$$

DELIMITER ;


-- GET ROLE BY ID

DROP procedure IF EXISTS `get_role`;

DELIMITER $$
USE `piChapter`$$
CREATE DEFINER=`zach`@`%` PROCEDURE `get_role` (
	in_role_id INT
)
BEGIN
	IF (SELECT role_id FROM roles WHERE role_id = in_role_id) IS NOT NULL
    THEN
		SELECT
			role_id,
			role_name,
			role_rank
		FROM
			roles
		WHERE
			role_id = in_role_id;
	ELSE
		SIGNAL SQLSTATE '45000' SET 
		MESSAGE_TEXT = 'Role not found';
    END IF;
END$$

DELIMITER ;


-- UPDATE ROLE


DROP procedure IF EXISTS `update_role`;

DELIMITER $$
USE `piChapter`$$
CREATE DEFINER=`zach`@`%` PROCEDURE `update_role` (
	in_role_id INT,
	in_role_name VARCHAR(45),
    in_role_rank VARCHAR(45)
)
BEGIN
	IF (SELECT role_id FROM roles WHERE role_id = in_role_id) IS NOT NULL
    THEN
		UPDATE roles
        SET
			role_name = IF(in_role_name IS NOT NULL, in_role_name, role_name),
            role_rank = IF(in_role_rank IS NOT NULL, in_role_rank, role_rank)
		WHERE
			role_id = in_role_id;
	ELSE
		SIGNAL SQLSTATE '45000' SET 
		MESSAGE_TEXT = 'Role not found';
    END IF;
END$$

DELIMITER ;


-- DELETE ROLE

DROP procedure IF EXISTS `delete_role`;

DELIMITER $$
USE `piChapter`$$
CREATE DEFINER=`zach`@`%` PROCEDURE `delete_role` (
	in_role_id INT
)
BEGIN
	IF (SELECT role_id FROM roles WHERE role_id = in_role_id) IS NOT NULL
    THEN
		DELETE FROM roles
        WHERE
			role_id = in_role_id;
    ELSE
		SIGNAL SQLSTATE '45000' SET
        MESSAGE_TEXT = 'Role not found.';
    END IF;
END$$

DELIMITER ;


DROP procedure IF EXISTS `setup_brothers`;

DELIMITER $$
USE `piChapter`$$
CREATE DEFINER=`zach`@`%` PROCEDURE `setup_brothers` ()
BEGIN
	INSERT INTO brothers (
		last_name,first_name,grad_year,major,minor,email,phone,role_id
	) VALUES 
	("Andrews","Zachary","2020","Computer Science","Economics","zachandr98@gmail.com","5187950065",3),
	("Bobeck","Jared","2020","Neuroscience","History","bobeckj@allegheny.edu","0000000000",3),
	("Hornberger","Cayton","2020","Physics","Energy & Society","hornbergerc@allegheny.edu","0000000000",3),
	("Cerda Meija","Jerfenson","2020","Computer Science","Economics","meijaj@allegheny.edu","0000000000",3),
	("Spitalny","Devin","2020","Computer Science","Economics","spitalnyd@allegheny.edu","0000000000",3),
	("Zoll","Zachary","2020","Physics","History","zollz@allegheny.edu","0000000000",3),
	("Bauer","Matthew","2020","Economics","Global Health & Political Science","bauerm@allegheny.edu","0000000000",3),
	("Kirn","Andrew","2020","Economics","English","kirna@allegheny.edu","0000000000",3),
	("Moon","Caleb","2022","Neuroscience & Psychology","N/A","moons@allegheny.edu","0000000000",2),
	("Drozd","Jakob","2021","Environmental Science","Music Performance","drozdj@allegheny.edu","0000000000",3),
	("Quigley","Colin","2021","Neuroscience","Dance and Movement Studies","quigleyc2@allegheny.edu","0000000000",3),
	("Sutherland","William","2021","History","Energy and Society","sutherlandw@allegheny.edu","0000000000",3),
	("Boshaw","Max","2022","Physics","Energy and Society","boshawm@allegheny.edu","0000000000",2),
	("Bruner","Nathan","2022","Psycology","Spanish","brunern@allegheny.edu","0000000000",2),
	("Koscinski","Caden","2022","Computer Science","Economics","koscinskic@allegheny.edu","0000000000",2),
	("Long","Wesley","2022","Computer Science","Art, Science, and Technology","longw@allegheny.edu","0000000000",2),
	("Ullrich","Danny","2022","Computer Science","Economics","ullrichd@allegheny.edu","0000000000",2),
	("Wolf","Marcus","2022","Business","Undecided","wolfm@allegheny.edu","0000000000",2),
	("Yarborough","Aj","2022","Business","Philosophy & Psychology","yarborougha@allegheny.edu","0000000000",2),
	("Chavez","Jose","2022","Business","Undecided","chavezj@allegheny.edu","0000000000",2),
	("Ecker","Zachary","2022","Biology","Undecided","eckerz@allegheny.edu","0000000000",2),
	("Mastalerz","Conner","2022","Economics & Environment Science","N/A","mastalerzc@allegheny.edu","0000000000",2),
	("Salazar","David","2022","Biology","Political Science","salazard@allegheny.edu","0000000000",2),
	("Caylor","Alton","2022","Environmental Science","Undecided","caylora@allegheny.edu","0000000000",2),
	("Sesler","Ryan","2023","Biology","Music Performance","seslerr@allegheny.edu","0000000000",2),
	("Stephenson","Luke","2023","Physics","Philosophy","stephensonl@allegheny.edu","7162242884",2);
END$$

DELIMITER ;

CALL `piChapter`.`setup_brothers`();