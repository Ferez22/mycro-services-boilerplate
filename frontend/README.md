## Getting started

This frontend is created using nextJs. Notice the Dockerfile at the root folder. It is a multi stage Dockerfile that build a dev and a prod version of the app.
You can of course start the frontend directly with `npm run dev`or `yarn dev`

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

### Frontend Tools

- As a Component library we have schad/cn and magic UI.
