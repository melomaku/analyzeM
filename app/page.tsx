'use client';

import React, { useState, useEffect } from 'react';
import { InputPanel } from '@/components/InputPanel';
import { AnalysisResult } from '@/components/AnalysisResult';
import { HistorySidebar } from '@/components/HistorySidebar';
import { AnalysisInput, AnalysisResult as AnalysisResultType } from '@/lib/types';
import { saveAnalysis, getAnalyses, deleteAnalysis } from '@/lib/storage';
import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResultType | null>(null);
  const [analyses, setAnalyses] = useState<AnalysisResultType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load analyses from local storage on mount
  useEffect(() => {
    const stored = getAnalyses();
    setAnalyses(stored);
  }, []);

  const handleAnalyze = async (input: AnalysisInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to analyze market');
      }

      const result: AnalysisResultType = await response.json();

      // Save to local storage
      saveAnalysis(result);

      // Update state
      setCurrentAnalysis(result);
      setAnalyses([result, ...analyses]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAnalysis = (analysis: AnalysisResultType) => {
    setCurrentAnalysis(analysis);
    setError(null);
  };

  const handleDeleteAnalysis = (id: string) => {
    deleteAnalysis(id);
    const updated = analyses.filter((a) => a.id !== id);
    setAnalyses(updated);

    if (currentAnalysis?.id === id) {
      setCurrentAnalysis(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CL</span>
            </div>
            <span className="font-bold text-lg">CryptoLens</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              History
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Settings
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - Input */}
        <div className="w-full lg:w-96 border-r border-border p-6 overflow-y-auto">
          <InputPanel onAnalyze={handleAnalyze} isLoading={isLoading} />
        </div>

        {/* Center Panel - Analysis Result */}
        <div className="flex-1 p-6 overflow-y-auto">
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
              <p className="font-semibold mb-1">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-lg font-medium">Analyzing market...</p>
              <p className="text-sm text-muted-foreground mt-2">
                Claude is processing your request
              </p>
            </div>
          ) : currentAnalysis ? (
            <AnalysisResult result={currentAnalysis} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl">📊</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome to CryptoLens</h2>
              <p className="text-muted-foreground max-w-md">
                Enter your market data in the left panel to get started with AI-powered crypto analysis.
              </p>
            </div>
          )}
        </div>

        {/* Right Panel - History */}
        <div className="hidden xl:block w-80 border-l border-border overflow-hidden">
          <HistorySidebar
            analyses={analyses}
            onSelect={handleSelectAnalysis}
            onDelete={handleDeleteAnalysis}
            selectedId={currentAnalysis?.id}
          />
        </div>
      </div>
    </div>
  );
}
