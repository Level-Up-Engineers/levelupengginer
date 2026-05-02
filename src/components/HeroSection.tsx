import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Building2, TrendingUp, Star } from "lucide-react";
import { stats } from "@/lib/courseData";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ReactNode> = {
  "Students Placed": <Users className="h-5 w-5 text-primary" />,
  "Hiring Partners": <Building2 className="h-5 w-5 text-primary" />,
  "Placement Rate": <TrendingUp className="h-5 w-5 text-primary" />,
  "Student Rating": <Star className="h-5 w-5 text-primary" />,
};

const headingContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.12,
    },
  },
};

const headingWord = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pb-10 pt-32 lg:pb-14 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <svg
          className="hero-network"
          viewBox="0 0 1200 700"
          preserveAspectRatio="none"
        >
          <line className="hero-network-line hero-network-line-1" x1="110" y1="470" x2="280" y2="330" />
          <line className="hero-network-line hero-network-line-2" x1="280" y1="330" x2="470" y2="290" />
          <line className="hero-network-line hero-network-line-3" x1="470" y1="290" x2="620" y2="210" />
          <line className="hero-network-line hero-network-line-4" x1="620" y1="210" x2="790" y2="290" />
          <line className="hero-network-line hero-network-line-5" x1="790" y1="290" x2="980" y2="250" />
          <line className="hero-network-line hero-network-line-6" x1="980" y1="250" x2="1090" y2="360" />
          <line className="hero-network-line hero-network-line-7" x1="280" y1="330" x2="360" y2="470" />
          <line className="hero-network-line hero-network-line-8" x1="470" y1="290" x2="520" y2="430" />
          <line className="hero-network-line hero-network-line-9" x1="790" y1="290" x2="720" y2="430" />
          <line className="hero-network-line hero-network-line-10" x1="980" y1="250" x2="930" y2="410" />
          <circle className="hero-network-node hero-network-node-1" cx="110" cy="470" r="6" />
          <circle className="hero-network-node hero-network-node-2" cx="280" cy="330" r="7" />
          <circle className="hero-network-node hero-network-node-3" cx="470" cy="290" r="6" />
          <circle className="hero-network-node hero-network-node-4" cx="620" cy="210" r="8" />
          <circle className="hero-network-node hero-network-node-5" cx="790" cy="290" r="6" />
          <circle className="hero-network-node hero-network-node-6" cx="980" cy="250" r="7" />
          <circle className="hero-network-node hero-network-node-7" cx="1090" cy="360" r="6" />
          <circle className="hero-network-node hero-network-node-8" cx="360" cy="470" r="5" />
          <circle className="hero-network-node hero-network-node-9" cx="520" cy="430" r="5" />
          <circle className="hero-network-node hero-network-node-10" cx="720" cy="430" r="5" />
          <circle className="hero-network-node hero-network-node-11" cx="930" cy="410" r="5" />
        </svg>
      </div>
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              Trusted by 80+ Engineers
            </span>
            <motion.h1
              className="mb-8 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              variants={headingContainer}
              initial="hidden"
              animate="visible"
            >
              <span className="inline-block overflow-hidden align-top">
                <motion.span variants={headingWord} className="inline-block">
                  Crack
                </motion.span>
              </span>{" "}
              <span className="inline-block overflow-hidden align-top">
                <motion.span variants={headingWord} className="inline-block">
                  Your
                </motion.span>
              </span>{" "}
              <span className="inline-block overflow-hidden align-top">
                <motion.span
                  variants={headingWord}
                  className="relative inline-block -translate-y-4 rounded-2xl px-5 py-1.5"
                >
                  <span className="absolute inset-x-1 -top-3 bottom-1 rounded-2xl bg-gradient-to-b from-primary/25 via-primary/12 to-transparent blur-md" />
                  <span className="absolute inset-x-2 top-4 h-6 rounded-full bg-primary/10 blur-lg opacity-80" />
                  <span className="absolute inset-0 rounded-2xl bg-primary/12 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.1)]" />
                  <span className="relative z-10 inline-block -translate-y-1 scale-105">Dream</span>
                </motion.span>
              </span>{" "}
              <span className="inline-block overflow-hidden align-top">
                <motion.span variants={headingWord} className="inline-block text-primary">
                  Tech
                </motion.span>
              </span>{" "}
              <span className="inline-block overflow-hidden align-top">
                <motion.span variants={headingWord} className="inline-block text-primary">
                  Job
                </motion.span>
              </span>
            </motion.h1>
            <motion.p
              className="mb-8 text-sm leading-relaxed text-muted-foreground sm:text-base"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              Get mentored by engineers from Blinkit, Zomato, Paytm, Google, Amazon, Microsoft & more. Master DSA, System Design, Backend, DevOps, and Full Stack with 1:1 guidance, resume reviews, and referrals.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button asChild size="lg" className="gap-2 text-base">
              <Link to="/courses">
                Explore Courses <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link to="/contact">Talk to a Counselor</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-card p-4 text-center shadow-sm border">
              <div className="mb-1 flex justify-center">{iconMap[stat.label]}</div>
              <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
