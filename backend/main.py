from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from chat import generate_answer
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI(title="Knowledge Distillation RAG API")

Instrumentator().instrument(app).expose(app)


class QueryRequest(BaseModel):
    question: str
    paper_filter: Optional[str] = None

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/query")
def query(request: QueryRequest):
    result = generate_answer(request.question)
    return {"answer": result["answer"], "sources": result["sources"]}
