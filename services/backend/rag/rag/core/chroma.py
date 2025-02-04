# author: meisto
# date: 2025-02-03 23:20:08

import chromadb

_chroma_client = chromadb.Client()

collection = _chroma_client.get_or_create_collection(name="test_collection")
