import React, { useState } from 'react';
import { RoadmapPhase } from '../types';
import { Calendar, CheckCircle2, Circle, Flame, ArrowRight, Clock } from 'lucide-react';

interface RoadmapTimelineProps {
  phases: RoadmapPhase[];
  roleTitle: string;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ phases, roleTitle }) => {
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);

  const toggleMilestone = (key: string) => {
    if (completedMilestones.includes(key)) {
      setCompletedMilestones(completedMilestones.filter((k) => k !== key));
    } else {
      setCompletedMilestones([...completedMilestones, key]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Immediate Micro-Task Banner ("Start This Week") */}
      {phases.length > 0 && phases[0].actionableStepThisWeek && (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  Immediate Catalyst Step
                </span>
                <span className="text-xs text-amber-700">· Do this in your first 7 days</span>
              </div>
              <p className="text-sm font-bold text-slate-900 mt-0.5">
                {phases[0].actionableStepThisWeek}
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-900 shrink-0">
            Phase 1 Kickoff
          </span>
        </div>
      )}

      {/* Phased Roadmap Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-200/80 space-y-8 my-6">
        {phases.map((phase, pIdx) => {
          return (
            <div key={pIdx} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center text-[10px] font-bold text-indigo-700 shadow-sm">
                {pIdx + 1}
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-slate-300 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wide">
                      {phase.duration}
                    </span>
                    <h4 className="text-base font-bold text-slate-900">{phase.phaseTitle}</h4>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Focus Phase</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-4 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-900">Objective:</span> {phase.objective}
                </p>

                <div>
                  <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                    Target Milestones
                  </h5>
                  <div className="space-y-2">
                    {phase.keyMilestones.map((milestone, mIdx) => {
                      const mKey = `${pIdx}-${mIdx}`;
                      const isDone = completedMilestones.includes(mKey);
                      return (
                        <div
                          key={mIdx}
                          onClick={() => toggleMilestone(mKey)}
                          className={`cursor-pointer flex items-start gap-2.5 p-2.5 rounded-lg border text-xs transition-colors ${
                            isDone
                              ? 'bg-emerald-50/50 border-emerald-200 text-slate-500 line-through'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                          }`}
                        >
                          <button type="button" className="shrink-0 mt-0.5 text-indigo-600">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-400" />
                            )}
                          </button>
                          <span className="leading-relaxed font-medium">{milestone}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {phase.actionableStepThisWeek && pIdx > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
                    <span className="font-bold text-indigo-700">Sprint Target:</span>
                    <span>{phase.actionableStepThisWeek}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
