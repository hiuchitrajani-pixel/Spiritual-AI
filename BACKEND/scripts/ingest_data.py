import pickle
import re
from pathlib import Path

import faiss
import pandas as pd
from sentence_transformers import SentenceTransformer


EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
embedder = SentenceTransformer(EMBEDDING_MODEL)

BASE_DIR = Path(__file__).resolve().parents[1]
RAW_DIR = BASE_DIR / "data" / "raw"
VECTOR_DIR = BASE_DIR / "data" / "vectorstores"

BOOK_FILES = {
    "gita": RAW_DIR / "gita.csv",
    "quran": RAW_DIR / "quran.csv",
    "bible": RAW_DIR / "bible.csv",
}


def ensure_dir(path: Path):
    path.mkdir(parents=True, exist_ok=True)


def clean_text(x):
    if pd.isna(x):
        return ""
    x = str(x).replace("\n", " ").replace("\r", " ")
    x = re.sub(r"\s+", " ", x).strip()
    return x


def remove_gita_commentary(x):
    x = clean_text(x)
    x = re.sub(r"Commentary.*$", "", x, flags=re.IGNORECASE).strip()
    x = re.sub(r"No Commentary\.?$", "", x, flags=re.IGNORECASE).strip()
    return x


def normalize_columns(df, book):
    if book == "gita":
        df = df[["Chapter", "Verse", "EngMeaning"]].copy()
        df["source"] = "gita"
        df["book"] = "Bhagavad Gita"
        df = df.rename(columns={
            "Chapter": "chapter",
            "Verse": "verse",
            "EngMeaning": "text",
        })
        df["text"] = df["text"].apply(remove_gita_commentary)
        return df[["source", "book", "chapter", "verse", "text"]]

    if book == "quran":
        df = df[["surah_name_roman", "surah_no", "ayah_no_surah", "ayah_en"]].copy()
        df["source"] = "quran"
        df = df.rename(columns={
            "surah_name_roman": "book",
            "surah_no": "chapter",
            "ayah_no_surah": "verse",
            "ayah_en": "text",
        })
        df["text"] = df["text"].apply(clean_text)
        return df[["source", "book", "chapter", "verse", "text"]]

    if book == "bible":
        df = df[["Book Name", "Chapter", "Verse", "Text"]].copy()
        df["source"] = "bible"
        df = df.rename(columns={
            "Book Name": "book",
            "Chapter": "chapter",
            "Verse": "verse",
            "Text": "text",
        })
        df["text"] = df["text"].apply(clean_text)
        return df[["source", "book", "chapter", "verse", "text"]]

    raise ValueError(f"Unsupported book: {book}")


def ingest_book(book, file_path):
    # Bible CSV has header lines, skip them
    skiprows = 5 if book == "bible" else 0
    df = pd.read_csv(file_path, skiprows=skiprows)
    df = normalize_columns(df, book)

    required = ["source", "book", "chapter", "verse", "text"]
    df = df[required].dropna()
    df["text"] = df["text"].astype(str).str.strip()
    df = df[df["text"] != ""]

    df["reference"] = (
        df["book"].astype(str)
        + " "
        + df["chapter"].astype(str)
        + ":"
        + df["verse"].astype(str)
    )

    texts = df["text"].tolist()
    vectors = embedder.encode(texts, convert_to_numpy=True).astype("float32")

    dim = vectors.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(vectors)

    metadata = df.to_dict(orient="records")

    out_dir = VECTOR_DIR / book
    ensure_dir(out_dir)

    faiss.write_index(index, str(out_dir / "index.faiss"))
    with open(out_dir / "meta.pkl", "wb") as f:
        pickle.dump(metadata, f)

    print(f"Ingested {book}: {len(metadata)} verses")


if __name__ == "__main__":
    for book, file_path in BOOK_FILES.items():
        ingest_book(book, file_path)