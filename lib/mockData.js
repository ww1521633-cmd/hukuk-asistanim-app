// Mock petition templates with JSONB-like structure
export const PETITION_TEMPLATES = [
  {
    id: '1',
    template_code: 'AYIPLI_MAL_IHTAR',
    name: 'Ayıplı Mal İhtarnamesi',
    description: 'Satın alınan üründe ayıp/hata tespit edildiğinde satıcıya gönderilen resmi ihtarname. Tüketici Hakem Heyeti başvurusu öncesi zorunlu adım.',
    category: 'Tüketici Hukuku',
    icon: 'ShoppingBag',
    required_subscription: 'Free',
    content_structure: [
      {
        id: 'seller_name',
        type: 'text',
        label: 'Satıcı Firma Adı',
        placeholder: 'Örn: Teknosa İç ve Dış Ticaret A.Ş.',
        required: true
      },
      {
        id: 'seller_address',
        type: 'textarea',
        label: 'Satıcı Firma Adresi',
        placeholder: 'Firmanın merkez adresi...',
        required: true
      },
      {
        id: 'product_name',
        type: 'text',
        label: 'Ürün Adı ve Modeli',
        placeholder: 'Örn: iPhone 15 Pro 256GB',
        required: true
      },
      {
        id: 'invoice_number',
        type: 'text',
        label: 'Fatura/Sipariş No',
        placeholder: 'TY123456789',
        required: true
      },
      {
        id: 'purchase_date',
        type: 'date',
        label: 'Satın Alma Tarihi',
        required: true
      },
      {
        id: 'product_price',
        type: 'number',
        label: 'Ürün Bedeli (TL)',
        placeholder: '45000',
        required: true
      },
      {
        id: 'defect_description',
        type: 'textarea',
        label: 'Ayıp/Teknik Arıza Açıklaması',
        placeholder: 'Yaşadığınız sorunu detaylı açıklayın...',
        required: true,
        help_text: 'Ürünün nasıl arızalandığını, ne zaman fark ettiğinizi detaylı yazın.'
      },
      {
        id: 'demand_type',
        type: 'select',
        label: 'Talep Edilen Çözüm',
        required: true,
        options: [
          { value: 'replacement', label: 'Yeni Ürün İle Değişim' },
          { value: 'refund', label: 'Para İadesi' },
          { value: 'repair_free', label: 'Ücretsiz Tamir' }
        ]
      },
      {
        id: 'applicant_name',
        type: 'text',
        label: 'Adınız Soyadınız',
        placeholder: 'Ahmet Yılmaz',
        required: true
      },
      {
        id: 'applicant_address',
        type: 'textarea',
        label: 'Adresiniz',
        placeholder: 'Tam açık adresiniz...',
        required: true
      },
      {
        id: 'applicant_phone',
        type: 'tel',
        label: 'Telefon Numaranız',
        placeholder: '0532 123 45 67',
        required: true
      }
    ],
    template_text: `{{seller_name}}
{{seller_address}}

KONU: Ayıplı Mal Bildirimi ve {{demand_type_label}} Talebi

İLGİ: {{invoice_number}} no'lu fatura tarihli satın alma

SAYIN YETKİLİ,

{{purchase_date}} tarihinde şirketinizden satın almış olduğum {{product_name}} ürününde tespit edilen ayıplar:

{{defect_description}}

6098 sayılı TBK ve 6502 sayılı Tüketicinin Korunması Kanunu uyarınca {{demand_type_label}} talep ederim.

30 günlük yasal süre içinde olumlu yanıt bekliyorum. Aksi takdirde Tüketici Hakem Heyeti'ne ve gerekirse mahkemeye başvuracağımı bildiririm.

{{petition_date}}

{{applicant_name}}
Adres: {{applicant_address}}
Tel: {{applicant_phone}}`,
    applicable_laws: ['6098 sayılı TBK m.219-227', '6502 sayılı Tüketici Kanunu m.11'],
    court_type: 'Tüketici Hakem Heyeti',
    estimated_process_time: '30-60 gün'
  },
  {
    id: '2',
    template_code: 'KIRA_TESPIT_DAVA',
    name: 'Kira Bedeli Tespit Davası',
    description: 'Kira bedelinin hakkaniyete uygun olmadığı durumlarda mahkeme tarafından tespit ettirilmesi talebi.',
    category: 'Kira Hukuku',
    icon: 'Home',
    required_subscription: 'Premium',
    content_structure: [
      {
        id: 'court_name',
        type: 'text',
        label: 'Mahkeme Adı',
        placeholder: 'İstanbul Anadolu 5. Asliye Hukuk Mahkemesi',
        required: true,
        help_text: 'Kiralanan taşınmazın bulunduğu yerdeki Asliye Hukuk Mahkemesi'
      },
      {
        id: 'landlord_name',
        type: 'text',
        label: 'Kiraya Veren (Davalı)',
        placeholder: 'Ad Soyad veya Firma',
        required: true
      },
      {
        id: 'landlord_address',
        type: 'textarea',
        label: 'Davalının Adresi',
        placeholder: 'Tam açık adres...',
        required: true
      },
      {
        id: 'rental_address',
        type: 'textarea',
        label: 'Kiralık Taşınmazın Adresi',
        placeholder: 'Tam adres...',
        required: true
      },
      {
        id: 'current_rent',
        type: 'number',
        label: 'Mevcut Aylık Kira (TL)',
        placeholder: '5000',
        required: true
      },
      {
        id: 'requested_rent',
        type: 'number',
        label: 'Talep Edilen Kira (TL)',
        placeholder: '7500',
        required: true
      },
      {
        id: 'property_features',
        type: 'textarea',
        label: 'Taşınmaz Özellikleri',
        placeholder: 'm², oda sayısı, kat, bina yaşı, ısınma, asansör vb...',
        required: true
      },
      {
        id: 'contract_date',
        type: 'date',
        label: 'Kira Sözleşmesi Tarihi',
        required: true
      },
      {
        id: 'applicant_name',
        type: 'text',
        label: 'Adınız Soyadınız (Davacı)',
        placeholder: 'Mehmet Öztürk',
        required: true
      },
      {
        id: 'applicant_address',
        type: 'textarea',
        label: 'Adresiniz',
        placeholder: 'Tam açık adresiniz...',
        required: true
      }
    ],
    template_text: `{{court_name}} HAKİMLİĞİNE

DAVACI: {{applicant_name}}
Adres: {{applicant_address}}

DAVALI: {{landlord_name}}
Adres: {{landlord_address}}

KONU: Kira bedelinin tespiti talebidir.

OLAY:
Taraflar arasında {{contract_date}} tarihinde imzalanan kira sözleşmesi uyarınca {{rental_address}} adresindeki taşınmaz kiralanmıştır.

Taşınmaz özellikleri:
{{property_features}}

Mevcut kira bedeli: {{current_rent}} TL
Talep edilen hakkaniyetli kira bedeli: {{requested_rent}} TL

Taşınmazın konumu, özellikleri ve bölge kiralama değerleri dikkate alındığında mevcut kira bedeli hakkaniyete uygun değildir.

HUKUKİ SEBEPLER:
6098 sayılı Türk Borçlar Kanunu'nun 344. maddesi uyarınca taraflardan her biri, kira sözleşmesinin kurulmasından sonra öngörülemeyen durumların ortaya çıkması nedeniyle, haklı sebeplerin varlığı halinde kira bedelinin hakkaniyete uygun olarak belirlenmesini mahkemeden isteyebilir.

DELİLLER:
1. Kira sözleşmesi
2. Bölge kira değerleri araştırması
3. Taşınmaz değer tespiti bilirkişi raporu
4. Tanık beyanları

HÜKÜM TALEP:
Yukarıda açıklanan nedenlerle;
1. Kira bedelinin {{requested_rent}} TL olarak TESPİTİNE,
2. Yargılama giderlerinin davalı üzerinde bırakılmasına,

Karar verilmesini saygılarımla arz ve talep ederim.

{{petition_date}}

DAVACI
{{applicant_name}}`,
    applicable_laws: ['6098 sayılı TBK m.344'],
    court_type: 'Asliye Hukuk Mahkemesi',
    estimated_process_time: '6-12 ay'
  },
  {
    id: '3',
    template_code: 'ABONELIK_IPTAL',
    name: 'Abonelik İptal Dilekçesi',
    description: 'GSM, internet, TV, spor salonu vb. aboneliklerin iptali için kullanılan dilekçe.',
    category: 'Tüketici Hukuku',
    icon: 'XCircle',
    required_subscription: 'Free',
    content_structure: [
      {
        id: 'company_name',
        type: 'text',
        label: 'Şirket/Firma Adı',
        placeholder: 'Turkcell İletişim Hizmetleri A.Ş.',
        required: true
      },
      {
        id: 'company_address',
        type: 'textarea',
        label: 'Firma Adresi',
        placeholder: 'Şirket merkez adresi...',
        required: true
      },
      {
        id: 'subscription_type',
        type: 'select',
        label: 'Abonelik Türü',
        required: true,
        options: [
          { value: 'gsm', label: 'GSM (Cep Telefonu)' },
          { value: 'internet', label: 'İnternet' },
          { value: 'tv', label: 'Dijital TV/Platform' },
          { value: 'gym', label: 'Spor Salonu/Fitness' },
          { value: 'other', label: 'Diğer' }
        ]
      },
      {
        id: 'subscriber_number',
        type: 'text',
        label: 'Abone/Müşteri No',
        placeholder: '5XX XXX XX XX veya müşteri numarası',
        required: true
      },
      {
        id: 'contract_date',
        type: 'date',
        label: 'Sözleşme Tarihi',
        required: true
      },
      {
        id: 'cancellation_type',
        type: 'select',
        label: 'İptal Türü',
        required: true,
        options: [
          { value: 'withdrawal', label: '14 Günlük Cayma Hakkı' },
          { value: 'indefinite', label: 'Süresiz Sözleşme Feshi' },
          { value: 'breach', label: 'Sözleşme İhlali Sebebiyle Fesih' }
        ]
      },
      {
        id: 'reason',
        type: 'textarea',
        label: 'İptal Gerekçesi',
        placeholder: 'Neden iptal etmek istediğinizi detaylı açıklayın...',
        required: true
      },
      {
        id: 'applicant_name',
        type: 'text',
        label: 'Adınız Soyadınız',
        placeholder: 'Ayşe Demir',
        required: true
      },
      {
        id: 'applicant_address',
        type: 'textarea',
        label: 'Adresiniz',
        placeholder: 'Tam açık adresiniz...',
        required: true
      },
      {
        id: 'applicant_phone',
        type: 'tel',
        label: 'Telefon Numaranız',
        placeholder: '0532 123 45 67',
        required: true
      }
    ],
    template_text: `{{company_name}}
{{company_address}}
Müşteri Hizmetleri

KONU: {{subscription_type_label}} aboneliğimin iptali

İLGİ: {{subscriber_number}} nolu aboneliğim

SAYIN YETKİLİ,

{{contract_date}} tarihinde başlatılan {{subscription_type_label}} aboneliğimin {{cancellation_type_label}} kapsamında iptalini talep ederim.

Gerekçe:
{{reason}}

6502 sayılı Tüketicinin Korunması Hakkında Kanun ve ilgili mevzuat uyarınca aboneliğimin derhal sonlandırılmasını, varsa kesinti cezası talep edilmemesini ve kalan gün/ay için ödediğim tutarın tarafıma iade edilmesini talep ederim.

Talebimin 30 günlük yasal süre içinde yerine getirilmesi durumunda her türlü hukuki takibat hakkımı saklı tutarım.

Gereğini bilgilerinize arz ederim.

{{petition_date}}

{{applicant_name}}
Adres: {{applicant_address}}
Tel: {{applicant_phone}}`,
    applicable_laws: ['6502 sayılı Tüketici Kanunu m.48-50', '6098 sayılı TBK m.323'],
    court_type: 'Tüketici Hakem Heyeti',
    estimated_process_time: '15-45 gün'
  }
];

