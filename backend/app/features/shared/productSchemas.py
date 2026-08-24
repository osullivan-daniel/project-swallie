import uuid
from decimal import Decimal
from pydantic.alias_generators import to_camel
from pydantic import BaseModel, ConfigDict, Field, AliasGenerator

from app.features.shared.productVariants import ProductVariantResponse


class ProductCreate(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )

    producer_id: str
    product_name: str
    style: str | None = None
    abv: Decimal
    description: str | None = None
    image_key: str | None = None


class ProductResponse(BaseModel):
    model_config = ConfigDict(
        alias_generator=AliasGenerator(
            validation_alias=lambda field_name: field_name,
            serialization_alias=to_camel,
        ),
        from_attributes=True,
    )

    id: uuid.UUID = Field(serialization_alias="productId")
    producer_id: uuid.UUID
    product_name: str
    style: str
    abv: Decimal | None
    description: str | None
    image_key: str | None
    is_active: bool
    variants: list[ProductVariantResponse] | None = None
