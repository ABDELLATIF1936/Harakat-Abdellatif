import { motion } from "motion/react";
import { Github, Linkedin, Mail, ArrowRight, Download, Play, Leaf } from "lucide-react";
import { Profile } from "../types";

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  const photoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, delay: 0.1 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 bg-gradient-to-b from-indigo-50/20 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden"
    >
      {/* Visual background accents */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-indigo-200/40 dark:bg-indigo-950/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-indigo-100/30 dark:bg-emerald-950/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text details column */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Elegant upper sub-badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-400 text-xs font-mono tracking-wide"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              Disponible pour stage • M1 Réseaux & Systèmes Informatiques
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
            >
              HARAKAT {" "}
              <span className="text-indigo-600 dark:text-indigo-400 block">
                ABDELLATIF
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-medium"
            >
              Développeur passionné par le <strong className="text-slate-950 dark:text-white font-extrabold">Web,</strong> le Mobile et les AI Agents — <strong className="text-slate-950 dark:text-white font-extrabold"> je conçois des architectures logicielles modernes,</strong> performantes et évolutives.
            </motion.p>

            {/* Custom Metrics Line from JobInTech Layout */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 pt-1"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 block animate-pulse"></span>
                <strong>+28</strong> Compétences techniques
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 block animate-pulse"></span>
                <strong> Full Stack </strong> Web & Mobile
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 block animate-pulse"></span>
                <strong>AI Agents</strong>& Automatisation.
              </span>
            </motion.div>

            {/* CTA action buttons based exactly on screenshots */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <a
                href={profile.cvUrl}
                download
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-600 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50/50 font-extrabold text-sm active:scale-98 transition-all shadow-sm cursor-pointer"
              >
                <span>Télécharger mon CV</span>
                <Play className="w-3 h-3 fill-indigo-600 text-indigo-600 rotate-0" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-98 transition-all cursor-pointer"
              >
                <span>Me contacter</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Social Network badges */}
            <motion.div variants={itemVariants} className="flex items-center gap-5 pt-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white p-2 bg-slate-100 dark:bg-slate-800 hover:scale-110 rounded-lg transition"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 p-2 bg-slate-100 dark:bg-slate-800 hover:scale-110 rounded-lg transition"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 p-2 bg-slate-100 dark:bg-slate-800 hover:scale-110 rounded-lg transition"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Photo Column */}
          <motion.div
            className="lg:col-span-5 flex justify-center items-center"
            variants={photoVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative group">
              {/* Outer decorative gradient border */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-3xl blur opacity-30 group-hover:opacity-55 transition duration-1000 group-hover:duration-200" />

              {/* Card Container */}
              <div className="relative bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl max-w-sm">
                <img
                  src={profile.photoUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-80 object-cover rounded-2xl grayscale hover:grayscale-0 transition duration-500"
                />
                <div className="mt-4 text-center">
                  <p className="font-display font-bold text-lg text-slate-800 dark:text-slate-100">{profile.name}</p>
                  <p className="text-xs font-mono text-indigo-500 dark:text-indigo-400">@abdellatif-harakat</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
