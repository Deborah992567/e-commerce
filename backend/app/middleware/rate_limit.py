from fastapi import Request, HTTPException, status, Depends
from app.core.redis import redis_client
from app.dependencies.auth import get_current_user_optional

async def rate_limit_middleware(request: Request, call_next):
    # Get IP
    ip = request.client.host
    key_ip = f"rate:ip:{ip}"
    
    # Get user if authenticated
    user = None
    try:
        user = await get_current_user_optional(request)
    except:
        pass
    
    key_user = f"rate:user:{user.id}" if user else None

    # Check limits
    if redis_client.get(key_ip) and int(redis_client.get(key_ip)) >= 100:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="IP rate limit exceeded"
        )
    
    if key_user and redis_client.get(key_user) and int(redis_client.get(key_user)) >= 50:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="User rate limit exceeded"
        )

    # Increment
    pipe = redis_client.pipeline()
    pipe.incr(key_ip, 1)
    pipe.expire(key_ip, 60)
    if key_user:
        pipe.incr(key_user, 1)
        pipe.expire(key_user, 60)
    pipe.execute()

    return await call_next(request)
