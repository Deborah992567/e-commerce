import pytest
from faker import Faker

fake = Faker()

@pytest.mark.integration
class TestAuthAPI:
    def test_register_user(self, client):
        """Test user registration"""
        user_data = {
            "email": fake.email(),
            "password": "Password123"
        }

        response = client.post("/auth/register", json=user_data)
        assert response.status_code == 200
        assert "message" in response.json()

    def test_register_duplicate_email(self, client):
        """Test registering with duplicate email"""
        user_data = {
            "email": "duplicate@example.com",
            "password": "Password123"
        }

        # First registration
        response1 = client.post("/auth/register", json=user_data)
        assert response1.status_code == 200

        # Second registration with same email
        response2 = client.post("/auth/register", json=user_data)
        assert response2.status_code == 400  # Should fail due to unique constraint

    def test_login_valid_credentials(self, client):
        """Test login with valid credentials"""
        user_data = {
            "email": fake.email(),
            "password": "Password123"
        }

        # Register first
        client.post("/auth/register", json=user_data)

        # Login
        login_data = {
            "email": user_data["email"],
            "password": user_data["password"]
        }
        response = client.post("/auth/login", json=login_data)
        assert response.status_code == 200
        assert "access_token" in response.json()
        assert "token_type" in response.json()

    def test_login_invalid_credentials(self, client):
        """Test login with invalid credentials"""
        login_data = {
            "email": "nonexistent@example.com",
            "password": "wrongpassword"
        }

        response = client.post("/auth/login", json=login_data)
        assert response.status_code == 401
        assert "Invalid credentials" in response.json()["detail"]

    def test_register_weak_password(self, client):
        """Test registration with weak password"""
        user_data = {
            "email": fake.email(),
            "password": "weak"
        }

        response = client.post("/auth/register", json=user_data)
        assert response.status_code == 422  # Validation error