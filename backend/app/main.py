from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import (
    auth,
    products,
    orders,
    reviews,
    discounts,
    analytics
)

app = FastAPI(title="Perfume + Jewelry E-commerce")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth" , tags=["auth"])
app.include_router(products.router, prefix="/products" , tags=["products"])
app.include_router(orders.router, prefix="/orders" , tags=["orders"])
app.include_router(reviews.router, prefix="/reviews" , tags=["reviews"])
app.include_router(discounts.router, prefix="/discounts" , tags=["discounts"])
app.include_router(analytics.router, prefix="/analytics" , tags=["analytics"])