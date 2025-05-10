export default function DocSection1() {
  return (
    <>
      <section className="w-full max-w-4xl mx-auto mt-16 mb-8 px-4">
        <div className="flex flex-col items-center">
          <div className="w-full mb-6">
            <img 
              src="/images/test_example.jpg" 
              className="w-full h-auto object-cover rounded-lg shadow-lg" 
              alt="PHYBench示例图"
            />
          </div>
          <div className="text-xl text-center text-gray-800 dark:text-gray-200 max-w-3xl">
            <span className="font-bold text-blue-600 dark:text-blue-400">PHYBench</span> is a benchmark for evaluating the physical reasoning capabilities of large language models.
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">🌟 Overview</h2>
          <div className="space-y-4">
            <p className="text-justify">
              <strong>PHYBench</strong> is the first large-scale benchmark specifically designed to evaluate <strong>physical perception</strong> and <strong>robust reasoning</strong> capabilities in Large Language Models (LLMs).
            </p>
            <p className="text-justify">
              With <strong>500 meticulously curated physics problems</strong> spanning mechanics, electromagnetism, thermodynamics, optics, modern physics, and advanced physics, it challenges models to demonstrate:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Real-world grounding</strong>: Problems based on tangible physical scenarios (e.g., ball inside a bowl, pendulum dynamics)</li>
              <li><strong>Multi-step reasoning</strong>: Average solution length of 3,000 characters requiring 10+ intermediate steps</li>
              <li><strong>Symbolic precision</strong>: Strict evaluation of LaTeX-formatted expressions through novel <strong>Expression Edit Distance (EED) Score</strong></li>
            </ul>
            <h3 className="text-xl font-bold mt-6 mb-3">Key innovations:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>🎯 <strong>EED Metric</strong>: Continuous scoring (0-100) measuring expression tree similarity, capturing partial correctness</li>
              <li>🏋️ <strong>Difficulty Spectrum</strong>: High school, undergraduate, Physics Olympiad-level problems</li>
              <li>🔍 <strong>Error Taxonomy</strong>: Explicit evaluation of Physical Perception (PP) vs Robust Reasoning (RR) failures</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}