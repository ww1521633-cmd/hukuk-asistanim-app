'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QuestionCard } from '@/components/risk/QuestionCard';
import { ProgressBar } from '@/components/risk/ProgressBar';
import { RiskResult } from '@/components/risk/RiskResult';
import { RISK_SCENARIOS, getRiskScenarioById } from '@/data/mock-risk-scenarios';
import { calculateRisk, validateAnswers } from '@/lib/risk-engine';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

function RiskAnalysisWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scenarioId = searchParams.get('scenario');

  const [scenario, setScenario] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Load scenario on mount
  useEffect(() => {
    if (scenarioId) {
      const loadedScenario = getRiskScenarioById(scenarioId);
      if (loadedScenario) {
        setScenario(loadedScenario);
      } else {
        toast.error('Senaryo bulunamadı');
        router.push('/risk-analizi');
      }
    } else {
      router.push('/risk-analizi');
    }
  }, [scenarioId, router]);

  if (!scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const currentQuestion = scenario.questions[currentStep];
  const totalSteps = scenario.questions.length;
  const isLastStep = currentStep === totalSteps - 1;

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    // Validate current answer
    const currentAnswer = answers[currentQuestion.id];
    
    if (!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)) {
      toast.error('Lütfen bir seçenek işaretleyin');
      return;
    }

    if (isLastStep) {
      // Calculate risk
      handleSubmit();
    } else {
      setCurrentStep(prev => prev + 1);
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/risk-analizi');
    }
  };

  const handleSubmit = async () => {
    // Validate all answers
    const validation = validateAnswers(scenario, answers);
    
    if (!validation.isValid) {
      toast.error(`Lütfen tüm soruları cevaplayın (${validation.missingQuestions.length} soru eksik)`);
      return;
    }

    // Show loading
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Calculate risk
    const analysisResult = calculateRisk(scenario, answers);
    
    // Save to localStorage
    const savedResult = {
      id: Date.now().toString(),
      scenarioId: scenario.id,
      scenarioName: scenario.name,
      answers: answers,
      result: analysisResult,
      createdAt: new Date().toISOString()
    };

    const existingResults = JSON.parse(localStorage.getItem('riskAnalysisResults') || '[]');
    existingResults.push(savedResult);
    localStorage.setItem('riskAnalysisResults', JSON.stringify(existingResults));

    setResult(analysisResult);
    setIsLoading(false);
    setShowResult(true);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    toast.success('Risk analizi tamamlandı!');
  };

  const handleStartNew = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
    setShowResult(false);
    router.push('/risk-analizi');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 flex items-center justify-center">
        <Card className="p-12 text-center max-w-md mx-4">
          <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-primary mb-2">
            Risk Profiliniz Analiz Ediliyor...
          </h2>
          <p className="text-gray-600">
            Cevaplarınız değerlendiriliyor ve risk skorunuz hesaplanıyor.
          </p>
          <div className="mt-6 flex items-center justify-center gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  // Result state
  if (showResult && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <RiskResult
            result={result}
            scenarioName={scenario.name}
            answers={answers}
            questions={scenario.questions}
            onStartNew={handleStartNew}
          />
        </div>
      </div>
    );
  }

  // Wizard state
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 py-6">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Geri
            </Button>
          </div>
          <h1 className="text-2xl font-bold text-primary">
            {scenario.name}
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {scenario.description}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <ProgressBar 
            currentStep={currentStep + 1} 
            totalSteps={totalSteps}
          />
        </div>

        {/* Question Card */}
        <div className="mb-6 animate-fadeIn">
          <QuestionCard
            question={currentQuestion}
            value={answers[currentQuestion.id]}
            onChange={handleAnswerChange}
            questionNumber={currentStep + 1}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex-1 sm:flex-none gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentStep === 0 ? 'Vazgeç' : 'Önceki'}
          </Button>
          <Button
            onClick={handleNext}
            className="flex-1 bg-primary hover:bg-primary/90 gap-2"
            disabled={!answers[currentQuestion.id] || (Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].length === 0)}
          >
            {isLastStep ? 'Analizi Tamamla' : 'Devam Et'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          {currentStep + 1} / {totalSteps} soru tamamlandı
          {isLastStep && (
            <span className="block mt-1 text-primary font-medium">
              Son soru! Analizi tamamlamak için "Analizi Tamamla" butonuna tıklayın.
            </span>
          )}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default function RiskAnalysisWizard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <RiskAnalysisWizardContent />
    </Suspense>
  );
}
