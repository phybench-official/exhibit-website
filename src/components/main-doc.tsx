import { DocContent } from "./doc/doc-content"
import { MathJaxContext } from "better-react-mathjax"

export default function MainDoc() {
  return (
    <>
      <MathJaxContext
        config={{
          tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true
          },
          startup: {
            typeset: true
          }
        }}
        src="/mathjax/tex-mml-chtml.js"
      >
        <DocContent/>
      </MathJaxContext>
    </>
  )
}