from sqlalchemy.orm import Session, joinedload
from fastapi import APIRouter, Depends

from app.db.database import get_db
from app.db.models import ProductVariant
from app.features.shared.productVariantsAndForeignKeys import ProductVariant as ProductVariantSchema

router = APIRouter(
    prefix="/products",
    tags=["products"],
)

@router.get("/productVariants", response_model=list[ProductVariantSchema])
async def get_products(db: Session = Depends(get_db)):
    return (
        db.query(ProductVariant)
        .all()
    )