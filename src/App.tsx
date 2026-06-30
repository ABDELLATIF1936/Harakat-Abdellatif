import { useState, useEffect } from "react";
import {
  Profile,
  Education,
  ExperiencePro,
  ExperienceBenevole,
  Project,
  Skill,
  Certificate,
  Testimonial,
  ContactMessage,
} from "./types";
// Components imports
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import EducationComp from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certificates from "./components/Certificates";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ProjectDetail from "./components/ProjectDetail";
import CertificateDetail from "./components/CertificateDetail";
import ChatAssistant from "./components/ChatAssistant";

export default function App() {
  // View Router management ('portfolio' | 'login' | 'admin')
  const [currentView, setCurrentView] = useState<"portfolio" | "login" | "admin">("portfolio");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("portfolio_authenticated") === "true";
  });

  // Dark/Light theme mode state logic
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("portfolio_theme");
    return savedTheme === "dark";
  });

  // PERSISTENCE ENGINE (Component state initialized as empty; actual content loaded from MySQL backend on boot)
  const [profile, setProfile] = useState<Profile>({
    name: "",
    title: "",
    bio: "",
    photoUrl: "",
    cvUrl: "",
    email: "",
    phone: "",
    location: "",
    status: "",
    linkedin: "",
    github: "",
  });
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [experienceProList, setExperienceProList] = useState<ExperiencePro[]>([]);
  const [experienceBenevoleList, setExperienceBenevoleList] = useState<ExperienceBenevole[]>([]);
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [skillList, setSkillList] = useState<Skill[]>([]);
  const [certificateList, setCertificateList] = useState<Certificate[]>([]);
  const [testimonialList, setTestimonialList] = useState<Testimonial[]>([]);
  const [messageList, setMessageList] = useState<ContactMessage[]>([]);

  // Connection metadata / Status of the Relational DB
  const [dbStatus, setDbStatus] = useState<string>("Obtention des informations du serveur...");
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  // On component mount, load data from the relational database API
  useEffect(() => {
    async function fetchDatabaseContent() {
      try {
        const response = await fetch("/api/portfolio-data");
        if (response.ok) {
          const result = await response.json();
          setProfile(result.profile);
          setEducationList(result.educationList);
          setExperienceProList(result.experienceProList);
          setExperienceBenevoleList(result.experienceBenevoleList);
          setProjectList(result.projectList);
          setSkillList(result.skillList);
          setCertificateList(result.certificateList);
          setTestimonialList(result.testimonialList);
          setDbStatus(result.status);
          
          // Also fetch messages
          const msgsResp = await fetch("/api/messages");
          if (msgsResp.ok) {
            const msgs = await msgsResp.json();
            setMessageList(msgs);
          }
          setIsDataLoaded(true);
        } else {
          console.warn("Failed to get response from database API. Keeping current state.");
          setDbStatus("Erreur serveur lors de la récupération des données.");
          setIsDataLoaded(true);
        }
      } catch (err) {
        console.error("Database fetch failed:", err);
        setDbStatus("Erreur de connexion avec le serveur de base de données.");
        setIsDataLoaded(true);
      }
    }
    fetchDatabaseContent();
  }, []);

  // SYNCHRONIZATION EFFECTS (Saves updates to relational DB only)
  useEffect(() => {
    if (!isDataLoaded) return;
    fetch("/api/portfolio-data/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile }),
    }).catch((err) => console.error("Failed to sync profile to DB:", err));
  }, [profile, isDataLoaded]);

  useEffect(() => {
    if (!isDataLoaded) return;
    fetch("/api/portfolio-data/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ educationList }),
    }).catch((err) => console.error("Failed to sync education to DB:", err));
  }, [educationList, isDataLoaded]);

  useEffect(() => {
    if (!isDataLoaded) return;
    fetch("/api/portfolio-data/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ experienceProList }),
    }).catch((err) => console.error("Failed to sync exppro to DB:", err));
  }, [experienceProList, isDataLoaded]);

  useEffect(() => {
    if (!isDataLoaded) return;
    fetch("/api/portfolio-data/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ experienceBenevoleList }),
    }).catch((err) => console.error("Failed to sync expbenevole to DB:", err));
  }, [experienceBenevoleList, isDataLoaded]);

  useEffect(() => {
    if (!isDataLoaded) return;
    fetch("/api/portfolio-data/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectList }),
    }).catch((err) => console.error("Failed to sync projects to DB:", err));
  }, [projectList, isDataLoaded]);

  useEffect(() => {
    if (!isDataLoaded) return;
    fetch("/api/portfolio-data/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skillList }),
    }).catch((err) => console.error("Failed to sync skills to DB:", err));
  }, [skillList, isDataLoaded]);

  useEffect(() => {
    if (!isDataLoaded) return;
    fetch("/api/portfolio-data/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ certificateList }),
    }).catch((err) => console.error("Failed to sync certificates to DB:", err));
  }, [certificateList, isDataLoaded]);

  useEffect(() => {
    if (!isDataLoaded) return;
    fetch("/api/portfolio-data/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ testimonialList }),
    }).catch((err) => console.error("Failed to sync testimonials to DB:", err));
  }, [testimonialList, isDataLoaded]);

  useEffect(() => {
    if (!isDataLoaded) return;
    fetch("/api/messages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messageList }),
    }).catch((err) => console.error("Failed to sync messages list to DB:", err));
  }, [messageList, isDataLoaded]);

  // Apply dark class to document root element
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("portfolio_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("portfolio_theme", "light");
    }
  }, [isDarkMode]);

  // Support hash router navigation for shortcut links like #admin / #login
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#admin") {
        if (isAdminAuthenticated) {
          setCurrentView("admin");
        } else {
          setCurrentView("login");
        }
      } else if (hash === "#login") {
        setCurrentView("login");
      } else {
        setCurrentView("portfolio");
      }
    };

    // Run on boot
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [isAdminAuthenticated]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const setViewOverrider = (view: "portfolio" | "login" | "admin") => {
    if (view === "admin" && !isAdminAuthenticated) {
      setCurrentView("login");
      window.location.hash = "#login";
    } else {
      setCurrentView(view);
      window.location.hash = view === "portfolio" ? "" : `#${view}`;
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    sessionStorage.setItem("portfolio_authenticated", "true");
    setCurrentView("admin");
    window.location.hash = "#admin";
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem("portfolio_authenticated");
    setCurrentView("portfolio");
    window.location.hash = "";
  };

  // Record contact inquiry from form submit
  const handleAddNewMessage = async (msgData: Omit<ContactMessage, "id" | "date" | "read" | "status">) => {
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msgData),
      });
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setMessageList((prev) => [result.message, ...prev]);
        }
      } else {
        throw new Error("API responded with an error code");
      }
    } catch (err) {
      console.error("Failed to submit contact message to relational DB:", err);
      // fallback to local optimistic state
      const newMsg: ContactMessage = {
        id: `msg-${Date.now()}`,
        name: msgData.name,
        email: msgData.email,
        subject: msgData.subject,
        message: msgData.message,
        date: new Date().toISOString(),
        read: false,
        status: "new",
      };
      setMessageList((prev) => [newMsg, ...prev]);
    }
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setTimeout(() => {
      const el = document.getElementById("projects");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 120);
  };

  const handleBackToCertificates = () => {
    setSelectedCertificate(null);
    setTimeout(() => {
      const el = document.getElementById("certificates");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 120);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Sticky Header Navbar */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        currentView={currentView}
        setView={setViewOverrider}
        adminName={profile.name}
        onResetProject={() => {
          setSelectedProject(null);
          setSelectedCertificate(null);
        }}
      />

      {/* Primary Layout switches */}
      <div className="flex-grow">
        {currentView === "portfolio" && (
          selectedProject ? (
            <div className="animate-in fade-in duration-500">
              <ProjectDetail project={selectedProject} onBack={handleBackToProjects} />
            </div>
          ) : selectedCertificate ? (
            <div className="animate-in fade-in duration-500">
              <CertificateDetail certificate={selectedCertificate} onBack={handleBackToCertificates} />
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              {/* Hero upper details page section */}
              <Hero profile={profile} />

              {/* About text grid section */}
              <About
                profile={profile}
                projectCount={projectList.length}
                certCount={certificateList.length}
                skillCount={skillList.length}
              />

              {/* vertical education timelines */}
              <EducationComp educationList={educationList} />

              {/* Work experience and volunteer tasks */}
              <Experience
                experienceProList={experienceProList}
                experienceBenevoleList={experienceBenevoleList}
              />

              {/* projects thumbnail grids with detail page triggers */}
              <Projects projectList={projectList} onSelectProject={setSelectedProject} />

              {/* Mastered technologies percentages */}
              <Skills skillList={skillList} />

              {/* Credentials credentials checklists */}
              <Certificates certificateList={certificateList} onSelectCertificate={setSelectedCertificate} />

              {/* recommendations sliding cards */}
              <Testimonials testimonialList={testimonialList} />

              {/* contact submission sheets */}
              <Contact profile={profile} onSendMessage={handleAddNewMessage} />
            </div>
          )
        )}

        {currentView === "login" && (
          <AdminLogin
            onLoginSuccess={handleAdminLoginSuccess}
            setView={() => setViewOverrider("portfolio")}
          />
        )}

        {currentView === "admin" && isAdminAuthenticated && (
          <AdminDashboard
            profile={profile}
            educationList={educationList}
            experienceProList={experienceProList}
            experienceBenevoleList={experienceBenevoleList}
            projectList={projectList}
            skillList={skillList}
            certificateList={certificateList}
            testimonialList={testimonialList}
            messageList={messageList}
            onUpdateProfile={setProfile}
            onSetEducationList={setEducationList}
            onSetExperienceProList={setExperienceProList}
            onSetExperienceBenevoleList={setExperienceBenevoleList}
            onSetProjectList={setProjectList}
            onSetSkillList={setSkillList}
            onSetCertificateList={setCertificateList}
            onSetTestimonialList={setTestimonialList}
            onSetMessageList={setMessageList}
            onLogout={handleAdminLogout}
          />
        )}
      </div>

      {currentView === "portfolio" && <ChatAssistant profileName={profile.name} profileTitle={profile.title} />}

      {/* Main Footer layout */}
      <Footer
        profile={profile}
        setView={setViewOverrider}
        currentView={currentView}
      />

    </div>
  );
}
