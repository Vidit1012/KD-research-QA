import { useState } from "react"

function SearchBar({ onSubmit, loading }) {
    const [question, setQuestion] = useState("")

    const handleSubmit = () => {
        if (!question.trim()) return
        onSubmit(question)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSubmit()
    }

    return (
    <div className="flex gap-3">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask a question about knowledge distillation..."
        className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 outline-none border border-gray-700 focus:border-blue-500"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        {loading ? "Searching..." : "Ask"}
      </button>
    </div>
  )
}

export default SearchBar