import Anthropic from '@anthropic-ai/sdk';
import { AnalysisInput, AnalysisResult } from './types';

const SYSTEM_PROMPT = `You are an expert cryptocurrency market analyst with deep knowledge of technical analysis, market psychology, and institutional behavior. Your role is to provide balanced, probabilistic analysis that accounts for multiple scenarios.

When analyzing crypto markets, you should:
1. Consider both technical and fundamental factors
2. Acknowledge uncertainty and provide probability-weighted scenarios
3. Highlight contrarian viewpoints to avoid groupthink
4. Identify key price levels and patterns when charts are provided
5. Note institutional flows, regulatory developments, and macro factors
6. Provide actionable insights while managing risk

Return your analysis as a JSON object with this structure:
{
  "summary": "A 2-3 sentence executive summary with key price levels highlighted",
  "confidence": {
    "score": 0-100,
    "level": "High Certainty" | "Medium Certainty" | "Low Certainty",
    "reasoning": [
      {"factor": "description", "impact": "bullish|bearish|neutral", "type": "positive|negative|neutral"}
    ]
  },
  "scenarios": {
    "bull": {
      "probability": 0-100,
      "title": "Brief title",
      "description": "What needs to happen",
      "targetPrice": number,
      "keyFactors": ["factor1", "factor2"]
    },
    "neutral": { same structure },
    "bear": { same structure }
  },
  "contrarianView": {
    "title": "Contrarian perspective title",
    "argument": "The contrarian argument in quotes",
    "blindSpots": ["What the crowd might be missing"],
    "invalidation": "What would prove this view wrong"
  },
  "patternsDetected": [
    {"name": "Pattern name", "reliability": "high|medium|low", "description": "Brief description"}
  ],
  "keyLevels": {
    "support": [price1, price2],
    "resistance": [price1, price2],
    "invalidation": price
  },
  "signalsToWatch": ["Signal 1", "Signal 2"],
  "riskFactors": ["Risk 1", "Risk 2"]
}`;

export async function analyzeMarket(input: AnalysisInput): Promise<Partial<AnalysisResult>> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not configured');
  }

  const anthropic = new Anthropic({ apiKey });

  // Build the user message
  let userMessage = `Analyze ${input.coin} on the ${input.timeframe} timeframe.\n\n`;

  if (input.newsUrl) {
    userMessage += `News Source: ${input.newsUrl}\n\n`;
  }

  if (input.newsContent) {
    userMessage += `News Content:\n${input.newsContent}\n\n`;
  }

  if (input.contextNotes) {
    userMessage += `Context Notes:\n${input.contextNotes}\n\n`;
  }

  const content: Anthropic.MessageParam['content'] = [
    { type: 'text', text: userMessage }
  ];

  // Add image if provided
  if (input.chartImage) {
    const base64Data = input.chartImage.split(',')[1] || input.chartImage;
    const mediaType = input.chartImage.includes('image/png') ? 'image/png' : 'image/jpeg';

    content.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: mediaType,
        data: base64Data,
      },
    });
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      temperature: 0.7,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content,
        },
      ],
    });

    // Extract JSON from response
    const textContent = response.content.find((c) => c.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text content in response');
    }

    // Try to extract JSON from the response
    const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not find JSON in response');
    }

    const analysis = JSON.parse(jsonMatch[0]);

    return analysis;
  } catch (error) {
    console.error('Claude API Error:', error);
    throw error;
  }
}
