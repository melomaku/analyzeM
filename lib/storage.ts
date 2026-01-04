import { AnalysisResult } from './types';

const STORAGE_KEY = 'cryptolens_analyses';

export const saveAnalysis = (analysis: AnalysisResult): void => {
  if (typeof window === 'undefined') return;

  try {
    const existing = getAnalyses();
    const updated = [analysis, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save analysis:', error);
  }
};

export const getAnalyses = (): AnalysisResult[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    // Convert timestamp strings back to Date objects
    return parsed.map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp)
    }));
  } catch (error) {
    console.error('Failed to get analyses:', error);
    return [];
  }
};

export const deleteAnalysis = (id: string): void => {
  if (typeof window === 'undefined') return;

  try {
    const existing = getAnalyses();
    const filtered = existing.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete analysis:', error);
  }
};

export const getAnalysisById = (id: string): AnalysisResult | null => {
  const analyses = getAnalyses();
  return analyses.find(item => item.id === id) || null;
};
