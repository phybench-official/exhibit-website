import { Card, CardContent } from "@/components/ui/card";
import { Eye, ThumbsUp } from "lucide-react";

interface MomentCardProps {
  title: string;
  link: string;
  viewCount: string;
  likeCount: string;
}

export function MomentCard({ title, link, viewCount, likeCount }: MomentCardProps) {
  const handleCardClick = () => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <Card 
      className="w-full max-w-md bg-white/40 dark:bg-slate-800/50 hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-200 my-4"
      onClick={handleCardClick}
    >
      <CardContent className="px-4">
        <div className="flex flex-col">
          
          {/* 文章标题 */}
          <h3 className="text-base font-semibold line-clamp-3 mb-3 text-sky-800 dark:text-sky-100">{title}</h3>
          
          {/* 文章互动数据区域 */}
          <div className="flex items-center text-gray-700 dark:text-gray-300 text-xs">
            <div className="flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              <span>{viewCount}</span>
            </div>
            <div className="flex items-center ml-4">
              <ThumbsUp className="h-3 w-3 mr-1" />
              <span>{likeCount}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
