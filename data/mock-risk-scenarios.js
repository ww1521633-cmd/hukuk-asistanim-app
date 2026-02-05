// Mock Risk Analysis Scenarios

export const RISK_SCENARIOS = [
  // SCENARIO 1: Kira Anlaşmazlığı
  {
    id: '1',
    code: 'KIRA_RISK',
    name: 'Kira Anlaşmazlığı Risk Analizi',
    category: 'Kira Hukuku',
    description: 'Kiracı veya ev sahibi olarak yaşadığınız uyuşmazlığın hukuki riskini değerlendirin.',
    icon: 'Home',
    estimatedTime: '3-5 dakika',
    isActive: true,
    
    scoring: {
      baseScore: 50,
      thresholds: { low: 40, medium: 60, high: 80, critical: 90 }
    },
    
    questions: [
      {
        id: 'q1',
        category: 'Sözleşme',
        question: 'Kira sözleşmeniz hangi formatta?',
        type: 'single',
        weight: 1.5,
        isCritical: false,
        options: [
          { 
            id: 'a1', 
            label: 'Noter onaylı yazılı sözleşme', 
            riskDelta: -20, 
            explanation: 'Noter onaylı sözleşmeler ispat gücü yüksektir.',
            tags: ['güçlü_delil', 'resmi']
          },
          { 
            id: 'a2', 
            label: 'Yazılı sözleşme (noter onaysız)', 
            riskDelta: -10, 
            explanation: 'Yazılı sözleşme var ama noter onayı yok.',
            tags: ['yazılı_sözleşme']
          },
          { 
            id: 'a3', 
            label: 'Sözlü sözleşme', 
            riskDelta: +25, 
            explanation: 'Sözlü sözleşmelerde ispat zorluğu yaşanabilir.',
            tags: ['ispat_zorluğu', 'riskli']
          },
          { 
            id: 'a4', 
            label: 'Hiç sözleşme yok', 
            riskDelta: +35, 
            explanation: 'Sözleşme olmadan hak iddia etmek çok zordur!',
            tags: ['sözleşmesiz', 'kritik']
          }
        ]
      },
      {
        id: 'q2',
        category: 'Ödeme',
        question: 'Kira ödemelerini nasıl yapıyorsunuz?',
        type: 'single',
        weight: 2.0,
        isCritical: true,
        helpText: 'Ödeme şekliniz tahliye davalarında en kritik delildir.',
        options: [
          { 
            id: 'b1', 
            label: 'Banka havalesi/EFT (düzenli)', 
            riskDelta: -15, 
            explanation: 'Banka kayıtları güçlü delildir.',
            tags: ['banka_kaydı', 'güvenli']
          },
          { 
            id: 'b2', 
            label: 'Nakit ödeme (makbuzlu)', 
            riskDelta: +10, 
            explanation: 'Makbuz var ama sahtecilik iddiası mümkün.',
            tags: ['nakit', 'dikkat']
          },
          { 
            id: 'b3', 
            label: 'Nakit ödeme (makbuzsuz/elden)', 
            riskDelta: +30, 
            explanation: 'Makbuzsuz nakit ödeme ispatı çok zordur!',
            tags: ['makbuzsuz', 'kritik']
          }
        ]
      },
      {
        id: 'q3',
        category: 'Bildirim',
        question: 'Tahliye tebligatı aldınız mı?',
        type: 'single',
        weight: 2.5,
        isCritical: true,
        helpText: 'Tebligat tarihi süre hesabı için çok önemlidir.',
        options: [
          { 
            id: 'c1', 
            label: 'Hayır, henüz tebligat almadım', 
            riskDelta: 0, 
            explanation: 'Tebligat yoksa tahliye süreci başlamamış.',
            tags: ['tebligat_yok', 'nötr']
          },
          { 
            id: 'c2', 
            label: 'Evet, 60+ gün önce aldım', 
            riskDelta: +10, 
            explanation: 'Süre geçmiş, tahliye davası açılmış olabilir.',
            tags: ['süre_geçmiş', 'dikkat']
          },
          { 
            id: 'c3', 
            label: 'Evet, 30-60 gün önce aldım', 
            riskDelta: +25, 
            explanation: 'Tahliye süreci devam ediyor, acil yardım gerekli.',
            tags: ['acil', 'riskli']
          },
          { 
            id: 'c4', 
            label: 'Evet, 30 günden az önce aldım', 
            riskDelta: +40, 
            explanation: 'Kritik! İtiraz süresi dolmak üzere!',
            tags: ['kritik', 'süre_daralması']
          }
        ]
      },
      {
        id: 'q4',
        category: 'Ödeme Geçmişi',
        question: 'Kirada ödeme gecikmeniz var mı?',
        type: 'single',
        weight: 2.2,
        isCritical: true,
        options: [
          { 
            id: 'd1', 
            label: 'Hayır, tüm ödemeler zamanında yapıldı', 
            riskDelta: -18, 
            explanation: 'Düzenli ödeme geçmişi en güçlü savunmadır.',
            tags: ['güvenli', 'düzenli']
          },
          { 
            id: 'd2', 
            label: 'Evet, 1-2 ay gecikme oldu', 
            riskDelta: +15, 
            explanation: 'Kısa gecikme tahliye sebebi olabilir.',
            tags: ['gecikme', 'dikkat']
          },
          { 
            id: 'd3', 
            label: 'Evet, 3+ ay gecikme var', 
            riskDelta: +35, 
            explanation: 'Ciddi gecikme, tahliye riski çok yüksek!',
            tags: ['kritik', 'tahliye_riski']
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
        title: 'Düşük Risk - Güçlü Durum',
        description: 'Hukuki durumunuz oldukça sağlam. Delilleriniz düzenli.',
        actions: [
          'Delillerinizi güvenli saklayın',
          'Düzenli ödemeye devam edin',
          'Tüm yazışmaları e-posta ile yapın',
          'Makbuz ve dekontları arşivleyin'
        ],
        color: '#22c55e',
        icon: 'CheckCircle2',
        lawyerRecommended: false
      },
      medium: {
        title: 'Orta Risk - Dikkatli Olun',
        description: 'Bazı eksiklikler var ama durum düzeltilebilir.',
        actions: [
          'Eksik makbuzları tamamlayın',
          'Banka ödemesine geçin',
          'Ev sahibiyle yazılı iletişim kurun',
          'Bir hukuk danışmanına danışabilirsiniz',
          'Olası senaryolar için hazırlık yapın'
        ],
        color: '#eab308',
        icon: 'AlertCircle',
        lawyerRecommended: false
      },
      high: {
        title: 'Yüksek Risk - Hukuki Yardım Gerekli',
        description: 'Ciddi hukuki riskler mevcut. Profesyonel destek önerilir.',
        actions: [
          'ACİLEN avukatla görüşün',
          'Tüm belgeleri toplayın (sözleşme, makbuz, fotoğraf)',
          'Tanık bilgilerini not edin',
          'İhtarname hazırlayın',
          'Mahkeme sürecine hazırlanın',
          'Alternatif konaklama planı yapın'
        ],
        color: '#f97316',
        icon: 'AlertTriangle',
        lawyerRecommended: true
      },
      critical: {
        title: 'Kritik Risk - Acil Müdahale!',
        description: 'Vakit daralıyor! Hemen harekete geçin!',
        actions: [
          '🚨 BUGÜN avukat bulun',
          'İtiraz süresini kontrol edin',
          'Tüm delilleri acilen toplayın',
          'Mahkeme dosyasını inceleyin',
          'Geçici koruma talebi değerlendirin',
          'Baro avukatı listesinden ücretsiz yardım alın',
          'Aile ve arkadaşlardan destek alın'
        ],
        color: '#dc2626',
        icon: 'ShieldAlert',
        lawyerRecommended: true
      }
    }
  },
  
  // SCENARIO 2: İşçilik Alacağı
  {
    id: '2',
    code: 'ISCILIK_ALACAK',
    name: 'İşçilik Alacağı Risk Analizi',
    category: 'İş Hukuku',
    description: 'İşten ayrılma veya işten çıkarılma sonrası alacaklarınızın tahsil edilebilirlik riskini değerlendirin.',
    icon: 'Briefcase',
    estimatedTime: '6-8 dakika',
    isActive: true,
    questions: [
      {
        id: 'q1',
        category: 'İş Sözleşmesi',
        question: 'İş sözleşmenizin durumu nedir?',
        type: 'single',
        weight: 2.2,
        isCritical: true,
        helpText: 'Yazılı sözleşme işçilik alacaklarının ispatında kritiktir.',
        options: [
          {
            id: 'a1',
            label: 'Yazılı iş sözleşmem var ve elimde kopyası mevcut',
            riskDelta: -18,
            explanation: 'En güçlü delil. Ücret, pozisyon, çalışma süreleri belgeli.',
            tags: ['güvenli', 'delilli']
          },
          {
            id: 'a2',
            label: 'Sözleşme var ama elimde kopya yok',
            riskDelta: +5,
            explanation: 'Şirketten talep edebilirsiniz. SGK kayıtları da delil olur.',
            tags: ['dikkat']
          },
          {
            id: 'a3',
            label: 'Sözlü anlaşma ile çalıştım, yazılı sözleşme yok',
            riskDelta: +22,
            explanation: 'İspat sorunu yaşanabilir. Tanık ve SGK kayıtları önemli.',
            tags: ['riskli', 'ispat-sorunu']
          },
          {
            id: 'a4',
            label: 'Kayıt dışı çalıştım, hiçbir belge yok',
            riskDelta: +35,
            explanation: 'Çok zor durum. İş Mahkemesi sürecinde yoğun tanık gerekir.',
            tags: ['kritik', 'kayıt-dışı']
          }
        ]
      },
      {
        id: 'q2',
        category: 'İşten Ayrılış Şekli',
        question: 'İşten nasıl ayrıldınız?',
        type: 'single',
        weight: 2.5,
        isCritical: true,
        helpText: 'Ayrılış şekli kıdem ve ihbar tazminatınızı etkiler.',
        options: [
          {
            id: 'b1',
            label: 'İşveren tarafından haklı sebep olmadan feshedildi',
            riskDelta: -15,
            explanation: 'Kıdem + ihbar tazminatı hakkınız var. Güçlü pozisyon.',
            tags: ['güvenli', 'tazminat-hakkı']
          },
          {
            id: 'b2',
            label: 'İşveren haklı nedenle feshetti (disiplin soruşturması)',
            riskDelta: +25,
            explanation: 'Tazminatlar risk altında. Haklılığı mahkemede ispat edilmeli.',
            tags: ['riskli', 'itiraz-gerekli']
          },
          {
            id: 'b3',
            label: 'İstifa ettim (kendi isteğimle ayrıldım)',
            riskDelta: +18,
            explanation: 'Kıdem tazminatı yok. Sadece ücret ve izin alacağı.',
            tags: ['dikkat', 'sınırlı-hak']
          },
          {
            id: 'b4',
            label: 'İşveren maaş ödemedi, ben haklı nedenle feshettim',
            riskDelta: -5,
            explanation: 'Haklı fesih hakkınız var. Delil önemli.',
            tags: ['orta', 'ispat-gerekli']
          },
          {
            id: 'b5',
            label: 'Şirket kapandı veya iflas etti',
            riskDelta: +30,
            explanation: 'Yüksek tahsilat riski. Ücret Garanti Fonu\'na başvurun.',
            tags: ['kritik', 'iflas']
          }
        ]
      },
      {
        id: 'q3',
        category: 'Alacak Türü',
        question: 'Talep ettiğiniz alacaklar nelerdir?',
        type: 'multiple',
        weight: 1.5,
        isCritical: false,
        helpText: 'Birden fazla seçenek işaretleyebilirsiniz.',
        options: [
          {
            id: 'c1',
            label: 'Ödenmeyen maaş (1-3 ay)',
            riskDelta: +5,
            explanation: 'Kısa süreli gecikme. İspat kolay.',
            tags: ['orta']
          },
          {
            id: 'c2',
            label: 'Ödenmeyen maaş (3 aydan fazla)',
            riskDelta: +15,
            explanation: 'Uzun gecikme. Şirketin mali durumu sorunlu olabilir.',
            tags: ['riskli']
          },
          {
            id: 'c3',
            label: 'Kıdem tazminatı',
            riskDelta: 0,
            explanation: 'Standart alacak. Çalışma süresi belgeli ise sorun yok.',
            tags: ['standart']
          },
          {
            id: 'c4',
            label: 'İhbar tazminatı',
            riskDelta: 0,
            explanation: 'Normal alacak türü.',
            tags: ['standart']
          },
          {
            id: 'c5',
            label: 'Kullanılmayan yıllık izin ücreti',
            riskDelta: +3,
            explanation: 'İzin belgelerini delil olarak sunun.',
            tags: ['orta']
          },
          {
            id: 'c6',
            label: 'Fazla mesai ücreti',
            riskDelta: +12,
            explanation: 'İspat zor. Puantaj, tanık veya e-posta gerekli.',
            tags: ['dikkat', 'ispat-zor']
          },
          {
            id: 'c7',
            label: 'Prim, ikramiye, yol yardımı gibi yan haklar',
            riskDelta: +8,
            explanation: 'Ödeme geçmişi ve sözleşme hükümleri önemli.',
            tags: ['orta']
          }
        ]
      },
      {
        id: 'q4',
        category: 'Delil Durumu',
        question: 'Alacaklarınızı kanıtlayacak hangi belgeler elinizde?',
        type: 'multiple',
        weight: 2.0,
        isCritical: true,
        helpText: 'Deliller dava sonucunu doğrudan etkiler.',
        options: [
          {
            id: 'd1',
            label: 'Bordro (maaş bordrosu)',
            riskDelta: -10,
            explanation: 'Çok güçlü delil. Ücret ve yan hakları gösterir.',
            tags: ['güvenli']
          },
          {
            id: 'd2',
            label: 'Banka hesap özetleri (maaş transferleri)',
            riskDelta: -8,
            explanation: 'İyi delil. Düzenli ödeme tarihçesini gösterir.',
            tags: ['güvenli']
          },
          {
            id: 'd3',
            label: 'E-posta, WhatsApp mesajları',
            riskDelta: -5,
            explanation: 'Yardımcı delil. İş ilişkisini ve talimatları ispat eder.',
            tags: ['orta']
          },
          {
            id: 'd4',
            label: 'SGK hizmet dökümü',
            riskDelta: -12,
            explanation: 'Resmi belge. Çalışma süresi ve ücret tabanını gösterir.',
            tags: ['güvenli', 'resmi']
          },
          {
            id: 'd5',
            label: 'Tanık ifadeleri (eski çalışma arkadaşları)',
            riskDelta: +5,
            explanation: 'Yardımcı delil. Tanıklar mahkemede dinlenir.',
            tags: ['orta']
          },
          {
            id: 'd6',
            label: 'Hiçbir belge yok',
            riskDelta: +25,
            explanation: 'Çok zayıf pozisyon. Acilen delil toplamaya çalışın.',
            tags: ['kritik']
          }
        ]
      },
      {
        id: 'q5',
        category: 'Şirket Durumu',
        question: 'İşverenin mevcut mali durumu nasıl?',
        type: 'single',
        weight: 1.8,
        isCritical: false,
        helpText: 'Tahsilat olasılığını etkiler.',
        options: [
          {
            id: 'e1',
            label: 'Şirket aktif çalışıyor ve mali durumu iyi',
            riskDelta: -10,
            explanation: 'İyi haber. Tahsilat olasılığı yüksek.',
            tags: ['güvenli']
          },
          {
            id: 'e2',
            label: 'Şirket çalışıyor ama mali sıkıntı var',
            riskDelta: +15,
            explanation: 'Tahsilat zorlaşabilir. Hızlı hareket edin.',
            tags: ['riskli']
          },
          {
            id: 'e3',
            label: 'Şirket kapandı veya faaliyetini durdurdu',
            riskDelta: +28,
            explanation: 'Yüksek risk. İcra takibi ve haciz gerekebilir.',
            tags: ['kritik']
          },
          {
            id: 'e4',
            label: 'İflas etti veya konkordato ilan etti',
            riskDelta: +35,
            explanation: 'Çok zor durum. Ücret Garanti Fonu\'na başvurun.',
            tags: ['kritik', 'iflas']
          },
          {
            id: 'e5',
            label: 'Bilmiyorum',
            riskDelta: +5,
            explanation: 'Ticaret Sicil Gazetesi\'nden araştırabilirsiniz.',
            tags: ['bilinmiyor']
          }
        ]
      },
      {
        id: 'q6',
        category: 'Süreç Durumu',
        question: 'Şu ana kadar hangi adımları attınız?',
        type: 'multiple',
        weight: 1.3,
        isCritical: false,
        helpText: 'Attığınız adımlar hukuki sürecin ilerleyişini etkiler.',
        options: [
          {
            id: 'f1',
            label: 'Henüz hiçbir şey yapmadım',
            riskDelta: +15,
            explanation: 'Zaman kaybı risk oluşturur. Zamanaşımına dikkat.',
            tags: ['dikkat']
          },
          {
            id: 'f2',
            label: 'İşverene sözlü veya yazılı talepte bulundum',
            riskDelta: 0,
            explanation: 'İyi başlangıç. Yazılı talep daha güvenli.',
            tags: ['nötr']
          },
          {
            id: 'f3',
            label: 'Noter aracılığıyla ihtar çektim',
            riskDelta: -8,
            explanation: 'Doğru adım. Hukuki süreç başladı.',
            tags: ['güvenli']
          },
          {
            id: 'f4',
            label: 'İş Mahkemesi\'ne dava açtım',
            riskDelta: -15,
            explanation: 'Aktif hukuki süreç. Avukat takibinde olun.',
            tags: ['güvenli', 'dava']
          },
          {
            id: 'f5',
            label: 'İcra takibi başlattım',
            riskDelta: -10,
            explanation: 'İyi adım. Haciz işlemleri başlayabilir.',
            tags: ['güvenli', 'icra']
          },
          {
            id: 'f6',
            label: 'Bir avukatla çalışıyorum',
            riskDelta: -12,
            explanation: 'Profesyonel destek riski azaltır.',
            tags: ['güvenli']
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
        title: 'Düşük Risk - Tahsilat Olasılığı Yüksek',
        description: 'Alacaklarınızı tahsil etme şansınız yüksek. Doğru yoldasınız.',
        actions: [
          'Tüm belgeleri düzenli tutun',
          'Süreç takibini aksatmayın',
          'Avukat veya hukuk danışmanıyla görüşmeye devam edin',
          'Mahkeme duruşmalarına mutlaka katılın',
          'İşverenle sulh görüşmelerine açık olun'
        ],
        color: 'green',
        icon: 'CheckCircle2'
      },
      medium: {
        title: 'Orta Risk - Ek Delil ve Takip Gerekli',
        description: 'Bazı eksiklikler var ancak telafi edilebilir. Aktif hareket edin.',
        actions: [
          'Eksik belgeleri acilen temin edin (SGK dökümü, banka hesap özeti)',
          'Eski çalışma arkadaşlarınızla iletişime geçin (tanık)',
          'Bir iş hukuku avukatına danışın',
          'İşverene yazılı ihtar gönderin (noter)',
          'Dava açma süresini kaçırmayın (zamanaşımı 5 yıl)',
          'İşçi sendikasından destek alabilirsiniz'
        ],
        color: 'orange',
        icon: 'AlertCircle'
      },
      high: {
        title: 'Yüksek Risk - Hukuki Destek Şart',
        description: 'Ciddi sorunlar var. Profesyonel yardım almadan ilerlememelisiniz.',
        actions: [
          'ACİL: Bir iş hukuku avukatı tutun',
          'Tüm var olan belgeleri toplayın ve fotokopilerini alın',
          'SGK\'dan hizmet dökümü alın (e-Devlet)',
          'Banka hesap hareketlerinizi yazdırın',
          'Tanık listesi hazırlayın (isim, adres, telefon)',
          'İşyerindeki eski e-posta/mesajları kaydedin',
          'Dava açarken işsizlik maaşı haklarınızı araştırın',
          'Ücret Garanti Fonu başvurusunu değerlendirin (şirket iflas ettiyse)'
        ],
        color: 'red',
        icon: 'AlertTriangle'
      },
      critical: {
        title: 'Kritik Risk - Derhal Harekete Geçin',
        description: 'Tahsilat çok zor olabilir. Her türlü yasal yolu deneyin.',
        actions: [
          '⚠️ ACİL: Bugün bir avukatla görüşün',
          'Zamanaşımı süresine dikkat (işten ayrılıştan itibaren 5 yıl)',
          'İşverenin mal varlığını araştırın (taşınmaz, araç, banka hesabı)',
          'Ücret Garanti Fonu\'na başvurun (SGK üzerinden)',
          'İcra takibi başlatın (haciz için)',
          'Diğer eski çalışanlarla birlikte hareket edin',
          'Çalışma ve Sosyal Güvenlik Bakanlığı\'na şikayet edin',
          'Yerel Baro\'dan ücretsiz hukuki yardım alın',
          'Emsal davaları araştırın (benzer durumlar)',
          'Mali durumunuzu gözden geçirin ve bütçe planlayın'
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
