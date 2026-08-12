from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from app.db.database import get_db
from app.db.models import Order, OrderStatus
from app.features.shared.orderSchemas import Order as OrderSchema

router = APIRouter(
    prefix="/orders",
    tags=["orders"],
)


@router.get("/inQueue", response_model=list[OrderSchema])
async def get_in_queue_orders(db: Session = Depends(get_db)):
    return (
        db.query(Order)
            .filter(Order.status == OrderStatus.IN_QUEUE)
            .all()
    )
