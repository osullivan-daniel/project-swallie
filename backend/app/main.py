from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.features.admin.orders.router import router as orders_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(orders_router)