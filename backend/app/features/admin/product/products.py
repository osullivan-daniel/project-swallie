from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from app.db.database import get_db
from app.db.models import Product
from app.features.shared.productSchemas import Product as ProductSchema

router = APIRouter(
    prefix="/products",
    tags=["products"],
)

@router.get("/products", response_model=list[ProductSchema])
async def get_products(db: Session = Depends(get_db)):
    return (
        db.query(Product)
        .all()
    )
