from pydantic import BaseModel
from typing import Optional

class PlayerCreate(BaseModel):
    name: str
    sport: str

class PlayerResponse(BaseModel):
    id: int
    name: str
    sport: str
    player_id: Optional[int] = None
    
    class Config:
        from_attributes = True  # This allows conversion from SQLAlchemy models
