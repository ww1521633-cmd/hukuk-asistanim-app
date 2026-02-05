// Mock Risk Analysis Scenarios

export const RISK_SCENARIOS = [
  // SCENARIO 1: Kira Anlaşmazlığı
  {
    id: '1',
    code: 'KIRA_ANLASMAZLIK',
    name: 'Kira Anlaşmazlığı Risk Analizi',
    category: 'Kira Hukuku',
    description: 'Kiracı veya mal sahibi olarak kira anlaşmazlığınızın hukuki risk seviyesini değerlendirin.',
    icon: 'Home',
    estimatedTime: '5-7 dakika',
    isActive: true,
    questions: [
      {
        id: 'q1',
        category: 'Sözleşme Durumu',
        question: 'Kira sözleşmenizin mevcut durumu nedir?',
        type: 'single',
        weight: 2.0,
        isCritical: true,
        helpText: 'Yazılı sözleşme olması hukuki güvenlik açısından önemlidir.',
        options: [
          {
            id: 'a1',
            label: 'Noterde onaylı yazılı sözleşme var',
            riskDelta: -15,
            explanation: 'En güçlü hukuki dayanak. Kanıtlanabilir ve bağlayıcı.',
            tags: ['güvenli', 'resmi']
          },
          {
            id: 'a2',
            label: 'Noter onaylı değil ama imzalı yazılı sözleşme var',
            riskDelta: -5,
            explanation: 'İyi bir delil ancak taraflardan biri inkâr edebilir.',
            tags: ['orta-güvenlik']
          },
          {
            id: 'a3',
            label: 'Sözlü anlaşma var, yazılı sözleşme yok',
            riskDelta: +25,
            explanation: 'İspat sorunu yaşanabilir. Tanık beyanı gerekebilir.',
            tags: ['riskli', 'ispat-sorunu']
          },
          {
            id: 'a4',
            label: 'Hiçbir anlaşma belgesi yok',
            riskDelta: +35,
            explanation: 'Çok yüksek risk. Hukuki süreç uzun ve zor olabilir.',
            tags: ['kritik', 'delil-yok']
          }
        ]
      },
      {
        id: 'q2',
        category: 'Ödeme Geçmişi',
        question: 'Kira ödemelerinizde gecikme veya eksiklik var mı?',
        type: 'single',
        weight: 2.5,
        isCritical: true,
        helpText: 'Düzenli ödeme geçmişi tahliye davalarında kritik önem taşır.',
        options: [
          {
            id: 'b1',
            label: 'Tüm ödemeler zamanında ve dekontla yapıldı',
            riskDelta: -20,
            explanation: 'Mükemmel. Havale dekontları sizi korur.',
            tags: ['güvenli', 'delilli']
          },
          {
            id: 'b2',
            label: 'Nakit ödedim ama makbuz aldım',
            riskDelta: -5,
            explanation: 'İyi ancak makbuzların geçerliliği tartışılabilir.',
            tags: ['orta-güvenlik']
          },
          {
            id: 'b3',
            label: '1-2 ay gecikme oldu ama sonra ödedim',
            riskDelta: +15,
            explanation: 'Tahliye gerekçesi olabilir. Açıklayıcı deliller gerekli.',
            tags: ['riskli', 'gecikme']
          },
          {
            id: 'b4',
            label: '3 aydan fazla gecikme var veya hiç ödemedim',
            riskDelta: +30,
            explanation: 'Yüksek tahliye riski. Acil ödeme yapmalısınız.',
            tags: ['kritik', 'tahliye-riski']
          }
        ]
      },
      {
        id: 'q3',
        category: 'İhtar ve Bildirimler',
        question: 'Karşı taraftan resmi bir ihtar veya bildirim aldınız mı?',
        type: 'single',
        weight: 2.0,
        isCritical: true,
        helpText: 'Noter ihtarı hukuki sürecin başladığını gösterir.',
        options: [
          {
            id: 'c1',
            label: 'Hayır, herhangi bir resmi bildirim almadım',
            riskDelta: 0,
            explanation: 'Henüz resmi süreç başlamadı.',
            tags: ['nötr']
          },
          {
            id: 'c2',
            label: 'Sözlü veya WhatsApp üzerinden uyarı aldım',
            riskDelta: +10,
            explanation: 'Gayri resmi uyarı. Yazılı yanıt verin.',
            tags: ['dikkat']
          },
          {
            id: 'c3',
            label: 'Noter aracılığıyla ihtar aldım',
            riskDelta: +20,
            explanation: 'Hukuki süreç başladı. 30 gün içinde yanıt verin.',
            tags: ['riskli', 'yasal-süreç']
          },
          {
            id: 'c4',
            label: 'Mahkeme tebligatı veya dava dilekçesi aldım',
            riskDelta: +35,
            explanation: 'Acil avukat tutmalısınız. Cevap süresi işliyor.',
            tags: ['kritik', 'dava']
          }
        ]
      },
      {
        id: 'q4',
        category: 'Sözleşme Şartları',
        question: 'Sözleşmede kira artış oranı ve süresi net belirtilmiş mi?',
        type: 'single',
        weight: 1.5,
        isCritical: false,
        helpText: 'Belirsiz şartlar anlaşmazlık yaratabilir.',
        options: [
          {
            id: 'd1',
            label: 'Evet, TÜFE/ÜFE artışı ve tarihler açıkça yazılı',
            riskDelta: -10,
            explanation: 'Net şartlar anlaşmazlık riskini azaltır.',
            tags: ['güvenli']
          },
          {
            id: 'd2',
            label: 'Sadece genel bir ifade var ("piyasa şartlarına göre")',
            riskDelta: +10,
            explanation: 'Belirsizlik anlaşmazlık yaratabilir.',
            tags: ['dikkat']
          },
          {
            id: 'd3',
            label: 'Sözleşmede artış maddesi yok',
            riskDelta: +5,
            explanation: 'Kanuni hükümler geçerli olur (TBK m.344).',
            tags: ['nötr']
          }
        ]
      },
      {
        id: 'q5',
        category: 'Taşınmaz Durumu',
        question: 'Kiralanan yerde hasar veya kullanım sorunları var mı?',
        type: 'multiple',
        weight: 1.8,
        isCritical: false,
        helpText: 'Birden fazla seçenek işaretleyebilirsiniz.',
        options: [
          {
            id: 'e1',
            label: 'Hayır, her şey normal kullanım halinde',
            riskDelta: 0,
            explanation: 'İyi durum.',
            tags: ['nötr']
          },
          {
            id: 'e2',
            label: 'Su kaçağı, nem veya elektrik sorunları var',
            riskDelta: +8,
            explanation: 'Kira indirimi veya onarım talebi hakkınız var.',
            tags: ['ayıp']
          },
          {
            id: 'e3',
            label: 'Komşularla gürültü/rahatsızlık problemi',
            riskDelta: +5,
            explanation: 'Kiracı sorumluluğu olabilir.',
            tags: ['dikkat']
          },
          {
            id: 'e4',
            label: 'Yapısal hasar veya kullanılamaz alan var',
            riskDelta: +15,
            explanation: 'Ciddi ayıp. Fesih gerekçesi olabilir.',
            tags: ['riskli']
          }
        ]
      },
      {
        id: 'q6',
        category: 'Hukuki Destek',
        question: 'Bu süreçte bir avukata danıştınız mı?',
        type: 'single',
        weight: 1.2,
        isCritical: false,
        helpText: 'Avukat desteği hukuki riskleri azaltır.',
        options: [
          {
            id: 'f1',
            label: 'Evet, avukatım süreci takip ediyor',
            riskDelta: -12,
            explanation: 'Profesyonel destek riski önemli ölçüde azaltır.',
            tags: ['güvenli']
          },
          {
            id: 'f2',
            label: 'Bir kez danıştım ama sürekli takip yok',
            riskDelta: -5,
            explanation: 'Kısmi destek. Gerekirse tekrar görüşün.',
            tags: ['orta']
          },
          {
            id: 'f3',
            label: 'Hayır, henüz avukata gitmedim',
            riskDelta: +10,
            explanation: 'Hukuki destek almanız önerilir.',
            tags: ['dikkat']
          }
        ]
      }
    ],
    scoringConfig: {
      baseScore: 50,
      thresholds: {
        low: [0, 40],
        medium: [40, 60],
        high: [60, 80],
        critical: [80, 100]
      }
    },
    recommendations: {
      low: {
        title: 'Düşük Risk - İyi Durumdasınız',
        description: 'Hukuki pozisyonunuz güçlü. Mevcut durumunuzu korumaya devam edin.',
        actions: [
          'Tüm ödemeleri dekontla yapmaya devam edin',
          'Sözleşme şartlarına uygun hareket edin',
          'Karşı tarafla iyi iletişim kurun',
          'Tüm yazışmaları ve belgeleri saklayın'
        ],
        color: 'green',
        icon: 'CheckCircle2'
      },
      medium: {
        title: 'Orta Risk - Dikkatli Olun',
        description: 'Bazı riskler mevcut ancak yönetilebilir. Önlem almanız önerilir.',
        actions: [
          'Varsa gecikmiş ödemeleri derhal yapın',
          'Tüm iletişimi yazılı hale getirin (e-posta, noter)',
          'Delil toplamaya başlayın (makbuz, fotoğraf, tanık)',
          'Bir hukuk danışmanına görüş alın',
          'Anlaşmazlıkları sulh yoluyla çözmeye çalışın'
        ],
        color: 'orange',
        icon: 'AlertCircle'
      },
      high: {
        title: 'Yüksek Risk - Hukuki Destek Alın',
        description: 'Ciddi hukuki riskler var. Profesyonel yardım almanız şiddetle önerilir.',
        actions: [
          'ACİL: Bir avukat tutun ve dosyayı inceletin',
          'Tüm belgeleri toplayın (sözleşme, dekont, fotoğraf)',
          'Karşı tarafa yazılı bildirim gönderin',
          'Dava açılırsa savunmanızı hazırlayın',
          'Alternatif çözüm yollarını (arabuluculuk) değerlendirin',
          'Maddi durumunuzu güçlendirin (finansal plan)'
        ],
        color: 'red',
        icon: 'AlertTriangle'
      },
      critical: {
        title: 'Kritik Risk - Acil Eylem Gerekli',
        description: 'Çok yüksek hukuki risk. Derhal harekete geçmelisiniz.',
        actions: [
          '⚠️ ACİL: Bugün bir avukatla görüşün',
          'Mahkeme tebligatı varsa cevap süresine dikkat edin',
          'Tüm delilleri acilen toplayın ve fotokopilerini alın',
          'Tanıkların isim ve iletişim bilgilerini not edin',
          'Mali durumunuzu gözden geçirin (harç, avukat ücreti)',
          'Aile bireylerini bilgilendirin ve destek alın',
          'Alternatif konaklama/çözüm planları yapın',
          'Baro avukat listesinden ücretsiz danışmanlık alabilirsiniz'
        ],
        color: 'purple',
        icon: 'ShieldAlert'
      }
    }
  }
];

// Helper functions
export function getRiskScenarioById(id) {
  return RISK_SCENARIOS.find(scenario => scenario.id === id);
}

export function getRiskScenarioByCode(code) {
  return RISK_SCENARIOS.find(scenario => scenario.code === code);
}
