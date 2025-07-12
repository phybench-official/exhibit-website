import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
import { ShiningText } from "./ui/shining-text";
import { Info } from "lucide-react";

// 定义模型数据类型
interface ModelScore {
  ALL: number;
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
  note?: string;
  eed: ModelScore;
  acc: ModelScore;
}

// 定义分数类型
type ScoreType = "eed" | "acc";

export default function LeaderBoard() {
  const { t } = useTranslation("leaderboard");
  const [models, setModels] = useState<ModelData[]>([]);
  const [selectedField, setSelectedField] = useState<string>("ALL");
  const [scoreType, setScoreType] = useState<ScoreType>("eed");
  
  // 获取模型数据
  useEffect(() => {
    fetch("/model.json")
      .then(response => response.json())
      .then(data => {
        const filteredData = selectedField !== "ALL" 
          ? data.filter((model: ModelData) => model.id !== "human-expert")
          : data;

        console.log(data.length, filteredData.length);
        
        setModels(filteredData.sort((a: ModelData, b: ModelData) => 
          b[scoreType][selectedField as keyof ModelScore] - a[scoreType][selectedField as keyof ModelScore]));
      })
      .catch(error => console.error("Error loading model data:", error));
  }, [selectedField, scoreType]);

  // 字段切换处理
  const handleFieldChange = (value: string) => {
    setSelectedField(value);
  };

  // 分数类型切换处理
  const handleScoreTypeChange = (value: ScoreType) => {
    setScoreType(value);
  };

  // 准备图表数据
  const chartData = models.map(model => ({
    name: model.name,
    score: model[scoreType][selectedField as keyof ModelScore],
    fill: model.icon === 'openai' ? "hsl(var(--chart-1))" :
          model.icon === 'gemini' ? "hsl(var(--chart-2))" :
          model.icon === 'claude' ? "hsl(var(--chart-3))" :
          model.icon === 'human' ? "hsl(var(--chart-4))" :
          "hsl(var(--chart-5))"

  }));

  const radarConfig = {
    EED: {
      label: t("performance") + " (EED)",
      color: "hsl(var(--chart-1))",
    },
    ACC: {
      label: t("performance") + " (Accuracy)",
      color: "hsl(var(--chart-2))",
    }
  } as ChartConfig;

  const chartConfig = {
    score: {
      label: t("scoreLabel"),
    }
  } as ChartConfig;

  return (
    <div className="w-full max-w-7xl mx-auto mt-20 mb-8 px-4">
      {/* 分数类型与字段显示 */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
        <ShiningText className="text-xl font-bold">
          {scoreType === "eed" ? t("eedScoreTitle") : t("accScoreTitle")} - {t(`fields.${selectedField}`)}
        </ShiningText>

        <div className="flex flex-row w-full lg:w-1/2 justify-between lg:justify-center gap-3">
          {/* 分数类型选择器 */}
          <Select value={scoreType} onValueChange={handleScoreTypeChange}>
            <SelectTrigger className="lg:w-[220px]">
              <SelectValue placeholder={t("selectScoreType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eed">EED Score</SelectItem>
              <SelectItem value="acc">Accuracy Score</SelectItem>
            </SelectContent>
          </Select>

          {/* 字段选择器 */}
          <Select value={selectedField} onValueChange={handleFieldChange}>
            <SelectTrigger className="lg:w-[280px]">
              <SelectValue placeholder={t("selectField")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">{t("fields.ALL")}</SelectItem>
              <SelectItem value="MECHANICS">{t("fields.MECHANICS")}</SelectItem>
              <SelectItem value="ELECTRICITY">{t("fields.ELECTRICITY")}</SelectItem>
              <SelectItem value="THERMODYNAMICS">{t("fields.THERMODYNAMICS")}</SelectItem>
              <SelectItem value="OPTICS">{t("fields.OPTICS")}</SelectItem>
              <SelectItem value="MODERN">{t("fields.MODERN")}</SelectItem>
              <SelectItem value="ADVANCED">{t("fields.ADVANCED")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 排行榜 */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* 柱状图 */}
        <Card className="w-full lg:w-1/2">
          <CardHeader>
            <CardTitle>{t("chartTitle")}</CardTitle>
            <CardDescription>{t("chartDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="w-full h-180 lg:h-168 lg:mt-12">
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
                  model.id !== "human-expert" ? (
                    <Dialog key={model.id}>
                      {/* 表格内容 */}
                      <DialogTrigger asChild >
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
                              {
                                model.note && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Info className="h-4 w-4" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        {t(model.note)}
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )
                              }
                            </div>
                          </TableCell>
                          <TableCell>{model.org}</TableCell>
                          <TableCell className="text-right font-medium">{model[scoreType][selectedField as keyof ModelScore].toFixed(2)}</TableCell>
                          <TableCell><ChevronRight className="h-4 w-4" /></TableCell>
                        </TableRow>
                      </DialogTrigger>
                      {/* 模态框内容 */}
                      <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-12">
                              {LeaderboardIcon(model.icon, 32)}
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
                                    { 
                                      subject: "MECHANICS", 
                                      EED: model.eed.MECHANICS,
                                      ACC: model.acc.MECHANICS
                                    },
                                    { 
                                      subject: "ELECTRICITY", 
                                      EED: model.eed.ELECTRICITY,
                                      ACC: model.acc.ELECTRICITY
                                    },
                                    { 
                                      subject: "THERMODYNAMICS", 
                                      EED: model.eed.THERMODYNAMICS,
                                      ACC: model.acc.THERMODYNAMICS
                                    },
                                    { 
                                      subject: "OPTICS", 
                                      EED: model.eed.OPTICS,
                                      ACC: model.acc.OPTICS
                                    },
                                    { 
                                      subject: "MODERN", 
                                      EED: model.eed.MODERN,
                                      ACC: model.acc.MODERN
                                    },
                                    { 
                                      subject: "ADVANCED", 
                                      EED: model.eed.ADVANCED,
                                      ACC: model.acc.ADVANCED
                                    },
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
                                    name="EED Score"
                                    dataKey="EED"
                                    fill="hsl(var(--chart-1))"
                                    fillOpacity={0.5}
                                    dot={{
                                      r: 3,
                                      fillOpacity: 1,
                                    }}
                                  />
                                  <Radar
                                    name="Accuracy Score"
                                    dataKey="ACC"
                                    fill="hsl(var(--chart-2))"
                                    fillOpacity={0.5}
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
                              <h3 className="text-lg font-semibold mb-3">{t("detailedScores")} ({scoreType === "eed" ? "EED" : "Accuracy"})</h3>
                              <div className="space-y-2">
                                {Object.entries(model[scoreType]).map(([key, value]) => (
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
                  ) : (
                    <TableRow key={model.id} className="cursor-not-allowed font-bold">
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
                      <TableCell className="text-right">{model[scoreType][selectedField as keyof ModelScore].toFixed(2)}</TableCell>
                      <TableCell><ChevronRight className="h-4 w-4 opacity-20" /></TableCell>
                    </TableRow>
                  )
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}