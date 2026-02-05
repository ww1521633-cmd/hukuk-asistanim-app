'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Dynamically import PDF components (they only work on client-side)
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

const ArbitrationPDFDocument = dynamic(
  () => import('./ArbitrationPDF').then((mod) => mod.ArbitrationPDFDocument),
  { ssr: false }
);

/**
 * PDF Download Button Component
 * Handles dynamic loading and generation of PDF
 */
export function PDFDownloadButton({ formData, referenceNumber, applicantInfo, className }) {
  const [isReady, setIsReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleClick = () => {
    if (!isReady) {
      setIsGenerating(true);
      // Trigger PDF generation
      setTimeout(() => {
        setIsReady(true);
        setIsGenerating(false);
      }, 100);
    }
  };

  const fileName = `THH-Basvuru-${referenceNumber || 'Ozet'}.pdf`;

  // Mock applicant info if not provided (will be replaced with Clerk data later)
  const defaultApplicantInfo = applicantInfo || {
    fullName: 'Başvuru Sahibi',
    tcNo: '***********',
    address: '(Sistemde kayıtlı adres)',
    phone: '(Sistemde kayıtlı telefon)',
    email: '(Sistemde kayıtlı e-posta)'
  };

  if (!isReady) {
    return (
      <Button
        variant="outline"
        onClick={handleClick}
        disabled={isGenerating}
        className={className}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            PDF Hazırlanıyor...
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

  return (
    <PDFDownloadLink
      document={
        <ArbitrationPDFDocument
          formData={formData}
          referenceNumber={referenceNumber}
          applicantInfo={defaultApplicantInfo}
        />
      }
      fileName={fileName}
      className={className}
    >
      {({ loading, error }) => {
        if (error) {
          toast.error('PDF oluşturulurken bir hata oluştu');
          return (
            <Button variant="outline" disabled className={className}>
              <Download className="w-5 h-5 mr-2" />
              Hata Oluştu
            </Button>
          );
        }

        return (
          <Button variant="outline" disabled={loading} className={className}>
            {loading ? (
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
      }}
    </PDFDownloadLink>
  );
}

export default PDFDownloadButton;
