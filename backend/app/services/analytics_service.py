import json
from sqlalchemy import select, func
from app.core.redis import redis_client
from app.core.database import async_session
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product

CACHE_KEY = "analytics:order_stats"

async def compute_order_stats():
    async with async_session() as session:
        # total orders
        total_orders = await session.scalar(select(func.count(Order.id)))

        # total revenue
        total_revenue = await session.scalar(
            select(func.sum(Order.total_amount))
        )

        # top products
        top_products = await session.execute(
            select(
                Product.id,
                Product.name,
                func.sum(OrderItem.quantity).label("sold_qty")
            )
            .join(OrderItem, OrderItem.product_id == Product.id)
            .group_by(Product.id)
            .order_by(func.sum(OrderItem.quantity).desc())
            .limit(5)
        )

        top_products = [
            {"id": r.id, "name": r.name, "sold_qty": r.sold_qty}
            for r in top_products.fetchall()
        ]

        stats = {
            "total_orders": total_orders or 0,
            "total_revenue": float(total_revenue or 0),
            "top_products": top_products,
        }

        return stats

async def cache_order_stats():
    stats = await compute_order_stats()
    redis_client.set(CACHE_KEY, json.dumps(stats), ex=300)


async def get_cached_stats():
    cached = redis_client.get(CACHE_KEY)
    if cached:
        return json.loads(cached)

    await cache_order_stats()
    return json.loads(redis_client.get(CACHE_KEY))
