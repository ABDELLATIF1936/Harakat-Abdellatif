import {
  Profile,
  Education,
  ExperiencePro,
  ExperienceBenevole,
  Project,
  Skill,
  Certificate,
  Testimonial,
  ContactMessage,
} from "./types";

export const initialProfile: Profile = {
  name: "Alexandre Mercier",
  title: "Étudiant en Master 2 Informatique | Développeur Full-Stack & DevOps",
  bio: "Passionné par le développement d'applications web scalables et l'automatisation des infrastructures. Actuellement en Master 2 Informatique (Intelligence Artificielle et Génie Logiciel) à l'Université Paris-Saclay. Je combine des compétences techniques solides en React/Next.js, Node.js et Python avec une culture d'ingénierie DevOps rigoureuse. Toujours à l'écoute d'opportunités d'alternance de fin d'études ou de postes de jeune diplômé.",
  photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400&h=400",
  cvUrl: "#", // Simulate download or direct link
  email: "alexandre.mercier.contact@gmail.com",
  phone: "+33 6 12 34 56 78",
  location: "Paris, France",
  status: "Recherche d'alternance",
  linkedin: "https://linkedin.com/in/alexandre-mercier-demo",
  github: "https://github.com/alexandre-mercier-demo",
};

export const initialEducation: Education[] = [
  {
    id: "edu1",
    school: "Université Paris-Saclay",
    degree: "Master 2 Informatique - Spécialisation Génie Logiciel & IA",
    period: "2024 - Présent",
    location: "Orsay, France",
    description: "Formation approfondie sur les architectures distribuées, le génie logiciel avancé, la conteneurisation (Docker, Kubernetes) et les modèles d'intelligence artificielle. Projet de recherche en cours sur l'optimisation des requêtes LLM.",
    grade: "Mention Très Bien (Majorant de promotion - en cours)",
    visible: true,
  },
  {
    id: "edu2",
    school: "Université Paris-Sud",
    degree: "Licence d'Informatique",
    period: "2021 - 2024",
    location: "Orsay, France",
    description: "Bases solides en algorithmique, structures de données, systèmes d'exploitation, réseaux et programmation orientée objet (C++, Java, Python). Réalisation de nombreux projets académiques en équipe.",
    grade: "Mention Bien",
    visible: true,
  },
  {
    id: "edu3",
    school: "Lycée Jeanne d'Arc",
    degree: "Baccalauréat Général - Spécialités Mathématiques & NSI",
    period: "2018 - 2021",
    location: "Versailles, France",
    description: "Introduction à la programmation Python, au Web (HTML/CSS) et aux bases de données relationnelles. Mention Très Bien.",
    grade: "Mention Très Bien",
    visible: true,
  },
];

export const initialExperiencePro: ExperiencePro[] = [
  {
    id: "exp-pro-1",
    company: "Criteo",
    role: "Stagiaire Développeur Full-Stack & DevOps",
    period: "Avril - Septembre 2025",
    location: "Paris, France",
    description: "Conception et développement d'un tableau de bord d'analyse de télémétrie interne utilisé par plus de 50 ingénieurs. Amélioration du pipeline CI/CD en réduisant le temps de build de 35% grâce à l'implémentation de caches intelligents.",
    logoUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=150&h=150",
    tags: ["React", "FastAPI", "Docker", "GitLab CI", "Grafana", "Prometheus"],
    visible: true,
  },
  {
    id: "exp-pro-2",
    company: "RTP Technologies",
    role: "Développeur Web Freelance / Junior",
    period: "Octobre 2023 - Juin 2024",
    location: "Remote / Paris",
    description: "Création d'une application web de gestion de stocks pour un artisan d'art local. Accompagnement dans la migration de processus papier vers un outil digital personnalisé.",
    logoUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=150&h=150",
    tags: ["Next.js", "Tailwind CSS", "Supabase", "TypeScript", "PostgreSQL"],
    visible: true,
  },
];

export const initialExperienceBenevole: ExperienceBenevole[] = [
  {
    id: "exp-benevole-1",
    organization: "Association Junior Entreprise - Saclay d'Code",
    role: "Responsable Technique & Développeur Web",
    period: "Septembre 2024 - Présent",
    location: "Université Paris-Saclay",
    description: "Gestion d'une équipe de 8 étudiants développeurs. Conception de la nouvelle plateforme web interne d'inscription et de suivi des projets. Animation d'ateliers de formation au framework React.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Node.js", "Mentorat"],
    visible: true,
  },
  {
    id: "exp-benevole-2",
    organization: "Emmaüs Connect",
    role: "Bénévole Aidant Numérique",
    period: "Janvier 2022 - Juin 2023",
    location: "Massy, France",
    description: "Accompagnement du public en situation d'exclusion numérique à travers des ateliers collectifs (utilisation de smartphone, démarches administratives en ligne, bases d'outils informatiques).",
    tags: ["Pédagogie", "Inclusion Numérique", "Support Technique"],
    visible: true,
  },
];

