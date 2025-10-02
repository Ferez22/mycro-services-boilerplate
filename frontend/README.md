## Getting started

This frontend is created using nextJs. Notice the Dockerfile at the root folder. It is a multi stage Dockerfile that build a dev and a prod versionof the app.

#### Dev

- First, build your docker image:
  `docker build --target production -t ze-frontend-dev .`
- Then run the container
  `docker run -p 3000:3000 ze-frontend-dev`

#### Production

- First, build your production docker image:
  `docker build --target production -t ze-frontend-prod .`
- Then run the container
  `docker run -p 3000:3000 ze-frontend-prod`
