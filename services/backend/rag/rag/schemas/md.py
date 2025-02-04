# author: meisto
# date: 2025-02-03 21:39:39
"""Mardown schemes."""

from typing import List, Optional
from pydantic import BaseModel


class MarkdownFrontmatter(BaseModel):
    """Markdown frontmatter."""

    aliases: Optional[List[str]]
    name: str


class Markdown(BaseModel):
    """Markdown."""

    frontmatter: Optional[MarkdownFrontmatter]
    content: str
