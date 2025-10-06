from sqlalchemy import Column, Integer, String, ForeignKey
from datetime import datetime
from ..database import Base
from sqlalchemy.orm import Session

# Create a class for the player table, add fields
class Player(Base):
    __tablename__ = 'players'

    id = Column(Integer(), primary_key=True)
    name = Column(String(100), nullable=False)
    sport = Column(String(100), nullable=False)
    player_id = Column(Integer(), ForeignKey('players.id'))

def create_player(db: Session, player: Player):
    player = Player(name=player.name, sport=player.sport)
    db.add(player)
    db.commit()
    db.refresh(player)
    return player

def delete_player(db: Session, player_id: int):
    player = db.query(Player).filter(Player.id == player_id).first()
    db.delete(player)
    db.commit()
    return player