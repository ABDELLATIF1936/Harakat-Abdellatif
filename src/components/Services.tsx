import { motion } from "motion/react";
import { Globe, Lightbulb, CloudLightning, ShoppingCart, TrendingUp, Sparkles } from "lucide-react";

export default function Services() {
  const offerings = [
    {
      id: "srv1",
      title: "Développement Web , Mobile & SaaS",
      desc: "Conception d'applications sur-mesure d'une robustesse exceptionnelle. Séparation nette du front-end fluide et d'un back-end scalable.",
      icon: Globe,
    },
    {
      id: "srv2",
      title: "Consultations 1:1 – Freelance & SaaS",
      desc: "Sessions de cadrage stratégique pour challenger vos idées de produits et définir l'architecture technique idéale.",
      icon: Lightbulb,
    },
    {
      id: "srv3",
      title: "Services de Déploiement Complet",
      desc: "Mise en place de pipelines CI/CD automatisés, conteneurisation Docker, monitoring d'infrastructure et optimisation Cloud.",
      icon: CloudLightning,
    },
    {
      id: "srv4",
      title: "Création et Gestion de Boutiques E-commerce",
      desc: "Développement d'expériences de paiement hautement sécurisées, paniers d'achat optimisés pour le taux de conversion.",
      icon: ShoppingCart,
    },
    {
      id: "srv5",
      title: "Services de Marketing Digital & Performance",
      desc: "SEO technique poussé, optimisation drastique des Core Web Vitals (vitesse de chargement) pour un meilleur positionnement naturel.",
      icon: TrendingUp,
    },
  ];

  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-4 tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Expertises
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Ce que je propose
          </h2>
          <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 mt-5 font-medium max-w-xl mx-auto">
            Des services professionnels conçus pour maximiser l'impact technique et l'expérience utilisateur de vos solutions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((offering, idx) => {
            const Icon = offering.icon;
            return (
              <motion.div
                key={offering.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group relative p-8 rounded-3xl bg-indigo-50/20 dark:bg-indigo-950/10 border border-indigo-100/40 dark:border-indigo-900/30 hover:border-indigo-300 dark:hover:border-indigo-800 flex flex-col justify-between hover:shadow-xl hover:scale-[1.03] transition duration-300 h-full"
              >
                <div>
                  <div className="p-3.5 rounded-2xl w-fit bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-100/30 dark:border-indigo-900/20 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition duration-300 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-800 dark:text-white mb-3">
                    {offering.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {offering.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
