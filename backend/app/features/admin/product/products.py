from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from app.db.database import get_db
from app.db.models import Product
from app.features.shared.productSchemas import ProductResponse as ProductResponseSchema, ProductCreate as ProductCreateSchema

router = APIRouter(
    prefix="/products",
    tags=["products"],
)

@router.get("/products", response_model=list[ProductResponseSchema])
async def get_products(db: Session = Depends(get_db)):
    return (
        db.query(Product)
        .all()
    )

@router.post("/createProduct", response_model=ProductResponseSchema)
async def create_product(new_product: ProductCreateSchema, db: Session = Depends(get_db)):

    product = Product(**new_product.model_dump())

    db.add(product)
    db.commit()
    db.refresh(product)

    print(product)

    return product
