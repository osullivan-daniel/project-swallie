from decimal import Decimal
from datetime import datetime

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import DateTime, Enum as SQLEnum, Integer, Numeric, String

from app.db.base import Base
from app.shared.order_status import OrderStatus


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)

    table_num: Mapped[int] = mapped_column(Integer, nullable=False)
    cust_name: Mapped[str] = mapped_column(String(255), nullable=False)

    status: Mapped[OrderStatus] = mapped_column(
        SQLEnum(OrderStatus),
        nullable=False,
        default=OrderStatus.IN_QUEUE,
    )

    ordered_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    completed_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    cancelled_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    total_price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    items: Mapped[list["OrderItem"]] = relationship(
        back_populates="order",
        cascade="all, delete-orphan",
    )