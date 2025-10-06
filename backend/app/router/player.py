from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db.player import Player, create_player, delete_player
from ..database import get_db
from ..schemas.player import PlayerCreate, PlayerResponse
from typing import List

router = APIRouter(prefix="/player")

@router.post("/create", response_model=PlayerResponse)
def create_player_endpoint(player: PlayerCreate, db: Session = Depends(get_db)):
    # Convert Pydantic model to SQLAlchemy model
    db_player = Player(
        name=player.name, 
        sport=player.sport, 
    )
    created_player = create_player(db, db_player)
    return created_player

@router.get("/players", response_model=List[PlayerResponse])
def get_players_endpoint(db: Session = Depends(get_db)):
    players = db.query(Player).all()
    return players

@router.delete("/delete/{player_id}", response_model=PlayerResponse)
def delete_player_endpoint(player_id: int, db: Session = Depends(get_db)):
    delete_player(db, player_id)
    return {"message": "Player deleted successfully"}