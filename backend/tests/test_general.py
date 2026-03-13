import pytest

@pytest.mark.integration
class TestHealthAPI:
    def test_health_check(self, client):
        """Test health check endpoint"""
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "healthy"}

@pytest.mark.integration
class TestSecurityHeaders:
    def test_security_headers_present(self, client):
        """Test that security headers are present in responses"""
        response = client.get("/health")

        # Check security headers
        assert "X-Content-Type-Options" in response.headers
        assert response.headers["X-Content-Type-Options"] == "nosniff"

        assert "X-Frame-Options" in response.headers
        assert response.headers["X-Frame-Options"] == "DENY"

        assert "X-XSS-Protection" in response.headers
        assert response.headers["X-XSS-Protection"] == "1; mode=block"

        assert "Strict-Transport-Security" in response.headers
        assert "max-age=31536000" in response.headers["Strict-Transport-Security"]

        assert "Content-Security-Policy" in response.headers
        assert response.headers["Content-Security-Policy"] == "default-src 'self'"

@pytest.mark.integration
class TestErrorHandling:
    def test_404_error_format(self, client):
        """Test that 404 errors have consistent format"""
        response = client.get("/nonexistent-endpoint")
        assert response.status_code == 404

        error_data = response.json()
        assert "detail" in error_data
        assert error_data["detail"] == "Not Found"

    def test_validation_error_format(self, client):
        """Test that validation errors have consistent format"""
        # Try to register with invalid data
        invalid_data = {"email": "invalid-email", "password": "short"}
        response = client.post("/auth/register", json=invalid_data)
        assert response.status_code == 422

        error_data = response.json()
        assert "detail" in error_data