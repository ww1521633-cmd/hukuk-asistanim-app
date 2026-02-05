'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2, FileText } from 'lucide-react';
import { toast } from 'sonner';

/**
 * PDF Download Button Component
 * Uses @react-pdf/renderer with proper client-side only rendering
 */
export function PDFDownloadButton({ formData, referenceNumber, applicantInfo, className }) {
  const [isClient, setIsClient] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [error, setError] = useState(null);

  // Ensure we're on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const fileName = `THH-Basvuru-${referenceNumber || 'Ozet'}.pdf`;

  // Mock applicant info if not provided
  const defaultApplicantInfo = applicantInfo || {
    fullName: 'Başvuru Sahibi',
    tcNo: '***********',
    address: '(Sistemde kayıtlı adres)',
    phone: '(Sistemde kayıtlı telefon)',
    email: '(Sistemde kayıtlı e-posta)'
  };

  const generatePDF = async () => {
    if (!isClient) return;
    
    setIsGenerating(true);
    setError(null);

    try {
      // Dynamically import react-pdf only on client side
      const { pdf } = await import('@react-pdf/renderer');
      const { ArbitrationPDFDocument } = await import('./ArbitrationPDF');

      // Generate PDF blob
      const blob = await pdf(
        <ArbitrationPDFDocument
          formData={formData}
          referenceNumber={referenceNumber}
          applicantInfo={defaultApplicantInfo}
        />
      ).toBlob();

      // Create download link and trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('PDF başarıyla indirildi!');
    } catch (err) {
      console.error('PDF generation error:', err);
      setError(err.message);
      toast.error('PDF oluşturulurken bir hata oluştu', {
        description: 'Lütfen tekrar deneyin veya tarayıcınızı yenileyin'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isClient) {
    return (
      <Button variant="outline" disabled className={className}>
        <Download className="w-5 h-5 mr-2" />
        Başvuru Özetini İndir (PDF)
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={generatePDF}
      disabled={isGenerating}
      className={className}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          PDF Oluşturuluyor...
        </>
      ) : (
        <>
          <Download className="w-5 h-5 mr-2" />
          Başvuru Özetini İndir (PDF)
        </>
      )}
    </Button>
  );
}

export default PDFDownloadButton;
