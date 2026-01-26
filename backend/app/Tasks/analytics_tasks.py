from app.core.celery_app import celery_app
from app.services.analytics_service import cache_order_stats

@celery_app.task
def cache_analytics():
    cache_order_stats()
