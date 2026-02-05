import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  header: {
    textAlign: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1e3a5f',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e3a5f',
  },
  refBox: {
    backgroundColor: '#f0f9ff',
    border: '2pt solid #1e3a5f',
    padding: 15,
    marginBottom: 25,
    textAlign: 'center',
  },
  refLabel: {
    fontSize: 10,
    color: '#666',
    marginBottom: 5,
  },
  refNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3a5f',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#1e3a5f',
    color: 'white',
    padding: '8 12',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottom: '1pt solid #eee',
    paddingVertical: 6,
  },
  label: {
    width: '40%',
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    width: '60%',
    color: '#555',
  },
  textBlock: {
    padding: 10,
    backgroundColor: '#fafafa',
    marginTop: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
  },
  footerText: {
    fontSize: 9,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  signatureLine: {
    marginTop: 30,
    borderTop: '1pt solid #333',
    width: 200,
    marginLeft: 'auto',
    paddingTop: 5,
    textAlign: 'center',
    fontSize: 10,
  },
  warning: {
    backgroundColor: '#fff7ed',
    border: '1pt solid #f97316',
    padding: 10,
    marginTop: 20,
    fontSize: 9,
  },
  warningTitle: {
    fontWeight: 'bold',
    color: '#f97316',
    marginBottom: 5,
  },
  checklistItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  checkbox: {
    width: 12,
    height: 12,
    border: '1pt solid #333',
    marginRight: 8,
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    backgroundColor: '#1e3a5f',
    marginRight: 8,
  },
});

// Helper functions
const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('tr-TR');
};

const formatCurrency = (amount) => {
  if (!amount) return '—';
  return `${parseFloat(amount).toLocaleString('tr-TR')} TL`;
};

const getProductTypeLabel = (type) => {
  const types = {
    product: 'Ürün (Elektronik, giyim, vb.)',
    service: 'Hizmet (Tur, sigorta, vb.)'
  };
  return types[type] || type;
};

const getWarrantyLabel = (status) => {
  const labels = {
    under_warranty: 'Garanti Kapsamında',
    warranty_expired: 'Garanti Süresi Doldu',
    no_warranty: 'Garantisiz Ürün'
  };
  return labels[status] || status;
};

const getComplaintLabel = (type) => {
  const labels = {
    defective: 'Ayıplı Mal (Arızalı/Hasarlı)',
    not_delivered: 'Teslim Edilmedi/Gecikti',
    wrong_product: 'Yanlış Ürün Gönderildi',
    refund_delay: 'İade/Değişim Gecikmesi',
    warranty_denied: 'Garanti Kapsamına Alınmadı',
    price_dispute: 'Fiyat/Haksız Ücret',
    misleading_ad: 'Yanıltıcı Reklam'
  };
  return labels[type] || type;
};

const getContactLabel = (type) => {
  const labels = {
    call_center_no_result: 'Çağrı Merkezi - Sonuçsuz',
    store_no_result: 'Mağaza Ziyareti - Sonuçsuz',
    email_no_result: 'E-posta - Sonuçsuz',
    social_media_no_result: 'Sosyal Medya - Sonuçsuz',
    no_contact: 'Henüz İletişim Kurulmadı'
  };
  return labels[type] || type;
};

const getDemandLabel = (type) => {
  const labels = {
    refund_full: 'Tam Para İadesi',
    refund_partial: 'Kısmi Para İadesi',
    replacement: 'Yeni Ürün İle Değişim',
    repair_free: 'Ücretsiz Tamir',
    price_discount: 'Bedel İndirimi',
    compensation: 'Tazminat (Maddi/Manevi)'
  };
  return labels[type] || type;
};

/**
 * PDF Document Component for THH Application Summary
 */
