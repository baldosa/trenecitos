from sqlmodel import SQLModel, create_engine, Field, Session
from dotenv import load_dotenv
import os

load_dotenv()

print(os.environ.get("DB_PASSWORD"))


sqlite_file_name = "database.db"
DATABASE_URL = f"sqlite:///{sqlite_file_name}"


engine = create_engine(DATABASE_URL)


def create_metadata():
    SQLModel.metadata.create_all(engine)


def get_session():
    session = Session(engine)
    try:
        yield session
    finally:
        session.close()
