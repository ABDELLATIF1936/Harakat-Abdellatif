import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ExternalLink,
  Award,
  Calendar,
  ShieldCheck,
  Building,
  CheckCircle,
  FileText,
  X
} from "lucide-react";
import { Certificate } from "../types";

interface CertificateDetailProps {
  certificate: Certificate;
  onBack: () => void;
}

export default function CertificateDetail({ certificate, onBack }: CertificateDetailProps) {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Ensure we start at the top of the details page on render
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [certificate.id]);

  return (
    <div id="certificate-detail-page" className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation button */}
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
            Retour aux certifications
          </button>
        </motion.div>

        {/* Certificate Hero Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left: General Info and Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-550/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-500/10 uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              Certification Officielle Active
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {certificate.name}
            </h1>

            <div className="flex flex-col gap-3 pt-2 text-slate-600 dark:text-slate-350">
              <div className="flex items-center gap-2.5 text-sm font-semibold">
                <Building className="w-4 h-4 text-indigo-500" />
                <span>Organisme émetteur : <span className="text-slate-900 dark:text-white font-bold">{certificate.issuer}</span></span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold">
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span>Date d'octroi : <span className="text-slate-900 dark:text-white font-bold">{certificate.issueDate}</span></span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-650/10 hover:shadow-lg transition duration-300 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                Vérifier le diplôme en direct
              </a>
            </div>
          </motion.div>

          {/* Right: Immersive Display of the Certificate Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Glowing Golden Backlight effect */}
            <div className="absolute -inset-1 rounded-3xl bg-indigo-500/10 dark:bg-indigo-500/15 blur-xl pointer-events-none" />
            
            <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-xl aspect-[4/3] w-full flex items-center justify-center p-4">
              <button
                type="button"
                onClick={() => setIsZoomOpen(true)}
                className="absolute inset-0 z-10"
                aria-label="Agrandir l'image du certificat"
              />
              <div className="w-full h-full relative rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-2">
                <img
                  src={certificate.imageUrl}
                  alt={certificate.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain cursor-zoom-in"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsZoomOpen(true)}
                className="absolute right-4 top-4 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 text-slate-700 dark:bg-slate-900/90 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-100 transition"
              >
                Agrandir
              </button>
            </div>
          </motion.div>

        </div>

        {/* Detailed Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 dark:border-slate-900 pt-12">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-150 dark:border-slate-850 shadow-sm space-y-4"
          >
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-indigo-500" />
              Statut de vérification
            </h3>
            
            <div className="space-y-4 text-xs font-semibold text-slate-600 dark:text-slate-350 pt-2">
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 uppercase tracking-widest font-bold">Identifiant de certification</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 uppercase">Valide / Certifié</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 uppercase tracking-widest font-bold">Organisme émetteur</span>
                <span className="text-slate-800 dark:text-slate-200">{certificate.issuer}</span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400 uppercase tracking-widest font-bold">Statut de validité</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                  ✓ Vérifié
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-150 dark:border-slate-850 shadow-sm space-y-4"
          >
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" />
              Impact professionnel
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold leading-relaxed pt-2">
              {certificate.impactProfessionnel || "Aucun impact professionnel renseigné pour ce certificat."}
            </p>
          </motion.div>

        </div>

        <AnimatePresence>
          {isZoomOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-700"
              >
                <button
                  type="button"
                  onClick={() => setIsZoomOpen(false)}
                  className="absolute right-4 top-4 z-20 inline-flex items-center justify-center rounded-full bg-slate-950/90 text-slate-100 p-2 shadow-lg hover:bg-slate-900"
                  aria-label="Fermer l'aperçu"
                >
                  <X className="w-4 h-4" />
                </button>
                <img
                  src={certificate.imageUrl}
                  alt={certificate.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-[calc(100vh-6rem)] object-contain bg-slate-950"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Back navigation line */}
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
            Retour à la liste des certifications
          </button>
        </motion.div>

      </div>
    </div>
  );
}
