'use client';

export function LivePreview({ content, templateName }) {
  return (
    <div className="p-4 md:p-8 sticky top-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-gray-600">Canlı Önizleme</span>
        </div>
        <span className="text-xs text-gray-500">A4 Format</span>
      </div>

      {/* A4 Paper */}
      <div 
        className="bg-white shadow-2xl mx-auto overflow-hidden border border-gray-200"
        style={{
          width: 'min(210mm, 100%)',
          minHeight: '297mm',
          padding: 'clamp(15px, 5vw, 20mm)',
          aspectRatio: '210/297'
        }}
      >
        {/* Template Header */}
        <div className="mb-6 pb-4 border-b-2 border-primary">
          <h2 className="text-lg font-bold text-primary">{templateName}</h2>
        </div>
        
        {/* Content */}
        <div 
          className="font-serif text-gray-900 whitespace-pre-wrap"
          style={{ 
            fontSize: 'clamp(10px, 2.5vw, 12pt)',
            lineHeight: 1.6,
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}
        >
          {content || '\n\nFormu doldurmaya başlayın, dilekçeniz burada otomatik oluşturulacak...\n\n'}
        </div>
      </div>
    </div>
  );
}