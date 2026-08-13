import uuid
from decimal import Decimal
from pydantic import BaseModel, ConfigDict, Field

class Product(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    productId: uuid.UUID = Field(validation_alias="id")
    producerId: uuid.UUID = Field(validation_alias="producer_id")
    productName: str = Field(validation_alias="product_name")
    style: str
    abv: Decimal | None
    description: str | None
    imageKey: str | None = Field(validation_alias="image_key")
    isActive: bool = Field(validation_alias="is_active")
