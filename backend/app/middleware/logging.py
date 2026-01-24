from fastapi import Request
from time import time
from app.core.logger import logger

async def logging_middleware(request: Request, call_next):
    start_time = time()

    response = await call_next(request)

    duration = round(time() - start_time, 4)

    logger.info(
        f"{request.method} {request.url.path} "
        f"| {response.status_code} "
        f"| {duration}s"
    )

    return response
