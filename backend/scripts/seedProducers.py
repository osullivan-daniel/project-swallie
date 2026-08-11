from app.db.models import Producer
from app.db.database import SessionLocal


def seedProducers():
    db = SessionLocal()

    try:
        producers = [
            Producer(
                producer_name="Boundary Brewing",
                address={
                    'street1': "A4-A7", 
                    'street2': "310 Newtownards Road", 
                    'city': "Belfast",
                    'county': "Antrim",
                    'postCode': "BT4 1HE",
                    'country': "Northern Ireland"
                }
            ),
            Producer(
                producer_name="WHITEWATER BREWING CO.",
                address={
                    'street1': "Lakeside Brae", 
                    'street2': "Clarkhill Road", 
                    'city': "Castlewellan",
                    'county': "Down",
                    'postCode': "BT31 9RH",
                    'country': "Northern Ireland"
                }
            ),
            Producer(
                producer_name="Longbridge Drinks Co",
                address={
                    'street1': "Unit 14 East Belfast Enterprise Pk", 
                    'street2': "Albertbridge Rd", 
                    'city': "Belfast",
                    'county': "Antrim",
                    'postCode': "BT5 4GX",
                    'country': "Northern Ireland"
                }
            )
        ]

        db.add_all(producers)
        db.commit()

        print(f"Seeded {len(producers)} producers.")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seedProducers()