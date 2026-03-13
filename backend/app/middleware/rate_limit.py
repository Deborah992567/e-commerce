from fastapi import Request, HTTPException, status
from app.core.redis import redis_client

async def rate_limit_middleware(request: Request, call_next):
    ip = request.client.host
    key = f"rate:ip:{ip}"

    current = redis_client.get(key)
    if current and int(current) >= 100:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit exceeded"
        )

    pipe = redis_client.pipeline()
    pipe.incr(key, 1)
    pipe.expire(key, 60)
    pipe.execute()

    return await call_next(request)
