# author: meisto
# date: 2025-02-03 21:15:33
"""Split markdown to chunks."""

from pathlib import Path
import re
from typing import Any, Optional, Tuple

import yaml

from rag.schemas.md import Markdown, MarkdownFrontmatter


def read_markdown_file(file_path: Path):
    """TODO"""
    return file_path.read_text()


def chunk_text(text: str, max_chunk_size: int = 500):
    """TODO"""

    paragraphs = text.split("\n\n")

    chunks = []

    current_size = 0
    active_chunks = []

    for paragraph in paragraphs:

        # Handle very large paragraphs
        if len(paragraph) > max_chunk_size:
            chunks.append("\n\n".join(active_chunks))
            chunks.append(paragraph)

            active_chunks = []
            current_size = 0

        # Split into chunks w.o. overlap
        if current_size + len(paragraph) + 2 <= max_chunk_size:
            active_chunks.append(paragraph)
            current_size += len(paragraph) + 2
            continue

        chunks.append("\n\n".join(active_chunks))
        active_chunks = [paragraph]
        current_size = 0

    if active_chunks:
        chunks.append("\n\n".join(active_chunks))

    return chunks


def parse_markdown(file_path: Path) -> Markdown:
    """Takes a file path and returns a Markdown object."""

    fm, content = extract_frontmatter(file_path.read_text())

    fm = MarkdownFrontmatter(**fm) if fm is not None else None

    return Markdown(frontmatter=fm, content=content)


def extract_frontmatter(content: str) -> Tuple[Optional[Any], str]:
    """
    Extract the frontmatter from the text. Return both the frontmatter and the remaining
    content.
    """
    m = re.match("^---+\n(.*\n)*---+(\n)?", content)

    if m is None:
        return (None, content)

    fm_raw = m[0].replace("---\n", "")

    return (yaml.safe_load(fm_raw), content[len(m[0]) :])
