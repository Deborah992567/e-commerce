from celery import Celery
from app.core.config import settings

celery = Celery(
    "worker",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
)

@celery.task
def refresh_order_stats():
    from app.dependencies.database import get_db
    from app.services.analytics_service import compute_order_stats

    db = next(get_db())
    import asyncio
    asyncio.run(compute_order_stats(db))
