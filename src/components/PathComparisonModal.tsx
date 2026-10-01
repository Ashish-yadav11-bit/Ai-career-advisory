import React from 'react';
import { CareerPath } from '../types';
import { X, CheckCircle2, AlertTriangle, ArrowRight, DollarSign, Clock, TrendingUp, ShieldCheck } from 'lucide-react';

interface PathComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  paths: CareerPath[];
  onSelectPath: (pathId: string) => void;
}

export const PathComparisonModal: React.FC<PathComparisonModalProps> = ({
  isOpen,
  onClose,
  paths,
  onSelectPath
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-5xl w-full p-6 max-h-[90vh] flex flex-col relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Career Pathway Matrix Comparison</h3>
            <p className="text-xs text-slate-500">Side-by-side trade-offs across compensation, learning curve, and timeline</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-x-auto py-4 flex-1">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-3 font-semibold text-slate-400 uppercase tracking-wider w-40">Attribute</th>
                {paths.map((p) => (
                  <th key={p.id} className="p-3 font-bold text-slate-900 text-sm min-w-[200px]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {p.badge}
                      </span>
                    </div>
                    <span>{p.title}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-semibold text-slate-600">Match Affinity</td>
                {paths.map((p) => (
                  <td key={p.id} className="p-3">
                    <span className="text-base font-extrabold text-indigo-600">{p.matchScore}%</span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-600">Avg. Salary</td>
                {paths.map((p) => (
                  <td key={p.id} className="p-3 font-bold text-slate-900">
                    {p.marketOutlook.averageSalary}
                    <span className="block text-[10px] text-slate-500 font-normal">
                      {p.marketOutlook.salaryRange}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-600">Transition Horizon</td>
                {paths.map((p) => (
                  <td key={p.id} className="p-3 text-slate-800 font-medium">
                    {p.estimatedMonthsToTransition}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-600">Learning Curve</td>
                {paths.map((p) => (
                  <td key={p.id} className="p-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.transitionDifficulty === 'Gentle' ? 'bg-emerald-50 text-emerald-700' :
                      p.transitionDifficulty === 'Moderate' ? 'bg-amber-50 text-amber-700' :
                      'bg-rose-50 text-rose-700'
                    }`}>
                      {p.transitionDifficulty}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-600">Market Demand</td>
                {paths.map((p) => (
                  <td key={p.id} className="p-3 text-slate-800">
                    <span className="font-semibold">{p.marketOutlook.demandLevel}</span>
                    <span className="block text-[10px] text-slate-500">{p.marketOutlook.growthRate}</span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-600">Remote Viability</td>
                {paths.map((p) => (
                  <td key={p.id} className="p-3 text-slate-700">
                    {p.marketOutlook.remoteViability}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-600">Skill Breakdown</td>
                {paths.map((p) => (
                  <td key={p.id} className="p-3">
                    <div className="text-[11px] space-y-1">
                      <div className="text-emerald-700 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{p.skillsAnalysis.transferableStrengths.length} Transferable</span>
                      </div>
                      <div className="text-amber-700 flex items-center gap-1 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{p.skillsAnalysis.criticalGaps.length} Gaps to Bridge</span>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-600">Actions</td>
                {paths.map((p) => (
                  <td key={p.id} className="p-3">
                    <button
                      onClick={() => {
                        onSelectPath(p.id);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-semibold transition-colors"
                    >
                      <span>Focus Pathway</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
