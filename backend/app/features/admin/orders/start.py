from sqlalchemy.orm import Session, joinedload
from fastapi import APIRouter, Depends, HTTPException

from app.db.database import get_db
from app.db.models import Order, OrderStatus
from app.features.shared.orderSchemas import Order as OrderSchema


router = APIRouter(
    prefix="/orders",
    tags=["orders"],
)


@router.post("/{order_id}/start", response_model=OrderSchema)
async def start_order(order_id: int, db: Session = Depends(get_db)):

    order = (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )

    if order is None:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    if order.status != OrderStatus.IN_QUEUE:
        raise HTTPException(
            status_code=409,
            detail="Order is not in queue",
        )

    order.status = OrderStatus.IN_PROGRESS

    db.commit()
    db.refresh(order)

    return order