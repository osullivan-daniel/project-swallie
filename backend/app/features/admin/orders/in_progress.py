from fastapi import APIRouter
from app.features.admin.orders.schemas import Order

router = APIRouter(
    prefix="/orders",
    tags=["orders"],
)


@router.get("/inProgress", response_model=list[Order])
async def get_in_progress_orders():
    # db will be in snake case we will map snake to camel here for the api
    return [{
        "orderId": 123,
        "tableNum": 7,
        "custName": "John",
        "orderStatus": "inProgress",
        "orderedAt": "2026-08-09T14:28:00Z",
        "completedAt": None,
        "cancelledAt": None,
        "totalPrice": 15.31,
        "order": [
            {
                "productId": 42,
                "productName": "BLACK IS THE COLOUR",
                "productSize": "cans",
                "qty": 1,
                "itemPrice": 4.58
            },
            {
                "productId": 46,
                "productName": "Test 7",
                "productSize": "1/2 Pint",
                "qty": 1,
                "itemPrice": 6.59
            },
            {
                "productId": 48,
                "productName": "Test 4",
                "productSize": "1/3 Pint",
                "qty": 1,
                "itemPrice": 4.14
            }
        ],
    }]