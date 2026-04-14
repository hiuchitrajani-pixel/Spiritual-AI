from openai import OpenAI
from app.core.config import settings
from app.core.prompts import SYSTEM_PROMPT

client = OpenAI(
    base_url=settings.OPENROUTER_BASE_URL,
    api_key=settings.OPENROUTER_API_KEY,
    default_headers={
        "HTTP-Referer": "http://localhost:8000",
        "X-Title": "Spiritual AI Backend",
    },
)


def build_context(chunks):
    formatted = []
    for c in chunks:
        formatted.append(
            f"Source: {c['source']}\n"
            f"Book: {c.get('book', '')}\n"
            f"Chapter: {c['chapter']}\n"
            f"Verse: {c['verse']}\n"
            f"Reference: {c.get('reference', '')}\n"
            f"Text: {c['text']}"
        )
    return "\n\n".join(formatted)


def generate_answer(book: str, question: str, chunks):
    context = build_context(chunks)

    response = client.chat.completions.create(
        model=settings.MODEL_NAME,
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": f"""
Book: {book}
Question: {question}

Scripture Context:
{context}

Answer the question only from the provided scripture context.
If the context is insufficient, say that clearly.
Also mention the relevant verse references briefly.
""".strip(),
            }
        ],
        temperature=0.3,
        max_tokens=400,
    )

    return response.choices[0].message.content.strip()