'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface ConfidenceScoreProps {
  score: number;
  level: string;
}

export function ConfidenceScore({ score, level }: ConfidenceScoreProps) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 70) return '#10b981'; // green
    if (score >= 50) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-secondary/20">
      <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
        <span className="text-blue-500">⚡</span> AI Confidence Score
      </h3>
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40">
          {/* Background circle */}
          <svg className="transform -rotate-90 w-40 h-40">
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-secondary"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={getColor()}
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold" style={{ color: getColor() }}>
              {score}%
            </span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p
            className="text-sm font-medium px-3 py-1 rounded-full inline-block"
            style={{
              backgroundColor: `${getColor()}20`,
              color: getColor(),
            }}
          >
            {level}
          </p>
        </div>
      </div>
    </Card>
  );
}
