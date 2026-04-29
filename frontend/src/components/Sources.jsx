function Sources({ sources }) {
  return (
    <div className="bg-gray-900 rounded-xl p-5 border border-gray-700">
      <h2 className="text-sm font-medium text-blue-400 uppercase tracking-wide mb-3">
        Sources
      </h2>
      <div className="flex flex-wrap gap-2">
        {sources.map((source, index) => (
          <span
            key={index}
            className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full"
          >
            {source}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Sources