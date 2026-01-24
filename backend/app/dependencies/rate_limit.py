from fastapi import Request, HTTPException, status
from app.core.redis import redis

async def rate_limiter(
    request: Request,
    limit: int = 20,
    window: int = 60
):
    ip = request.client.host
    key = f"rate:{ip}"

    current = await redis.get(key)
    if current and int(current) >= limit:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests, slow down"
        )

    pipe = redis.pipeline()
    pipe.incr(key, 1)
    pipe.expire(key, window)
    await pipe.execute()
