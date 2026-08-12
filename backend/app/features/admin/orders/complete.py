from sqlalchemy.orm import Session
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException

from app.db.database import get_db
from app.db.models import Order, OrderStatus
from app.features.shared.orderSchemas import Order as OrderSchema


router = APIRouter(
    prefix="/orders",
    tags=["orders"],
)


@router.post("/{order_id}/complete", response_model=OrderSchema)
async def complete_order(order_id: int, db: Session = Depends(get_db)):

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

    if order.status != OrderStatus.IN_PROGRESS:
        raise HTTPException(
            status_code=409,
            detail="Order is not in progress",
        )

    order.status = OrderStatus.COMPLETED
    order.completed_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(order)

    return order