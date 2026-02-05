'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RiskGauge } from './RiskGauge';
import { SuccessAnimation } from '@/components/shared/SuccessAnimation';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Shield, 
  AlertOctagon,
  AlertCircle,
  Download,
  Share2,
  FileText,
  TrendingUp,
  TrendingDown,
  Loader2
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

/**
 * Risk Result Component
 * Displays final risk analysis results
 */
export function RiskResult({ result, scenarioName, answers, questions, onStartNew, onDownloadReport }) {
  const { riskScore, riskLevel, gaugeColor, recommendation, criticalFactors, advice } = result;
  const [isClient, setIsClient] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // PDF Download function
  const handleDownloadPDF = async () => {
    if (!isClient) return;
    
    setIsGeneratingPDF(true);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const { RiskPDFDocument } = await import('./RiskPDF');

      const blob = await pdf(
        <RiskPDFDocument
          result={result}
          scenarioName={scenarioName}
          answers={answers}
          questions={questions}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Risk-Analizi-${scenarioName.replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('PDF başarıyla indirildi!');
    } catch (err) {
      console.error('PDF generation error:', err);
      toast.error('PDF oluşturulurken bir hata oluştu');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Get risk level icon and color
  const getRiskIcon = () => {
    switch (riskLevel) {
      case 'low':
        return <CheckCircle2 className="w-6 h-6" />;
      case 'medium':
        return <AlertCircle className="w-6 h-6" />;
      case 'high':
        return <AlertTriangle className="w-6 h-6" />;
      case 'critical':
        return <AlertOctagon className="w-6 h-6" />;
      default:
        return <Shield className="w-6 h-6" />;
    }
  };

  const getRiskBadgeVariant = () => {
    switch (riskLevel) {
      case 'low':
        return 'default';
      case 'medium':
        return 'secondary';
      case 'high':
        return 'destructive';
      case 'critical':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  // Parse markdown-style advice text
  const formatAdvice = (text) => {
    return text.split('\\n').map((line, i) => {
      // Bold text
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={i} className="mb-2">
            {parts.map((part, j) => 
              j % 2 === 1 ? <strong key={j}>{part}</strong> : part
            )}
          </p>
        );
      }
      // Bullet points
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <li key={i} className="ml-4">
            {line.replace(/^[•\-]\s*/, '')}
          </li>
        );
      }
      // Regular paragraph
      if (line.trim()) {
        return <p key={i} className="mb-2">{line}</p>;
      }
      return null;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Card with Gauge and Success Animation */}
      <Card className="border-2">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Badge variant="outline">{scenarioName}</Badge>
          </div>
          <CardTitle className="text-2xl">Risk Analizi Tamamlandı</CardTitle>
          <CardDescription>
            Analiziniz tamamlandı. İşte sonuçlarınız.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            {/* Success Animation - shown briefly */}
            <div className="mb-4">
              <SuccessAnimation 
                show={true} 
                size={80} 
                confettiEnabled={riskLevel === 'low'}
                autoTrigger={true}
              />
            </div>
            
            {/* Risk Gauge */}
            <RiskGauge score={riskScore} color={gaugeColor} size={220} strokeWidth={24} />
            
            {/* Risk Level Badge */}
            <div className="mt-6 flex items-center gap-2">
              <div style={{ color: gaugeColor }}>
                {getRiskIcon()}
              </div>
              <Badge 
                variant={getRiskBadgeVariant()}
                className="text-lg px-4 py-2"
                style={{ 
                  backgroundColor: riskLevel === 'low' || riskLevel === 'medium' ? gaugeColor : undefined,
                  color: 'white'
                }}
              >
                {recommendation.title}
              </Badge>
            </div>

            {/* Description */}
            <p className="text-center text-gray-600 mt-4 max-w-2xl">
              {recommendation.description}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Critical Factors */}
      {criticalFactors && criticalFactors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Öne Çıkan Faktörler
            </CardTitle>
            <CardDescription>
              Risk skorunuzu en çok etkileyen faktörler
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalFactors.map((factor, index) => {
                const isPositive = factor.finalImpact < 0;
                const impactAbs = Math.abs(factor.finalImpact).toFixed(1);
                
                return (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <div className={`p-2 rounded-full ${
                      isPositive ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {isPositive ? (
                        <TrendingDown className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {factor.category}
                        </Badge>
                        <span className={`text-sm font-semibold ${
                          isPositive ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {isPositive ? '-' : '+'}{impactAbs} puan
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {factor.selectedOption}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {factor.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Advice */}
      {advice && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Detaylı Değerlendirme
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none text-gray-700">
              {formatAdvice(advice)}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            {getRiskIcon()}
            Öneriler ve Eylem Adımları
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recommendation.actions.map((action, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{action}</span>
              </li>
            ))}
          </ul>

          {(riskLevel === 'high' || riskLevel === 'critical') && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-900">
                    Avukat Desteği Önerilir
                  </p>
                  <p className="text-sm text-red-700 mt-1">
                    Risk seviyeniz yüksek. Profesyonel hukuki destek almanızı şiddetle tavsiye ederiz.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button variant="outline" onClick={onStartNew} className="gap-2">
          <FileText className="w-4 h-4" />
          Yeni Analiz
        </Button>
        <Button 
          variant="outline" 
          onClick={handleDownloadPDF} 
          disabled={isGeneratingPDF}
          className="gap-2"
        >
          {isGeneratingPDF ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              PDF Oluşturuluyor...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Rapor İndir (PDF)
            </>
          )}
        </Button>
        <Button variant="outline" className="gap-2">
          <Share2 className="w-4 h-4" />
          Paylaş
        </Button>
      </div>
    </div>
  );
}