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
