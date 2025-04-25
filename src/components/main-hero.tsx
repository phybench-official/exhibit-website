import { GradientText } from "./ui/gradient-text"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useTranslation } from "react-i18next";

export function MainHero() {
  const titleRef = useRef<HTMLSpanElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLHeadingElement>(null);
  const { t } = useTranslation("common");
  
  useEffect(() => {
    // 创建动画时间线
    const tl = gsap.timeline();
    // 初始状态
    gsap.set(introRef.current, { 
      opacity: 0,
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" 
    });
    
    // 只显示 PHYBench，居中
    tl.fromTo(titleRef.current, 
      { 
        scale: 1.5, 
        opacity: 0,
      }, 
      { 
        scale: 1, 
        opacity: 1, 
        duration: 1.2, 
        ease: "power3.out" 
      }
    )
    // 显示 Introducing 文字
    .to(introRef.current, {
      opacity: 1,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration: 1,
      ease: "power2.inOut"
    })
    // 发送自定义事件通知背景可以开始渐显
    .call(() => {
      document.dispatchEvent(new CustomEvent('startBackgroundAnimation'));
    });
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] pointer-events-none z-10">
      <h1 className="font-bold text-center leading-24 md:leading-32">
        <div ref={introRef} className="text-5xl md:text-7xl mb-[-2em] leading-loose">
          <GradientText>{t("hero.introduce")}</GradientText>
        </div>
        <br />
        <span ref={titleRef} className="text-6xl md:text-8xl text-white animate-glow font-bold"> PHYBench </span>
      </h1>
    </div>
  )
}