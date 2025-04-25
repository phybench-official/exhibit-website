import { useTranslation } from 'react-i18next';

export default function useLocalizedPath() {
  const { i18n } = useTranslation();
  
  return (to: string): string => {
    const language = i18n.language;
    
    if (to.startsWith(`/${language}/`)) {
      return to;
    } else if (to === '/') {
      return `/${language}`;
    } else {
      return `/${language}${to.startsWith('/') ? to : `/${to}`}`;
    }
  };
}