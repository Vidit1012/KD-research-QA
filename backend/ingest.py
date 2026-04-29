# PDF ingestion and vector store population logic goes here

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
import os
import chromadb
from sentence_transformers import SentenceTransformer

def load_papers(docs_folder: str) -> list:
    all_docs = []
    for filename in os.listdir(docs_folder):
        if filename.endswith(".pdf"):
            filepath = os.path.join(docs_folder, filename)
            loader = PyPDFLoader(filepath)
            docs = loader.load()

            for doc in docs:
                doc.metadata["paper_name"] = filename.replace(".pdf", "")

            all_docs.extend(docs)
            print(f"Loaded: {filename} - {len(docs)} pages")

    return all_docs

def chunk_documents(docs: list) -> list:
    splitter = RecursiveCharacterTextSplitter(chunk_size = 500, chunk_overlap = 50)
    chunks = splitter.split_documents(docs)
    print(f"Total chunks created: {len(chunks)}")
    return chunks

def store_in_chromadb(chunks: list):
    client = chromadb.PersistentClient(path="./chroma_db")
    collection = client.get_or_create_collection(name="kd_papers")
    
    model = SentenceTransformer("all-MiniLM-L6-v2")
    
    ids = []
    documents = []
    embeddings = []
    metadatas = []
    
    for i, chunk in enumerate(chunks):
        ids.append(f"chunk_{i}")
        documents.append(chunk.page_content)
        embeddings.append(model.encode(chunk.page_content).tolist())
        metadatas.append({"paper_name": chunk.metadata.get("paper_name", "unknown"), "page": chunk.metadata.get("page", 0)})
    
    collection.add(ids=ids, documents=documents, embeddings=embeddings, metadatas=metadatas)
    print(f"Stored {len(chunks)} chunks with metadata in ChromaDB")
    

if __name__ == "__main__":
    docs = load_papers("docs/")
    chunks = chunk_documents(docs)
    store_in_chromadb(chunks)
    print("Done! Knowledge base ready.")