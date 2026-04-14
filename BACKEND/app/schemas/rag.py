from pydantic import BaseModel
from typing import List


class AskRequest(BaseModel):
    selected_book: str
    user_question: str


class SourceItem(BaseModel):
    source: str
    book: str
    chapter: int
    verse: int
    reference: str
    text: str
    score: float


class AskResponse(BaseModel):
    selected_book: str
    user_question: str
    answer: str
    sources: List[SourceItem]