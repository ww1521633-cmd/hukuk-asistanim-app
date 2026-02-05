'use client';

import { useEffect, useState } from 'react';

/**
 * Circular Risk Gauge Component
 * Shows risk score as animated circular progress
 */
export function RiskGauge({ score, color, size = 200, strokeWidth = 20 }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate score on mount
  useEffect(() => {
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const stepValue = score / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setAnimatedScore(Math.min(currentStep * stepValue, score));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [score]);

  // Calculate circle parameters
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
          style={{
            filter: `drop-shadow(0 0 8px ${color}40)`
          }}
        />
      </svg>

      {/* Score text in center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold" style={{ color }}>
          {Math.round(animatedScore)}
        </span>
        <span className="text-sm text-gray-500 mt-1">/ 100</span>
      </div>
    </div>
  );
}

/**
 * Simple linear gauge alternative
 */
export function LinearGauge({ score, color, height = 12 }) {
  const [animatedScore, setAnimatedScore] = useState(0);

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
      <div 
        className="w-full bg-gray-200 rounded-full overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <div
          className="h-full transition-all duration-1000 ease-out rounded-full"
          style={{
            width: `${animatedScore}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
}