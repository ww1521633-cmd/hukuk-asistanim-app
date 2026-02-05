'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Building2, ShoppingCart, AlertCircle, FileText, Paperclip, Edit2 } from 'lucide-react';
import { useState } from 'react';

const iconMap = {
  Building2,
  ShoppingCart,
  AlertCircle,
  FileText,
  Paperclip
};

/**
 * Summary Review Component
 * Shows all entered data before submission
 */
export function SummaryReview({ steps, formData, onEdit, onSubmit, isSubmitting }) {
  const [confirmed, setConfirmed] = useState(false);

  const getFieldLabel = (field) => {
    return field.label;
  };

  const getFieldValue = (field, value) => {
    if (!value && value !== false) return '—';

    // Boolean
    if (field.type === 'boolean') {
      return value ? '✅ Evet' : '❌ Hayır';
    }

    // Select
    if (field.type === 'select' && field.options) {
      const option = field.options.find(opt => opt.value === value);
      return option ? option.label : value;
    }

    // Date
    if (field.type === 'date' && value) {
      return new Date(value).toLocaleDateString('tr-TR');
    }

    // Number with currency
    if (field.id.includes('price') || field.id.includes('amount')) {
      return `${parseFloat(value).toLocaleString('tr-TR')} TL`;
    }

    return value;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">
            Başvuru Özeti
          </CardTitle>
          <p className="text-sm text-gray-600">
            Lütfen girdiğiniz bilgileri kontrol edin. Düzenleme yapmak için ilgili bölümün üstundeki "Düzenle" butonuna tıklayın.
          </p>
        </CardHeader>
      </Card>

      {/* Step Summaries */}
      {steps.map((step, stepIndex) => {
        const Icon = iconMap[step.icon] || AlertCircle;
        const hasData = step.fields.some(field => formData[field.id]);

        return (
          <Card key={step.id} className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(stepIndex)}
                  className="gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Düzenle
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {hasData ? (
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {step.fields.map((field) => {
                    const value = formData[field.id];
                    if (!value && value !== false && !field.required) return null;

                    return (
                      <div key={field.id} className="space-y-1">
                        <dt className="text-sm font-medium text-gray-500">
                          {getFieldLabel(field)}
                        </dt>
                        <dd className="text-sm text-gray-900 font-medium">
                          {getFieldValue(field, value)}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              ) : (
                <p className="text-sm text-gray-400 italic">Bu bölüm için henüz veri girilmemiş</p>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Confirmation */}
      <Card className="border-2 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="confirm"
              checked={confirmed}
              onCheckedChange={setConfirmed}
            />
            <div className="flex-1">
              <Label
                htmlFor="confirm"
                className="text-sm font-medium cursor-pointer"
              >
                Yukarıdaki bilgilerin doğru olduğunu onaylar, Tüketici Hakem Heyeti'ne başvurumu yapmasını kabul ederim.
              </Label>
              <p className="text-xs text-gray-500 mt-1">
                6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamında başvuru yapıyorunuz.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <p className="text-sm font-medium text-accent mb-2">
              ⚠️ Önemli Bilgilendirme:
            </p>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Başvurunuz THH'ye iletilecektir</li>
              <li>• İnceleme süreci 2-3 ay sürebilir</li>
              <li>• Eksik belgeler varsa tamamlamanız istenecektir</li>
              <li>• Kararın size tebliğ edilmesini bekleyiniz</li>
            </ul>
          </div>

          <Button
            onClick={onSubmit}
            disabled={!confirmed || isSubmitting}
            className="w-full mt-6 bg-primary hover:bg-primary/90"
            size="lg"
          >
            {isSubmitting ? 'Başvuru Gönderiliyor...' : 'Başvuruyu Onayla ve Gönder'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
