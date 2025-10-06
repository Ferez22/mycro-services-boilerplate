## Gettin Started

### Make it your own

- First and foremost, remove the .git file: `rm -rf .git`
- Second, initialize a new git repository: `git init`
- Then add and commit your changes using `git add .`
- Then `git commit -m 'initial commit'`
- Now push and Voilà, you have created your own repository!

### Startup

Welcome to **ze-mycroservices-boilerplate**.

1. You can now have two terminals open, then start the frontend and the backend separately (see the READMEs in frontend and backend folder)
2. or you can start everything in dev and prod environments using docker
   - **(recommended for dev)** for a dev environment using `docker compose up --build` (changes refresh automatically)
   - for a prod environment using: `docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d`

### PostgreSQL

#### Docker

you can connect to your postgreSQL and run SQL queries directly. Use this: `docker exec -it mycro-services-boilerplate-postgres-db-1 psql -U postgresadmin`. It is recommended that you use variables for the user and password, and obviously chose a stronger password.

### Supabase

Follow the [official documentation](https://supabase.com/docs/guides/self-hosting/docker#before-you-begin) of supabase on how to self host
