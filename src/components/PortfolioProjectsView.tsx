import React from 'react';
import { PortfolioProject } from '../types';
import { Briefcase, Code, Sparkles, CheckCircle, FolderGit2 } from 'lucide-react';

interface PortfolioProjectsViewProps {
  projects: PortfolioProject[];
}

export const PortfolioProjectsView: React.FC<PortfolioProjectsViewProps> = ({ projects }) => {
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Capstone':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Intermediate':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-start gap-3 text-xs text-indigo-950">
        <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Portfolio Proof Strategy:</span> Hiring managers in modern tech prioritize shipping over credentials. Building these concrete projects demonstrates your capability to tackle ambiguous business problems and work with current production architectures.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getDifficultyBadge(proj.difficulty)}`}>
                  {proj.difficulty} Project
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                  <FolderGit2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Public GitHub Candidate</span>
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-2">
                {proj.title}
              </h4>

              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                {proj.description}
              </p>

              <div className="mb-4">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Core Skills Demonstrated:
                </span>
                <div className="flex flex-wrap gap-1">
                  {proj.skillsDemonstrated.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs">
              <span className="font-bold text-slate-900 block mb-0.5">Why it moves hiring managers:</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {proj.realWorldImpact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
