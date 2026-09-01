from fastapi_mail import FastMail, MessageSchema
from app.core.config import settings
from app.core.celery_app import celery_app


def build_mailer() -> FastMail:
    return FastMail(settings.MAIL_CONFIG)


@celery_app.task
def send_order_email(user_email: str, order_id: int):
    message = MessageSchema(
        subject=f"Order {order_id} Confirmed — Dez Collection",
        recipients=[user_email],
        body=f"<p>Your order <b>#{order_id}</b> has been placed successfully!</p>"
              f"<p>Thank you for shopping with Dez Collection.</p>",
        subtype="html"
    )

    # If mail credentials are not configured, log and skip instead of crashing.
    if not settings.MAIL_USERNAME:
        print(f"[email] Skipping email send for order {order_id} (mail not configured)")
        return

    try:
        fm = build_mailer()
        import asyncio
        asyncio.run(fm.send_message(message))
    except Exception as exc:  # pragma: no cover - depends on SMTP availability
        print(f"[email] Failed to send email for order {order_id}: {exc}")
