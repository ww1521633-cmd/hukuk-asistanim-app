'use client';

import { Progress } from '@/components/ui/progress';
import { CheckCircle2 } from 'lucide-react';

/**
 * Progress Bar Component
 * Shows wizard progress with step indicators
 */
export function ProgressBar({ currentStep, totalSteps, className = '' }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={`w-full ${className}`}>
      {/* Step counter */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">
          Soru {currentStep} / {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          %{Math.round(progress)} tamamlandı
        </span>
      </div>

      {/* Progress bar */}
      <Progress value={progress} className="h-2" />

      {/* Step dots */}
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          
          return (
            <div
              key={step}
              className="flex flex-col items-center gap-1"
              style={{ width: `${100 / totalSteps}%` }}
            >
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all
                  ${
                    isCompleted
                      ? 'bg-primary text-white'
                      : isCurrent
                      ? 'bg-primary text-white ring-4 ring-primary/20'
                      : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  step
                )}
              </div>
              <span className="text-xs text-gray-500 hidden sm:block">
                Soru {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Simple linear progress bar (alternative)
 */
export function SimpleProgressBar({ current, total, label }) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm text-gray-600">
            {current}/{total}
          </span>
        </div>
      )}
      <Progress value={percentage} className="h-3" />
    </div>
  );
}