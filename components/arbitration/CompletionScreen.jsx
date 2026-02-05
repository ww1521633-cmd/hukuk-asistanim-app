'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, Home, FileText } from 'lucide-react';

/**
 * Completion Screen Component
 * Success screen after submission
 */
export function CompletionScreen({ applicationId, onNewApplication, onDownloadSummary }) {
  const referenceNumber = applicationId || `THH-${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Başvurunuz Alındı!
          </h1>
          <p className="text-gray-600">
            Tüketici Hakem Heyeti başvurunuz başarıyla oluşturuldu.
          </p>
        </div>

        {/* Reference Number */}
        <Card className="border-2 border-primary/20 bg-primary/5 mb-6">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Başvuru Referans Numarası</p>
            <p className="text-2xl font-bold text-primary mb-4">
              {referenceNumber}
            </p>
            <p className="text-xs text-gray-500">
              Bu numarayı not alın. Başvurunuzu takip etmek için kullanabilirsiniz.
            </p>
          </CardContent>
        </Card>

        {/* Next Steps Info */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Sonraki Adımlar
            </h2>
            <ol className="space-y-3">
              {[
                {
                  step: '1',
                  title: 'Başvuru İncelemesi',
                  desc: 'THH başvurunuzu 15 gün içinde değerlendirecek'
                },
                {
                  step: '2',
                  title: 'Eksik Belge Talebi',
                  desc: 'Gerekirse eksik belgeler için sizinle iletişime geçilecek'
                },
                {
                  step: '3',
                  title: 'Duruşma Tarihi',
                  desc: 'Tarafların dinleneceği duruşma tarihi belirlenecek'
                },
                {
                  step: '4',
                  title: 'Karar Bildirimi',
                  desc: 'THH kararı 2-3 ay içinde size tebliğ edilecek'
                }
              ].map((item) => (
                <li key={item.step} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Important Info */}
        <Card className="border-2 border-accent/20 bg-accent/5 mb-6">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-sm mb-3 text-accent">
              📋 Önemli Bilgiler
            </h3>
            <ul className="text-xs text-gray-700 space-y-2">
              <li>• Başvuru belgenizi ve eklerini saklamaya devam edin</li>
              <li>• Duruşma davetiniz geldiğinde mutlaka katılın</li>
              <li>• Firma ile yapacağınız tüm iletişimi yazılı tutun</li>
              <li>• THH kararını beklerken başka bir dava açmayın</li>
              <li>• Karar lehinizdeyse 15 gün içinde icra takibi yapabilirsiniz</li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onDownloadSummary}
            variant="outline"
            className="w-full gap-2"
            size="lg"
          >
            <Download className="w-5 h-5" />
            Başvuru Özetini İndir (PDF)
          </Button>
          <Button
            onClick={onNewApplication}
            className="w-full gap-2 bg-primary hover:bg-primary/90"
            size="lg"
          >
            <Home className="w-5 h-5" />
            Ana Sayfaya Dön
          </Button>
        </div>

        {/* Support Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Sorularınız için:{' '}
            <a href="tel:08503110655" className="text-primary hover:underline">
              0850 311 06 55
            </a>
            {' '}(Tüketici Danışma Hattı)
          </p>
        </div>
      </div>
    </div>
  );
}
