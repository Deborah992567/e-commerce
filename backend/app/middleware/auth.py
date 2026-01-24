from fastapi import Request, HTTPException, status

async def admin_guard(request: Request, call_next):
    user = getattr(request.state, "user", None)

    if user and user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )

    return await call_next(request)
