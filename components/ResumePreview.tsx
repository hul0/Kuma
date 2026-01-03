import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from './FormComponents';
import { Download, Edit2, Eye, Printer } from 'lucide-react';

interface ResumePreviewProps {
  markdown: string;
  onMarkdownChange: (value: string) => void;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ markdown, onMarkdownChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  if (!markdown) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-slate-50/50">
        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
          <FileTextIcon className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-600 mb-2">Ready to Build</h3>
        <p className="max-w-xs">Fill out your details on the left and click "Generate Resume" to see the magic happen.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white shadow-xl md:rounded-xl overflow-hidden border border-slate-200">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50 no-print">
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            onClick={() => setIsEditing(false)} 
            className={!isEditing ? 'bg-white shadow-sm text-indigo-600' : ''}
          >
            <Eye className="w-4 h-4" /> Preview
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setIsEditing(true)}
            className={isEditing ? 'bg-white shadow-sm text-indigo-600' : ''}
          >
            <Edit2 className="w-4 h-4" /> Edit Markdown
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" onClick={handlePrint}>
            <Printer className="w-4 h-4" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-white">
        {isEditing ? (
          <textarea
            className="w-full h-full p-6 font-mono text-sm resize-none focus:outline-none focus:ring-inset focus:ring-2 focus:ring-indigo-100"
            value={markdown}
            onChange={(e) => onMarkdownChange(e.target.value)}
            spellCheck={false}
          />
        ) : (
          <div className="resume-preview p-8 max-w-[210mm] mx-auto min-h-full">
             {/* Custom Markdown Styling */}
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-slate-900 border-b-2 border-slate-800 pb-2 mb-4 uppercase tracking-wide" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3 uppercase tracking-wider border-b border-slate-200 pb-1" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2" {...props} />,
                p: ({node, ...props}) => <p className="text-slate-700 leading-relaxed mb-3 text-sm" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 mb-4 text-slate-700 text-sm space-y-1" {...props} />,
                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                a: ({node, ...props}) => <a className="text-indigo-600 hover:underline" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold text-slate-900" {...props} />,
                hr: ({node, ...props}) => <hr className="my-6 border-slate-200" {...props} />,
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Icon for empty state
const FileTextIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
);
