import { authors } from "./constants"
import NewtonCradle from "../ui/newton-cradle"
import HeroLink from "./hero-link"
import DocSection1 from "./doc-section1"
import DocCarousel from "./doc-carousel"
import DocSection2 from "./doc-section2"
import DocToc from "./doc-toc"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useTranslation } from "react-i18next"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TracingBeam } from "../ui/tracing-beam"

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger)

export function DocContent() {
  const newtonRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation("doc")

  useEffect(() => {
    // 创建视差滚动效果
    if (newtonRef.current) {
      // 设置初始位置
      gsap.set(newtonRef.current, {
        y: 0,
      })
      
      // 创建视差滚动动画
      gsap.to(newtonRef.current, {
        y: -600,
        ease: "none",
        scrollTrigger: {
          trigger: newtonRef.current,
          start: "top top",
          end: "bottom top", // 当元素底部到达视口顶部时结束
          scrub: 1.5,
          // markers: true,
        }
      })
      
      // 清理函数
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }
  }, [])

  return (
    <div className="w-full relative flex flex-col items-center justify-center px-6 md:px-48 xl:px-4 py-32 overflow-hidden">
      <div 
        ref={newtonRef}
        className="left-0 w-full h-full fixed top-0"
      >
        <NewtonCradle />
      </div>
      <TracingBeam>
        <div className="relative">
          <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold text-center mt-18 md:mt-36 xl:mt-54 bg-transparent backdrop-blur-md py-4 md:p-8 rounded-3xl">{t("title")}</h1>
          <div className="flex flex-wrap justify-center text-sm md:text-base max-w-4xl mx-auto md:mt-8">
            {authors.map((author, index) => (
              <span key={index} className="inline-flex items-center mx-2 my-0.5">
                {author.url ? (
                  <a 
                    href={author.url} 
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors  duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t(`author.${author.name}`)}
                  </a>
                ) : (
                  <span>{t(`author.${author.name}`)}</span>
                )}
                <sup className="ml-0.5">{author.affiliation}</sup>
                {index < authors.length - 1 && <span className="ml-1">,</span>}
              </span>
            ))}
          </div>
          
          {/* 机构信息部分 */}
          <div className="mt-12 text-lg flex flex-col items-center space-y-1">
            <div className="flex items-baseline"><sup className="mr-1">1</sup><span>{t("org.phy")}</span></div>
            <div className="flex items-baseline"><sup className="mr-1">2</sup><span>{t("org.ai")}</span></div>
            <div className="flex items-baseline"><sup className="mr-1">3</sup><span>{t("org.CSRC")}</span></div>
            <div className="flex items-baseline"><sup className="mr-1">4</sup><span>{t("org.ic")}</span></div>
            <div className="flex items-baseline"><sup className="mr-1">5</sup><span>{t("org.yp")}</span></div>
          </div>

          <HeroLink />

          <DocSection1 />
          <DocCarousel />
          <DocSection2 />
        </div>
      </TracingBeam>
      
      <DocToc />
    </div>
  )
}