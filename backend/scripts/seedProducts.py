from decimal import Decimal
from datetime import datetime, timezone
from app.db.database import SessionLocal

from app.db.models import Product
from app.db.models import Producer

def seedProducts():
    db = SessionLocal()

    try:

        boundary = db.query(Producer).filter(
            Producer.producer_name == "Boundary Brewing"
        ).first()

        if not boundary:
            raise ValueError("Boundary Brewing producer not found")

        whitewater = db.query(Producer).filter(
            Producer.producer_name == "WHITEWATER BREWING CO."
        ).first()

        if not whitewater:
            raise ValueError("WHITEWATER BREWING CO. producer not found")

        longbridge = db.query(Producer).filter(
            Producer.producer_name == "Longbridge Drinks Co"
        ).first()

        if not longbridge:
            raise ValueError("Longbridge Drinks Co producer not found")

        products = [
            Product(
                producer_id=boundary.id,
                product_name="BLACK IS THE COLOUR",
                style="IPA",
                abv=7.7,
                description="BLACK IPA",
                image_key="assets/img/productImages/black+is+the+colour+can+shot+small.jpg"
            ),
            Product(
                producer_id=boundary.id,
                product_name="LET THE WOMEN DO THE WORK",
                style="IPA",
                abv=5.1,
                description="To celebrate IWD 2026, the women of Boundary have brewed ‘Let the Women Do the Work’, a name that challenges gender stereotypes in the industry and celebrates the central role women have played in brewing throughout history. This is more than a beer with a name – it‘s a statement.",
                image_key="assets/img/productImages/Boundary_LetTheWomen.png"
            ),
            Product(
                producer_id=boundary.id,
                product_name="SOTERIOLOGY",
                style="Stout",
                abv=11.7,
                image_key="assets/img/productImages/soteriology+can+shot+small.jpg"
            ),
            Product(
                producer_id=whitewater.id,
                product_name="Hoppelhammer",
                style="IPA",
                abv=6,
                description="A triple-hopped 6% abv India Pale Ale, delivering up-front American hops and rich fruit flavours.",
            ),
            Product(
                producer_id=whitewater.id,
                product_name="Helles Larger",
                style="Larger",
                abv=4.2,
                description="Using juicy German Hallertau Blanc hops along side spalt select hops for a touch of bitterness. This result is a traditional helles lager with a hoppy aroma, a light slightly sweet malt body and restrained bitterness.",
            ),
            Product(
                producer_id=longbridge.id,
                product_name="Belfast Lavender Soda",
                style="Soda",
                description="""BLENDING DELICATE FLORAL NOTES WITH A CRISP REFRESHING FIZZ.
                                Our Lavender Soda is gently sparkling with a clean, crisp finish. 
                                It is a calm, aromatic sip that’s refreshingly different and unmistakably original. 
                                Sip slowly. Let the World wait.""",
                image_key="assets/img/productImages/LavenderSoda.png"
            ),
            Product(
                producer_id=longbridge.id,
                product_name="Belfast Elderflower Soda",
                style="Soda",
                description="""CRISP, FLORAL AND SPARKLING TO PERFECTION. BELFAST’S TWIST ON A TIMELESS FAVOURITE. 
                                Belfast Elderflower Soda is floral, fizzy and lightly sweet. Naturally aromatic and refreshingly crisp, it delivers a bright , clean taste with every sip.
                                Uncomplicated and full of character, it’s sparkling soda that’s as easy to drink as it is hard to forget. 
                                Bloom Boldly""",
                image_key="assets/img/productImages/ElderflowerSoda.png"
            ),

        ]

        db.add_all(products)
        db.commit()

        print(f"Seeded {len(products)} products.")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seedProducts()
