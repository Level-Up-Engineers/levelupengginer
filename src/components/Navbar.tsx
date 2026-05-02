import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.jpeg";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useLearnerAuth } from "@/contexts/LearnerAuthContext";
import { useFounderAuth } from "@/contexts/FounderAuthContext";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/courses" },
  { label: "Startup Studio", to: "/startup-studio" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user: learnerUser, logout: learnerLogout } = useLearnerAuth();
  const { user: founderUser, logout: founderLogout } = useFounderAuth();
  const activeSection = useScrollSpy(
    ["hero", "courses", "why-us", "instructors", "testimonials", "startup-studio", "cta"],
    40
  );
  const sectionToLink = {
    hero: "/",
    courses: "/courses",
    "why-us": "/about",
    instructors: "/about",
    testimonials: "/about",
    "startup-studio": "/startup-studio",
    cta: "/contact",
  };
  const handleNavClick = () => setMobileOpen(false);
  const handleLogout = () => {
    // Logout from both systems
    learnerLogout();
    founderLogout();
    handleNavClick();
  };

  // Determine which user is logged in
  const currentUser = learnerUser || founderUser;
  const isLearner = !!learnerUser;
  const isFounder = !!founderUser;

  return (
    <header className="fixed top-4 left-1/2 w-[calc(100%-2rem)] max-w-6xl transform -translate-x-1/2 z-50 bg-card/95 backdrop-blur-md rounded-2xl md:rounded-full border border-primary/30 shadow-lg px-4 py-2 md:px-6 md:py-3">
      <div className="flex h-10 items-center justify-between gap-1 lg:gap-4 w-full">
        <Link to="/" className="flex items-center gap-2 mr-auto lg:mr-6 shrink-0">
          <img src={logo} alt="Level Up Engineers" className="h-8 w-8 rounded-lg object-cover shrink-0" />
          <span className="font-display text-[15px] xl:text-base font-bold text-foreground hidden sm:block lg:hidden xl:block whitespace-nowrap">Level Up Engineers</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:gap-2 xl:gap-6 lg:flex shrink-0">
          {navLinks.map((link) => {
            const isActive =
              (location.pathname === link.to && (link.to !== "/" || !activeSection || activeSection === "hero")) ||
              (link.to === "/courses" && location.pathname.startsWith("/courses")) ||
              (location.pathname === "/" && sectionToLink[activeSection] === link.to && activeSection !== "");

            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleNavClick}
                className={`text-[13px] xl:text-sm font-medium transition-all duration-200 hover:text-primary px-2 xl:px-3 py-2 rounded-full hover:bg-primary/10 whitespace-nowrap ${
                  isActive ? "text-primary bg-primary/10" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Button asChild size="sm" className="rounded-full">
            <Link to="/contact">Book a Free Session</Link>
          </Button>
          <ThemeToggle className="rounded-full border border-border bg-background/70 hover:bg-accent" />

          {/* Auth Menu */}
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full border-primary/30">
                  <User className="h-4 w-4 mr-2" />
                  {currentUser.name.split(' ')[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-2 text-sm font-medium border-b">
                  {currentUser.name}
                </div>
                <DropdownMenuItem asChild>
                  <Link to={isLearner ? "/user/dashboard" : "/startup-studio"} className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    {isLearner ? "My Dashboard" : "Startup Studio"}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="rounded-full">
                  Login
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/login" className="flex items-center">
                    Learner Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/founder/login" className="flex items-center">
                    Founder Login
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        <div className="flex items-center gap-2 lg:hidden shrink-0">
          <ThemeToggle className="rounded-full border border-border bg-background/70 hover:bg-accent" />
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 transition-colors hover:bg-accent"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-md rounded-2xl border border-primary/30 shadow-lg p-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive =
                (location.pathname === link.to && (link.to !== "/" || !activeSection || activeSection === "hero")) ||
                (link.to === "/courses" && location.pathname.startsWith("/courses")) ||
                (location.pathname === "/" && sectionToLink[activeSection] === link.to && activeSection !== "");

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={handleNavClick}
                  className={`text-sm font-medium transition-all duration-200 px-4 py-3 rounded-xl hover:bg-primary/10 ${
                    isActive ? "text-primary bg-primary/10" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button asChild className="w-full rounded-xl">
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
                Book a Free Session
              </Link>
            </Button>

            {/* Mobile Auth Buttons */}
            {currentUser ? (
              <>
                <div className="border-t pt-3 mt-2">
                  <div className="px-4 py-2 text-sm font-medium text-muted-foreground">
                    Signed in as {currentUser.name}
                  </div>
                  <Link
                    to={isLearner ? "/user/dashboard" : "/startup-studio"}
                    onClick={handleNavClick}
                    className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl hover:bg-primary/10"
                  >
                    <Settings className="h-4 w-4" />
                    {isLearner ? "My Dashboard" : "Startup Studio"}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium rounded-xl hover:bg-red-500/10 text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t pt-3 mt-2">
                <div className="text-sm font-medium text-muted-foreground px-4 pb-2">Login As:</div>
                <Link
                  to="/login"
                  onClick={handleNavClick}
                  className="block w-full px-4 py-3 text-sm font-medium rounded-xl hover:bg-primary/10 text-center"
                >
                  Learner
                </Link>
                <Link
                  to="/founder/login"
                  onClick={handleNavClick}
                  className="block w-full px-4 py-3 text-sm font-medium rounded-xl hover:bg-primary/10 text-center"
                >
                  Founder
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
