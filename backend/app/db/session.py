from sqlmodel import Session, SQLModel, create_engine
from sqlalchemy.engine import Engine
from ..core.config import settings

def _normalize_db_url(url: str) -> str:
    # Railway sometimes provides postgres:// which SQLAlchemy wants as postgresql://
    if url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql://", 1)
    return url

DATABASE_URL = _normalize_db_url(settings.DATABASE_URL)

engine: Engine = create_engine(DATABASE_URL, pool_pre_ping=True) if DATABASE_URL else None  # type: ignore

def init_db() -> None:
    if engine is None:
        raise RuntimeError("DATABASE_URL is not set")
    SQLModel.metadata.create_all(engine)

def get_session():
    if engine is None:
        raise RuntimeError("DATABASE_URL is not set")
    with Session(engine) as session:
        yield session
