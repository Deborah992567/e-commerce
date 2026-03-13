from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError

from app.routers import (
    auth,
    products,
    orders,
    reviews,
    discounts,
    analytics
)
from app.middleware.logging import logging_middleware
from app.middleware.rate_limit import rate_limit_middleware
from app.middleware.security import SecurityHeadersMiddleware
from app.core.config import settings

app = FastAPI(title="Perfume + Jewelry E-commerce")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SecurityHeadersMiddleware)

app.middleware("http")(logging_middleware)
app.middleware("http")(rate_limit_middleware)

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail, "type": "http_exception"}
    )

@app.exception_handler(SQLAlchemyError)
async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
    return JSONResponse(
        status_code=500,
        content={"detail": "Database error", "type": "database_error"}
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "type": "internal_error"}
    )

app.include_router(auth.router, prefix="/auth" , tags=["auth"])
app.include_router(products.router, prefix="/products" , tags=["products"])
app.include_router(orders.router, prefix="/orders" , tags=["orders"])
app.include_router(reviews.router, prefix="/reviews" , tags=["reviews"])
app.include_router(discounts.router, prefix="/discounts" , tags=["discounts"])
app.include_router(analytics.router, prefix="/analytics" , tags=["analytics"])

@app.get("/health")
def health_check():
    return {"status": "healthy"}