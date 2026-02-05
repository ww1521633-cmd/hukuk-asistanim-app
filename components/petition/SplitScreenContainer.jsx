'use client';

import { useState } from 'react';
import { Edit3, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SplitScreenContainer({ children }) {
  const [activeTab, setActiveTab] = useState('form');
  
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row">
      {/* Mobile Tab Switcher */}
      <div className="md:hidden bg-white sticky top-0 z-10">
        <div className="flex relative">
          <button 
            onClick={() => setActiveTab('form')}
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-all relative z-10",
              "flex items-center justify-center gap-2",
              activeTab === 'form' 
                ? "text-primary bg-primary/5" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            <Edit3 className="w-4 h-4" />
            Form
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-all relative z-10",
              "flex items-center justify-center gap-2",
              activeTab === 'preview' 
                ? "text-primary bg-primary/5" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            <Eye className="w-4 h-4" />
            Önizleme
          </button>
          
          {/* Active Tab Indicator - Full width sliding bar */}
          <div 
            className={cn(
              "absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-out",
              activeTab === 'form' ? "left-0 w-1/2" : "left-1/2 w-1/2"
            )}
          />
        </div>
        {/* Bottom border line */}
        <div className="h-px bg-gray-200 w-full" />
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