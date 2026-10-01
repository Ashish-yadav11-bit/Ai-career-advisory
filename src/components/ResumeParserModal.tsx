import React, { useState } from 'react';
import { X, Sparkles, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { UserSkill } from '../types';

interface ResumeParserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyExtracted: (data: {
    currentTitle?: string;
    yearsOfExperience?: number;
    skills: UserSkill[];
    interests: string[];
    bioText: string;
  }) => void;
}

export const ResumeParserModal: React.FC<ResumeParserModalProps> = ({
  isOpen,
  onClose,
  onApplyExtracted
}) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExtract = async () => {
    if (!text.trim() || text.trim().length < 15) {
      setError('Please paste a longer resume snippet, bio, or list of your past projects and responsibilities.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/extract-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to extract abilities from text');
      }

      const data = await res.json();
      onApplyExtracted({
        currentTitle: data.currentTitle || undefined,
        yearsOfExperience: data.yearsOfExperience || undefined,
        skills: data.extractedSkills || [],
        interests: data.suggestedInterests || [],
        bioText: text
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error parsing text. Please try again or fill manually.');
    } finally {
      setIsLoading(false);
    }
  };

  const sampleBio = `Software engineer with 3 years of experience specializing in TypeScript, React, and Node.js. Built REST APIs, microservices, and high-performance web dashboards. Strong background in relational databases (PostgreSQL), Redis caching, and Docker. Passionate about machine learning, generative AI applications, and developer tools. Experienced in agile teamwork and cross-functional feature planning.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">AI Resume & Bio Parser</h3>
            <p className="text-xs text-slate-500">Paste your work history, LinkedIn summary, or project list</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
          Gemini will parse your text to automatically extract your current role, technical proficiencies, soft skills, and core passions into structured profile fields.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your resume summary, LinkedIn 'About' section, or list of achievements here..."
          rows={7}
          className="w-full text-xs font-mono p-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-slate-50/50 resize-none text-slate-800"
        />

        <div className="flex items-center justify-between mt-2 mb-4">
          <button
            type="button"
            onClick={() => setText(sampleBio)}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium underline"
          >
            Insert sample bio
          </button>
          <span className="text-xs text-slate-400">{text.length} characters</span>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isLoading || !text.trim()}
            onClick={handleExtract}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Extracting Skills...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Extract & Populate</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
