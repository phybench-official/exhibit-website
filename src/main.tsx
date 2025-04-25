import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'
import ParticleRing from './components/particle-ring';
import { RootLayout } from './components/root-layout.tsx'
import { ReactLenis } from 'lenis/react'
import '@/lib/i18n.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactLenis root>
      <BrowserRouter>
        <Routes>
          <Route path=':lang?' element={<RootLayout/>}>
            <Route index element={<ParticleRing />} />
            <Route path='about' element={<App />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReactLenis>
  </StrictMode>,
)
