from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db.player import Player, create_player
from ..database import get_db
from ..schemas.player import PlayerCreate, PlayerResponse

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