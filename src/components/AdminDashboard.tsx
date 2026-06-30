import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Briefcase,
  Heart,
  Code,
  Milestone,
  Award,
  MessageSquare,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Inbox,
  CheckCircle,
  Archive,
  Save,
  Check,
  X,
  AlertTriangle,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
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
} from "../types";

interface AdminDashboardProps {
  profile: Profile;
  educationList: Education[];
  experienceProList: ExperiencePro[];
  experienceBenevoleList: ExperienceBenevole[];
  projectList: Project[];
  skillList: Skill[];
  certificateList: Certificate[];
  testimonialList: Testimonial[];
  messageList: ContactMessage[];
  onUpdateProfile: (p: Profile) => void;
  onSetEducationList: (list: Education[]) => void;
  onSetExperienceProList: (list: ExperiencePro[]) => void;
  onSetExperienceBenevoleList: (list: ExperienceBenevole[]) => void;
  onSetProjectList: (list: Project[]) => void;
  onSetSkillList: (list: Skill[]) => void;
  onSetCertificateList: (list: Certificate[]) => void;
  onSetTestimonialList: (list: Testimonial[]) => void;
  onSetMessageList: (list: ContactMessage[]) => void;
  onLogout: () => void;
}

type AdminTab =
  | "overview"
  | "profile"
  | "about"
  | "education"
  | "exppro"
  | "expbenevole"
  | "projects"
  | "skills"
  | "certificates"
  | "testimonials"
  | "messages";

