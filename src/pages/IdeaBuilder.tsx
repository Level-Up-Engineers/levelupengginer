import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Target, Users, DollarSign, TrendingUp } from 'lucide-react';

const IdeaBuilder = () => {
  const [idea, setIdea] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = () => {
    // Mock analysis - in real app this would call an AI service
    const mockAnalysis = {
      score: 85,
      strengths: ['Strong market potential', 'Clear value proposition', 'Scalable business model'],
      weaknesses: ['High competition', 'Need for significant funding'],
      recommendations: [
        'Focus on niche market differentiation',
        'Build MVP quickly to validate assumptions',
        'Network with potential investors early'
      ],
      marketSize: '$2.5B',
      targetAudience: 'Tech-savvy millennials aged 25-35',
      monetization: 'SaaS subscription model'
    };
    setAnalysis(mockAnalysis);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Sparkles className="h-10 w-10 text-purple-400" />
              AI Idea Analyzer
            </h1>
            <p className="text-xl text-slate-300">
              Transform your startup idea into actionable insights with AI-powered analysis
            </p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Describe Your Idea</CardTitle>
              <CardDescription className="text-slate-300">
                Provide a detailed description of your startup idea, target market, and unique value proposition
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Tell us about your startup idea..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="min-h-32 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              />
              <Button
                onClick={handleAnalyze}
                disabled={!idea.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Analyze My Idea
              </Button>
            </CardContent>
          </Card>

          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Score Card */}
              <Card className="bg-gradient-to-r from-green-800/50 to-blue-800/50 border-green-700">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-white mb-2">{analysis.score}/100</div>
                    <Badge variant="secondary" className="text-lg px-4 py-1">
                      Idea Viability Score
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Strengths */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-green-400 flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.strengths.map((strength, index) => (
                        <li key={index} className="text-slate-300 flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Weaknesses */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-orange-400 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.weaknesses.map((weakness, index) => (
                        <li key={index} className="text-slate-300 flex items-start gap-2">
                          <span className="text-orange-400 mt-1">•</span>
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Market Analysis */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-blue-400 flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Market Size
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-white">{analysis.marketSize}</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-purple-400 flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Target Audience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">{analysis.targetAudience}</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-green-400 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Monetization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">{analysis.monetization}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendations */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-purple-400">AI Recommendations</CardTitle>
                  <CardDescription className="text-slate-300">
                    Actionable steps to improve your startup idea
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {analysis.recommendations.map((rec, index) => (
                      <li key={index} className="text-slate-300 flex items-start gap-3">
                        <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        {rec}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default IdeaBuilder;