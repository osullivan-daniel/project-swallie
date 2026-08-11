from app.db.database import SessionLocal
from app.db.models import Product, Producer, ProductVariant

from scripts.seedOrders import seedOrders
from scripts.seedProducts import PRODUCTS
from scripts.seedProducers import PRODUCERS
from scripts.seedProductVariants import PRODUCT_VARIANTS

def seed():
    db = SessionLocal()

    try:
        # Producers
        producers = [
            Producer(**producer)
            for producer in PRODUCERS
        ]

        db.add_all(producers)
        db.flush()

        # Build name -> ID lookup
        producer_ids = {
            producer.producer_name: producer.id
            for producer in producers
        }

        # Products
        products = [
            Product(
                **{
                    key: value
                    for key, value in product.items()
                    if key != "producer_name"
                },
                producer_id=producer_ids[product["producer_name"]],
            )
            for product in PRODUCTS
        ]

        db.add_all(products)
        db.flush()

        # Build name -> ID lookup
        product_ids = {
            product.product_name: product.id
            for product in products
        }

        # Product_variants
        product_variants = [
            ProductVariant(
                **{
                    key: value
                    for key, value in product_variant.items()
                    if key != "product_name"
                },
                product_id=product_ids[product_variant["product_name"]],
            )
            for product_variant in PRODUCT_VARIANTS
        ]

        db.add_all(product_variants)
        db.commit()

        print(f"Seeded {len(producers)} producers")
        print(f"Seeded {len(products)} products")
        print(f"Seeded {len(product_variants)} product_variants")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seedOrders()
    seed()