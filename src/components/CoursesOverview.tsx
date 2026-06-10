import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, Code, Server, Cloud, Layers, Database, Brain } from "lucide-react";
import { courses } from "@/lib/courseData";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="h-6 w-6" />,
  Server: <Server className="h-6 w-6" />,
  Cloud: <Cloud className="h-6 w-6" />,
  Layers: <Layers className="h-6 w-6" />,
  Database: <Database className="h-6 w-6" />,
  Brain: <Brain className="h-6 w-6" />,
};

const CoursesOverview = () => {
  return (
    <section id="courses" className="pb-20 pt-10">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">Our Programs</h2>
          <p className="text-muted-foreground">
            Industry-aligned courses designed to get you hired at top product-based companies.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <motion.div
              key={course.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link to={`/courses/${course.slug}`} className="no-underline h-full block">
                <Card className="group h-full transition-all hover:shadow-lg hover:border-primary/30 cursor-pointer">
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {iconMap[course.icon]}
                    </div>
                    <CardTitle className="text-lg">{course.shortTitle}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {course.duration}
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <p className="text-sm text-muted-foreground">{course.description}</p>
                    <div className="mt-auto flex items-center gap-1 text-primary text-sm hover:gap-2 transition-all">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesOverview;
