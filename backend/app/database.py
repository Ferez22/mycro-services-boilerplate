import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Use environment variables for database connection
# Default to localhost for development outside Docker
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5433")
DB_USER = os.getenv("DB_USER", "postgresadmin")
DB_PASSWORD = os.getenv("DB_PASSWORD", "postgresadmin")
DB_NAME = os.getenv("DB_NAME", "postgres")

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_size=10,          # Maximum number of connections to keep persistent
    max_overflow=20,       # Maximum number of connections that can be created beyond pool_size
    pool_recycle=3600,     # Recycle connections after 1 hour
    pool_timeout=30,       # Timeout for getting a connection from pool
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency for FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()