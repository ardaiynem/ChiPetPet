# ChiPetPet

ChiPetPet is a platform designed to enhance the pet adoption process while providing a versatile environment for pet owners, shelters, veterinarians, and experts. The main goal of this project is to provide a robust tool for animal shelters to reach potential pet adopters.

Through ChiPetPet's user-friendly interface, individuals can search for their ideal pets using various criteria and easily submit adoption applications to the shelters. Beyond facilitating adoptions, our platform serves as a resource for pet care information, enabling users to seek help through the comprehensive guides in the systems and community through the blog posts and messaging systems.

One of the critical features of ChiPetPet is an easy-to-use communication system that enhances interactions between pet owners and veterinarians. This system provides pet owners a medium to effortlessly schedule veterinary appointments, access their pets' medical records, and seek professional advice concerning their pets' well-being and health.

ChiPetPet hosts a public blogging system that serves as a knowledge-sharing platform. Experts in various fields, veterinarians, and animal enthusiasts can contribute informative content and share valuable tips and emotions.

## Implementation Details

- For the backend, we used Python with the Django framework. Due to our course restrictions, we accessed the database using raw SQL queries.

- For the front end, we used the React framework in JavaScript. Bootstrap 5 and CSS are used for a more user-friendly interface.

- The project was put together by Docker, Dockerfile's are used for building Docker images of the backend and frontend. Furthermore, the docker-compose file is used to build a Docker image for MySQL as our database uses the schema.sql file prepared. The same docker-compose file also brings all the containers up as services and starts the application.  

# User Manual

## Booting of the System

The system can be deployed through the use of Docker and Docker-Compose. All necessary Docker and Docker-compose files are already given in the project folder. So there is no need to add any other configuration files.  The "schema.sql" file in the root directory can be used to initialize a system with some data. It is necessary to initialize an admin account through this file because the system needs at least one admin account to verify accounts(including other admins) and manage adoption applications. 

After installing Docker and Docker-Compose and launching the Docker Daemon. Backend and Frontend images should be built with the following commands in a terminal opened in the root directory.
- For frontend image:
docker build -t chipetpetfrontend ChiPetPetFrontEnd/

- For backend image:
docker build -t chipetpetbackend ChiPetPetBackEnd/

- After that, all services, including the MySQL service can be deployed with Docker-Compose:
docker-compose up -d

Then the system is ready to be used at address http://localhost:5173

- If you want to stop the execution of the system, you can use the following command: 
docker-compose down (“-v” option to reset the database content)
