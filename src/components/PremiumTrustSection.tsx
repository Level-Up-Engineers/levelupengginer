import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Award, Users, TrendingUp, Star, Zap } from "lucide-react";

const achievements = [
  {
    icon: <Trophy className="h-6 w-6" />,
    title: "Top-Rated Platform",
    description: "4.9/5 student rating across 500+ reviews",
    metric: "4.9★",
    color: "text-yellow-500"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Industry Network",
    description: "80+ engineers from FAANG & unicorns",
    metric: "80+",
    color: "text-blue-500"
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Placement Success",
    description: "95% placement rate in top companies",
    metric: "95%",
    color: "text-green-500"
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Expert Mentors",
    description: "Direct referrals from industry leaders",
    metric: "50+",
    color: "text-purple-500"
  }
];

const trustIndicators = [
  "Google", "Amazon", "Microsoft", "Meta", "Netflix", "Uber", "Swiggy", "Zomato"
];

const PremiumTrustSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 py-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="container relative">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
              <Star className="mr-2 h-4 w-4" />
              Trusted by Industry Leaders
            </Badge>
            <h2 className="mb-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Why Founders Choose Level Up Engineers
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of engineers who've transformed their careers with our proven methodology
            </p>
          </motion.div>
        </div>

        {/* Achievement Cards */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="group relative overflow-hidden border-0 bg-white/60 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-slate-800/60">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {achievement.icon}
                  </div>
                  <div className="mb-2 text-2xl font-bold text-foreground">
                    <span className={achievement.color}>{achievement.metric}</span>
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </CardContent>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="rounded-2xl border bg-white/40 p-8 shadow-lg backdrop-blur-sm dark:bg-slate-800/40"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="mb-6 text-center">
            <h3 className="mb-2 font-display text-xl font-semibold">Our Engineers Work At</h3>
            <p className="text-sm text-muted-foreground">Get mentored by professionals from the world's leading tech companies</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {trustIndicators.map((company, i) => (
              <motion.div
                key={company}
                className="flex items-center justify-center rounded-lg border bg-white/80 px-4 py-2 shadow-sm transition-all hover:shadow-md dark:bg-slate-700/80"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <span className="font-semibold text-foreground">{company}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumTrustSection;