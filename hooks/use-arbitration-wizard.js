'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { WIZARD_STEPS, validateStepData, getProgress as calculateProgress } from '@/data/mock-arbitration-wizard';

const STORAGE_KEY = 'arbitration-draft';

/**
 * Custom hook for managing Tüketici Hakem Heyeti wizard state
 */
export function useArbitrationWizard() {
  // State
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Track if initial load is complete to prevent overwriting
  const isInitialized = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const data = JSON.parse(saved);
          // Only load if there's actual data
          if (data.formData && Object.keys(data.formData).length > 0) {
            setFormData(data.formData);
            setCurrentStep(data.currentStep || 0);
            setCompletedSteps(data.completedSteps || []);
            setIsCompleted(data.isCompleted || false);
          }
        } catch (e) {
          console.error('Failed to load saved draft:', e);
        }
      }
      // Mark as initialized after load attempt
      isInitialized.current = true;
    }
  }, []);

  // Save to localStorage whenever state changes (but only after initial load)
  useEffect(() => {
    // Don't save until initial load is complete
    if (!isInitialized.current) return;
    
    if (typeof window !== 'undefined') {
      const dataToSave = {
        formData,
        currentStep,
        completedSteps,
        isCompleted,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }
  }, [formData, currentStep, completedSteps, isCompleted]);

  // Get current step data
  const currentStepData = useMemo(() => {
    return WIZARD_STEPS[currentStep];
  }, [currentStep]);

  // Calculate progress percentage
  const progress = useMemo(() => {
    return calculateProgress(currentStep);
  }, [currentStep]);

  // Check if last step
  const isLastStep = useMemo(() => {
    return currentStep === WIZARD_STEPS.length - 1;
  }, [currentStep]);

  // Check if can go to next step
  const canGoNext = useMemo(() => {
    if (isLastStep) return false;
    
    // Check if current step has all required fields filled
    const step = WIZARD_STEPS[currentStep];
    const validation = validateStepData(step, formData);
    
    return validation.isValid;
  }, [currentStep, formData, isLastStep]);

  // Check if can go to previous step
  const canGoPrev = useMemo(() => {
    return currentStep > 0;
  }, [currentStep]);

  // Organize formData into summary by steps
  const summaryData = useMemo(() => {
    const summary = {};
    
    WIZARD_STEPS.forEach((step, index) => {
      const stepData = {};
      step.fields.forEach(field => {
        if (formData[field.id] !== undefined) {
          stepData[field.id] = formData[field.id];
        }
      });
      summary[step.id] = stepData;
    });
    
    return summary;
  }, [formData]);

  // Update single field
  const updateField = useCallback((fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  }, []);

  // Update entire step data
  const updateStepData = useCallback((stepId, data) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  }, []);

  // Validate current step
  const validateStep = useCallback((stepIndex) => {
    const step = WIZARD_STEPS[stepIndex];
    if (!step) return false;
    
    const validation = validateStepData(step, formData);
    return validation.isValid;
  }, [formData]);

  // Go to specific step
  const goToStep = useCallback((step) => {
    if (step >= 0 && step < WIZARD_STEPS.length) {
      setCurrentStep(step);
    }
  }, []);

  // Go to next step
  const nextStep = useCallback(() => {
    if (!canGoNext && !isLastStep) {
      console.warn('Cannot go to next step: validation failed');
      return;
    }

    // Mark current step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }

    if (isLastStep) {
      // Already on last step, don't advance
      return;
    }

    setCurrentStep(prev => prev + 1);
  }, [canGoNext, isLastStep, currentStep, completedSteps]);

  // Go to previous step
  const prevStep = useCallback(() => {
    if (canGoPrev) {
      setCurrentStep(prev => prev - 1);
    }
  }, [canGoPrev]);

  // Submit application
  const submitApplication = useCallback(async () => {
    // Validate all steps
    const allValid = WIZARD_STEPS.every((_, index) => validateStep(index));
    
    if (!allValid) {
      throw new Error('Please complete all required fields');
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Save to applications list
      const application = {
        id: Date.now().toString(),
        formData: formData,
        status: 'completed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const existingApplications = JSON.parse(
        localStorage.getItem('arbitrationApplications') || '[]'
      );
      existingApplications.push(application);
      localStorage.setItem('arbitrationApplications', JSON.stringify(existingApplications));

      // Mark as completed
      setIsCompleted(true);

      // Clear draft
      localStorage.removeItem(STORAGE_KEY);

      return application;
    } catch (error) {
      console.error('Submission failed:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateStep]);

  // Reset wizard
  const resetWizard = useCallback(() => {
    setCurrentStep(0);
    setFormData({});
    setCompletedSteps([]);
    setIsCompleted(false);
    setIsSubmitting(false);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return {
    // State
    currentStep,
    formData,
    completedSteps,
    isSubmitting,
    isCompleted,
    
    // Actions
    goToStep,
    nextStep,
    prevStep,
    updateField,
    updateStepData,
    validateStep,
    submitApplication,
    resetWizard,
    
    // Computed
    progress,
    canGoNext,
    canGoPrev,
    isLastStep,
    currentStepData,
    summaryData
  };
}
