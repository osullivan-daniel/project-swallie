from scripts.seedOrders import seedOrders
from scripts.seedProducts import seedProducts
from scripts.seedProducers import seedProducers
from scripts.seedProductVariants import seedProductVariants

if __name__ == "__main__":
    seedOrders()
    seedProducers()
    seedProducts()
    seedProductVariants()
