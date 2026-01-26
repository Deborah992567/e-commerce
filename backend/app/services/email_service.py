from fastapi import BackgroundTasks
from app.core.logger import logger

def send_order_email(
    background_tasks: BackgroundTasks,
    email: str,
    order_id: int
):
    background_tasks.add_task(_send_email, email, order_id)

def _send_email(email: str, order_id: int):
    # Replace with SMTP / SendGrid later
    logger.info(f"Email sent to {email} for order #{order_id}")
