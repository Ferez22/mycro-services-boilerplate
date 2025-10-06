from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .database import Base, engine, get_db
from app.router import api, player
from .db.player import Player

# Create tables (later you can switch to Alembic migrations)
Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def root(db: Session = Depends(get_db)):
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

app.include_router(api.router)
app.include_router(player.router)