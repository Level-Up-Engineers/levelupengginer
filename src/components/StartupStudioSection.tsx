import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useFounderAuth } from "@/contexts/FounderAuthContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Users,
  Layers,
  Zap,
  Cpu,
  Cloud,
  BrainCircuit,
  TerminalSquare,
  Rocket,
  ShieldCheck,
  BarChart3,
  CheckCircle2,
  Code2,
  Database,
  Smartphone,
  Blocks,
} from "lucide-react";
import FluidLayout from "./FluidLayout";

const services = [
  {
    icon: <TerminalSquare className="h-5 w-5" />,
    title: "Web Development",
    description: "Fast, modern web apps with clean, maintainable code.",
  },
  {
    icon: <Cpu className="h-5 w-5" />,
    title: "Mobile & Product UI",
    description: "Product-grade interfaces for mobile and desktop that feel premium.",
  },
  {
    icon: <Cloud className="h-5 w-5" />,
    title: "DevOps & Infrastructure",
    description: "Cloud, CI/CD, monitoring, and reliability baked in from day one.",
  },
  {
    icon: <BrainCircuit className="h-5 w-5" />,
    title: "AI / ML Solutions",
    description: "Smart copilots, internal tools, and automation where it actually helps.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "MVP Development",
    description: "From zero to a credible MVP you can put in front of users.",
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "System Design & Scaling",
    description: "Architecture that can handle growth without a full rewrite — from MVP to enterprise.",
  },
];

