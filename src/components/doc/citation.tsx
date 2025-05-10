import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Citation() {
  const [copied, setCopied] = useState(false);
  
  const citationText = `@misc{qiu2025phybenchholisticevaluationphysical,
title        = {PHYBench: Holistic Evaluation of Physical Perception and Reasoning in Large Language Models},
author       = {Shi Qiu and Shaoyang Guo and Zhuo-Yang Song and Yunbo Sun and Zeyu Cai and Jiashen Wei and Tianyu Luo and Yixuan Yin and Haoxu Zhang and Yi Hu and Chenyang Wang and Chencheng Tang and Haoling Chang and Qi Liu and Ziheng Zhou and Tianyu Zhang and Jingtian Zhang and Zhangyi Liu and Minghao Li and Yuku Zhang and Boxuan Jing and Xianqi Yin and Yutong Ren and Zizhuo Fu and Weike Wang and Xudong Tian and Anqi Lv and Laifu Man and Jianxiang Li and Feiyu Tao and Qihua Sun and Zhou Liang and Yushu Mu and Zhongxuan Li and Jing-Jun Zhang and Shutao Zhang and Xiaotian Li and Xingqi Xia and Jiawei Lin and Zheyu Shen and Jiahang Chen and Qiuhao Xiong and Binran Wang and Fengyuan Wang and Ziyang Ni and Bohan Zhang and Fan Cui and Changkun Shao and Qing-Hong Cao and Ming-xing Luo and Muhan Zhang and Hua Xing Zhu},
year         = {2025},
eprint       = {2504.16074},
archivePrefix= {arXiv},
primaryClass = {cs.CL},
url          = {https://arxiv.org/abs/2504.16074}
}`;
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(citationText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">🚩 Citation</h2>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto relative">
          <button 
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Copy citation"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
          <pre className="text-sm">
            {citationText}
          </pre>
        </div>
      </div>
    </section>
  )
}