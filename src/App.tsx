import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useTranslation } from 'react-i18next'
import './assets/css/phybench.css'

// Declare bulmaCarousel and MathJax for TypeScript
declare global {
  interface Window {
    bulmaCarousel?: {
      attach: (selector: string, options: Record<string, unknown>) => Array<{
        element: HTMLElement;
        on: (event: string, callback: () => void) => void;
      }>;
    };
    dataLayer?: Array<Record<string, unknown>>;
    MathJax?: {
      typeset?: () => void;
      tex?: Record<string, unknown>;
      svg?: Record<string, unknown>;
      startup?: Record<string, unknown>;
      options?: Record<string, unknown>;
    };
    gtag?: (...args: unknown[]) => void;
  }
}

// Global script imports will be handled in the component

function App() {
  const [count, setCount] = useState(0)
  const { t } = useTranslation("common")

  // Load scripts and initialize carousel when component mounts
  useEffect(() => {
    // Load bulmaCarousel script
    const carouselScript = document.createElement('script');
    carouselScript.src = './assets/js/bulma-carousel.min.js';
    carouselScript.async = true;
    document.body.appendChild(carouselScript);

    // Load MathJax script for LaTeX rendering
    const mathJaxScript = document.createElement('script');
    mathJaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
    mathJaxScript.async = true;
    document.body.appendChild(mathJaxScript);

    // Initialize MathJax configuration
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        processEscapes: true
      },
      svg: {
        fontCache: 'global'
      },
      startup: {
        typeset: true
      },
      options: {
        renderActions: {
          addMenu: [],
          checkLoading: []
        }
      }
    };

    // Initialize carousel after script is loaded
    carouselScript.onload = () => {
      if (typeof window !== 'undefined' && window.bulmaCarousel) {
        const carousel = window.bulmaCarousel.attach('#problem-carousel', {
          slidesToScroll: 1,
          slidesToShow: 1,
          navigation: true,
          pagination: false,
          loop: true,
          autoplay: false,
          duration: 500,
          timing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        })[0];

        if (carousel) {
          const navLeft = carousel.element.querySelector('.carousel-nav-left') as HTMLElement;
          const navRight = carousel.element.querySelector('.carousel-nav-right') as HTMLElement;

          const lock = () => {
            if (navLeft && navRight) {
              navLeft.style.pointerEvents = navRight.style.pointerEvents = 'none';
            }
          };
          const unlock = () => {
            if (navLeft && navRight) {
              navLeft.style.pointerEvents = navRight.style.pointerEvents = 'auto';
            }
          };

          unlock();
          carousel.on('before:show', lock);
          carousel.on('after:show', unlock);
        }
      }
    };

    const typesettingTimeout = setTimeout(() => {
      if (window.MathJax && window.MathJax.typeset) {
        window.MathJax.typeset();
      }
    }, 1000);

    return () => {
      clearTimeout(typesettingTimeout);
      document.body.removeChild(carouselScript);
      document.body.removeChild(mathJaxScript);
    };
  }, []);

  return (
    <>
      <div className="pt-32">
        <a href="https://vite.dev" target="_blank" rel='noreferrer'>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel='noreferrer'>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{t('app.welcome')}</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          {t('app.count', { count: count })}
        </button>
        <p>
          {t('app.edit')}
        </p>
      </div>
      <p className="read-the-docs">
        {t('app.readTheDocs')}
      </p>

      {/* PHYBench Content */}
      <section className="hero">
        <div className="hero-body">
          <div className="container is-max-desktop">
            <div className="columns is-centered">
              <div className="column has-text-centered">
                <h1 className="title is-1 publication-title">PHYBench: Holistic Evaluation of Physical Perception and Reasoning in Large Language Models</h1>
                <div className="is-size-5 publication-authors">
                  <span className="author-block"><a href="https://stephenqsstarthomas.github.io">Shi Qiu</a><sup>1</sup>,</span>
                  <span className="author-block">Shaoyang Guo<sup>1</sup>,</span>
                  <span className="author-block"><a href="https://github.com/SonnyNondegeneracy">Zhuo-Yang Song</a> <sup>1</sup>,</span>
                  <span className="author-block"><a href="https://renko6626.github.io">Yunbo Sun</a><sup>1</sup>,</span>
                  <span className="author-block"><a href="https://github.com/parkcai">Zeyu Cai</a><sup>1</sup>,</span>
                  <span className="author-block"><a href="https://github.com/wjsoj">Jiashen Wei</a><sup>1</sup>,</span>
                  <span className="author-block"><a href="https://github.com/Dennisbroo">Tianyu Luo</a><sup>1</sup>,</span>
                  <span className="author-block">Yixuan Yin<sup>1</sup>,</span>
                  <span className="author-block">Haoxu Zhang<sup>1</sup>,</span>
                  <span className="author-block"><a href="https://aheadofpotato.github.io">Yi Hu</a><sup>2</sup>,</span>
                  <span className="author-block">Chenyang Wang<sup>1</sup>,</span>
                  <span className="author-block">Chencheng Tang<sup>1</sup>,</span>
                  <span className="author-block">Haoling Chang<sup>1</sup>,</span>
                  <span className="author-block">Qi Liu<sup>1</sup>,</span>
                  <span className="author-block">Ziheng Zhou<sup>1</sup>,</span>
                  <span className="author-block">Tianyu Zhang<sup>1</sup>,</span>
                  <span className="author-block">Jingtian Zhang<sup>1</sup>,</span>
                  <span className="author-block">Zhangyi Liu<sup>1</sup>,</span>
                  <span className="author-block">Minghao Li<sup>1</sup>,</span>
                  <span className="author-block">Yuku Zhang<sup>1</sup>,</span>
                  <span className="author-block">Boxuan Jing<sup>1</sup>,</span>
                  <span className="author-block">Xianqi Yin<sup>1</sup>,</span>
                  <span className="author-block">Yutong Ren<sup>1</sup>,</span>
                  <span className="author-block">Zizhuo Fu<sup>2</sup>,</span>
                  <span className="author-block">Weike Wang<sup>1</sup>,</span>
                  <span className="author-block">Xudong Tian<sup>1</sup>,</span>
                  <span className="author-block">Anqi Lv<sup>1</sup>,</span>
                  <span className="author-block">Laifu Man<sup>1</sup>,</span>
                  <span className="author-block">Jianxiang Li<sup>1</sup>,</span>
                  <span className="author-block">Feiyu Tao<sup>1</sup>,</span>
                  <span className="author-block">Qihua Sun<sup>1</sup>,</span>
                  <span className="author-block">Zhou Liang<sup>1</sup>,</span>
                  <span className="author-block">Yushu Mu<sup>1</sup>,</span>
                  <span className="author-block">Zhongxuan Li<sup>1</sup>,</span>
                  <span className="author-block">Jing-Jun Zhang<sup>1</sup>,</span>
                  <span className="author-block">Shutao Zhang<sup>1</sup>,</span>
                  <span className="author-block">Xiaotian Li<sup>1</sup>,</span>
                  <span className="author-block">Xingqi Xia<sup>1</sup>,</span>
                  <span className="author-block">Jiawei Lin<sup>1</sup>,</span>
                  <span className="author-block">Zheyu Shen<sup>1</sup>,</span>
                  <span className="author-block">Jiahang Chen<sup>1</sup>,</span>
                  <span className="author-block">Qiuhao Xiong<sup>1</sup>,</span>
                  <span className="author-block">Binran Wang<sup>1</sup>,</span>
                  <span className="author-block">Fengyuan Wang<sup>1</sup>,</span>
                  <span className="author-block">Ziyang Ni<sup>1</sup>,</span>
                  <span className="author-block">Bohan Zhang<sup>5</sup>,</span>
                  <span className="author-block">Fan Cui<sup>4</sup>,</span>
                  <span className="author-block">Changkun Shao<sup>1</sup>,</span>
                  <span className="author-block"><a href="https://faculty.pku.edu.cn/caoqinghong/zh_CN/index.htm">Qing-Hong Cao</a><sup>1</sup>,</span>
                  <span className="author-block"><a href="https://www.csrc.ac.cn/en/people/faculty/184.html">Ming-Xing Luo</a> <sup>3</sup>,</span>
                  <span className="author-block"><a href="https://muhanzhang.github.io">Muhan Zhang</a><sup>2</sup>,</span>
                  <span className="author-block"><a href="https://konformal.github.io">Hua Xing Zhu</a><sup>1</sup>,</span>
                </div>

                <div className="is-size-5 publication-authors">
                  <span className="author-block"><sup>1</sup>School of Physics, Peking University</span><br />
                  <span className="author-block"><sup>2</sup>Institute for Artificial Intelligence, Peking University</span><br />
                  <span className="author-block"><sup>3</sup>Beijing Computational Science Research Center</span><br />
                  <span className="author-block"><sup>4</sup>School of Integrated Circuits, Peking University</span><br />
                  <span className="author-block"><sup>5</sup>Yuanpei College, Peking University</span>
                </div>

                <div className="column has-text-centered">
                  <div className="publication-links">
                    {/* PDF Link. */}
                    <span className="link-block">
                      <a href="https://arxiv.org/pdf/2504.16074" className="external-link button is-normal is-rounded is-dark">
                        <span className="icon">
                          <i className="fas fa-file-pdf"></i>
                        </span>
                        <span>Paper</span>
                      </a>
                    </span>
                    <span className="link-block">
                      <a href="https://arxiv.org/abs/2504.16074" className="external-link button is-normal is-rounded is-dark">
                        <span className="icon">
                          <i className="ai ai-arxiv"></i>
                        </span>
                        <span>arXiv</span>
                      </a>
                    </span>
                    {/* Code Link. */}
                    <span className="link-block">
                      <a href="https://github.com/phybench-official/phybench-demo" className="external-link button is-normal is-rounded is-dark">
                        <span className="icon">
                          <i className="fab fa-github"></i>
                        </span>
                        <span>Code</span>
                      </a>
                    </span>
                    {/* Dataset Link. */}
                    <span className="link-block">
                      <a href="https://huggingface.co/datasets/Eureka-Lab/PHYBench" className="external-link button is-normal is-rounded is-dark">
                        <span className="icon">
                          <i className="far fa-images"></i>
                        </span>
                        <span>Data</span>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hero teaser">
        <div className="container is-max-desktop">
          <div className="hero-body">
            <div className="hero-body-image">
              <img src="./assets/images/test_example.jpg" className="teaser-image" alt="Teaser image" />
            </div>
            <h2 className="subtitle has-text-centered">
              <span className="dnerf">PHYBench</span> is a benchmark for evaluating the physical reasoning capabilities of large
              language models.
            </h2>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered has-text-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3">🌟 Overview</h2>
              <div className="content has-text-justified">
                <p><strong>PHYBench</strong> is the first large-scale benchmark specifically designed to evaluate <strong>physical perception</strong> and <strong>robust reasoning</strong> capabilities in Large Language Models (LLMs).</p>
                <p>With <strong>500 meticulously curated physics problems</strong> spanning mechanics, electromagnetism, thermodynamics, optics, modern physics, and advanced physics, it challenges models to demonstrate:</p>
                <ul>
                  <li><strong>Real-world grounding</strong>: Problems based on tangible physical scenarios (e.g., ball inside a bowl, pendulum dynamics)</li>
                  <li><strong>Multi-step reasoning</strong>: Average solution length of 3,000 characters requiring 10+ intermediate steps</li>
                  <li><strong>Symbolic precision</strong>: Strict evaluation of LaTeX-formatted expressions through novel <strong>Expression Edit Distance (EED) Score</strong></li>
                </ul>
                <h3 className="title is-4">Key innovations:</h3>
                <ul>
                  <li>🎯 <strong>EED Metric</strong>: Continuous scoring (0-100) measuring expression tree similarity, capturing partial correctness</li>
                  <li>🏋️ <strong>Difficulty Spectrum</strong>: High school, undergraduate, Physics Olympiad-level problems</li>
                  <li>🔍 <strong>Error Taxonomy</strong>: Explicit evaluation of Physical Perception (PP) vs Robust Reasoning (RR) failures</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered has-text-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3">📚 Example Problems</h2>
              <div id="problem-carousel" className="carousel carousel-animated carousel-animate-slide" data-autoplay="false">
                <div className="carousel-item is-active">
                  <img src="./assets/images/problem1.jpg" alt="Problem 1" />
                </div>
                <div className="carousel-item">
                  <img src="./assets/images/problem2.jpg" alt="Problem 2" />
                </div>
                <div className="carousel-item">
                  <img src="./assets/images/problem3.jpg" alt="Problem 3" />
                </div>
                <div className="carousel-item">
                  <img src="./assets/images/problem4.jpg" alt="Problem 4" />
                </div>
                <div className="carousel-item">
                  <img src="./assets/images/problem5.jpg" alt="Problem 5" />
                </div>
              </div>

              <h3 className="title is-4 has-text-left">Answer Types</h3>
              <div className="content has-text-left">
                <ul>
                  <li> Strict symbolic expressions (e.g., <span className="math-inline">{`$\\sqrt{\\frac{2g}{3R}}$`}</span>)</li>
                  <li> Multiple equivalent forms accepted</li>
                  <li> No numerical approximations or equation chains</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hero teaser">
        <div className="container is-max-desktop">
          <div className="hero-body">
            <div className="hero-body-image">
              <img src="./assets/images/framework.jpg" className="teaser-image" alt="Framework image" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered has-text-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3">🛠️ Data Curation</h2>
              <div className="content has-text-justified">
                <h3 className="title is-4">3-Stage Rigorous Validation Pipeline</h3>

                <h4>1. Expert Creation & Strict Screening</h4>
                <ul>
                  <li><strong>178 PKU physics students</strong> contributed problems that are:
                    <ul>
                      <li>Almost entirely original/custom-created</li>
                      <li>None easily found through direct internet searches or standard reference materials</li>
                    </ul>
                  </li>
                  <li>Strict requirements:
                    <ul>
                      <li>✅ Single unambiguous symbolic answer (e.g., <span className="math-inline">{`$T=2mg+4mv_0^2/l$`}</span>)</li>
                      <li>✉️ Text-only solvability (no diagrams/multimodal inputs)</li>
                      <li>Rigorously precise statements to avoid ambiguity</li>
                      <li>Solvable using only basic physics principles (no complex specialized knowledge required)</li>
                    </ul>
                  </li>
                  <li>No requirements on AI test to avoid filtering for AI weaknesses</li>
                </ul>

                <h4>2. Multi-Round Academic Review</h4>
                <p>Dedicated internal platform for peer review:</p>
                <ul>
                  <li>Initial filtering: Reviewers assessed format validity and appropriateness (not filtering for AI weaknesses)</li>
                  <li>Ambiguity detection and revision: Reviewers analyzed LLM-generated solutions to identify potential ambiguities in problem statements</li>
                  <li>Iterative improvement cycle: Questions refined repeatedly until all LLMs can understand the question and follow the instructions to produce the expressions it believes to be right.</li>
                </ul>

                <h4>3. Human Expert Finalization</h4>
                <ul>
                  <li><strong>81 PKU students participated:</strong></li>
                  <li>Each student independently solved 8 problems from the dataset</li>
                  <li>Evaluate question clarity, statement rigor, and answer correctness</li>
                  <li>Establish of human baseline performance meanwhile</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered has-text-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3">📊 Evaluation Protocol</h2>
              <div className="content has-text-justified">
                <h3 className="title is-4">Machine Evaluation</h3>
                <p><strong>Dual Metrics</strong>:</p>
                <ol>
                  <li><strong>Accuracy</strong>: Binary correctness (expression equivalence via SymPy simplification)</li>
                  <li><strong>EED Score</strong>: Continuous assessment of expression tree similarity</li>
                </ol>
                <p>The EED Score evaluates the similarity between the model-generated answer and the ground truth by leveraging the concept of expression tree edit distance. The process involves the following steps:</p>
                <ol>
                  <li><strong>Simplification of Expressions</strong>: Both the ground truth (`gt`) and the model-generated answer (`gen`) are first converted into simplified symbolic expressions using the `sympy.simplify()` function. This step ensures that equivalent forms of the same expression are recognized as identical.</li>
                  <li><strong>Equivalence Check</strong>: If the simplified expressions of `gt` and `gen` are identical, the EED Score is assigned a perfect score of 100, indicating complete correctness.</li>
                  <li><strong>Tree Conversion and Edit Distance Calculation</strong>: If the expressions are not identical, they are converted into tree structures. The edit distance between these trees is then calculated using an extended version of the Zhang-Shasha algorithm. This distance represents the minimum number of node-level operations (insertions, deletions, and updates) required to transform one tree into the other.</li>
                  <li><strong>Relative Edit Distance and Scoring</strong>: The relative edit distance (r) is computed as the ratio of the edit distance to the size of the ground truth tree. The EED Score is then determined based on this relative distance:
                    <ul>
                      <li>If {"r = 0"} (i.e., the expressions are identical), the score is 100.</li>
                      <li>If {"0 < r < 0.6"}, the score is calculated as {"60 - 100r"}.</li>
                      <li>If {"r ≥ 0.6"}, the score is 0, indicating a significant discrepancy between the model-generated answer and the ground truth.</li>
                    </ul>
                  </li>
                </ol>
                <p><strong>Key Advantages</strong>:</p>
                <ul>
                  <li>204% higher sample efficiency vs binary metrics</li>
                  <li>Distinguishes coefficient errors (30&lt;EED score&lt;60) vs structural errors (EED score&lt;30)</li>
                </ul>

                <h3 className="title is-4">Human Baseline</h3>
                <ul>
                  <li><strong>Participants</strong>: 81 PKU physics students</li>
                  <li><strong>Protocol</strong>:
                    <ul>
                      <li>8 problems per student: Each student solved a set of 8 problems from PHYBench dataset</li>
                      <li>Time-constrained solving: 3 hours</li>
                    </ul>
                  </li>
                  <li><strong>Performance metrics</strong>:
                    <ul>
                      <li>61.9±2.1% average accuracy</li>
                      <li>70.4±1.8 average EED Score</li>
                      <li>Top quartile reached 71.4% accuracy and 80.4 EED Score</li>
                      <li>Significant outperformance vs LLMs: Human experts outperformed all evaluated LLMs at 99% confidence level</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered has-text-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3">📝 Main Results</h2>
              <div className="content has-text-justified">
                <p>The results of the evaluation are shown in the following figure:</p>
                <img src="./assets/docs/figures/fig3.png" alt="Evaluation Results" style={{ maxWidth: '100%', marginBottom: '1.5rem' }} />
                <ol>
                  <li><strong>Significant Performance Gap</strong>: Even state-of-the-art LLMs significantly lag behind human experts in physical reasoning. The highest-performing model, Gemini 2.5 Pro, achieved only a 36.9% accuracy, compared to the human baseline of 61.9%.</li>
                  <li><strong>EED Score Advantages</strong>: The EED Score provides a more nuanced evaluation of model performance compared to traditional binary scoring methods.</li>
                  <li><strong>Domain-Specific Strengths</strong>: Different models exhibit varying strengths in different domains of physics:</li>
                </ol>
                <img src="./assets/docs/figures/fig4-a.png" alt="Domain Performance" style={{ maxWidth: '100%', marginBottom: '1.5rem' }} />
                <ul>
                  <li>Gemini 2.5 Pro shows strong performance across most domains</li>
                  <li>DeepSeek-R1 and o3-mini (high) show comparable performance in mechanics and electricity</li>
                  <li>Most models struggle with advanced physics and modern physics</li>
                </ul>
                <p><strong>Difficulty Handling</strong>: Comparing the advantage across problem difficulties, Gemini 2.5 Pro gains a pronounced edge on harder problems, followed by o3 (high).</p>
                <img src="./assets/docs/figures/fig4-b.png" alt="Difficulty Performance" style={{ maxWidth: '100%', marginBottom: '1.5rem' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered has-text-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3">😵‍💫 Error Analysis</h2>
              <div className="content has-text-justified">
                <img src="./assets/docs/figures/fig5.png" alt="Error Analysis" style={{ maxWidth: '100%', marginBottom: '1.5rem' }} />
                <p>We categorize the capabilities assessed by the PHYBench benchmark into two key dimensions: <strong>Physical Perception (PP)</strong> and <strong>Robust Reasoning (RR)</strong>:</p>
                <ol>
                  <li><strong>Physical Perception (PP) Errors</strong>: During this phase, models engage in intensive semantic reasoning, expending significant cognitive effort to identify relevant physical objects, variables, and dynamics. Models make qualitative judgments about which physical effects are significant and which can be safely ignored. PP manifests as critical decision nodes in the reasoning chain. An example of a PP error is shown in Example Problem 1.</li>
                  <li><strong>Robust Reasoning (RR) Errors</strong>: In this phase, models produce numerous lines of equations and perform symbolic reasoning. This process forms the connecting chains between perception nodes. RR involves consistent mathematical derivation, equation solving, and proper application of established conditions. An example of a RR error is shown in Example Problem 2.</li>
                </ol>
                <img src="./assets/docs/figures/box1-example_reasoning_process.png" alt="Error Example" style={{ maxWidth: '100%', marginBottom: '1.5rem' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3 has-text-centered">🚩 Citation</h2>

              <pre className="has-background-light p-4" style={{ overflowX: 'auto' }}>
{`@misc{qiu2025phybenchholisticevaluationphysical,
  title        = {PHYBench: Holistic Evaluation of Physical Perception and Reasoning in Large Language Models},
  author       = {Shi Qiu and Shaoyang Guo and Zhuo-Yang Song and Yunbo Sun and Zeyu Cai and Jiashen Wei and Tianyu Luo and Yixuan Yin and Haoxu Zhang and Yi Hu and Chenyang Wang and Chencheng Tang and Haoling Chang and Qi Liu and Ziheng Zhou and Tianyu Zhang and Jingtian Zhang and Zhangyi Liu and Minghao Li and Yuku Zhang and Boxuan Jing and Xianqi Yin and Yutong Ren and Zizhuo Fu and Weike Wang and Xudong Tian and Anqi Lv and Laifu Man and Jianxiang Li and Feiyu Tao and Qihua Sun and Zhou Liang and Yushu Mu and Zhongxuan Li and Jing-Jun Zhang and Shutao Zhang and Xiaotian Li and Xingqi Xia and Jiawei Lin and Zheyu Shen and Jiahang Chen and Qiuhao Xiong and Binran Wang and Fengyuan Wang and Ziyang Ni and Bohan Zhang and Fan Cui and Changkun Shao and Qing-Hong Cao and Ming-xing Luo and Muhan Zhang and Hua Xing Zhu},
  year         = {2025},
  eprint       = {2504.16074},
  archivePrefix= {arXiv},
  primaryClass = {cs.CL},
  url          = {https://arxiv.org/abs/2504.16074}
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
