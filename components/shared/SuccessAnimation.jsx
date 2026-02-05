'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

/**
 * Success Animation Component
 * Displays a celebratory animation with confetti and animated checkmark
 * Used in completion screens for Risk Analysis and Consumer Arbitration
 */
export function SuccessAnimation({ 
  show = true, 
  onComplete,
  size = 120,
  confettiEnabled = true,
  autoTrigger = true 
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  // Confetti burst function
  const triggerConfetti = useCallback(() => {
    if (!confettiEnabled || typeof window === 'undefined') return;

    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    // Confetti colors matching the app theme (Navy Blue, Orange, Green)
    const colors = ['#1e3a5f', '#f97316', '#22c55e', '#3b82f6', '#fbbf24'];

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Fire from both sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: colors
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: colors
      });
    }, 250);

    // Initial burst from center
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
      zIndex: 1000
    });
  }, [confettiEnabled]);

  useEffect(() => {
    if (show && autoTrigger && !isAnimating) {
      setIsAnimating(true);
      triggerConfetti();
      
      // Call onComplete after animation
      const timer = setTimeout(() => {
        onComplete?.();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [show, autoTrigger, isAnimating, triggerConfetti, onComplete]);

  // Manual trigger function
  const triggerAnimation = useCallback(() => {
    triggerConfetti();
  }, [triggerConfetti]);

  // SVG Checkmark animation variants
  const containerVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        duration: 0.6
      }
    }
  };

  const circleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.8, ease: 'easeInOut' },
        opacity: { duration: 0.2 }
      }
    }
  };

  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.5, ease: 'easeInOut', delay: 0.4 },
        opacity: { duration: 0.2, delay: 0.4 }
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: [0.3, 0.6, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="relative inline-flex items-center justify-center">
          {/* Glow effect behind the icon */}
          <motion.div
            className="absolute rounded-full bg-green-400/30 blur-xl"
            style={{ width: size * 1.5, height: size * 1.5 }}
            variants={glowVariants}
            initial="initial"
            animate="animate"
          />
          
          {/* Main container with pulse */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate="pulse"
            >
              <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background circle fill */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="#dcfce7"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Animated circle stroke */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#22c55e"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  variants={circleVariants}
                  initial="hidden"
                  animate="visible"
                />
                
                {/* Animated checkmark */}
                <motion.path
                  d="M30 52 L45 67 L72 35"
                  stroke="#22c55e"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={checkmarkVariants}
                  initial="hidden"
                  animate="visible"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Sparkle effects */}
          <Sparkles size={size} />
        </div>
      )}
    </AnimatePresence>
  );
}

/**
 * Sparkle effects around the success icon
 */
function Sparkles({ size }) {
  const sparklePositions = [
    { top: '0%', left: '50%', delay: 0.5 },
    { top: '20%', left: '90%', delay: 0.7 },
    { top: '80%', left: '90%', delay: 0.9 },
    { top: '100%', left: '50%', delay: 1.1 },
    { top: '80%', left: '10%', delay: 1.3 },
    { top: '20%', left: '10%', delay: 1.5 },
  ];

  return (
    <>
      {sparklePositions.map((pos, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ 
            top: pos.top, 
            left: pos.left,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.6,
            delay: pos.delay,
            repeat: Infinity,
            repeatDelay: 2
          }}
        >
          <svg
            width={size * 0.15}
            height={size * 0.15}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2L13.5 9L20 10L13.5 11L12 18L10.5 11L4 10L10.5 9L12 2Z"
              fill="#fbbf24"
            />
          </svg>
        </motion.div>
      ))}
    </>
  );
}

/**
 * Compact success checkmark without confetti
 * For inline use in forms or smaller UI elements
 */
export function CompactSuccessCheck({ show = true, size = 24 }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              cx="12"
              cy="12"
              r="10"
              fill="#dcfce7"
              stroke="#22c55e"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.path
              d="M8 12 L11 15 L16 9"
              stroke="#22c55e"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SuccessAnimation;
