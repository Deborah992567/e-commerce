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
def client(redis_client, engine):
    """Create test client"""
    from fastapi.testclient import TestClient
    from app.main import app
    from app.middleware import rate_limit
    from app.core import database
    from sqlalchemy.orm import sessionmaker

    # Override settings for testing
    settings.DATABASE_URL = TEST_DATABASE_URL
    
    # Create test session maker
    TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    
    # Override database functions
    original_get_db = database.get_db
    original_engine = database.engine
    original_SessionLocal = database.SessionLocal
    
    database.engine = engine
    database.SessionLocal = TestSessionLocal
    
    def test_get_db():
        db = TestSessionLocal()
        try:
            yield db
        finally:
            db.close()
    
    database.get_db = test_get_db
    
    # Override redis_client in middleware
    original_redis_client = rate_limit.redis_client
    rate_limit.redis_client = redis_client
    
    # Override redis_client in analytics service
    from app.services import analytics_service
    original_analytics_redis = analytics_service.redis_client
    analytics_service.redis_client = redis_client
    
    with TestClient(app) as test_client:
        yield test_client
    
    # Restore originals
    database.get_db = original_get_db
    database.engine = original_engine
    database.SessionLocal = original_SessionLocal
    rate_limit.redis_client = original_redis_client
    analytics_service.redis_client = original_analytics_redis