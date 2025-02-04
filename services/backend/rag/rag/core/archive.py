# author: meisto
# date: 2025-02-03 23:18:34
"""Functions to load batch data from an archive."""

from glob import glob
from pathlib import Path
from os.path import join as pjoin
from typing import List

from rag.core.config import config
from rag.core.exceptions import IllegalArgumentException
from rag.core.log import logger
from rag.core.markdown_parser import chunk_text, extract_frontmatter, read_markdown_file
from rag.core.chroma import collection


def load_archive(base_path: Path) -> List[Path]:
    """Load all markdown files in a given path."""

    if not base_path.is_dir():
        raise IllegalArgumentException("Archive dir could not be found.")

    return [Path(x) for x in glob(pjoin(base_path, "**", "*.md"), recursive=True)]


def run():
    """Set up the archive."""

    try:
        files = load_archive(Path(config.archive_path))

        logger.info(f"Loaded {len(files)} markdown files.")

        for file in files:
            content = read_markdown_file(file)
            _, content = extract_frontmatter(content)

            chunks: List[str] = chunk_text(content)

            collection.add(
                documents=chunks,
                ids=[f"{str(file)}_{i:>5}" for i in range(len(chunks))],
            )

    except IllegalArgumentException:
        logger.error("Could not load archive.")
