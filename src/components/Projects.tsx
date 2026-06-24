import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, ArrowRight, X, ShieldAlert, BadgeCheck } from "lucide-react";
import { Project } from "../types";

interface ProjectsProps {
  projectList: Project[];
  onSelectProject: (project: Project) => void;
}

export default function Projects({ projectList, onSelectProject }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Tous");

  const getProjectCategory = (project: Project): string => {
    const text = (project.title + " " + project.description + " " + project.tags.join(" ")).toLowerCase();
    
    if (text.includes("saas") || text.includes("mobile") || text.includes("app mobile") || text.includes("pytorch") || text.includes("fastapi") || text.includes("neuroinsight") || text.includes("analyse") || text.includes("ia")) {
      return "SaaS & Applications Mobiles";
    }
    if (text.includes("e-commerce") || text.includes("commerce") || text.includes("boutique") || text.includes("stock") || text.includes("archivault") || text.includes("chiffré") || text.includes("crypto")) {
      return "Sites E-commerce";
    }
    if (text.includes("vitrine") || text.includes("corporate") || text.includes("business") || text.includes("landing") || text.includes("ecodeploy") || text.includes("kubernetes")) {
      return "Sites Vitrines & Corporate";
    }
    return "Autres Projets & Open Source";
  };

  const categories = [
    "Tous",
    "SaaS & Applications Mobiles",
    "Sites E-commerce",
    "Sites Vitrines & Corporate",
    "Autres Projets & Open Source"
  ];

  const visibleProjects = projectList
    .filter((proj) => proj.visible)
    .filter((proj) => activeCategory === "Tous" || getProjectCategory(proj) === activeCategory);

  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Projets & Réalisations
          </h2>
          <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 mt-5 font-medium max-w-xl mx-auto">
            Découvrez mes développements catégorisés par types d'applications et solutions métiers.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto px-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4.5 py-2 rounded-full text-xs font-bold tracking-normal transition duration-300 cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-800 hover:text-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              {/* Card Image Cover */}
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-white/95 text-slate-800 hover:text-indigo-600 rounded-lg shadow transition"
                      onClick={(e) => e.stopPropagation()}
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg shadow transition"
                        onClick={(e) => e.stopPropagation()}
                        title="Demo Live"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Contents */}
              <div className="flex flex-col flex-grow p-6">
                <div className="flex-grow space-y-3">
                  <h3 className="font-display text-xl font-bold text-slate-850 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                    {project.description}
                  </p>

                  {/* List of Technology badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-xs font-semibold bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 rounded-md border border-indigo-100/30 dark:border-indigo-900/10"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2.5 py-0.5 text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Button */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800/55 dark:hover:bg-indigo-950/40 text-slate-700 hover:text-indigo-700 dark:text-slate-350 dark:hover:text-indigo-400 text-sm font-semibold transition cursor-pointer"
                  >
                    Voir plus de détails
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {visibleProjects.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-400">
              Aucun projet disponible à afficher pour l'instant.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
