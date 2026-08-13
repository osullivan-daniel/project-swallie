import uuid
from pydantic.alias_generators import to_camel
from pydantic import BaseModel, ConfigDict, Field, AliasGenerator


class ProducerCreate(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )

    producer_name: str
    address: dict
    description: str | None = None



class ProducerResponse(BaseModel):
    model_config = ConfigDict(
        alias_generator=AliasGenerator(
            validation_alias=lambda field_name: field_name,
            serialization_alias=to_camel,
        ),
        from_attributes=True,
    )

    id: uuid.UUID = Field(serialization_alias="producerId")
    producer_name: str
    address: dict
    description: str | None = None
    is_active: bool
