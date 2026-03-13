import pytest
from faker import Faker
from app.models.product import Product

fake = Faker()

@pytest.mark.integration
class TestProductsAPI:
    def test_list_products_empty(self, client):
        """Test listing products when none exist"""
        response = client.get("/products/")
        assert response.status_code == 200
        assert response.json() == []

    def test_list_products_with_data(self, client, db_session):
        """Test listing products with data"""
        # Create test products
        product1 = Product(
            name="Test Product 1",
            price=29.99,
            description="Test description 1",
            stock=10
        )
        product2 = Product(
            name="Test Product 2",
            price=49.99,
            description="Test description 2",
            stock=5
        )
        db_session.add_all([product1, product2])
        db_session.commit()

        response = client.get("/products/")
        assert response.status_code == 200
        products = response.json()
        assert len(products) == 2
        assert products[0]["name"] == "Test Product 1"
        assert products[1]["name"] == "Test Product 2"

    def test_get_product_by_id(self, client, db_session):
        """Test getting a specific product"""
        product = Product(
            name="Specific Product",
            price=19.99,
            description="Specific description",
            stock=8
        )
        db_session.add(product)
        db_session.commit()

        response = client.get(f"/products/{product.id}")
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "Specific Product"
        assert data["price"] == 19.99

    def test_get_nonexistent_product(self, client):
        """Test getting a product that doesn't exist"""
        response = client.get("/products/999")
        assert response.status_code == 404
        assert "not found" in response.json()["detail"].lower()

    def test_search_products(self, client, db_session):
        """Test searching products by name"""
        product1 = Product(
            name="Apple iPhone",
            price=999.99,
            description="Smartphone",
            stock=5
        )
        product2 = Product(
            name="Samsung Galaxy",
            price=799.99,
            description="Android phone",
            stock=3
        )
        db_session.add_all([product1, product2])
        db_session.commit()

        # Search for iPhone
        response = client.get("/products/?q=iPhone")
        assert response.status_code == 200
        products = response.json()
        assert len(products) == 1
        assert products[0]["name"] == "Apple iPhone"

    def test_filter_products_by_price(self, client, db_session):
        """Test filtering products by price range"""
        product1 = Product(name="Cheap Product", price=10.0, description="Cheap", stock=10)
        product2 = Product(name="Medium Product", price=50.0, description="Medium", stock=10)
        product3 = Product(name="Expensive Product", price=100.0, description="Expensive", stock=10)
        db_session.add_all([product1, product2, product3])
        db_session.commit()

        # Filter by min price
        response = client.get("/products/?min_price=40")
        assert response.status_code == 200
        products = response.json()
        assert len(products) == 2  # Medium and expensive

        # Filter by max price
        response = client.get("/products/?max_price=60")
        assert response.status_code == 200
        products = response.json()
        assert len(products) == 2  # Cheap and medium