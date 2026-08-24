from sqlalchemy.orm import Session, joinedload
from fastapi import APIRouter, Depends

from app.db.database import get_db
from app.db.models import ProductVariant
from app.features.shared.productVariants import ProductVariantResponse as ProductVariantResponseSchema, ProductVariantCreate as ProductVariantCreateSchema

router = APIRouter(
    prefix="/products",
    tags=["products"],
)

@router.get("/productVariants", response_model=list[ProductVariantResponseSchema])
async def get_products(db: Session = Depends(get_db)):
    return (
        db.query(ProductVariant)
        .all()
    )

@router.post("/createProductVariants", response_model=ProductVariantResponseSchema)
async def create_product(new_product: ProductVariantCreateSchema, db: Session = Depends(get_db)):

    productVariant = ProductVariant(**new_product.model_dump())

    db.add(productVariant)
    db.commit()
    db.refresh(productVariant)

    print(productVariant)

    return productVariant