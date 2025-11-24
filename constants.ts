import { EraTheme, TimelineEvent } from './types';

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: 0,
    year: "1950 - 2010",
    title: "黎明时刻",
    subtitle: "规则与符号主义",
    description: "在 AIGC 爆发之前，是漫长的符号 AI 时代。从图灵测试到专家系统，人类试图通过编写明确的'规则'来教导机器理解世界。这是逻辑的时代，而非想象力的时代。",
    focus: ["Symbolic AI", "Turing Test", "Expert Systems"],
    stats: [
      { label: "算力基础", value: "< 1 GFLOPS" },
      { label: "数据规模", value: "KB/MB 级" }
    ],
    mediaUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop", // Cyberpunk/Matrix code style
    theme: EraTheme.RETRO,
    color: "#10b981", // Emerald Green
  },
  {
    id: 1,
    year: "2014",
    title: "GAN 的革命",
    subtitle: "对抗生成的想象力",
    description: "Ian Goodfellow 提出了生成对抗网络 (GAN)。生成器与判别器像两个对手一样博弈：一个伪造，一个拆穿。这种对抗让机器首次拥有了'无中生有'创造逼真数据的能力。",
    focus: ["GANs", "Deep Learning", "Style Transfer"],
    stats: [
      { label: "论文引用", value: "50,000+" },
      { label: "生成质量", value: "低分辨率" }
    ],
    mediaUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop", // Abstract AI art
    theme: EraTheme.NEURAL,
    color: "#f43f5e", // Rose Red
  },
  {
    id: 2,
    year: "2017",
    title: "架构突变",
    subtitle: "Transformer 登场",
    description: "Google Brain 发表《Attention Is All You Need》。Self-Attention 机制彻底改变了序列处理方式，机器开始能够并行理解上下文。它是后来 BERT 和 GPT 系列诞生的基石。",
    focus: ["Transformer", "Self-Attention", "NLP"],
    stats: [
      { label: "参数量级", value: "亿级 (100M+)" },
      { label: "架构", value: "Encoder-Decoder" }
    ],
    mediaUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop", // Network/Brain
    theme: EraTheme.TRANSFORMER,
    color: "#3b82f6", // Google Blue
  },
  {
    id: 3,
    year: "2021 - 2022",
    title: "视觉爆发",
    subtitle: "Midjourney & Diffusion",
    description: "AI 学会了艺术创作。扩散模型 (Diffusion Model) 的突破让'文生图'成为现实。想象力与可视化之间的壁垒被打破，AIGC 开始在设计与艺术领域疯狂破圈。",
    focus: ["Diffusion", "Text-to-Image", "Creativity"],
    stats: [
      { label: "生成速度", value: "~10秒/图" },
      { label: "用户基数", value: "百万级" }
    ],
    mediaUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop", // Artistic/Colorful
    theme: EraTheme.CREATIVE,
    color: "#a855f7", // Purple
  },
  {
    id: 4,
    year: "2023",
    title: "对话元年",
    subtitle: "ChatGPT & 涌现",
    description: "LLM 展现出惊人的涌现能力：推理、代码、多轮对话。ChatGPT 成为史上增长最快的消费级应用，AI 不再是冷冰冰的工具，而是一个博学的 Copilot。",
    focus: ["RLHF", "LLM", "Reasoning"],
    stats: [
      { label: "用户增长", value: "2个月1亿" },
      { label: "交互范式", value: "Chat" }
    ],
    mediaUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1000&auto=format&fit=crop", // Robot/Human interaction
    theme: EraTheme.CONVERSATIONAL,
    color: "#0ea5e9", // Sky Blue
  },
  {
    id: 5,
    year: "2024+",
    title: "世界模拟",
    subtitle: "Sora & 物理世界",
    description: "Sora 的出现标志着 AI 开始理解物理规律。从生成静态图像到模拟动态世界，多模态大模型正在构建一个数字孪生世界，向着 AGI 迈进重要一步。",
    focus: ["Video Gen", "World Models", "Agents"],
    stats: [
      { label: "生成时长", value: "60s 长视频" },
      { label: "核心能力", value: "物理理解" }
    ],
    mediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop", // Abstract Fluid/Motion
    theme: EraTheme.MULTIMODAL,
    color: "#f97316", // Orange Future
  }
];