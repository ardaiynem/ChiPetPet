CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(55),
    last_name VARCHAR(55),
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    verified VARCHAR(50),
    role VARCHAR(50) 
);

CREATE TABLE animal_shelter (
    user_id INT PRIMARY KEY,
    address VARCHAR(255) DEFAULT '',
    contact VARCHAR(200) DEFAULT '',
    verification_documents MEDIUMBLOB,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE field_expert (
   	user_id INT PRIMARY KEY,
    speciality VARCHAR(100) DEFAULT '',
    verification_documents MEDIUMBLOB,
    FOREIGN KEY (user_id) REFERENCES user(user_id) 
);

CREATE TABLE admin (
    user_id INT PRIMARY KEY,
    verification_documents MEDIUMBLOB,
    FOREIGN KEY (user_id) REFERENCES user(user_id) 
);


CREATE TABLE pet (
    pet_id INT PRIMARY KEY AUTO_INCREMENT,
    shelter_id INT,
    name VARCHAR(50),
    species VARCHAR(50),
    breed VARCHAR(50),
    gender VARCHAR(10),
    age INT,
    health_status VARCHAR(50),
    description TEXT,
    photo MEDIUMBLOB,
    adoption_status VARCHAR(20),
    FOREIGN KEY (shelter_id) REFERENCES animal_shelter(user_id) 
);

CREATE TABLE health_record (
    pet_id INT  ,
    date DATE,
    fertility VARCHAR(20),
    health_report TEXT,
    FOREIGN KEY (pet_id) REFERENCES pet(pet_id) 
);

CREATE TABLE blog_post (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    date_and_time DATETIME,
    topic VARCHAR(100),
    content TEXT,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE comment (
    post_id INT,
    comment_id INT,
    user_id INT,
    date_and_time DATETIME,
    content TEXT,
    PRIMARY KEY (post_id, comment_id),
    FOREIGN KEY (post_id) REFERENCES blog_post(post_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id));

CREATE TABLE adopter (
    user_id INT PRIMARY KEY,
    FOREIGN KEY (user_id) REFERENCES user(user_id) 
);

CREATE TABLE owns (
	pet_id INT,
	adopter_id INT,
	PRIMARY KEY (pet_id),
	FOREIGN KEY (pet_id) REFERENCES pet(pet_id),
	FOREIGN KEY (adopter_id) REFERENCES adopter(user_id) 
);

CREATE TABLE veterinarian (
    user_id INT PRIMARY KEY,
    address VARCHAR(255) DEFAULT '',
    contact VARCHAR(200) DEFAULT '',
    verification_documents MEDIUMBLOB,
	expertise VARCHAR(200) DEFAULT '',
    FOREIGN KEY (user_id) REFERENCES user(user_id) 
);

CREATE TABLE notification (
    user_id INT,
    date_and_time DATETIME,
    topic VARCHAR(255),
    description TEXT,
	PRIMARY KEY (user_id, date_and_time),
    FOREIGN KEY (user_id) REFERENCES user(user_id) 
);

CREATE TABLE applies(
    application_id INT PRIMARY KEY AUTO_INCREMENT,
    application_status VARCHAR(255),
    application_text VARCHAR(255),
    adopter_id INT,
    animal_shelter_id INT,
    pet_id INT,
    FOREIGN KEY (adopter_id) REFERENCES adopter(user_id),
    FOREIGN KEY (animal_shelter_id) REFERENCES user(user_id),
    FOREIGN KEY (pet_id) REFERENCES pet(pet_id)
);

    CREATE TABLE appointment (
        appointment_id INT PRIMARY KEY AUTO_INCREMENT,
        date_and_time DATETIME,
        location VARCHAR(255),
        appointment_text VARCHAR(255),
        user_id INT,
        veterinarian_id INT,
        pet_id INT,
        FOREIGN KEY (user_id) REFERENCES user(user_id),
        FOREIGN KEY (veterinarian_id) REFERENCES user(user_id),
        FOREIGN KEY (pet_id) REFERENCES pet(pet_id)
    );

CREATE TABLE message (
    date_and_time DATETIME,
    content TEXT,
    sender_id INT,
    receiver_id INT,
    FOREIGN KEY (sender_id) REFERENCES user(user_id),
    FOREIGN KEY (receiver_id) REFERENCES user(user_id) 
);

CREATE VIEW veterinarian_info AS 
SELECT user_id, first_name, last_name, username, email, verified, role, address, contact, expertise
           FROM user NATURAL JOIN veterinarian;

CREATE VIEW animal_shelter_info AS 
SELECT user_id, first_name, last_name, username, email, verified, role, address, contact
                    FROM user NATURAL JOIN animal_shelter;


CREATE VIEW pet_search_info AS 
SELECT * 
FROM pet 
WHERE adoption_status != 'ADOPTED';


DELIMITER //
CREATE TRIGGER pet_delete_trigger
BEFORE DELETE ON pet
FOR EACH ROW
BEGIN
    DELETE FROM applies WHERE applies.pet_id = OLD.pet_id;
    DELETE FROM appointment WHERE appointment.pet_id = OLD.pet_id;
    DELETE FROM owns WHERE owns.pet_id = OLD.pet_id;
    DELETE FROM health_record WHERE health_record.pet_id = OLD.pet_id;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER after_update_pet
AFTER UPDATE
ON pet FOR EACH ROW

BEGIN
    IF NEW.adoption_status = 'ADOPTED' AND OLD.adoption_status != 'ADOPTED' THEN
        UPDATE applies
        SET application_status = 'REJECTED'
        WHERE pet_id = NEW.pet_id AND application_status != 'ACCEPTED';
    END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER application_response_notification_trigger
BEFORE UPDATE ON applies
FOR EACH ROW
BEGIN
    INSERT INTO notification (user_id, date_and_time, topic, description)
VALUES (OLD.adopter_id, NOW(), 'Application Status', 'Your adoption application has an update');
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER blog_comment_trigger
BEFORE INSERT ON comment
FOR EACH ROW
BEGIN
    INSERT INTO notification (user_id, date_and_time, topic, description)
VALUES ((SELECT user_id FROM blog_post WHERE post_id = NEW.post_id), NOW(), 'Your blogpost', 'Your blogpost has a new comment');
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER appointment_reschedule_trigger
BEFORE UPDATE ON appointment 
FOR EACH ROW
BEGIN
    INSERT INTO notification (user_id, date_and_time, topic, description)
    VALUES (NEW.user_id, NOW(), 'Appointment Rescheduled', 'Your appointment has been rescheduled.');
END;
//
DELIMITER ;



INSERT INTO user (first_name, last_name, username, email, password, verified, role)
VALUES ('a', 'a', 'a', 'a@email.com', 'pbkdf2_sha256$260000$A7zHVyUC5F6duUTGeD4IT5$ROaskyhQVBHZt91eUQWKm8oMCd0pGxhX3qeKTVyZb10=', 'True', 'admin');


INSERT INTO admin (user_id, verification_documents)
VALUES (8, NULL);
