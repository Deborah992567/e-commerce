from loguru import logger
import sys
from app.core.config import settings

logger.remove()

# Console logging
logger.add(
    sys.stdout,
    level="DEBUG" if settings.ENV == "development" else "INFO",
    format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {message}"
)

# File logging
logger.add(
    "logs/app.log",
    rotation="10 MB",
    retention="7 days",
    level="INFO",
    compression="zip"
)
