import pytest
from faker import Faker
from app.models.product import Product
from app.models.user import User
from app.core.security import get_password_hash

fake = Faker()

@pytest.mark.integration
class TestOrdersAPI:
    def get_auth_token(self, client, email="test@example.com"):
        """Helper to get authentication token"""
        # Create test user if not exists
        user_data = {
            "email": email,
            "password": "Password123"
        }
        client.post("/auth/register", json=user_data)

        # Login to get token
        login_response = client.post("/auth/login", json=user_data)
        return login_response.json()["access_token"]

    def test_create_order_unauthenticated(self, client):
        """Test creating order without authentication"""
        order_data = {
            "product_ids": [1],
            "quantities": [1]
        }
        response = client.post("/orders/", json=order_data)
        assert response.status_code == 401

    def test_create_order_authenticated(self, client, db_session):
        """Test creating order with authentication"""
        # Create test product
        product = Product(
            name="Test Product",
            price=25.99,
            description="Test product for ordering",
            stock=10
        )
        db_session.add(product)
        db_session.commit()

        # Get auth token
        token = self.get_auth_token(client)

        # Create order
        order_data = {
            "product_ids": [product.id],
            "quantities": [2]
        }
        response = client.post(
            "/orders/",
            json=order_data,
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "order_id" in data
        assert "total" in data
        assert data["total"] == 51.98  # 25.99 * 2

    def test_create_order_with_discount(self, client, db_session):
        """Test creating order with discount"""
        from app.models.discount import Discount

        # Create test product
        product = Product(
            name="Discount Product",
            price=100.0,
            description="Product with discount",
            stock=5
        )
        db_session.add(product)

        # Create test discount
        discount = Discount(
            code="SAVE20",
            percentage=20.0,
            is_active=True,
            max_uses=10,
            uses=0
        )
        db_session.add(discount)
        db_session.commit()

        # Get auth token
        token = self.get_auth_token(client, "discount@example.com")

        # Create order with discount
        order_data = {
            "product_ids": [product.id],
            "quantities": [1],
            "discount_code": "SAVE20"
        }
        response = client.post(
            "/orders/",
            json=order_data,
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["total"] == 80.0  # 100 * 0.8

    def test_create_order_invalid_data(self, client):
        """Test creating order with invalid data"""
        token = self.get_auth_token(client, "invalid@example.com")

        # Mismatched array lengths
        order_data = {
            "product_ids": [1, 2],
            "quantities": [1]
        }
        response = client.post(
            "/orders/",
            json=order_data,
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 400

        # Negative quantity
        order_data = {
            "product_ids": [1],
            "quantities": [-1]
        }
        response = client.post(
            "/orders/",
            json=order_data,
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 400

    def test_track_order(self, client, db_session):
        """Test tracking an order"""
        from app.models.order import Order

        # Create test user
        user = User(
            email="track@example.com",
            password=get_password_hash("Password123")
        )
        db_session.add(user)
        db_session.commit()

        # Create test order
        order = Order(user_id=user.id, total_amount=50.0)
        db_session.add(order)
        db_session.commit()

        # Get auth token
        token = self.get_auth_token(client, "track@example.com")

        # Track order
        response = client.get(
            f"/orders/track/{order.id}",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 200
        # Should return order details

    def test_track_order_not_owned(self, client, db_session):
        """Test tracking order that doesn't belong to user"""
        from app.models.order import Order

        # Create two users
        user1 = User(email="user1@example.com", password=get_password_hash("Password123"))
        user2 = User(email="user2@example.com", password=get_password_hash("Password123"))
        db_session.add_all([user1, user2])
        db_session.commit()

        # Create order for user1
        order = Order(user_id=user1.id, total_amount=30.0)
        db_session.add(order)
        db_session.commit()

        # Get token for user2
        token = self.get_auth_token(client, "user2@example.com")

        # Try to track user1's order
        response = client.get(
            f"/orders/track/{order.id}",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 404  # Should not find order