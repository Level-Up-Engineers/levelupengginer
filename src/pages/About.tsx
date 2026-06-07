import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstructorShowcase from "@/components/InstructorShowcase";
import CTABanner from "@/components/CTABanner";
import Testimonials from "@/components/Testimonials";
import { Target, Heart, Rocket, Shield, Users, Building2, TrendingUp, Star } from "lucide-react";
import { motion } from "framer-motion";
import { stats } from "@/lib/courseData";

const values = [
  { icon: <Target className="h-6 w-6" />, title: "Placement-Focused", description: "Everything we do is geared towards getting you hired at top companies." },
  { icon: <Heart className="h-6 w-6" />, title: "Mentorship-First", description: "We believe in personal guidance over mass lectures. Every student gets 1:1 attention." },
  { icon: <Rocket className="h-6 w-6" />, title: "Industry-Relevant", description: "Our curriculum is built by engineers who work at the companies you want to join." },
  { icon: <Shield className="h-6 w-6" />, title: "Trust & Transparency", description: "No hidden fees, no false promises. Just honest mentorship and real results." },
];

const iconMap: Record<string, React.ReactNode> = {
  "Students Placed": <Users className="h-6 w-6 text-primary" />,
  "Hiring Partners": <Building2 className="h-6 w-6 text-primary" />,
  "Placement Rate": <TrendingUp className="h-6 w-6 text-primary" />,
  "Student Rating": <Star className="h-6 w-6 text-primary" />,
};

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <Seo
        title="About Us – Mentors from Top Tech Firms | Level Up Engineers"
        description="Meet the team behind Level Up Engineers — engineers from FAANG and top product companies offering 1:1 mentorship, real projects and placement support."
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-accent/50 to-background pb-12 pt-32 lg:pb-16 lg:pt-40">
          <div className="container">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-4 font-display text-4xl font-extrabold sm:text-5xl">About Level Up Engineers</h1>
              <p className="text-lg text-muted-foreground">
                We started Level Up Engineers with a simple mission — to bridge the gap between college education and what top tech companies actually look for. Our mentors have been through the journey themselves and are here to guide you every step of the way.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="rounded-xl bg-card p-6 text-center shadow-sm border"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="mb-2 flex justify-center">{iconMap[stat.label]}</div>
                  <div className="mb-1 font-display text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-accent/30 py-12 lg:py-16">
          <div className="container">
            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display text-2xl font-bold sm:text-3xl">Our Mission</h2>
                <p className="text-muted-foreground">
                  To democratize access to high-quality tech mentorship. We believe every motivated engineer deserves guidance from the best — not just those who can afford elite coaching or have the right connections.
                </p>
              </motion.div>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display text-2xl font-bold sm:text-3xl">Our Vision</h2>
                <p className="text-muted-foreground">
                  To become the most trusted platform for tech career growth, where every engineer can access world-class mentorship, real-world projects, and direct pathways to their dream companies.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <h2 className="mb-8 text-center font-display text-3xl font-bold">Our Values</h2>
            <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  className="rounded-xl border bg-card p-6 transition-all hover:shadow-md"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {v.icon}
                  </div>
                  <h3 className="mb-2 font-display font-semibold">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="bg-accent/30 py-12 lg:py-16">
          <div className="container">
            <motion.div
              className="mx-auto max-w-3xl space-y-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-3xl font-bold">Our Story</h2>
              <p className="text-muted-foreground">
                Level Up Engineers was born from a simple observation: talented engineers were struggling to land roles at top companies not because they lacked skills, but because they lacked the right guidance and connections. Our founders, having navigated this journey themselves at companies like Blinkit, Zomato, Google, Microsoft, and Paytm, decided to create a platform that bridges this gap.
              </p>
              <p className="text-muted-foreground">
                Through structured programs, 1:1 mentorship, and real-world project experience, we help engineers go from aspiring to hired. Every curriculum is designed by engineers who work at the companies you want to join, ensuring you learn exactly what matters in today's tech industry.
              </p>
            </motion.div>
          </div>
        </section>

        <Testimonials />
        <InstructorShowcase />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default About;
