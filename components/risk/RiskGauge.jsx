'use client';

import { useEffect, useState, useMemo } from 'react';

// Color segments for risk levels
const RISK_SEGMENTS = [
  { min: 0, max: 40, color: '#22c55e', label: 'Düşük' },    // Green
  { min: 40, max: 60, color: '#eab308', label: 'Orta' },    // Yellow
  { min: 60, max: 80, color: '#f97316', label: 'Yüksek' },  // Orange
  { min: 80, max: 100, color: '#ef4444', label: 'Kritik' }, // Red
];

/**
 * Get color based on score
 */
const getColorForScore = (score) => {
  const segment = RISK_SEGMENTS.find(s => score >= s.min && score < s.max);
  return segment ? segment.color : RISK_SEGMENTS[RISK_SEGMENTS.length - 1].color;
};

/**
 * Enhanced Circular Risk Gauge Component
 * Shows risk score with color segments and smooth animations
 */
export function RiskGauge({ score, color, size = 220, strokeWidth = 18 }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Use provided color or calculate from score
  const gaugeColor = color || getColorForScore(score);

  // Animate score on mount or score change
  useEffect(() => {
    setIsAnimating(true);
    setAnimatedScore(0);
    
    const duration = 1500;
    const steps = 60;
    const stepValue = score / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newValue = Math.min(Math.round(currentStep * stepValue), score);
      setAnimatedScore(newValue);
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedScore(score);
        setIsAnimating(false);
      }
    }, stepDuration);

    return () => {
      clearInterval(timer);
      setIsAnimating(false);
    };
  }, [score]);

  // Calculate circle parameters
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate segment angles (using 270 degrees arc, starting from bottom-left)
  const arcLength = circumference * 0.75; // 270 degrees = 75% of full circle
  const offset = arcLength - (animatedScore / 100) * arcLength;

  // Get risk label
  const riskLabel = useMemo(() => {
    const segment = RISK_SEGMENTS.find(s => score >= s.min && score < s.max);
    return segment ? segment.label : 'Kritik';
  }, [score]);

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform rotate-[135deg]"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Segment backgrounds */}
        {RISK_SEGMENTS.map((segment, idx) => {
          const segmentStart = (segment.min / 100) * arcLength;
          const segmentLength = ((segment.max - segment.min) / 100) * arcLength;
          const segmentOffset = arcLength - segmentStart - segmentLength;
          
          return (
            <circle
              key={idx}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={`${segment.color}30`}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
              strokeDashoffset={segmentOffset}
              strokeLinecap="butt"
            />
          );
        })}
        
        {/* Active progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={gaugeColor}
          strokeWidth={strokeWidth + 2}
          fill="none"
          strokeDasharray={`${arcLength} ${circumference - arcLength}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
          style={{
            filter: `drop-shadow(0 0 10px ${gaugeColor}60)`
          }}
        />
        
        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const angle = (tick / 100) * 270 - 45; // Map to 270 degree arc
          const rad = (angle * Math.PI) / 180;
          const innerR = radius - strokeWidth / 2 - 8;
          const outerR = radius - strokeWidth / 2 - 2;
          const x1 = size / 2 + innerR * Math.cos(rad);
          const y1 = size / 2 + innerR * Math.sin(rad);
          const x2 = size / 2 + outerR * Math.cos(rad);
          const y2 = size / 2 + outerR * Math.sin(rad);
          
          return (
            <line
              key={tick}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#9ca3af"
              strokeWidth={tick % 50 === 0 ? 2 : 1}
              className="transform -rotate-[135deg] origin-center"
            />
          );
        })}
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span 
          className="text-5xl font-bold transition-colors duration-300" 
          style={{ color: gaugeColor }}
        >
          {isAnimating ? Math.round(animatedScore) : score}
        </span>
        <span className="text-sm text-gray-500 mt-1">/ 100</span>
        <span 
          className="text-sm font-semibold mt-2 px-3 py-1 rounded-full transition-colors duration-300"
          style={{ 
            backgroundColor: `${gaugeColor}15`,
            color: gaugeColor 
          }}
        >
          {riskLabel} Risk
        </span>
      </div>
    </div>
  );
}

/**
 * Mini Risk Gauge for cards/lists
 */
export function MiniRiskGauge({ score, size = 60 }) {
  const color = getColorForScore(score);
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={6}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={6}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span 
        className="absolute text-sm font-bold" 
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}

/**
 * Linear gauge with segments
 */
export function LinearGauge({ score, height = 12 }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const color = getColorForScore(score);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Risk Skoru</span>
        <span className="text-lg font-bold" style={{ color }}>
          {score}/100
        </span>
      </div>
      <div className="relative">
        {/* Background with segments */}
        <div 
          className="w-full rounded-full overflow-hidden flex"
          style={{ height: `${height}px` }}
        >
          {RISK_SEGMENTS.map((segment, idx) => (
            <div
              key={idx}
              className="h-full"
              style={{
                width: `${segment.max - segment.min}%`,
                backgroundColor: `${segment.color}30`
              }}
            />
          ))}
        </div>
        {/* Active progress */}
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${animatedScore}%`,
            backgroundColor: color,
            height: `${height}px`,
            boxShadow: `0 0 8px ${color}60`
          }}
        />
      </div>
    </div>
  );
}

export default RiskGauge;
