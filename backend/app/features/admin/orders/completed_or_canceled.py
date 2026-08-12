from sqlalchemy import or_
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from app.db.database import get_db
from app.db.models import Order, OrderStatus
from app.features.shared.orderSchemas import Order as OrderSchema

router = APIRouter(
    prefix="/orders",
    tags=["orders"],
)


@router.get("/completed", response_model=list[OrderSchema])
async def get_completed_orders(db: Session = Depends(get_db)):
    return (
        db.query(Order)
        .filter(or_(Order.status == OrderStatus.COMPLETED, Order.status == OrderStatus.CANCELLED))
        .all()
    )