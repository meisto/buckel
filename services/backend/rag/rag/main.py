# author: meisto
# date: 2025-02-03 19:10:28
"""Main function."""
import logging

from fastapi import FastAPI
import uvicorn

from rag.api.v1 import api_router
from rag.core.archive import run
from rag.core.config import config
from rag.core.log import logger


def main():
    """Main function."""
    logger.setLevel(logging.DEBUG)

    run()

    app = FastAPI()
    app.include_router(api_router)

    uvicorn.run(app, host=config.hostname, port=config.port)
