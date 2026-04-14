import os
import pickle
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer


EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
embedder = None  # Lazy load the model


def get_embedder():
    global embedder
    if embedder is None:
        print("Loading sentence transformer model...")
        embedder = SentenceTransformer(EMBEDDING_MODEL)
        print("Model loaded successfully!")
    return embedder


def load_book_store(book: str):
    store_path = os.path.join("data", "vectorstores", book)
    index_path = os.path.join(store_path, "index.faiss")
    meta_path = os.path.join(store_path, "meta.pkl")

    if not os.path.exists(index_path) or not os.path.exists(meta_path):
        raise FileNotFoundError(f"Vector store not found for book: {book}")

    index = faiss.read_index(index_path)
    with open(meta_path, "rb") as f:
        metadata = pickle.load(f)

    return index, metadata


def search_book(book: str, query: str, top_k: int = 5):
    index, metadata = load_book_store(book)

    embedder = get_embedder()
    query_vector = embedder.encode([query], convert_to_numpy=True).astype("float32")
    distances, indices = index.search(query_vector, top_k)

    results = []
    for idx, dist in zip(indices[0], distances[0]):
        if idx == -1:
            continue

        item = metadata[idx]
        results.append({
            "source": item.get("source", book),
            "book": item.get("book", ""),
            "chapter": int(item.get("chapter", 0)),
            "verse": int(item.get("verse", 0)),
            "reference": item.get(
                "reference",
                f"{item.get('book', '')} {item.get('chapter', '')}:{item.get('verse', '')}"
            ),
            "text": item.get("text", ""),
            "score": float(dist)
        })

    return results