from pydantic import BaseModel


class OrderItem(BaseModel):
    productId: int
    productName: str
    productSize: str
    qty: int
    itemPrice: str


class CompletedOrder(BaseModel):
    orderId: int
    tableNum: int
    custName: str
    orderStatus: str
    orderedAt: str
    completedAt: str
    totalPrice: str
    order: list[OrderItem]
