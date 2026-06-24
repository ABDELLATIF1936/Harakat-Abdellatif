import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Lock, ArrowLeft, Leaf } from "lucide-react";

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentView: "portfolio" | "admin" | "login";
  setView: (view: "portfolio" | "admin" | "login") => void;
  adminName: string;
  onResetProject?: () => void;
}

export default function Navbar({
  isDarkMode,
  toggleDarkMode,
  currentView,
  setView,
  adminName,
  onResetProject,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link calculation
      const sections = ["home", "about", "education", "experience", "projects", "skills", "certificates", "testimonials", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", href: "#home", id: "home" },
    { name: "À propos", href: "#about", id: "about" },
    { name: "Formations", href: "#education", id: "education" },
    { name: "Expérience", href: "#experience", id: "experience" },
    { name: "Projets", href: "#projects", id: "projects" },
    { name: "Compétences", href: "#skills", id: "skills" },
    { name: "Certificats", href: "#certificates", id: "certificates" },
    { name: "Témoignages", href: "#testimonials", id: "testimonials" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setActiveSection(id);
    
    if (onResetProject) {
      onResetProject();
    }

    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 120);
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-indigo-100/30 dark:border-slate-800/80 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Nom (Inspired by JobInTech structure: Bold prefix in Black/White, suffix with green leaf) */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home", "home")}
              className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-0.5"
            >
              <span className="text-slate-900 dark:text-slate-100 font-extrabold text-2xl">Abdellatif</span>
              <span className="text-indigo-600 font-bold text-2xl flex items-center">
                Harakat
                <div className="ml-1 text-indigo-600 flex items-center">
                  <Leaf className="w-5 h-5 fill-indigo-600/10 rotate-12 inline animate-pulse" />
                </div>
              </span>
            </a>
          </div>

          {/* Navigation links - Desktop */}
          {currentView === "portfolio" && (
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-normal transition-all duration-300 ${
                      isActive
                        ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 font-bold shadow-xs"
                        : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-50/50 dark:hover:bg-slate-800/20"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Dark Mode toggle */}
            <button
              id="theme-toggle"
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            {/* Portal toggle */}
            {currentView !== "portfolio" && (
              <button
                onClick={() => setView("portfolio")}
                className="flex items-center gap-1 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-705 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour</span>
              </button>
            )}

            {/* Hamburger menu for mobile navigation */}
            {currentView === "portfolio" && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && currentView === "portfolio" && (
        <div id="mobile-menu" className="lg:hidden px-4 pt-2 pb-4 bg-white dark:bg-slate-900 border-b border-indigo-100/20 dark:border-slate-800 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold ${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 font-bold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-indigo-600"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
