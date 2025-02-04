# author: meisto
# date: 2025-02-03 19:40:26
"""Main router that is included by the app and that contains all subrouters."""

from fastapi import APIRouter

api_router = APIRouter(prefix="/api/v1")
