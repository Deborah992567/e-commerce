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

    # Email / mail configuration (FastMail)
    MAIL_USERNAME: str = ""
    MAIL_PASSWORD: str = ""
    MAIL_FROM: str = "noreply@dezcollection.com"
    MAIL_PORT: int = 587
    MAIL_SERVER: str = "smtp.gmail.com"
    MAIL_TLS: bool = True
    MAIL_SSL: bool = False
    MAIL_STARTTLS: bool = True
    MAIL_USE_CREDENTIALS: bool = True
    MAIL_VALIDATE_CERTS: bool = True

    @property
    def MAIL_CONFIG(self):
        return {
            "MAIL_USERNAME": self.MAIL_USERNAME,
            "MAIL_PASSWORD": self.MAIL_PASSWORD,
            "MAIL_FROM": self.MAIL_FROM,
            "MAIL_PORT": self.MAIL_PORT,
            "MAIL_SERVER": self.MAIL_SERVER,
            "MAIL_TLS": self.MAIL_TLS,
            "MAIL_SSL": self.MAIL_SSL,
            "MAIL_STARTTLS": self.MAIL_STARTTLS,
            "MAIL_USE_CREDENTIALS": self.MAIL_USE_CREDENTIALS,
            "MAIL_VALIDATE_CERTS": self.MAIL_VALIDATE_CERTS,
        }

    class Config:
        env_file = ".env"

settings = Settings()
