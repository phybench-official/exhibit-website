import { Gemini, DeepSeek, OpenAI, Claude, Qwen, Grok } from '@lobehub/icons';

export function LeaderboardIcon(model: string, size: number = 24) {
  switch (model) {
    case 'gemini':
      return <Gemini.Avatar size={size} />;
    case 'openai':
      return <OpenAI.Avatar size={size} type={'gpt4'} />
    case 'deepseek':
      return <DeepSeek.Avatar size={size} />;
    case 'claude':
      return <Claude.Avatar size={size} />;
    case 'qwen':
      return <Qwen.Avatar size={size} />;
    case 'grok':
      return <Grok.Avatar size={size} />;
    default:
      return null;
  }
}