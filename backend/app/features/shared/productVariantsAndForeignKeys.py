import uuid
from decimal import Decimal
from pydantic import BaseModel, ConfigDict, Field

from app.shared.product_size import ProductSize


class ProductVariant(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    productVariantId: uuid.UUID = Field(validation_alias="id")
    productId: uuid.UUID = Field(validation_alias="product_id")
    productSize: ProductSize = Field(validation_alias="product_size")
    itemPrice: Decimal = Field(validation_alias="item_price")
    imageKey: str | None = Field(validation_alias="image_key")
    isActive: bool = Field(validation_alias="is_active")