import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import i18n from 'i18next';

// 支持的语言列表
export const SUPPORTED_LANGUAGES = ['en', 'zh', 'ja'];
export const DEFAULT_LANGUAGE = 'en';

// 创建i18n上下文
interface I18nContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
}

const I18nContext = createContext<I18nContextType>({
  currentLanguage: DEFAULT_LANGUAGE,
  changeLanguage: () => {}
});

export const useI18n = () => useContext(I18nContext);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(DEFAULT_LANGUAGE);
  
  // 从URL中获取语言参数
  const { lang } = useParams<{ lang?: string }>();
  
  // 更改语言的函数
  const changeLanguage = (newLang: string) => {
    if (SUPPORTED_LANGUAGES.includes(newLang)) {
      // 保存用户语言偏好到localStorage
      localStorage.setItem('userLanguage', newLang);
      i18n.changeLanguage(newLang);
      setCurrentLanguage(newLang);
    }
  };
  
  useEffect(() => {
    // 按优先级确定语言:
    // 1. URL中的语言参数
    // 2. 用户保存的语言偏好
    // 3. 浏览器默认语言
    let detectedLanguage = DEFAULT_LANGUAGE;
    
    if (lang && SUPPORTED_LANGUAGES.includes(lang)) {
      detectedLanguage = lang;
    } else {
      const userLanguage = localStorage.getItem('userLanguage');
      if (userLanguage && SUPPORTED_LANGUAGES.includes(userLanguage)) {
        detectedLanguage = userLanguage;
      } else {
        // 检测浏览器语言
        const browserLang = navigator.language.split('-')[0];
        if (SUPPORTED_LANGUAGES.includes(browserLang)) {
          detectedLanguage = browserLang;
        }
      }
    }
    
    i18n.changeLanguage(detectedLanguage);
    setCurrentLanguage(detectedLanguage);
  }, [lang]);
  
  return (
    <I18nContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};
