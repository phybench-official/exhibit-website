import { GradientText } from "./ui/gradient-text"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useTranslation } from "react-i18next";
import { CoolMode } from "./magicui/cool-mode";
import { RainbowButton } from "./magicui/rainbow-button";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { Link } from "react-router-dom";

export function MainHero() {
  const titleRef = useRef<HTMLSpanElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null); // 新增对按钮容器的引用
  const { t } = useTranslation("common");
  
  useEffect(() => {
    // 创建动画时间线
    const tl = gsap.timeline();
    // 初始状态
    gsap.set(introRef.current, { 
      opacity: 0,
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" 
    });
    
    // 初始化按钮容器为透明
    gsap.set(buttonsRef.current, {
      opacity: 0,
      y: 20
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
    // 显示按钮部分
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
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
    <div ref={containerRef} className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-10">
      <CoolMode>
        <div className="font-bold text-center leading-24 md:leading-32 select-none">
          <div ref={introRef} className="text-5xl md:text-7xl mb-[-2em] leading-loose">
            <GradientText>{t("hero.introduce")}</GradientText>
          </div>
          <br />
          <span ref={titleRef} className="text-6xl md:text-8xl text-white animate-glow font-bold"> PHYBench </span>
        </div>
      </CoolMode>
      <div ref={buttonsRef} className="flex flex-row space-x-4 justify-center items-center z-50 ">
        <RainbowButton>
          <Link to="/doc">
            {t("viewdoc")}
          </Link>
        </RainbowButton>
        <InteractiveHoverButton>
          <Link to="/leaderboard">
            {t("nav.leaderboard")}
          </Link>
        </InteractiveHoverButton>
      </div>
    </div>
  )
}