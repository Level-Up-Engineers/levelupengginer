// Llama3 API integration for idea analysis and summarization

export interface IdeaAnalysis {
  summary: string;
  keyPoints: string[];
  potentials: string[];
  suggestedImprovements: string[];
  marketOpportunities: string[];
  technicalChallenges: string[];
  businessModel: string;
  targetAudience: string;
}

export interface GraphNode {
  id: string;
  label: string;
  category: 'core' | 'feature' | 'market' | 'challenge' | 'opportunity';
  connections: string[];
}

export interface IdeaGraph {
  nodes: GraphNode[];
  edges: Array<{ source: string; target: string; label: string }>;
}

const LLAMA_API_ENDPOINT = import.meta.env.VITE_LLAMA_API_URL || 'http://localhost:11434/api/generate';

export const ideaBuilderAPI = {
  /**
   * Analyzes founder's idea summary using Llama3
   */
  analyzeIdea: async (founderSummary: string): Promise<IdeaAnalysis> => {
    try {
      const prompt = `You are an expert startup advisor and AI builder. Analyze this startup idea and provide structured feedback.

Founder's Idea:
"${founderSummary}"

Please provide your analysis in the following JSON format:
{
  "summary": "A concise 2-3 sentence summary of the idea",
  "keyPoints": ["3-5 key insights about the idea"],
  "potentials": ["3-5 major potential opportunities"],
  "suggestedImprovements": ["3-5 specific improvements to make the idea stronger"],
  "marketOpportunities": ["2-3 market opportunities identified"],
  "technicalChallenges": ["2-3 main technical challenges to solve"],
  "businessModel": "Suggested business model for this idea",
  "targetAudience": "Primary target audience description"
}

Respond ONLY with valid JSON, no additional text.`;

      const response = await fetch(LLAMA_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama2',
          prompt: prompt,
          stream: false,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Parse the response from Llama3
      try {
        const analysisText = data.response || data.text || '';
        // Extract JSON from the response (in case there's extra text)
        const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No valid JSON in response');
        }
        
        const analysis = JSON.parse(jsonMatch[0]) as IdeaAnalysis;
        return analysis;
      } catch (parseError) {
        console.error('Failed to parse Llama3 response:', parseError);
        // Return mock data for demo purposes
        return ideaBuilderAPI.getMockAnalysis(founderSummary);
      }
    } catch (error) {
      console.error('Error calling Llama3 API:', error);
      // Return mock data as fallback
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
      label: analysis.businessModel || 'Core Idea',
      category: 'core',
      connections: [],
    });

    // Add feature nodes from key points
    analysis.keyPoints.forEach((point, idx) => {
      const nodeId = `feature-${idx}`;
      nodes.push({
        id: nodeId,
        label: point.substring(0, 50) + (point.length > 50 ? '...' : ''),
        category: 'feature',
        connections: ['core-idea'],
      });
      edges.push({
        source: 'core-idea',
        target: nodeId,
        label: 'includes',
      });
    });

    // Add market nodes from potentials
    analysis.potentials.forEach((potential, idx) => {
      const nodeId = `market-${idx}`;
      nodes.push({
        id: nodeId,
        label: potential.substring(0, 50) + (potential.length > 50 ? '...' : ''),
        category: 'opportunity',
        connections: ['core-idea'],
      });
      edges.push({
        source: 'core-idea',
        target: nodeId,
        label: 'opportunity',
      });
    });

    // Add challenge nodes
    analysis.technicalChallenges.forEach((challenge, idx) => {
      const nodeId = `challenge-${idx}`;
      nodes.push({
        id: nodeId,
        label: challenge.substring(0, 50) + (challenge.length > 50 ? '...' : ''),
        category: 'challenge',
        connections: ['core-idea'],
      });
      edges.push({
        source: 'core-idea',
        target: nodeId,
        label: 'challenge',
      });
    });

    return { nodes, edges };
  },

  /**
   * Mock analysis for demo/fallback purposes
   */
  getMockAnalysis: (founderSummary: string): IdeaAnalysis => {
    return {
      summary: `This is an innovative startup idea that combines modern technology with market demand. The concept shows strong potential for disruption in its target market segment.`,
      keyPoints: [
        'Clear market problem identification',
        'Unique value proposition',
        'Scalable technology foundation',
        'Strong founder background',
      ],
      potentials: [
        'Large addressable market opportunity',
        'First-mover advantage potential',
        'Network effects as company scales',
        'Multiple revenue stream possibilities',
      ],
      suggestedImprovements: [
        'Develop detailed go-to-market strategy',
        'Build MVP to validate core assumptions',
        'Establish advisory board with industry experts',
        'Create detailed financial projections',
      ],
      marketOpportunities: [
        'Global market expansion potential',
        'B2B2C partnership opportunities',
      ],
      technicalChallenges: [
        'Scalability architecture for high volume',
        'Data privacy and security compliance',
      ],
      businessModel: 'Freemium SaaS with enterprise licensing',
      targetAudience: 'Small to medium-sized businesses looking for efficiency improvements',
    };
  },
};
