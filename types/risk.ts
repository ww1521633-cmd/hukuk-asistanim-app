// Risk Analysis TypeScript Interfaces

export type RiskLevel = 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik';

export type QuestionType = 'single' | 'multiple';

export interface RiskOption {
  id: string;
  label: string;
  riskDelta: number; // -20 to +35
  explanation: string;
  tags?: string[];
}

export interface RiskQuestion {
  id: string;
  category: string;
  question: string;
  type: QuestionType;
  weight: number; // 1.0x to 2.5x
  isCritical: boolean;
  options: RiskOption[];
  helpText?: string;
}

export interface ScoringConfig {
  baseScore: number;
  thresholds: {
    low: [number, number];    // [0, 40]
    medium: [number, number]; // [40, 60]
    high: [number, number];   // [60, 80]
    critical: [number, number]; // [80, 100]
  };
}

export interface RiskRecommendation {
  title: string;
  description: string;
  actions: string[];
  color: string;
  icon?: string;
}

export interface RiskScenario {
  id: string;
  code: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  questions: RiskQuestion[];
  scoringConfig: ScoringConfig;
  recommendations: {
    low: RiskRecommendation;
    medium: RiskRecommendation;
    high: RiskRecommendation;
    critical: RiskRecommendation;
  };
  estimatedTime: string;
  isActive: boolean;
}

// User's risk analysis result
export interface RiskAnalysisResult {
  id: string;
  scenarioId: string;
  scenarioName: string;
  answers: Record<string, string | string[]>; // questionId: optionId(s)
  riskScore: number;
  riskLevel: RiskLevel;
  calculationDetails: {
    baseScore: number;
    adjustments: {
      questionId: string;
      delta: number;
      weight: number;
      finalImpact: number;
    }[];
    finalScore: number;
  };
  recommendation: RiskRecommendation;
  createdAt: string;
}

// For wizard state management
export interface RiskWizardState {
  currentQuestionIndex: number;
  answers: Record<string, string | string[]>;
  isCompleted: boolean;
  result?: RiskAnalysisResult;
}
