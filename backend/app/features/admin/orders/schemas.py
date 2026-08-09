from decimal import Decimal
from datetime import datetime
from pydantic import BaseModel
from app.shared.order_status import OrderStatus


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
    orderItems: list[OrderItem]


