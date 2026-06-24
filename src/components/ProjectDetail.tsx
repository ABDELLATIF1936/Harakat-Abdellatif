import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  ShieldAlert,
  BadgeCheck,
  Calendar,
  Code,
  Globe,
  Tag,
  Rocket,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon
} from "lucide-react";
import { Project } from "../types";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  // Normalize the list of images to display. At least has project.imageUrl
  const projectImages = project.imageUrls && project.imageUrls.length > 0
    ? project.imageUrls
    : [project.imageUrl];

  const [activeIndex, setActiveIndex] = useState(0);

  // Reset active image index when the project changes
  useEffect(() => {
    setActiveIndex(0);
  }, [project.id]);
  // Ensure we start at the top of the details page on render
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [project.id]);

  const getProjectCategory = (proj: Project): string => {
    const text = (proj.title + " " + proj.description + " " + proj.tags.join(" ")).toLowerCase();
    
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

  return (
    <div id="project-detail-page" className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation line */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-sm transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform duration-300 text-indigo-500" />
            Retour aux projets
          </button>
        </motion.div>

        {/* Hero Section of the Project */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left: General Info and Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50/60 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold border border-indigo-100/30 dark:border-indigo-900/10 uppercase tracking-wider">
              <Rocket className="w-3.5 h-3.5" />
              {getProjectCategory(project)}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              {project.description}
            </p>

            {/* Quick overview of key stack in Hero section */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-semibold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-150 dark:border-slate-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons in Hero section */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-bold text-sm shadow-xs transition duration-300 cursor-pointer"
              >
                <Github className="w-4 h-4" />
                Consulter le Code Source
              </a>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-650/10 hover:shadow-lg transition duration-300 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visiter le Site / Démo Live
                </a>
              )}
            </div>
          </motion.div>

          {/* Right: Immersive graphic / Mockup layout with multiple images slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 relative flex flex-col items-center"
          >
            {/* Glowing Golden Backlight effect */}
            <div className="absolute -inset-1 rounded-3xl bg-indigo-500/10 dark:bg-indigo-500/15 blur-xl pointer-events-none" />
            
            <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-xl aspect-4/3 w-full group">
              {/* Sliding / Crossfading Image wrapper */}
              <div className="w-full h-full relative bg-slate-100 dark:bg-slate-950 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    src={projectImages[activeIndex]}
                    alt={`${project.title} - Image ${activeIndex + 1}`}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Overlaid sliding Navigation controls (if there are multiple images) */}
              {projectImages.length > 1 && (
                <>
                  {/* Left arrow */}
                  <button
                    onClick={() => setActiveIndex((prev) => (prev === 0 ? projectImages.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-950 text-white border border-slate-800/40 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg cursor-pointer hover:scale-105 active:scale-95 animate-duration-300"
                    title="Image précédente"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Right arrow */}
                  <button
                    onClick={() => setActiveIndex((prev) => (prev === projectImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-950 text-white border border-slate-800/40 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg cursor-pointer hover:scale-105 active:scale-95 animate-duration-300"
                    title="Image suivante"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Counter Badge */}
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-slate-950/80 text-white font-mono text-xs border border-white/10 select-none flex items-center gap-1.5 shadow-md backdrop-blur-xs">
                    <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{activeIndex + 1} / {projectImages.length}</span>
                  </div>
                </>
              )}
            </div>

            {/* Micro Thumbnail indicators below for seamless selection (if there are multiple images) */}
            {projectImages.length > 1 && (
              <div className="flex flex-wrap gap-2.5 mt-4 justify-center relative z-10">
                {projectImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-16 h-12 rounded-xl overflow-hidden transition-all duration-300 active:scale-95 shrink-0 select-none border-2 cursor-pointer ${
                      activeIndex === idx
                        ? "border-indigo-600 dark:border-indigo-500 scale-105 shadow-md opacity-100"
                        : "border-transparent hover:border-slate-300 dark:hover:border-slate-800 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Miniature ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

        </div>

        {/* Detailed Page Content and Case Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-slate-100 dark:border-slate-900 pt-12">
          
          {/* Main Content Column (70%) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Detailed Case Study / Description */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <span className="w-1.5 h-6 rounded-full bg-indigo-500" />
                Présentation Détaillée du Projet
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 text-base font-medium">
                {(project.longDescription || project.description)
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
              </div>
            </motion.div>

            {/* Challenges & Technical Solutions */}
            {project.challenges && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="p-6 sm:p-8 rounded-3xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/15 dark:border-indigo-500/20 space-y-4 shadow-2xs"
              >
                <h3 className="font-display text-lg font-bold text-indigo-850 dark:text-indigo-400 flex items-center gap-2.5 leading-none">
                  <ShieldAlert className="w-5 h-5 text-indigo-500" />
                  Défis Techniques & Solutions Apportées
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-semibold">
                  {project.challenges}
                </p>
              </motion.div>
            )}

            {/* Technical Best Practices implemented */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <span className="w-1.5 h-6 rounded-full bg-indigo-500" />
                Piliers de Développement & Méthodologie
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-900 shadow-3xs flex gap-3.5">
                  <div className="h-9 w-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                    <Code className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Qualité de Code & Tests</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold leading-relaxed">
                      Conception modulaire et application rigoureuse des normes de Clean Code pour un produit durable.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-900 shadow-3xs flex gap-3.5">
                  <div className="h-9 w-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                    <Globe className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Performance & SEO</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold leading-relaxed">
                      Optimisation des assets et structure sémantique soignée garantissant fluidité et visibilité web optimale.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Sidebar Metadata Column (30%) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Key Information Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-150 dark:border-slate-850 shadow-sm space-y-6"
            >
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <Tag className="w-4.5 h-4.5 text-indigo-500" />
                Détails du Projet
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-400 uppercase tracking-widest">Catégorie</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{getProjectCategory(project)}</span>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-400 uppercase tracking-widest">Type</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Full-Stack / Frontend</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-400 uppercase tracking-widest">Statut</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Complété
                  </span>
                </div>
              </div>

              {/* Quick Call to Action buttons on Sidebar */}
              {project.demoUrl && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Ouvrir la Démo en Direct
                  </a>
                </div>
              )}
            </motion.div>

            {/* Complete Stack details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-150 dark:border-slate-850 shadow-sm space-y-4"
            >
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-500" />
                Technologies Utilisées
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-indigo-50/40 dark:bg-slate-950/40 dark:hover:bg-indigo-950/20 text-slate-700 dark:text-slate-300 rounded-xl border border-slate-200/50 dark:border-slate-800/80 transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>

        </div>

        {/* Bottom Back trigger button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-16 text-center border-t border-slate-100 dark:border-slate-900 pt-12"
        >
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500 font-bold text-sm transition"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform duration-300 text-indigo-500" />
            Retour à la liste des projets
          </button>
        </motion.div>

      </div>
    </div>
  );
}
