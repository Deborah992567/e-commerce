from fastapi_mail import FastMail, MessageSchema
from app.core.config import settings
from app.core.celery_app import celery_app

@celery_app.task
async def send_order_email(order_id: int, user_email: str):
    message = MessageSchema(
        subject="Order Receipt",
        recipients=[user_email],
        body=f"Your order {order_id} has been placed successfully!",
        subtype="html"
    )

    fm = FastMail(settings.MAIL_CONFIG)
    await fm.send_message(message)
