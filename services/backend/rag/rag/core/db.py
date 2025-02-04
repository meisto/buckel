# author: meisto
# date: 2025-02-03 23:09:55

from sqlmodel import create_engine


engine = create_engine("sqlite:///database.db")
