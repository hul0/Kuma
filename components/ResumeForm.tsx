import React from 'react';
import { ResumeData, Experience, Education, Project } from '../types';
import { TextInput, TextArea, SectionTitle, Button } from './FormComponents';
import { Plus, Trash2, Briefcase, GraduationCap, User, Code, FileText, FolderGit2 } from 'lucide-react';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange, onGenerate, isGenerating }) => {
  
  const handleChange = (field: keyof ResumeData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleArrayChange = <T extends { id: string }>(
    field: keyof ResumeData, 
    id: string, 
    key: keyof T, 
    value: string
  ) => {
    const list = data[field] as T[];
    const updatedList = list.map(item => item.id === id ? { ...item, [key]: value } : item);
    onChange({ ...data, [field]: updatedList });
  };

  const addItem = (field: 'experience' | 'education' | 'projects') => {
    const id = crypto.randomUUID();
    let newItem: any;
    if (field === 'experience') {
      newItem = { id, company: '', role: '', startDate: '', endDate: '', description: '' };
    } else if (field === 'education') {
      newItem = { id, school: '', degree: '', graduationDate: '' };
    } else {
      newItem = { id, name: '', description: '', link: '' };
    }
    onChange({ ...data, [field]: [...data[field], newItem] });
  };

  const removeItem = (field: 'experience' | 'education' | 'projects', id: string) => {
    const list = data[field] as any[];
    onChange({ ...data, [field]: list.filter(item => item.id !== id) });
  };

  return (
    <div className="p-6 space-y-8 pb-24">
      
      {/* Personal Info */}
      <section>
        <SectionTitle title="Personal Details" icon={<User className="w-5 h-5 text-indigo-600"/>} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Full Name" value={data.fullName} onChange={e => handleChange('fullName', e.target.value)} placeholder="Jane Doe" />
          <TextInput label="Job Title / Headline" value={data.summary} onChange={e => handleChange('summary', e.target.value)} placeholder="Senior Software Engineer" />
          <TextInput label="Email" value={data.email} onChange={e => handleChange('email', e.target.value)} placeholder="jane@example.com" />
          <TextInput label="Phone" value={data.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
          <TextInput label="Location" value={data.location} onChange={e => handleChange('location', e.target.value)} placeholder="New York, NY" />
          <TextInput label="LinkedIn URL" value={data.linkedin} onChange={e => handleChange('linkedin', e.target.value)} placeholder="linkedin.com/in/janedoe" />
          <TextInput label="Portfolio URL" value={data.portfolio} onChange={e => handleChange('portfolio', e.target.value)} placeholder="janedoe.com" />
        </div>
      </section>

      {/* Experience */}
      <section>
        <SectionTitle 
          title="Experience" 
          icon={<Briefcase className="w-5 h-5 text-indigo-600"/>} 
          action={<Button variant="secondary" onClick={() => addItem('experience')} size="sm"><Plus className="w-4 h-4" /> Add</Button>}
        />
        <div className="space-y-6">
          {data.experience.map((exp) => (
            <div key={exp.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm relative group">
              <button 
                onClick={() => removeItem('experience', exp.id)}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <TextInput label="Company" value={exp.company} onChange={e => handleArrayChange<Experience>('experience', exp.id, 'company', e.target.value)} />
                <TextInput label="Role" value={exp.role} onChange={e => handleArrayChange<Experience>('experience', exp.id, 'role', e.target.value)} />
                <TextInput label="Start Date" value={exp.startDate} onChange={e => handleArrayChange<Experience>('experience', exp.id, 'startDate', e.target.value)} placeholder="Jan 2022" />
                <TextInput label="End Date" value={exp.endDate} onChange={e => handleArrayChange<Experience>('experience', exp.id, 'endDate', e.target.value)} placeholder="Present" />
              </div>
              <TextArea label="Description (Bullet points or paragraph)" value={exp.description} onChange={e => handleArrayChange<Experience>('experience', exp.id, 'description', e.target.value)} placeholder="Led a team of 5 developers..." />
            </div>
          ))}
          {data.experience.length === 0 && <p className="text-slate-500 italic text-sm">No experience added yet.</p>}
        </div>
      </section>

      {/* Projects */}
      <section>
        <SectionTitle 
          title="Projects" 
          icon={<FolderGit2 className="w-5 h-5 text-indigo-600"/>} 
          action={<Button variant="secondary" onClick={() => addItem('projects')} size="sm"><Plus className="w-4 h-4" /> Add</Button>}
        />
        <div className="space-y-6">
          {data.projects.map((proj) => (
            <div key={proj.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm relative group">
              <button 
                onClick={() => removeItem('projects', proj.id)}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <TextInput label="Project Name" value={proj.name} onChange={e => handleArrayChange<Project>('projects', proj.id, 'name', e.target.value)} />
                <TextInput label="Link (Optional)" value={proj.link} onChange={e => handleArrayChange<Project>('projects', proj.id, 'link', e.target.value)} />
              </div>
              <TextArea label="Description" value={proj.description} onChange={e => handleArrayChange<Project>('projects', proj.id, 'description', e.target.value)} placeholder="Built a full-stack app using..." />
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <SectionTitle 
          title="Education" 
          icon={<GraduationCap className="w-5 h-5 text-indigo-600"/>} 
          action={<Button variant="secondary" onClick={() => addItem('education')} size="sm"><Plus className="w-4 h-4" /> Add</Button>}
        />
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm relative group">
              <button 
                onClick={() => removeItem('education', edu.id)}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextInput label="School / University" value={edu.school} onChange={e => handleArrayChange<Education>('education', edu.id, 'school', e.target.value)} />
                <TextInput label="Degree / Certificate" value={edu.degree} onChange={e => handleArrayChange<Education>('education', edu.id, 'degree', e.target.value)} />
                <TextInput label="Graduation Date" value={edu.graduationDate} onChange={e => handleArrayChange<Education>('education', edu.id, 'graduationDate', e.target.value)} placeholder="May 2020" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <SectionTitle title="Skills" icon={<Code className="w-5 h-5 text-indigo-600"/>} />
        <TextArea 
          label="List your skills (comma separated)" 
          value={data.skills} 
          onChange={e => handleChange('skills', e.target.value)} 
          placeholder="React, TypeScript, Project Management, SEO, Public Speaking..."
        />
      </section>

      <div className="sticky bottom-4 z-10">
        <Button 
          onClick={onGenerate} 
          disabled={isGenerating}
          className={`w-full py-4 text-lg shadow-lg ${isGenerating ? 'opacity-80 cursor-wait' : ''}`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enhancing with Gemini AI...
            </>
          ) : (
            <>
              <FileText className="w-5 h-5" />
              Generate Resume
            </>
          )}
        </Button>
      </div>
    </div>
  );
};