import "@/assets/css/phybench.css";

// Declare bulmaCarousel and MathJax for TypeScript
declare global {
  interface Window {
    bulmaCarousel?: {
      attach: (
        selector: string,
        options: Record<string, unknown>,
      ) => Array<{
        element: HTMLElement;
        on: (event: string, callback: () => void) => void;
        next: () => void;
        previous: () => void;
        show: (index?: number, force?: boolean) => void;
        start: () => void;
        stop: () => void;
        pause: () => void;
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

function LeaderBoard() {
  return <></>;
}

export default LeaderBoard;
