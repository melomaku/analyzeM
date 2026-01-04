import { NextRequest, NextResponse } from 'next/server';
import { analyzeMarket } from '@/lib/claude';
import { AnalysisInput } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const input: AnalysisInput = await request.json();

    // Validate input
    if (!input.coin || !input.timeframe) {
      return NextResponse.json(
        { error: 'Missing required fields: coin and timeframe' },
        { status: 400 }
      );
    }

    // Call Claude API
    const analysis = await analyzeMarket(input);

    // Generate unique ID and add metadata
    const result = {
      id: `analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      input,
      ...analysis,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      { error: 'Failed to analyze market', details: errorMessage },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
