'use client';

import { useState } from 'react';
import { Edit3, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SplitScreenContainer({ children }) {
  const [activeTab, setActiveTab] = useState('form');
  
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row">
      {/* Mobile Tab Switcher */}
      <div className="md:hidden flex border-b bg-white sticky top-0 z-10">
        <button 
          onClick={() => setActiveTab('form')}
          className={cn(
            "flex-1 py-3 text-sm font-medium transition-colors",
            activeTab === 'form' 
              ? "text-primary bg-primary/5 border-b-2 border-primary" 
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          <Edit3 className="w-4 h-4 inline mr-2" />
          Form
        </button>
        <button 
          onClick={() => setActiveTab('preview')}
          className={cn(
            "flex-1 py-3 text-sm font-medium transition-colors",
            activeTab === 'preview' 
              ? "text-primary bg-primary/5 border-b-2 border-primary" 
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          <Eye className="w-4 h-4 inline mr-2" />
          Önizleme
        </button>
      </div>

      {/* Left Panel: Form (50% on desktop, 100% on mobile when active) */}
      <div className={cn(
        "w-full md:w-1/2 bg-white overflow-y-auto",
        activeTab === 'form' ? 'block' : 'hidden md:block'
      )}>
        {children[0]}
      </div>

      {/* Right Panel: Preview (50% on desktop, 100% on mobile when active) */}
      <div className={cn(
        "w-full md:w-1/2 bg-gray-50 overflow-y-auto",
        activeTab === 'preview' ? 'block' : 'hidden md:block'
      )}>
        {children[1]}
      </div>
    </div>
  );
}