import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  BookOpen,
  Target,
  Award,
  Zap,
  Shield,
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: <Users className="h-8 w-8" />,
    title: "1:1 Mentorship",
    description: "Direct guidance from engineers at FAANG & unicorn companies",
    benefits: ["Personal career roadmap", "Weekly 1:1 sessions", "Industry insights"],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: "Comprehensive Curriculum",
    description: "Master DSA, System Design, Backend, DevOps & Full Stack",
    benefits: ["Structured learning path", "Real-world projects", "Latest technologies"],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Placement Assistance",
    description: "Resume reviews, interview prep & direct referrals",
    benefits: ["Resume optimization", "Mock interviews", "Company referrals"],
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Industry Recognition",
    description: "95% placement rate in top tech companies",
    benefits: ["Proven track record", "Industry connections", "Career advancement"],
    gradient: "from-orange-500 to-red-500"
  }
];

const stats = [
  { label: "Students Placed", value: "500+", icon: <TrendingUp className="h-5 w-5" /> },
  { label: "Avg. Package", value: "₹18 LPA", icon: <Star className="h-5 w-5" /> },
  { label: "Success Rate", value: "95%", icon: <CheckCircle className="h-5 w-5" /> },
  { label: "Companies", value: "50+", icon: <Shield className="h-5 w-5" /> }
];

const PremiumFeaturesShowcase = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-accent/20 to-background py-24">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-700/25" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="container relative">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Zap className="mr-2 h-4 w-4" />
              Premium Learning Experience
            </Badge>
            <h2 className="mb-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive program designed by industry experts to accelerate your tech career
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="group relative overflow-hidden border-0 bg-white/60 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 dark:bg-slate-800/60">
                <CardHeader className="pb-4">
                  <div className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`} />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="rounded-2xl bg-gradient-to-r from-primary/10 via-emerald-500/10 to-purple-500/10 p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <div className="mb-2 flex justify-center text-primary">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumFeaturesShowcase;