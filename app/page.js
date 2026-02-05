'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PETITION_TEMPLATES, getUserPetitions } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, FileText, AlertCircle, Search, ShoppingBag, Home, XCircle, ArrowRight, CheckCircle2, Shield, Clock } from 'lucide-react';

const iconMap = {
  ShoppingBag,
  Home,
  XCircle
};

export default function HomePage() {
  const [userPetitions] = useState(() => {
    if (typeof window !== 'undefined') {
      return getUserPetitions();
    }
    return [];
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Scale className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-primary">Hukuk Asistanım</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dilekce-olusturucu">
                  Dilekçe
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/risk-analizi">
                  Risk Analizi
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/tuketici-hakem">
                  THH Başvurusu
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                Giriş Yap
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Scale className="w-4 h-4" />
              Türkiye'nin Hukuki Asistanı
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Hukuki İşlemlerinizi <span className="text-accent">Kolaylaştırın</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Yapay zeka destekli dilekçe oluşturma, risk analizi ve tüketici hakem heyeti başvuruları için
              profesyonel hukuki asistanınız.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all" asChild>
                <Link href="/dilekce-olusturucu">
                  <FileText className="w-5 h-5 mr-2" />
                  Ücretsiz Başla
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Nasıl Çalışır?
              </Button>
            </div>
            
            {/* Trust badges */}
            <div className="flex items-center gap-6 mt-8 justify-center md:justify-start text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Ücretsiz
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Güvenli
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                Hızlı
              </div>
            </div>
          </div>
          
          {/* Right: Hero Image */}
          <div className="hidden md:block relative">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />
              
              {/* Main image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Adalet terazisi - Hukuki hizmetler"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Floating cards */}
              <div className="absolute -left-6 top-1/4 bg-white rounded-xl shadow-xl p-4 z-20 animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">500+</div>
                    <div className="text-xs text-gray-500">Dilekçe</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-6 bottom-1/4 bg-white rounded-xl shadow-xl p-4 z-20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">150K TL</div>
                    <div className="text-xs text-gray-500">THH Limiti</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16 bg-white/50">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: FileText, title: 'Dilekçe Oluşturucu', desc: 'Profesyonel dilekçeler hazırlayın', color: 'primary', link: '/dilekce-olusturucu' },
            { icon: AlertCircle, title: 'Risk Analizi', desc: 'Davanızı değerlendirin', color: 'accent', link: '/risk-analizi' },
            { icon: Scale, title: 'Tüketici Hakem', desc: 'THH başvurusu yapın (Ücretsiz)', color: 'primary', link: '/tuketici-hakem' },
            { icon: Search, title: 'Yargıtay Kararları', desc: 'Emsal kararlar arayın', color: 'accent', link: '#' }
          ].map((feature, idx) => (
            <Link key={idx} href={feature.link}>
              <Card className="border-2 hover:shadow-lg transition-shadow cursor-pointer hover:border-primary/50">
                <CardHeader>
                  <feature.icon className={`w-10 h-10 mb-2 ${feature.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.desc}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Petition Templates Section */}
      <section id="templates" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Dilekçe Şablonları
          </h2>
          <p className="text-gray-600 text-lg">
            Hemen kullanmaya başlayabileceğiniz profesyonel dilekçe şablonları
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PETITION_TEMPLATES.map((template) => {
            const Icon = iconMap[template.icon] || FileText;
            return (
              <Card key={template.id} className="border-2 hover:border-primary transition-all hover:shadow-xl group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Icon className="w-10 h-10 text-primary group-hover:text-accent transition-colors" />
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
                      {template.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl mt-4 group-hover:text-primary">
                    {template.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>{template.estimated_process_time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>{template.court_type}</span>
                    </div>
                    <Button 
                      className="w-full mt-4 bg-primary hover:bg-primary/90" 
                      asChild
                    >
                      <Link href={`/dilekce-olusturucu?template=${template.id}`}>
                        Oluşturmaya Başla
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Recent Petitions (if any) */}
      {userPetitions.length > 0 && (
        <section className="container mx-auto px-4 py-16 bg-white/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Son Dilekçeleriniz
            </h2>
            <div className="space-y-3">
              {userPetitions.slice(0, 5).map((petition) => (
                <Card key={petition.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">{petition.generated_title}</CardTitle>
                        <CardDescription className="text-xs">
                          {new Date(petition.created_at).toLocaleDateString('tr-TR')}
                        </CardDescription>
                      </div>
                      <Button size="sm" variant="outline">Görüntüle</Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-primary text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="w-6 h-6" />
                <span className="text-lg font-bold">Hukuk Asistanım</span>
              </div>
              <p className="text-sm text-white/80">
                Türk hukuku için yapay zeka destekli hukuki yardım platformu.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Özellikler</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Dilekçe Oluşturucu</li>
                <li>Risk Analizi</li>
                <li>Tüketici Hakem Heyeti</li>
                <li>Yargıtay Kararları</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Hukuki</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Kullanım Koşulları</li>
                <li>Gizlilik Politikası</li>
                <li>KVKK</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">İletişim</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li>info@hukukasistanim.com</li>
                <li>+90 (212) 123 45 67</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
            © 2025 Hukuk Asistanım. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
}
