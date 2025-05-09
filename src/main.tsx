import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./components/App.tsx";
import LeaderBoard from "./components/LeaderBoard.tsx";
import ParticleRing from "./components/particle-ring";
import { RootLayout } from "./components/root-layout.tsx";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import "@/lib/i18n.ts";
import type { LenisRef } from "lenis/react";
import { cancelFrame, frame } from "framer-motion";
import { useEffect, useRef } from "react";

function LenisWrapper() {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <BrowserRouter>
        <Routes>
          <Route path=":lang?" element={<RootLayout />}>
            <Route index element={<ParticleRing />} />
            <Route path="about" element={<App />} />
            <Route path="doc" element={<App />} />
            <Route path="leaderboard" element={<LeaderBoard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReactLenis>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LenisWrapper />
  </StrictMode>,
);
