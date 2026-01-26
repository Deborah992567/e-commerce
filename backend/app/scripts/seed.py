from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.user import User
from app.models.product import Product
from passlib.context import CryptContext

pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

db: Session = SessionLocal()

admin = User(
    email="admin@store.com",
    password=pwd.hash("admin123"),
    role="admin"
)

perfume = Product(
    name="Oud Royale",
    price=45000,
    category="perfume",
    image_url="https://cloudinary.com/oud.jpg"
)

jewel = Product(
    name="Diamond Chain",
    price=120000,
    category="jewellery",
    image_url="https://cloudinary.com/chain.jpg"
)

db.add_all([admin, perfume, jewel])
db.commit()
db.close()
