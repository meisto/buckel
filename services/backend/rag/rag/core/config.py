# author: meisto
# date: 2025-02-03 19:16:42
"""Contains functions and classes for config management."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class _Config(BaseSettings):
    hostname: str
    port: int
    access_token: str
    archive_path: str

    model_config = SettingsConfigDict(env_file=".env")


config = _Config()
