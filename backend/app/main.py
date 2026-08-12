from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.features.admin.orders.completed_or_canceled import router as orders_completed_or_canceled
from app.features.admin.orders.in_progress import router as orders_in_progress
from app.features.admin.orders.in_queue import router as orders_in_queue
from app.features.admin.orders.complete import router as complete
from app.features.admin.orders.cancel import router as cancel
from app.features.admin.orders.start import router as start

from app.features.admin.producer.producers import router as producers

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(orders_completed_or_canceled)
app.include_router(orders_in_progress)
app.include_router(orders_in_queue)
app.include_router(complete)
app.include_router(cancel)
app.include_router(start)


app.include_router(producers)
