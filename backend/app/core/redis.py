import aioredis
from app.core.config import settings

redis_client = aioredis.from_url(settings.REDIS_URL, encoding="utf-8", decode_responses=True)
