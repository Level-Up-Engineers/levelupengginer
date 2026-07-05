import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Code,
  Users,
  Target,
  Award,
  Rocket,
  BookOpen,
  Briefcase
} from "lucide-react";

const journeySteps = [
  {
    phase: "Week 1-2",
    title: "Foundation Building",
    description: "Master programming fundamentals and data structures",
    icon: <Code className="h-6 w-6" />,
    skills: ["DSA Basics", "Programming Logic", "Problem Solving"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    phase: "Week 3-6",
    title: "Core Development",
    description: "Build full-stack applications and system design skills",
    icon: <BookOpen className="h-6 w-6" />,
    skills: ["Backend Development", "System Design", "Database Design"],
    color: "from-purple-500 to-pink-500"
  },
  {
    phase: "Week 7-10",
    title: "Advanced Topics",
    description: "Deep dive into DevOps, cloud, and advanced concepts",
    icon: <Rocket className="h-6 w-6" />,
    skills: ["DevOps & Cloud", "Microservices", "Performance Optimization"],
    color: "from-emerald-500 to-teal-500"
  },
  {
    phase: "Week 11-12",
    title: "Interview Preparation",
    description: "Mock interviews, resume optimization, and placement assistance",
    icon: <Target className="h-6 w-6" />,
    skills: ["Interview Prep", "Resume Building", "Networking"],
    color: "from-orange-500 to-red-500"
  },
  {
    phase: "Ongoing",
    title: "Career Launch",
    description: "Job applications, referrals, and continuous learning support",
    icon: <Briefcase className="h-6 w-6" />,
    skills: ["Job Search", "Career Growth", "Alumni Network"],
    color: "from-indigo-500 to-purple-500"
  }
];

const milestones = [
  { week: 4, achievement: "First Project Completed" },
  { week: 8, achievement: "System Design Interview Ready" },
  { week: 10, achievement: "Resume & Portfolio Ready" },
  { week: 12, achievement: "Interview Ready" }
];

const PremiumLearningJourney = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-accent/20 py-24">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />

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
              <Calendar className="mr-2 h-4 w-4" />
              Your 12-Week Transformation
            </Badge>
            <h2 className="mb-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              From Beginner to
              <span className="text-primary"> Industry Ready</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              A structured 12-week program designed to transform you into a confident, job-ready engineer
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 md:left-1/2 md:-ml-0.5" />

          <div className="space-y-12">
            {journeySteps.map((step, i) => (
              <motion.div
                key={step.phase}
                className={`relative flex items-center gap-8 md:gap-12 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {/* Timeline dot */}
                <div className={`absolute left-6 w-4 h-4 rounded-full bg-primary border-4 border-background md:left-1/2 md:-ml-2 z-10`} />

                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <Card className="group overflow-hidden border-0 bg-white/60 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-slate-800/60">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-white shadow-lg`}>
                          {step.icon}
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-1 text-xs font-medium">
                            {step.phase}
                          </Badge>
                          <h3 className="font-bold text-lg">{step.title}</h3>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{step.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {step.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-12" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Milestones */}
        <motion.div
          className="mt-16 rounded-2xl bg-gradient-to-r from-primary/10 via-emerald-500/10 to-purple-500/10 p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="text-center mb-6">
            <h3 className="font-display text-xl font-semibold mb-2">Key Milestones</h3>
            <p className="text-muted-foreground">Track your progress with these important checkpoints</p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.achievement}
                className="text-center p-4 rounded-lg bg-white/50 dark:bg-slate-800/50"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <div className="text-2xl font-bold text-primary mb-1">Week {milestone.week}</div>
                <div className="text-sm text-muted-foreground">{milestone.achievement}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumLearningJourney;