'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useArbitrationWizard } from '@/hooks/use-arbitration-wizard';
import { WIZARD_STEPS } from '@/data/mock-arbitration-wizard';
import { WizardContainer } from '@/components/arbitration/WizardContainer';
import { StepContent } from '@/components/arbitration/StepContent';
import { SummaryReview } from '@/components/arbitration/SummaryReview';
import { CompletionScreen } from '@/components/arbitration/CompletionScreen';
import { Button } from '@/components/ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { Info, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * Main Wizard Page for Tüketici Hakem Heyeti (Consumer Arbitration)
 * Handles the complete application flow with validation and persistence
 */
export default function TuketiciHakemPage() {
  const router = useRouter();
  const wizard = useArbitrationWizard();
  const [errors, setErrors] = useState({});
  const [lastSaved, setLastSaved] = useState(null);
  const [applicationId, setApplicationId] = useState(null);
  const firstErrorRef = useRef(null);

  // Show draft loaded notification on mount if there's saved data
  useEffect(() => {
    if (Object.keys(wizard.formData).length > 0 && !wizard.isCompleted) {
      toast.info('Kayıtlı taslak yüklendi', {
        description: 'Kaldığınız yerden devam edebilirsiniz',
        duration: 3000
      });
    }
  }, []);

  // Auto-save notification effect
  useEffect(() => {
    if (Object.keys(wizard.formData).length > 0 && !wizard.isCompleted) {
      const now = new Date();
      setLastSaved(now);
      
      // Debounced toast for auto-save
      const timeout = setTimeout(() => {
        toast.success('Taslak kaydedildi', {
          duration: 2000,
          position: 'bottom-right',
          icon: <Save className="w-4 h-4" />
        });
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [wizard.formData]);

  // Scroll to first error
  useEffect(() => {
    if (Object.keys(errors).length > 0 && firstErrorRef.current) {
      firstErrorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [errors]);

  /**
   * Validate current step fields
   */
  const validateCurrentStep = () => {
    const step = WIZARD_STEPS[wizard.currentStep];
    const newErrors = {};
    let isValid = true;

    step.fields.forEach(field => {
      const value = wizard.formData[field.id];

      // Required field check
      if (field.required && !value && value !== false && value !== 0) {
        newErrors[field.id] = `${field.label} zorunludur`;
        isValid = false;
        return;
      }

      // Skip further validation if field is empty and not required
      if (!value && value !== false && value !== 0) return;

      // Number validation
      if (field.type === 'number') {
        const numValue = parseFloat(value);
        if (field.validation?.min !== undefined && numValue < field.validation.min) {
          newErrors[field.id] = `Minimum değer: ${field.validation.min}`;
          isValid = false;
        }
        if (field.validation?.max !== undefined && numValue > field.validation.max) {
          newErrors[field.id] = `Maksimum değer: ${field.validation.max}`;
          isValid = false;
        }
      }

      // Date validation
      if (field.type === 'date' && value) {
        const dateValue = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Purchase date should not be in future
        if (field.id === 'purchase_date' && dateValue > today) {
          newErrors[field.id] = 'Satın alma tarihi gelecekte olamaz';
          isValid = false;
        }

        // Defect date should not be before purchase date
        if (field.id === 'defect_date') {
          const purchaseDate = wizard.formData.purchase_date;
          if (purchaseDate && dateValue < new Date(purchaseDate)) {
            newErrors[field.id] = 'Arıza tarihi satın alma tarihinden önce olamaz';
            isValid = false;
          }
          if (dateValue > today) {
            newErrors[field.id] = 'Arıza tarihi gelecekte olamaz';
            isValid = false;
          }
        }
      }
    });

    return { isValid, errors: newErrors };
  };

  /**
   * Handle next step navigation
   */
  const handleNext = () => {
    // Clear previous errors
    setErrors({});

    // Validate current step
    const validation = validateCurrentStep();

    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error('Lütfen tüm zorunlu alanları doğru şekilde doldurun', {
        description: `${Object.keys(validation.errors).length} hata bulundu`
      });
      return;
    }

    // Proceed to next step
    wizard.nextStep();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Handle application submission
   */
  const handleSubmit = async () => {
    try {
      const application = await wizard.submitApplication();
      
      // Generate mock reference number
      const refNumber = `THH-2024-${application.id.slice(-6).toUpperCase()}`;
      setApplicationId(refNumber);

      toast.success('Başvurunuz başarıyla gönderildi!', {
        description: `Referans No: ${refNumber}`
      });
    } catch (error) {
      toast.error('Başvuru gönderilirken bir hata oluştu', {
        description: 'Lütfen tekrar deneyin'
      });
      console.error('Submission error:', error);
    }
  };

  /**
   * Handle new application
   */
  const handleNewApplication = () => {
    wizard.resetWizard();
    setErrors({});
    setApplicationId(null);
    router.push('/tuketici-hakem');
  };

  /**
   * Handle PDF download (using window.print for now)
   */
  const handleDownloadSummary = () => {
    // Create printable content
    const printContent = generatePrintContent();
    
    // Open print dialog
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    } else {
      toast.error('Popup engelleyici aktif olabilir', {
        description: 'Lütfen popup engelleyiciyi devre dışı bırakın'
      });
    }
  };

  /**
   * Generate printable HTML content
   */
  const generatePrintContent = () => {
    const refNumber = applicationId || `THH-2024-${Date.now().toString().slice(-6)}`;
    const today = new Date().toLocaleDateString('tr-TR');

    let fieldsHtml = '';
    WIZARD_STEPS.forEach(step => {
      fieldsHtml += `<h3 style="margin-top: 20px; color: #1e3a5f;">${step.title}</h3>`;
      fieldsHtml += '<table style="width: 100%; border-collapse: collapse;">';
      
      step.fields.forEach(field => {
        const value = wizard.formData[field.id];
        let displayValue = value || '—';
        
        if (field.type === 'boolean') {
          displayValue = value ? 'Evet' : 'Hayır';
        } else if (field.type === 'select' && field.options) {
          const option = field.options.find(opt => opt.value === value);
          displayValue = option ? option.label : value || '—';
        } else if (field.type === 'date' && value) {
          displayValue = new Date(value).toLocaleDateString('tr-TR');
        }

        fieldsHtml += `
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold; width: 40%;">${field.label}</td>
            <td style="padding: 8px;">${displayValue}</td>
          </tr>
        `;
      });
      
      fieldsHtml += '</table>';
    });

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>THH Başvuru Özeti - ${refNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          h1 { color: #1e3a5f; border-bottom: 3px solid #f97316; padding-bottom: 10px; }
          h2 { color: #1e3a5f; margin-top: 30px; }
          .header { text-align: center; margin-bottom: 40px; }
          .ref-box { background: #f0f9ff; border: 2px solid #1e3a5f; padding: 15px; text-align: center; margin: 20px 0; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc; font-size: 12px; color: #666; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Tüketici Hakem Heyeti Başvuru Özeti</h1>
          <div class="ref-box">
            <strong>Referans Numarası:</strong> ${refNumber}<br>
            <strong>Başvuru Tarihi:</strong> ${today}
          </div>
        </div>
        
        <h2>Başvuru Detayları</h2>
        ${fieldsHtml}
        
        <div class="footer">
          <p>Bu belge HukukAsistanım platformu üzerinden oluşturulmuştur.</p>
          <p>Tarih: ${today}</p>
        </div>
      </body>
      </html>
    `;
  };

  /**
   * Handle step edit from summary
   */
  const handleEditStep = (stepIndex) => {
    wizard.goToStep(stepIndex);
    setErrors({});
  };

  // Show completion screen if submitted
  if (wizard.isCompleted) {
    return (
      <CompletionScreen
        applicationId={applicationId}
        formData={wizard.formData}
        onNewApplication={handleNewApplication}
        onDownloadSummary={handleDownloadSummary}
      />
    );
  }

  // Determine if we should show summary
  const showSummary = wizard.isLastStep;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                className="gap-2"
              >
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </Link>
              </Button>
              
              <div className="hidden md:flex items-center gap-2">
                <h1 className="text-lg font-semibold text-primary">
                  Tüketici Hakem Heyeti Başvurusu
                </h1>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Info className="w-4 h-4 text-gray-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-sm">
                      <p className="font-semibold mb-1">THH Başvurusu Nedir?</p>
                      <p className="text-sm">
                        Tüketici Hakem Heyetleri, tüketiciler ile satıcı/sağlayıcı arasındaki 
                        uyuşmazlıkları çözen resmi kuruluşlardır. 2024 yılı için 104.000 TL 
                        ve altındaki uyuşmazlıklar için başvuru yapabilirsiniz.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {lastSaved && (
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                <Save className="w-4 h-4" />
                <span>
                  Son kayıt: {lastSaved.toLocaleTimeString('tr-TR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Wizard Content */}
      <WizardContainer
        steps={WIZARD_STEPS}
        currentStep={wizard.currentStep}
        completedSteps={wizard.completedSteps}
        progress={wizard.progress}
        canGoNext={wizard.canGoNext || wizard.isLastStep}
        canGoPrev={wizard.canGoPrev}
        isLastStep={wizard.isLastStep}
        onStepClick={handleEditStep}
        onPrev={wizard.prevStep}
        onNext={showSummary ? handleSubmit : handleNext}
      >
        {showSummary ? (
          <SummaryReview
            steps={WIZARD_STEPS}
            formData={wizard.formData}
            onEdit={handleEditStep}
            onSubmit={handleSubmit}
            isSubmitting={wizard.isSubmitting}
          />
        ) : (
          <div ref={Object.keys(errors).length > 0 ? firstErrorRef : null}>
            <StepContent
              step={wizard.currentStepData}
              formData={wizard.formData}
              onFieldChange={wizard.updateField}
              errors={errors}
            />
          </div>
        )}
      </WizardContainer>
    </div>
  );
}
