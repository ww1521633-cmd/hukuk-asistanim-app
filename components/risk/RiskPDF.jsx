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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1e3a5f',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
  },
  scoreBox: {
    backgroundColor: '#f0f9ff',
    border: '2pt solid #1e3a5f',
    padding: 20,
    marginBottom: 25,
    textAlign: 'center',
    borderRadius: 8,
  },
  scoreLabel: {
    fontSize: 10,
    color: '#666',
    marginBottom: 5,
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  scoreMax: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  riskLevel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    padding: '8 16',
    borderRadius: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    backgroundColor: '#1e3a5f',
    color: 'white',
    padding: '10 12',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottom: '1pt solid #eee',
    paddingVertical: 8,
  },
  label: {
    width: '45%',
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    width: '55%',
    color: '#555',
  },
  factorItem: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fafafa',
  },
  factorIcon: {
    width: 30,
    textAlign: 'center',
  },
  factorContent: {
    flex: 1,
  },
  factorImpact: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
  actionItem: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingLeft: 10,
  },
  actionBullet: {
    width: 20,
    color: '#1e3a5f',
  },
  actionText: {
    flex: 1,
  },
  warning: {
    backgroundColor: '#fff7ed',
    border: '1pt solid #f97316',
    padding: 15,
    marginTop: 20,
  },
  warningTitle: {
    fontWeight: 'bold',
    color: '#f97316',
    marginBottom: 5,
    fontSize: 12,
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
});

// Helper functions
const getRiskLevelLabel = (level) => {
  const labels = {
    low: 'Düşük Risk',
    medium: 'Orta Risk',
    high: 'Yüksek Risk',
    critical: 'Kritik Risk'
  };
  return labels[level] || level;
};

const getRiskLevelColor = (level) => {
  const colors = {
    low: '#22c55e',
    medium: '#f97316',
    high: '#ef4444',
    critical: '#7c3aed'
  };
  return colors[level] || '#666';
};

/**
 * Risk Analysis PDF Document Component
 */
export function RiskPDFDocument({ result, scenarioName, answers, questions }) {
  const today = new Date().toLocaleDateString('tr-TR');
  const { riskScore, riskLevel, recommendation, criticalFactors, advice } = result;
  const riskColor = getRiskLevelColor(riskLevel);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>RİSK ANALİZİ RAPORU</Text>
          <Text style={styles.subtitle}>{scenarioName}</Text>
        </View>

        {/* Score Box */}
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Risk Skoru</Text>
          <Text style={[styles.scoreNumber, { color: riskColor }]}>
            {riskScore}
          </Text>
          <Text style={styles.scoreMax}>/ 100</Text>
          <Text style={[styles.riskLevel, { backgroundColor: riskColor, color: 'white' }]}>
            {getRiskLevelLabel(riskLevel)}
          </Text>
        </View>

        {/* Recommendation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DEĞERLENDİRME</Text>
          <View style={{ padding: 10, backgroundColor: '#f8fafc' }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5, color: riskColor }}>
              {recommendation.title}
            </Text>
            <Text style={{ fontSize: 10, lineHeight: 1.6 }}>
              {recommendation.description}
            </Text>
          </View>
        </View>

        {/* Critical Factors */}
        {criticalFactors && criticalFactors.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ÖNE ÇIKAN FAKTÖRLER</Text>
            {criticalFactors.slice(0, 5).map((factor, index) => {
              const isPositive = factor.finalImpact < 0;
              const impactAbs = Math.abs(factor.finalImpact).toFixed(1);
              
              return (
                <View key={index} style={styles.factorItem}>
                  <View style={styles.factorIcon}>
                    <Text style={{ color: isPositive ? '#22c55e' : '#ef4444', fontSize: 16 }}>
                      {isPositive ? '↓' : '↑'}
                    </Text>
                  </View>
                  <View style={styles.factorContent}>
                    <Text style={[styles.factorImpact, { color: isPositive ? '#22c55e' : '#ef4444' }]}>
                      {isPositive ? '-' : '+'}{impactAbs} puan - {factor.category}
                    </Text>
                    <Text style={{ fontSize: 10 }}>{factor.selectedOption}</Text>
                    <Text style={{ fontSize: 9, color: '#666', marginTop: 3 }}>
                      {factor.explanation}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Action Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ÖNERİLEN EYLEMLER</Text>
          {recommendation.actions.map((action, index) => (
            <View key={index} style={styles.actionItem}>
              <Text style={styles.actionBullet}>✓</Text>
              <Text style={styles.actionText}>{action}</Text>
            </View>
          ))}
        </View>

        {/* High Risk Warning */}
        {(riskLevel === 'high' || riskLevel === 'critical') && (
          <View style={styles.warning}>
            <Text style={styles.warningTitle}>⚠ ÖNEMLİ UYARI</Text>
            <Text style={{ fontSize: 10 }}>
              Risk seviyeniz yüksek. Profesyonel hukuki destek almanızı şiddetle tavsiye ederiz.
              Bir avukata danışarak haklarınızı koruma altına alabilirsiniz.
            </Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Bu rapor HukukAsistanım platformu üzerinden oluşturulmuştur.
          </Text>
          <Text style={styles.footerText}>
            Tarih: {today} | www.hukukasistanim.com
          </Text>
          <Text style={[styles.footerText, { marginTop: 10, fontSize: 8 }]}>
            Not: Bu analiz genel bilgilendirme amaçlıdır ve hukuki tavsiye yerine geçmez.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default RiskPDFDocument;
