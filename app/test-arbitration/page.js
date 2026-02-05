'use client';

import { useState } from 'react';
import { useArbitrationWizard } from '@/hooks/use-arbitration-wizard';
import { WIZARD_STEPS } from '@/data/mock-arbitration-wizard';
import { WizardContainer } from '@/components/arbitration/WizardContainer';
import { StepContent } from '@/components/arbitration/StepContent';
import { SummaryReview } from '@/components/arbitration/SummaryReview';
import { CompletionScreen } from '@/components/arbitration/CompletionScreen';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function TestArbitrationPage() {
  const router = useRouter();
  const wizard = useArbitrationWizard();
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    // Clear previous errors
    setErrors({});
    
    // Validate current step
    const isValid = wizard.validateStep(wizard.currentStep);
    
    if (!isValid) {
      // Show validation errors
      const step = WIZARD_STEPS[wizard.currentStep];
      const newErrors = {};
      
      step.fields.forEach(field => {
        if (field.required && !wizard.formData[field.id]) {
          newErrors[field.id] = `${field.label} zorunludur`;
        }
      });
      
      setErrors(newErrors);
      toast.error('Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    wizard.nextStep();
  };

  const handleSubmit = async () => {
    try {
      await wizard.submitApplication();
      toast.success('Başvurunuz başarıyla gönderildi!');
    } catch (error) {
      toast.error('Başvuru gönderilirken bir hata oluştu');
      console.error(error);
    }
  };

  const handleNewApplication = () => {
    wizard.resetWizard();
    router.push('/');
  };

  const handleDownloadSummary = () => {
    toast.info('PDF indirme özelliği yakında eklenecek');
  };

  // Show completion screen if submitted
  if (wizard.isCompleted) {
    return (
      <CompletionScreen
        applicationId={null}
        onNewApplication={handleNewApplication}
        onDownloadSummary={handleDownloadSummary}
      />
    );
  }

  // Show summary on last step
  const showSummary = wizard.isLastStep;

  return (
    <WizardContainer
      steps={WIZARD_STEPS}
      currentStep={wizard.currentStep}
      completedSteps={wizard.completedSteps}
      progress={wizard.progress}
      canGoNext={wizard.canGoNext || wizard.isLastStep}
      canGoPrev={wizard.canGoPrev}
      isLastStep={wizard.isLastStep}
      onStepClick={wizard.goToStep}
      onPrev={wizard.prevStep}
      onNext={showSummary ? handleSubmit : handleNext}
    >
      {showSummary ? (
        <SummaryReview
          steps={WIZARD_STEPS}
          formData={wizard.formData}
          onEdit={wizard.goToStep}
          onSubmit={handleSubmit}
          isSubmitting={wizard.isSubmitting}
        />
      ) : (
        <StepContent
          step={wizard.currentStepData}
          formData={wizard.formData}
          onFieldChange={wizard.updateField}
          errors={errors}
        />
      )}
    </WizardContainer>
  );
}
