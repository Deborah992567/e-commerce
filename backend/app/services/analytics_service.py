import json
from sqlalchemy import select, func
from app.core.redis import redis_client
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product
from app.core.celery_app import celery_app
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.review import Review

CACHE_KEY = "analytics:order_stats"

@celery_app.task
def compute_order_stats(db: Session | None = None):
    if db is None:
        from app.dependencies.database import get_db
        db = next(get_db())

    total_orders = db.query(func.count(Order.id)).scalar() or 0
    total_revenue = db.query(func.sum(Order.total_amount)).scalar() or 0
    total_products = db.query(func.count(Product.id)).scalar() or 0
    total_users = db.query(func.count(User.id)).scalar() or 0

    stats = {
        "total_orders": total_orders,
        "total_revenue": float(total_revenue),
        "total_products": total_products,
        "total_users": total_users,
        "avg_order_value": round(float(total_revenue) / total_orders, 2) if total_orders else 0,
    }
    cache_order_stats(stats)
    return stats


def cache_order_stats(stats: dict | None = None):
    if stats is None:
        stats = compute_order_stats()
    try:
        redis_client.setex(CACHE_KEY, 3600, json.dumps(stats))
    except Exception:
        pass
    return stats


def get_cached_stats():
    try:
        cached = redis_client.get(CACHE_KEY)
        if cached:
            return json.loads(cached)
    except Exception:
        pass
    # Fallback to recompute (in-memory, no db session owned here)
    return None


def revenue_stats(db: Session):
    total = db.query(func.sum(Order.total_amount)).scalar() or 0
    count = db.query(func.count(Order.id)).scalar() or 0
    return {
        "total_revenue": float(total),
        "total_orders": count,
        "avg_order_value": round(float(total) / count, 2) if count else 0,
    }

def cache_product_view(product_id: int):
    key = f"product:{product_id}:views"
    try:
        redis_client.incr(key)
    except Exception:
        pass

def get_product_views(product_id: int):
    key = f"product:{product_id}:views"
    try:
        views = redis_client.get(key)
        return int(views) if views else 0
    except Exception:
        return 0
