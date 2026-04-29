# Vector store retrieval logic goes here

import chromadb
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")
client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection(name="kd_papers")

def get_relevant_chunks(query: str, n_results: int = 5, paper_filter: str = None) -> list:
    query_embedding = model.encode(query).tolist()
    
    where = {"paper_name": paper_filter} if paper_filter else None
    
    results = collection.query(query_embeddings=[query_embedding], n_results=n_results, where=where)
    
    chunks = []
    for i, doc in enumerate(results["documents"][0]):
        chunks.append({
            "content": doc,
            "paper": results["metadatas"][0][i]["paper_name"],
            "page": results["metadatas"][0][i]["page"]
        })
    
    return chunks

def get_relevant_chunks_diverse(query: str, n_per_paper: int = 1) -> list:
    query_embedding = model.encode(query).tolist()
    
    papers = ["hinton_kd", "distilbert", "tinybert", "kd_survey", "patient_kd", "teacher_assistant_kd"]
    
    all_chunks = []
    for paper in papers:
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=n_per_paper,
            where={"paper_name": paper}
        )
        if results["documents"][0]:
            all_chunks.append({
                "content": results["documents"][0][0],
                "paper": paper,
                "page": results["metadatas"][0][0]["page"]
            })
    
    return all_chunks


if __name__ == "__main__":
    results = get_relevant_chunks("What is the architecture of DistilBERT?", paper_filter="distilbert")
    for r in results:
        print(f"\nPaper: {r['paper']} | Page: {r['page']}")
        print(r['content'][:200])