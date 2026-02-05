// Mock Tüketici Hakem Heyeti Wizard Configuration

export const WIZARD_STEPS = [
  {
    id: 'firm_info',
    title: 'Firma Bilgileri',
    description: 'Şikayet edilen firmanın bilgileri',
    icon: 'Building2',
    fields: [
      {
        id: 'firm_name',
        type: 'text',
        label: 'Firma Adı',
        placeholder: 'Örn: Teknosa İç ve Dış Ticaret A.Ş.',
        required: true,
        validation: { minLength: 3 }
      },
      {
        id: 'firm_address',
        type: 'textarea',
        label: 'Firma Adresi',
        placeholder: 'Firmanın merkez adresi...',
        required: true,
        help_text: 'Faturada yazan adres veya merkez adresi'
      },
      {
        id: 'firm_phone',
        type: 'tel',
        label: 'Firma Telefon',
        placeholder: '0(212) 555 55 55',
        required: false
      },
      {
        id: 'firm_tax_no',
        type: 'text',
        label: 'Vergi Numarası (varsa)',
        placeholder: '1234567890',
        required: false
      }
    ]
  },
  
  {
    id: 'product_info',
    title: 'Ürün/Hizmet Bilgileri',
    description: 'Satın alınan ürün veya hizmet detayları',
    icon: 'ShoppingCart',
    fields: [
      {
        id: 'product_type',
        type: 'select',
        label: 'Ürün veya Hizmet?',
        required: true,
        options: [
          { value: 'product', label: 'Ürün (Elektronik, giyim, vb.)' },
          { value: 'service', label: 'Hizmet (Tur, sigorta, vb.)' }
        ]
      },
      {
        id: 'product_name',
        type: 'text',
        label: 'Ürün/Hizmet Adı ve Modeli',
        placeholder: 'Örn: Samsung Galaxy S24 Ultra 512GB',
        required: true
      },
      {
        id: 'product_brand',
        type: 'text',
        label: 'Marka',
        placeholder: 'Samsung',
        required: true
      },
      {
        id: 'invoice_number',
        type: 'text',
        label: 'Fatura/Sipariş Numarası',
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
        id: 'purchase_place',
        type: 'text',
        label: 'Satın Alınan Yer (Şube/Online)',
        placeholder: 'Teknosa Kadıköy / teknosa.com',
        required: true
      },
      {
        id: 'product_price',
        type: 'number',
        label: 'Ürün/Hizmet Bedeli (TL)',
        placeholder: '45000',
        required: true,
        validation: { min: 0, max: 150000 },
        help_text: 'Tüketici Hakem Heyeti limiti: 150.000 TL (2024)'
      },
      {
        id: 'warranty_status',
        type: 'select',
        label: 'Garanti Durumu',
        required: true,
        options: [
          { value: 'under_warranty', label: 'Garanti Kapsamında' },
          { value: 'warranty_expired', label: 'Garanti Süresi Doldu' },
          { value: 'no_warranty', label: 'Garantisiz Ürün' }
        ]
      }
    ]
  },
  
  {
    id: 'complaint_details',
    title: 'Şikayet Detayları',
    description: 'Yaşanan sorunu açıklayın',
    icon: 'AlertCircle',
    fields: [
      {
        id: 'complaint_type',
        type: 'select',
        label: 'Şikayet Konusu',
        required: true,
        options: [
          { value: 'defective', label: 'Ayıplı Mal (Arızalı/Hasarlı)' },
          { value: 'not_delivered', label: 'Teslim Edilmedi/Gecikti' },
          { value: 'wrong_product', label: 'Yanlış Ürün Gönderildi' },
          { value: 'refund_delay', label: 'İade/Değişim Gecikmesi' },
          { value: 'warranty_denied', label: 'Garanti Kapsamına Alınmadı' },
          { value: 'price_dispute', label: 'Fiyat/Haksız Ücret' },
          { value: 'misleading_ad', label: 'Yanıltıcı Reklam' }
        ]
      },
      {
        id: 'defect_description',
        type: 'textarea',
        label: 'Sorun/Ayıp Açıklaması',
        placeholder: 'Yaşadığınız sorunu detaylı anlatın. Ne zaman başladı, ne yaptınız, firma ne dedi...',
        required: true,
        rows: 5
      },
      {
        id: 'defect_date',
        type: 'date',
        label: 'Sorunun Başladığı Tarih',
        required: true
      },
      {
        id: 'previous_contact',
        type: 'select',
        label: 'Firma ile Önceki İletişim',
        required: true,
        options: [
          { value: 'call_center_no_result', label: 'Çağrı Merkezi - Sonuçsuz' },
          { value: 'store_no_result', label: 'Mağaza Ziyareti - Sonuçsuz' },
          { value: 'email_no_result', label: 'E-posta - Sonuçsuz' },
          { value: 'social_media_no_result', label: 'Sosyal Medya - Sonuçsuz' },
          { value: 'no_contact', label: 'Henüz İletişim Kurulmadı' }
        ]
      },
      {
        id: 'contact_date',
        type: 'date',
        label: 'İlk İletişim Tarihi (varsa)',
        required: false
      },
      {
        id: 'company_response',
        type: 'textarea',
        label: 'Firmanın Yanıtı (varsa)',
        placeholder: 'Firma size ne dedi? Red mi etti, süre mi verdi?',
        required: false
      }
    ]
  },
  
  {
    id: 'demand',
    title: 'Talebiniz',
    description: 'Ne talep ediyorsunuz?',
    icon: 'FileText',
    fields: [
      {
        id: 'demand_type',
        type: 'select',
        label: 'Talep Türü',
        required: true,
        options: [
          { value: 'refund_full', label: 'Tam Para İadesi' },
          { value: 'refund_partial', label: 'Kısmi Para İadesi' },
          { value: 'replacement', label: 'Yeni Ürün İle Değişim' },
          { value: 'repair_free', label: 'Ücretsiz Tamir' },
          { value: 'price_discount', label: 'Bedel İndirimi' },
          { value: 'compensation', label: 'Tazminat (Maddi/Manevi)' }
        ]
      },
      {
        id: 'demand_amount',
        type: 'number',
        label: 'Talep Edilen Tutar (TL)',
        placeholder: '45000',
        required: true,
        validation: { min: 0, max: 150000 },
        help_text: 'Ürün bedeli ile aynı veya farklı olabilir'
      },
      {
        id: 'demand_explanation',
        type: 'textarea',
        label: 'Talep Gerekçesi',
        placeholder: 'Neden bu tutarı talep ettiğinizi kısaca açıklayın...',
        required: true
      }
    ]
  },
  
  {
    id: 'documents',
    title: 'Belgeler',
    description: 'Başvuruya ekleyeceğiniz belgeler',
    icon: 'Paperclip',
    fields: [
      {
        id: 'has_invoice',
        type: 'boolean',
        label: 'Fatura/Fiş mevcut',
        required: true
      },
      {
        id: 'has_warranty',
        type: 'boolean',
        label: 'Garanti belgesi mevcut',
        required: false
      },
      {
        id: 'has_correspondence',
        type: 'boolean',
        label: 'Firma ile yazışmalar mevcut',
        required: false
      },
      {
        id: 'has_photos',
        type: 'boolean',
        label: 'Ürün fotoğrafları/videosu mevcut',
        required: false
      },
      {
        id: 'has_expert_report',
        type: 'boolean',
        label: 'Eksper/rapor var',
        required: false
      },
      {
        id: 'document_notes',
        type: 'textarea',
        label: 'Ek Belge Notları',
        placeholder: 'Eklemek istediğiniz diğer belgeler...',
        required: false,
        rows: 3
      }
    ]
  }
];

