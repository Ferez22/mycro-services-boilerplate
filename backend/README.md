## Getting started

Same as for frontend, Notice the Dockerfile at the root folder. It is a multi stage Dockerfile that build a dev and a prod version of the app.

You can start the backend right away with `uvicorn app.main:app --host 0.0.0.0 --port 5000 --reload`

#### Dev

- First, build your docker image:
  `docker build --target dev -t ze-backend-dev .`
- Then run the container
  `docker run -p 5000:5000 ze-backend-dev`

  • Hot reload on code changes.
  • Dev tools installed.

#### Production

- First, build your production docker image:
  `docker build --target production -t ze-backend-prod .`
- Then run the container
  `docker run -p 5000:5000 ze-backend-prod`

  • Small, clean image.
  • No reload, no dev deps.
  • Non-root user for security.
