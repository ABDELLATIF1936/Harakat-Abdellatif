import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Award, Briefcase, Code, MapPin, Milestone } from "lucide-react";
import { Profile } from "../types";

interface AboutProps {
  profile: Profile;
  projectCount: number;
  certCount: number;
  skillCount: number;
}

function AnimatedCounter({ value }: { value: number | string }) {
  const [current, setCurrent] = useState(0);
  const numericValue = typeof value === "number" ? value : parseInt(value, 15);
  const isPlus = typeof value === "string" && value.includes("+");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isNaN(numericValue)) return;

    let observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = numericValue;
          if (start === end) {
            setCurrent(end);
            return;
          }
          const duration = 1500; // 1.5 seconds animation space
          const startTime = performance.now();

          const animate = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            const currentVal = Math.floor(easeProgress * end);
            setCurrent(currentVal);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCurrent(end);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [numericValue]);

  return (
    <span ref={ref} className="tabular-nums">
      {current}
      {isPlus && "+"}
    </span>
  );
}

export default function About({ profile, projectCount, certCount, skillCount }: AboutProps) {
  const stats = [
    {
      id: "stat1",
      label: "Projets Développés",
      value: projectCount,
      icon: Code,
      color: "text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900/60 shadow-xs border border-indigo-100/40 dark:border-indigo-950/30",
    },
    {
      id: "stat2",
      label: "Certifications",
      value: certCount,
      icon: Award,
      color: "text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900/60 shadow-xs border border-indigo-100/40 dark:border-indigo-950/30",
    },
    {
      id: "stat3",
      label: "Compétences Tech",
      value: skillCount,
      icon: Milestone,
      color: "text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900/60 shadow-xs border border-indigo-100/40 dark:border-indigo-950/30",
    },
    {
      id: "stat4",
      label: "Années d'Expérience",
      value: "2+",
      icon: Briefcase,
      color: "text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900/60 shadow-xs border border-indigo-100/40 dark:border-indigo-950/30",
    },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            À propos de moi
          </h2>
          <div className="w-16 h-1.5 bg-indigo-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 mt-5">
            Découvrez mon parcours académique, mes aspirations professionnelles et mes axes d'intérêt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block - Text Bio */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              Qui suis-je ?
            </h3>
            
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {profile.bio}
            </p>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Mon parcours m'a permis d'acquérir une double compétence précieuse : la maîtrise pratique du développement full-stack moderne (intégration continue, architecture modulaire) et les concepts solides de l'intelligence artificielle (deep learning, pipelines de traitement de données). Je suis particulièrement attaché à la propreté du code, au respect des standards d'accessibilité et de performance, et à la documentation de mes architectures.
            </p>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <MapPin className="w-5 h-5 text-indigo-500" />
                <span> Localisation : <strong className="font-semibold">{profile.location}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Briefcase className="w-5 h-5 text-indigo-500" />
                <span> Statut : <strong className="font-semibold">{profile.status || "Recherche d'alternance"}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Block - Dynamic Stats Dashboard Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/60 dark:border-indigo-900/40 flex flex-col justify-between h-40 hover:shadow-lg hover:scale-[1.03] duration-300 transition"
                >
                  <div className={`p-3 rounded-xl w-fit ${stat.color}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                      <AnimatedCounter value={stat.value} />
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
