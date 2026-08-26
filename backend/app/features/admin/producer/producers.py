from fastapi import Request
from app.rate_limit import limiter
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
@limiter.limit("25/minute")
async def get_producers(request: Request, db: Session = Depends(get_db)):
    return db.query(Producer).all()

@router.post("/createProducer", response_model=ProducerResponseSchema)
@limiter.limit("10/minute")
async def create_producer(request: Request, new_producer: ProducerCreateSchema, db: Session = Depends(get_db)):

    producer = Producer(**new_producer.model_dump())

    db.add(producer)
    db.commit()
    db.refresh(producer)

    return producer
