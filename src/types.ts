export interface Profile {
  name: string;
  title: string;
  bio: string;
  photoUrl: string;
  cvUrl: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  linkedin: string;
  github: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  period: string; // e.g., "2024 - Présent"
  location: string;
  description: string;
  grade?: string; // e.g., "Mention Bien"
  visible: boolean;
}

export interface ExperiencePro {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  logoUrl?: string;
  tags: string[];
  visible: boolean;
}

export interface ExperienceBenevole {
  id: string;
  organization: string;
  role: string;
  period: string;
  location?: string;
  description: string;
  tags: string[];
  visible: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  imageUrls?: string[];
  githubUrl: string;
  demoUrl: string;
  tags: string[];
  challenges: string;
  visible: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: "languages" | "frameworks" | "tools" | "soft_skills";
  level: number; // 0 to 100
  visible: boolean;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string;
  imageUrl: string;
  visible: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  feedback: string;
  rating: number; // 1 to 5
  avatarUrl: string;
  visible: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  status: "new" | "replied" | "archived";
}
