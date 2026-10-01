import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Sparkles, Send, Loader2, Bot, User, FileText, Calendar, MessageSquare, AlertCircle } from 'lucide-react';

interface RoleDeepDiveChatProps {
  roleTitle: string;
  userProfile: UserProfile;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const RoleDeepDiveChat: React.FC<RoleDeepDiveChatProps> = ({ roleTitle, userProfile }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeAction = async (actionType: 'resume_bullets' | 'weekly_plan' | 'interview_prep' | 'custom', customQuestion?: string) => {
    const questionText = customQuestion || input;
    if (actionType === 'custom' && !questionText.trim()) return;

    let userLabel = questionText;
    if (actionType === 'resume_bullets') userLabel = 'Draft 4 tailored resume bullets repositioning my background';
    if (actionType === 'weekly_plan') userLabel = 'Generate a 4-week daily study syllabus';
    if (actionType === 'interview_prep') userLabel = 'Generate 3 interview drill questions with STAR talking points';

    setMessages((prev) => [...prev, { role: 'user', content: userLabel }]);
    if (actionType === 'custom') setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/role-deepdive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleTitle,
          userProfile,
          actionType,
          question: questionText
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to get advisory answer');
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">AI Role Deep-Dive Advisor</h4>
            <p className="text-xs text-slate-500">Ask strategic questions, generate resume bullets, or schedule your study sprint</p>
          </div>
        </div>
      </div>

      {/* Quick Action Chips */}
      <div>
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          One-Click Advisory Prompts:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => executeAction('resume_bullets')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-medium border border-slate-200 hover:border-indigo-200 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span>Draft 4 Resume Bullets</span>
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => executeAction('weekly_plan')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-medium border border-slate-200 hover:border-indigo-200 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>4-Week Daily Study Plan</span>
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => executeAction('interview_prep')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-medium border border-slate-200 hover:border-indigo-200 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
            <span>Interview Drill Prep</span>
          </button>
        </div>
      </div>

      {/* Messages list */}
      <div className="min-h-[160px] max-h-[380px] overflow-y-auto space-y-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            Select one of the actions above or ask any specific question about transitioning into {roleTitle}.
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 text-xs leading-relaxed ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`p-3.5 rounded-xl max-w-[85%] whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-slate-900 text-white font-medium'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-sm'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-6 h-6 rounded-md bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 py-2">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
            <span>AI Advisor formulating targeted intelligence...</span>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-700 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Input row */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          executeAction('custom');
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask about transitioning into ${roleTitle} (e.g. How do I pitch my current background?)...`}
          className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Ask</span>
        </button>
      </form>
    </div>
  );
};
