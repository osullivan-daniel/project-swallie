import uuid
from decimal import Decimal
from pydantic.alias_generators import to_camel
from pydantic import BaseModel, ConfigDict, Field, AliasGenerator

from app.shared.product_size import ProductSize

class ProductVariantCreate(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )

    product_id: uuid.UUID
    product_size: str
    item_price: Decimal
    image_key: str | None


class ProductVariantResponse(BaseModel):
    model_config = ConfigDict(
        alias_generator=AliasGenerator(
            validation_alias=lambda field_name: field_name,
            serialization_alias=to_camel,
        ),
        from_attributes=True,
    )

    id: uuid.UUID = Field(serialization_alias="productVarietyId")
    product_id: uuid.UUID
    product_size: ProductSize
    item_price: Decimal
    image_key: str | None
    is_active: bool