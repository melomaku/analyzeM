export interface AnalysisInput {
  newsUrl?: string;
  newsContent?: string;
  chartImage?: string; // base64
  contextNotes?: string;
  coin: string;
  timeframe: string;
}

export interface Scenario {
  probability: number;
  title: string;
  description: string;
  targetPrice?: number;
  keyFactors: string[];
}

export interface Pattern {
  name: string;
  reliability: 'high' | 'medium' | 'low';
  description: string;
}

export interface ConfidenceReasoning {
  factor: string;
  impact: string;
  type: 'positive' | 'negative' | 'neutral';
}

export interface AnalysisResult {
  id: string;
  timestamp: Date;
  input: AnalysisInput;
  summary: string;
  confidence: {
    score: number;
    level: string;
    reasoning: ConfidenceReasoning[];
  };
  scenarios: {
    bull: Scenario;
    bear: Scenario;
    neutral: Scenario;
  };
  contrarianView: {
    title: string;
    argument: string;
    blindSpots: string[];
    invalidation: string;
  };
  patternsDetected: Pattern[];
  keyLevels: {
    support: number[];
    resistance: number[];
    invalidation: number;
  };
  signalsToWatch: string[];
  riskFactors: string[];
}
