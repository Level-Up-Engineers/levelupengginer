import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LearnerAuthProvider } from "@/contexts/LearnerAuthContext";
import { FounderAuthProvider } from "@/contexts/FounderAuthContext";
import ThemeProvider from "@/components/ThemeProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CoursePage from "./pages/CoursePage";
import Courses from "./pages/Courses";
import NotFound from "./pages/NotFound";
import StartupStudioPage from "./pages/StartupStudioPage";
import StartupContact from "./pages/StartupContact";
import LearnerLogin from "./pages/LearnerLogin";
import LearnerSignup from "./pages/LearnerSignup";
import FounderLogin from "./pages/FounderLogin";
import FounderSignup from "./pages/FounderSignup";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import IdeaBuilder from "@/pages/IdeaBuilder";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

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
        <AuthProvider>
          <LearnerAuthProvider>
            <FounderAuthProvider>
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

                  {/* Learner Routes */}
                  <Route path="/login" element={<LearnerLogin />} />
                  <Route path="/signup" element={<LearnerSignup />} />
                  <Route path="/user/dashboard" element={<UserDashboard />} />

                  {/* Founder Routes */}
                  <Route path="/founder/login" element={<FounderLogin />} />
                  <Route path="/founder/signup" element={<FounderSignup />} />
                  <Route path="/startup-studio/idea-builder" element={<IdeaBuilder />} />

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/signup" element={<AdminSignup />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </FounderAuthProvider>
          </LearnerAuthProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
