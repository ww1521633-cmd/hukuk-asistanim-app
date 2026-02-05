'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scale, Clock, CheckCircle2, AlertCircle, Info } from 'lucide-react';

const THH_INFO_KEY = 'thh-info-shown';

/**
 * THH Info Modal Component
 * Shows information about Tüketici Hakem Heyeti on first visit
 */
export function THHInfoModal({ showOnFirstVisit = true }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (showOnFirstVisit && typeof window !== 'undefined') {
      const hasShown = localStorage.getItem(THH_INFO_KEY);
      if (!hasShown) {
        // Delay to let page load first
        setTimeout(() => {
          setIsOpen(true);
        }, 1000);
      }
    }
  }, [showOnFirstVisit]);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(THH_INFO_KEY, 'true');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Scale className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">Tüketici Hakem Heyeti Nedir?</DialogTitle>
              <DialogDescription>THH başvuru bilgilendirmesi</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* What is THH */}
          <div className="p-4 bg-primary/5 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong className="text-primary">Tüketici Hakem Heyetleri</strong>, tüketiciler ile satıcı/sağlayıcı
              arasındaki uyuşmazlıkları mahkemeye gitmeden çözen resmi kuruluşlardır.
              Her il ve ilçede faaliyet gösterirler.
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Ücretsiz Hizmet</p>
                <p className="text-xs text-gray-600">Başvuru ve işlem ücretsizdir, avukat tutmanız gerekmez</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">2024 Yılı Başvuru Limiti</p>
                <p className="text-xs text-gray-600">
                  <Badge variant="outline" className="mr-1">150.000 TL</Badge>
                  ve altındaki tüm uyuşmazlıklar için başvurabilirsiniz
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Süreç Süresi</p>
                <p className="text-xs text-gray-600">Başvurular genellikle 2-3 ay içinde sonuçlandırılır</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Bağlayıcı Karar</p>
                <p className="text-xs text-gray-600">
                  THH kararları kesindir ve icra yoluyla takip edilebilir
                </p>
              </div>
            </div>
          </div>

          {/* What can you apply for */}
          <div className="p-4 border rounded-lg">
            <p className="font-medium text-sm mb-2">Hangi Konularda Başvurabilirsiniz?</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Ayıplı mal (arızalı, hasarlı ürün)</li>
              <li>• Teslim edilmeyen veya geciken siparişler</li>
              <li>• İade/değişim sorunları</li>
              <li>• Garanti kapsamına alınmayan ürünler</li>
              <li>• Yanıltıcı reklam ve haksız fiyatlandırma</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="flex gap-3 pt-2">
            <Button 
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={handleClose}
            >
              Anladım, Başvuruya Geç
            </Button>
          </div>

          {/* Footer note */}
          <p className="text-xs text-gray-500 text-center">
            Bu bilgilendirme sadece bir kez gösterilir. Detaylı bilgi için{' '}
            <a href="https://tuketici.ticaret.gov.tr" target="_blank" rel="noopener" className="text-primary hover:underline">
              Ticaret Bakanlığı
            </a>{' '}
            web sitesini ziyaret edebilirsiniz.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * THH Info Tooltip Trigger Button
 * Can be placed anywhere to show the info modal on click
 */
export function THHInfoButton({ className }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className={className}
        onClick={() => setIsOpen(true)}
      >
        <Info className="w-4 h-4 text-gray-500" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Scale className="w-6 h-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl">Tüketici Hakem Heyeti Hakkında</DialogTitle>
                <DialogDescription>THH başvuru bilgilendirmesi</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong className="text-primary">Tüketici Hakem Heyetleri</strong>, tüketiciler ile satıcı/sağlayıcı
                arasındaki uyuşmazlıkları mahkemeye gitmeden çözen resmi kuruluşlardır.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">150.000 TL</p>
                <p className="text-xs text-gray-600">2024 Başvuru Limiti</p>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <p className="text-2xl font-bold text-accent">Ücretsiz</p>
                <p className="text-xs text-gray-600">Başvuru Ücreti</p>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">2-3 Ay</p>
                <p className="text-xs text-gray-600">Sonuçlanma Süresi</p>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">Bağlayıcı</p>
                <p className="text-xs text-gray-600">Karar Niteliği</p>
              </div>
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => setIsOpen(false)}
            >
              Kapat
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default THHInfoModal;
