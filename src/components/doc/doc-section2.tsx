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
    <>
      {/* 框架图片展示部分 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center">
            <img src="/images/framework.jpg" alt="Framework" className="w-full rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* 数据管理部分 */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">🛠️ Data Curation</h2>
          <div className="text-justify">
            <h3 className="text-2xl font-semibold mb-4">3-Stage Rigorous Validation Pipeline</h3>

            <h4 className="text-xl font-medium mt-6 mb-3">1. Expert Creation & Strict Screening</h4>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>
                <strong>178 PKU physics students</strong> contributed problems that are:
                <ul className="list-disc pl-5 mt-2">
                  <li>Almost entirely original/custom-created</li>
                  <li>None easily found through direct internet searches or standard reference materials</li>
                </ul>
              </li>
              <li>
                Strict requirements:
                <ul className="list-disc pl-5 mt-2">
                  <li>✅ Single unambiguous symbolic answer (e.g., <MathJax inline>{"$T=2mg+4mv_0^2/l$"}</MathJax>)</li>
                  <li>✉️ Text-only solvability (no diagrams/multimodal inputs)</li>
                  <li>Rigorously precise statements to avoid ambiguity</li>
                  <li>Solvable using only basic physics principles (no complex specialized knowledge required)</li>
                </ul>
              </li>
              <li>No requirements on AI test to avoid filtering for AI weaknesses</li>
            </ul>

            <h4 className="text-xl font-medium mt-6 mb-3">2. Multi-Round Academic Review</h4>
            <p className="mb-3">Dedicated internal platform for peer review:</p>
            {/* <div className="mb-3">
              <img src="/images/review-platform.png" alt="Review Interface" className="w-full rounded-lg" />
            </div> */}
            <p className="mb-3"><strong>3-tier verification process:</strong></p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Initial filtering: Reviewers assessed format validity and appropriateness (not filtering for AI weaknesses)</li>
              <li>Ambiguity detection and revision: Reviewers analyzed LLM-generated solutions to identify potential ambiguities in problem statements</li>
              <li>Iterative improvement cycle: Questions refined repeatedly until all LLMs can understand the question and follow the instructions to produce the expressions it believes to be right.</li>
            </ul>

            <h4 className="text-xl font-medium mt-6 mb-3">3. Human Expert Finalization</h4>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li><strong>81 PKU students participated:</strong></li>
              <li>Each student independently solved 8 problems from the dataset</li>
              <li>Evaluate question clarity, statement rigor, and answer correctness</li>
              <li>Establish of human baseline performance meanwhile</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 评估协议部分 */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">📊 Evaluation Protocol</h2>
          <div className="text-justify">
            <h3 className="text-2xl font-semibold mb-4">Machine Evaluation</h3>
            <p className="mb-3"><strong>Dual Metrics</strong>:</p>
            <ol className="list-decimal pl-5 space-y-2 mb-6">
              <li><strong>Accuracy</strong>: Binary correctness (expression equivalence via SymPy simplification)</li>
              <li><strong>EED Score</strong>: Continuous assessment of expression tree similarity</li>
            </ol>
            <p className="mb-3">The EED Score evaluates the similarity between the model-generated answer and the ground truth by leveraging the concept of expression tree edit distance. The process involves the following steps:</p>
            <ol className="list-decimal pl-5 space-y-2 mb-6">
              <li><strong>Simplification of Expressions</strong>: Both the ground truth (<InlineCode>gt</InlineCode>) and the model-generated answer (<InlineCode>gen</InlineCode>) are first converted into simplified symbolic expressions using the <InlineCode>sympy.simplify()</InlineCode> function. This step ensures that equivalent forms of the same expression are recognized as identical.</li>
              <li><strong>Equivalence Check</strong>: If the simplified expressions of <InlineCode>gt</InlineCode> and <InlineCode>gen</InlineCode> are identical, the EED Score is assigned a perfect score of 100, indicating complete correctness.</li>
              <li><strong>Tree Conversion and Edit Distance Calculation</strong>: If the expressions are not identical, they are converted into tree structures. The edit distance between these trees is then calculated using an extended version of the Zhang-Shasha algorithm. This distance represents the minimum number of node-level operations (insertions, deletions, and updates) required to transform one tree into the other.</li>
              <li>
                <strong>Relative Edit Distance and Scoring</strong>: The relative edit distance <MathJax inline>{"$r$"}</MathJax> is computed as the ratio of the edit distance to the size of the ground truth tree. The EED Score is then determined based on this relative distance:
                <ul className="list-disc pl-5 mt-2">
                  <li>If <MathJax inline>{"$r=0$"}</MathJax> (i.e., the expressions are identical), the score is 100.</li>
                  <li>If <MathJax inline>{"$0<r<0.6$"}</MathJax>, the score is calculated as <MathJax inline>{"$60-100r$"}</MathJax>.</li>
                  <li>If <MathJax inline>{"$r≥0.6$"}</MathJax>, the score is 0, indicating a significant discrepancy between the model-generated answer and the ground truth.</li>
                </ul>
              </li>
            </ol>
            <p className="mb-3"><strong>Key Advantages</strong>:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>204% higher sample efficiency vs binary metrics</li>
              <li>Distinguishes coefficient errors (30&lt;EED score&lt;60) vs structural errors (EED score&lt;30)</li>
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
                  <li>Significant outperformance vs LLMs: Human experts outperformed all evaluated LLMs at 99% confidence level</li>
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
            <p className="mb-4">The results of the evaluation are shown in the following figure:</p>
            <div className="mb-6">
              <img src="/images/fig3.png" alt="Evaluation Results" className="w-full rounded-lg shadow-md" />
            </div>
            <ol className="list-decimal pl-5 space-y-2 mb-6">
              <li><strong>Significant Performance Gap</strong>: Even state-of-the-art LLMs significantly lag behind human experts in physical reasoning. The highest-performing model, Gemini 2.5 Pro, achieved only a 36.9% accuracy, compared to the human baseline of 61.9%.</li>
              <li><strong>EED Score Advantages</strong>: The EED Score provides a more nuanced evaluation of model performance compared to traditional binary scoring methods.</li>
              <li><strong>Domain-Specific Strengths</strong>: Different models exhibit varying strengths in different domains of physics:</li>
            </ol>
            <div className="mb-6">
              <img src="/images/fig4-a.png" alt="Domain Performance" className="w-full rounded-lg shadow-md" />
            </div>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Gemini 2.5 Pro shows strong performance across most domains</li>
              <li>DeepSeek-R1 and o3-mini (high) show comparable performance in mechanics and electricity</li>
              <li>Most models struggle with advanced physics and modern physics</li>
            </ul>
            <p className="mb-4"><strong>Difficulty Handling</strong>: Comparing the advantage across problem difficulties, Gemini 2.5 Pro gains a pronounced edge on harder problems, followed by o3 (high).</p>
            <div className="mb-6 w-full">
              <img src="/images/fig4-b.png" alt="Difficulty Performance" className="w-2/3 rounded-lg shadow-md mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* 错误分析部分 */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">😵‍💫 Error Analysis</h2>
          <div className="text-justify">
            <div className="mb-6">
              <img src="/images/fig5.png" alt="Error Analysis" className="w-full rounded-lg shadow-md" />
            </div>
            <p className="mb-4">We categorize the capabilities assessed by the PHYBench benchmark into two key dimensions: <strong>Physical Perception (PP)</strong> and <strong>Robust Reasoning (RR)</strong>:</p>
            <ol className="list-decimal pl-5 space-y-2 mb-6">
              <li><strong>Physical Perception (PP) Errors</strong>: During this phase, models engage in intensive semantic reasoning, expending significant cognitive effort to identify relevant physical objects, variables, and dynamics. Models make qualitative judgments about which physical effects are significant and which can be safely ignored. PP manifests as critical decision nodes in the reasoning chain. An example of a PP error is shown in Example Problem 1.</li>
              <li><strong>Robust Reasoning (RR) Errors</strong>: In this phase, models produce numerous lines of equations and perform symbolic reasoning. This process forms the connecting chains between perception nodes. RR involves consistent mathematical derivation, equation solving, and proper application of established conditions. An example of a RR error is shown in Example Problem 2.</li>
            </ol>
            <div className="mb-6">
              <img src="/images/box1-example_reasoning_process.png" alt="Error Example" className="w-full rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </section>

      <Citation />  
    </>
  )
}
