'use client';

import { Building2, ShoppingCart, AlertCircle, FileText, Paperclip, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap = {
  Building2,
  ShoppingCart,
  AlertCircle,
  FileText,
  Paperclip
};

/**
 * Step Indicator Component
 * Shows wizard progress with visual states
 */
export function StepIndicator({ steps, currentStep, completedSteps, onStepClick }) {
  const getStepState = (index) => {
    if (completedSteps.includes(index)) return 'completed';
    if (index === currentStep) return 'active';
    return 'inactive';
  };

  const canClickStep = (index) => {
    return index === currentStep || completedSteps.includes(index);
  };

  return (
    <>
      {/* Desktop: Vertical */}
      <div className="hidden md:block space-y-4">
        {steps.map((step, index) => {
          const state = getStepState(index);
          const Icon = iconMap[step.icon] || AlertCircle;
          const clickable = canClickStep(index);

          return (
            <button
              key={step.id}
              onClick={() => clickable && onStepClick(index)}
              disabled={!clickable}
              className={cn(
                'w-full text-left p-4 rounded-lg border-2 transition-all',
                state === 'active' && 'border-primary bg-primary/5',
                state === 'completed' && 'border-green-500 bg-green-50',
                state === 'inactive' && 'border-gray-200 bg-white opacity-60',
                clickable && 'hover:shadow-md cursor-pointer',
                !clickable && 'cursor-not-allowed'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                    state === 'active' && 'bg-primary text-white',
                    state === 'completed' && 'bg-green-500 text-white',
                    state === 'inactive' && 'bg-gray-200 text-gray-500'
                  )}
                >
                  {state === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={cn(
                      'text-sm font-semibold',
                      state === 'active' && 'text-primary',
                      state === 'completed' && 'text-green-700',
                      state === 'inactive' && 'text-gray-500'
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {step.description}
                  </p>
                </div>
                <div
                  className={cn(
                    'text-xs font-bold',
                    state === 'active' && 'text-primary',
                    state === 'completed' && 'text-green-600',
                    state === 'inactive' && 'text-gray-400'
                  )}
                >
                  {index + 1}/{steps.length}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile: Horizontal Scrollable */}
      <div className="md:hidden overflow-x-auto pb-4">
        <div className="flex gap-3 min-w-max px-2">
          {steps.map((step, index) => {
            const state = getStepState(index);
            const Icon = iconMap[step.icon] || AlertCircle;
            const clickable = canClickStep(index);

            return (
              <button
                key={step.id}
                onClick={() => clickable && onStepClick(index)}
                disabled={!clickable}
                className={cn(
                  'flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all min-w-[100px]',
                  state === 'active' && 'border-primary bg-primary/5',
                  state === 'completed' && 'border-green-500 bg-green-50',
                  state === 'inactive' && 'border-gray-200 bg-white opacity-60',
                  clickable && 'cursor-pointer',
                  !clickable && 'cursor-not-allowed'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    state === 'active' && 'bg-primary text-white',
                    state === 'completed' && 'bg-green-500 text-white',
                    state === 'inactive' && 'bg-gray-200 text-gray-500'
                  )}
                >
                  {state === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <p
                  className={cn(
                    'text-xs font-semibold text-center',
                    state === 'active' && 'text-primary',
                    state === 'completed' && 'text-green-700',
                    state === 'inactive' && 'text-gray-500'
                  )}
                >
                  {step.title}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
