import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StartupDiscoveryForm from "@/components/StartupDiscoveryForm";
import { Mail, Phone, MapPin, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const StartupContact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <Seo
        title="Free Discovery Call – Startup Studio | Level Up Engineers"
        description="Tell us about your startup idea and book a free discovery call. Our studio team will help you scope, design and build your MVP the right way, end to end."
      />
      <Navbar />
      <main className="pt-20">
        <section className="py-20">
          <div className="container">
            <motion.div
              className="mx-auto mb-12 max-w-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                Startup Studio · Free Discovery Call
              </span>
              <h1 className="mb-4 font-display text-4xl font-extrabold sm:text-5xl">
                Let's Build Your <span className="text-primary">MVP Together</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Tell us about your idea. We'll get back within 24 hours to schedule a free
                30-minute call — no pitch, no pressure, just an honest conversation.
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-5">
              {/* Form */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="rounded-xl border bg-card p-6 sm:p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Rocket className="h-5 w-5" />
                    </div>
                    <h2 className="font-display text-xl font-bold">Book a Free Discovery Call</h2>
                  </div>
                  <StartupDiscoveryForm />
                </div>
              </motion.div>

              {/* Contact info */}
              <motion.div
                className="space-y-6 lg:col-span-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="font-display text-xl font-bold">Contact Information</h2>
                <p className="text-sm text-muted-foreground">
                  Reach out directly — we typically respond within a few hours during business days.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Email</div>
                      <div className="text-sm text-muted-foreground">contact@levelupengineers.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Phone</div>
                      <div className="text-sm text-muted-foreground">+91 72069 12018</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Location</div>
                      <div className="text-sm text-muted-foreground">Gurugram, India</div>
                    </div>
                  </div>
                </div>

                {/* What to expect */}
                <div className="rounded-xl border bg-accent/30 p-5">
                  <h3 className="mb-3 font-display font-semibold">What to expect on the call</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {[
                      "30-minute relaxed conversation",
                      "We understand your vision & goals",
                      "High-level tech approach & feasibility",
                      "Rough timeline & cost estimate",
                      "Zero obligation — just honest advice",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StartupContact;
