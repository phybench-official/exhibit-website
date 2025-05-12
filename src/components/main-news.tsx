import { AuroraText } from "./magicui/aurora-text"
import { useTranslation } from "react-i18next"
import { TimelineUI } from "./news/timeline-ui"

export default function MainNews() {
  const { t } = useTranslation("news")
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-24">
      <h1 className="sticky top-24 text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl mb-4">
        <AuroraText>PHYBench</AuroraText> {t("news")}
      </h1>
      <TimelineUI />
    </div>
  )
} 