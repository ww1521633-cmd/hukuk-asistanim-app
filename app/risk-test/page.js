'use client';

import { useState } from 'react';
import { RiskGauge, LinearGauge } from '@/components/risk/RiskGauge';
import { QuestionCard } from '@/components/risk/QuestionCard';
import { ProgressBar } from '@/components/risk/ProgressBar';
import { RiskResult } from '@/components/risk/RiskResult';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RISK_SCENARIOS } from '@/data/mock-risk-scenarios';
import { calculateRisk } from '@/lib/risk-engine';

export default function RiskComponentsTest() {
  const [activeTest, setActiveTest] = useState('gauge');

  // Test data
  const testQuestion = RISK_SCENARIOS[0].questions[0];
  const [testAnswer, setTestAnswer] = useState(null);

  // Test result data
  const testResultData = {
    riskScore: 75,
    riskLevel: 'high',
    gaugeColor: '#ef4444',
    recommendation: {
      title: 'Yüksek Risk - Hukuki Destek Alın',
      description: 'Ciddi hukuki riskler var. Profesyonel yardım almanız şiddetle önerilir.',
      actions: [
        'ACİL: Bir avukat tutun ve dosyayı inceletin',
        'Tüm belgeleri toplayın (sözleşme, dekont, fotoğraf)',
        'Karşı tarafa yazılı bildirim gönderin',
        'Dava açılırsa savunmanızı hazırlayın'
      ],
      color: 'red'
    },
    criticalFactors: [
      {
        category: 'Ödeme Geçmişi',
        selectedOption: '3 aydan fazla gecikme var',
        finalImpact: 75.0,
        explanation: 'Yüksek tahliye riski. Acil ödeme yapmalısınız.'
      },
      {
        category: 'Sözleşme Durumu',
        selectedOption: 'Hiçbir anlaşma belgesi yok',
        finalImpact: 70.0,
        explanation: 'Çok yüksek risk. Hukuki süreç uzun ve zor olabilir.'
      }
    ],
    advice: `Risk skorunuz 75/100 ile **Yüksek** seviyede. Ciddi hukuki riskler tespit edildi. \n\n**Öne Çıkan Risk Faktörleri:**\n1. ⚠️ **Ödeme Geçmişi**: 3 aydan fazla gecikme - Bu durum riskinizi artırıyor.\n\n**Hemen Yapmanız Gerekenler:**\n• 👨‍⚖️ Bir hukuk danışmanına başvurun\n• 📝 Eksik delilleri tamamlayın\n• 📨 Yazılı bildirimleri hazırlayın`
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Risk Analysis Components Test
          </h1>
          <p className="text-gray-600">
            Testing all 4 risk analysis UI components
          </p>
        </div>

        {/* Component Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['gauge', 'question', 'progress', 'result'].map(test => (
            <Button
              key={test}
              variant={activeTest === test ? 'default' : 'outline'}
              onClick={() => setActiveTest(test)}
              className="capitalize"
            >
              {test}
            </Button>
          ))}
        </div>

        {/* Test Display */}
        <div className="space-y-6">
          {activeTest === 'gauge' && (
            <Card>
              <CardHeader>
                <CardTitle>1. RiskGauge Component</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <p className="text-sm font-medium mb-4 text-green-600">Low Risk</p>
                    <RiskGauge score={25} color="#10b981" size={180} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium mb-4 text-orange-600">Medium Risk</p>
                    <RiskGauge score={50} color="#f59e0b" size={180} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium mb-4 text-red-600">High Risk</p>
                    <RiskGauge score={75} color="#ef4444" size={180} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium mb-4 text-purple-600">Critical Risk</p>
                    <RiskGauge score={95} color="#9333ea" size={180} />
                  </div>
                </div>

                <div className="mt-8 max-w-md mx-auto">
                  <p className="text-sm font-medium mb-4">Linear Gauge Alternative:</p>
                  <LinearGauge score={75} color="#ef4444" />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTest === 'question' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>2. QuestionCard Component</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Testing with first question from Kira Anlaşmazlığı scenario
                  </p>
                </CardContent>
              </Card>

              <QuestionCard
                question={testQuestion}
                value={testAnswer}
                onChange={(qId, value) => setTestAnswer(value)}
                questionNumber={1}
              />

              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">
                    <strong>Selected Answer:</strong> {testAnswer || 'None'}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTest === 'progress' && (
            <Card>
              <CardHeader>
                <CardTitle>3. ProgressBar Component</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <p className="text-sm font-medium mb-4">Step 1 of 6</p>
                  <ProgressBar currentStep={1} totalSteps={6} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-4">Step 3 of 6</p>
                  <ProgressBar currentStep={3} totalSteps={6} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-4">Step 6 of 6 (Completed)</p>
                  <ProgressBar currentStep={6} totalSteps={6} />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTest === 'result' && (
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>4. RiskResult Component</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Testing with sample high-risk result (75/100)
                  </p>
                </CardContent>
              </Card>

              <RiskResult
                result={testResultData}
                scenarioName="Kira Anlaşmazlığı Risk Analizi"
                onStartNew={() => alert('Start New Analysis')}
                onDownloadReport={() => alert('Download Report')}
              />
            </div>
          )}
        </div>

        {/* Component Info */}
        <Card className="mt-8 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">✅ All Components Ready</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✅ <strong>RiskGauge:</strong> Circular + Linear gauge with animations</li>
              <li>✅ <strong>QuestionCard:</strong> Single/Multiple choice support with explanations</li>
              <li>✅ <strong>ProgressBar:</strong> Step indicator with dots</li>
              <li>✅ <strong>RiskResult:</strong> Complete result display with recommendations</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
