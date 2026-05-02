# AI Idea Builder Setup Guide

## Overview

The AI Idea Builder is a new feature in the Startup Studio module that allows founders to:

- Describe their startup idea
- Get AI-powered analysis and insights
- View a dynamic visualization of idea connections
- Discover potential improvements and opportunities

## Features Implemented

### 1. **IdeaBuilder Page** (`/src/pages/StartupStudio/IdeaBuilder.tsx`)

- Main page where founders input their idea summary
- Handles API calls to Llama3 for analysis
- Displays results in tabs (Visualization & Detailed Results)
- Fully responsive design with animations

### 2. **API Integration** (`/src/lib/ideaBuilderAPI.ts`)

- `analyzeIdea()`: Sends founder summary to Llama3 for analysis
- `generateIdeaGraph()`: Creates graph structure from analysis
- `getMockAnalysis()`: Fallback demo data if API is unavailable

### 3. **IdeaVisualization Component** (`/src/components/ideaBuilder/IdeaVisualization.tsx`)

- Canvas-based dynamic graph visualization
- Shows idea connections with color-coded nodes:
  - **Blue**: Core idea
  - **Green**: Features/Key points
  - **Amber**: Market opportunities
  - **Red**: Technical challenges
- Interactive legend
- Loading state with animation

### 4. **IdeaResults Component** (`/src/components/ideaBuilder/IdeaResults.tsx`)

- Card-based display of analysis results
- Sections for:
  - Summary & Target Audience
  - Business Model
  - Key Points & Market Potentials
  - Suggested Improvements
  - Technical Challenges
  - Next Steps guidance

## Setup Instructions

### Environment Configuration

1. **Get Llama3 Running Locally** (Development)

   ```bash
   # Install Ollama from: https://ollama.ai

   # Pull the Llama3 model
   ollama pull llama2

   # Start Ollama server (runs on http://localhost:11434)
   ollama serve
   ```

2. **Configure Environment Variables**

   Create `.env` file in the root directory:

   ```env
   # Llama3 API Endpoint
   VITE_LLAMA_API_URL=http://localhost:11434/api/generate
   ```

   Or for production (if using Ollama Cloud or other provider):

   ```env
   VITE_LLAMA_API_URL=https://your-ollama-provider.com/api/generate
   ```

### Route Configuration

The route is already added to `App.tsx`:

```typescript
<Route path="/startup-studio/idea-builder" element={<IdeaBuilder />} />
```

### Navigation

- **From**: Startup Studio page → "Start Building" button → `/startup-studio/idea-builder`
- **Direct URL**: `/startup-studio/idea-builder`

## How It Works

### User Flow

1. **Input Phase**
   - User describes their startup idea (minimum 50 characters)
   - Real-time character count feedback
   - Submit for analysis

2. **Analysis Phase**
   - API sends idea to Llama3 with structured prompt
   - Llama3 returns JSON with:
     - Summary
     - Key Points
     - Potentials
     - Suggested Improvements
     - Market Opportunities
     - Technical Challenges
     - Business Model
     - Target Audience

3. **Visualization Phase**
   - Graph structure generated from analysis
   - Canvas renders interactive visualization
   - Shows connections between idea components

4. **Results Phase**
   - Detailed card-based results display
   - Organized by category (potentials, improvements, etc.)
   - Next steps guidance provided

### API Prompt Structure

The system uses a structured prompt to ensure consistent JSON output:

```
Analyze this startup idea:
"[Founder's Description]"

Respond with JSON:
{
  "summary": "...",
  "keyPoints": [...],
  "potentials": [...],
  "suggestedImprovements": [...],
  "marketOpportunities": [...],
  "technicalChallenges": [...],
  "businessModel": "...",
  "targetAudience": "..."
}
```

## Dependencies

All required packages are already installed:

- `framer-motion`: Animations and transitions
- `lucide-react`: Icons
- `shadcn/ui`: UI components
- `react-router-dom`: Routing

## Customization Options

### 1. **Change the Llama3 Model**

In `ideaBuilderAPI.ts`, modify the model name:

```typescript
model: "llama2"; // Change to 'llama3', 'mistral', etc.
```

### 2. **Adjust Analysis Prompt**

In `ideaBuilderAPI.ts`, `analyzeIdea()` function, modify the prompt template to ask for different insights.

### 3. **Customize Visualization**

In `IdeaVisualization.tsx`:

- Modify `getCategoryColor()` for different colors
- Adjust node radius calculations
- Change layout algorithm

### 4. **Add More Analysis Categories**

1.  Update `IdeaAnalysis` interface in `ideaBuilderAPI.ts`
2.  Add new fields to the prompt
3.  Add new sections to `IdeaResults` component

## Fallback Behavior

If Llama3 API is unavailable:

- System automatically uses mock data
- User sees realistic demo results
- Error is logged to console
- User can try again

This ensures the feature works even during development without API setup.

## Performance Optimization

- **Lazy Loading**: Components load only when needed
- **Canvas Rendering**: Efficient canvas-based visualization instead of DOM nodes
- **Memoization**: Results cached until user resets

## Troubleshooting

### Issue: "API Error" Toast

**Solution**: Ensure Ollama server is running

```bash
ollama serve
```

### Issue: Graph Not Rendering

**Solution**: Check browser console for errors. Ensure canvas ref is properly mounted.

### Issue: Slow Analysis

**Solution**:

- Llama3 runs locally, so it depends on your hardware
- Consider increasing `timeout` in API call
- Use a faster model variant

## File Structure

```
src/
├── pages/
│   └── StartupStudio/
│       └── IdeaBuilder.tsx          # Main page
├── components/
│   └── ideaBuilder/
│       ├── IdeaVisualization.tsx    # Graph visualization
│       └── IdeaResults.tsx          # Results display
├── lib/
│   └── ideaBuilderAPI.ts            # API integration
└── App.tsx                          # Route configuration
```

## Next Steps for Enhancement

1. **Backend Integration**
   - Move API calls to backend
   - Implement server-side Llama3 integration
   - Add rate limiting and caching

2. **Advanced Visualizations**
   - Interactive graph with drag-and-drop
   - 3D visualization option
   - Export analysis as PDF

3. **User Persistence**
   - Save analyses to database
   - Show analysis history
   - Compare multiple ideas

4. **Enhanced Analysis**
   - Competitor analysis
   - Pitch deck generation
   - Financial projections

5. **Collaboration**
   - Share analyses with team
   - Comments and feedback
   - Iteration tracking

## Support & Questions

For issues or questions about the implementation:

1. Check Llama3 API documentation
2. Review the inline code comments
3. Check browser console for errors
4. Ensure environment variables are set
