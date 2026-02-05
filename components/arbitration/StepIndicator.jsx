'use client';

import { Building2, ShoppingCart, AlertCircle, FileText, Paperclip, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
 * Enhanced wizard progress with animated progress lines and pulse effects
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

  // Calculate progress percentage
  const progressPercentage = ((completedSteps.length) / (steps.length - 1)) * 100;

  return (
    <>
      {/* Desktop: Vertical with animated progress line */}
      <div className="hidden md:block relative">
        {/* Vertical progress line */}
        <div className="absolute left-[27px] top-[40px] bottom-[40px] w-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-b from-primary via-green-500 to-green-500 rounded-full"
            initial={{ height: 0 }}
            animate={{ height: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        <div className="space-y-4 relative">
          {steps.map((step, index) => {
            const state = getStepState(index);
            const Icon = iconMap[step.icon] || AlertCircle;
            const clickable = canClickStep(index);

            return (
              <motion.button
                key={step.id}
                onClick={() => clickable && onStepClick(index)}
                disabled={!clickable}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'w-full text-left p-4 rounded-lg border-2 transition-all relative z-10',
                  state === 'active' && 'border-primary bg-primary/5 shadow-lg shadow-primary/10',
                  state === 'completed' && 'border-green-500 bg-green-50',
                  state === 'inactive' && 'border-gray-200 bg-white opacity-60',
                  clickable && 'hover:shadow-md cursor-pointer',
                  !clickable && 'cursor-not-allowed'
                )}
              >
                <div className="flex items-center gap-3">
                  {/* Animated step indicator */}
                  <div className="relative">
                    {/* Pulse effect for active step */}
                    {state === 'active' && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary/30"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeOut'
                        }}
                      />
                    )}
                    
                    <motion.div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10',
                        state === 'active' && 'bg-primary text-white',
                        state === 'completed' && 'bg-green-500 text-white',
                        state === 'inactive' && 'bg-gray-200 text-gray-500'
                      )}
                      animate={state === 'active' ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <AnimatePresence mode="wait">
                        {state === 'completed' ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          >
                            <CheckCircle2 className="w-5 h-5" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="icon"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Icon className="w-5 h-5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
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
                  
                  {/* Step counter with animation */}
                  <motion.div
                    className={cn(
                      'text-xs font-bold px-2 py-1 rounded-full',
                      state === 'active' && 'text-primary bg-primary/10',
                      state === 'completed' && 'text-green-600 bg-green-100',
                      state === 'inactive' && 'text-gray-400 bg-gray-100'
                    )}
                    animate={state === 'active' ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {index + 1}/{steps.length}
                  </motion.div>
                </div>

                {/* Completed checkmark badge */}
                {state === 'completed' && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Mobile: Horizontal with animated progress */}
      <div className="md:hidden">
        {/* Progress bar */}
        <div className="mb-4 px-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-600">İlerleme</span>
            <span className="text-xs font-bold text-primary">
              {completedSteps.length}/{steps.length} Adım
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-max px-2">
            {steps.map((step, index) => {
              const state = getStepState(index);
              const Icon = iconMap[step.icon] || AlertCircle;
              const clickable = canClickStep(index);

              return (
                <motion.button
                  key={step.id}
                  onClick={() => clickable && onStepClick(index)}
                  disabled={!clickable}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all min-w-[100px] relative',
                    state === 'active' && 'border-primary bg-primary/5 shadow-lg shadow-primary/10',
                    state === 'completed' && 'border-green-500 bg-green-50',
                    state === 'inactive' && 'border-gray-200 bg-white opacity-60',
                    clickable && 'cursor-pointer',
                    !clickable && 'cursor-not-allowed'
                  )}
                >
                  <div className="relative">
                    {/* Pulse effect for active */}
                    {state === 'active' && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary/30"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeOut'
                        }}
                      />
                    )}
                    
                    <motion.div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center relative z-10',
                        state === 'active' && 'bg-primary text-white',
                        state === 'completed' && 'bg-green-500 text-white',
                        state === 'inactive' && 'bg-gray-200 text-gray-500'
                      )}
                      animate={state === 'active' ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <AnimatePresence mode="wait">
                        {state === 'completed' ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <CheckCircle2 className="w-5 h-5" />
                          </motion.div>
                        ) : (
                          <motion.div key="icon">
                            <Icon className="w-5 h-5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
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

                  {/* Mini checkmark for completed */}
                  {state === 'completed' && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
