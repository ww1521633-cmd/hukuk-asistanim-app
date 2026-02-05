'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Loader2, Check } from 'lucide-react';
import { StepIndicator } from './StepIndicator';

/**
 * Wizard Container Component
 * Main layout wrapper for the arbitration wizard
 */
export function WizardContainer({
  steps,
  currentStep,
  completedSteps,
  progress,
  canGoNext,
  canGoPrev,
  isLastStep,
  isLoading,
  isSubmitting,
  onStepClick,
  onPrev,
  onNext,
  children
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-primary">
              Tüketici Hakem Heyeti Başvurusu
            </h1>
            <span className="text-sm font-medium text-gray-600">
              %{progress} Tamamlandı
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          {/* Left Sidebar: Step Indicator */}
          <div>
            <StepIndicator
              steps={steps}
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={onStepClick}
            />
          </div>

          {/* Right Content: Active Step */}
          <div>
            {children}
          </div>
        </div>
      </div>

      {/* Bottom Navigation (Fixed on Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:relative md:mt-6 md:border-0 md:shadow-none">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex gap-3 md:justify-end">
            <Button
              variant="outline"
              onClick={onPrev}
              disabled={!canGoPrev || isLoading || isSubmitting}
              className="flex-1 md:flex-none gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Geri
            </Button>
            <Button
              onClick={onNext}
              disabled={(!canGoNext && !isLastStep) || isLoading || isSubmitting}
              className="flex-1 md:flex-none bg-primary hover:bg-primary/90 gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Gönderiliyor...
                </>
              ) : isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Doğrulanıyor...
                </>
              ) : isLastStep ? (
                <>
                  <Check className="w-4 h-4" />
                  Başvuruyu Tamamla
                </>
              ) : (
                <>
                  Devam Et
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
