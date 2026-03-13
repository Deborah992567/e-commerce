import json
from sqlalchemy import select, func
from app.core.redis import redis_client
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product
from app.core.celery_app import celery_app
from sqlalchemy.orm import Session
from app.models.order import Order
from sqlalchemy import func

CACHE_KEY = "analytics:order_stats"
@celery_app.task
def compute_order_stats():
    # Make sync for now
    pass  # Placeholder

def cache_order_stats():
    # Sync version
    pass

def get_cached_stats():
    # Sync
    pass

def revenue_stats(db: Session):
    total = db.query(func.sum(Order.total_amount)).scalar() or 0
    return {"total_revenue": float(total)}

def cache_product_view(product_id: int):
    key = f"product:{product_id}:views"
    redis_client.incr(key)

def get_product_views(product_id: int):
    key = f"product:{product_id}:views"
    views = redis_client.get(key)
    return int(views) if views else 0
