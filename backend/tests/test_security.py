import pytest
from app.core.security import verify_password, get_password_hash, create_access_token
from app.schemas.user import UserCreate
from pydantic import ValidationError

class TestSecurity:
    def test_password_hashing(self):
        """Test password hashing and verification"""
        password = "testpassword123"
        hashed = get_password_hash(password)

        assert hashed != password
        assert verify_password(password, hashed)
        assert not verify_password("wrongpassword", hashed)

    def test_create_access_token(self):
        """Test JWT token creation"""
        data = {"sub": "test_user"}
        token = create_access_token(data)

        assert isinstance(token, str)
        assert len(token) > 0

    def test_create_access_token_with_expiry(self):
        """Test JWT token creation with custom expiry"""
        from datetime import timedelta
        data = {"sub": "test_user"}
        token = create_access_token(data, expires_delta=timedelta(hours=1))

        assert isinstance(token, str)

class TestUserSchemas:
    def test_valid_user_create(self):
        """Test valid user creation schema"""
        user_data = {
            "email": "test@example.com",
            "password": "Password123"
        }
        user = UserCreate(**user_data)
        assert user.email == "test@example.com"
        assert user.password == "Password123"

    def test_invalid_email(self):
        """Test invalid email validation"""
        with pytest.raises(ValidationError):
            UserCreate(email="invalid-email", password="Password123")

    def test_weak_password(self):
        """Test password strength validation"""
        # Missing uppercase
        with pytest.raises(ValidationError, match="Password must contain at least one uppercase letter"):
            UserCreate(email="test@example.com", password="password123")

        # Missing lowercase
        with pytest.raises(ValidationError, match="Password must contain at least one lowercase letter"):
            UserCreate(email="test@example.com", password="PASSWORD123")

        # Missing digit
        with pytest.raises(ValidationError, match="Password must contain at least one digit"):
            UserCreate(email="test@example.com", password="Password")

        # Too short
        with pytest.raises(ValidationError):
            UserCreate(email="test@example.com", password="Pass1")