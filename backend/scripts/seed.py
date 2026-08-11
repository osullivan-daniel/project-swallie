from decimal import Decimal
from datetime import datetime, timezone
from app.db.database import SessionLocal
from app.db.models import Order, OrderItem, OrderStatus

from app.shared.product_size import ProductSize

def seed():
    db = SessionLocal()

    try:
        orders = [
            Order(
                table_num=1,
                cust_name="Tom",
                status=OrderStatus.IN_QUEUE,
                ordered_at=datetime.now(timezone.utc),
                total_price=Decimal("10.75"),
                order_items=[
                    OrderItem(
                        product_id=1,
                        product_name="BLACK IS THE COLOUR",
                        product_size=ProductSize.CAN_330,
                        qty=1,
                        item_price=Decimal("4.50"),
                    ),
                    OrderItem(
                        product_id=2,
                        product_name="RIGHT HAND MAN BACK",
                        product_size=ProductSize.PINT,
                        qty=2,
                        item_price=Decimal("6.25"),
                    ),
                ],
            ),
            Order(
                table_num=2,
                cust_name="Sarah",
                status=OrderStatus.IN_QUEUE,
                ordered_at=datetime.now(timezone.utc),
                total_price=Decimal("4.50"),
                order_items=[
                    OrderItem(
                        product_id=1,
                        product_name="BLACK IS THE COLOUR",
                        product_size=ProductSize.CAN_440,
                        qty=1,
                        item_price=Decimal("4.50"),
                    ),
                ],
            ),
            Order(
                table_num=3,
                cust_name="Dave",
                status=OrderStatus.IN_PROGRESS,
                ordered_at=datetime.now(timezone.utc),
                total_price=Decimal("9.00"),
                order_items=[
                    OrderItem(
                        product_id=1,
                        product_name="BLACK IS THE COLOUR",
                        product_size=ProductSize.PINT_THIRD,
                        qty=2,
                        item_price=Decimal("4.50"),
                    ),
                ],
            ),
            Order(
                table_num=4,
                cust_name="Emma",
                status=OrderStatus.COMPLETED,
                ordered_at=datetime.now(timezone.utc),
                completed_at=datetime.now(timezone.utc),
                total_price=Decimal("13.50"),
                order_items=[
                    OrderItem(
                        product_id=1,
                        product_name="BLACK IS THE COLOUR",
                        product_size=ProductSize.PINT_THIRD,
                        qty=3,
                        item_price=Decimal("4.50"),
                    ),
                ],
            ),
            Order(
                table_num=5,
                cust_name="Mike",
                status=OrderStatus.CANCELLED,
                ordered_at=datetime.now(timezone.utc),
                cancelled_at=datetime.now(timezone.utc),
                total_price=Decimal("4.50"),
                order_items=[
                    OrderItem(
                        product_id=2,
                        product_name="FOREVER AGO",
                        product_size=ProductSize.PINT_HALF,
                        qty=1,
                        item_price=Decimal("4.50"),
                    ),
                ],
            ),
        ]

        db.add_all(orders)
        db.commit()

        print(f"Seeded {len(orders)} orders.")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed()