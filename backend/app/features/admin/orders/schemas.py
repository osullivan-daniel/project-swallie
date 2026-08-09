from enum import Enum
from decimal import Decimal
from datetime import datetime
from pydantic import BaseModel


class OrderStatus(str, Enum):
    IN_QUEUE = "inQueue"
    IN_PROGRESS = "inProgress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class OrderItem(BaseModel):
    productId: int
    productName: str
    productSize: str
    qty: int
    itemPrice: Decimal


class Order(BaseModel):
    orderId: int
    tableNum: int
    custName: str
    orderStatus: OrderStatus
    orderedAt: datetime
    completedAt: datetime | None
    cancelledAt: datetime | None
    totalPrice: Decimal
    order: list[OrderItem]


