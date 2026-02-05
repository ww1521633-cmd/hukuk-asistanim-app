'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SplitScreenContainer } from '@/components/petition/SplitScreenContainer';
import { DynamicForm } from '@/components/petition/DynamicForm';
import { LivePreview } from '@/components/petition/LivePreview';
import { Button } from '@/components/ui/button';
import { PETITION_TEMPLATES, getTemplateById, generatePetitionContent, saveToLocalStorage } from '@/lib/mockData';
import { Download, Save, ArrowLeft, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const DRAFT_STORAGE_KEY = 'petition-draft';

function PetitionCreatorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateIdFromUrl = searchParams.get('template');
  
  const [selectedTemplateId, setSelectedTemplateId] = useState(templateIdFromUrl || PETITION_TEMPLATES[0].id);
  const [formData, setFormData] = useState({});
  const [previewContent, setPreviewContent] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Track if initial load from localStorage is complete
  const isInitialized = useRef(false);
  const lastTemplateId = useRef(selectedTemplateId);

  const selectedTemplate = getTemplateById(selectedTemplateId);

  // Load draft from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialized.current) {
      try {
        const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (savedDraft) {
          const draft = JSON.parse(savedDraft);
          // Only load if there's actual data and it matches current template (or no URL template specified)
          if (draft.formData && Object.keys(draft.formData).length > 0) {
            // If URL has a template, prioritize URL template
            if (templateIdFromUrl) {
              if (draft.templateId === templateIdFromUrl) {
                setFormData(draft.formData);
                toast.info('Kayıtlı taslak yüklendi', {
                  description: 'Kaldığınız yerden devam edebilirsiniz'
                });
              }
            } else {
              // No URL template, load saved template and data
              setSelectedTemplateId(draft.templateId || PETITION_TEMPLATES[0].id);
              lastTemplateId.current = draft.templateId || PETITION_TEMPLATES[0].id;
              setFormData(draft.formData);
              toast.info('Kayıtlı taslak yüklendi', {
                description: 'Kaldığınız yerden devam edebilirsiniz'
              });
            }
          }
        }
      } catch (e) {
        console.error('Failed to load draft:', e);
      }
      isInitialized.current = true;
    }
  }, [templateIdFromUrl]);

  // Auto-save draft to localStorage whenever form data changes
  useEffect(() => {
    // Don't save until initial load is complete
    if (!isInitialized.current) return;
    
    if (typeof window !== 'undefined' && Object.keys(formData).length > 0) {
      const draft = {
        templateId: selectedTemplateId,
        formData: formData,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    }
  }, [formData, selectedTemplateId]);

  // Update preview when form data changes
  useEffect(() => {
    if (selectedTemplate) {
      const content = generatePetitionContent(selectedTemplate, formData);
      setPreviewContent(content);
    }
  }, [formData, selectedTemplate]);

  // Reset form when template changes manually (not from draft load)
  useEffect(() => {
    // Skip if not initialized or if this is the initial template from draft
    if (!isInitialized.current) return;
    
    // Check if template actually changed (not just re-render)
    if (lastTemplateId.current !== selectedTemplateId) {
      // User manually changed template - reset form
      setFormData({});
      // Clear draft for new template
      if (typeof window !== 'undefined') {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      }
      lastTemplateId.current = selectedTemplateId;
    }
  }, [selectedTemplateId]);

  const handleFormChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate async save (for UX feedback)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Save draft to localStorage
    const draft = {
      templateId: selectedTemplateId,
      formData: formData,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    
    // Also save to petitions list
    const petition = {
      template_id: selectedTemplateId,
      template_name: selectedTemplate.name,
      variable_data: formData,
      generated_title: selectedTemplate.name,
      generated_content: previewContent,
      status: 'draft'
    };
    
    saveToLocalStorage(petition);
    setIsSaving(false);
    toast.success('Taslak kaydedildi!', {
      description: 'Dilekçenize dashboard\'dan ulaşabilirsiniz.',
      action: {
        label: 'Görüntüle',
        onClick: () => router.push('/dashboard')
      }
    });
  };

  const handleClearDraft = () => {
    setFormData({});
    if (typeof window !== 'undefined') {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    }
    toast.info('Taslak temizlendi');
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const { PetitionPDFDocument } = await import('@/components/petition/PetitionPDF');

      const blob = await pdf(
        <PetitionPDFDocument
          templateName={selectedTemplate.name}
          content={previewContent}
          formData={formData}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedTemplate.name.replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('PDF başarıyla indirildi!');
    } catch (err) {
      console.error('PDF generation error:', err);
      toast.error('PDF oluşturulurken bir hata oluştu', {
        description: 'Lütfen tekrar deneyin'
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (!selectedTemplate) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Ana Sayfa
                </Link>
              </Button>
              
              <div className="hidden md:flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-semibold text-gray-700">Dilekçe Oluşturucu</span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PETITION_TEMPLATES.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="hidden sm:inline">Kaydediliyor...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span className="hidden sm:inline">Kaydet</span>
                  </>
                )}
              </Button>
              <Button 
                size="sm"
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="bg-accent hover:bg-accent/90 gap-2"
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="hidden sm:inline">Oluşturuluyor...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">PDF İndir</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Split Screen Container */}
      <SplitScreenContainer>
        {/* Left: Form */}
        <div className="py-6">
          <div className="px-4 md:px-6 mb-6">
            <h1 className="text-2xl font-bold text-primary mb-2">
              {selectedTemplate.name}
            </h1>
            <p className="text-gray-600 text-sm">
              {selectedTemplate.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                {selectedTemplate.category}
              </span>
              <span className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full">
                {selectedTemplate.estimated_process_time}
              </span>
            </div>
          </div>
          
          <DynamicForm 
            fields={selectedTemplate.content_structure}
            onChange={handleFormChange}
            values={formData}
          />
        </div>

        {/* Right: Preview */}
        <LivePreview 
          content={previewContent}
          templateName={selectedTemplate.name}
        />
      </SplitScreenContainer>
    </div>
  );
}

export default function PetitionCreatorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    }>
      <PetitionCreatorContent />
    </Suspense>
  );
}
