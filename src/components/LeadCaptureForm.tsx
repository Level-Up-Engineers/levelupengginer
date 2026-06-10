import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { courses } from "@/lib/courseData";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Rocket, Briefcase, Phone, Mail, User } from "lucide-react";

interface LeadCaptureFormProps {
  initialMode?: "counseling" | "startup";
  preselectedCourse?: string;
  preselectedTopic?: string;
  onModeChange?: (mode: "counseling" | "startup") => void;
}

const inquiryTopics = [
  "Technical Co-founding",
  "MVP Development",
  "Scaling & Architecture",
  "Business Consulting",
  "Book a Discussion Call",
  "Other"
];

const LeadCaptureForm = ({
  initialMode = "counseling",
  preselectedCourse,
  preselectedTopic,
  onModeChange
}: LeadCaptureFormProps) => {
  const [activeMode, setActiveMode] = useState<"counseling" | "startup">(initialMode);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: preselectedCourse || "",
    startupName: "",
    topic: preselectedTopic || "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Sync mode if changed from parent
  useEffect(() => {
    setActiveMode(initialMode);
  }, [initialMode]);

  // Keep parent in sync
  const handleModeToggle = (mode: "counseling" | "startup") => {
    setActiveMode(mode);
    if (onModeChange) {
      onModeChange(mode);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: activeMode, ...formData }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Submission failed");
      }

      if (activeMode === "counseling") {
        toast({
          title: "Counseling Session Booked! 🎓",
          description: "Our senior mentors will reach out to you within 24 hours.",
        });
      } else {
        toast({
          title: "Discovery Call Requested! 🚀",
          description: "Our Startup Studio team will get back to you within 24 hours.",
        });
      }

      // Reset form (keeping preselected options if any)
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: preselectedCourse || "",
        startupName: "",
        topic: preselectedTopic || "",
        message: "",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again, or reach us directly at contact@levelupengineers.com.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const tabs = [
    { id: "counseling", label: "Career Counseling", icon: GraduationCap },
    { id: "startup", label: "Startup Studio", icon: Rocket },
  ];

  return (
    <div className="space-y-6">
      {/* Sliding Tab Switcher */}
      <div className="relative flex rounded-xl bg-secondary/40 p-1 border border-border/40 backdrop-blur-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleModeToggle(tab.id as "counseling" | "startup")}
              className={`relative z-10 flex flex-1 items-center justify-center gap-2 py-3 text-xs font-semibold sm:text-sm transition-colors duration-300 rounded-lg ${
                isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeContactTab"
                  className="absolute inset-0 rounded-lg bg-primary shadow-md"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <Icon className="relative z-20 h-4 w-4" />
              <span className="relative z-20">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Information */}
        <div className="relative">
          <Input
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="pl-10"
            required
          />
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/75" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-10"
              required
            />
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/75" />
          </div>
          <div className="relative">
            <Input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="pl-10"
              required
            />
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/75" />
          </div>
        </div>

        {/* Dynamic Fields Container with Smooth Transitions */}
        <AnimatePresence mode="wait">
          {activeMode === "counseling" ? (
            <motion.div
              key="counseling-fields"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <Select
                value={formData.course}
                onValueChange={(val) => setFormData({ ...formData, course: val })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.slug} value={c.slug}>
                      {c.shortTitle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Textarea
                placeholder="What are your career goals or questions? (optional)"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="resize-none"
              />
            </motion.div>
          ) : (
            <motion.div
              key="startup-fields"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="relative">
                <Input
                  placeholder="Startup / Product Name (optional)"
                  value={formData.startupName}
                  onChange={(e) => setFormData({ ...formData, startupName: e.target.value })}
                  className="pl-10"
                />
                <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/75" />
              </div>

              <Select
                value={formData.topic}
                onValueChange={(val) => setFormData({ ...formData, topic: val })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="What is your main concern or challenge?" />
                </SelectTrigger>
                <SelectContent>
                  {inquiryTopics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Textarea
                placeholder="Briefly describe your startup idea, business problems, or concern..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="resize-none"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Button type="submit" className="w-full relative overflow-hidden group shadow-lg shadow-primary/20" size="lg" disabled={submitting}>
          <span className="relative z-10 flex items-center justify-center gap-2">
            {submitting ? (
              "Submitting..."
            ) : activeMode === "counseling" ? (
              <>
                <GraduationCap className="h-5 w-5" />
                Book Counseling Session
              </>
            ) : (
              <>
                <Rocket className="h-5 w-5" />
                Connect with Startup Studio
              </>
            )}
          </span>
          <span className="absolute inset-0 bg-primary-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
      </form>
    </div>
  );
};

export default LeadCaptureForm;
