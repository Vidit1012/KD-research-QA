function Answer({ text }) {
  const bullets = text
    .split("\n")
    .filter((line) => line.trim() !== "")

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-sm font-medium text-blue-400 uppercase tracking-wide mb-4">
        Answer
      </h2>
      <ul className="space-y-3">
        {bullets.map((line, i) => {
          const isBullet = /^[-•*]/.test(line.trim())
          const content = isBullet ? line.trim().replace(/^[-•*]\s*/, "") : line.trim()

          return (
            <li key={i} className={isBullet ? "flex gap-3" : ""}>
              {isBullet && (
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              )}
              <p className="text-gray-100 leading-relaxed">{content}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Answer
