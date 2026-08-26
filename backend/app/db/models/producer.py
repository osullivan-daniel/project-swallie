import uuid
from sqlalchemy import UniqueConstraint, String, text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

class Producer(Base):
    __tablename__ = "producers"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()"),
    )

    producer_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    address: Mapped[dict] = mapped_column(
        JSONB,
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        String(1500),
        nullable=True,
    )

    is_active: Mapped[bool] = mapped_column(
        nullable=False,
        default=True
    )

    products: Mapped[list["Product"]] = relationship(
        back_populates="producer"
    )

    __table_args__ = (
        UniqueConstraint(
            "producer_name",
            name="uq_producer_producer_name",
        ),
    )