import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Languages } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useParams, useNavigate } from "react-router-dom"

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const { lang } = useParams<{ lang?: string }>()
  const navigate = useNavigate()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    localStorage.setItem("userLanguage", lng);
    
    if (lang) {
      // 获取当前路径并替换语言参数
      const currentPath = window.location.pathname
      const newPath = currentPath.replace(`/${lang}`, `/${lng}`)
      navigate(newPath + window.location.search)
    } else {
      navigate(`/${lng}${window.location.pathname}${window.location.search}`)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('zh')}>
          中文（简体）
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
