# CryptoLens 📊

AI-powered crypto market analysis dashboard built with Next.js 14 and Claude AI.

## Features

- **AI-Powered Analysis**: Leverage Claude AI for sophisticated market analysis
- **Multi-Source Input**: Analyze news articles, charts, and contextual notes
- **Scenario Planning**: Get bull, bear, and neutral scenarios with probabilities
- **Contrarian Views**: See alternative perspectives to avoid groupthink
- **Pattern Detection**: Automatic chart pattern recognition (when charts provided)
- **Key Levels**: Support and resistance levels identification
- **Analysis History**: Save and review past analyses with local storage
- **Dark Mode**: Professional dark theme optimized for traders

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Beautiful UI components
- **Anthropic Claude API** - AI analysis engine
- **Lucide React** - Modern icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Anthropic API key ([get one here](https://console.anthropic.com/))

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd cryptolens
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a \`.env.local\` file in the root directory:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Add your Anthropic API key to \`.env.local\`:
\`\`\`
ANTHROPIC_API_KEY=your_api_key_here
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Analyzing a Market

1. **Select Asset & Timeframe**: Choose the crypto asset (BTC, ETH, etc.) and timeframe (1H, 4H, Daily, etc.)

2. **Add Data Sources** (at least one required):
   - **Article URL**: Paste a link to a news article
   - **Context Notes**: Add specific context, rumors, or observations
   - **Chart Screenshot**: Upload a chart image for visual analysis

3. **Click "Analyze Market"**: Claude AI will process your inputs and generate:
   - Confidence score with reasoning
   - Executive summary
   - Bull/Bear/Neutral scenarios with probabilities
   - Market drivers (positive and negative factors)
   - Contrarian viewpoint
   - Chart patterns (if image provided)
   - Key support/resistance levels
   - Signals to watch

### Viewing History

- All analyses are automatically saved to local storage
- Access past analyses from the History sidebar (desktop) or History page (mobile)
- Click any analysis to view it again
- Delete analyses you no longer need

## Project Structure

\`\`\`
cryptolens/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # Claude API endpoint
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main dashboard
│   └── globals.css               # Global styles
├── components/
│   ├── ui/                       # Shadcn UI components
│   ├── InputPanel.tsx            # Analysis input form
│   ├── AnalysisResult.tsx        # Analysis display
│   ├── ConfidenceScore.tsx       # Confidence visualization
│   ├── ScenarioCard.tsx          # Scenario cards
│   ├── ContrarianView.tsx        # Contrarian perspective
│   └── HistorySidebar.tsx        # Analysis history
├── lib/
│   ├── claude.ts                 # Claude API integration
│   ├── storage.ts                # Local storage helpers
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Utility functions
└── hooks/                        # Custom React hooks
\`\`\`

## API Usage

The Claude API is configured to use the latest Sonnet model with:
- Temperature: 0.7 (balanced creativity)
- Max tokens: 4096
- Vision support for chart analysis
- Structured JSON responses

## Environment Variables

- \`ANTHROPIC_API_KEY\` - Your Anthropic API key (required)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add your \`ANTHROPIC_API_KEY\` environment variable
4. Deploy

### Other Platforms

This is a standard Next.js app and can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- Render
- AWS Amplify

## Development

\`\`\`bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
\`\`\`

## Future Enhancements

- [ ] Supabase integration for cloud storage
- [ ] User authentication
- [ ] Real-time price data integration
- [ ] Backtesting analysis accuracy
- [ ] Export analyses as PDF
- [ ] Social sharing
- [ ] Multi-language support
- [ ] Mobile app version

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Claude AI
\`\`\`
