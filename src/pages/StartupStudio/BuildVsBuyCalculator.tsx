import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Settings, ShoppingCart, Zap, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const BuildVsBuyCalculator = () => {
  const [activeTab, setActiveTab] = useState<"build" | "buy">("build");

  // Build State
  const [dailyRate, setDailyRate] = useState<number>(200);
  const [teamSize, setTeamSize] = useState<number>(3);
  const [devDays, setDevDays] = useState<number>(60);
  const [maintenancePct, setMaintenancePct] = useState<number>(20);

  // Buy State
  const [annualSub, setAnnualSub] = useState<number>(5888);
  const [setupCost, setSetupCost] = useState<number>(2600);
  const [customizationCost, setCustomizationCost] = useState<number>(0);

  // Calculations
  const initialBuildCost = dailyRate * teamSize * devDays;
  const annualMaintCost = (initialBuildCost * maintenancePct) / 100;
  const totalBuildY1 = initialBuildCost + annualMaintCost;

  const totalBuyY1 = annualSub + setupCost + customizationCost;

  const recommendation = totalBuildY1 < totalBuyY1 ? "Build" : "Buy";
  const savings = Math.abs(totalBuildY1 - totalBuyY1);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <Navbar />

      <main className="container pt-32 pb-20 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full border border-blue-500/20 bg-blue-500/10 text-xs font-semibold text-blue-400 uppercase tracking-widest">
            Free Innovation Tools
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Build vs. Buy <span className="text-blue-400">Calculator</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Should you build custom software or buy an off-the-shelf solution? Compare the total cost of ownership (TCO) instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
          {/* Left Column: Inputs */}
          <div className="space-y-6">
            {/* Custom Tabs */}
            <div className="flex p-1 bg-slate-900 rounded-lg border border-slate-800">
              <button
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-all ${
                  activeTab === "build"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
                onClick={() => setActiveTab("build")}
              >
                <Settings className="w-4 h-4" /> Custom Build
              </button>
              <button
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-all ${
                  activeTab === "buy"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
                onClick={() => setActiveTab("buy")}
              >
                <ShoppingCart className="w-4 h-4" /> SaaS Solution
              </button>
            </div>

            {/* Input Form */}
            <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6 text-white font-semibold">
                {activeTab === "build" ? (
                  <><Settings className="w-5 h-5 text-blue-400" /> Build Parameters</>
                ) : (
                  <><ShoppingCart className="w-5 h-5 text-blue-400" /> SaaS Parameters</>
                )}
              </div>
              
              {activeTab === "build" && (
                <>
                  <p className="text-sm text-slate-400 mb-6">Estimated costs for internal development</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-slate-300 flex items-center gap-2">
                        Avg. Daily Rate ($)
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger><AlertCircle className="w-3 h-3 text-slate-500" /></TooltipTrigger>
                            <TooltipContent>Average blended daily cost per developer</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <Input
                        type="number"
                        className="bg-slate-950 border-slate-800 focus-visible:ring-blue-500 text-slate-200"
                        value={dailyRate}
                        onChange={(e) => setDailyRate(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Team Size</Label>
                      <Input
                        type="number"
                        className="bg-slate-950 border-slate-800 focus-visible:ring-blue-500 text-slate-200"
                        value={teamSize}
                        onChange={(e) => setTeamSize(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Dev Days (to MVP)</Label>
                      <Input
                        type="number"
                        className="bg-slate-950 border-slate-800 focus-visible:ring-blue-500 text-slate-200"
                        value={devDays}
                        onChange={(e) => setDevDays(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Annual Maintenance (%)</Label>
                      <Input
                        type="number"
                        className="bg-slate-950 border-slate-800 focus-visible:ring-blue-500 text-slate-200"
                        value={maintenancePct}
                        onChange={(e) => setMaintenancePct(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === "buy" && (
                <>
                  <p className="text-sm text-slate-400 mb-6">Estimated costs for buying an off-the-shelf product</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Annual Subscription ($)</Label>
                      <Input
                        type="number"
                        className="bg-slate-950 border-slate-800 focus-visible:ring-blue-500 text-slate-200"
                        value={annualSub}
                        onChange={(e) => setAnnualSub(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Setup & Training Cost ($)</Label>
                      <Input
                        type="number"
                        className="bg-slate-950 border-slate-800 focus-visible:ring-blue-500 text-slate-200"
                        value={setupCost}
                        onChange={(e) => setSetupCost(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-slate-300">Customization / Integration ($)</Label>
                      <Input
                        type="number"
                        className="bg-slate-950 border-slate-800 focus-visible:ring-blue-500 text-slate-200"
                        value={customizationCost}
                        onChange={(e) => setCustomizationCost(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </>
              )}
            </Card>

            {/* Expert Note */}
            <Card className="p-6 bg-blue-950/20 border-blue-900/30">
              <div className="flex gap-4">
                <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-300 mb-1">EXPERT NOTE</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    While SaaS often wins Year 1 cost, building custom software gives you 100% intellectual property, zero per-seat licensing limits, and complete control over the roadmap. Consider Year 3-5 projections when deciding.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Results */}
          <div className="sticky top-24">
            <Card className="p-6 bg-[#0f172a] border-slate-800 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 ${recommendation === "Buy" ? "bg-emerald-500" : "bg-blue-500"}`} />
              
              <h2 className="text-xl font-bold text-white mb-1">Analysis Result</h2>
              <p className="text-sm text-slate-400 mb-6">Year 1 Total Cost of Ownership</p>

              <div className="space-y-4 mb-8">
                {/* Build Cost Block */}
                <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800/50 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Build Cost (Y1)</p>
                    <p className="text-3xl font-bold text-white">${totalBuildY1.toLocaleString()}</p>
                  </div>
                  <p className="text-xs text-slate-500">MAINT: ${annualMaintCost.toLocaleString()}/YR</p>
                </div>

                {/* Buy Cost Block */}
                <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800/50 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Buy Cost (Y1)</p>
                    <p className="text-3xl font-bold text-emerald-400">${totalBuyY1.toLocaleString()}</p>
                  </div>
                  <p className="text-xs text-slate-500">SUB: ${annualSub.toLocaleString()}/YR</p>
                </div>
              </div>

              {/* Recommendation Box */}
              <div className="p-5 rounded-lg bg-slate-900 border border-slate-800">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-blue-400" /> OUR RECOMMENDATION
                </p>
                <p className={`text-2xl font-bold mb-2 ${recommendation === "Buy" ? "text-emerald-400" : "text-blue-400"}`}>
                  {recommendation}
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  You save <strong className="text-slate-200">${savings.toLocaleString()}</strong> in Year 1 by choosing to <strong>{recommendation.toLowerCase()}</strong> instead of {recommendation === "Build" ? "buying" : "building"}.
                </p>
              </div>

            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BuildVsBuyCalculator;
