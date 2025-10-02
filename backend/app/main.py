from fastapi import FastAPI

from .router.api import router

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello from ze-backend!"}

app.include_router(router)