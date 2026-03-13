import pytest
from faker import Faker
from app.models.discount import Discount
from app.models.user import User
from app.core.security import get_password_hash

fake = Faker()

@pytest.mark.integration
class TestDiscountsAPI:
    def get_admin_token(self, client, db_session):
        """Helper to get admin authentication token"""
        # Create admin user
        admin = User(
            email="admin@example.com",
            password=get_password_hash("AdminPass123"),
            role="admin"
        )
        db_session.add(admin)
        db_session.commit()

        # Login to get token
        login_data = {
            "email": "admin@example.com",
            "password": "AdminPass123"
        }
        response = client.post("/auth/login", json=login_data)
        return response.json()["access_token"]

    def test_list_discounts(self, client, db_session):
        """Test listing discounts"""
        # Create test discounts
        discount1 = Discount(
            code="DISC10",
            percentage=10.0,
            is_active=True,
            max_uses=100,
            uses=5
        )
        discount2 = Discount(
            code="DISC20",
            percentage=20.0,
            is_active=False,
            max_uses=50,
            uses=25
        )
        db_session.add_all([discount1, discount2])
        db_session.commit()

        response = client.get("/discounts/")
        assert response.status_code == 200
        discounts = response.json()
        assert len(discounts) == 2

    def test_create_discount_admin(self, client, db_session):
        """Test creating discount as admin"""
        token = self.get_admin_token(client, db_session)

        discount_data = {
            "code": "NEW15",
            "percentage": 15.0,
            "max_uses": 200
        }

        response = client.post(
            "/discounts/",
            json=discount_data,
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["code"] == "NEW15"
        assert data["percentage"] == 15.0

    def test_create_discount_non_admin(self, client):
        """Test creating discount as non-admin user"""
        # Create regular user
        user_data = {
            "email": "regular@example.com",
            "password": "Password123"
        }
        client.post("/auth/register", json=user_data)

        # Login
        login_response = client.post("/auth/login", json=user_data)
        token = login_response.json()["access_token"]

        discount_data = {
            "code": "UNAUTHORIZED",
            "percentage": 10.0
        }

        response = client.post(
            "/discounts/",
            json=discount_data,
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 403  # Forbidden

    def test_get_discount_by_id(self, client, db_session):
        """Test getting specific discount"""
        discount = Discount(
            code="SPECIFIC",
            percentage=25.0,
            is_active=True,
            max_uses=10,
            uses=0
        )
        db_session.add(discount)
        db_session.commit()

        response = client.get(f"/discounts/{discount.id}")
        assert response.status_code == 200
        data = response.json()
        assert data["code"] == "SPECIFIC"
        assert data["percentage"] == 25.0

    def test_update_discount(self, client, db_session):
        """Test updating discount"""
        # Create discount
        discount = Discount(
            code="UPDATE",
            percentage=10.0,
            is_active=True,
            max_uses=100,
            uses=0
        )
        db_session.add(discount)
        db_session.commit()

        token = self.get_admin_token(client, db_session)

        update_data = {
            "percentage": 15.0,
            "is_active": False
        }

        response = client.put(
            f"/discounts/{discount.id}",
            json=update_data,
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["percentage"] == 15.0
        assert data["is_active"] == False

    def test_delete_discount(self, client, db_session):
        """Test deleting discount"""
        # Create discount
        discount = Discount(
            code="DELETE",
            percentage=5.0,
            is_active=True,
            max_uses=50,
            uses=0
        )
        db_session.add(discount)
        db_session.commit()

        token = self.get_admin_token(client, db_session)

        response = client.delete(
            f"/discounts/{discount.id}",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 200
        assert "deleted" in response.json()["message"].lower()

        # Verify deletion
        response = client.get(f"/discounts/{discount.id}")
        assert response.status_code == 404