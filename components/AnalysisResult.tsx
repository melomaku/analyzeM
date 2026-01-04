'use client';

import React from 'react';
import { AnalysisResult as AnalysisResultType } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ConfidenceScore } from './ConfidenceScore';
import { ScenarioCard } from './ScenarioCard';
import { ContrarianView } from './ContrarianView';
import { Share, Copy, TrendingUp, TrendingDown } from 'lucide-react';

interface AnalysisResultProps {
  result: AnalysisResultType;
}

export function AnalysisResult({ result }: AnalysisResultProps) {
  const handleCopy = async () => {
    const text = `${result.input.coin} / USD - ${result.input.timeframe}\n\n${result.summary}\n\nConfidence: ${result.confidence.score}%`;
    await navigator.clipboard.writeText(text);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
            ₿
          </div>
          <div>
            <h2 className="text-xl font-bold">
              {result.input.coin} / USD
            </h2>
            <p className="text-sm text-muted-foreground">
              {result.input.timeframe} • Analysis generated: {new Date(result.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="w-4 h-4 mr-2" />
            Copy Analysis
          </Button>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Confidence Score */}
        <div className="lg:col-span-1">
          <ConfidenceScore
            score={result.confidence.score}
            level={result.confidence.level}
          />
        </div>

        {/* Executive Summary */}
        <div className="lg:col-span-2">
          <Card className="p-6 h-full">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <span className="text-blue-500">✨</span> Executive Summary
            </h3>
            <p className="text-sm leading-relaxed">{result.summary}</p>
          </Card>
        </div>
      </div>

      {/* Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScenarioCard type="bull" scenario={result.scenarios.bull} />
        <ScenarioCard type="neutral" scenario={result.scenarios.neutral} />
        <ScenarioCard type="bear" scenario={result.scenarios.bear} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Drivers */}
        <Card className="p-6">
          <h3 className="text-sm font-medium mb-4">Market Drivers</h3>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">
                POSITIVE FACTORS
              </p>
              <ul className="space-y-2">
                {result.confidence.reasoning
                  .filter((r) => r.type === 'positive')
                  .map((reason, idx) => (
                    <li key={idx} className="flex gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{reason.factor}</span>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">
                NEGATIVE FACTORS
              </p>
              <ul className="space-y-2">
                {result.confidence.reasoning
                  .filter((r) => r.type === 'negative')
                  .map((reason, idx) => (
                    <li key={idx} className="flex gap-2 text-sm">
                      <TrendingDown className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{reason.factor}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Contrarian View */}
        <ContrarianView
          title={result.contrarianView.title}
          argument={result.contrarianView.argument}
          blindSpots={result.contrarianView.blindSpots}
        />
      </div>

      {/* Key Levels & Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium mb-4">Key Levels & Patterns</h3>

          {result.patternsDetected && result.patternsDetected.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {result.patternsDetected.map((pattern, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full border border-blue-500/30"
                >
                  {pattern.name}
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/30">
              <p className="text-xs font-medium text-red-400 mb-1">RESISTANCE</p>
              <div className="space-y-1">
                {result.keyLevels.resistance.map((level, idx) => (
                  <p key={idx} className="text-sm font-bold text-red-400">
                    {formatPrice(level)}
                  </p>
                ))}
              </div>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
              <p className="text-xs font-medium text-green-400 mb-1">SUPPORT</p>
              <div className="space-y-1">
                {result.keyLevels.support.map((level, idx) => (
                  <p key={idx} className="text-sm font-bold text-green-400">
                    {formatPrice(level)}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Signals to Watch */}
        <Card className="p-6">
          <h3 className="text-sm font-medium mb-4">Signals to Watch</h3>
          <ul className="space-y-2">
            {result.signalsToWatch.map((signal, idx) => (
              <li key={idx} className="flex gap-2 text-sm">
                <span className="text-blue-500">→</span>
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
