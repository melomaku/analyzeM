'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Scenario } from '@/lib/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ScenarioCardProps {
  type: 'bull' | 'bear' | 'neutral';
  scenario: Scenario;
}

export function ScenarioCard({ type, scenario }: ScenarioCardProps) {
  const config = {
    bull: {
      label: 'BULL CASE',
      icon: TrendingUp,
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-500',
    },
    neutral: {
      label: 'NEUTRAL',
      icon: Minus,
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-500',
    },
    bear: {
      label: 'BEAR CASE',
      icon: TrendingDown,
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      textColor: 'text-red-500',
    },
  };

  const { label, icon: Icon, bgColor, borderColor, textColor } = config[type];

  return (
    <Card className={`p-6 border-2 ${borderColor} ${bgColor}`}>
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs font-bold ${textColor}`}>{label}</span>
        <span className={`text-2xl font-bold ${textColor}`}>
          {scenario.probability}%
        </span>
      </div>
      <h4 className="font-semibold mb-2 flex items-center gap-2">
        <Icon className={`w-4 h-4 ${textColor}`} />
        {scenario.title}
      </h4>
      <p className="text-sm text-muted-foreground mb-3">
        {scenario.description}
      </p>
      {scenario.keyFactors && scenario.keyFactors.length > 0 && (
        <ul className="text-xs space-y-1">
          {scenario.keyFactors.slice(0, 2).map((factor, idx) => (
            <li key={idx} className="text-muted-foreground">
              • {factor}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
