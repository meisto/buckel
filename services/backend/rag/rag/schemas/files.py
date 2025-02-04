# author: meisto
# date: 2025-02-03 22:50:46

from typing import Optional
from sqlmodel import Field, SQLModel


class FileInfo(SQLModel, table=True):
    """Represents a file info table."""

    id: Optional[int] = Field(default=None, primary_key=True)
    path: str

    last_updated: int
