import React, { useState } from "react";
import { Lock, Mail, ShieldAlert, ArrowLeft, KeyRound } from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess: () => void;
  setView: (v: "portfolio") => void;
}

export default function AdminLogin({ onLoginSuccess, setView }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorCode, setErrorCode] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@portfolio.fr" && password === "admin123") {
      onLoginSuccess();
    } else {
      setErrorCode("Identifiants de connexion incorrects. Utilisez les clés de test ci-dessous.");
    }
  };

  return (
    <div
      id="login-view-container"
      className="pt-24 min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col justify-center items-center px-4"
    >
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-300">
        
        {/* upper decorative shield */}
        <div className="mx-auto p-4 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-full w-fit">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h2 className="font-display font-extrabold text-2xl text-slate-800 dark:text-white">
            Connexion Administration
          </h2>
          <p className="text-xs text-slate-400">
            Réservé à l'auteur du portfolio
          </p>
        </div>

        {/* Error notification line */}
        {errorCode && (
          <div className="p-3.5 rounded-xl bg-red-500/5 dark:bg-red-500/10 border border-red-500/25 text-red-500 text-xs font-medium text-left">
            {errorCode}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
          {/* Email input field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold uppercase text-slate-400 dark:text-slate-500">
              Adresse email d'administration
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorCode("");
                }}
                placeholder=""
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 Focus:ring-4 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {/* Password input code */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold uppercase text-slate-400 dark:text-slate-500">
              Mot de passe sécurisé
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <KeyRound className="w-5 h-5" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorCode("");
                }}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {/* Action button */}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md transition-all active:scale-98 cursor-pointer"
          >
            Se Connecter
          </button>
        </form>

        {/* Demo Credentials Hint notice */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dotted border-slate-200 dark:border-slate-800/80 text-left text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
          <p className="font-bold flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 leading-none">
            <ShieldAlert className="w-4 h-4" />
            Identifiants de démonstration disponibles pour l’accès admin.
          </p>
          
        </div>

        {/* Return button */}
        <button
          onClick={() => setView("portfolio")}
          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-600 dark:hover:text-amber-400 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Retour au site public
        </button>

      </div>
    </div>
  );
}
