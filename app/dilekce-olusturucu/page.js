'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SplitScreenContainer } from '@/components/petition/SplitScreenContainer';
import { DynamicForm } from '@/components/petition/DynamicForm';
import { LivePreview } from '@/components/petition/LivePreview';
import { Button } from '@/components/ui/button';
import { PETITION_TEMPLATES, getTemplateById, generatePetitionContent, saveToLocalStorage } from '@/lib/mockData';
import { Download, Save, ArrowLeft, FileText } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function PetitionCreatorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateIdFromUrl = searchParams.get('template');
  
  const [selectedTemplateId, setSelectedTemplateId] = useState(templateIdFromUrl || PETITION_TEMPLATES[0].id);
  const [formData, setFormData] = useState({});
  const [previewContent, setPreviewContent] = useState('');

  const selectedTemplate = getTemplateById(selectedTemplateId);

  // Update preview when form data changes
  useEffect(() => {
    if (selectedTemplate) {
      const content = generatePetitionContent(selectedTemplate, formData);
      setPreviewContent(content);
    }
  }, [formData, selectedTemplate]);

  // Reset form when template changes
  useEffect(() => {
    setFormData({});
  }, [selectedTemplateId]);

  const handleFormChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleSave = () => {
    const petition = {
      template_id: selectedTemplateId,
      template_name: selectedTemplate.name,
      variable_data: formData,
      generated_title: selectedTemplate.name,
      generated_content: previewContent,
      status: 'draft'
    };
    
    saveToLocalStorage(petition);
    toast.success('Dilekçe kaydedildi!', {
      description: 'Dilekçeniz başarıyla kaydedildi.'
    });
  };

  const handleDownloadPDF = () => {
    // Simple print-to-PDF for now
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${selectedTemplate.name}</title>
          <style>
            @page {
              size: A4;
              margin: 20mm;
            }
            body {
              font-family: Georgia, 'Times New Roman', serif;
              font-size: 12pt;
              line-height: 1.6;
              color: #000;
              white-space: pre-wrap;
            }
            .header {
              border-bottom: 2px solid #1e3a8a;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }
            .header h1 {
              color: #1e3a8a;
              font-size: 14pt;
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${selectedTemplate.name}</h1>
          </div>
          <div>${previewContent.replace(/\n/g, '<br>')}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
    
    toast.success('PDF indirme hazırlandı', {
      description: 'Yazdırma penceresi açıldı. PDF olarak kaydedin.'
    });
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
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Kaydet</span>
              </Button>
              <Button 
                size="sm"
                onClick={handleDownloadPDF}
                className="bg-accent hover:bg-accent/90 gap-2"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">PDF İndir</span>
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
