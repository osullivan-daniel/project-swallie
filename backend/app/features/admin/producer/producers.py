from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from app.db.database import get_db
from app.db.models import Producer
from app.features.shared.producerSchemas import Producer as ProducerSchema

router = APIRouter(
    prefix="/producers",
    tags=["producers"],
)

@router.get("/producers", response_model=list[ProducerSchema])
async def get_producers(db: Session = Depends(get_db)):
    return (
        db.query(Producer)
        .all()
    )