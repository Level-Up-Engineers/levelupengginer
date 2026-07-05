import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PremiumTrustSection from "@/components/PremiumTrustSection";
import PremiumFeaturesShowcase from "@/components/PremiumFeaturesShowcase";
import PremiumLearningJourney from "@/components/PremiumLearningJourney";
import Testimonials from "@/components/Testimonials";
import StartupStudioSection from "@/components/StartupStudioSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
        <Seo
          title="Level Up Engineers | Engineering Courses & Startup Studio"
          description="Mentor-led engineering courses, FAANG interview prep and a startup studio to ship your MVP. Learn backend, DevOps, full stack and data engineering online."
        />
        <Navbar />
        <main>
          <section id="hero"><HeroSection /></section>
          <section id="courses"><CoursesOverview /></section>
          <section id="why-us"><WhyUs /></section>
          <section id="instructors"><InstructorShowcase /></section>
          <section id="testimonials"><Testimonials /></section>
          <section id="startup-studio"><StartupStudioSection /></section>
          <section id="cta"><CTABanner /></section>
        </main>
        <Footer />
    </div>
  );
};

export default Index;
