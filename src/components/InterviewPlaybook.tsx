import React from 'react';
import { CareerPath } from '../types';
import { MessageSquareQuote, CheckCircle2, HelpCircle, Copy, Check } from 'lucide-react';

interface InterviewPlaybookProps {
  interviewStrategy: CareerPath['interviewStrategy'];
  roleTitle: string;
}

export const InterviewPlaybook: React.FC<InterviewPlaybookProps> = ({
  interviewStrategy,
  roleTitle
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(interviewStrategy.elevatorPitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Elevator Pitch Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">The "Why You" Elevator Pitch</h4>
              <p className="text-xs text-slate-500">How to frame your transition background when asked "Tell me about yourself"</p>
            </div>
          </div>

          <button
            onClick={handleCopyPitch}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Pitch</span>
              </>
            )}
          </button>
        </div>

        <blockquote className="p-4 rounded-xl bg-slate-50 border-l-4 border-indigo-600 text-xs text-slate-800 italic leading-relaxed">
          "{interviewStrategy.elevatorPitch}"
        </blockquote>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Themes to Highlight */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h4 className="text-sm font-bold text-slate-900 mb-2">Key Themes to Emphasize</h4>
          <p className="text-xs text-slate-500 mb-4">
            Repeat these foundational narratives across your interviews:
          </p>

          <ul className="space-y-2.5">
            {interviewStrategy.keyThemesToHighlight.map((theme, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700"
              >
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{theme}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sample Interview Questions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h4 className="text-sm font-bold text-slate-900 mb-2">Target Interview Questions</h4>
          <p className="text-xs text-slate-500 mb-4">
            Questions you should expect and rehearse using the STAR framework:
          </p>

          <div className="space-y-2.5">
            {interviewStrategy.sampleInterviewQuestions.map((q, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800"
              >
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="font-semibold leading-relaxed">{q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
