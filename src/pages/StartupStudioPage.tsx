import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StartupStudio from "@/components/StartupStudio";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";
import FluidLayout from "@/components/FluidLayout";

const StartupStudioPage = () => {
  return (
    <div className="bg-background text-foreground dark:bg-slate-950 dark:text-slate-50 min-h-screen">
        <Navbar />
        <main>
          <StartupStudio />
        </main>
        <Footer />

      {/* Sticky floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button asChild size="lg" className="gap-2 rounded-full shadow-2xl shadow-primary/30 text-sm">
          <Link to="/startup-studio/contact">
            <Rocket className="h-4 w-4" />
            Book a Free Call
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default StartupStudioPage;
