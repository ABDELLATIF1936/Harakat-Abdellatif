import { useState } from "react";
import { motion } from "motion/react";
import { Code2, ToyBrick, Wrench, Sparkles } from "lucide-react";
import { Skill } from "../types";

interface SkillsProps {
  skillList: Skill[];
}

export default function Skills({ skillList }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<
    "all" | "languages" | "frameworks" | "tools" | "soft_skills"
  >("all");

  const visibleSkills = skillList.filter((sk) => sk.visible);

  const categories = [
    { value: "all", label: "Toutes", icon: null },
    { value: "languages", label: "Langages", icon: Code2 },
    { value: "frameworks", label: "Frameworks & Librairies", icon: ToyBrick },
    { value: "tools", label: "Outils & DevOps", icon: Wrench },
    { value: "soft_skills", label: "Soft Skills", icon: Sparkles },
  ];

  const filteredSkills =
    activeCategory === "all"
      ? visibleSkills
      : visibleSkills.filter((sk) => sk.category === activeCategory);

  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Compétences Techniques & Humaines
          </h2>
          <div className="w-16 h-1.5 bg-indigo-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 mt-5">
            Mon écosystème de compétences classé par domaine de spécialisation et mon degré d'expertise associé.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value as any)}
                className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold tracking-normal transition duration-300 cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-slate-750"
                }`}
              >
                {IconComp && <IconComp className="w-3.5 h-3.5" />}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredSkills.map((skill) => {
            // Pick visual decorations based on category
            const getCategoryTag = (cat: string) => {
              switch (cat) {
                case "languages":
                  return { label: "Langage", border: "border-indigo-200 dark:border-indigo-900/35", text: "text-indigo-600 dark:text-indigo-400" };
                case "frameworks":
                  return { label: "Framework", border: "border-teal-200 dark:border-teal-900/35", text: "text-teal-600 dark:text-teal-400" };
                case "tools":
                  return { label: "DevOps / Outil", border: "border-rose-200 dark:border-rose-900/35", text: "text-rose-600 dark:text-rose-400" };
                default:
                  return { label: "Humain", border: "border-amber-200 dark:border-amber-900/35", text: "text-amber-600 dark:text-amber-400" };
              }
            };
            const meta = getCategoryTag(skill.category);

            return (
              <motion.div
                layout
                key={skill.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-xs group hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${meta.border} ${meta.text}`}>
                      {meta.label}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-450">
                      {skill.level}%
                    </span>
                  </div>
                  
                  <h4 className="text-base font-bold text-slate-800 dark:text-white mb-4">
                    {skill.name}
                  </h4>
                </div>

                {/* Level master bar */}
                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full group-hover:bg-indigo-500 dark:group-hover:bg-indigo-400 transition-colors"
                  />
                </div>
              </motion.div>
            );
          })}
          {filteredSkills.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-400">
              Aucune compétence disponible dans cette catégorie.
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
