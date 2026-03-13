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

    class Config:
        env_file = ".env"

settings = Settings()
