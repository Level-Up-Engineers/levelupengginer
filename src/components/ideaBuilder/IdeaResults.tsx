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
  ShieldCheck,
  Globe,
  Briefcase,
  FileText,
  Map,
  Megaphone,
  Rocket,
  Wrench,
  Palette
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

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Executive Summary & Branding */}
      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
        <Card className="border-slate-700/50 bg-slate-900/30 backdrop-blur-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="h-6 w-6 text-primary" />
            <h2 className="font-semibold text-lg text-slate-100">Executive Summary</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{analysis.summary}</p>
        </Card>

        <Card className="border-slate-700/50 bg-slate-900/30 backdrop-blur-sm p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent blur-3xl rounded-full" />
          <div className="flex items-center gap-3 mb-4">
            <Palette className="h-6 w-6 text-pink-400" />
            <h2 className="font-semibold text-lg text-slate-100">Brand Identity</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Suggested Name</p>
              <p className="text-xl font-bold text-slate-100">{analysis.branding.name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Tagline</p>
              <p className="text-sm text-slate-300 italic">"{analysis.branding.tagline}"</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Color Palette</p>
              <div className="flex gap-2">
                {analysis.branding.colors.map((color, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full border border-slate-700 shadow-sm" style={{ backgroundColor: color }} />
                    <span className="text-[10px] text-slate-400">{color}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Brand Voice</p>
              <p className="text-xs text-slate-300">{analysis.branding.voice}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Business One Pager */}
      <motion.div variants={itemVariants}>
        <Card className="border-slate-700/50 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-6 w-6 text-emerald-400" />
            <h2 className="font-semibold text-lg text-slate-100">Business One-Pager</h2>
          </div>
          <div className="prose prose-invert max-w-none text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
            {analysis.businessOnePager}
          </div>
        </Card>
      </motion.div>

      {/* Market Research & Industry Insights */}
      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
        <Card className="border-slate-700/50 bg-slate-900/30 backdrop-blur-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-6 w-6 text-indigo-400" />
            <h2 className="font-semibold text-lg text-slate-100">Market Research</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Target Audience</p>
              <p className="text-sm text-slate-300">{analysis.marketResearch.targetAudience}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Addressable Market (TAM)</p>
              <p className="text-lg font-semibold text-emerald-400">{analysis.marketResearch.tam}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Key Competitors</p>
              <ul className="space-y-1">
                {analysis.marketResearch.competitors.map((comp, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-slate-300">
                    <span className="text-indigo-400">•</span> {comp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <Card className="border-slate-700/50 bg-slate-900/30 backdrop-blur-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="h-6 w-6 text-amber-400" />
            <h2 className="font-semibold text-lg text-slate-100">Industry Insights</h2>
          </div>
          <ul className="space-y-3">
            {analysis.industryInsights.map((insight, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-slate-300 bg-slate-800/50 p-3 rounded-lg">
                <Lightbulb className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>

      {/* SWOT Analysis */}
      <motion.div variants={itemVariants}>
        <h2 className="font-semibold text-xl text-slate-100 mb-4 flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-400" />
          SWOT Analysis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-green-500/20 bg-green-500/5 p-5">
            <h3 className="font-semibold text-green-400 mb-3 uppercase tracking-wider text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Strengths
            </h3>
            <ul className="space-y-2">
              {analysis.swot.strengths.map((item, idx) => (
                <li key={idx} className="text-sm text-slate-300 flex gap-2"><span className="text-green-500">•</span> {item}</li>
              ))}
            </ul>
          </Card>
          <Card className="border-red-500/20 bg-red-500/5 p-5">
            <h3 className="font-semibold text-red-400 mb-3 uppercase tracking-wider text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Weaknesses
            </h3>
            <ul className="space-y-2">
              {analysis.swot.weaknesses.map((item, idx) => (
                <li key={idx} className="text-sm text-slate-300 flex gap-2"><span className="text-red-500">•</span> {item}</li>
              ))}
            </ul>
          </Card>
          <Card className="border-blue-500/20 bg-blue-500/5 p-5">
            <h3 className="font-semibold text-blue-400 mb-3 uppercase tracking-wider text-sm flex items-center gap-2">
              <Globe className="h-4 w-4" /> Opportunities
            </h3>
            <ul className="space-y-2">
              {analysis.swot.opportunities.map((item, idx) => (
                <li key={idx} className="text-sm text-slate-300 flex gap-2"><span className="text-blue-500">•</span> {item}</li>
              ))}
            </ul>
          </Card>
          <Card className="border-orange-500/20 bg-orange-500/5 p-5">
            <h3 className="font-semibold text-orange-400 mb-3 uppercase tracking-wider text-sm flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Threats
            </h3>
            <ul className="space-y-2">
              {analysis.swot.threats.map((item, idx) => (
                <li key={idx} className="text-sm text-slate-300 flex gap-2"><span className="text-orange-500">•</span> {item}</li>
              ))}
            </ul>
          </Card>
        </div>
      </motion.div>

      {/* PESTEL Analysis */}
      <motion.div variants={itemVariants}>
        <h2 className="font-semibold text-xl text-slate-100 mb-4 flex items-center gap-2">
          <Globe className="h-6 w-6 text-purple-400" />
          PESTEL Analysis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Political', data: analysis.pestel.political, color: 'text-red-400' },
            { title: 'Economic', data: analysis.pestel.economic, color: 'text-green-400' },
            { title: 'Social', data: analysis.pestel.social, color: 'text-yellow-400' },
            { title: 'Technological', data: analysis.pestel.technological, color: 'text-blue-400' },
            { title: 'Environmental', data: analysis.pestel.environmental, color: 'text-emerald-400' },
            { title: 'Legal', data: analysis.pestel.legal, color: 'text-purple-400' }
          ].map((factor, idx) => (
            <Card key={idx} className="border-slate-700/50 bg-slate-900/30 p-4">
              <h3 className={`font-semibold ${factor.color} mb-2 uppercase tracking-wider text-xs`}>{factor.title}</h3>
              <ul className="space-y-1">
                {factor.data.map((item, i) => (
                  <li key={i} className="text-xs text-slate-300 leading-relaxed">• {item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Product & Strategy */}
      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
        <Card className="border-slate-700/50 bg-slate-900/30 backdrop-blur-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="h-6 w-6 text-cyan-400" />
            <h2 className="font-semibold text-lg text-slate-100">Product Requirements (MVP)</h2>
          </div>
          <ul className="space-y-3">
            {analysis.prd.map((req, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-slate-300 bg-slate-800/30 p-2 rounded border border-slate-700/30">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-slate-700/50 bg-slate-900/30 backdrop-blur-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Map className="h-6 w-6 text-pink-400" />
            <h2 className="font-semibold text-lg text-slate-100">Path to MVP</h2>
          </div>
          <div className="space-y-4">
            {analysis.pathToMvp.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </div>
                  {idx < analysis.pathToMvp.length - 1 && <div className="w-px h-full bg-slate-700 my-1" />}
                </div>
                <p className="text-sm text-slate-300 pt-0.5 pb-4">{step}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Marketing & Go-To-Market */}
      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
        <Card className="border-slate-700/50 bg-slate-900/30 backdrop-blur-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Megaphone className="h-6 w-6 text-orange-400" />
            <h2 className="font-semibold text-lg text-slate-100">Marketing Plan</h2>
          </div>
          <ul className="space-y-3">
            {analysis.marketingPlan.map((plan, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-slate-300">
                <ArrowRight className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>{plan}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-slate-700/50 bg-slate-900/30 backdrop-blur-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="h-6 w-6 text-primary" />
            <h2 className="font-semibold text-lg text-slate-100">Go-To-Market Strategy</h2>
          </div>
          <ul className="space-y-3">
            {analysis.goToMarket.map((strategy, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-slate-300">
                <Zap className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{strategy}</span>
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>

    </motion.div>
  );
};

export default IdeaResults;
