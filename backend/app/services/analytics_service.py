from app.core.redis import redis

async def cache_product_view(product_id: int):
    key = f"product_views:{product_id}"
    await redis.incr(key)

async def get_product_views(product_id: int):
    key = f"product_views:{product_id}"
    views = await redis.get(key)
    return int(views or 0)
