import Citation from "./citation"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { useTheme } from "../theme-provider"
import { materialLight, materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { MathJax } from "better-react-mathjax"

const InlineCode = ({ children }: { children: string }) => {

  const { theme } = useTheme()
  const isDark = theme === 'dark' || theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches
  const style = isDark ? materialDark : materialLight;
  return (
    <SyntaxHighlighter
      style={style}
      customStyle={{
        display: 'inline',
        padding: '0.2em 0.4em',
        margin: '0 0.2em',
        fontSize: '85%',
        borderRadius: '3px',
        // color: '#333'
      }}
    >
      {children}
    </SyntaxHighlighter>
  )
}

export default function DocSection2() {
  return (
    <>{/* 数据管理部分 */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">🛠️ Data Curation</h2>
          <section className="py-12 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4">
              <div className="flex justify-center">
                <img src="/images/framework.jpg" alt="Framework" className="w-full rounded-lg shadow-lg" />
              </div>
            </div>
          </section>

          <div className="text-justify">
            <h3 className="text-2xl font-semibold mb-4">3-Stage Rigorous Validation Pipeline</h3>

            <p className="mb-3">This pipeline addresses key issues highlighted in prior benchmarks. It ensures <strong>novelty</strong> (to prevent training contamination) and <strong>eliminates ambiguous or flawed items</strong> through extensive expert review, thereby enhancing PhyBench's overall quality and fairness.</p>
            <h4 className="text-xl font-medium mt-6 mb-3">1. Expert Creation & Strict Screening</h4>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>
                <strong>178 PKU physics students</strong> contributed problems that are:
                <ul className="list-disc pl-5 mt-2">
                  <li>Predominantly original, custom-created by the students</li>
                  <li>Not easily discoverable through direct internet searches or in standard reference materials</li>
                </ul>
              </li>
              <li>
                Strict requirements:
                <ul className="list-disc pl-5 mt-2">
                  <li>Single unambiguous symbolic answer (e.g., <MathJax inline>{"$T=2mg+4mv_0^2/l$"}</MathJax>)</li>
                  <li>Precise problem statements to avoid ambiguity</li>
                  <li>Solvable from text-only descriptions (no diagrams/multimodal inputs required)</li>
                  <li>Solvable using fundamental physics principles (no complex specialized knowledge required)</li>
                </ul>
              </li>
              <li>Problems were <strong>not</strong> filtered based on LLM performance; specifically, they were not removed just because LLMs found them easy or hard.</li>
            </ul>

            <h4 className="text-xl font-medium mt-6 mb-3">2. Multi-Round Academic Review</h4>
            <p className="mb-3"><strong>3-tier verification process:</strong></p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Initial filtering: Reviewers assessed problem format and appropriateness (but not LLM performance)</li>
              <li>Ambiguity detection and revision: Reviewers analyzed LLM solutions to pinpoint and fix ambiguities in problem statements</li>
              <li>Iterative refinement: Problems were repeatedly refined until all our test LLMs understood them and generated their best-attempt answers</li>
            </ul>

            <h4 className="text-xl font-medium mt-6 mb-3">3. Human Expert Finalization</h4>
            <p className="mb-3"><strong>Final Review by 81 PKU Physics Students, who:</strong></p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Independently solved 8 problems from our dataset</li>
              <li>Evaluated problem clarity, statement rigor, and standard answer correctness</li>
              <li>Contributed to stablishing human baseline performance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 评估协议部分 */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">📊 Evaluation Metric</h2>
          <div className="text-justify">
            {/* <h3 className="text-2xl font-semibold mb-4">Machine Evaluation</h3>
            <p className="mb-3"><strong>Dual Metrics</strong>:</p>
            <ol className="list-decimal pl-5 space-y-2 mb-6">
              <li><strong>Accuracy</strong>: Binary correctness (expression equivalence via SymPy simplification)</li>
              <li><strong>EED Score</strong>: Continuous assessment of expression tree similarity</li>
            </ol> */}
            <h3 className="text-2xl font-semibold mt-8 mb-4">The EED Score</h3>
            <p className="mb-3">As physics problems often have complex expressions, a binary right/wrong from the <strong>accuracy</strong> metric doesn't tell the whole story. To address this issue, we additionally introduce the <strong>Expression Edit Distance (EED) Score</strong> metric, which awards partial credit for partially correct answers. The EED Score evaluates the similarity between model-generated answers and the ground truth and yields a score between 0 and 100, where 100 means the answer is fully correct. The process involves three steps:</p>
            <ol className="list-decimal pl-5 space-y-2 mb-6">
              <li><strong>Simplification of Expressions</strong>: Both the ground truth (<InlineCode>gt</InlineCode>) and the model-generated answer (<InlineCode>gen</InlineCode>) are first converted into simplified symbolic expressions using the <InlineCode>sympy.simplify()</InlineCode> function. This step ensures that equivalent forms of the same expression are recognized as identical.</li>
              <li><strong>Tree Conversion and Edit Distance Calculation</strong>: Expressions are converted into tree structures. The edit distance between these trees is then calculated using an extended version of the Zhang-Shasha algorithm. This distance represents the minimum number of node-level operations (insertions, deletions, and updates) required to transform one tree into the other.</li>
              <li>
                <strong>Relative Edit Distance and Scoring</strong>: The relative edit distance <MathJax inline>{"$r$"}</MathJax> is computed as the ratio of the edit distance to the size of the ground truth tree. The EED Score is then determined based on <MathJax inline>{"$r$"}</MathJax>:
                <ul className="list-disc pl-5 mt-2">
                  <li>If <MathJax inline>{"$r=0$"}</MathJax> (i.e., the expressions are identical), the score is <MathJax inline>{"$100$"}</MathJax>.</li>
                  <li>If <MathJax inline>{"$0<r<0.6$"}</MathJax>, the score is <MathJax inline>{"$60-100r$"}</MathJax>.</li>
                  <li>If <MathJax inline>{"$r≥0.6$"}</MathJax>, the score is <MathJax inline>{"$0$"}</MathJax>, indicating a significant discrepancy between the model-generated answer and the ground truth.</li>
                </ul>
              </li>
            </ol>
            <p className="mb-3"><strong>Key Advantages of the EED Score</strong>:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>204% higher sample efficiency vs binary metrics (e.g., accuracy)</li>
              <li>Differentiates minor coefficient errors (30&lt;EED score&lt;60) from major structural errors (EED score&lt;30)</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Human Baseline</h3>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li><strong>Participants</strong>: 81 PKU physics students</li>
              <li>
                <strong>Protocol</strong>:
                <ul className="list-disc pl-5 mt-2">
                  <li>8 problems per student: Each student solved a set of 8 problems from PHYBench dataset</li>
                  <li>Time-constrained solving: 3 hours</li>
                </ul>
              </li>
              <li>
                <strong>Performance metrics</strong>:
                <ul className="list-disc pl-5 mt-2">
                  <li>61.9±2.1% average accuracy</li>
                  <li>70.4±1.8 average EED Score</li>
                  <li>Top quartile reached 71.4% accuracy and 80.4 EED Score</li>
                  <li>Significant outperformance vs all evaluated LLMs at 99% confidence level</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 主要结果部分 */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">📝 Main Results</h2>
          <div className="text-justify">
            <h3 className="text-2xl font-semibold mt-8 mb-4">Model performance on PHYBench</h3>
            <div className="mb-6">
              <img src="/images/fig3.png" alt="Evaluation Results" className="w-full rounded-lg shadow-md" />
            </div>
            <ol className="list-disc pl-5 space-y-2 mb-6">
              <li><strong>Significant Performance Gap</strong>: Even state-of-the-art LLMs significantly lag behind human experts in physical reasoning. The highest-performing model, Gemini 2.5 Pro, achieved only a 36.9% accuracy, compared to the human baseline of 61.9%.</li>
              <li><strong>EED Score Advantages</strong>: The EED Score provides a more nuanced evaluation of model performance compared to traditional binary scoring methods such as accuracy.</li>
            </ol>
            {/* ===== START OF ADDITIONAL CODE ===== */}
            <h3 className="text-2xl font-semibold mt-8 mb-4">Model Token Usage and Benchmark Difficulty</h3>
            <div className="mb-6">
              <img src="/images/fig_4_token_consumption.jpg" alt="Model Token Usage and Scores Across Benchmarks" className="w-full rounded-lg shadow-md" />
            </div>
            <p className="mb-4">
              PHYBench problems are designed to test advanced reasoning, which is reflected in the <strong>significantly more output tokens from models</strong> on average. This indicates that models engage in longer and more complex reasoning chains to attempt solutions.
            </p>
            <p className="mb-4"> <br /> </p>
            <div className="mb-6">
              <img src="/images/fig4_score_avg_bar.jpg" alt="Score Avg Bar" className="w-full rounded-lg shadow-md" />
            </div>
            <p className="mb-6">
              Concurrently, model performance (both accuracy and EED Score) on PHYBench is <strong>consistently lower</strong> than on benchmarks like AIME 2024, OlympiadBench, GPQA, and Math-500. This, combined with the higher token usage, highlights PHYBench's greater complexity and difficulty.
              Furthermore, PHYBench reveals a clearer performance separation between models designed for reasoning and more general models, making it more effective at distinguishing nuanced reasoning capabilities.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Test-Time Scaling (TTS) Insights</h3>
            <div className="mb-6">
              <img src="/images/fig5_passK.jpg" alt="Test-Time Scaling on PHYBench" className="w-full rounded-lg shadow-md" />
            </div>
            <p className="mb-4">
              Evaluating models with <strong>Test-Time Scaling</strong> on PHYBench, where <strong>multiple responses are sampled for each problem</strong>, provides further insights into their reasoning robustness.
              Using the pass@k metric (where k is the number of samples), model accuracy generally improves as k increases. This improvement typically maintains order-preservation: models that perform better with a single sample (k=1) tend to retain their superior performance as more samples are considered.
            </p>
            <p className="mb-4"> <br /> </p>
            <div className="mb-6">
              <img src="/images/fig5_vote.jpg" alt="Vote on PHYBench" className="w-full rounded-lg shadow-md" />
            </div>
            <p className="mb-6">
              Similarly, when using <strong>majority-vote scaling</strong>, the performance distinctions between models remain evident.
              These TTS results suggest that while more computational effort at test time can enhance scores, PhyBench <strong>consistently reveals fundamental differences in models' reasoning abilities</strong>.
            </p>
            <p className="mb-6">
              Detailed analyses are available in the full research paper.
            </p>
            {/* ===== END OF ADDITIONAL CODE ===== */}
          </div>
        </div>
      </section>

      {/* 错误分析部分 */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">😵‍💫 Error Analysis</h2>
          <div className="text-justify">
            <p className="mb-4">
              PHYBench problems involve multi-step reasoning, allowing for detailed analysis of where and why LLMs falter. Our error analysis categorizes failures into distinct stages and types, revealing patterns in model weaknesses.
            </p>
            
            <h3 className="text-2xl font-semibold mt-6 mb-4">Stage-wise Failure Localization</h3>
            <p className="mb-4">We first pinpoint the initial mistake in a model's solution trace and categorize it as either a <strong>Physical Perception error</strong> or a <strong>Robust Reasoning error</strong>.</p>
            <div className="mb-6">
              <img src="/images/fig6.png" alt="Error Type Examples" className="w-full rounded-lg shadow-md" />
              {/* <p className="text-sm text-center mt-2 italic">Illustrative examples of Physical Perception and Robust Reasoning errors (corresponds to Fig. 12 in the paper).</p> */}
            </div>
            <ol className="list-decimal pl-5 space-y-3 mb-6">
              <li>
                <strong>Physical Perception (PP) Errors</strong>:
                These occur when a model fails to correctly abstract the physical scenario, including misidentifying key variables, misunderstanding physical relationships, or making incorrect qualitative judgments about physical effects. PP errors represent failures at critical decision nodes in the reasoning chain.
              </li>
              <li>
                <strong>Robust Reasoning (RR) Errors</strong>:
                If the initial error is not a PP error, it's classified as an RR error. These errors occur during the subsequent process of deriving solutions, involving equation manipulation, symbolic calculation, and applying established conditions. Most failures observed in PHYBench fall into this category.
              </li>
            </ol>

            <h4 className="text-xl font-medium mt-6 mb-3">Semantic vs. Symbolic Reasoning in RR Errors</h4>
            <p className="mb-3">
              To further understand RR errors, we distinguish between:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>
                <strong>Semantic Reasoning Errors</strong>: These involve creating new equations or applying physical laws that are <strong>not entailed by previous steps or are incorrectly invoked</strong> for the problem context. The majority of RR errors are semantic, indicating models struggle with the non-formulaic, interpretative aspects of physical reasoning.
              </li>
              <li>
                <strong>Symbolic Reasoning Errors</strong>: Errors in <strong>purely mathematical steps</strong>, such as algebraic errors when solving equations. Models are generally more proficient at this, but errors can still occur in complex derivations.
              </li>
            </ul>
            
            <h3 className="text-2xl font-semibold mt-8 mb-4">Superficial Reasoning and Reasoning Robustness</h3>
            <p className="mb-3">
              We define <strong>superficial reasoning</strong> as reasoning driven by pattern matching rather than a deep understanding of the physical context. Models exhibiting superficial reasoning might retrieve a known solution path but struggle when faced with novel situations or slight perturbations.
            </p>
            <p className="mb-3">
              Our experiments involving perturbed reasoning steps (details in the paper) reveal that while some models are highly sensitive to such changes, <strong>more recent reasoning models exhibit greater robustness</strong>. This robustness, however, often stems from compensatory strategies rather than genuine semantic understanding:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>
                <strong>Symbolic-Anchored Correction</strong>: Some models (e.g., DeepSeek-R1) use symbolic reasoning capabilities (like dimensional consistency checks) to correct or guide semantic steps. This provides robustness against symbolic errors but can be vulnerable to flawed semantic setups.
              </li>
              <li>
                <strong>Symbolic-Dominant Correction</strong>: Other models (e.g., Gemini 2.5 Pro) tend to bypass complex semantic reasoning by heavily relying on symbolic derivation and calculation. By minimizing reliance on translating physical understanding into equations, they maintain more stable performance even under perturbation.
              </li>
            </ul>
            <p className="mb-4">
              These compensatory strategies lead to what we term <strong>pseudo-genuine reasoning</strong>, a phenomenon where models exhibit partial robustness and error correction capabilities despite lacking core semantic understanding of physics. Bridging this gap between surface-level robustness and true semantic competence remains a key challenge for future research.
            </p>
          </div>
        </div>
      </section>

      <Citation />
    </>
  )
}
