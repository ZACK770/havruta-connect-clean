'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
}

export function HavrutaLogo({ className = '', size = 'md', animated = true }: LogoProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  if (!mounted) {
    return (
      <div className={cn(sizes[size], className)}>
        <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse" />
      </div>
    )
  }

  return (
    <div className={cn('relative', sizes[size], className)}>
      <svg
        viewBox="0 0 100 100"
        className={cn(
          'w-full h-full transition-all duration-700 ease-out',
          animated && 'animate-breathe'
        )}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient definitions */}
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="1">
              <animate attributeName="stop-color" values="#6366f1;#8b5cf6;#6366f1" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1">
              <animate attributeName="stop-color" values="#8b5cf6;#6366f1;#8b5cf6" dur="4s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          
          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="logoGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer glow ring */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="url(#glowGradient)"
          strokeWidth="0.5"
          className={animated ? 'animate-pulse-slow' : undefined}
          opacity="0.6"
        />

        {/* Main circular background */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#logoGradient)"
          className={animated ? 'animate-rotate-slow' : undefined}
          filter="url(#logoGlow)"
        />

        {/* Inner Hebrew letter ח (Chet) - represents "Havruta" */}
        <g transform="translate(50, 50)">
          {/* Modern, minimalist ח design */}
          <path
            d="M -15 -20 L -15 20 M -15 -5 L 15 -5 M 15 -20 L 15 20"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className={animated ? 'animate-draw' : undefined}
            style={{
              strokeDasharray: 100,
              strokeDashoffset: animated ? 100 : 0,
              animation: animated ? 'drawPath 2s ease-out forwards, breathe 3s ease-in-out infinite 2s' : 'none'
            }}
          />
        </g>

        {/* Connection dots representing "connect" */}
        <g className={animated ? 'animate-float' : undefined}>
          <circle cx="25" cy="25" r="2" fill="white" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="75" cy="25" r="2" fill="white" opacity="0.8">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="25" cy="75" r="2" fill="white" opacity="0.8">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="75" cy="75" r="2" fill="white" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Subtle inner ring */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          opacity="0.2"
        />
      </svg>

      <style jsx>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes drawPath {
          to { stroke-dashoffset: 0; }
        }
        
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.3; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        
        .animate-breathe {
          animation: breathe 3s ease-in-out infinite;
        }
        
        .animate-draw {
          animation: drawPath 2s ease-out forwards;
        }
        
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
