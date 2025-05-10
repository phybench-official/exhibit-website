import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import ParticleRing from './components/particle-ring';
// import LeaderBoard from './components/leader-board.tsx';
// import { MainDoc } from './components/main-doc.tsx'
import { RootLayout } from './components/root-layout.tsx'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import '@/lib/i18n.ts'
import type { LenisRef } from 'lenis/react';
import { cancelFrame, frame } from 'framer-motion';
import { useEffect, useRef, lazy } from 'react';
import gsap from 'gsap'


const LeaderBoard = lazy(() => import('./components/leader-board.tsx'))
const MainDoc = lazy(() => import('./components/main-doc.tsx'))

function LenisWrapper() {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp
      lenisRef.current?.lenis?.raf(time)
    }

    frame.update(update, true)

    return () => cancelFrame(update)
  }, [])

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)
  
    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <BrowserRouter>
        <Routes>
          <Route path=':lang?' element={<RootLayout/>}>
            <Route index element={<ParticleRing />} />
            <Route path='news' element={< br/>} />
            <Route path='doc' element={<MainDoc />} />
            <Route path='leaderboard' element={<LeaderBoard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReactLenis>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LenisWrapper />
  </StrictMode>,
)
