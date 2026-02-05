'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Shield, 
  TrendingUp, 
  Clock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { getUserPetitions } from '@/lib/mockData';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalPetitions: 0,
    totalRiskAnalyses: 0,
    recentPetitions: [],
    recentRiskAnalyses: []
  });

  useEffect(() => {
    // Load data from localStorage
    const petitions = getUserPetitions();
    const riskAnalyses = JSON.parse(localStorage.getItem('riskAnalysisResults') || '[]');

    setStats({
      totalPetitions: petitions.length,
      totalRiskAnalyses: riskAnalyses.length,
      recentPetitions: petitions.slice(0, 5),
      recentRiskAnalyses: riskAnalyses.slice(-5).reverse()
    });
  }, []);

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'critical':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskLevelIcon = (level) => {
    switch (level) {
      case 'low':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'medium':
        return <AlertCircle className="w-4 h-4" />;
      case 'high':
      case 'critical':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Dilekçeleriniz ve risk analizlerinizin özeti
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Petitions Card */}
          <Card className="border-2 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-2xl font-bold">
                  {stats.totalPetitions}
                </CardTitle>
                <CardDescription>Toplam Dilekçe</CardDescription>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="w-6 h-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full gap-2" asChild>
                <Link href="/dilekce-olusturucu">
                  Yeni Dilekçe Oluştur
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Risk Analysis Card */}
          <Card className="border-2 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-2xl font-bold">
                  {stats.totalRiskAnalyses}
                </CardTitle>
                <CardDescription>Risk Analizi</CardDescription>
              </div>
              <div className="p-3 bg-accent/10 rounded-lg">
                <Shield className="w-6 h-6 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full gap-2" asChild>
                <Link href="/risk-analizi">
                  Yeni Analiz Yap
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Risk Analyses */}
        {stats.recentRiskAnalyses.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Son Risk Analizleri
                  </CardTitle>
                  <CardDescription>
                    En son yaptığınız risk değerlendirmeleri
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/risk-analizi">
                    Tümünü Gör
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.recentRiskAnalyses.map((analysis) => (
                  <div
                    key={analysis.id}
                    className="flex items-center justify-between p-4 rounded-lg border-2 hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getRiskLevelIcon(analysis.result.riskLevel)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">
                          {analysis.scenarioName}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {new Date(analysis.createdAt).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-bold" style={{ color: analysis.result.gaugeColor }}>
                          {analysis.result.riskScore}
                        </div>
                        <div className="text-xs text-gray-500">/ 100</div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getRiskLevelColor(analysis.result.riskLevel)} border`}
                      >
                        {analysis.result.recommendation.title.split(' - ')[0]}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Petitions */}
        {stats.recentPetitions.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Son Dilekçeler
                  </CardTitle>
                  <CardDescription>
                    En son oluşturduğunuz dilekçeler
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dilekce-olusturucu">
                    Tümünü Gör
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.recentPetitions.map((petition) => (
                  <div
                    key={petition.id}
                    className="flex items-center justify-between p-4 rounded-lg border-2 hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">
                          {petition.generated_title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {new Date(petition.created_at).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {petition.status === 'draft' ? 'Taslak' : 'Tamamlandı'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {stats.totalPetitions === 0 && stats.totalRiskAnalyses === 0 && (
          <Card className="border-2 border-dashed">
            <CardContent className="py-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <TrendingUp className="w-12 h-12 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Henüz İçerik Yok
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Dilekçe oluşturarak veya risk analizi yaparak başlayın
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button className="bg-primary hover:bg-primary/90" asChild>
                      <Link href="/dilekce-olusturucu">
                        Dilekçe Oluştur
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/risk-analizi">
                        Risk Analizi Yap
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
