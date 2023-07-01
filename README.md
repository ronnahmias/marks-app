# Vplans Test App

## Installations

- Docker
- clone this app
- add .env file

## Running the App

- run in terminal: `docker-compose up`
- wait to all apps to start successfully
- open browser: `localhost:4200`
- login to the app using credentials

## Users

### Admin User
- email: admin@admin.com
- password: 123456


### Manager User
- email: manager@manager.com
- password: 123456


### Student Users - 1-4 (change numbers on the email)
- email: student1@student.com
- password: 123456
- 
### Teacher Users - 1-4 (change numbers on the email)
- email: teacher1@teacher.com
- password: 123456

## Example ENV:

DB_DATABASE=postgres <br />
DB_HOST=host.docker.internal <br />
DB_PORT=5432 <br />
DB_USERNAME=postgres <br />
DB_PASSWORD=postgres <br />
JWT_SECRET=secret
