from fastapi import APIRouter
from app.features.admin.orders.schemas import Order

router = APIRouter(
    prefix="/orders",
    tags=["orders"],
)


@router.get("/inQueue", response_model=list[Order])
async def get_in_queue_orders():
    # db will be in snake case we will map snake to camel here for the api
    return [{
        "orderId": 12345,
        "tableNum": 13,
        "custName": "James",
        "orderStatus": "inQueue",
        "orderedAt": "2026-08-09T14:28:00Z",
        "completedAt": None,
        "cancelledAt": None,
        "totalPrice": "9.50",
        "order": [
            {
                "productId": 42,
                "productName": "BLACK IS THE COLOUR",
                "productSize": "cans",
                "qty": 1,
                "itemPrice": "6.25"
            },
            {
                "productId": 42,
                "productName": "Test 1",
                "productSize": "1/2 Pint",
                "qty": 1,
                "itemPrice": "3.25"
            }
        ],
    }]