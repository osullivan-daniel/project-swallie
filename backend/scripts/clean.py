from app.db.models import Order
from app.db.models import Product
from app.db.models import Producer
from app.db.models import ProductVariant
from app.db.database import SessionLocal


def clean(table, tableName):
    db = SessionLocal()

    try:
        allRecords = db.query(table).all()

        count = len(allRecords)

        for each in allRecords:
            db.delete(each)

        db.commit()

        print(f"Removed {count} records from {tableName}.")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()



def cleanAll():
    clean(Order, 'Orders')
    clean(ProductVariant, 'ProductVariants')
    clean(Product, 'Products')
    clean(Producer, 'Producers')



if __name__ == "__main__":
    cleanAll()