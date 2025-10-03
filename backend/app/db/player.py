from sqlalchemy import Column, Integer, String, ForeignKey
from datetime import datetime
from ..database import Base

# Create a class for the player table, add fields
class Player(Base):
    __tablename__ = 'players'

    id = Column(Integer(), primary_key=True)
    name = Column(String(100), nullable=False)
    sport = Column(String(100), nullable=False)
    player_id = Column(Integer(), ForeignKey('players.id'))