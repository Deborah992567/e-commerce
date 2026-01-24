from fastapi import Request, HTTPException, status
from app.core.redis import redis

async def rate_limit_middleware(request: Request, call_next):
    ip = request.client.host
    key = f"global_rate:{ip}"

    current = await redis.get(key)
    if current and int(current) >= 100:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Global rate limit exceeded"
        )

    pipe = redis.pipeline()
    pipe.incr(key, 1)
    pipe.expire(key, 60)
    await pipe.execute()

    return await call_next(request)
