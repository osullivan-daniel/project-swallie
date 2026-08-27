import uuid
from decimal import Decimal
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import UniqueConstraint, Numeric, ForeignKey, String, text
from sqlalchemy.orm import Mapped, mapped_column, relationship


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
        nullable=False
    )

    style: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    abv: Mapped[Decimal] = mapped_column(
      Numeric(4, 2),
      nullable=True,
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

    producer: Mapped["Producer"] = relationship(
        back_populates="products"
    )

    variants: Mapped[list["ProductVariant"]] = relationship(
        back_populates="product"
    )

    __table_args__ = (
        UniqueConstraint(
            "product_name",
            name="uq_product_product_name",
        ),
    )