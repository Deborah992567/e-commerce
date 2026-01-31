from celery import Celery
import celery
from app.core.config import settings

celery_app = Celery(
    "worker",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
    include=[
        "app.services.email_service",
        "app.services.analytics_service"
    ]
)

celery_app.conf.update(
    task_track_started=True,
    task_time_limit=30,
)

@celery.task
def refresh_order_stats():
    from app.dependencies.database import get_db
    from app.services.analytics_service import compute_order_stats

    db = next(get_db())
    import asyncio
    asyncio.run(compute_order_stats(db))