// Helper function: Get step by ID
export function getStepById(stepId) {
  return WIZARD_STEPS.find(step => step.id === stepId);
}

// Helper function: Get step index
export function getStepIndex(stepId) {
  return WIZARD_STEPS.findIndex(step => step.id === stepId);
}

// Helper function: Validate step data
export function validateStepData(step, data) {
  const errors = {};
  
  step.fields.forEach(field => {
    const value = data[field.id];
    
    // Required validation
    if (field.required && (!value || value === '')) {
      errors[field.id] = `${field.label} zorunludur`;
    }
    
    // Type-specific validation
    if (value && field.validation) {
      // MinLength
      if (field.validation.minLength && value.length < field.validation.minLength) {
        errors[field.id] = `${field.label} en az ${field.validation.minLength} karakter olmalıdır`;
      }
      
      // Min/Max for numbers
      if (field.type === 'number') {
        const numValue = parseFloat(value);
        if (field.validation.min !== undefined && numValue < field.validation.min) {
          errors[field.id] = `${field.label} en az ${field.validation.min} olmalıdır`;
        }
        if (field.validation.max !== undefined && numValue > field.validation.max) {
          errors[field.id] = `${field.label} en fazla ${field.validation.max} olabilir`;
        }
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Helper function: Get total progress
export function getProgress(currentStepIndex) {
  return Math.round(((currentStepIndex + 1) / WIZARD_STEPS.length) * 100);
}

// Helper function: Format form data for summary
export function formatFormDataForSummary(formData) {
  const summary = {
    firmInfo: {
      name: formData.firm_name,
      address: formData.firm_address,
      phone: formData.firm_phone,
      taxNo: formData.firm_tax_no
    },
    productInfo: {
      type: formData.product_type,
      name: formData.product_name,
      brand: formData.product_brand,
      invoiceNumber: formData.invoice_number,
      purchaseDate: formData.purchase_date,
      purchasePlace: formData.purchase_place,
      price: formData.product_price,
      warrantyStatus: formData.warranty_status
    },
    complaint: {
      type: formData.complaint_type,
      description: formData.defect_description,
      date: formData.defect_date,
      previousContact: formData.previous_contact,
      contactDate: formData.contact_date,
      companyResponse: formData.company_response
    },
    demand: {
      type: formData.demand_type,
      amount: formData.demand_amount,
      explanation: formData.demand_explanation
    },
    documents: {
      hasInvoice: formData.has_invoice,
      hasWarranty: formData.has_warranty,
      hasCorrespondence: formData.has_correspondence,
      hasPhotos: formData.has_photos,
      hasExpertReport: formData.has_expert_report,
      notes: formData.document_notes
    }
  };
  
  return summary;
}
