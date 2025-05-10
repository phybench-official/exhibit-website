/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { List, X } from 'lucide-react'; // 导入需要的图标

interface TocItem {
  id: string;        // 锚点ID
  headingId: string; // 标题元素ID
  text: string;
  element: HTMLElement;
  isActive: boolean;
}

export default function DocToc() {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1); // 改用索引而非ID
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 移动端菜单状态
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t } = useTranslation("common");
  
  // 初始化TOC项和观察者
  useEffect(() => {
    // 使用setTimeout确保DOM已完全渲染
    const timer = setTimeout(() => {
      // 获取所有h2标题元素
      const headingElements = document.querySelectorAll('h2');
      
      if (headingElements.length === 0) {
        console.warn("DocToc: 没有找到h2标题元素");
        return;
      }
      
      // 为每个标题创建或查找锚点元素
      const items: TocItem[] = Array.from(headingElements).map((element, index) => {
        // 为标题生成唯一ID（如果没有）
        const headingId = element.id || `heading-${index}`;
        if (!element.id) element.id = headingId;
        
        const anchorId = `anchor-${headingId}`;
        
        // 查找是否已存在锚点，如果不存在则创建
        let anchorElement = document.getElementById(anchorId);
        if (!anchorElement) {
          anchorElement = document.createElement('div');
          anchorElement.id = anchorId;
          anchorElement.style.position = 'absolute';
          anchorElement.style.top = '-40px'; // 上移40px
          anchorElement.style.visibility = 'hidden';
          anchorElement.style.pointerEvents = 'none';
          
          // 使元素相对定位，以便放置锚点
          if (getComputedStyle(element).position === 'static') {
            element.style.position = 'relative';
          }
          
          // 将锚点添加为标题的子元素
          element.appendChild(anchorElement);
        }
        
        return {
          id: anchorId,       // 锚点ID (用于href)
          headingId: headingId, // 标题ID (用于观察)
          text: element.textContent || `标题 ${index + 1}`,
          element,            // 标题元素
          isActive: false
        };
      });
      
      setTocItems(items);
      
      // 创建新的观察者
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // 找到相应的tocItem索引
              const index = items.findIndex(item => item.headingId === entry.target.id);
              if (index !== -1) {
                setActiveIndex(index);
              }
            }
          });
        },
        { 
          threshold: 0.2, 
          rootMargin: "-20% 0px -60% 0px" 
        }
      );
      
      // 创建自定义滚动函数，考虑到页面顶部的固定元素
      const scrollToHeading = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const offsetPosition = scrollTop + rect.top - 80; // 80px的偏移量（标题上方40px + 可能的顶部导航栏）
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      };
      
      // 将滚动函数存储到window对象，以便在点击事件中使用
      (window as any).scrollToHeading = scrollToHeading;
      
      // 观察所有标题元素，使用标题ID而非锚点ID
      items.forEach(item => {
        const element = document.getElementById(item.headingId);
        if (element) {
          observerRef.current?.observe(element);
        }
      });
    }, 500); // 给予DOM渲染的时间
    
    // 清理函数
    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
      delete (window as any).scrollToHeading;
    };
  }, []); // 空依赖数组，只在组件挂载时运行一次
  
  // 当activeIndex改变时更新tocItems的isActive状态
  useEffect(() => {
    if (activeIndex >= 0 && activeIndex < tocItems.length) {
      setTocItems(prev => 
        prev.map((item, index) => ({
          ...item,
          isActive: index === activeIndex
        }))
      );
    }
  }, [activeIndex, tocItems.length]);
  
  // 计算进度条高度百分比
  const getProgressHeight = () => {
    if (activeIndex < 0 || tocItems.length === 0) return '0%';
    if (activeIndex >= tocItems.length - 1) return '100%';
    
    return `${(activeIndex / (tocItems.length - 1)) * 100}%`;
  };

  // 点击目录项的处理函数
  const handleTocItemClick = (item: TocItem) => {
    (window as any).scrollToHeading(item.element);
    // 如果是移动端，点击后关闭菜单
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };
  
  // 处理滚动锁定
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);
  
  if (tocItems.length === 0) return null;

  return (
    <>
      {/* 桌面端目录 */}
      <div className="hidden md:block fixed right-4 top-1/5 max-w-xs pr-4 z-10">
        <div className="relative pl-6 py-4 bg-white/10 dark:bg-black/5 backdrop-blur-sm rounded-lg shadow-sm">
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700">
            <div 
              className="w-0.5 bg-blue-500 dark:bg-blue-400 transition-all duration-300 ease-in-out"
              style={{ height: getProgressHeight() }}
            />
          </div>
          
          <h3 className="text-lg font-semibold mb-4">{t("toc")}</h3>
          
          <ul className="space-y-2 mr-4">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block py-1 text-sm transition-colors duration-200 ${
                    item.isActive 
                      ? 'text-blue-600 dark:text-blue-400 font-medium' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTocItemClick(item);
                  }}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* 移动端目录按钮 */}
      <button 
        className="md:hidden fixed bottom-6 right-6 z-20 p-3 bg-blue-200 dark:bg-blue-800 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label={t("toc")}
      >
        <List size={24} />
      </button>
      
      {/* 移动端目录模态框 */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex items-center justify-center">
          {/* 背景蒙层 */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* 目录内容 */}
          <div className="relative w-5/6 max-h-[80vh] bg-white/90 dark:bg-gray-800/80 rounded-xl shadow-xl overflow-hidden z-10">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold">{t("toc")}</h3>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="关闭"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-70px)]">
              <ul className="space-y-3">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`block py-2 px-3 rounded-lg transition-colors duration-200 ${
                        item.isActive 
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleTocItemClick(item);
                      }}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