export function ArbitrationPDFDocument({ formData, referenceNumber, applicantInfo }) {
  const today = new Date().toLocaleDateString('tr-TR');
  const refNo = referenceNumber || 'THH-2024-XXXXXX';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>TÜRKİYE CUMHURİYETİ</Text>
          <Text style={styles.subtitle}>TÜKETİCİ HAKEM HEYETİ BAŞVURU ÖZETİ</Text>
        </View>

        {/* Reference Box */}
        <View style={styles.refBox}>
          <Text style={styles.refLabel}>Başvuru Referans Numarası</Text>
          <Text style={styles.refNumber}>{refNo}</Text>
          <Text style={[styles.refLabel, { marginTop: 10 }]}>
            Başvuru Tarihi: {today}
          </Text>
        </View>

        {/* Applicant Info Section */}
        {applicantInfo && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>BAŞVURU SAHİBİ BİLGİLERİ</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Ad Soyad:</Text>
              <Text style={styles.value}>{applicantInfo.fullName || '—'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>TC Kimlik No:</Text>
              <Text style={styles.value}>{applicantInfo.tcNo || '—'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Adres:</Text>
              <Text style={styles.value}>{applicantInfo.address || '—'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Telefon:</Text>
              <Text style={styles.value}>{applicantInfo.phone || '—'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>E-posta:</Text>
              <Text style={styles.value}>{applicantInfo.email || '—'}</Text>
            </View>
          </View>
        )}

        {/* Firm Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FİRMA BİLGİLERİ (ŞİKAYET EDİLEN)</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Firma Adı:</Text>
            <Text style={styles.value}>{formData.firm_name || '—'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Adres:</Text>
            <Text style={styles.value}>{formData.firm_address || '—'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Telefon:</Text>
            <Text style={styles.value}>{formData.firm_phone || '—'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Vergi No:</Text>
            <Text style={styles.value}>{formData.firm_tax_no || '—'}</Text>
          </View>
        </View>

        {/* Product/Service Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ÜRÜN/HİZMET BİLGİLERİ</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Tür:</Text>
            <Text style={styles.value}>{getProductTypeLabel(formData.product_type)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Adı:</Text>
            <Text style={styles.value}>{formData.product_name || '—'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Marka:</Text>
            <Text style={styles.value}>{formData.product_brand || '—'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fatura No:</Text>
            <Text style={styles.value}>{formData.invoice_number || '—'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Satın Alma Tarihi:</Text>
            <Text style={styles.value}>{formatDate(formData.purchase_date)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Satın Alma Yeri:</Text>
            <Text style={styles.value}>{formData.purchase_place || '—'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Bedel:</Text>
            <Text style={styles.value}>{formatCurrency(formData.product_price)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Garanti Durumu:</Text>
            <Text style={styles.value}>{getWarrantyLabel(formData.warranty_status)}</Text>
          </View>
        </View>

        {/* Complaint Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ŞİKAYET DETAYLARI</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Konu:</Text>
            <Text style={styles.value}>{getComplaintLabel(formData.complaint_type)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Sorun Başlangıç:</Text>
            <Text style={styles.value}>{formatDate(formData.defect_date)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Önceki İletişim:</Text>
            <Text style={styles.value}>{getContactLabel(formData.previous_contact)}</Text>
          </View>
          {formData.defect_description && (
            <View style={styles.textBlock}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Sorun Açıklaması:</Text>
              <Text>{formData.defect_description}</Text>
            </View>
          )}
          {formData.company_response && (
            <View style={styles.textBlock}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Firma Yanıtı:</Text>
              <Text>{formData.company_response}</Text>
            </View>
          )}
        </View>

        {/* Demand Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TALEP</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Talep Türü:</Text>
            <Text style={styles.value}>{getDemandLabel(formData.demand_type)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Talep Edilen Tutar:</Text>
            <Text style={styles.value}>{formatCurrency(formData.demand_amount)}</Text>
          </View>
          {formData.demand_explanation && (
            <View style={styles.textBlock}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Gerekçe:</Text>
              <Text>{formData.demand_explanation}</Text>
            </View>
          )}
        </View>

        {/* Documents Checklist */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EKLER/BELGELER</Text>
          <View style={styles.checklistItem}>
            <View style={formData.has_invoice ? styles.checkboxChecked : styles.checkbox} />
            <Text>Fatura/Fiş</Text>
          </View>
          <View style={styles.checklistItem}>
            <View style={formData.has_warranty ? styles.checkboxChecked : styles.checkbox} />
            <Text>Garanti Belgesi</Text>
          </View>
          <View style={styles.checklistItem}>
            <View style={formData.has_correspondence ? styles.checkboxChecked : styles.checkbox} />
            <Text>Firma ile Yazışmalar</Text>
          </View>
          <View style={styles.checklistItem}>
            <View style={formData.has_photos ? styles.checkboxChecked : styles.checkbox} />
            <Text>Fotoğraflar/Video</Text>
          </View>
          <View style={styles.checklistItem}>
            <View style={formData.has_expert_report ? styles.checkboxChecked : styles.checkbox} />
            <Text>Eksper Raporu</Text>
          </View>
          {formData.document_notes && (
            <View style={[styles.textBlock, { marginTop: 10 }]}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Not:</Text>
              <Text>{formData.document_notes}</Text>
            </View>
          )}
        </View>

        {/* Legal Warning */}
        <View style={styles.warning}>
          <Text style={styles.warningTitle}>YASAL UYARI</Text>
          <Text>
            Bu özet, Tüketici Hakem Heyeti'ne yapılacak resmi başvuru için hazırlanmıştır.
            Başvuru sahibi yukarıdaki bilgilerin doğruluğunu beyan eder. Yanlış beyanda
            bulunmanın hukuki sonuçları olabileceğini kabul eder.
          </Text>
        </View>

        {/* Signature Line */}
        <View style={styles.signatureLine}>
          <Text>İmza</Text>
          <Text style={{ marginTop: 20 }}>Tarih: {today}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Bu belge HukukAsistanım platformu üzerinden oluşturulmuştur.
          </Text>
          <Text style={styles.footerText}>
            www.hukukasistanim.com | Referans: {refNo}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

// Export default for dynamic import
export default ArbitrationPDFDocument;
