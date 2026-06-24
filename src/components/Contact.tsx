import React, { useState } from "react";
import { CheckCircle2, Mail, Phone, MapPin, Send, AlertCircle } from "lucide-react";
import { ContactMessage, Profile } from "../types";

interface ContactProps {
  profile: Profile;
  onSendMessage: (msg: Omit<ContactMessage, "id" | "date" | "read" | "status">) => void;
}

export default function Contact({ profile, onSendMessage }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Le nom complet est obligatoire.";
    if (!formData.email.trim()) {
      errors.email = "L'adresse email est obligatoire.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Adresse email invalide.";
    }
    if (!formData.subject.trim()) errors.subject = "Le sujet est obligatoire.";
    if (!formData.message.trim()) {
      errors.message = "Le message ne peut pas être vide.";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Le message doit contenir au moins 10 caractères.";
    }
    return errors;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Call state handler to send the message to the backend
    onSendMessage(formData);

    // Show toast UI progress feedback
    setToastMessage("Votre message a été envoyé avec succès !");
    setShowToast(true);

    // Clear form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setShowToast(false);
    }, 4500);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-850 relative">
      
      {/* Toast Alert Banner */}
      {showToast && (
        <div id="contact-toast" className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-indigo-600 dark:bg-indigo-500 text-white px-5 py-4.5 rounded-2xl shadow-xl border border-indigo-500/30 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm">Message Envoyé !</p>
            <p className="text-xs text-slate-100 mt-0.5">{toastMessage}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Me Contacter
          </h2>
          <div className="w-16 h-1.5 bg-indigo-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 mt-5">
            Une opportunité pour mon Master ou mon insertion professionnelle ? Discutons-en !
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-150 dark:border-slate-800 shadow-sm">
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-slate-800 dark:text-white">
                Coordonnées de contact
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                N'hésitez pas à me joindre directement par mail ou par téléphone. Je réponds généralement sous 24 à 48 heures.
              </p>

              {/* Information Row Items */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-indigo-600 dark:text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-mono font-bold uppercase tracking-wider">Email professionnel</p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm sm:text-base font-semibold hover:text-indigo-500 dark:hover:text-indigo-400 transition"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-indigo-600 dark:text-indigo-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-mono font-bold uppercase tracking-wider">Téléphone portable</p>
                    <a
                      href={`tel:${profile.phone}`}
                      className="text-sm sm:text-base font-semibold hover:text-indigo-500 dark:hover:text-indigo-400 transition"
                    >
                      {profile.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-indigo-600 dark:text-indigo-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-mono font-bold uppercase tracking-wider">Localisation principale</p>
                    <span className="text-sm sm:text-base font-semibold">
                      {profile.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated mini Map widget card */}
            <div className="overflow-hidden rounded-2xl h-44 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="text-center relative z-10 px-4">
                <MapPin className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto animate-bounce mb-2" />
                <p className="font-semibold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-300">Région de Paris / Île-de-France</p>
                <p className="text-[11px] text-slate-400 mt-1">Déplacements et télétravail hybrides acceptés</p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-150 dark:border-slate-800 shadow-sm">
            <h3 className="font-display text-2xl font-bold text-slate-800 dark:text-white mb-6">
              M'envoyer un message
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Nom */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="input-name" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450">
                    Nom complet *
                  </label>
                  <input
                    id="input-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ex: Sophie Martin"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      formErrors.name
                        ? "border-red-500 focus:ring-red-500/20"
                        : "border-slate-250 dark:border-slate-805 focus:border-indigo-500 focus:ring-indigo-500/20"
                    } bg-transparent text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-4 transition`}
                  />
                  {formErrors.name && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="input-email" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450">
                    Adresse email *
                  </label>
                  <input
                    id="input-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Ex: sophie.martin@entreprise.com"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      formErrors.email
                        ? "border-red-500 focus:ring-red-500/20"
                        : "border-slate-250 dark:border-slate-805 focus:border-indigo-500 focus:ring-indigo-500/20"
                    } bg-transparent text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-4 transition`}
                  />
                  {formErrors.email && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Sujet */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="input-subject" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450">
                  Sujet du message *
                </label>
                <input
                  id="input-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Ex: Proposition de stage ou collaboration"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.subject
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-slate-250 dark:border-slate-805 focus:border-indigo-500 focus:ring-indigo-500/20"
                  } bg-transparent text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-4 transition`}
                />
                {formErrors.subject && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {formErrors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="input-message" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450">
                  Votre message *
                </label>
                <textarea
                  id="input-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Rédigez votre demande ici..."
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.message
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-slate-250 dark:border-slate-805 focus:border-indigo-500 focus:ring-indigo-500/20"
                  } bg-transparent text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-4 transition resize-none`}
                />
                {formErrors.message && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {formErrors.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <button
                id="btn-submit-contact"
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 focus:outline-none focus:ring-4 focus:ring-indigo-300/50 transition-all active:scale-98 cursor-pointer"
              >
                Envoyer le message
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
