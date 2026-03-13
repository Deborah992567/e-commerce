from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    ENV: str
    DATABASE_URL: str
    JWT_SECRET: str
    REDIS_URL: str

    class Config:
        env_file = ".env"

settings = Settings()
