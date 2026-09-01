from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.user import User, Profile
from app.models.product import Product
from app.models.product_image import ProductImage
from app.models.category import Category
from passlib.context import CryptContext

pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

db: Session = SessionLocal()

# Create / find categories
perfume_cat = db.query(Category).filter(Category.name == "perfume").first()
if not perfume_cat:
    perfume_cat = Category(name="perfume")
    db.add(perfume_cat)

jewel_cat = db.query(Category).filter(Category.name == "jewellery").first()
if not jewel_cat:
    jewel_cat = Category(name="jewellery")
    db.add(jewel_cat)

db.flush()

admin = User(
    email="admin@store.com",
    password=pwd.hash("admin123"),
    role="admin",
    is_admin=True,
)
db.add(admin)
db.flush()
db.add(Profile(user_id=admin.id, full_name="Store Admin"))

perfume = Product(
    name="Oud Royale",
    description="A rich, long-lasting oud fragrance.",
    price=45000,
    stock=20,
    category_id=perfume_cat.id,
)
db.add(perfume)
db.flush()

jewel = Product(
    name="Diamond Chain",
    description="Elegant 18k gold plated diamond chain.",
    price=120000,
    stock=10,
    category_id=jewel_cat.id,
)
db.add(jewel)
db.flush()

db.add_all([
    ProductImage(product_id=perfume.id, url="https://cloudinary.com/oud.jpg"),
    ProductImage(product_id=jewel.id, url="https://cloudinary.com/chain.jpg"),
])

db.commit()
db.close()
