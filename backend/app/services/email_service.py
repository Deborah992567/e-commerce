from fastapi_mail import FastMail, MessageSchema
from app.core.config import settings
from app.core.celery_app import celery_app

@celery_app.task
def send_order_email(user_email: str, order_id: int):
    message = MessageSchema(
        subject="Order Receipt",
        recipients=[user_email],
        body=f"Your order {order_id} has been placed successfully!",
        subtype="html"
    )

    fm = FastMail(settings.MAIL_CONFIG)
    # Note: In a real implementation, this would be async, but for simplicity we're making it sync
    # For production, you'd want to use async email sending
    import asyncio
    asyncio.run(fm.send_message(message))
