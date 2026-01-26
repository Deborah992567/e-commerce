from app.core.celery_app import celery_app
from app.services.email_service import send_order_email

@celery_app.task
def send_order_receipt(order_id: int, user_email: str):
    send_order_email(order_id, user_email)
