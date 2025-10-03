from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Use postgres-db (the service name in docker-compose) as host
DATABASE_URL = "postgresql://postgresadmin:postgresadmin@postgres-db:5432/postgres"

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency for FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()