import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ThemeProvider from "@/components/ThemeProvider";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CoursePage from "./pages/CoursePage";
import Courses from "./pages/Courses";
import NotFound from "./pages/NotFound";
import StartupStudioPage from "./pages/StartupStudioPage";
import StartupContact from "./pages/StartupContact";
import IdeaBuilder from "@/pages/StartupStudio/IdeaBuilder";
import BuildVsBuyCalculator from "@/pages/StartupStudio/BuildVsBuyCalculator";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/:slug" element={<CoursePage />} />
                  <Route path="/startup-studio" element={<StartupStudioPage />} />
                  <Route path="/startup-studio/contact" element={<StartupContact />} />

                  <Route path="/startup-studio/idea-builder" element={<IdeaBuilder />} />
                  <Route path="/startup-studio/build-vs-buy" element={<BuildVsBuyCalculator />} />

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
