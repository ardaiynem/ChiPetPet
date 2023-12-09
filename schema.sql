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
    address VARCHAR(255),
    contact VARCHAR(200),
    verification_documents BLOB,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE field_expert (
   	user_id INT PRIMARY KEY,
    speciality VARCHAR(100),
    verification_documents BLOB,
    FOREIGN KEY (user_id) REFERENCES user(user_id) 
);

CREATE TABLE admin (
    user_id INT PRIMARY KEY,
    verification_documents BLOB,
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
    photo BLOB,
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

-- CREATE TABLE comment (
--     post_id INT,
--     comment_id INT AUTO_INCREMENT,
--     date DATE,
--     content TEXT,
--     PRIMARY KEY (post_id, comment_id),
--     FOREIGN KEY (post_id) REFERENCES blog_post(post_id) 
-- );

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
    address VARCHAR(255),
    contact VARCHAR(200),
    verification_documents BLOB,
	expertise VARCHAR(200),
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
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (veterinarian_id) REFERENCES user(user_id) 
);

CREATE TABLE message (
    date_and_time DATETIME,
    content TEXT,
    sender_id INT,
    receiver_id INT,
    FOREIGN KEY (sender_id) REFERENCES user(user_id),
    FOREIGN KEY (receiver_id) REFERENCES user(user_id) 
);

INSERT INTO user (first_name, last_name, username, email, password, verified, role) 
VALUES ('John', 'Doe', 'johndoe', 'john@email.com', 'password', 'yes', 'animal_shelter');

INSERT INTO user (first_name, last_name, username, email, password, verified, role) 
VALUES ('Jane', 'Doe', 'janedoe', 'jane@email.com', 'password', 'yes', 'adopter');

INSERT INTO user (first_name, last_name, username, email, password, verified, role)
VALUES ('John', 'Smith', 'johnsmith', 'johnsmith@email.com', 'password', 'yes', 'veterinarian');

INSERT INTO message  
VALUES ("1999-09-29", "Hello", 1, 2);

INSERT INTO message  
VALUES ("2009-09-29 22:36:19", "Hello", 1, 2);

INSERT INTO message  
VALUES ("2001-11-11 11:11:11", "Trying", 1, 2);

INSERT INTO animal_shelter (user_id, address, contact, verification_documents)
VALUES (1, '123 Shelter St', '123-456-7890', NULL);

INSERT INTO adopter (user_id) 
VALUES (2);

INSERT INTO veterinarian (user_id, address, contact, verification_documents, expertise)
VALUES (3, '123 Vet St', '123-456-7890', NULL, 'Dogs');

INSERT INTO pet (shelter_id, name, species, breed, gender, age, health_status, description, photo, adoption_status)
VALUES (1, 'Buddy', 'Dog', 'Labrador Retriever', 'Male', 2, 'Good', 'Friendly and playful dog', NULL, 'Available');

INSERT INTO applies (application_status, application_text, adopter_id, animal_shelter_id, pet_id)
VALUES ('Pending', 'I would like to adopt Buddy.', 2, 1, 1);

INSERT INTO appointment (date_and_time, location, appointment_text, user_id, veterinarian_id)
VALUES ('2020-11-11 11:11:11', '123 Vet St', 'Checkup', 2, 3);

INSERT INTO notification (user_id, date_and_time, topic, description)
VALUES (2, '2023-01-01 10:00:00', 'Application Status', 'Your adoption application is pending review.');

INSERT INTO notification (user_id, date_and_time, topic, description)
VALUES (3, '2023-01-02 12:00:00', 'Appointment Scheduled', 'You have a scheduled appointment for a health check.');









