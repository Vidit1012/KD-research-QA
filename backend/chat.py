# RAG chat/QA chain logic goes here

from groq import Groq
from retriever import get_relevant_chunks_diverse
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_answer(query: str) -> dict:
    chunks = get_relevant_chunks_diverse(query)
    
    context = ""
    sources = []
    for chunk in chunks:
        context += f"[{chunk['paper']} | Page {chunk['page']}]\n{chunk['content']}\n\n"
        sources.append(f"{chunk['paper']} (page {chunk['page']})")
    
    prompt = f"""You are a research assistant specializing in knowledge distillation.
Answer the question based ONLY on the provided research paper excerpts.
Format your answer as clear bullet points.
Each bullet point should end with a citation in brackets like [paper_name, Page X].
Keep each bullet point concise and factual.
Do not include an introduction or conclusion sentence, just the bullet points.

Context from papers:
{context}

Question: {query}

Answer in bullet points with citations:"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500
    )
    
    return {
        "answer": response.choices[0].message.content,
        "sources": sources
    }

if __name__ == "__main__":
    result = generate_answer("How does temperature affect knowledge distillation?")
    print("\nAnswer:", result["answer"])
    print("\nSources:", result["sources"])