// Helper function to generate petition content from template
export function generatePetitionContent(template, formData) {
  let content = template.template_text;
  
  // Add current date
  const today = new Date().toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  content = content.replace(/{{petition_date}}/g, today);
  
  // Replace all variables
  Object.keys(formData).forEach(key => {
    const value = formData[key];
    const regex = new RegExp(`{{${key}}}`, 'g');
    
    // Handle date formatting
    if (key.includes('date') && value) {
      const date = new Date(value);
      const formatted = date.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      content = content.replace(regex, formatted);
    }
    // Handle select field labels
    else if (key === 'demand_type' || key === 'subscription_type' || key === 'cancellation_type') {
      const field = template.content_structure.find(f => f.id === key);
      if (field && field.options) {
        const option = field.options.find(opt => opt.value === value);
        if (option) {
          content = content.replace(new RegExp(`{{${key}_label}}`, 'g'), option.label);
        }
      }
      content = content.replace(regex, value || '');
    }
    else {
      content = content.replace(regex, value || '');
    }
  });
  
  // Remove any remaining unfilled placeholders
  content = content.replace(/{{[^}]+}}/g, '______');
  
  return content;
}

// Get template by ID
export function getTemplateById(id) {
  return PETITION_TEMPLATES.find(t => t.id === id);
}

// Mock user petitions storage
export function saveToLocalStorage(petition) {
  const existing = JSON.parse(localStorage.getItem('userPetitions') || '[]');
  const newPetition = {
    ...petition,
    id: Date.now().toString(),
    created_at: new Date().toISOString()
  };
  existing.push(newPetition);
  localStorage.setItem('userPetitions', JSON.stringify(existing));
  return newPetition;
}

export function getUserPetitions() {
  return JSON.parse(localStorage.getItem('userPetitions') || '[]');
}