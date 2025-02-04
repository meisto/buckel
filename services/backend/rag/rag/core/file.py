# author: meisto
# date: 2025-02-03 23:05:22
"""File methods."""

from pathlib import Path
import hashlib

from sqlmodel import Session, select

from rag.core.db import engine
from rag.schemas.files import FileInfo


def _get_file_hash(file_path: Path) -> str:
    """Calculates the hash of file content."""

    return hashlib.md5(file_path.read_bytes()).hexdigest()


def is_current(file_path: Path):
    """Check if a file is current."""

    with Session(engine) as session:
        statement = select(FileInfo).where(FileInfo.path == str(file_path))
        result = session.exec(statement)

    return result.one_or_none() is None
