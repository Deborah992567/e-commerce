from fastapi import FastAPI
from app.core.database import Base, engine
from app.middleware.logging import logging_middleware
from app.middleware.rate_limit import rate_limit_middleware
from app.routers import auth, products, reviews, admin

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Perfume & Jewellery Store")

# Middleware (order is important)
app.middleware("http")(logging_middleware)
app.middleware("http")(rate_limit_middleware)

# Routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(products.router, prefix="/products", tags=["Products"])
app.include_router(reviews.router, prefix="/reviews", tags=["Reviews"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])

@app.get("/")
def health():
    return {"status": "API running 🚀"}
