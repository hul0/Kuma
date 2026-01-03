export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  graduationDate: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string; // Comma separated
  projects: Project[];
}

export const initialResumeData: ResumeData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  portfolio: "",
  summary: "",
  experience: [],
  education: [],
  skills: "",
  projects: []
};
