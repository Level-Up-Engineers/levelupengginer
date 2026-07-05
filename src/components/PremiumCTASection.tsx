import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Clock,
  Users,
  CheckCircle,
  Star,
  Zap
} from "lucide-react";

const urgencyPoints = [
  {
    icon: <Clock className="h-5 w-5" />,
    text: "Limited spots available for next cohort"
  },
  {
    icon: <Users className="h-5 w-5" />,
    text: "Join 500+ successful engineers"
  },
  {
    icon: <Star className="h-5 w-5" />,
    text: "4.9/5 rating from our community"
  }
];

const guarantees = [
  "30-day money-back guarantee",
  "Direct mentorship from FAANG engineers",
  "Lifetime access to course materials",
  "Career support for 1 year"
];

const PremiumCTASection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 text-white">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-700/25" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="container relative">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Sparkles className="mr-2 h-4 w-4" />
              Limited Time Offer
            </Badge>

            <h2 className="mb-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to Transform Your
              <span className="text-primary"> Tech Career?</span>
            </h2>

            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Join our next cohort and get mentored by engineers from Google, Amazon, Microsoft & more.
              Start your journey to landing your dream job today.
            </p>
          </motion.div>

          {/* Urgency Points */}
          <motion.div
            className="grid gap-4 md:grid-cols-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {urgencyPoints.map((point, i) => (
              <motion.div
                key={point.text}
                className="flex items-center gap-3 p-4 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <div className="text-primary">{point.icon}</div>
                <span className="text-sm font-medium">{point.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Main CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Start Your Transformation Today</h3>
                    <p className="text-slate-300 mb-6">
                      Get access to our complete program with 1:1 mentorship, comprehensive curriculum,
                      and guaranteed career support. Join the next cohort starting soon.
                    </p>

                    {/* Guarantees */}
                    <div className="space-y-3 mb-8">
                      {guarantees.map((guarantee, i) => (
                        <div key={guarantee} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                          <span className="text-sm text-slate-300">{guarantee}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pricing */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl font-bold text-white">₹49,999</span>
                        <span className="text-lg text-slate-400 line-through">₹79,999</span>
                        <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                          Save 37%
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400">Limited time offer • EMI options available</p>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="lg:text-right">
                    <div className="space-y-4">
                      <Button asChild size="lg" className="w-full lg:w-auto gap-2 bg-primary hover:bg-primary/90 text-base px-8 py-4">
                        <Link to="/courses">
                          <Zap className="h-5 w-5" />
                          Enroll Now - Limited Spots
                        </Link>
                      </Button>

                      <Button asChild variant="outline" size="lg" className="w-full lg:w-auto gap-2 border-slate-600 bg-slate-700/50 text-white hover:bg-slate-700 px-8 py-4">
                        <Link to="/contact">
                          <Users className="h-5 w-5" />
                          Book a Free Consultation
                        </Link>
                      </Button>
                    </div>

                    <p className="text-xs text-slate-400 mt-4">
                      No payment required to book consultation • 30-day money-back guarantee
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-slate-400 mb-4">Trusted by engineers from</p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium">
              <span className="text-slate-300">Google</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Amazon</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Microsoft</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Meta</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Netflix</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">And 50+ more</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PremiumCTASection;