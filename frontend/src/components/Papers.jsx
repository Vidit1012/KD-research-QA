const papers = [
  {
    title: "Distilling the Knowledge in a Neural Network",
    label: "Hinton et al., 2015",
    url: "https://arxiv.org/abs/1503.02531",
  },
  {
    title: "DistilBERT: A distilled version of BERT",
    label: "Sanh et al., 2019",
    url: "https://arxiv.org/abs/1910.01108",
  },
  {
    title: "TinyBERT: Distilling BERT for Natural Language Understanding",
    label: "Jiao et al., 2019",
    url: "https://arxiv.org/abs/1909.10351",
  },
  {
    title: "Knowledge Distillation: A Survey",
    label: "Gou et al., 2020",
    url: "https://arxiv.org/abs/2006.05525",
  },
  {
    title: "Patient Knowledge Distillation for BERT Compression",
    label: "Sun et al., 2019",
    url: "https://arxiv.org/abs/1908.09355",
  },
  {
    title: "Improved Knowledge Distillation via Teacher Assistant",
    label: "Mirzadeh et al., 2020",
    url: "https://arxiv.org/abs/1902.03393",
  },
]

function Papers() {
  return (
    <section>
      <h2 className="text-lg font-semibold text-white mb-1">Papers</h2>
      <p className="text-gray-500 text-sm mb-6">
        The 6 research papers indexed in this knowledge base
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {papers.map((paper) => (
          <a
            key={paper.url}
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-blue-500 hover:bg-gray-800/60 transition-all duration-200"
          >
            <p className="text-white text-sm font-medium leading-snug group-hover:text-blue-400 transition-colors">
              {paper.title}
            </p>
            <p className="text-gray-500 text-xs mt-2">{paper.label}</p>
            <span className="inline-block mt-3 text-xs text-blue-500 border border-blue-900 rounded px-2 py-0.5 group-hover:border-blue-500 transition-colors">
              arxiv ↗
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Papers
