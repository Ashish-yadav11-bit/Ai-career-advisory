import React from 'react';
import { CareerPath, SkillGapItem } from '../types';
import { CheckCircle2, AlertTriangle, ArrowRight, Zap, CheckSquare, Square } from 'lucide-react';

interface SkillsAnalysisViewProps {
  path: CareerPath;
  learnedSkills: string[];
  onToggleLearnedSkill: (skillName: string) => void;
}

export const SkillsAnalysisView: React.FC<SkillsAnalysisViewProps> = ({
  path,
  learnedSkills,
  onToggleLearnedSkill
}) => {
  const totalGaps = path.skillsAnalysis.criticalGaps.length;
  const acquiredCount = path.skillsAnalysis.criticalGaps.filter((g) =>
    learnedSkills.includes(g.skill.toLowerCase())
  ).length;

  const baselineScore = path.matchScore;
  const currentSimulatedScore = Math.min(
    100,
    baselineScore + Math.round((acquiredCount / Math.max(1, totalGaps)) * (100 - baselineScore))
  );

  return (
    <div className="space-y-6">
      {/* Dynamic Bridge Progress Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Interactive Skill Bridge Simulator</span>
            </div>
            <h4 className="text-lg font-bold text-white">
              Skill Parity: {currentSimulatedScore}% Match
            </h4>
            <p className="text-xs text-slate-300">
              {acquiredCount} of {totalGaps} critical skill gaps addressed
            </p>
          </div>

          <div className="text-right">
            <span className="text-3xl font-extrabold text-indigo-400 tracking-tight">
              {currentSimulatedScore}%
            </span>
            <span className="text-xs text-slate-400 block">Readiness Score</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${currentSimulatedScore}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Transferable Strengths */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Transferable Foundation</h4>
              <p className="text-xs text-slate-500">Skills you currently possess that carry forward directly</p>
            </div>
          </div>

          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            These proficiencies provide your unfair advantage over candidates who must learn these systems from scratch:
          </p>

          <ul className="space-y-2.5">
            {path.skillsAnalysis.transferableStrengths.map((strength, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/40 border border-emerald-100 text-xs text-slate-800"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Critical Gaps to Bridge */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-2.5 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Skill Gaps to Bridge</h4>
                <p className="text-xs text-slate-500">Click checkboxes to simulate mastering gaps</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {path.skillsAnalysis.criticalGaps.map((gap, idx) => {
              const isLearned = learnedSkills.includes(gap.skill.toLowerCase());
              return (
                <div
                  key={idx}
                  onClick={() => onToggleLearnedSkill(gap.skill.toLowerCase())}
                  className={`cursor-pointer p-3.5 rounded-xl border text-xs transition-all ${
                    isLearned
                      ? 'bg-indigo-50/50 border-indigo-200'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <button type="button" className="text-indigo-600 focus:outline-none">
                        {isLearned ? (
                          <CheckSquare className="w-4 h-4 text-indigo-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                      <span className={`font-bold ${isLearned ? 'text-indigo-900 line-through' : 'text-slate-900'}`}>
                        {gap.skill}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase ${
                          gap.importance === 'essential'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {gap.importance}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        ~{gap.estimatedTimeToAcquire}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-[11px] pl-6 leading-relaxed">
                    {gap.whyNeeded}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
