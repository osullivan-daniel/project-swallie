from pydantic import BaseModel


class OrderItem(BaseModel):
    name: str
    size: str
    qty: int


class CompletedOrder(BaseModel):
    tableNum: int
    custName: str
    order: list[OrderItem]