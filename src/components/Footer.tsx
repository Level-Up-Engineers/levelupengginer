import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Level Up Engineers" className="h-9 w-9 rounded-lg object-cover" />
              <span className="font-display text-lg font-bold text-foreground">Level Up Engineers</span>
            </Link>
            <p className="text-sm text-muted-foreground dark:text-slate-400">
              Empowering engineers to crack top tech companies with expert mentorship and structured learning.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-display font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/courses" className="hover:text-primary transition-colors">Courses</Link></li>
              <li><Link to="/startup-studio" className="hover:text-primary transition-colors">Startup Studio</Link></li>
              <li><Link to="/startup-studio/contact" className="hover:text-primary transition-colors">Book a Discovery Call</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          {/* Courses */}
          <div>
            <h4 className="mb-4 font-display font-semibold text-foreground">Courses</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/courses/interview-prep" className="hover:text-primary transition-colors">Intensive Interview Prep Program</Link></li>
              <li><Link to="/courses/backend-engineering" className="hover:text-primary transition-colors">Backend Engineering</Link></li>
              <li><Link to="/courses/devops-sre" className="hover:text-primary transition-colors">DevOps + SRE</Link></li>
              <li><Link to="/courses/full-stack" className="hover:text-primary transition-colors">Full Stack Engineering</Link></li>
              <li><Link to="/courses/data-engineering" className="hover:text-primary transition-colors">Data Engineering</Link></li>
              <li><Link to="/courses/android-engineering" className="hover:text-primary transition-colors">Android Engineering</Link></li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="mb-4 font-display font-semibold text-foreground">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> contact@levelupengineers.com</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +91 72069 12018</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Gurugram, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Level Up Engineers. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
