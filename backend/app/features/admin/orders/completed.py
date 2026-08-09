from fastapi import APIRouter
from app.features.admin.orders.schemas import Order

router = APIRouter(
    prefix="/orders",
    tags=["orders"],
)


@router.get("/completed", response_model=list[Order])
async def get_completed_orders():
    # db will be in snake case we will map snake to camel here for the api
    return [{
        "orderId": 123,
        "tableNum": 1,
        "custName": "Tom",
        "orderStatus": "completed",
        "orderedAt": "2026-08-09T14:28:00Z",
        "completedAt": "2026-08-09T14:32:00Z",
        "cancelledAt": None,
        "totalPrice": 4.58,
        "orderItems": [
            {
                "productId": 42,
                "productName": "BLACK IS THE COLOUR",
                "productSize": "cans",
                "qty": 1,
                "itemPrice": 4.58
            },
            {
                "productId": 42,
                "productName": "Test 1",
                "productSize": "1/2 Pint",
                "qty": 1,
                "itemPrice": 4.58
            },
            {
                "productId": 42,
                "productName": "Test 2",
                "productSize": "1/3 Pint",
                "qty": 1,
                "itemPrice": 4.58
            }
        ],
    }]