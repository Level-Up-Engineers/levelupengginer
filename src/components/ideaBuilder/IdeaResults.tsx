import React from 'react';
import { IdeaAnalysis } from '@/lib/ideaBuilderAPI';
import { motion } from 'framer-motion';
import {
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  Target,
  Zap,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

interface IdeaResultsProps {
  analysis: IdeaAnalysis;
}

export const IdeaResults: React.FC<IdeaResultsProps> = ({ analysis }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  const sections = [
    {
      title: 'Summary',
      icon: Lightbulb,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      content: analysis.summary,
      type: 'text' as const,
    },
    {
      title: 'Target Audience',
      icon: Target,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      content: analysis.targetAudience,
      type: 'text' as const,
    },
    {
      title: 'Business Model',
      icon: Zap,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      content: analysis.businessModel,
      type: 'text' as const,
    },
    {
      title: 'Key Points',
      icon: CheckCircle2,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      content: analysis.keyPoints,
      type: 'list' as const,
    },
    {
      title: 'Market Potentials',
      icon: TrendingUp,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      content: analysis.potentials,
      type: 'list' as const,
    },
    {
      title: 'Market Opportunities',
      icon: ArrowRight,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      content: analysis.marketOpportunities,
      type: 'list' as const,
    },
    {
      title: 'Suggested Improvements',
      icon: AlertTriangle,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      content: analysis.suggestedImprovements,
      type: 'list' as const,
    },
    {
      title: 'Technical Challenges',
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      content: analysis.technicalChallenges,
      type: 'list' as const,
    },
  ];

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, idx) => {
          const Icon = section.icon;

          return (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="h-full border-slate-700/50 bg-slate-900/30 backdrop-blur-sm hover:border-slate-600/70 hover:bg-slate-900/50 transition-all">
                <div className={`p-4 ${section.bgColor}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <Icon className={`h-5 w-5 ${section.color} flex-shrink-0 mt-0.5`} />
                    <h3 className="font-semibold text-slate-100 text-sm">{section.title}</h3>
                  </div>

                  {section.type === 'text' ? (
                    <p className="text-xs text-slate-300 leading-relaxed">{section.content}</p>
                  ) : (
                    <ul className="space-y-2">
                      {Array.isArray(section.content) &&
                        section.content.map((item, itemIdx) => (
                          <li key={itemIdx} className="text-xs text-slate-300 flex gap-2">
                            <span className={`${section.color} flex-shrink-0 mt-0.5`}>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Full-width sections for detailed content */}
      <div className="space-y-4">
        <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2">
          <Card className="border-slate-700/50 bg-slate-900/30 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <h3 className="font-semibold text-slate-100">Why This Idea Has Potential</h3>
            </div>
            <ul className="space-y-3">
              {analysis.potentials.map((potential, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-slate-300">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <span>{potential}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="border-slate-700/50 bg-slate-900/30 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              <h3 className="font-semibold text-slate-100">What Needs Work</h3>
            </div>
            <ul className="space-y-3">
              {analysis.suggestedImprovements.map((improvement, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-slate-300">
                  <span className="text-orange-400 flex-shrink-0">→</span>
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </div>

      {/* Next Steps */}
      <motion.div variants={itemVariants}>
        <Card className="border-slate-700/50 bg-gradient-to-r from-slate-900/30 to-slate-900/20 backdrop-blur-sm p-6">
          <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Ready to Build?
          </h3>
          <p className="text-sm text-slate-300 mb-4">
            Based on this analysis, you now have a clear roadmap for your startup. Consider:
          </p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex gap-3">
              <span className="text-primary flex-shrink-0">1.</span>
              <span>Create an MVP that validates your core value proposition</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary flex-shrink-0">2.</span>
              <span>Build a go-to-market strategy targeting your identified audience</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary flex-shrink-0">3.</span>
              <span>Address technical challenges early with proper architecture</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary flex-shrink-0">4.</span>
              <span>Talk to potential customers to validate your assumptions</span>
            </li>
          </ul>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default IdeaResults;
