import { motion } from "motion/react";
import { useState } from "react";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { Education } from "../types";

interface EducationProps {
  educationList: Education[];
}

export default function EducationComp({ educationList }: EducationProps) {
  const [showAllEducation, setShowAllEducation] = useState(false);

  // Only display visible ones on the user portfolio, sorted by order
  const visibleEducation = educationList
    .filter((edu) => edu.visible)
    .sort((a, b) => a.order - b.order);
  const displayedEducation = showAllEducation ? visibleEducation : visibleEducation.slice(0, 3);
  const hasMoreEducation = visibleEducation.length > 3;

  return (
    <section id="education" className="py-24 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Formation & Éducation
          </h2>
          <div className="w-16 h-1.5 bg-indigo-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 mt-5">
            Mon parcours académique et mes diplômes de l'enseignement supérieur.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central path line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-indigo-100 dark:bg-indigo-950" />

          <div className="space-y-12">
            {displayedEducation.map((edu, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Badge center node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-indigo-600 text-white shadow-md border-4 border-white dark:border-slate-900">
                    <GraduationCap className="w-4 h-4" />
                  </div>

                  {/* Card Block */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                    isEven ? "md:pr-12 text-left" : "md:pl-12 text-left"
                  }`}>
                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700 transition">
                      
                      {/* School & Period badge */}
                      <div className={`flex flex-wrap items-center gap-2 mb-3 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 justify-start`}>
                        <span className="inline-flex items-center gap-1 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-md">
                          <Calendar className="w-3.5 h-3.5" />
                          {edu.period}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-md">
                          <MapPin className="w-3.5 h-3.5" />
                          {edu.location}
                        </span>
                      </div>

                      {/* Degree Name */}
                      <h4 className="text-xl font-bold font-display text-slate-800 dark:text-white mb-2">
                        {edu.degree}
                      </h4>

                      {/* School Name */}
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider">
                        {edu.school}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed mb-4">
                        {edu.description}
                      </p>

                      {/* Grade Mention badge */}
                      {edu.grade && (
                        <div className={`inline-flex items-center gap-1.5 p-1.5 px-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 text-xs font-semibold mb-2`}>
                          <Award className="w-3.5 h-3.5" />
                          {edu.grade}
                        </div>
                      )}
                      
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {hasMoreEducation && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setShowAllEducation((prev) => !prev)}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition"
              >
                {showAllEducation ? "Voir moins" : "Voir plus"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
