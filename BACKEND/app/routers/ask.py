from fastapi import APIRouter, HTTPException
from app.schemas.rag import AskRequest, AskResponse, SourceItem
from app.services.retriever import search_book
from app.services.llm_services import generate_answer

router = APIRouter()


@router.post("/ask", response_model=AskResponse)
def ask_question(payload: AskRequest):
    selected_book = payload.selected_book.lower().strip()
    user_question = payload.user_question.strip()

    if selected_book not in ["gita", "quran", "bible"]:
        raise HTTPException(status_code=400, detail="Invalid selected_book")

    sources = search_book(selected_book, user_question, top_k=5)

    if not sources:
        raise HTTPException(status_code=404, detail="No relevant verses found")

    context = "\n".join(
        [
            f"{item['reference']}: {item['text']}"
            for item in sources
        ]
    )

    answer = generate_answer(
        book=selected_book,
        question=user_question,
        chunks=sources
    )

    return AskResponse(
        selected_book=selected_book,
        user_question=user_question,
        answer=answer,
        sources=[SourceItem(**item) for item in sources]
    )