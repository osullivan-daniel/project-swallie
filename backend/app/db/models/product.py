import uuid
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Enum as SQLEnum, ForeignKey, String, text

from app.db.base import Base

class Product(Base):
    __tablename__ = "products"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()"),
    )

    producer_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("producers.id"),
        nullable=False,
    )

    product_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    style: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    abv: Mapped[Decimal] = mapped_column(
      Numeric(4, 2),
      nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        String(1500),
        nullable=True,
    )

    image_key: Mapped[str] = mapped_column(
        String(255),
        nullable=True,
    )

    is_active: Mapped[bool] = mapped_column(
        nullable=False,
        default=True
    )