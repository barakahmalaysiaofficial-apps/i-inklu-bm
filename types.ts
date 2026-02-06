
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  SIMPLIFIER = 'SIMPLIFIER',
  IMAGE_TOOLS = 'IMAGE_TOOLS',
  ANALYTICS = 'ANALYTICS',
  MODULES = 'MODULES'
}

export interface LearningSession {
  id: string;
  studentName: string;
  date: string;
  readingTime: number; // minutes
  completionRate: number; // percentage
  errorsFound: number;
}

export interface SimplifiedResult {
  original: string;
  simplified: string;
  affixes: string[];
}

export interface ImageAnalysis {
  extractedText: string;
  summary: string;
  imageUrl?: string;
}
