export enum EraTheme {
  RETRO = 'RETRO',
  NEURAL = 'NEURAL',
  TRANSFORMER = 'TRANSFORMER',
  CREATIVE = 'CREATIVE',
  CONVERSATIONAL = 'CONVERSATIONAL',
  MULTIMODAL = 'MULTIMODAL'
}

export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  focus: string[]; // Key focus areas e.g., "Pattern Recognition", "Transformers"
  stats: { label: string; value: string }[]; // Cool stats for the card
  mediaUrl: string; // Placeholder image
  theme: EraTheme;
  color: string; // Hex accent color
  link?: string;
}
