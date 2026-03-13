from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    ENV: str
    DATABASE_URL: str
    JWT_SECRET: str
    REDIS_URL: str
    CLOUDINARY_CLOUD_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str
    CELERY_BROKER_URL: str
    CELERY_RESULT_BACKEND: str
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://localhost:8081"  # Default for dev

    class Config:
        env_file = ".env"

settings = Settings()
