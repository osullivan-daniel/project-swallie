from .rate_limit import limiter
from fastapi import FastAPI, Request
from slowapi.errors import RateLimitExceeded
from slowapi import _rate_limit_exceeded_handler
from fastapi.middleware.cors import CORSMiddleware

from app.features.admin.producer.producers import router as producers

from app.features.admin.product.products import router as products
from app.features.admin.product.product_variants import router as product_variants

from app.features.admin.orders.start import router as start
from app.features.admin.orders.cancel import router as cancel
from app.features.admin.orders.complete import router as complete
from app.features.admin.orders.in_queue import router as orders_in_queue
from app.features.admin.orders.in_progress import router as orders_in_progress
from app.features.admin.orders.completed_or_canceled import router as orders_completed_or_canceled


app = FastAPI()

app.state.limiter = limiter
app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(start)
app.include_router(cancel)
app.include_router(complete)
app.include_router(orders_in_queue)
app.include_router(orders_in_progress)
app.include_router(orders_completed_or_canceled)

app.include_router(producers)

app.include_router(products)

app.include_router(product_variants)
