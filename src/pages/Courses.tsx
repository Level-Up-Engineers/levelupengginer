import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import CoursesOverview from "@/components/CoursesOverview";
import Footer from "@/components/Footer";

const Courses = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <Seo
        title="Engineering Courses with 1:1 Mentorship | Level Up Engineers"
        description="Explore mentor-led programs in interview prep, backend, DevOps & SRE, full stack, data and Android engineering — built by engineers from top companies."
      />
      <Navbar />
      <main className="pt-20">
        <CoursesOverview />
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