export const initialProjects: Project[] = [
  {
    id: "proj1",
    title: "NeuroInsight - Analyse de Trames IRM par IA",
    description: "Plateforme web d'analyse d'images médicales (IRM) propulsée par un modèle de Deep Learning, facilitant la détection précoce d'anomalies.",
    longDescription: "NeuroInsight est mon projet de fin d'études de Master 1. Il permet aux radiologues d'uploader des fichiers d'imagerie cérébrale (.nii ou .png), d'appliquer un traitement intelligent via un modèle PyTorch optimisé, et d'obtenir un rapport détaillé avec une carte de chaleur des zones à risque. Le projet intègre également un système de collaboration sécurisé pour permettre l'échange de diagnostics secondaires.",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    imageUrls: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800"
    ],
    githubUrl: "https://github.com/alexandre-mercier-demo/neuroinsight",
    demoUrl: "https://neuroinsight-demo.example.com",
    tags: ["React", "FastAPI", "Python", "PyTorch", "Tailwind CSS", "Docker"],
    challenges: "Le principal défi a été l'optimisation du temps de réponse lors de l'application du modèle de Deep Learning sur des fichiers volumineux. J'ai résolu ce problème en mettant en place une architecture de tâches asynchrones avec Celery et Redis, avec notification en temps réel de l'utilisateur via des WebSockets.",
    visible: true,
  },
  {
    id: "proj2",
    title: "ArchiVault - Gestionnaire Documentaire Chiffré",
    description: "Une application SaaS de gestion électronique de documents (GED) hautement sécurisée avec chiffrement de bout en bout.",
    longDescription: "ArchiVault is a complete digital archiving solution where every file is encrypted client-side before being uploaded to the cloud server. The application supports team work, fine permission management via asymmetric cryptography (RSA/AES), and detailed audit trail logs for all actions.",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    imageUrls: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&q=80&w=800"
    ],
    githubUrl: "https://github.com/alexandre-mercier-demo/archivault",
    demoUrl: "https://archivault-demo.example.com",
    tags: ["TypeScript", "Next.js", "Web Crypto API", "Node.js", "PostgreSQL"],
    challenges: "Implémenter la recherche textuelle sur des documents indexés et chiffrés a été extrêmement complexe. J'ai conçu un index de recherche tokenisé et obfusqué stocké de manière sécurisée, permettant la recherche par mots-clés sans que le serveur ne puisse lire le contenu des documents.",
    visible: true,
  },
  {
    id: "proj3",
    title: "EcoDeploy - Orchestrateur Kubernetes Éco-conçu",
    description: "Un prototype d'agent d'orchestration Kubernetes qui adapte le scaling des pods selon l'intensité carbone du réseau électrique local.",
    longDescription: "Développé lors d'un Hackathon vert inter-universitaire, EcoDeploy interroge des API d'intensité carbone de l'électricité (ex: Electricity Maps) pour planifier les tâches lourdes de calcul au moment où l'énergie est la plus verte, ou déplacer les ressources cloud vers des datacenters à plus faible impact environnemental.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    imageUrls: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
    ],
    githubUrl: "https://github.com/alexandre-mercier-demo/ecodeploy",
    demoUrl: "https://ecodeploy-demo.example.com",
    tags: ["Go", "Kubernetes", "Prometheus", "REST API", "Green IT"],
    challenges: "La réactivité de l'orchestrateur face aux fluctuations soudaines de l'intensité carbone sans provoquer de coupure de service. L'interfaçage direct avec les API d'Electricity Maps a nécessité l'implémentation de stratégies d'anticipation et de fallback robustes en Go.",
    visible: true,
  },
];

