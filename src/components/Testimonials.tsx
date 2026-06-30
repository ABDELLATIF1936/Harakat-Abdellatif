import { useState } from "react";
import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { Testimonial } from "../types";

interface TestimonialsProps {
  testimonialList: Testimonial[];
}

export default function Testimonials({ testimonialList }: TestimonialsProps) {
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  const visibleTestimonials = testimonialList.filter((test) => test.visible);
  const displayedTestimonials = showAllTestimonials ? visibleTestimonials : visibleTestimonials.slice(0, 3);
  const hasMoreTestimonials = visibleTestimonials.length > 3;

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Recommandations & Témoignages
          </h2>
          <div className="w-16 h-1.5 bg-indigo-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 mt-5">
            Ce que disent de moi mes professeurs de Master, responsables de stage et partenaires de projets.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedTestimonials.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative p-8 rounded-3xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100/60 dark:border-indigo-900/40 flex flex-col justify-between hover:shadow-lg transition duration-300"
            >
              {/* Decorative Quotation Mark in Corner */}
              <div className="absolute top-6 right-8 text-indigo-400/20 dark:text-indigo-500/10 pointer-events-none">
                <Quote className="w-12 h-12 stroke-[3]" />
              </div>

              {/* Feedbacks / Comment */}
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className={`w-4 h-4 fill-current ${
                        starIdx < test.rating ? "text-amber-400" : "text-slate-200 dark:text-slate-700"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic relative z-10">
                  "{test.feedback}"
                </p>
              </div>

              {/* Autor info block */}
              <div className="flex items-center gap-4 mt-8 pt-4 border-t border-slate-200/50 dark:border-slate-800/80">
                <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 border bg-slate-100 dark:bg-slate-800 border-indigo-100 dark:border-indigo-900/35">
                  <img
                    src={test.avatarUrl}
                    alt={test.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150";
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                    {test.name}
                  </h4>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-450 line-clamp-1">
                    {test.role}, <strong className="font-semibold text-indigo-600 dark:text-indigo-400">{test.company}</strong>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          {displayedTestimonials.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-400">
              Aucun témoignage enregistré pour le moment.
            </div>
          )}
        </div>
        {hasMoreTestimonials && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAllTestimonials((prev) => !prev)}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition"
            >
              {showAllTestimonials ? "Voir moins" : "Voir plus"}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
