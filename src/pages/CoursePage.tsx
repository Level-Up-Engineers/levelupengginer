import { useParams, Navigate } from "react-router-dom";
import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { courses, courseSeo } from "@/lib/courseData";
import { Clock, CheckCircle2, Code, Server, Cloud, Layers, Database, Smartphone, IndianRupee, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="h-8 w-8" />,
  Server: <Server className="h-8 w-8" />,
  Cloud: <Cloud className="h-8 w-8" />,
  Layers: <Layers className="h-8 w-8" />,
  Database: <Database className="h-8 w-8" />,
  Mobile: <Smartphone className="h-8 w-8" />,
};

const CoursePage = () => {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);

  if (!course) return <Navigate to="/" replace />;

  const seo = courseSeo[course.slug] ?? {
    title: `${course.shortTitle} Course | Level Up Engineers`,
    description: course.description.slice(0, 155),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <Seo title={seo.title} description={seo.description} />
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-accent/30 py-16 lg:py-20">
          <div className="container">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4 flex justify-center text-primary">{iconMap[course.icon]}</div>
              <h1 className="mb-4 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">{course.title}</h1>
              <div className="mb-6 flex items-center justify-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" /> {course.duration}
              </div>
              <p className="text-lg text-muted-foreground">{course.overview}</p>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link to="/contact">Talk to a Counselor</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-16">
          <div className="container">
            <h2 className="mb-8 text-center font-display text-2xl font-bold sm:text-3xl">Program Highlights</h2>
            <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
              {course.highlights.map((h) => (
                <div key={h} className="flex items-start gap-3 rounded-lg border bg-card p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="bg-accent/30 py-16">
          <div className="container">
            <h2 className="mb-8 text-center font-display text-2xl font-bold sm:text-3xl">Curriculum</h2>
            <div className="mx-auto max-w-3xl space-y-6">
              {course.modules.map((mod, i) => (
                <motion.div
                  key={mod.title}
                  className="rounded-xl border bg-card p-6"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <h3 className="mb-3 font-display font-semibold">
                    <span className="mr-2 text-primary">Module {i + 1}:</span>
                    {mod.title}
                  </h3>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {mod.topics.map((t) => (
                      <li key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        {(course.basePrice || course.internshipPrice) && (
          <section className="py-16">
            <div className="container">
              <h2 className="mb-8 text-center font-display text-2xl font-bold sm:text-3xl">Program Pricing</h2>
              <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
                {/* Base Course */}
                {course.basePrice && (
                  <motion.div
                    className="rounded-xl border-2 bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Code className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-xl font-semibold">Program</h3>
                    </div>
                    <div className="mb-2 flex flex-col">
                      <div className="flex items-baseline gap-1">
                        <IndianRupee className="h-6 w-6 text-muted-foreground" />
                        <span className="font-display text-3xl font-bold">{course.basePrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        <span className="font-display text-sm font-medium text-muted-foreground line-through">{course.slug === 'devops-sre' ? '52,999' : '49,999'}</span>
                      </div>
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground">{course.duration} Program</p>
                    <ul className="mb-4 space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>Complete course curriculum</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>1:1 Mentorship</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>Mock interviews & resume review</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>Course completion certificate</span>
                      </li>
                    </ul>
                    <Button asChild className="w-full">
                      <Link to="/contact">Enroll Now</Link>
                    </Button>
                  </motion.div>
                )}

                {/* Course with Internship */}
                {course.internshipPrice && (
                  <motion.div
                    className="rounded-xl border-2 bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-xl font-semibold">Program + Internship</h3>
                    </div>
                    <div className="mb-2 flex flex-col">
                      <div className="flex items-baseline gap-1">
                        <IndianRupee className="h-6 w-6 text-muted-foreground" />
                        <span className="font-display text-3xl font-bold">{course.internshipPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        <span className="font-display text-sm font-medium text-muted-foreground line-through">{course.slug === 'devops-sre' ? '92,999' : '89,999'}</span>
                      </div>
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {course.duration} Program + {course.internshipDuration} Internship
                    </p>
                    <ul className="mb-4 space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>Everything in Program</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{course.internshipDuration} hands-on internship experience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>Real-world project experience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>Internship certificate & portfolio</span>
                      </li>
                    </ul>
                    <Button asChild className="w-full">
                      <Link to="/contact">Enroll with Internship</Link>
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Lead form */}
        <section className="py-16">
          <div className="container">
            <div className="mx-auto max-w-lg rounded-xl border bg-card p-6 sm:p-8">
              <h2 className="mb-2 text-center font-display text-xl font-bold">Interested in {course.shortTitle}?</h2>
              <p className="mb-6 text-center text-sm text-muted-foreground">
                Fill out the form and we'll get back to you within 24 hours.
              </p>
              <LeadCaptureForm preselectedCourse={course.slug} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CoursePage;
