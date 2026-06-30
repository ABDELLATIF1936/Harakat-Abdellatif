import { Github, Linkedin, Mail, ShieldAlert } from "lucide-react";
import { Profile } from "../types";

interface FooterProps {
  profile: Profile;
  setView: (view: "portfolio" | "admin" | "login") => void;
  currentView: "portfolio" | "admin" | "login";
}

export default function Footer({ profile, setView, currentView }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="main-footer" className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
          
          {/* Column 1 - Brand description */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm leading-none font-bold">
                AM
              </span>
              <span className="font-display font-bold text-lg text-white">
                {profile.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">
              Étudiant en Master Informatique passionné par le développement d'applications innovantes, performantes et éco-conçues.
            </p>
          </div>

          {/* Column 2 - Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-350">
              Navigation Rapide
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button
                onClick={() => handleNavClick("#home")}
                className="hover:text-indigo-400 text-left transition"
              >
                Accueil
              </button>
              <button
                onClick={() => handleNavClick("#education")}
                className="hover:text-indigo-400 text-left transition"
              >
                Éducation
              </button>
              <button
                onClick={() => handleNavClick("#projects")}
                className="hover:text-indigo-400 text-left transition"
              >
                Projets
              </button>
              <button
                onClick={() => handleNavClick("#skills")}
                className="hover:text-indigo-400 text-left transition"
              >
                Compétences
              </button>
              <button
                onClick={() => handleNavClick("#certificates")}
                className="hover:text-indigo-400 text-left transition"
              >
                Certificats
              </button>
              <button
                onClick={() => handleNavClick("#contact")}
                className="hover:text-indigo-400 text-left transition"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Column 3 - Social icons & contact shortcut */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-350">
              Réseaux & Contact
            </h4>
            <div className="flex items-center gap-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-400 hover:scale-105 transition"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-400 hover:scale-105 transition"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-indigo-400 hover:scale-105 transition"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            <div className="pt-2 text-xs">
              <span className="block text-slate-500">Localisation actuelle :</span>
              <span className="text-slate-300 font-semibold">{profile.location}</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright & admin dashboard portal trigger */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 text-center sm:text-left">
            &copy; {currentYear} {profile.name}. Tous droits réservés.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-slate-500 hidden sm:inline">|</span>
            {currentView === "portfolio" ? (
              <button
                id="footer-admin-link"
                onClick={() => setView("home")}
                className="inline-flex items-center gap-1 text-slate-500 hover:text-indigo-400 transition"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                Tableau de bord Administeur - Accès réservé
              </button>
            ) : (
              <button
                onClick={() => setView("portfolio")}
                className="text-slate-500 hover:text-indigo-400 transition"
              >
                Retourner à l'affichage public
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
