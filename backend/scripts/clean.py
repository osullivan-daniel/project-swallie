from app.db.models import Order
from app.db.database import SessionLocal


def clean():
    db = SessionLocal()

    try:
        orders = db.query(Order).all()

        count = len(orders)

        for order in orders:
            db.delete(order)

        db.commit()

        print(f"Removed {count} orders.")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    clean()