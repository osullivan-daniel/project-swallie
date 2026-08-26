from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_host: str
    redis_host: str

    @property
    def redis_uri(self) -> str:
        return f"redis://{self.redis_host}:6379"

    class Config:
        env_file = ".env"


settings = Settings()