import pytest
from app.services.order_service import calculate_order_total
from app.models.product import Product
from app.models.discount import Discount

@pytest.mark.unit
class TestOrderService:
    def test_calculate_order_total_without_discount(self, db_session):
        """Test calculating order total without discount"""
        # Create test products
        product1 = Product(name="Test Product 1", price=50.0, description="Test", stock=10)
        product2 = Product(name="Test Product 2", price=30.0, description="Test", stock=10)
        db_session.add_all([product1, product2])
        db_session.commit()

        # Calculate total
        product_ids = [product1.id, product2.id]
        quantities = [2, 1]
        total = calculate_order_total(product_ids, quantities, None, db_session)

        expected_total = (50.0 * 2) + (30.0 * 1)  # 130.0
        assert total == expected_total

    def test_calculate_order_total_with_discount(self, db_session):
        """Test calculating order total with discount"""
        # Create test products
        product = Product(name="Test Product", price=100.0, description="Test", stock=10)
        db_session.add(product)

        # Create test discount
        discount = Discount(
            code="SAVE10",
            percentage=10.0,
            is_active=True,
            max_uses=100,
            uses=0
        )
        db_session.add(discount)
        db_session.commit()

        # Calculate total with discount
        product_ids = [product.id]
        quantities = [1]
        total = calculate_order_total(product_ids, quantities, "SAVE10", db_session)

        expected_total = 100.0 * 0.9  # 90.0 (10% discount)
        assert total == expected_total

    def test_calculate_order_total_mismatched_lengths(self, db_session):
        """Test error when product_ids and quantities have different lengths"""
        with pytest.raises(ValueError):
            calculate_order_total([1, 2], [1], None, db_session)

    def test_calculate_order_total_invalid_product(self, db_session):
        """Test error when product doesn't exist"""
        with pytest.raises(Exception):  # Should raise SQLAlchemy error
            calculate_order_total([999], [1], None, db_session)