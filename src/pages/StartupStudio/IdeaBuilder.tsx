import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import IdeaVisualization from '@/components/ideaBuilder/IdeaVisualization';
import IdeaResults from '@/components/ideaBuilder/IdeaResults';
import { ideaBuilderAPI, IdeaAnalysis, IdeaGraph } from '@/lib/ideaBuilderAPI';
import { startupStudioActivityAPI } from '@/lib/startupStudioActivity';
import { useAuth } from '@/contexts/AuthContext';
import {
  Lightbulb,
  ArrowRight,
  Zap,
  Loader,
  RefreshCw,
} from 'lucide-react';

const IdeaBuilder = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [founderSummary, setFounderSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<IdeaAnalysis | null>(null);
  const [graph, setGraph] = useState<IdeaGraph | null>(null);
  const [activeTab, setActiveTab] = useState<'input' | 'visualization' | 'results'>('input');

  const handleAnalyzeIdea = async () => {
    if (!founderSummary.trim()) {
      toast({
        title: 'Empty Summary',
        description: 'Please describe your startup idea before analyzing.',
        variant: 'destructive',
      });
      return;
    }

    if (founderSummary.trim().length < 50) {
      toast({
        title: 'Summary Too Short',
        description: 'Please provide a more detailed description of your idea (at least 50 characters).',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Analyze the idea
      const ideaAnalysis = await ideaBuilderAPI.analyzeIdea(founderSummary);
      setAnalysis(ideaAnalysis);

      // Generate graph
      const ideaGraph = await ideaBuilderAPI.generateIdeaGraph(ideaAnalysis);
      setGraph(ideaGraph);

      // Save this startup studio activity for admin review
      startupStudioActivityAPI.addActivity({
        userId: user?.id,
        name: user?.name || 'Guest User',
        email: user?.email || 'guest@levelup.com',
        ideaSummary: founderSummary,
        status: 'new',
        recommendedAction:
          'Reach out with a discovery call that highlights how we can build a fast MVP and validate their idea.',
        source: 'AI Analyzer',
      });

      setActiveTab('visualization');

      toast({
        title: 'Analysis Complete!',
        description: 'Your startup idea has been analyzed. Check out the visualization and insights.',
      });
    } catch (error) {
      console.error('Error analyzing idea:', error);
      toast({
        title: 'Analysis Failed',
        description: 'There was an error analyzing your idea. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFounderSummary('');
    setAnalysis(null);
    setGraph(null);
    setActiveTab('input');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <Navbar />

      <main className="container pt-28 pb-12 md:pt-32 md:pb-20">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
            <Lightbulb className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium uppercase tracking-wide text-primary">AI Idea Analyzer</span>
          </div>
          <h1 className="mb-4 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Turn Your Startup Idea Into{' '}
            <span className="bg-gradient-to-r from-primary via-primary to-purple-500 bg-clip-text text-transparent">
              Visual Strategy
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">
            Describe your startup idea, and our AI will analyze it, generate insights, visualize connections,
            and show you exactly what to build next.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          {/* Left: Input & Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-slate-700/50 bg-slate-900/30 backdrop-blur-sm sticky top-20">
              <div className="p-6">
                <h2 className="mb-4 flex items-center gap-2 font-semibold text-slate-100">
                  <Zap className="h-5 w-5 text-primary" />
                  Your Startup Idea
                </h2>

                <div className="mb-6 space-y-4">
                  <div>
                    <label htmlFor="idea" className="mb-2 block text-sm font-medium text-slate-300">
                      Describe Your Idea
                    </label>
                    <Textarea
                      id="idea"
                      placeholder="Tell us about your startup idea. What problem does it solve? Who are your customers? What makes it unique?

Example: 'I want to build an AI-powered platform that helps small businesses automate their customer service using natural language...'

Be specific and detailed for better analysis."
                      value={founderSummary}
                      onChange={(e) => setFounderSummary(e.target.value)}
                      className="resize-none border-slate-600/50 bg-slate-800/50 min-h-48"
                      disabled={isLoading}
                    />
                    <p className="mt-2 text-xs text-slate-400">
                      {founderSummary.length} characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={handleAnalyzeIdea}
                      disabled={isLoading || !founderSummary.trim()}
                      className="w-full gap-2 bg-primary hover:bg-primary/90"
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Lightbulb className="h-4 w-4" />
                          Analyze My Idea
                        </>
                      )}
                    </Button>

                    {(analysis || graph) && (
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="w-full gap-2 border-slate-600/50"
                        disabled={isLoading}
                      >
                        <RefreshCw className="h-4 w-4" />
                        Start Over
                      </Button>
                    )}
                  </div>
                </div>

                {/* Info Box */}
                <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-4">
                  <h3 className="mb-2 text-sm font-semibold text-slate-200">What We Analyze:</h3>
                  <ul className="space-y-1 text-xs text-slate-400">
                    <li>✓ Your core value proposition</li>
                    <li>✓ Market opportunities</li>
                    <li>✓ Technical challenges</li>
                    <li>✓ Target audience</li>
                    <li>✓ Business model viability</li>
                    <li>✓ Suggested improvements</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right: Results & Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {!analysis && !graph && (
              <Card className="border-slate-700/50 bg-slate-900/30 backdrop-blur-sm p-12 text-center">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Lightbulb className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-slate-100">Ready to Analyze Your Idea?</h3>
                    <p className="text-sm text-slate-400">
                      Share your startup concept on the left, and we'll generate a comprehensive analysis with
                      visualizations and actionable insights.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {isLoading && (
              <Card className="border-slate-700/50 bg-slate-900/30 backdrop-blur-sm p-12">
                <div className="flex flex-col items-center justify-center gap-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Zap className="h-8 w-8 text-primary" />
                  </motion.div>
                  <div className="text-center">
                    <h3 className="mb-2 font-semibold text-slate-100">Analyzing Your Idea...</h3>
                    <p className="text-sm text-slate-400">
                      Our AI is examining your startup concept, generating insights, and creating visualizations.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {analysis && graph && !isLoading && (
              <>
                {/* Tabs */}
                <div className="flex gap-2 border-b border-slate-700/50">
                  {[
                    { id: 'visualization', label: 'Visualization', icon: Zap },
                    { id: 'results', label: 'Detailed Results', icon: ArrowRight },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as 'visualization' | 'results')}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'visualization' && (
                  <div className="h-96 rounded-lg overflow-hidden">
                    <IdeaVisualization graph={graph} isLoading={isLoading} />
                  </div>
                )}

                {activeTab === 'results' && (
                  <div>
                    <IdeaResults analysis={analysis} />
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>

        {/* CTA Section */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 text-center"
          >
            <h2 className="mb-3 text-2xl font-bold">Ready to Build Your MVP?</h2>
            <p className="mb-6 text-slate-300">
              Now that you have a clear strategy, let our expert team help you execute and bring your idea to life.
            </p>
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
              Book a Free Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default IdeaBuilder;
