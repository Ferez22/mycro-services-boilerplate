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

   - for a dev environment using `docker compose up -`build`
   - for a prod environment using: `docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d`
