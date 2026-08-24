from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_host: str

    class Config:
        env_file = ".env"


settings = Settings()