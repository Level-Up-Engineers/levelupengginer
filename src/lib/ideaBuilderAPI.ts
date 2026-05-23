// Gemini API / AI API integration for idea analysis and summarization

export interface IdeaAnalysis {
  summary: string;
  branding: {
    name: string;
    tagline: string;
    colors: string[];
    voice: string;
  };
  industryInsights: string[];
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  pestel: {
    political: string[];
    economic: string[];
    social: string[];
    technological: string[];
    environmental: string[];
    legal: string[];
  };
  marketResearch: {
    targetAudience: string;
    tam: string;
    competitors: string[];
  };
  businessOnePager: string;
  prd: string[];
  pathToMvp: string[];
  marketingPlan: string[];
  goToMarket: string[];
  challengesAndSolutions: Array<{
    challenge: string;
    solution: string;
    tech: string;
    aiTools: string[];
  }>;
}

export interface GraphNode {
  id: string;
  label: string;
  category: 'core' | 'challenge' | 'solution' | 'tech' | 'aitool';
  connections: string[];
}

export interface IdeaGraph {
  nodes: GraphNode[];
  edges: Array<{ source: string; target: string; label: string }>;
}

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export const ideaBuilderAPI = {
  /**
   * Analyzes founder's idea summary using Gemini API
   */
  analyzeIdea: async (founderSummary: string): Promise<IdeaAnalysis> => {
    try {
      const prompt = `You are an expert startup advisor and elite silicon valley product manager. 
Analyze the following startup idea realistically and factually. Provide brutally honest, highly accurate, and actionable feedback covering all the required areas.

Founder's Idea:
"${founderSummary}"

Please provide your analysis in the following JSON format precisely:
{
  "summary": "A concise 2-3 sentence summary of the idea, evaluating its core premise.",
  "branding": {
    "name": "Suggested startup name",
    "tagline": "Catchy tagline",
    "colors": ["#Hex1", "#Hex2"],
    "voice": "Brand voice description"
  },
  "industryInsights": ["3 key factual insights about this industry"],
  "swot": {
    "strengths": ["2-3 strengths"],
    "weaknesses": ["2-3 weaknesses"],
    "opportunities": ["2-3 opportunities"],
    "threats": ["2-3 threats"]
  },
  "pestel": {
    "political": ["1-2 political factors"],
    "economic": ["1-2 economic factors"],
    "social": ["1-2 social factors"],
    "technological": ["1-2 tech factors"],
    "environmental": ["1-2 environmental factors"],
    "legal": ["1-2 legal factors"]
  },
  "marketResearch": {
    "targetAudience": "Precise primary target audience description",
    "tam": "Realistic Total Addressable Market (TAM) estimate",
    "competitors": ["3 realistic potential competitors"]
  },
  "businessOnePager": "A detailed 2-paragraph business one-pager",
  "prd": ["3-5 core Product Requirements for MVP"],
  "pathToMvp": ["3-5 step-by-step milestones to launch MVP"],
  "marketingPlan": ["2-3 actionable marketing strategies"],
  "goToMarket": ["2-3 concrete go-to-market strategies"],
  "challengesAndSolutions": [
    {
      "challenge": "A specific technical or business challenge",
      "solution": "How to solve it realistically",
      "tech": "Specific technology to use",
      "aiTools": ["AI tool 1", "AI tool 2"]
    }
  ]
}

Respond ONLY with valid JSON. Do not include markdown formatting or backticks. Make sure there are 3 challengesAndSolutions minimum.`;

      if (!GEMINI_API_KEY) {
        console.warn('VITE_GEMINI_API_KEY is not set. Falling back to mock data.');
        return ideaBuilderAPI.getMockAnalysis(founderSummary);
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2
          }
        }),
      });

      if (!response.ok) {
        const errData = await response.text();
        throw new Error(`API error: ${response.statusText} - ${errData}`);
      }

      const data = await response.json();
      
      try {
        const analysisText = data.candidates[0].content.parts[0].text;
        const analysis = JSON.parse(analysisText) as IdeaAnalysis;
        return analysis;
      } catch (parseError) {
        console.error('Failed to parse Gemini response:', parseError);
        return ideaBuilderAPI.getMockAnalysis(founderSummary);
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return ideaBuilderAPI.getMockAnalysis(founderSummary);
    }
  },

  /**
   * Generates a graph structure from the analyzed idea
   */
  generateIdeaGraph: async (analysis: IdeaAnalysis): Promise<IdeaGraph> => {
    const nodes: GraphNode[] = [];
    const edges: Array<{ source: string; target: string; label: string }> = [];

    // Core idea node
    nodes.push({
      id: 'core-idea',
      label: analysis.branding.name || 'Startup',
      category: 'core',
      connections: [],
    });

    // Add nodes from challenges and solutions
    analysis.challengesAndSolutions.forEach((cs, idx) => {
      const challengeId = `challenge-${idx}`;
      const solutionId = `solution-${idx}`;
      const techId = `tech-${idx}`;

      nodes.push({
        id: challengeId,
        label: cs.challenge.substring(0, 50) + (cs.challenge.length > 50 ? '...' : ''),
        category: 'challenge',
        connections: ['core-idea'],
      });
      edges.push({
        source: 'core-idea',
        target: challengeId,
        label: 'faces',
      });

      nodes.push({
        id: solutionId,
        label: cs.solution.substring(0, 50) + (cs.solution.length > 50 ? '...' : ''),
        category: 'solution',
        connections: [challengeId],
      });
      edges.push({
        source: challengeId,
        target: solutionId,
        label: 'solved by',
      });

      nodes.push({
        id: techId,
        label: cs.tech.substring(0, 50) + (cs.tech.length > 50 ? '...' : ''),
        category: 'tech',
        connections: [solutionId],
      });
      edges.push({
        source: solutionId,
        target: techId,
        label: 'implemented with',
      });

      cs.aiTools.forEach((tool, tIdx) => {
        const toolId = `aitool-${idx}-${tIdx}`;
        nodes.push({
          id: toolId,
          label: tool.substring(0, 50) + (tool.length > 50 ? '...' : ''),
          category: 'aitool',
          connections: [solutionId],
        });
        edges.push({
          source: solutionId,
          target: toolId,
          label: 'using',
        });
      });
    });

    return { nodes, edges };
  },

  /**
   * Mock analysis for demo/fallback purposes
   */
  getMockAnalysis: (founderSummary: string): IdeaAnalysis => {
    return {
      summary: "This is a fallback summary since the API key is not set. The idea involves solving a specific problem in a growing market.",
      branding: {
        name: "MockApp",
        tagline: "The best mock app ever",
        colors: ["#3b82f6", "#10b981"],
        voice: "Professional and innovative"
      },
      industryInsights: [
        "The market is growing rapidly.",
        "There is a shift towards automation.",
        "Customers expect seamless experiences."
      ],
      swot: {
        strengths: ["Innovative tech", "Strong team"],
        weaknesses: ["No brand recognition", "Limited initial capital"],
        opportunities: ["Expanding global market", "New AI capabilities"],
        threats: ["Established competitors", "Changing regulations"]
      },
      pestel: {
        political: ["Data privacy laws"],
        economic: ["Economic downturns affecting budgets"],
        social: ["Shift to remote work"],
        technological: ["Rapid AI advancements"],
        environmental: ["Green computing initiatives"],
        legal: ["IP protection"]
      },
      marketResearch: {
        targetAudience: "Small to medium enterprises looking to automate workflows",
        tam: "$5 Billion globally",
        competitors: ["Competitor A", "Competitor B"]
      },
      businessOnePager: "MockApp is a revolutionary platform designed to solve X by doing Y. It targets Z and expects to capture 1% of the market in year 1.",
      prd: [
        "User authentication and authorization",
        "Core workflow engine",
        "Dashboard and analytics"
      ],
      pathToMvp: [
        "Finalize designs",
        "Develop core backend",
        "Implement frontend MVP",
        "Beta testing"
      ],
      marketingPlan: [
        "Content marketing on LinkedIn",
        "Targeted ads for B2B"
      ],
      goToMarket: [
        "Direct sales to mid-market",
        "Partnerships with agencies"
      ],
      challengesAndSolutions: [
        {
          challenge: "Scaling the database",
          solution: "Use distributed database architecture",
          tech: "PostgreSQL with Citus",
          aiTools: ["Claude for query optimization"]
        },
        {
          challenge: "User retention",
          solution: "Implement personalized recommendations",
          tech: "Redis caching + ML pipeline",
          aiTools: ["Gemini 1.5 Pro for analysis"]
        }
      ]
    };
  },
};
