import { useState } from "react"
import SearchBar from "./components/SearchBar"
import Answer from "./components/Answer"
import Sources from "./components/Sources"
import Papers from "./components/Papers"

function App() {
  const [answer, setAnswer] = useState("")
  const [sources, setSources] = useState([])
  const [loading, setLoading] = useState(false)
  const [responseTime, setResponseTime] = useState(null)

  const handleQuery = async (question) => {
    setLoading(true)
    setAnswer("")
    setSources([])
    setResponseTime(null)

    const start = Date.now()

    const response = await fetch("http://localhost:8000/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    })

    const data = await response.json()
    setResponseTime(Date.now() - start)
    setAnswer(data.answer)
    setSources(data.sources)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-10">

        <div>
          <h1 className="text-3xl font-bold text-white mb-3">
            Knowledge Distillation Research Assistant
          </h1>
          <p className="text-gray-400">
            Ask questions across 6 research papers on knowledge distillation
          </p>
        </div>

        <SearchBar onSubmit={handleQuery} loading={loading} />

        {loading && (
          <p className="text-gray-400">Searching papers...</p>
        )}

        {answer && (
          <div className="space-y-6">
            <Answer text={answer} />
            {sources.length > 0 && <Sources sources={sources} />}
            {responseTime && (
              <p className="text-gray-600 text-sm">
                Response time: {responseTime}ms
              </p>
            )}
          </div>
        )}

        <div className="border-t border-gray-800 pt-10">
          <Papers />
        </div>

      </div>
    </div>
  )
}

export default App
