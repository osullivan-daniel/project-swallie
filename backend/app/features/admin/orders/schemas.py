from decimal import Decimal
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field

from app.shared.order_status import OrderStatus


class OrderItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    productId: int = Field(validation_alias="product_id")
    productName: str = Field(validation_alias="product_name")
    productSize: str = Field(validation_alias="product_size")
    qty: int
    itemPrice: Decimal = Field(validation_alias="item_price")


class Order(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    orderId: int = Field(validation_alias="id")
    tableNum: int = Field(validation_alias="table_num")
    custName: str = Field(validation_alias="cust_name")
    orderStatus: OrderStatus = Field(validation_alias="status")
    orderedAt: datetime = Field(validation_alias="ordered_at")
    completedAt: datetime | None = Field(validation_alias="completed_at")
    cancelledAt: datetime | None = Field(validation_alias="cancelled_at")
    totalPrice: Decimal = Field(validation_alias="total_price")
    orderItems: list[OrderItem] = Field(validation_alias="order_items")