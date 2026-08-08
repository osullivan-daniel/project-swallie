from fastapi import APIRouter

from app.features.admin.orders.schemas import CompletedOrder

router = APIRouter(
    prefix="/orders",
    tags=["orders"],
)


@router.get("/completed", response_model=list[CompletedOrder])
async def get_completed_orders():
    return [{
        "tableNum": 1,
        "custName": "Tom",
        "order": [
            {
                "name": "BLACK IS THE COLOUR",
                "size": "cans",
                "qty": 1,
            }
        ],
    }]