from ..settings import settings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

HOST = settings.database_host

DATABASE_URL = (
    f"postgresql+psycopg://swallie:swallie_dev@{HOST}:5432/swallie"
)

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()