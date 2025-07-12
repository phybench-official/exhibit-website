import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";

interface EllipsisTextProps {
  text: string;
  className?: string;
}

export function EllipsisText({ text, className }: EllipsisTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("news");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const checkTruncation = () => {
      const element = textRef.current;
      if (!element) return;
      
      // 检查元素是否被截断
      const isTruncated = element.scrollHeight > element.clientHeight;
      setIsTruncated(isTruncated);
    };

    checkTruncation();
    
    // 创建 ResizeObserver 以在尺寸变化时检查
    const resizeObserver = new ResizeObserver(checkTruncation);
    if (textRef.current) {
      resizeObserver.observe(textRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [text]);

  return (
    <div className={cn("w-full", className)}>
      <div 
        ref={textRef}
        className={cn(
          "w-full whitespace-pre-wrap break-words", 
          !isExpanded && "line-clamp-10",
        )}
      >
        {text}
      </div>
      {(isTruncated || isExpanded) && (
        <button
          onClick={toggleExpand}
          className="flex items-center text-xs text-sky-700 dark:text-sky-300 mt-2 hover:text-blue-700 dark:hover:text-blue-300 hover:font-semibold transition-colors cursor-pointer"
        >
          {isExpanded ? (
            <>
              {t("hide")} <ChevronUp size={16} className="ml-1" />
            </>
          ) : (
            <>
              {t("show")} <ChevronDown size={16} className="ml-1" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
