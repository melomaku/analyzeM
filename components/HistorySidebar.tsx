'use client';

import React from 'react';
import { AnalysisResult } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HistorySidebarProps {
  analyses: AnalysisResult[];
  onSelect: (analysis: AnalysisResult) => void;
  onDelete: (id: string) => void;
  selectedId?: string;
}

export function HistorySidebar({
  analyses,
  onSelect,
  onDelete,
  selectedId,
}: HistorySidebarProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 70) return 'text-green-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold flex items-center gap-2">
          <Clock className="w-4 h-4" />
          History
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          {analyses.length} {analyses.length === 1 ? 'analysis' : 'analyses'}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {analyses.length === 0 ? (
          <div className="text-center py-8 px-4">
            <p className="text-sm text-muted-foreground">
              No analyses yet. Start by analyzing a market!
            </p>
          </div>
        ) : (
          analyses.map((analysis) => (
            <Card
              key={analysis.id}
              className={cn(
                'p-3 cursor-pointer hover:bg-accent transition-colors group relative',
                selectedId === analysis.id && 'bg-accent border-primary'
              )}
              onClick={() => onSelect(analysis)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">
                      {analysis.input.coin}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {analysis.input.timeframe}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {formatDate(analysis.timestamp)}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-secondary rounded-full h-1.5 overflow-hidden">
                      <div
                        className={cn(
                          'h-full transition-all',
                          analysis.confidence.score >= 70 && 'bg-green-500',
                          analysis.confidence.score >= 50 &&
                            analysis.confidence.score < 70 &&
                            'bg-amber-500',
                          analysis.confidence.score < 50 && 'bg-red-500'
                        )}
                        style={{ width: `${analysis.confidence.score}%` }}
                      />
                    </div>
                    <span
                      className={cn(
                        'text-xs font-bold',
                        getConfidenceColor(analysis.confidence.score)
                      )}
                    >
                      {analysis.confidence.score}%
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(analysis.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              {analysis.summary && (
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                  {analysis.summary}
                </p>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
