import React, { useState } from 'react';
import { ResumeData, initialResumeData } from './types';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { generateResumeWithGemini } from './services/geminiService';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [generatedMarkdown, setGeneratedMarkdown] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form'); // For mobile view

  const handleGenerate = async () => {
    setIsGenerating(true);
    // On mobile, switch to preview tab immediately so they see the loading state if we implemented one there, 
    // but here we show loading on the button. 
    // After generation, we switch.
    try {
      const markdown = await generateResumeWithGemini(resumeData);
      setGeneratedMarkdown(markdown);
      // Auto-switch to preview on mobile/tablet after generation
      if (window.innerWidth < 1024) {
        setActiveTab('preview');
      }
    } catch (error) {
      alert("Something went wrong while generating the resume. Please check your connection and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-3 shadow-sm z-20 no-print">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Gemini Resume Architect</h1>
          <p className="text-xs text-slate-500 font-medium">AI-Powered Career Builder</p>
        </div>
      </header>

      {/* Mobile Tab Navigation */}
      <div className="lg:hidden flex border-b border-slate-200 bg-white no-print">
        <button 
          onClick={() => setActiveTab('form')}
          className={`flex-1 py-3 text-sm font-medium border-b-2 ${activeTab === 'form' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'}`}
        >
          Details
        </button>
        <button 
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-3 text-sm font-medium border-b-2 ${activeTab === 'preview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'}`}
        >
          Preview & Export
        </button>
      </div>

      {/* Main Layout */}
      <main className="flex-1 overflow-hidden relative">
        <div className="flex h-full">
          
          {/* Left Panel: Form */}
          <div className={`
            w-full lg:w-1/2 h-full overflow-y-auto bg-slate-50 border-r border-slate-200 scroll-smooth
            ${activeTab === 'form' ? 'block' : 'hidden lg:block'}
          `}>
            <ResumeForm 
              data={resumeData} 
              onChange={setResumeData} 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>

          {/* Right Panel: Preview */}
          <div className={`
            w-full lg:w-1/2 h-full bg-slate-200/50 p-4 lg:p-8 overflow-y-auto
            ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}
          `}>
            <div className="h-full max-w-4xl mx-auto">
              <ResumePreview 
                markdown={generatedMarkdown} 
                onMarkdownChange={setGeneratedMarkdown} 
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
