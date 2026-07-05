import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, ArrowRight, CheckCircle, Sparkles, TrendingUp, Users } from "lucide-react";

const benefits = [
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Exclusive Insights",
    description: "Get weekly industry trends and job market analysis"
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Career Opportunities",
    description: "Be first to know about referrals and openings"
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Free Resources",
    description: "Access to resume templates, interview guides & more"
  }
];

const PremiumNewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 text-white">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-700/25" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="container relative">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary/30">
                <Mail className="mr-2 h-4 w-4" />
                Stay Ahead of the Curve
              </Badge>

              <h2 className="mb-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Get Exclusive Access to
                <span className="text-primary"> Industry Insights</span>
              </h2>

              <p className="mb-8 text-lg text-slate-300">
                Join 10,000+ engineers who get weekly insights on job trends, interview tips,
                and exclusive opportunities from our network of FAANG engineers.
              </p>

              {/* Benefits */}
              <div className="mb-8 space-y-4">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{benefit.title}</h3>
                      <p className="text-sm text-slate-300">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Signup Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white">Join Our Community</CardTitle>
                  <p className="text-slate-300">Get started with exclusive insights delivered to your inbox</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isSubscribed ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-primary"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full gap-2 bg-primary hover:bg-primary/90"
                        size="lg"
                      >
                        Get Free Access
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      className="text-center py-8"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle className="mx-auto h-12 w-12 text-emerald-500 mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">Welcome to the Community!</h3>
                      <p className="text-slate-300">Check your email for your welcome package and first insights.</p>
                    </motion.div>
                  )}

                  <div className="text-center">
                    <p className="text-xs text-slate-400">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumNewsletterSignup;