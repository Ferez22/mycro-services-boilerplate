from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import Base, engine, get_db
from app.router import api, player
from .db.player import Player

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables when the app starts up (deferred)
@app.on_event("startup")
async def startup_event():
    try:
        Base.metadata.create_all(bind=engine)
        print("Database tables created successfully")
    except Exception as e:
        print(f"Warning: Could not create database tables: {e}")
        print("The app will continue to run, but database operations may fail")

@app.get("/")
def root(db: Session = Depends(get_db)):
    try:
        # Query all players from the database
        players = db.query(Player).all()
        
        # Convert to list of dictionaries for JSON response
        players_data = []
        for player in players:
            players_data.append({
                "id": player.id,
                "name": player.name,
                "sport": player.sport,
                "player_id": player.player_id
            })
        
        return {
            "message": "Hello from ze-backend with DB connection!",
            "database_content": {
                "players": players_data,
                "total_players": len(players_data)
            }
        }
    except Exception as e:
        return {
            "message": "Hello from ze-backend!",
            "error": f"Database connection failed: {str(e)}",
            "database_content": {
                "players": [],
                "total_players": 0
            }
        }

app.include_router(api.router)
app.include_router(player.router)