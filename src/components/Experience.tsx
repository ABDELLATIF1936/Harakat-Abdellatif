import { motion } from "motion/react";
import { useState } from "react";
import { Briefcase, Heart, Calendar, MapPin, Tag } from "lucide-react";
import { ExperiencePro, ExperienceBenevole } from "../types";

interface ExperienceProps {
  experienceProList: ExperiencePro[];
  experienceBenevoleList: ExperienceBenevole[];
}

export default function Experience({
  experienceProList,
  experienceBenevoleList,
}: ExperienceProps) {
  const [showAllPro, setShowAllPro] = useState(false);
  const [showAllBenevole, setShowAllBenevole] = useState(false);

  const visiblePro = experienceProList
    .filter((exp) => exp.visible)
    .sort((a, b) => a.order - b.order);
  const visibleBenevole = experienceBenevoleList
    .filter((exp) => exp.visible)
    .sort((a, b) => a.order - b.order);
  const displayedPro = showAllPro ? visiblePro : visiblePro.slice(0, 3);
  const displayedBenevole = showAllBenevole ? visibleBenevole : visibleBenevole.slice(0, 3);
  const hasMorePro = visiblePro.length > 3;
  const hasMoreBenevole = visibleBenevole.length > 3;

  return (
    <section id="experience" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Expérience & Engagements
          </h2>
          <div className="w-16 h-1.5 bg-indigo-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 mt-5">
            Retour sur mes expériences professionnelles en entreprise et mes implications associatives bénévoles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Professional Experience Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-indigo-600 dark:text-indigo-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-800 dark:text-slate-100">
                Expérience Professionnelle
              </h3>
            </div>

            <div className="space-y-6 relative pl-4 border-l-2 border-indigo-100 dark:border-indigo-950">
              {displayedPro.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="relative group bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition"
                >
                  {/* Circle locator node */}
                  <div className="absolute top-8 -left-[25px] w-4 h-4 rounded-full bg-indigo-600 border-4 border-white dark:border-slate-900 transition-colors group-hover:bg-indigo-400" />
                  
                  {/* Header info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-lg font-bold font-display text-slate-800 dark:text-white">
                        {exp.role}
                      </h4>
                      <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                        {exp.company}
                      </p>
                    </div>
                    {exp.logoUrl && (
                      <img
                        src={exp.logoUrl}
                        alt={exp.company}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700 sm:self-center"
                      />
                    )}
                  </div>

                  {/* Period & Location tags */}
                  <div className="flex flex-wrap gap-3 mb-4 text-xs font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg w-fit">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Description text */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Tags technologies */}
                  {exp.tags && exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <Tag className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 mr-1" />
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-750"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              {visiblePro.length === 0 && (
                <div className="text-slate-400 text-sm py-4">Aucune expérience enregistrée.</div>
              )}
              {hasMorePro && (
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => setShowAllPro((prev) => !prev)}
                    className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition"
                  >
                    {showAllPro ? "Voir moins" : "Voir plus"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Volunteer Association Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl text-teal-600 dark:text-teal-400">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-800 dark:text-slate-100">
                Engagement Bénévole
              </h3>
            </div>

            <div className="space-y-6 relative pl-4 border-l-2 border-teal-100 dark:border-teal-950">
              {displayedBenevole.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="relative group bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition"
                >
                  {/* Circle locator node */}
                  <div className="absolute top-8 -left-[25px] w-4 h-4 rounded-full bg-teal-500 border-4 border-white dark:border-slate-900 transition-colors group-hover:bg-teal-400" />
                  
                  {/* Badge Bénévolat overlay */}
                  <span className="absolute top-6 right-6 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-100 dark:border-teal-900">
                    Bénévolat
                  </span>

                  {/* Header info */}
                  <div className="mb-4 pr-16 select-none">
                    <h4 className="text-lg font-bold font-display text-slate-800 dark:text-white">
                      {exp.role}
                    </h4>
                    <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm">
                      {exp.organization}
                    </p>
                  </div>

                  {/* Period & Location tags */}
                  <div className="flex flex-wrap gap-3 mb-4 text-xs font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg w-fit">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-teal-500" />
                      {exp.period}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-teal-500" />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  {/* Description text */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Tags */}
                  {exp.tags && exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <Tag className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 mr-1" />
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-750"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              {visibleBenevole.length === 0 && (
                <div className="text-slate-400 text-sm py-4">Aucun engagement associatif enregistré.</div>
              )}
              {hasMoreBenevole && (
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => setShowAllBenevole((prev) => !prev)}
                    className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-teal-600 text-white text-sm font-semibold hover:bg-teal-500 transition"
                  >
                    {showAllBenevole ? "Voir moins" : "Voir plus"}
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