export const initialSkills: Skill[] = [
  // Languages
  { id: "sk1", name: "JavaScript / TypeScript", category: "languages", level: 90, visible: true },
  { id: "sk2", name: "Python", category: "languages", level: 85, visible: true },
  { id: "sk3", name: "SQL (PostgreSQL)", category: "languages", level: 80, visible: true },
  { id: "sk4", name: "C / C++", category: "languages", level: 65, visible: true },
  { id: "sk5", name: "HTML5 / CSS3", category: "languages", level: 95, visible: true },

  // Frameworks
  { id: "sk6", name: "React / Next.js", category: "frameworks", level: 90, visible: true },
  { id: "sk7", name: "Node.js (Express/NestJS)", category: "frameworks", level: 85, visible: true },
  { id: "sk8", name: "FastAPI / Flask", category: "frameworks", level: 75, visible: true },
  { id: "sk9", name: "Tailwind CSS", category: "frameworks", level: 95, visible: true },

  // Tools
  { id: "sk10", name: "Docker", category: "tools", level: 80, visible: true },
  { id: "sk11", name: "Git & GitHub Actions", category: "tools", level: 85, visible: true },
  { id: "sk12", name: "Linux / Shell scripting", category: "tools", level: 75, visible: true },
  { id: "sk13", name: "Kubernetes", category: "tools", level: 60, visible: true },

  // Soft Skills
  { id: "sk14", name: "Autonomie & Rigueur", category: "soft_skills", level: 95, visible: true },
  { id: "sk15", name: "Gestion de projet (Agile/Scrum)", category: "soft_skills", level: 85, visible: true },
  { id: "sk16", name: "Travail en équipe & Pédagogie", category: "soft_skills", level: 90, visible: true },
  { id: "sk17", name: "Communication & Synthèse", category: "soft_skills", level: 85, visible: true },
];

export const initialCertificates: Certificate[] = [
  {
    id: "cert1",
    name: "Architecting on AWS (Associate Level)",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "Février 2025",
    credentialUrl: "https://aws.amazon.com/certification/",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200&h=200",
    visible: true,
  },
  {
    id: "cert2",
    name: "Google Cloud Certified - Associate Cloud Engineer",
    issuer: "Google Cloud",
    issueDate: "Octobre 2024",
    credentialUrl: "https://cloud.google.com/certification/",
    imageUrl: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=200&h=200",
    visible: true,
  },
  {
    id: "cert3",
    name: "Machine Learning Masterclass by Andrew Ng",
    issuer: "DeepLearning.AI / Coursera",
    issueDate: "Juillet 2023",
    credentialUrl: "https://coursera.org",
    imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=200&h=200",
    visible: true,
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test1",
    name: "Jean-Louis Dupont",
    role: "Professeur Titulaire & Directeur de Master",
    company: "Université Paris-Saclay",
    feedback: "Alexandre est un étudiant brillant et rigoureux. Sa curiosité intellectuelle et son excellente maîtrise des aspects théoriques et pratiques du génie logiciel se reflètent dans la qualité des projets qu'il présenre. Il a été un élément moteur de sa promotion.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    visible: true,
  },
  {
    id: "test2",
    name: "Sarah El Amrani",
    role: "Lead DevOps Specialist",
    company: "Criteo",
    feedback: "Pendant son stage chez Criteo, Alexandre a fait preuve d'une autonomie exceptionnelle. Il a rapidement assimilé nos architectures microservices complexes et a livré un tableau de bord d'analyse hautement performant très apprécié par l'équipe.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    visible: true,
  },
  {
    id: "test3",
    name: "Michel Rostand",
    role: "Directeur de l'Artisanat",
    company: "Atelier Rostand",
    feedback: "Alexandre a conçu notre application de stockage de manière irréprochable. Très pédagogue, il a su traduire notre langage métier complexe en un outil simple au quotidien, fluide et performant. Un vrai plaisir de collaborer avec lui.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    visible: true,
  },
];

export const initialMessages: ContactMessage[] = [
  {
    id: "msg1",
    name: "Sophie Laurent",
    email: "sophie.laurent@techrecruit.fr",
    subject: "Opportunité de CDI - Ingénieur DevOps Junior (F/H)",
    message: "Bonjour Alexandre, votre profil en Master 2 à Paris-Saclay nous intéresse vivement pour un poste d'ingénieur DevOps en CDI au sein de nos équipes parisiennes à partir de fin 2026. Seriez-vous disponible pour un premier échange téléphonique cette semaine ?",
    date: "2026-06-20T10:15:00.000Z",
    read: false,
    status: "new",
  },
  {
    id: "msg2",
    name: "Thomas Dubois",
    email: "t.dubois@innosoft.com",
    subject: "Projet freelance - Développement API FastAPI",
    message: "Bonjour, nous cherchons un renfort technique ponctuel pour concevoir le backend d'une plateforme de réservation. Vos compétences listées sur votre projet NeuroInsight nous intéressent. Est-ce un type de mission envisageable pour vous à temps partiel ?",
    date: "2026-06-18T14:30:00.000Z",
    read: true,
    status: "replied",
  },
];
