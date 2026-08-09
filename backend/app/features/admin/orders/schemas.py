from pydantic import BaseModel


class OrderItem(BaseModel):
    productId: int
    productName: str
    productSize: str
    qty: int
    itemPrice: str


class Order(BaseModel):
    orderId: int
    tableNum: int
    custName: str
    orderStatus: str
    orderedAt: str
    completedAt: str | None
    cancelledAt: str | None
    totalPrice: str
    order: list[OrderItem]
