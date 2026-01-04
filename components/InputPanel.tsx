'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Sparkles, Upload } from 'lucide-react';
import { AnalysisInput } from '@/lib/types';

interface InputPanelProps {
  onAnalyze: (input: AnalysisInput) => void;
  isLoading?: boolean;
}

const COINS = ['BTC', 'ETH', 'SOL', 'XRP', 'ADA', 'DOGE', 'MATIC', 'DOT'];
const TIMEFRAMES = ['1H', '4H', 'Daily', 'Weekly', 'Monthly'];

export function InputPanel({ onAnalyze, isLoading = false }: InputPanelProps) {
  const [newsUrl, setNewsUrl] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [contextNotes, setContextNotes] = useState('');
  const [coin, setCoin] = useState('BTC');
  const [timeframe, setTimeframe] = useState('4H');
  const [chartImage, setChartImage] = useState<string>('');
  const [fileName, setFileName] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setChartImage(reader.result as string);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onAnalyze({
      newsUrl: newsUrl || undefined,
      newsContent: newsContent || undefined,
      contextNotes: contextNotes || undefined,
      chartImage: chartImage || undefined,
      coin,
      timeframe,
    });
  };

  const isFormValid = newsUrl || newsContent || chartImage || contextNotes;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">New Analysis Session</h2>
        <p className="text-muted-foreground text-sm">
          Input data sources for AI processing
        </p>
      </div>

      <div className="space-y-4">
        {/* Article URL */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Article or Source URL
          </label>
          <Input
            type="url"
            placeholder="https://coindesk.com/..."
            value={newsUrl}
            onChange={(e) => setNewsUrl(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Asset and Timeframe */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Asset</label>
            <Select
              value={coin}
              onChange={(e) => setCoin(e.target.value)}
              disabled={isLoading}
            >
              {COINS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Timeframe</label>
            <Select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              disabled={isLoading}
            >
              {TIMEFRAMES.map((tf) => (
                <option key={tf} value={tf}>
                  {tf}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Context Notes */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Context Notes
          </label>
          <Textarea
            placeholder="Add specific context, rumors, or notes..."
            value={contextNotes}
            onChange={(e) => setContextNotes(e.target.value)}
            disabled={isLoading}
            rows={4}
          />
        </div>

        {/* Chart Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Chart Screenshot
          </label>
          <Card className="border-2 border-dashed hover:border-primary/50 transition-colors">
            <label
              htmlFor="chart-upload"
              className="flex flex-col items-center justify-center py-8 cursor-pointer"
            >
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-1">
                {fileName || 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-muted-foreground">
                Supports JPG, PNG (Max 5MB)
              </p>
              <input
                id="chart-upload"
                type="file"
                className="hidden"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleImageUpload}
                disabled={isLoading}
              />
            </label>
          </Card>
        </div>

        {/* Analyze Button */}
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid || isLoading}
          className="w-full h-12 text-base font-semibold"
          size="lg"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Analyze Market
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
