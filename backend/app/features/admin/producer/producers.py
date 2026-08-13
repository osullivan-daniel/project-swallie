from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from app.db.database import get_db
from app.db.models import Producer
from app.features.shared.producerSchemas import ProducerCreate as ProducerCreateSchema, ProducerResponse as ProducerResponseSchema


router = APIRouter(
    prefix="/producers",
    tags=["producers"],
)

@router.get("/producers", response_model=list[ProducerResponseSchema])
async def get_producers(db: Session = Depends(get_db)):
    return db.query(Producer).all()

@router.post("/createProducer", response_model=ProducerResponseSchema)
async def create_producer(new_producer: ProducerCreateSchema, db: Session = Depends(get_db)):

    producer = Producer(**new_producer.model_dump())

    db.add(producer)
    db.commit()
    db.refresh(producer)

    return producer
