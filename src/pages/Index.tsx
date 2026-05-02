import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoursesOverview from "@/components/CoursesOverview";
import WhyUs from "@/components/WhyUs";
import InstructorShowcase from "@/components/InstructorShowcase";
import Testimonials from "@/components/Testimonials";
import StartupStudioSection from "@/components/StartupStudioSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
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
