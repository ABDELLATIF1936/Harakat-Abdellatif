import { useState } from "react";
import { motion } from "motion/react";
import { Award, Calendar, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Certificate } from "../types";

interface CertificatesProps {
  certificateList: Certificate[];
  onSelectCertificate: (cert: Certificate) => void;
}

export default function Certificates({ certificateList, onSelectCertificate }: CertificatesProps) {
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const visibleCertificates = certificateList
    .filter((cert) => cert.visible)
    .sort((a, b) => a.order - b.order);
  const displayedCertificates = showAllCertificates ? visibleCertificates : visibleCertificates.slice(0, 6);
  const hasMoreCertificates = visibleCertificates.length > 6;

  return (
    <section id="certificates" className="py-24 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Certifications & Formations Externes
          </h2>
          <div className="w-16 h-1.5 bg-indigo-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 mt-5">
            Validation de mes connaissances techniques à travers des organismes professionnels reconnus mondialement.
          </p>
        </div>

        {/* Grid display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCertificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => onSelectCertificate(cert)}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500/85 hover:scale-[1.01] transition-all duration-305 flex flex-col h-full group overflow-hidden cursor-pointer"
            >
              <div className="p-6 flex flex-row items-start gap-4">
                {/* Badge thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0 border border-slate-100 dark:border-slate-800">
                  <img
                    src={cert.imageUrl}
                    alt={cert.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-xs font-mono uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Certifié
                  </div>
                  <h3 className="font-display text-base font-bold text-slate-800 dark:text-white line-clamp-2 leading-snug">
                    {cert.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-450 uppercase">
                    {cert.issuer}
                  </p>
                </div>
              </div>

              {/* Bottom detail action row */}
              <div className="mt-auto px-6 pb-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  {cert.issueDate}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCertificate(cert);
                  }}
                  className="inline-flex items-center gap-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline group-hover:translate-x-0.5 transition-transform cursor-pointer"
                >
                  Vérifier
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
          {displayedCertificates.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-400">
              Aucun certificat disponible à afficher.
            </div>
          )}
        </div>
        {hasMoreCertificates && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAllCertificates((prev) => !prev)}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition"
            >
              {showAllCertificates ? "Voir moins" : "Voir plus"}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
