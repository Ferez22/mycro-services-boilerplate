from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .database import Base, engine, get_db
from .router.api import router

# Create tables (later you can switch to Alembic migrations)
Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def root(db: Session = Depends(get_db)):
    # Test query (nothing yet, just ensures DB session works)
    return {"message": "Hello from ze-backend with DB connection!"}

app.include_router(router)