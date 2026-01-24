import aioredis
from app.core.config import settings

redis = aioredis.from_url(
    settings.REDIS_URL,
    decode_responses=True
)
