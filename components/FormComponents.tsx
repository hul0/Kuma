import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const TextInput: React.FC<InputProps> = ({ label, className, ...props }) => (
  <div className={`mb-4 ${className}`}>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input
      {...props}
      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm"
    />
  </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, className, ...props }) => (
  <div className={`mb-4 ${className}`}>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <textarea
      {...props}
      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm min-h-[100px]"
    />
  </div>
);

export const SectionTitle: React.FC<{ title: string; icon?: React.ReactNode; action?: React.ReactNode }> = ({ title, icon, action }) => (
  <div className="flex items-center justify-between mb-4 mt-6 pb-2 border-b border-slate-200">
    <div className="flex items-center gap-2 text-lg font-semibold text-slate-800">
      {icon}
      <span>{title}</span>
    </div>
    {action}
  </div>
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
    secondary: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 shadow-sm",
    danger: "text-red-600 hover:bg-red-50 hover:text-red-700",
    ghost: "text-slate-600 hover:bg-slate-100",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
