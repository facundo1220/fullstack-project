# Fullstack Project

This project uses Docker to containerize a fullstack application that includes a Python backend and a Node.js frontend. It also utilizes PostgreSQL as the database and Redis as a caching system.

## Prerequisites

Make sure you have the following installed:

Docker
Docker Compose

## Project Structure

```sh
.
├── backend
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── manage.py
│   ├── django_api
│   └── products
│
├── frontend
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── src
│
├── db_init
│   └── init.sql
│
├── docker-compose.yml
└── nginx.conf

```
## Configuration

1. Database Configuration: Make sure to update the docker-compose.yml file with your database credentials in the db section:

```bash
environment:
  POSTGRES_USER: postgres
  POSTGRES_PASSWORD: postgres

```

Also, update the DATABASE_URL in the backend section with your password:

```bash
environment:
  - DATABASE_URL=postgres://facundodev:your_password@db:5432/fullstackdb
```

2. Database Initialization: If you need to run an SQL script when starting the database, place it in the db_init folder.

## Running the Project
To start the project, follow these steps:

1. Open a terminal in the root of the project (where the docker-compose.yml file is located).

2. Run the following command to build and start the containers:

```bash
docker-compose up --build
```
3. Access the application:

* Frontend: Open your browser and go to http://localhost (port 80).
*Backend: Access the API at http://localhost:8000.

## Useful Commands

1. To stop the containers:

```bash
docker-compose down -v
```
2. To restart the containers:

```bash
docker-compose restart
```

3. To view the logs of the containers:

```bash
docker-compose logs -f
```

## Images

![alt text](<images/image1.png>)

![alt text](<images/image1.png>)

![alt text](<images/image1.png>)

![alt text](<images/image2.png>)

![alt text](<images/image3.png>)

![alt text](<images/image4.png>)

![alt text](<images/image5.png>)

![alt text](<images/image6.png>)

![alt text](<images/image7.png>)


![alt text](<images/image9.png>)

![alt text](<images/image10.png>)
