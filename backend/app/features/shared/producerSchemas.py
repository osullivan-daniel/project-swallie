import uuid
from pydantic import BaseModel, ConfigDict, Field

class Producer(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    producerId: uuid.UUID = Field(validation_alias="id")
    producerName: str = Field(validation_alias="producer_name")
    address: dict
    description: str | None
    isActive: bool = Field(validation_alias="is_active")
