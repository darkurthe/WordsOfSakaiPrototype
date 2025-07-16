export interface ProcessedFile {
  id: string;
  name: string;
  originalText: string;
  japaneseText: string;
  englishText: string;
  newTranslation: string;
  summary: string;
  themes: string[];
  processedAt: Date;
  wordCount: number;
  translationConfidence: number;
}

export interface TranslationComparison {
  original: string;
  new: string;
  differences: string[];
  reasoning: string;
  confidence: number;
}

export interface ThemeAnalysis {
  theme: string;
  files: string[];
  frequency: number;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  relatedFiles?: string[];
}

export interface AnalysisResult {
  files: ProcessedFile[];
  themes: ThemeAnalysis[];
  comparisons: TranslationComparison[];
}