const reasons = [
  {
    icon: <Users className="h-5 w-5" />,
    title: "No full team to hire",
    description: "Skip job posts, interviews, and onboarding. Start building this week, not next quarter — or get expert architecture help for your scaling challenges.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Faster than in‑house",
    description: "You plug into a ready-made senior team that has shipped this before, from MVPs to enterprise-scale systems.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Proven engineers",
    description: "You work with builders who have seen real product, from early-stage MVPs to Series A scaling challenges.",
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "End‑to‑end ownership",
    description: "Design, backend, infra, and DevOps in one lane — no handoff chaos. Perfect for both new builds and system overhauls.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Built for growth",
    description: "Short cycles, tight feedback, and a constant push toward live users. Whether you're at idea stage or scaling to thousands.",
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: "From MVP to scale",
    description: "We stay with you past launch as you iterate and grow — or help architect the next phase of your established product.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const StartupStudioSection = () => {
  const { canAccessIdeaAnalyzer } = useFounderAuth();
  useEffect(() => {
    // Scroll handling or other non-fluid effects can go here
  }, []);

  const faqs = [
    {
      q: "Do we still need to hire engineers?",
      a: "No. You get access to top-tier engineers who have worked at Blinkit, Zomato, Google, Amazon, Microsoft, JioStar & Swiggy. Our dedicated studio squad covers design, backend, app/web, infra, and DevOps—so you can stay focused on growth.",
    },
    {
      q: "How fast can you deliver an MVP?",
      a: "Typically in weeks, depending on scope and integrations. We start with a clear plan (what we build first, what we ship next) so progress stays visible every iteration.",
    },
    {
      q: "Is it fixed scope or ongoing work?",
      a: "We run on milestones with a tight build loop. Early on, we lock the MVP path; after launch, we iterate toward the next set of user outcomes.",
    },
    {
      q: "What do you need from us to start?",
      a: "Your product goals, target users, success metrics, and any existing assets (brand, docs, code, or data). We’ll lead the discovery and turn that into a build-ready plan.",
    },
    {
      q: "Do you handle infrastructure, DevOps, and scaling?",
      a: "Yes. We set up CI/CD, environments, monitoring, and release processes so your product is production-ready—not a demo you need to rebuild later.",
    },
    {
      q: "Can you work with our existing stack or codebase?",
      a: "Yes when it fits the target architecture. If you already have code, we can integrate and ship on top of it; if not, we’ll build the right foundations from day one.",
    },
    {
      q: "How do you handle ownership and IP?",
      a: "We structure engagements with clear agreements around confidentiality and ownership. The goal is simple: your company owns the product you fund and validate.",
    },
  ];

  return (
    <div className="text-foreground overflow-x-hidden relative selection:bg-emerald-500/30">
      {/* Deep Space Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900/10 blur-[150px]" />
      </div>

      <div className="relative z-10">
        {/* HERO */}
        <FluidLayout className="relative min-h-[90vh] flex items-center pt-32 pb-20 sm:pb-32 lg:pt-40 w-full">
          <div className="container relative z-10">
            <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <motion.div
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-300 backdrop-blur-md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Startup Studio
                  </motion.div>
                  
                  <motion.h1
                    className="mb-6 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl lg:leading-[1.1]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    Build or Scale <br className="hidden lg:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-primary">Without Hiring</span>
                  </motion.h1>
                  
                  <motion.p
                    className="mb-10 max-w-xl text-lg text-muted-foreground font-light leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Whether you're turning an idea into reality or scaling a Series A startup, we provide elite engineering teams for design, architecture, and scaling. From MVP to enterprise.
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Button asChild size="lg" className="rounded-full h-12 px-8 text-sm font-semibold transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)]">
                      <Link to="/startup-studio/contact">
                        Start Building
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-8 border-border bg-background/60 text-foreground hover:bg-accent backdrop-blur-md">
                      {canAccessIdeaAnalyzer() ? (
                        <Link to="/startup-studio/idea-builder">AI Idea Analyzer</Link>
                      ) : (
                        <Link to="/founder/login?redirect=/startup-studio/idea-builder">AI Idea Analyzer</Link>
                      )}
                    </Button>
                  </motion.div>
                </div>

                {/* Hero visual */}
                <motion.div
                  className="relative mx-auto w-full max-w-lg lg:max-w-none"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                >
                  <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/20 via-primary/20 to-transparent blur-2xl z-0" />
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/50 p-2 backdrop-blur-xl z-10">
                    <img
                      src="/startup-studio/startup-studio-hero-coders.png"
                      alt="Engineers collaborating"
                      className="h-full w-full rounded-3xl object-cover"
                    />
                    <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-border bg-background/80 p-4 backdrop-blur-md">
                      <p className="text-sm font-semibold text-foreground">Idea → MVP → Scale</p>
                      <p className="mt-1 text-xs text-muted-foreground">One dedicated architecture & building team.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
        </FluidLayout>

        {/* STATISTICS */}
        <section className="relative py-12 sm:py-16">
          <div className="container relative z-10">
            <motion.div 
              className="grid grid-cols-2 gap-8 md:grid-cols-4 md:divide-x md:divide-border rounded-3xl border border-border bg-muted/40 dark:bg-white/[0.02] p-8 backdrop-blur-2xl"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { val: "3x", label: "Faster MVP Launch" },
                { val: "$150k+", label: "Saved on Hiring" },
                { val: "99.9%", label: "Uptime Architecture" },
                { val: "100%", label: "Code Ownership" },
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeUp} className="flex flex-col items-center justify-center p-2">
                  <span className="font-display text-4xl font-black md:text-5xl lg:text-5xl xl:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50">{stat.val}</span>
                  <span className="mt-3 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* BUILD IN MOTION */}
        <section className="relative py-24 sm:py-32">
          <div className="container">
            {/* Header row */}
            <motion.div
              className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="max-w-lg">
                <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Build in motion, <span className="text-muted-foreground font-light">not in theory</span>
                </h2>
                <p className="mt-4 text-sm text-muted-foreground font-light leading-relaxed">
                  Real collaboration. Real code. Real products. Every sprint brings you closer to launch with tangible progress your users can see.
                </p>
              </div>
              <p className="text-sm text-muted-foreground sm:text-right sm:max-w-xs sm:pt-1">
                Full-stack execution —{" "}
                <span className="font-semibold text-foreground">from concept to production.</span>
              </p>
            </motion.div>

            {/* Three image cards */}
            <motion.div
              className="grid gap-6 md:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80",
                  num: "01",
                  tag: "Sprint Planning",
                  sub: "Map features, priorities, and milestones weekly. Clear roadmap, shared visibility.",
                },
                {
                  img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=900&q=80",
                  num: "02",
                  tag: "Daily Builds",
                  sub: "Code deploys daily to staging. Automated tests. Real-time feedback loops.",
                },
                {
                  img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80",
                  num: "03",
                  tag: "Live & Monitor",
                  sub: "Ship to production with confidence. Monitoring, alerts, and instant rollback if needed.",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group relative overflow-hidden rounded-2xl border border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.01] transition-all hover:border-emerald-500/30"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={card.img}
                      alt={card.tag}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <p className="text-xs font-semibold text-emerald-400 mb-1">
                      {card.num} {card.tag}
                    </p>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      {card.sub}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* WHY US */}
        <section className="relative py-24 sm:py-32">
          <div className="container">
            <motion.div 
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">Why Scalers Choose Us</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground font-light">
                Skip the recruiting pipeline. Plug into an elite, battle-tested squad instantly.
              </p>
            </motion.div>

            <motion.div 
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {reasons.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="group relative rounded-[2rem] border border-border dark:border-white/5 bg-muted/30 dark:bg-white/[0.02] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 dark:hover:border-white/10 hover:bg-muted/60 dark:hover:bg-white/[0.04]"
                >
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-muted to-muted/60 dark:from-slate-800 dark:to-slate-900 border border-border dark:border-white/5 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-300 shadow-inner">
                    {item.icon}
                  </div>
                  <h3 className="mb-3 font-display text-xl font-bold text-foreground tracking-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SERVICES / WHAT WE OFFER & TECH STACK */}
        <section className="relative py-24 sm:py-32">
          <div className="container">
            <motion.div 
              className="mb-16 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">Full-stack mastery.</h2>
              <p className="mt-4 text-lg text-muted-foreground font-light">
                We handle the entire vertical. No organizational silos, just smooth execution.
              </p>
            </motion.div>

            <motion.div 
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-24"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  className="group flex gap-4 rounded-2xl border border-transparent p-6 transition-colors hover:bg-white/[0.02]"
                >
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted dark:bg-slate-900 border border-border dark:border-white/5 text-emerald-600 dark:text-emerald-400">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{service.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground font-light">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* TECH STACK */}
            <motion.div 
              className="rounded-[2.5rem] border border-border dark:border-white/5 bg-muted/40 dark:bg-slate-900/30 p-8 sm:p-12 backdrop-blur-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-10 text-center">
                <h3 className="font-display text-2xl font-bold text-foreground">Enterprise Grade Technology</h3>
                <p className="mt-2 text-muted-foreground text-sm">Built for velocity today, scale tomorrow.</p>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: <Smartphone className="mb-4 h-6 w-6 text-emerald-400" />, title: "Frontend & App", desc: "React, Next.js, React Native" },
                  { icon: <Code2 className="mb-4 h-6 w-6 text-emerald-400" />, title: "Backend & APIs", desc: "Go, Python, Node.js" },
                  { icon: <Database className="mb-4 h-6 w-6 text-emerald-400" />, title: "Data & AI", desc: "PostgreSQL, Redis, Vector DB" },
                  { icon: <Blocks className="mb-4 h-6 w-6 text-emerald-400" />, title: "DevOps", desc: "AWS, Docker, K8s" }
                ].map((stack, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center">
                    {stack.icon}
                    <h4 className="mb-1 text-sm font-semibold uppercase tracking-wider text-foreground/80">{stack.title}</h4>
                    <p className="text-sm text-muted-foreground/80">{stack.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SOCIAL PROOF & EXISTING CLIENTS */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent" />
          <div className="container relative z-10">
            <motion.div 
              className="mb-20 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-emerald-400">The Squad</p>
              <h2 className="mx-auto max-w-4xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-tight">
                Engineers from Blinkit, Zomato, Google <span className="text-muted-foreground/60">&</span> Microsoft.
              </h2>
            </motion.div>

            <motion.div 
              className="grid gap-6 md:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { name: "Shoppin", logo: "/startup-studio/client-logos/startup-studio-logo-shoppin.png", desc: "E-commerce workflows, checkout, & infra." },
                { name: "PandaMoney", logo: "/startup-studio/client-logos/startup-studio-logo-pandamoney.png", desc: "Fintech backend, secure APIs, scaled workflows." },
                { name: "Source Asia", logo: "/startup-studio/client-logos/startup-studio-logo-source-asia.png", desc: "Web platform analytics and stable deployments." },
              ].map((client) => (
                <motion.div key={client.name} variants={fadeUp} className="group relative overflow-hidden rounded-[2.5rem] border border-border dark:border-white/5 bg-muted/30 dark:bg-white/[0.01] transition-colors hover:bg-muted/60 dark:hover:bg-white/[0.03]">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 blur-xl transition-opacity group-hover:opacity-10 bg-emerald-500" />
                  <div className="relative p-8">
                    <img src={client.logo} alt={client.name} className="mb-8 h-12 w-auto opacity-80" />
                    <h3 className="mb-2 font-display text-xl font-bold text-foreground">{client.name}</h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">{client.desc}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">Shipped</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS & FAQ */}
        <section className="relative py-24 sm:py-32">
          <div className="container">
             <div className="grid gap-16 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="mb-8 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How it works</h2>
                  <div className="space-y-8">
                    {[
                      { step: "01", title: "Share your vision", text: "We unpack your vision and constraints in a focused working session." },
                      { step: "02", title: "Design & plan", text: "We map the architecture and build plan aligned to your scaling goals." },
                      { step: "03", title: "Build & push", text: "Weekly iterations with visible code pushes and product demos." },
                      { step: "04", title: "Scale", text: "Deploy to production, hand over, or retain us to architect the next phase." }
                    ].map((item) => (
                      <div key={item.step} className="flex gap-6">
                        <div className="font-display text-xl font-black text-muted-foreground">{item.step}</div>
                        <div>
                          <h3 className="font-display text-lg font-bold text-foreground">{item.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground font-light">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="mb-8 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">FAQ</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((item, idx) => (
                      <AccordionItem key={idx} value={`faq-${idx}`} className="border-border dark:border-white/10">
                        <AccordionTrigger className="text-left text-foreground hover:text-emerald-500">{item.q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground font-light leading-relaxed">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
             </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative py-24 sm:py-32">
          <div className="container relative z-10">
            <motion.div 
              className="mx-auto max-w-4xl overflow-hidden rounded-[3rem] border border-border dark:border-white/10 bg-muted/40 dark:bg-slate-900/50 p-10 text-center backdrop-blur-2xl sm:p-16 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-50" />
              <div className="relative text-center mx-auto max-w-2xl">
                <h2 className="font-display text-3xl font-black tracking-tight text-foreground sm:text-5xl mb-6">
                  Stop recruiting. <br/> Start shipping.
                </h2>
                <p className="mb-10 text-lg text-muted-foreground font-light">
                  Tell us what you're trying to build or scale. We'll share a concrete execution roadmap before anyone writes a line of code.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button asChild size="lg" className="rounded-full h-14 px-10 text-base font-semibold shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                    <Link to="/startup-studio/contact">
                      Build Your Startup Now
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full h-14 px-10 border-border bg-background text-foreground hover:bg-accent transition-all">
                    <Link to="/startup-studio/contact">Explore Fit</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StartupStudioSection;
