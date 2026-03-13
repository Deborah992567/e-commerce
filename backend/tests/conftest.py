import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from app.core.database import Base
from app.core.config import settings
import redis
import fakeredis

# Test database URL
TEST_DATABASE_URL = "sqlite:///./test.db"

@pytest.fixture(scope="session")
def engine():
    """Create test database engine"""
    test_engine = create_engine(
        TEST_DATABASE_URL,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(bind=test_engine)
    yield test_engine
    Base.metadata.drop_all(bind=test_engine)

@pytest.fixture(scope="function")
def db_session(engine):
    """Create test database session"""
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    session = SessionLocal()
    try:
        yield session
    finally:
        session.rollback()
        session.close()

@pytest.fixture(scope="session")
def redis_client():
    """Create fake Redis client for testing"""
    fake_redis = fakeredis.FakeRedis()
    yield fake_redis
    fake_redis.flushall()

@pytest.fixture
def client():
    """Create test client"""
    from fastapi.testclient import TestClient
    from app.main import app

    # Override settings for testing
    settings.DATABASE_URL = TEST_DATABASE_URL

    with TestClient(app) as test_client:
        yield test_client