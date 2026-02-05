import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// PDF Styles for Petition
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 12,
    fontFamily: 'Helvetica',
    lineHeight: 1.6,
  },
  header: {
    borderBottom: '2pt solid #1e3a5f',
    paddingBottom: 15,
    marginBottom: 25,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e3a5f',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    textAlign: 'justify',
  },
  paragraph: {
    marginBottom: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 50,
    right: 50,
    borderTop: '1pt solid #eee',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: '#999',
    textAlign: 'center',
  },
  signatureArea: {
    marginTop: 50,
    textAlign: 'right',
  },
  signatureLabel: {
    marginBottom: 30,
  },
  signatureLine: {
    borderTop: '1pt solid #333',
    width: 150,
    marginLeft: 'auto',
    paddingTop: 5,
    textAlign: 'center',
    fontSize: 10,
  },
});

/**
 * Format content for PDF rendering
 * Converts plain text with line breaks to structured elements
 */
const formatContent = (content) => {
  if (!content) return [];
  
  // Split by double newlines for paragraphs
  const paragraphs = content.split(/\n\n+/);
  
  return paragraphs.map((para, index) => {
    // Handle lines within paragraph
    const lines = para.split('\n');
    return (
      <View key={index} style={styles.paragraph}>
        {lines.map((line, lineIndex) => (
          <Text key={lineIndex}>{line}</Text>
        ))}
      </View>
    );
  });
};

/**
 * Petition PDF Document Component
 */
export function PetitionPDFDocument({ templateName, content, formData }) {
  const today = new Date().toLocaleDateString('tr-TR');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{templateName}</Text>
          <Text style={styles.subtitle}>HukukAsistanım - Dilekçe Oluşturucu</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {formatContent(content)}
        </View>

        {/* Signature Area */}
        <View style={styles.signatureArea}>
          <Text style={styles.signatureLabel}>Tarih: {today}</Text>
          <View style={styles.signatureLine}>
            <Text>İmza</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Bu dilekçe HukukAsistanım platformu üzerinden oluşturulmuştur.
          </Text>
          <Text style={styles.footerText}>
            www.hukukasistanim.com | {today}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default PetitionPDFDocument;