export default function AdminDashboard({
  profile,
  educationList,
  experienceProList,
  experienceBenevoleList,
  projectList,
  skillList,
  certificateList,
  testimonialList,
  messageList,
  onUpdateProfile,
  onSetEducationList,
  onSetExperienceProList,
  onSetExperienceBenevoleList,
  onSetProjectList,
  onSetSkillList,
  onSetCertificateList,
  onSetTestimonialList,
  onSetMessageList,
  onLogout,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  
  // Notification toast simulated
  const [alert, setAlert] = useState<{ message: string; type: "success" | "danger" } | null>(null);

  // General deletion modal state
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: AdminTab;
    id: string;
    title: string;
  } | null>(null);

  // CRUD Forms modal states
  const [activeFormModal, setActiveFormModal] = useState<{
    type: AdminTab;
    mode: "add" | "edit";
    id?: string;
  } | null>(null);

  // Form Temp fields states
  const [tempProfile, setTempProfile] = useState<Profile>({ ...profile });
  const [tempEducation, setTempEducation] = useState<Partial<Education>>({});
  const [tempExpPro, setTempExpPro] = useState<Partial<ExperiencePro>>({});
  const [tempExpBenevole, setTempExpBenevole] = useState<Partial<ExperienceBenevole>>({});
  const [tempProject, setTempProject] = useState<Partial<Project>>({});
  const [tempSkill, setTempSkill] = useState<Partial<Skill>>({});
  const [tempCert, setTempCert] = useState<Partial<Certificate>>({});
  const [tempTestimonial, setTempTestimonial] = useState<Partial<Testimonial>>({});

  useEffect(() => {
    setTempProfile({ ...profile });
  }, [profile]);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [isDraggingProfile, setIsDraggingProfile] = useState(false);
  const [isDraggingProject, setIsDraggingProject] = useState(false);
  const [isDraggingProjectGallery, setIsDraggingProjectGallery] = useState(false);
  const [isDraggingCert, setIsDraggingCert] = useState(false);
  const [cvFileName, setCvFileName] = useState<string>("");

  const showAlert = (message: string, type: "success" | "danger" = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3500);
  };

  // Helper function to generate unique ID
  const generateUUID = () => `id-${Math.random().toString(36).substr(2, 9)}`;

  // Normalize order field values after list reorder or edit
  const normalizeOrder = <T extends { order?: number }>(items: T[]) =>
    items.map((item, idx) => ({ ...item, order: idx + 1 }));

  // REORDER ITEMS HANDLER (Simulated Drag & Drop via Up-Down buttons)
  const handleMoveItem = (type: AdminTab, index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0) return;

    if (type === "education") {
      if (targetIndex >= educationList.length) return;
      const copy = [...educationList];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      onSetEducationList(normalizeOrder(copy));
      showAlert("Ordre mis à jour");
    } else if (type === "exppro") {
      if (targetIndex >= experienceProList.length) return;
      const copy = [...experienceProList];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      onSetExperienceProList(normalizeOrder(copy));
      showAlert("Ordre mis à jour");
    } else if (type === "expbenevole") {
      if (targetIndex >= experienceBenevoleList.length) return;
      const copy = [...experienceBenevoleList];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      onSetExperienceBenevoleList(normalizeOrder(copy));
      showAlert("Ordre mis à jour");
    } else if (type === "projects") {
      if (targetIndex >= projectList.length) return;
      const copy = [...projectList];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      onSetProjectList(normalizeOrder(copy));
      showAlert("Ordre mis à jour");
    } else if (type === "skills") {
      if (targetIndex >= skillList.length) return;
      const copy = [...skillList];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      onSetSkillList(normalizeOrder(copy));
      showAlert("Ordre mis à jour");
    } else if (type === "certificates") {
      if (targetIndex >= certificateList.length) return;
      const copy = [...certificateList];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      onSetCertificateList(normalizeOrder(copy));
      showAlert("Ordre mis à jour");
    } else if (type === "testimonials") {
      if (targetIndex >= testimonialList.length) return;
      const copy = [...testimonialList];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      onSetTestimonialList(normalizeOrder(copy));
      showAlert("Ordre mis à jour");
    }
  };

  // TOGGLE VISIBILITY HANDLERS
  const handleToggleVisibility = (type: AdminTab, id: string) => {
    if (type === "education") {
      const copy = educationList.map((x) => (x.id === id ? { ...x, visible: !x.visible } : x));
      onSetEducationList(copy);
      showAlert("Visibilité mise à jour");
    } else if (type === "exppro") {
      const copy = experienceProList.map((x) => (x.id === id ? { ...x, visible: !x.visible } : x));
      onSetExperienceProList(copy);
      showAlert("Visibilité mise à jour");
    } else if (type === "expbenevole") {
      const copy = experienceBenevoleList.map((x) => (x.id === id ? { ...x, visible: !x.visible } : x));
      onSetExperienceBenevoleList(copy);
      showAlert("Visibilité mise à jour");
    } else if (type === "projects") {
      const copy = projectList.map((x) => (x.id === id ? { ...x, visible: !x.visible } : x));
      onSetProjectList(copy);
      showAlert("Visibilité mise à jour");
    } else if (type === "skills") {
      const copy = skillList.map((x) => (x.id === id ? { ...x, visible: !x.visible } : x));
      onSetSkillList(copy);
      showAlert("Visibilité mise à jour");
    } else if (type === "certificates") {
      const copy = certificateList.map((x) => (x.id === id ? { ...x, visible: !x.visible } : x));
      onSetCertificateList(copy);
      showAlert("Visibilité mise à jour");
    } else if (type === "testimonials") {
      const copy = testimonialList.map((x) => (x.id === id ? { ...x, visible: !x.visible } : x));
      onSetTestimonialList(copy);
      showAlert("Visibilité mise à jour");
    }
  };

  // TRIGGER EDIT FORM OPENER
  const openEditModal = (type: AdminTab, item: any) => {
    if (type === "education") {
      setTempEducation({ ...item });
    } else if (type === "exppro") {
      setTempExpPro({ ...item, tags: item.tags || [] });
    } else if (type === "expbenevole") {
      setTempExpBenevole({ ...item, tags: item.tags || [] });
    } else if (type === "projects") {
      setTempProject({ ...item, tags: item.tags || [], imageUrls: item.imageUrls || [] });
    } else if (type === "skills") {
      setTempSkill({ ...item });
    } else if (type === "certificates") {
      setTempCert({ ...item });
    } else if (type === "testimonials") {
      setTempTestimonial({ ...item });
    }
    setActiveFormModal({ type, mode: "edit", id: item.id });
  };

  // TRIGGER ADD FORM OPENER
  const openAddModal = (type: AdminTab) => {
    if (type === "education") {
      setTempEducation({
        school: "",
        degree: "",
        period: "",
        location: "",
        description: "",
        grade: "",
        visible: true,
      });
    } else if (type === "exppro") {
      setTempExpPro({
        company: "",
        role: "",
        period: "",
        location: "",
        description: "",
        tags: [],
        logoUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=150&h=150",
        visible: true,
      });
    } else if (type === "expbenevole") {
      setTempExpBenevole({
        organization: "",
        role: "",
        period: "",
        description: "",
        tags: [],
        visible: true,
      });
    } else if (type === "projects") {
      setTempProject({
        title: "",
        description: "",
        longDescription: "",
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
        githubUrl: "",
        demoUrl: "",
        tags: [],
        challenges: "",
        visible: true,
      });
    } else if (type === "skills") {
      setTempSkill({
        name: "",
        category: "languages",
        level: 80,
        visible: true,
      });
    } else if (type === "certificates") {
      setTempCert({
        name: "",
        issuer: "",
        issueDate: "",
        credentialUrl: "",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200&h=200",
        visible: true,
      });
    } else if (type === "testimonials") {
      setTempTestimonial({
        name: "",
        role: "",
        company: "",
        feedback: "",
        rating: 5,
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
        visible: true,
      });
    }
    setActiveFormModal({ type, mode: "add" });
  };

  // SAVE SUBMISSION HANDLER (Differentiate Add/Edit)
  const handleSaveForm = () => {
    if (!activeFormModal) return;
    const { type, mode, id } = activeFormModal;

    if (type === "education") {
      if (!tempEducation.school || !tempEducation.degree) {
        showAlert("Veuillez remplir les champs requis.", "danger");
        return;
      }
      if (mode === "add") {
        const item: Education = {
          id: generateUUID(),
          school: tempEducation.school!,
          degree: tempEducation.degree!,
          period: tempEducation.period || "",
          location: tempEducation.location || "",
          description: tempEducation.description || "",
          grade: tempEducation.grade,
          visible: true,
          order: 1,
        };
        onSetEducationList(normalizeOrder([item, ...educationList]));
        showAlert("Formation créée avec succès !");
      } else {
        const updated = educationList.map((x) => (x.id === id ? { ...x, ...tempEducation } as Education : x));
        onSetEducationList(updated);
        showAlert("Formation modifiée avec succès !");
      }
    } else if (type === "exppro") {
      if (!tempExpPro.company || !tempExpPro.role) {
        showAlert("Veuillez remplir les champs requis.", "danger");
        return;
      }
      if (mode === "add") {
        const item: ExperiencePro = {
          id: generateUUID(),
          company: tempExpPro.company!,
          role: tempExpPro.role!,
          period: tempExpPro.period || "",
          location: tempExpPro.location || "",
          description: tempExpPro.description || "",
          logoUrl: tempExpPro.logoUrl,
          tags: tempExpPro.tags || [],
          visible: true,
          order: 1,
        };
        onSetExperienceProList(normalizeOrder([item, ...experienceProList]));
        showAlert("Expérience Pro ajoutée !");
      } else {
        const updated = experienceProList.map((x) => (x.id === id ? { ...x, ...tempExpPro } as ExperiencePro : x));
        onSetExperienceProList(updated);
        showAlert("Expérience Pro modifiée !");
      }
    } else if (type === "expbenevole") {
      if (!tempExpBenevole.organization || !tempExpBenevole.role) {
        showAlert("Veuillez remplir les champs requises.", "danger");
        return;
      }
      if (mode === "add") {
        const item: ExperienceBenevole = {
          id: generateUUID(),
          organization: tempExpBenevole.organization!,
          role: tempExpBenevole.role!,
          period: tempExpBenevole.period || "",
          description: tempExpBenevole.description || "",
          tags: tempExpBenevole.tags || [],
          visible: true,
          order: 1,
        };
        onSetExperienceBenevoleList(normalizeOrder([item, ...experienceBenevoleList]));
        showAlert("Engagement bénévole ajouté !");
      } else {
        const updated = experienceBenevoleList.map((x) => (x.id === id ? { ...x, ...tempExpBenevole } as ExperienceBenevole : x));
        onSetExperienceBenevoleList(updated);
        showAlert("Engagement bénévole modifié !");
      }
    } else if (type === "projects") {
      if (!tempProject.title || !tempProject.description) {
        showAlert("Entrez un titre et une description courte.", "danger");
        return;
      }
      if (mode === "add") {
        const item: Project = {
          id: generateUUID(),
          title: tempProject.title!,
          description: tempProject.description!,
          longDescription: tempProject.longDescription || tempProject.description!,
          imageUrl: tempProject.imageUrl || "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
          imageUrls: tempProject.imageUrls || [],
          githubUrl: tempProject.githubUrl || "",
          demoUrl: tempProject.demoUrl || "",
          tags: tempProject.tags || [],
          challenges: tempProject.challenges || "",
          visible: true,
          order: 1,
        };
        onSetProjectList(normalizeOrder([item, ...projectList]));
        showAlert("Projet ajouté au portfolio !");
      } else {
        const updated = projectList.map((x) => (x.id === id ? { ...x, ...tempProject } as Project : x));
        onSetProjectList(updated);
        showAlert("Projet mis à jour !");
      }
    } else if (type === "skills") {
      if (!tempSkill.name) {
        showAlert("Entrez le nom de la compétence.", "danger");
        return;
      }
      if (mode === "add") {
        const item: Skill = {
          id: generateUUID(),
          name: tempSkill.name!,
          category: tempSkill.category || "languages",
          level: tempSkill.level !== undefined ? tempSkill.level : 80,
          visible: true,
          order: skillList.length + 1,
        };
        onSetSkillList([item, ...skillList]);
        showAlert("Compétence ajoutée !");
      } else {
        const updated = skillList.map((x) => (x.id === id ? { ...x, ...tempSkill } as Skill : x));
        onSetSkillList(updated);
        showAlert("Compétence mise à jour !");
      }
    } else if (type === "certificates") {
      if (!tempCert.name || !tempCert.issuer) {
        showAlert("Entrez un nom et l'organisme émetteur.", "danger");
        return;
      }
      if (mode === "add") {
        const item: Certificate = {
          id: generateUUID(),
          name: tempCert.name!,
          issuer: tempCert.issuer!,
          issueDate: tempCert.issueDate || "",
          credentialUrl: tempCert.credentialUrl || "",
          imageUrl: tempCert.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200&h=200",
          impactProfessionnel: tempCert.impactProfessionnel || "",
          visible: true,
          order: certificateList.length + 1,
        };
        onSetCertificateList([item, ...certificateList]);
        showAlert("Certificat ajouté !");
      } else {
        const updated = certificateList.map((x) => (x.id === id ? { ...x, ...tempCert } as Certificate : x));
        onSetCertificateList(updated);
        showAlert("Certificat édité !");
      }
    } else if (type === "testimonials") {
      if (!tempTestimonial.name || !tempTestimonial.feedback) {
        showAlert("Entrez le nom et le texte de recommandation.", "danger");
        return;
      }
      if (mode === "add") {
        const item: Testimonial = {
          id: generateUUID(),
          name: tempTestimonial.name!,
          role: tempTestimonial.role || "",
          company: tempTestimonial.company || "",
          feedback: tempTestimonial.feedback!,
          rating: tempTestimonial.rating || 5,
          avatarUrl: tempTestimonial.avatarUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
          visible: true,
          order: testimonialList.length + 1,
        };
        onSetTestimonialList([item, ...testimonialList]);
        showAlert("Recommandation ajoutée !");
      } else {
        const updated = testimonialList.map((x) => (x.id === id ? { ...x, ...tempTestimonial } as Testimonial : x));
        onSetTestimonialList(updated);
        showAlert("Recommandation éditée !");
      }
    }

    setActiveFormModal(null);
  };

  // TRIGGER DELETE WITH DIALOG
  const triggerDelete = (type: AdminTab, id: string, title: string) => {
    setDeleteConfirm({ type, id, title });
  };

  const executeDelete = () => {
    if (!deleteConfirm) return;
    const { type, id } = deleteConfirm;

    if (type === "education") {
      onSetEducationList(educationList.filter((x) => x.id !== id));
      showAlert("Élément supprimé");
    } else if (type === "exppro") {
      onSetExperienceProList(experienceProList.filter((x) => x.id !== id));
      showAlert("Expérience Pro éliminée");
    } else if (type === "expbenevole") {
      onSetExperienceBenevoleList(experienceBenevoleList.filter((x) => x.id !== id));
      showAlert("Bénévolat supprimé");
    } else if (type === "projects") {
      onSetProjectList(projectList.filter((x) => x.id !== id));
      showAlert("Projet supprimé");
    } else if (type === "skills") {
      onSetSkillList(skillList.filter((x) => x.id !== id));
      showAlert("Compétence retirée");
    } else if (type === "certificates") {
      onSetCertificateList(certificateList.filter((x) => x.id !== id));
      showAlert("Badge archivé");
    } else if (type === "testimonials") {
      onSetTestimonialList(testimonialList.filter((x) => x.id !== id));
      showAlert("Témoignage supprimé");
    } else if (type === "messages") {
      onSetMessageList(messageList.filter((x) => x.id !== id));
      showAlert("Message supprimé");
    }

    setDeleteConfirm(null);
  };

  // PROFILE MODIFICATION ACTIONS
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(tempProfile);
    showAlert("Profil professionnel mis à jour !");
  };

  // CONTACT INQUIRIES MANAGEMENT
  const handleMarkMessageStatus = (id: string, newStatus: "new" | "replied" | "archived") => {
    const isRead = newStatus === "replied" || newStatus === "archived";
    const nextList = messageList.map((x) => (x.id === id ? { ...x, status: newStatus, read: isRead } : x));
    onSetMessageList(nextList);
    showAlert(`Message marqué comme ${newStatus === "replied" ? "répondu" : newStatus === "archived" ? "archivé" : "non lu"}`);
  };

  // COUNTER METRICS FOR DASHBOARD SCREEN
  const unreadMessagesCount = messageList.filter((m) => !m.read).length;
  const visibleProjectsCount = projectList.filter((p) => p.visible).length;
  const totalSkillsCount = skillList.length;
  const activeCertificatesCount = certificateList.filter((c) => c.visible).length;

  return (
    <div id="admin-dashboard-container" className="pt-24 min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col">
      {/* Dynamic global warning alerts on dashboard */}
      {alert && (
        <div className={`fixed top-24 right-6 z-50 px-4 py-3 rounded-xl text-white shadow-lg flex items-center gap-2 animate-in fade-in duration-300 ${
          alert.type === "success" ? "bg-emerald-600 border border-emerald-500" : "bg-red-600 border border-red-500"
        }`}>
          <Check className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-medium">{alert.message}</span>
        </div>
      )}

      {/* Main dashboard Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col pb-16">
        
        {/* Header toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
              Espace Administration
            </h1>
            <p className="text-xs text-slate-500 mt-1 dark:text-slate-400">
              Connecté en tant que <strong>{profile.name} (Admin)</strong> • Gestion complète du portfolio
            </p>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/25 border border-rose-100 dark:border-rose-900/30 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>

        {/* Layout Grid Sidebar + Canvas area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-grow">
          
          {/* Navigation Sidebar Drawer */}
          <aside className="lg:col-span-3 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/60 dark:border-slate-850 flex flex-col gap-1.5">
            {[
              { id: "overview", label: "Dashboard", icon: LayoutDashboard },
              { id: "profile", label: "Mon Profil", icon: User },
              { id: "about", label: "À propos de moi", icon: Heart },
              { id: "education", label: "Éducation", icon: GraduationCap },
              { id: "exppro", label: "Expériences Pro", icon: Briefcase },
              { id: "expbenevole", label: "Bénévolat", icon: Heart },
              { id: "projects", label: "Projets", icon: Code },
              { id: "skills", label: "Compétences", icon: Milestone },
              { id: "certificates", label: "Certifications", icon: Award },
              { id: "testimonials", label: "Recommandations", icon: MessageSquare },
              { id: "messages", label: "Messages reçus", icon: Inbox, badge: unreadMessagesCount },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition duration-150 cursor-pointer ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm font-semibold"
                      : "text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`px-2 py-0.5 text-[10px] rounded-full font-mono font-bold leading-none ${
                      isActive ? "bg-white text-indigo-600" : "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400"
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Active Canvas Body (Tab switches) */}
          <main className="lg:col-span-9 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-3xl p-6 md:p-8 shadow-sm">
            
            {/* Overview / Dashboard metrics summary */}
            {activeTab === "overview" && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1 font-display">
                    Vue d'ensemble
                  </h2>
                  <p className="text-xs text-slate-400">Statistiques rapides de votre site web public</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-indigo-600 dark:text-indigo-400">
                      <Code className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{visibleProjectsCount}</p>
                      <p className="text-xs text-slate-400 font-medium">Projets en ligne</p>
                    </div>
                  </div>

                  <div className="p-5.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                    <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl text-teal-600 dark:text-teal-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{activeCertificatesCount}</p>
                      <p className="text-xs text-slate-400 font-medium">Certificats</p>
                    </div>
                  </div>

                  <div className="p-5.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-amber-600 dark:text-amber-400">
                      <Milestone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{totalSkillsCount}</p>
                      <p className="text-xs text-slate-400 font-medium">Compétences</p>
                    </div>
                  </div>

                  <div className="p-5.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-indigo-600 dark:text-indigo-400">
                      <Inbox className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{unreadMessagesCount}</p>
                      <p className="text-xs text-slate-400 font-medium">Messages non lus</p>
                    </div>
                  </div>
                </div>

                {/* Last Received Messages widget list */}
                <div className="border border-slate-100 dark:border-slate-800 rounded-3xl p-5 bg-slate-50/50 dark:bg-slate-900/10">
                  <h3 className="font-display font-bold text-base text-slate-850 dark:text-white mb-4">
                    Dernières demandes reçues
                  </h3>
                  <div className="space-y-4">
                    {messageList.slice(0, 3).map((msg) => (
                      <div
                        key={msg.id}
                        onClick={() => setActiveTab("messages")}
                        className="p-4 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-150 dark:border-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer flex items-center justify-between gap-4 transition"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-slate-800 dark:text-white leading-none">
                            {msg.subject}
                          </p>
                          <p className="text-xs text-slate-450 dark:text-slate-400">
                            De <strong>{msg.name}</strong> ({msg.email})
                          </p>
                        </div>
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                          !msg.read ? "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                        }`}>
                          {!msg.read ? "Non Lu" : msg.status === "archived" ? "Archivé" : "Répondu"}
                        </span>
                      </div>
                    ))}
                    {messageList.length === 0 && (
                      <p className="text-slate-400 text-sm align-center">Aucun message de contact dans la boîte.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* MON PROFIL Form settings page */}
            {activeTab === "about" && (
              <form onSubmit={handleProfileSave} className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                  <h2 className="text-xl font-bold font-display text-slate-800 dark:text-white mb-1">
                    À propos de moi
                  </h2>
                  <p className="text-xs text-slate-400">Gérez les informations affichées dans la section "À propos" de votre portfolio</p>
                </div>

                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-400">Localisation</label>
                    <input
                      type="text"
                      value={tempProfile.location}
                      onChange={(e) => setTempProfile({ ...tempProfile, location: e.target.value })}
                      placeholder="Ex: Paris, France"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:border-indigo-500 text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-400">Statut professionnel</label>
                    <input
                      type="text"
                      value={tempProfile.status}
                      onChange={(e) => setTempProfile({ ...tempProfile, status: e.target.value })}
                      placeholder="Ex: Recherche d'alternance, En CDI, Disponible pour projets..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:border-indigo-500 text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-400">Biographie / Qui suis-je ?</label>
                    <textarea
                      rows={6}
                      value={tempProfile.bio}
                      onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                      placeholder="Décrivez votre parcours, vos passions et votre vision professionnelle..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:border-indigo-500 text-slate-800 dark:text-white resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition cursor-pointer shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    Enregistrer les modifications
                  </button>
                </div>
              </form>
            )}

            {activeTab === "profile" && (
              <form onSubmit={handleProfileSave} className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                  <h2 className="text-xl font-bold font-display text-slate-800 dark:text-white mb-1">
                    Édition des paramètres du Profil
                  </h2>
                  <p className="text-xs text-slate-400">Mettez à jour vos descriptions, avatar et CV publics</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5 align-left">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-400">Nom complet</label>
                    <input
                      type="text"
                      value={tempProfile.name}
                      onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:border-indigo-500 text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-400">Titre professionnel</label>
                    <input
                      type="text"
                      value={tempProfile.title}
                      onChange={(e) => setTempProfile({ ...tempProfile, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:border-indigo-500 text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-400">Statut professionnel</label>
                    <input
                      type="text"
                      value={tempProfile.status}
                      onChange={(e) => setTempProfile({ ...tempProfile, status: e.target.value })}
                      placeholder="Ex: Recherche d'alternance"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:border-indigo-500 text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-400">Biographie d'accroche (À propos)</label>
                    <textarea
                      rows={4}
                      value={tempProfile.bio}
                      onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:border-indigo-500 text-slate-800 dark:text-white resize-none"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-400">Photo de profil (Télécharger Fichier local / BLOB)</label>
                    <div className="flex flex-col md:flex-row gap-4 items-stretch">
                      {/* Image Preview */}
                      <div className="w-24 h-24 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden shrink-0 relative group shadow-sm">
                        {tempProfile.photoUrl ? (
                          <>
                            <img
                              src={tempProfile.photoUrl}
                              alt="Profil"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => setTempProfile({ ...tempProfile, photoUrl: "" })}
                              className="absolute inset-0 bg-rose-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity font-bold text-xs flex items-center justify-center cursor-pointer"
                            >
                              Supprimer
                            </button>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center text-[10px] font-bold">
                            <ImageIcon className="w-5 h-5 mb-1 text-slate-400" />
                            <span>Aucune</span>
                          </div>
                        )}
                      </div>

                      {/* Drag and Drop Selector */}
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDraggingProfile(true);
                        }}
                        onDragLeave={() => setIsDraggingProfile(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDraggingProfile(false);
                          const file = e.dataTransfer.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (typeof reader.result === "string") {
                                setTempProfile({ ...tempProfile, photoUrl: reader.result });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        onClick={() => {
                          const fileInput = document.getElementById("profile-photo-upload-input");
                          fileInput?.click();
                        }}
                        className={`flex-1 border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-1 min-h-[96px] ${
                          isDraggingProfile
                            ? "border-indigo-500 bg-indigo-50/10 dark:bg-indigo-950/10 scale-[1.01]"
                            : "border-slate-200 hover:border-indigo-400 dark:border-slate-800 dark:hover:border-indigo-900/40 bg-white/5"
                        }`}
                      >
                        <input
                          id="profile-photo-upload-input"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                if (typeof reader.result === "string") {
                                  setTempProfile({ ...tempProfile, photoUrl: reader.result });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <Upload className="w-4 h-4 text-indigo-500" />
                        <div className="text-xs leading-tight text-slate-600 dark:text-slate-350 select-none">
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">Glissez-déposez</span> une photo ou <span className="underline">parcourez</span>
                        </div>
                        <p className="text-[10px] text-slate-400 select-none">Format PNG, JPG, WEBP - Stockée localement comme BLOB</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-400">Lien ou URL du CV (PDF)</label>
                    <input
                      type="text"
                      value={tempProfile.cvUrl}
                      onChange={(e) => {
                        setTempProfile({ ...tempProfile, cvUrl: e.target.value });
                        if (!e.target.value.startsWith("data:application/pdf")) {
                          setCvFileName("");
                        }
                      }}
                      placeholder="https://example.com/mon-cv.pdf"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:border-indigo-500 text-slate-800 dark:text-white"
                    />
                    <div className="flex flex-col sm:flex-row gap-3">
                      <label className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/70 transition">
                        <span>Télécharger CV PDF</span>
                        <input
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                if (typeof reader.result === "string") {
                                  setTempProfile({ ...tempProfile, cvUrl: reader.result });
                                  setCvFileName(file.name);
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      {cvFileName && (
                        <span className="text-xs text-slate-500 dark:text-slate-400 self-center">Fichier chargé : {cvFileName}</span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400">Vous pouvez aussi coller un lien PDF public ou importer un fichier PDF directement.</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-400">Email public</label>
                    <input
                      type="email"
                      value={tempProfile.email}
                      onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:border-indigo-500 text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-400">Téléphone public</label>
                    <input
                      type="text"
                      value={tempProfile.phone}
                      onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:border-indigo-500 text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5 font-mono">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-400">Localisation</label>
                    <input
                      type="text"
                      value={tempProfile.location}
                      onChange={(e) => setTempProfile({ ...tempProfile, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:border-indigo-500 text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-400">Profil GitHub</label>
                    <input
                      type="text"
                      value={tempProfile.github}
                      onChange={(e) => setTempProfile({ ...tempProfile, github: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:border-indigo-500 text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-400">Profil LinkedIn</label>
                    <input
                      type="text"
                      value={tempProfile.linkedin}
                      onChange={(e) => setTempProfile({ ...tempProfile, linkedin: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:border-indigo-500 text-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    Enregistrer les modifications
                  </button>
                </div>
              </form>
            )}

            {/* List Table generators */}
            {activeTab !== "overview" && activeTab !== "profile" && activeTab !== "messages" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* Header operations rows */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                  <div>
                    <h2 className="text-xl font-bold font-display text-slate-800 dark:text-white uppercase leading-none">
                      {activeTab === "education"
                        ? "Gestion de l'Éducation"
                        : activeTab === "exppro"
                        ? "Gestion des Expériences Pro"
                        : activeTab === "expbenevole"
                        ? "Gestion des Expériences Bénévoles"
                        : activeTab === "projects"
                        ? "Gestion du Portfolio Projets"
                        : activeTab === "skills"
                        ? "Gestion des Compétences"
                        : activeTab === "certificates"
                        ? "Gestion des Certificats"
                        : "Gestion des Témoignages"}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Gérez le contenu présent sur la section publique du site</p>
                  </div>

                  <button
                    onClick={() => openAddModal(activeTab)}
                    className="inline-flex items-center gap-1 px-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                </div>

                {/* Items collection lists */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono font-bold uppercase text-slate-400">
                        <th className="py-3 px-2">Ordre</th>
                        <th className="py-3 px-2">Informations</th>
                        <th className="py-3 px-2">Statut Public</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      
                      {/* EDUCATION LIST ROWS */}
                      {activeTab === "education" && educationList.map((edu, index) => (
                        <tr key={edu.id} className="text-sm">
                          <td className="py-3 px-2">
                            <div className="flex flex-col gap-0.5">
                              <button
                                onClick={() => handleMoveItem("education", index, "up")}
                                className="p-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                                disabled={index === 0}
                              >
                                <ChevronUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleMoveItem("education", index, "down")}
                                className="p-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                                disabled={index === educationList.length - 1}
                              >
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <p className="font-bold text-slate-850 dark:text-white">{edu.degree}</p>
                            <p className="text-xs text-slate-450 dark:text-slate-400">{edu.school} • {edu.period}</p>
                          </td>
                          <td className="py-3 px-2">
                            <button
                              onClick={() => handleToggleVisibility("education", edu.id)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg font-semibold ${
                                edu.visible
                                  ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                                  : "bg-amber-50 dark:bg-amber-950/20 text-slate-500"
                              }`}
                            >
                              {edu.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              {edu.visible ? "Affiché" : "Masqué"}
                            </button>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <div className="inline-flex gap-1.5">
                              <button
                                onClick={() => openEditModal("education", edu)}
                                className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg transition"
                                title="Modifier"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => triggerDelete("education", edu.id, edu.degree)}
                                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition"
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {/* EXPERIENCE PRO LIST ROWS */}
                      {activeTab === "exppro" && experienceProList.map((exp, index) => (
                        <tr key={exp.id} className="text-sm">
                          <td className="py-3 px-2">
                            <div className="flex flex-col gap-0.5">
                              <button
                                onClick={() => handleMoveItem("exppro", index, "up")}
                                className="p-0.5 text-slate-400 hover:text-slate-600"
                                disabled={index === 0}
                              >
                                <ChevronUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleMoveItem("exppro", index, "down")}
                                className="p-0.5 text-slate-400 hover:text-slate-600"
                                disabled={index === experienceProList.length - 1}
                              >
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <p className="font-bold text-slate-850 dark:text-white">{exp.role}</p>
                            <p className="text-xs text-slate-450 dark:text-slate-400">{exp.company} • {exp.period}</p>
                          </td>
                          <td className="py-3 px-2">
                            <button
                              onClick={() => handleToggleVisibility("exppro", exp.id)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg font-semibold ${
                                exp.visible
                                  ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                                  : "bg-amber-50 dark:bg-amber-950/20 text-slate-500"
                              }`}
                            >
                              {exp.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              {exp.visible ? "Affiché" : "Masqué"}
                            </button>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <div className="inline-flex gap-1.5">
                              <button
                                onClick={() => openEditModal("exppro", exp)}
                                className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg transition"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => triggerDelete("exppro", exp.id, exp.role)}
                                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {/* EXP BENEVOLE LIST ROWS */}
                      {activeTab === "expbenevole" && experienceBenevoleList.map((exp, index) => (
                        <tr key={exp.id} className="text-sm">
                          <td className="py-3 px-2">
                            <div className="flex flex-col gap-0.5">
                              <button
                                onClick={() => handleMoveItem("expbenevole", index, "up")}
                                className="p-0.5 text-slate-400 hover:text-slate-600"
                                disabled={index === 0}
                              >
                                <ChevronUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleMoveItem("expbenevole", index, "down")}
                                className="p-0.5 text-slate-400 hover:text-slate-600"
                                disabled={index === experienceBenevoleList.length - 1}
                              >
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <p className="font-bold text-slate-850 dark:text-white">{exp.role}</p>
                            <p className="text-xs text-slate-450 dark:text-slate-400">{exp.organization} • {exp.period}</p>
                          </td>
                          <td className="py-3 px-2">
                            <button
                              onClick={() => handleToggleVisibility("expbenevole", exp.id)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg font-semibold ${
                                exp.visible
                                  ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                                  : "bg-amber-50 dark:bg-amber-950/20 text-slate-500"
                              }`}
                            >
                              {exp.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              {exp.visible ? "Affiché" : "Masqué"}
                            </button>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <div className="inline-flex gap-1.5">
                              <button
                                onClick={() => openEditModal("expbenevole", exp)}
                                className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg transition"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => triggerDelete("expbenevole", exp.id, exp.role)}
                                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {/* PROJECTS LIST ROWS */}
                      {activeTab === "projects" && projectList.map((proj, index) => (
                        <tr key={proj.id} className="text-sm">
                          <td className="py-3 px-2">
                            <div className="flex flex-col gap-0.5">
                              <button
                                onClick={() => handleMoveItem("projects", index, "up")}
                                className="p-0.5 text-slate-400 hover:text-slate-600"
                                disabled={index === 0}
                              >
                                <ChevronUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleMoveItem("projects", index, "down")}
                                className="p-0.5 text-slate-400 hover:text-slate-600"
                                disabled={index === projectList.length - 1}
                              >
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <p className="font-bold text-slate-850 dark:text-white">{proj.title}</p>
                            <p className="text-xs text-slate-450 dark:text-slate-400 line-clamp-1">{proj.description}</p>
                          </td>
                          <td className="py-3 px-2">
                            <button
                              onClick={() => handleToggleVisibility("projects", proj.id)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg font-semibold ${
                                proj.visible
                                  ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                                  : "bg-amber-50 dark:bg-amber-950/20 text-slate-500"
                              }`}
                            >
                              {proj.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              {proj.visible ? "Affiché" : "Masqué"}
                            </button>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <div className="inline-flex gap-1.5">
                              <button
                                onClick={() => openEditModal("projects", proj)}
                                className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg transition"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => triggerDelete("projects", proj.id, proj.title)}
                                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {/* SKILLS LIST ROWS */}
                      {activeTab === "skills" && skillList.map((skill, index) => (
                        <tr key={skill.id} className="text-sm">
                          <td className="py-3 px-2">
                            <div className="flex flex-col gap-0.5">
                              <button
                                onClick={() => handleMoveItem("skills", index, "up")}
                                className="p-0.5 text-slate-400 hover:text-slate-600"
                                disabled={index === 0}
                              >
                                <ChevronUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleMoveItem("skills", index, "down")}
                                className="p-0.5 text-slate-400 hover:text-slate-600"
                                disabled={index === skillList.length - 1}
                              >
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-2 truncate max-w-xs">
                            <p className="font-bold text-slate-850 dark:text-white capitalize">{skill.name}</p>
                            <p className="text-xs text-slate-450 dark:text-slate-400">Catégorie: {skill.category} • Niveau: {skill.level}%</p>
                          </td>
                          <td className="py-3 px-2">
                            <button
                              onClick={() => handleToggleVisibility("skills", skill.id)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg font-semibold ${
                                skill.visible
                                  ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                                  : "bg-amber-50 dark:bg-amber-950/20 text-slate-500"
                              }`}
                            >
                              {skill.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              {skill.visible ? "Affiché" : "Masqué"}
                            </button>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <div className="inline-flex gap-1.5">
                              <button
                                onClick={() => openEditModal("skills", skill)}
                                className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg transition"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => triggerDelete("skills", skill.id, skill.name)}
                                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {/* CERTIFICATE LIST ROWS */}
                      {activeTab === "certificates" && certificateList.map((cert, index) => (
                        <tr key={cert.id} className="text-sm">
                          <td className="py-3 px-2">
                            <div className="flex flex-col gap-0.5">
                              <button
                                onClick={() => handleMoveItem("certificates", index, "up")}
                                className="p-0.5 text-slate-400 hover:text-slate-600"
                                disabled={index === 0}
                              >
                                <ChevronUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleMoveItem("certificates", index, "down")}
                                className="p-0.5 text-slate-400 hover:text-slate-600"
                                disabled={index === certificateList.length - 1}
                              >
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <p className="font-bold text-slate-850 dark:text-white">{cert.name}</p>
                            <p className="text-xs text-slate-450 dark:text-slate-400">{cert.issuer} • {cert.issueDate}</p>
                          </td>
                          <td className="py-3 px-2">
                            <button
                              onClick={() => handleToggleVisibility("certificates", cert.id)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg font-semibold ${
                                cert.visible
                                  ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                                  : "bg-amber-50 dark:bg-amber-950/20 text-slate-500"
                              }`}
                            >
                              {cert.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              {cert.visible ? "Affiché" : "Masqué"}
                            </button>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <div className="inline-flex gap-1.5">
                              <button
                                onClick={() => openEditModal("certificates", cert)}
                                className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg transition"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => triggerDelete("certificates", cert.id, cert.name)}
                                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {/* TESTIMONIALS LIST ROWS */}
                      {activeTab === "testimonials" && testimonialList.map((test, index) => (
                        <tr key={test.id} className="text-sm">
                          <td className="py-3 px-2">
                            <div className="flex flex-col gap-0.5">
                              <button
                                onClick={() => handleMoveItem("testimonials", index, "up")}
                                className="p-0.5 text-slate-400 hover:text-slate-600"
                                disabled={index === 0}
                              >
                                <ChevronUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleMoveItem("testimonials", index, "down")}
                                className="p-0.5 text-slate-400 hover:text-slate-600"
                                disabled={index === testimonialList.length - 1}
                              >
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shrink-0 shadow-2xs">
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
                                <p className="font-bold text-slate-850 dark:text-white leading-tight">{test.name}</p>
                                <p className="text-xs text-slate-450 dark:text-slate-400 line-clamp-1 mt-0.5">{test.role}, {test.company}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <button
                              onClick={() => handleToggleVisibility("testimonials", test.id)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg font-semibold ${
                                test.visible
                                  ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                                  : "bg-amber-50 dark:bg-amber-950/20 text-slate-500"
                              }`}
                            >
                              {test.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              {test.visible ? "Affiché" : "Masqué"}
                            </button>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <div className="inline-flex gap-1.5">
                              <button
                                onClick={() => openEditModal("testimonials", test)}
                                className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg transition"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => triggerDelete("testimonials", test.id, test.name)}
                                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MESSAGES / RECEIVED QUERIES CONTROLS */}
            {activeTab === "messages" && (
              <div className="space-y-6 animate-in fade-in duration-200 text-left">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                  <h2 className="text-xl font-bold font-display text-slate-800 dark:text-white leading-none">
                    Boîte de Réception ({messageList.length})
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Lisez et répondez aux messages du formulaire de contact public</p>
                </div>

                <div className="space-y-5">
                  {messageList.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-6 rounded-2xl border text-left flex flex-col justify-between gap-4 transition-all relative ${
                        !msg.read
                          ? "bg-indigo-50/20 dark:bg-indigo-950/15 border-indigo-200 dark:border-indigo-900/50 shadow-sm"
                          : "bg-slate-50/50 dark:bg-slate-900/40 border-slate-150 dark:border-slate-800"
                      }`}
                    >
                      {/* Read node indicator */}
                      {!msg.read && (
                        <span className="absolute top-6 right-6 w-2.5 h-2.5 bg-indigo-600 rounded-full animate-pulse" />
                      )}

                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-mono text-slate-400">
                            Reçu le {new Date(msg.date).toLocaleDateString("fr-FR")} à {new Date(msg.date).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            msg.status === "new"
                              ? "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400"
                              : msg.status === "replied"
                              ? "bg-emerald-55 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                          }`}>
                            {msg.status === "new" ? "Nouveau" : msg.status === "replied" ? "Répondu" : "Archivé"}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-bold font-display text-slate-800 dark:text-white">
                            Sujet : {msg.subject}
                          </h4>
                          <p className="text-xs text-slate-550 dark:text-slate-400">
                            Expéditeur : <strong>{msg.name}</strong> •{" "}
                            <a href={`mailto:${msg.email}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                              {msg.email}
                            </a>
                          </p>
                        </div>

                        <p className="text-sm text-slate-650 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 leading-relaxed font-sans whitespace-pre-wrap">
                          {msg.message}
                        </p>
                      </div>

                      {/* Messages actions */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200/40 dark:border-slate-800/80">
                        <div className="flex flex-wrap gap-2">
                          {msg.status !== "replied" && (
                            <button
                              onClick={() => handleMarkMessageStatus(msg.id, "replied")}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-400 text-xs font-semibold"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              Répondre (Simulé)
                            </button>
                          )}
                          {msg.status !== "archived" && (
                            <button
                              onClick={() => handleMarkMessageStatus(msg.id, "archived")}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                            >
                              <Archive className="w-3.5 h-3.5" />
                              Archiver
                            </button>
                          )}
                          {msg.status !== "new" && (
                            <button
                              onClick={() => handleMarkMessageStatus(msg.id, "new")}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-400 text-xs font-semibold"
                            >
                              Marquer non lu
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => triggerDelete("messages", msg.id, msg.subject)}
                          className="p-2 text-slate-405 hover:text-rose-500 rounded-lg hover:bg-slate-100/50 dark:hover:bg-slate-800"
                          title="Supprimer définitivement"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                  {messageList.length === 0 && (
                    <div className="text-center py-12 text-slate-450 text-sm">
                      Aucun message de contact reçu pour le moment.
                    </div>
                  )}
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* CRUD FORMS POPUP MODALS (Renders dynamically based on modal type state) */}
      {activeFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setActiveFormModal(null)} />
          
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg max-h-[85vh] shadow-2xl flex flex-col z-10 text-left">
            
            {/* Header Form panel */}
            <div className="p-6 border-b border-slate-150 dark:border-slate-805 flex items-center justify-between flex-shrink-0">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white capitalize">
                {activeFormModal.mode === "add" ? "Ajouter " : "Modifier "}
                {activeFormModal.type === "education"
                  ? "une formation"
                  : activeFormModal.type === "exppro"
                  ? "une expérience pro"
                  : activeFormModal.type === "expbenevole"
                  ? "un bénévolat"
                  : activeFormModal.type === "projects"
                  ? "un projet"
                  : activeFormModal.type === "skills"
                  ? "une compétence"
                  : activeFormModal.type === "certificates"
                  ? "un certificat"
                  : "une recommandation"}
              </h3>
              <button onClick={() => setActiveFormModal(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Fields container */}
            <div className="p-6 overflow-y-auto space-y-4">
              
              {/* EDUCATION FORM FIELDS */}
              {activeFormModal.type === "education" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">École / Université *</label>
                    <input
                      type="text"
                      placeholder="Ex: Sorbonne Université"
                      value={tempEducation.school || ""}
                      onChange={(e) => setTempEducation({ ...tempEducation, school: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-805 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Nom du Diplôme / Titre *</label>
                    <input
                      type="text"
                      placeholder="Ex: Licence Informatique"
                      value={tempEducation.degree || ""}
                      onChange={(e) => setTempEducation({ ...tempEducation, degree: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-805 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase">Période (Années)</label>
                      <input
                        type="text"
                        placeholder="Ex: 2021 - 2024"
                        value={tempEducation.period || ""}
                        onChange={(e) => setTempEducation({ ...tempEducation, period: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-805 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase">Lieu</label>
                      <input
                        type="text"
                        placeholder="Ex: Paris"
                        value={tempEducation.location || ""}
                        onChange={(e) => setTempEducation({ ...tempEducation, location: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-805 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Moyenne ou Mention</label>
                    <input
                      type="text"
                      placeholder="Ex: Mention Bien"
                      value={tempEducation.grade || ""}
                      onChange={(e) => setTempEducation({ ...tempEducation, grade: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-805 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Description / Matières principales</label>
                    <textarea
                      rows={3}
                      placeholder="Contenu enseigné..."
                      value={tempEducation.description || ""}
                      onChange={(e) => setTempEducation({ ...tempEducation, description: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-805 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white resize-none"
                    />
                  </div>
                </div>
              )}

              {/* EXPERIENCE PRO FORM FIELDS */}
              {activeFormModal.type === "exppro" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Nom de l'Entreprise *</label>
                    <input
                      type="text"
                      placeholder="Ex: Criteo"
                      value={tempExpPro.company || ""}
                      onChange={(e) => setTempExpPro({ ...tempExpPro, company: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-805 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Rôle / Poste *</label>
                    <input
                      type="text"
                      placeholder="Ex: Stagiaire Fullstack"
                      value={tempExpPro.role || ""}
                      onChange={(e) => setTempExpPro({ ...tempExpPro, role: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-805 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase">Période (Dates)</label>
                      <input
                        type="text"
                        placeholder="Ex: Avril - Sept 2025"
                        value={tempExpPro.period || ""}
                        onChange={(e) => setTempExpPro({ ...tempExpPro, period: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-805 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase">Lieu</label>
                      <input
                        type="text"
                        placeholder="Ex: Paris (Remote)"
                        value={tempExpPro.location || ""}
                        onChange={(e) => setTempExpPro({ ...tempExpPro, location: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-805 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">URL Logo de l'entreprise</label>
                    <input
                      type="text"
                      placeholder="Image address..."
                      value={tempExpPro.logoUrl || ""}
                      onChange={(e) => setTempExpPro({ ...tempExpPro, logoUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-805 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Technologies utilisées (séparées par une virgule)</label>
                    <input
                      type="text"
                      placeholder="Ex: React, Node, Docker"
                      value={tempExpPro.tags ? tempExpPro.tags.join(", ") : ""}
                      onChange={(e) => setTempExpPro({ ...tempExpPro, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-805 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Missions et réalisations</label>
                    <textarea
                      rows={3}
                      placeholder="Descriptif détaillé..."
                      value={tempExpPro.description || ""}
                      onChange={(e) => setTempExpPro({ ...tempExpPro, description: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-805 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white resize-none"
                    />
                  </div>
                </div>
              )}

              {/* EXPERIENCES BENEVOLES FORM FIELDS */}
              {activeFormModal.type === "expbenevole" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Association / Organisme *</label>
                    <input
                      type="text"
                      placeholder="Ex: Saclay d'Code"
                      value={tempExpBenevole.organization || ""}
                      onChange={(e) => setTempExpBenevole({ ...tempExpBenevole, organization: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Rôle / Mission *</label>
                    <input
                      type="text"
                      placeholder="Ex: Responsable Technique"
                      value={tempExpBenevole.role || ""}
                      onChange={(e) => setTempExpBenevole({ ...tempExpBenevole, role: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Période</label>
                    <input
                      type="text"
                      placeholder="Ex: 2024 - Présent"
                      value={tempExpBenevole.period || ""}
                      onChange={(e) => setTempExpBenevole({ ...tempExpBenevole, period: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Mots clés ou compétences (séparés par une virgule)</label>
                    <input
                      type="text"
                      placeholder="Ex: Pédagogie, Mentoring"
                      value={tempExpBenevole.tags ? tempExpBenevole.tags.join(", ") : ""}
                      onChange={(e) => setTempExpBenevole({ ...tempExpBenevole, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Description de l'engagement</label>
                    <textarea
                      rows={3}
                      placeholder="Décrivez votre implication..."
                      value={tempExpBenevole.description || ""}
                      onChange={(e) => setTempExpBenevole({ ...tempExpBenevole, description: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white resize-none"
                    />
                  </div>
                </div>
              )}

              {/* PROJECTS FORM FIELDS */}
              {activeFormModal.type === "projects" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Titre du Projet *</label>
                    <input
                      type="text"
                      placeholder="Ex: NeuroInsight"
                      value={tempProject.title || ""}
                      onChange={(e) => setTempProject({ ...tempProject, title: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Description courte *</label>
                    <input
                      type="text"
                      placeholder="Accroche en 1 phrase..."
                      value={tempProject.description || ""}
                      onChange={(e) => setTempProject({ ...tempProject, description: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Description complète (Besoins, fonctionnalités)</label>
                    <textarea
                      rows={3}
                      placeholder="Texte détaillé..."
                      value={tempProject.longDescription || ""}
                      onChange={(e) => setTempProject({ ...tempProject, longDescription: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase">Lien Repo GitHub</label>
                      <input
                        type="text"
                        placeholder="https://github.com/..."
                        value={tempProject.githubUrl || ""}
                        onChange={(e) => setTempProject({ ...tempProject, githubUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase">Lien Démo Live</label>
                      <input
                        type="text"
                        placeholder="https://..."
                        value={tempProject.demoUrl || ""}
                        onChange={(e) => setTempProject({ ...tempProject, demoUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {/* Main image / Image de couverture */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase">Image Principale du Projet (Fichier local / BLOB)</label>
                      <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                        {/* Preview */}
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden shrink-0 relative group shadow-xs">
                          {tempProject.imageUrl ? (
                            <>
                              <img
                                src={tempProject.imageUrl}
                                alt="Aperçu projet"
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => setTempProject({ ...tempProject, imageUrl: "" })}
                                className="absolute inset-0 bg-rose-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity font-bold text-[10px] flex items-center justify-center cursor-pointer"
                              >
                                Supprimer
                              </button>
                            </>
                          ) : (
                            <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center text-[10px] font-bold">
                              <ImageIcon className="w-5 h-5 mb-1 text-slate-400" />
                              <span>Aucune</span>
                            </div>
                          )}
                        </div>

                        {/* Drag and drop main image */}
                        <div
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsDraggingProject(true);
                          }}
                          onDragLeave={() => setIsDraggingProject(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setIsDraggingProject(false);
                            const file = e.dataTransfer.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                if (typeof reader.result === "string") {
                                  setTempProject({ ...tempProject, imageUrl: reader.result });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          onClick={() => {
                            const fileInput = document.getElementById("project-main-upload-input");
                            fileInput?.click();
                          }}
                          className={`flex-1 border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                            isDraggingProject
                              ? "border-indigo-500 bg-indigo-50/10 dark:bg-indigo-950/10 scale-[1.01]"
                              : "border-slate-200 hover:border-indigo-400 dark:border-slate-800 dark:hover:border-indigo-900/40 bg-white/5"
                          }`}
                        >
                          <input
                            id="project-main-upload-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                  if (typeof reader.result === "string") {
                                    setTempProject({ ...tempProject, imageUrl: reader.result });
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          <Upload className="w-4 h-4 text-indigo-500" />
                          <div className="text-xs leading-tight text-slate-600 dark:text-slate-350 select-none">
                            <span className="font-bold text-indigo-600 dark:text-indigo-400">Glissez-déposez</span> une image ou <span className="underline">parcourez</span>
                          </div>
                          <p className="text-[9px] text-slate-400 select-none">Image de couverture / principale</p>
                        </div>
                      </div>
                    </div>

                    {/* Gallery Images / Images secondaires */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase">Galerie d'Images Secondaires (Télécharger Fichiers multiples / BLOB)</label>
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDraggingProjectGallery(true);
                        }}
                        onDragLeave={() => setIsDraggingProjectGallery(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDraggingProjectGallery(false);
                          const files = Array.from(e.dataTransfer.files || []);
                          if (files.length > 0) {
                            const currentList = tempProject.imageUrls || [];
                            const readPromises = files.map((file: any) => {
                              return new Promise<string>((resolve) => {
                                const reader = new FileReader();
                                reader.onload = () => {
                                  if (typeof reader.result === "string") {
                                    resolve(reader.result);
                                  } else {
                                    resolve("");
                                  }
                                };
                                reader.readAsDataURL(file);
                              });
                            });
                            Promise.all(readPromises).then((results) => {
                              const validResults = results.filter(Boolean);
                              setTempProject({
                                ...tempProject,
                                imageUrls: [...currentList, ...validResults],
                              });
                            });
                          }
                        }}
                        onClick={() => {
                          const fileInput = document.getElementById("project-gallery-upload-input");
                          fileInput?.click();
                        }}
                        className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                          isDraggingProjectGallery
                            ? "border-indigo-500 bg-indigo-50/10 dark:bg-indigo-950/10 scale-[1.01]"
                            : "border-slate-200 hover:border-indigo-400 dark:border-slate-800 dark:hover:border-indigo-900/40 bg-white/5"
                        }`}
                      >
                        <input
                          id="project-gallery-upload-input"
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            if (files.length > 0) {
                              const currentList = tempProject.imageUrls || [];
                              const readPromises = files.map((file: any) => {
                                return new Promise<string>((resolve) => {
                                  const reader = new FileReader();
                                  reader.onload = () => {
                                    if (typeof reader.result === "string") {
                                      resolve(reader.result);
                                    } else {
                                      resolve("");
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                });
                              });
                              Promise.all(readPromises).then((results) => {
                                const validResults = results.filter(Boolean);
                                setTempProject({
                                  ...tempProject,
                                  imageUrls: [...currentList, ...validResults],
                                });
                              });
                            }
                          }}
                        />
                        <Upload className="w-4 h-4 text-indigo-500" />
                        <div className="text-xs leading-tight text-slate-600 dark:text-slate-350 select-none">
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">Glissez-déposez plusieurs fichiers</span> ou <span className="underline">parcourez</span>
                        </div>
                        <p className="text-[9px] text-slate-400 select-none">Ajoutez autant d'images secondaires que désiré</p>
                      </div>

                      {/* Galerie thumbnails grid */}
                      {tempProject.imageUrls && tempProject.imageUrls.length > 0 && (
                        <div className="pt-2">
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 flex items-center gap-1">
                            <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Contenu de la galerie ({tempProject.imageUrls.length})</span>
                          </p>
                          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 bg-slate-100 dark:bg-slate-950/40 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-850">
                            {tempProject.imageUrls.map((gImg, gIdx) => (
                              <div
                                key={gIdx}
                                className="aspect-square rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden relative group shadow-sm bg-slate-200 dark:bg-slate-900"
                              >
                                <img
                                  src={gImg}
                                  alt={`Galerie ${gIdx + 1}`}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const filtered = (tempProject.imageUrls || []).filter((_, i) => i !== gIdx);
                                    setTempProject({ ...tempProject, imageUrls: filtered });
                                  }}
                                  className="absolute inset-0 bg-rose-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold text-[10px] cursor-pointer"
                                  title="Supprimer cette image"
                                >
                                  Retirer
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Défis techniques et solutions apportées</label>
                    <textarea
                      rows={2}
                      placeholder="Principaux défis rencontrés..."
                      value={tempProject.challenges || ""}
                      onChange={(e) => setTempProject({ ...tempProject, challenges: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Badges technologiques (séparés par des virgules)</label>
                    <input
                      type="text"
                      placeholder="Ex: React, Node, Web Crypto, Python"
                      value={tempProject.tags ? tempProject.tags.join(", ") : ""}
                      onChange={(e) => setTempProject({ ...tempProject, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {/* SKILLS FORM FIELDS */}
              {activeFormModal.type === "skills" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Nom de la compétence *</label>
                    <input
                      type="text"
                      placeholder="Ex: TypeScript"
                      value={tempSkill.name || ""}
                      onChange={(e) => setTempSkill({ ...tempSkill, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Catégorie</label>
                    <select
                      value={tempSkill.category || "languages"}
                      onChange={(e) => setTempSkill({ ...tempSkill, category: e.target.value as any })}
                      className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    >
                      <option value="languages">Langage</option>
                      <option value="frameworks">Framework & Librairie</option>
                      <option value="tools">Outil & DevOps</option>
                      <option value="soft_skills">Soft Skills (Savoir-être)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                      <span>Niveau de maîtrise</span>
                      <span>{tempSkill.level !== undefined ? tempSkill.level : 80}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={tempSkill.level !== undefined ? tempSkill.level : 80}
                      onChange={(e) => setTempSkill({ ...tempSkill, level: parseInt(e.target.value) })}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </div>
              )}

              {/* CERTIFICATE FORM FIELDS */}
              {activeFormModal.type === "certificates" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Nom du Certificat / Examen *</label>
                    <input
                      type="text"
                      placeholder="Ex: Cloud Architect AWS"
                      value={tempCert.name || ""}
                      onChange={(e) => setTempCert({ ...tempCert, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-405 uppercase">Organisme Émetteur *</label>
                    <input
                      type="text"
                      placeholder="Ex: Google Cloud"
                      value={tempCert.issuer || ""}
                      onChange={(e) => setTempCert({ ...tempCert, issuer: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-405 uppercase">Date de certification</label>
                    <input
                      type="text"
                      placeholder="Ex: Mars 2025"
                      value={tempCert.issueDate || ""}
                      onChange={(e) => setTempCert({ ...tempCert, issueDate: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase">Image du Badge / Miniature du Certificat (Fichier local / BLOB)</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                      {/* Preview Thumbnail */}
                      <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 flex items-center justify-center overflow-hidden shrink-0 relative group shadow-sm">
                        {tempCert.imageUrl ? (
                          <>
                            <img
                              src={tempCert.imageUrl}
                              alt="Badge"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-contain p-1"
                            />
                            <button
                              type="button"
                              onClick={() => setTempCert({ ...tempCert, imageUrl: "" })}
                              className="absolute inset-0 bg-rose-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity font-bold text-[10px] flex items-center justify-center cursor-pointer"
                            >
                              Supprimer
                            </button>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center text-[9px] font-bold">
                            <ImageIcon className="w-4 h-4 mb-1 text-slate-400" />
                            <span>Aucune</span>
                          </div>
                        )}
                      </div>

                      {/* Drag & Drop Upload Zone */}
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDraggingCert(true);
                        }}
                        onDragLeave={() => setIsDraggingCert(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDraggingCert(false);
                          const file = e.dataTransfer.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (typeof reader.result === "string") {
                                setTempCert({ ...tempCert, imageUrl: reader.result });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        onClick={() => {
                          const fileInput = document.getElementById("cert-badge-upload-input");
                          fileInput?.click();
                        }}
                        className={`flex-1 border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-0.5 min-h-[80px] ${
                          isDraggingCert
                            ? "border-indigo-500 bg-indigo-50/10 dark:bg-indigo-950/10 scale-[1.01]"
                            : "border-slate-200 hover:border-indigo-400 dark:border-slate-850 dark:hover:border-indigo-900/40 bg-white/5"
                        }`}
                      >
                        <input
                          id="cert-badge-upload-input"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                if (typeof reader.result === "string") {
                                  setTempCert({ ...tempCert, imageUrl: reader.result });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <Upload className="w-4 h-4 text-indigo-500" />
                        <div className="text-[11px] leading-tight text-slate-600 dark:text-slate-350 select-none">
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">Glissez-déposez</span> l'image ou <span className="underline">parcourez</span>
                        </div>
                        <p className="text-[9px] text-slate-400 select-none">Logo de certification (PNG, JPG, SVG)</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-405 uppercase">URL vers le justificatif de réussite</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={tempCert.credentialUrl || ""}
                      onChange={(e) => setTempCert({ ...tempCert, credentialUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-405 uppercase">Impact professionnel</label>
                    <textarea
                      rows={4}
                      placeholder="Décrivez l'impact professionnel de cette certification sur vos projets et compétences"
                      value={tempCert.impactProfessionnel || ""}
                      onChange={(e) => setTempCert({ ...tempCert, impactProfessionnel: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white resize-none"
                    />
                  </div>
                </div>
              )}

              {/* TESTIMONIAL FORM FIELDS */}
              {activeFormModal.type === "testimonials" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Nom de l'auteur *</label>
                    <input
                      type="text"
                      placeholder="Ex: Professeur Jean Dupont"
                      value={tempTestimonial.name || ""}
                      onChange={(e) => setTempTestimonial({ ...tempTestimonial, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase">Poste / Fonction</label>
                      <input
                        type="text"
                        placeholder="Ex: Enseignant Chercheur"
                        value={tempTestimonial.role || ""}
                        onChange={(e) => setTempTestimonial({ ...tempTestimonial, role: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase">Organisation / École</label>
                      <input
                        type="text"
                        placeholder="Ex: Paris-Saclay"
                        value={tempTestimonial.company || ""}
                        onChange={(e) => setTempTestimonial({ ...tempTestimonial, company: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Commentaire / Témoignage *</label>
                    <textarea
                      rows={3}
                      placeholder="Texte de recommandation..."
                      value={tempTestimonial.feedback || ""}
                      onChange={(e) => setTempTestimonial({ ...tempTestimonial, feedback: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase">Note attribuée (1 à 5)</label>
                      <select
                        value={tempTestimonial.rating || 5}
                        onChange={(e) => setTempTestimonial({ ...tempTestimonial, rating: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white h-[44px]"
                      >
                        <option value="5">5 étoiles</option>
                        <option value="4">4 étoiles</option>
                        <option value="3">3 étoiles</option>
                      </select>


                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase font-sans">Photo de l'auteur (Fichier ou Drag & Drop)</label>
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDraggingImage(true);
                        }}
                        onDragLeave={() => setIsDraggingImage(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDraggingImage(false);
                          const file = e.dataTransfer.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (typeof reader.result === "string") {
                                setTempTestimonial({ ...tempTestimonial, avatarUrl: reader.result });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        onClick={() => {
                          const fileInput = document.getElementById("testimonial-image-upload-input");
                          fileInput?.click();
                        }}
                        className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-1 min-h-[110px] ${
                          isDraggingImage 
                            ? "border-indigo-500 bg-indigo-50/10 dark:bg-indigo-950/10 scale-[1.02]" 
                            : "border-slate-200 hover:border-indigo-400 dark:border-slate-800 dark:hover:border-indigo-850/80 bg-white/5"
                        }`}
                      >
                        <input
                          id="testimonial-image-upload-input"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                if (typeof reader.result === "string") {
                                  setTempTestimonial({ ...tempTestimonial, avatarUrl: reader.result });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <Upload className="w-5 h-5 text-indigo-500" />
                        <div className="text-[11px] leading-tight text-slate-600 dark:text-slate-350 mt-1 select-none">
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">Glissez-déposez</span> ou <span className="underline">parcourez</span>
                        </div>
                        <p className="text-[9px] text-slate-400 select-none">Format PNG, JPG, WEBP ou SVG</p>
                      </div>
                    </div>
                  </div>

                  {/* Image Live Preview & Presets */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-850 flex flex-col sm:flex-row gap-4 items-center">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 shrink-0 flex items-center justify-center text-slate-400">
                      {tempTestimonial.avatarUrl ? (
                        <img
                          src={tempTestimonial.avatarUrl}
                          alt="Aperçu"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150";
                          }}
                        />
                      ) : (
                        <span className="text-xs">Aucun</span>
                      )}
                    </div>
                    <div className="flex-1 space-y-1 text-center sm:text-left">
                      <p className="text-xs font-bold text-slate-500 uppercase">Photos Prédéfinies (Clic rapide)</p>
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        {[
                          { name: "Professeur H", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150" },
                          { name: "Professionnelle F", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" },
                          { name: "Professeur Senior", url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150" },
                          { name: "Développeuse F", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150" },
                        ].map((preset, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => setTempTestimonial({ ...tempTestimonial, avatarUrl: preset.url })}
                            className="px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 hover:border-slate-350 dark:hover:border-slate-600 transition text-[10px] font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Footer Form panel */}
            <div className="p-6 border-t border-slate-150 dark:border-slate-805 flex items-center justify-end gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => setActiveFormModal(null)}
                className="px-4.5 py-2.5 text-xs font-semibold text-slate-650 bg-slate-100 rounded-xl border border-slate-250 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSaveForm}
                className="px-4.5 py-2.5 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-750 transition"
              >
                Sauvegarder
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CONFIRM DELETE DIALOG OVERLAYS */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl z-10 text-center space-y-6">
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-full w-fit mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-display font-black text-lg text-slate-900 dark:text-white">
                Confirmer la suppression
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Êtes-vous sûr de vouloir supprimer définitivement <strong className="font-bold text-slate-800 dark:text-white">"{deleteConfirm.title}"</strong> ? Cette action est irréversible.
              </p>
            </div>

            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-650 hover:bg-slate-50 cursor-pointer text-slate-705 dark:text-slate-350"
              >
                Annuler
              </button>
              <button
                onClick={executeDelete}
                className="px-4 py-2 bg-rose-605 text-white bg-red-600 hover:bg-red-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
