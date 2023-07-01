# Vplans Test App

## Installations

- Docker
- clone this app
- add .env file

## Running the App

- run in terminal: `docker-compose up`
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

- `DB_DATABASE=postgres`
- `DB_HOST=host.docker.internal`
- `DB_PORT=5432`
- `DB_USERNAME=postgres`
- `DB_PASSWORD=postgres`
- `JWT_SECRET=secret`
