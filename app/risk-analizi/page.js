'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RISK_SCENARIOS } from '@/data/mock-risk-scenarios';
import { Home, Briefcase, ArrowRight, Clock, AlertCircle } from 'lucide-react';

const iconMap = {
  Home,
  Briefcase
};

export default function RiskAnalysisLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Risk Analizi
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
            Hukuki Risk Analizinizi Yapın
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Durumunuzu değerlendirin, risk seviyenizi öğrenin ve doğru adımları atın.
            Analiz yaklaşık 5-8 dakika sürer.
          </p>
        </div>

        {/* How it works */}
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Nasıl Çalışır?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: '1', title: 'Senaryo Seçin', desc: 'Size uygun hukuki senaryoyu seçin' },
                { step: '2', title: 'Soruları Cevaplayın', desc: '5-6 kritik soruyu yanıtlayın' },
                { step: '3', title: 'Sonuç Alın', desc: 'Risk skorunuz ve öneriler hazır' }
              ].map((item) => (
                <div key={item.step} className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scenario Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {RISK_SCENARIOS.filter(s => s.isActive).map((scenario) => {
            const Icon = iconMap[scenario.icon] || AlertCircle;
            
            return (
              <Card 
                key={scenario.id} 
                className="border-2 hover:border-primary transition-all hover:shadow-xl group cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <Badge variant="outline">{scenario.category}</Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {scenario.name}
                  </CardTitle>
                  <CardDescription className="text-sm mt-2">
                    {scenario.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{scenario.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      <span>{scenario.questions.length} soru</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    asChild
                  >
                    <Link href={`/risk-analizi/analiz?scenario=${scenario.id}`}>
                      Analize Başla
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Box */}
        <Card className="border-2 border-accent/20 bg-accent/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <div className="text-sm text-gray-700">
                <p className="font-semibold mb-1">📋 Not:</p>
                <p>
                  Bu analiz genel bilgilendirme amaçlıdır ve kesin hukuki görüş niteliği taşımaz.
                  Yüksek risk durumlarında mutlaka bir avukata danışmanız önerilir.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
