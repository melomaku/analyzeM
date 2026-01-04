'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface ContrarianViewProps {
  title: string;
  argument: string;
  blindSpots?: string[];
}

export function ContrarianView({
  title,
  argument,
  blindSpots,
}: ContrarianViewProps) {
  return (
    <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-2 border-purple-500/30">
      <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-purple-400" />
        <span className="text-purple-400">CONTRARIAN VIEW</span>
      </h3>
      <blockquote className="italic text-sm text-foreground/90 mb-4 border-l-2 border-purple-500 pl-4">
        &quot;{argument}&quot;
      </blockquote>
      {blindSpots && blindSpots.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            Potential Blind Spots:
          </p>
          <ul className="text-xs space-y-1">
            {blindSpots.map((spot, idx) => (
              <li key={idx} className="text-muted-foreground">
                • {spot}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
