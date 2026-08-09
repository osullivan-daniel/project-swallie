from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.features.admin.orders.completed import router as orders_completed
from app.features.admin.orders.in_progress import router as orders_in_progress
from app.features.admin.orders.in_queue import router as orders_in_queue

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(orders_completed)
app.include_router(orders_in_progress)
app.include_router(orders_in_queue)