import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { Mail, Phone, MapPin, GraduationCap, Rocket, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MODE_DATA = {
  counseling: {
    badgeIcon: GraduationCap,
    badgeText: "Free Mentorship Session",
    titlePrefix: "Launch Your ",
    titleHighlight: "Tech Career",
    desc: "Have questions about our syllabus, job assistance, or which engineering program is right for you? Fill out the form and our mentors will connect with you.",
    formTitle: "Book a Free Counseling Session",
    formDesc: "Submit your details and select a course to schedule a 1-on-1 strategy call with our mentors.",
    email: "contact@levelupengineers.com",
    featuresTitle: "Why Join Level Up Engineers?",
    features: [
      "1:1 Mentorship from FAANG and Tier-1 engineering leads",
      "Hands-on building of production-grade scalable systems",
      "Elite interview preparation: DSA, CS Fundamentals & HLD/LLD",
      "Direct interview referrals and robust placement support",
      "Active Discord developer community and live mock sessions",
    ],
  },
  startup: {
    badgeIcon: Rocket,
    badgeText: "Startup Studio Partnership",
    titlePrefix: "Let's Build Your ",
    titleHighlight: "MVP Together",
    desc: "Have a startup idea or a scaling bottleneck? Connect with our Startup Studio to get elite fractional tech talent, rapid development, and architecture blueprints.",
    formTitle: "Request a Discovery Call",
    formDesc: "Share your business details or concerns. We typically respond within 2-4 business hours.",
    email: "contact@levelupengineers.com",
    featuresTitle: "Startup Studio Engagement",
    features: [
      "30-Minute relaxed discussion call - zero pressure",
      "High-level tech stack strategy & system feasibility",
      "Flexible engagement: technical co-founding or agency partner",
      "Full roadmap mapping, rough timeline & budgeting",
      "Scale-ready systems designed for high-concurrency from day 1",
    ],
  },
};

const Contact = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get("type");

  const [activeMode, setActiveMode] = useState<"counseling" | "startup">("counseling");

  // Keep state in sync with URL parameters
  useEffect(() => {
    if (typeParam === "startup" || typeParam === "counseling") {
      setActiveMode(typeParam);
    }
  }, [typeParam]);

  // Handle inner tab switching by updating URL parameters
  const handleModeChange = (mode: "counseling" | "startup") => {
    setActiveMode(mode);
    setSearchParams({ type: mode }, { replace: true });
  };

  const data = MODE_DATA[activeMode];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 transition-colors duration-500">
      <Seo
        title="Contact Us – Free Counseling Session | Level Up Engineers"
        description="Get in touch with Level Up Engineers for course details, mentorship and placement support. Book a free 1-on-1 counseling session with our mentors today."
      />
      <Navbar />
      <main className="pt-20">
        <section className="py-16 md:py-24">
          <div className="container max-w-6xl px-4 sm:px-6">

            {/* Header Content with Dynamic Transitions */}
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMode}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                    <data.badgeIcon className="h-3.5 w-3.5" />
                    {data.badgeText}
                  </span>
                  <h1 className="mb-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                    {data.titlePrefix}<span className="text-primary">{data.titleHighlight}</span>
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                    {data.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid gap-10 lg:grid-cols-12">
              {/* Form Column */}
              <div className="lg:col-span-7">
                <motion.div
                  className="rounded-2xl border bg-card/60 backdrop-blur-md p-6 sm:p-8 shadow-xl shadow-accent/5"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="mb-2 font-display text-xl font-bold tracking-tight">
                    {data.formTitle}
                  </h2>
                  <p className="mb-6 text-sm text-muted-foreground">
                    {data.formDesc}
                  </p>

                  <LeadCaptureForm
                    initialMode={activeMode}
                    onModeChange={handleModeChange}
                  />
                </motion.div>
              </div>

              {/* Sidebar Info Column */}
              <div className="space-y-6 lg:col-span-5">
                {/* Contact info card */}
                <motion.div
                  className="rounded-2xl border bg-card p-6 sm:p-8 space-y-6 shadow-md"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <h3 className="font-display text-lg font-bold">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</div>
                        <a
                          href={`mailto:${data.email}`}
                          className="text-sm font-semibold hover:text-primary transition-colors duration-200"
                        >
                          {data.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</div>
                        <a
                          href="tel:+917206912018"
                          className="text-sm font-semibold hover:text-primary transition-colors duration-200"
                        >
                          +91 72069 12018
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Location</div>
                        <div className="text-sm font-semibold">Gurugram, Haryana, India</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Dynamic Value Prop Card with transitions */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMode}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border bg-gradient-to-br from-primary/5 to-accent/5 p-6 sm:p-8"
                  >
                    <div className="mb-4 flex items-center gap-2 text-primary">
                      <Sparkles className="h-5 w-5" />
                      <h3 className="font-display font-bold">{data.featuresTitle}</h3>
                    </div>
                    <ul className="space-y-3.5 text-sm">
                      {data.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary/80" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
