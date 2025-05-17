import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router";
import './global.css'
import { RootLayout } from './components/root-layout.tsx'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import '@/lib/i18n.ts'
import type { LenisRef } from 'lenis/react';
// import { cancelFrame, frame } from 'framer-motion';
import { useEffect, useRef, lazy, useState } from 'react';
// import gsap from 'gsap'
import { AnimatePresence } from 'framer-motion'
import Loader from './components/loader.tsx'
import { LoadingProvider, useLoading } from './hooks/loading-context.tsx'

const ParticleRing = lazy(() => import('./components/particle-ring.tsx'))
const LeaderBoard = lazy(() => import('./components/leader-board.tsx'))
const MainDoc = lazy(() => import('./components/main-doc.tsx'))
const MainNews = lazy(() => import('./components/main-news.tsx'))

function LenisWrapper() {
  const lenisRef = useRef<LenisRef>(null)

  // useEffect(() => {
  //   function update(data: { timestamp: number }) {
  //     const time = data.timestamp
  //     lenisRef.current?.lenis?.raf(time)
  //   }

  //   frame.update(update, true)

  //   return () => cancelFrame(update)
  // }, [])

  // useEffect(() => {
  //   function update(time: number) {
  //     lenisRef.current?.lenis?.raf(time * 1000)
  //   }
  
  //   gsap.ticker.add(update)
  
  //   return () => gsap.ticker.remove(update)
  // }, [])

  return (
    <ReactLenis root options={{ autoRaf: true }} ref={lenisRef}>
      <LoadingProvider>
        <AppWithLoading />
      </LoadingProvider>
    </ReactLenis>
  )
}

function AppWithLoading() {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const location = useLocation();
  const navigate = useNavigate();
  const [intendedPath, setIntendedPath] = useState<string | null>(null);

  // 处理链接点击，启动加载动画
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // 找到所有a标签点击
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && 
          link.getAttribute('href') && 
          !link.getAttribute('href')?.startsWith('http') && 
          !link.getAttribute('target')) {
        e.preventDefault();
        const path = link.getAttribute('href') || '/';
        setIntendedPath(path);
        startLoading();
        
        // 给加载动画一点时间显示，然后再导航
        setTimeout(() => {
          navigate(path);
        }, 100);
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [navigate, startLoading]);

  // 监听页面加载完成
  useEffect(() => {
    if (intendedPath && location.pathname === intendedPath) {
      // 模拟资源加载时间
      const timer = setTimeout(() => {
        stopLoading();
        setIntendedPath(null);
      }, 100); // 给一些时间让资源加载

      return () => clearTimeout(timer);
    }
  }, [location, intendedPath, stopLoading]);

  useEffect(() => {
    if (!intendedPath) {
      startLoading();
      
      // 页面资源加载后停止加载动画
      const timer = setTimeout(() => {
        stopLoading();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>
      
      <Routes location={location}>
        <Route path=':lang?' element={<RootLayout/>}>
          <Route index element={<ParticleRing />} />
          <Route path='news' element={<MainNews />} />
          <Route path='doc' element={<MainDoc />} />
          <Route path='leaderboard' element={<LeaderBoard />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LenisWrapper />
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
