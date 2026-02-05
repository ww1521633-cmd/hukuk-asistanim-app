'use client';

/**
 * Empty State Illustrations
 * Custom SVG illustrations for empty states
 */

// Empty Documents Illustration
export function EmptyDocumentsIllustration({ className = "w-32 h-32" }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Folder */}
      <path d="M20 35C20 31.6863 22.6863 29 26 29H45L52 38H94C97.3137 38 100 40.6863 100 44V85C100 88.3137 97.3137 91 94 91H26C22.6863 91 20 88.3137 20 85V35Z" fill="#E5E7EB" />
      <path d="M20 45H100V85C100 88.3137 97.3137 91 94 91H26C22.6863 91 20 88.3137 20 85V45Z" fill="#F3F4F6" />
      
      {/* Document */}
      <rect x="35" y="50" width="35" height="45" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="2"/>
      <line x1="42" y1="60" x2="63" y2="60" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round"/>
      <line x1="42" y1="68" x2="58" y2="68" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round"/>
      <line x1="42" y1="76" x2="55" y2="76" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round"/>
      
      {/* Pen */}
      <g transform="translate(70, 55) rotate(45)">
        <rect x="0" y="0" width="8" height="40" rx="1" fill="#1e3a5f"/>
        <polygon points="4,40 0,50 8,50" fill="#f97316"/>
        <rect x="0" y="0" width="8" height="8" rx="1" fill="#f97316"/>
      </g>
      
      {/* Plus icon */}
      <circle cx="95" cy="25" r="12" fill="#1e3a5f"/>
      <line x1="90" y1="25" x2="100" y2="25" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <line x1="95" y1="20" x2="95" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// Shield Analysis Illustration
export function ShieldAnalysisIllustration({ className = "w-32 h-32" }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Shield */}
      <path d="M60 15L20 30V55C20 80 36 98 60 105C84 98 100 80 100 55V30L60 15Z" fill="#E5E7EB"/>
      <path d="M60 20L25 33V55C25 77 39 93 60 99C81 93 95 77 95 55V33L60 20Z" fill="#F3F4F6"/>
      
      {/* Shield center mark */}
      <circle cx="60" cy="55" r="20" fill="white" stroke="#1e3a5f" strokeWidth="2"/>
      <path d="M52 55L57 60L68 49" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Magnifying glass */}
      <g transform="translate(75, 70)">
        <circle cx="12" cy="12" r="10" fill="white" stroke="#1e3a5f" strokeWidth="3"/>
        <line x1="19" y1="19" x2="30" y2="30" stroke="#1e3a5f" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="4" fill="none" stroke="#f97316" strokeWidth="2"/>
      </g>
      
      {/* Data points */}
      <circle cx="35" cy="75" r="4" fill="#f97316"/>
      <circle cx="45" cy="82" r="3" fill="#1e3a5f"/>
      <circle cx="28" cy="65" r="3" fill="#22c55e"/>
    </svg>
  );
}

// Scales & Documents Illustration
export function ScalesIllustration({ className = "w-32 h-32" }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Base */}
      <rect x="25" y="95" width="70" height="8" rx="2" fill="#E5E7EB"/>
      <rect x="55" y="45" width="10" height="50" fill="#D1D5DB"/>
      
      {/* Scale top beam */}
      <rect x="20" y="40" width="80" height="6" rx="2" fill="#1e3a5f"/>
      <circle cx="60" cy="43" r="8" fill="#1e3a5f"/>
      <circle cx="60" cy="43" r="4" fill="#f97316"/>
      
      {/* Left scale pan */}
      <line x1="30" y1="43" x2="30" y2="60" stroke="#1e3a5f" strokeWidth="2"/>
      <ellipse cx="30" cy="65" rx="18" ry="6" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2"/>
      
      {/* Right scale pan */}
      <line x1="90" y1="43" x2="90" y2="55" stroke="#1e3a5f" strokeWidth="2"/>
      <ellipse cx="90" cy="60" rx="18" ry="6" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2"/>
      
      {/* Documents on left pan */}
      <rect x="20" y="55" width="15" height="10" rx="1" fill="white" stroke="#1e3a5f" strokeWidth="1"/>
      <rect x="25" y="52" width="15" height="10" rx="1" fill="white" stroke="#1e3a5f" strokeWidth="1"/>
      
      {/* Weight on right pan */}
      <rect x="82" y="48" width="16" height="12" rx="2" fill="#f97316"/>
      <text x="90" y="57" fontSize="8" fill="white" textAnchor="middle">TL</text>
      
      {/* Decorative document */}
      <g transform="translate(8, 75)">
        <rect width="20" height="25" rx="2" fill="white" stroke="#D1D5DB" strokeWidth="1.5"/>
        <line x1="4" y1="7" x2="16" y2="7" stroke="#E5E7EB" strokeWidth="2"/>
        <line x1="4" y1="12" x2="14" y2="12" stroke="#E5E7EB" strokeWidth="2"/>
        <line x1="4" y1="17" x2="12" y2="17" stroke="#E5E7EB" strokeWidth="2"/>
      </g>
    </svg>
  );
}

// Success Checkmark Illustration
export function SuccessIllustration({ className = "w-32 h-32" }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer glow */}
      <circle cx="60" cy="60" r="50" fill="#22c55e" fillOpacity="0.1"/>
      <circle cx="60" cy="60" r="40" fill="#22c55e" fillOpacity="0.2"/>
      
      {/* Main circle */}
      <circle cx="60" cy="60" r="30" fill="#22c55e"/>
      
      {/* Checkmark */}
      <path 
        d="M45 60L55 70L75 50" 
        stroke="white" 
        strokeWidth="5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Decorative stars */}
      <circle cx="25" cy="35" r="3" fill="#f97316"/>
      <circle cx="95" cy="40" r="4" fill="#1e3a5f"/>
      <circle cx="20" cy="75" r="2" fill="#1e3a5f"/>
      <circle cx="100" cy="80" r="3" fill="#f97316"/>
      
      {/* Sparkles */}
      <path d="M85 20L87 25L92 27L87 29L85 34L83 29L78 27L83 25L85 20Z" fill="#f97316"/>
      <path d="M30 90L31 93L34 94L31 95L30 98L29 95L26 94L29 93L30 90Z" fill="#1e3a5f"/>
    </svg>
  );
}

export default {
  EmptyDocumentsIllustration,
  ShieldAnalysisIllustration,
  ScalesIllustration,
  SuccessIllustration
};
