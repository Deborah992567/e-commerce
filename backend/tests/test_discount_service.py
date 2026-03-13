import pytest
from app.services.discount_service import validate_discount
from app.models.discount import Discount
from datetime import datetime, timedelta

@pytest.mark.unit
class TestDiscountService:
    def test_validate_valid_discount(self, db_session):
        """Test validating a valid discount"""
        # Create test discount
        discount = Discount(
            code="TEST10",
            percentage=10.0,
            is_active=True,
            max_uses=100,
            uses=0,
            expires_at=datetime.utcnow() + timedelta(days=1)
        )
        db_session.add(discount)
        db_session.commit()

        # Validate discount
        result = validate_discount("TEST10", 100.0, db_session)
        assert result.id == discount.id
        assert result.percentage == 10.0

    def test_validate_invalid_discount_code(self, db_session):
        """Test validating non-existent discount code"""
        with pytest.raises(Exception) as exc_info:
            validate_discount("INVALID", 100.0, db_session)
        assert "Invalid discount code" in str(exc_info.value)

    def test_validate_expired_discount(self, db_session):
        """Test validating expired discount"""
        # Create expired discount
        discount = Discount(
            code="EXPIRED",
            percentage=15.0,
            is_active=True,
            max_uses=100,
            uses=0,
            expires_at=datetime.utcnow() - timedelta(days=1)  # Expired
        )
        db_session.add(discount)
        db_session.commit()

        with pytest.raises(Exception) as exc_info:
            validate_discount("EXPIRED", 100.0, db_session)
        assert "expired" in str(exc_info.value).lower()

    def test_validate_inactive_discount(self, db_session):
        """Test validating inactive discount"""
        # Create inactive discount
        discount = Discount(
            code="INACTIVE",
            percentage=20.0,
            is_active=False,
            max_uses=100,
            uses=0
        )
        db_session.add(discount)
        db_session.commit()

        with pytest.raises(Exception) as exc_info:
            validate_discount("INACTIVE", 100.0, db_session)
        assert "Invalid discount code" in str(exc_info.value)