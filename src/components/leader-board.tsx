import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { ChevronRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { LeaderboardIcon } from "./leaderboard/leaderboard-icon";

// 定义模型数据类型
interface ModelScore {
  eed: number;
  MECHANICS: number;
  ELECTRICITY: number;
  THERMODYNAMICS: number;
  OPTICS: number;
  MODERN: number;
  ADVANCED: number;
}

interface ModelData {
  name: string;
  id: string;
  icon: string;
  org: string;
  score: ModelScore;
}

export default function LeaderBoard() {
  const { t } = useTranslation("leaderboard");
  const [models, setModels] = useState<ModelData[]>([]);
  const [selectedField, setSelectedField] = useState<string>("eed");
  
  // 获取模型数据
  useEffect(() => {
    fetch("/model.json")
      .then(response => response.json())
      .then(data => {
        setModels(data.sort((a: ModelData, b: ModelData) => b.score[selectedField as keyof ModelScore] - a.score[selectedField as keyof ModelScore]));
      })
      .catch(error => console.error("Error loading model data:", error));
  }, [selectedField]);

  // 字段切换处理
  const handleFieldChange = (value: string) => {
    setSelectedField(value);
  };

  // 准备图表数据
  const chartData = models.map(model => ({
    name: model.name,
    score: model.score[selectedField as keyof ModelScore],
    fill: model.icon === 'openai' ? "hsl(var(--chart-1))" :
          model.icon === 'gemini' ? "hsl(var(--chart-2))" :
          model.icon === 'claude' ? "hsl(var(--chart-3))" :
          model.icon === 'deepseek' ? "hsl(var(--chart-4))" :
          "hsl(var(--chart-5))"
  }));

  const radarConfig = {
    A: {
      label: t("performance"),
      color: "hsl(var(--chart-1))",
    }
  } as ChartConfig;

  const chartConfig = {
    score: {
      label: t("scoreLabel"),
    }
  } as ChartConfig;

  return (
    <div className="w-full max-w-7xl mx-auto mt-20 mb-8 px-4">

      {/* 字段选择器 */}
      <div className="mb-3 ml-2">
        <Select value={selectedField} onValueChange={handleFieldChange}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder={t("selectField")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="eed">{t("fields.eed")}</SelectItem>
            <SelectItem value="MECHANICS">{t("fields.MECHANICS")}</SelectItem>
            <SelectItem value="ELECTRICITY">{t("fields.ELECTRICITY")}</SelectItem>
            <SelectItem value="THERMODYNAMICS">{t("fields.THERMODYNAMICS")}</SelectItem>
            <SelectItem value="OPTICS">{t("fields.OPTICS")}</SelectItem>
            <SelectItem value="MODERN">{t("fields.MODERN")}</SelectItem>
            <SelectItem value="ADVANCED">{t("fields.ADVANCED")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 主要内容 - 响应式布局 */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* 柱状图 */}
        <Card className="w-full lg:w-1/2">
          <CardHeader>
            <CardTitle>{t("chartTitle")}</CardTitle>
            <CardDescription>{t("chartDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="w-full h-120 lg:h-144">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ left: 60, right: 30, top: 10, bottom: 10 }}
              >
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tick={{ fill: 'currentColor' }}
                />
                <XAxis 
                  dataKey="score" 
                  type="number" 
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar 
                  dataKey="score" 
                  radius={6} 
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 排行榜表格 */}
        <Card className="w-full lg:w-1/2">
          <CardHeader>
            <CardTitle>{t("leaderboardTitle")}</CardTitle>
            <CardDescription>{t("leaderboardDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("rank")}</TableHead>
                  <TableHead>{t("model")}</TableHead>
                  <TableHead>{t("organization")}</TableHead>
                  <TableHead className="text-right">{t("score")}</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((model, index) => (
                  <Dialog key={model.id}>
                    <DialogTrigger asChild>
                      <TableRow 
                        className="cursor-pointer hover:bg-muted/50"
                      >
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-8 h-8">
                              {LeaderboardIcon(model.icon, 24)}
                            </div>
                            <span>{model.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{model.org}</TableCell>
                        <TableCell className="text-right font-medium">{model.score[selectedField as keyof ModelScore].toFixed(2)}</TableCell>
                        <TableCell><ChevronRight className="h-4 w-4" /></TableCell>
                      </TableRow>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
                      <DialogHeader>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-12 h-12">
                            {LeaderboardIcon(model.icon, 40)}
                          </div>
                          <DialogTitle className="text-xl">{model.name}</DialogTitle>
                        </div>
                        <DialogDescription>{t("modelDetails")}</DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="flex flex-col lg:flex-row items-center gap-6">
                          {/* 雷达图 */}
                          <div className="w-full lg:w-1/2 py-6 max-w-[70vw]">
                            <ChartContainer config={radarConfig} className="h-54 -translate-x-[3rem]">
                              <RadarChart
                                data={[
                                  { subject: "MECHANICS", A: model.score.MECHANICS },
                                  { subject: "ELECTRICITY", A: model.score.ELECTRICITY },
                                  { subject: "THERMODYNAMICS", A: model.score.THERMODYNAMICS },
                                  { subject: "OPTICS", A: model.score.OPTICS },
                                  { subject: "MODERN", A: model.score.MODERN },
                                  { subject: "ADVANCED", A: model.score.ADVANCED },
                                ]}
                                className="mx-auto "
                                outerRadius={90}
                              >
                                <PolarGrid />
                                <PolarAngleAxis
                                  dataKey="subject"
                                  tickFormatter={(value) => t(`fields.${value}`)}
                                />
                                <Radar
                                  name={t("performance")}
                                  dataKey="A"
                                  fill="hsl(var(--chart-1))"
                                  fillOpacity={0.6}
                                  dot={{
                                    r: 3,
                                    fillOpacity: 1,
                                  }}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                              </RadarChart>
                            </ChartContainer>
                          </div>

                          {/* 详细信息 */}
                          <div className="w-full lg:w-1/2">
                            <h3 className="text-lg font-semibold mb-3">{t("detailedScores")}</h3>
                            <div className="space-y-2">
                              {Object.entries(model.score).map(([key, value]) => (
                                <div key={key} className="flex justify-between text-sm lg:text-base items-center border-b border-muted pb-1">
                                  <span>{t(`fields.${key}`)}</span>
                                  <span className="font-medium">{value.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                            
                            <div className="mt-6">
                              <h3 className="text-lg font-semibold mb-2">{t("modelInfo")}</h3>
                              <div className="space-y-2 text-sm lg:text-base">
                                <div className="grid grid-cols-3 gap-2">
                                  <span className="font-medium">{t("organization")}:</span>
                                  <span className="col-span-2">{model.org}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <span className="font-medium">{t("modelId")}:</span>
                                  <span className="col-span-2 break-all">{model.id}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* 移除原有的独立模态框 */}
      </div>
    </div>
  );
}