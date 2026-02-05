'use client';

import { useArbitrationWizard } from '@/hooks/use-arbitration-wizard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ArbitrationWizardTestPage() {
  const wizard = useArbitrationWizard();

  const handleTestFillStep1 = () => {
    wizard.updateStepData('firm_info', {
      firm_name: 'Teknosa İç ve Dış Ticaret A.Ş.',
      firm_address: 'Büyükdere Cad. No:145 Şişli/İstanbul',
      firm_phone: '0212 123 45 67',
      firm_tax_no: '1234567890'
    });
  };

  const handleTestFillStep2 = () => {
    wizard.updateStepData('product_info', {
      product_type: 'product',
      product_name: 'iPhone 15 Pro 256GB',
      product_brand: 'Apple',
      invoice_number: 'TY987654321',
      purchase_date: '2024-01-15',
      purchase_place: 'Teknosa Kadıköy',
      product_price: 45000,
      warranty_status: 'under_warranty'
    });
  };

  console.log('🧪 Wizard State:', {
    currentStep: wizard.currentStep,
    progress: wizard.progress,
    canGoNext: wizard.canGoNext,
    canGoPrev: wizard.canGoPrev,
    isLastStep: wizard.isLastStep,
    completedSteps: wizard.completedSteps,
    formDataKeys: Object.keys(wizard.formData),
    summaryData: wizard.summaryData
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>🧪 Arbitration Wizard Hook Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">Current Step:</p>
                <p className="text-2xl font-bold text-primary">
                  {wizard.currentStep + 1} / {5}
                </p>
                <p className="text-sm mt-1">{wizard.currentStepData?.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Progress:</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${wizard.progress}%` }}
                    />
                  </div>
                  <span className="text-lg font-bold">{wizard.progress}%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <Badge variant={wizard.canGoPrev ? 'default' : 'secondary'}>
                Can Go Prev: {wizard.canGoPrev ? '✓' : '✗'}
              </Badge>
              <Badge variant={wizard.canGoNext ? 'default' : 'secondary'}>
                Can Go Next: {wizard.canGoNext ? '✓' : '✗'}
              </Badge>
              <Badge variant={wizard.isLastStep ? 'destructive' : 'outline'}>
                Last Step: {wizard.isLastStep ? '✓' : '✗'}
              </Badge>
            </div>

            <div className="space-y-2 mb-6">
              <p className="text-sm font-medium">Completed Steps:</p>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map(step => (
                  <div
                    key={step}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      wizard.completedSteps.includes(step)
                        ? 'bg-green-500 text-white'
                        : wizard.currentStep === step
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <p className="text-sm font-medium mb-3">Form Data:</p>
              <div className="bg-gray-100 p-4 rounded-lg text-xs font-mono max-h-40 overflow-auto">
                <pre>{JSON.stringify(wizard.formData, null, 2)}</pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Navigation Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Button 
                onClick={wizard.prevStep}
                disabled={!wizard.canGoPrev}
                variant="outline"
              >
                ← Previous
              </Button>
              <Button 
                onClick={wizard.nextStep}
                disabled={!wizard.canGoNext}
                className="flex-1"
              >
                Next →
              </Button>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={() => wizard.goToStep(0)}
                variant="ghost"
                size="sm"
              >
                Go to Step 1
              </Button>
              <Button 
                onClick={() => wizard.goToStep(2)}
                variant="ghost"
                size="sm"
              >
                Go to Step 3
              </Button>
              <Button 
                onClick={() => wizard.goToStep(4)}
                variant="ghost"
                size="sm"
              >
                Go to Step 5
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Test Data Fill</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={handleTestFillStep1}
              variant="outline"
              className="w-full"
            >
              Fill Step 1 (Firma Bilgileri)
            </Button>
            <Button 
              onClick={handleTestFillStep2}
              variant="outline"
              className="w-full"
            >
              Fill Step 2 (Ürün Bilgileri)
            </Button>
            <Button 
              onClick={() => wizard.updateField('complaint_type', 'defective')}
              variant="outline"
              className="w-full"
            >
              Set Single Field (complaint_type)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => {
                wizard.submitApplication()
                  .then(() => alert('✅ Application submitted!'))
                  .catch(err => alert('❌ Error: ' + err.message));
              }}
              disabled={wizard.isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {wizard.isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
            <Button 
              onClick={wizard.resetWizard}
              variant="destructive"
              className="w-full"
            >
              Reset Wizard
            </Button>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm font-medium mb-2">📝 Testing Checklist:</p>
          <ul className="text-xs space-y-1">
            <li>✓ Hook initializes with step 0</li>
            <li>✓ Progress calculates correctly (20% per step)</li>
            <li>✓ Navigation buttons enable/disable correctly</li>
            <li>✓ Form data persists to localStorage</li>
            <li>✓ Validation prevents next step without required fields</li>
            <li>✓ Completed steps tracked</li>
            <li>✓ Submit saves to arbitrationApplications</li>
            <li>✓ Reset clears all data</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
