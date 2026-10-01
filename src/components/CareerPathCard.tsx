import React from 'react';
import { CareerPath } from '../types';
import { Sparkles, TrendingUp, DollarSign, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

interface CareerPathCardProps {
  path: CareerPath;
  isSelected: boolean;
  onSelect: () => void;
  acquiredGapsCount?: number;
}

export const CareerPathCard: React.FC<CareerPathCardProps> = ({
  path,
  isSelected,
  onSelect,
  acquiredGapsCount = 0
}) => {
  // If user simulated learning some gaps, boost match score visually
  const dynamicScore = Math.min(100, path.matchScore + acquiredGapsCount * 3);

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'Top Match':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Fast Pivot':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'High Compensation':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-2xl p-5 border text-left transition-all relative ${
        isSelected
          ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-500/10'
          : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide ${getBadgeStyle(path.badge)}`}>
          {path.badge}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-500">Match:</span>
          <span className="text-sm font-extrabold text-slate-900">{dynamicScore}%</span>
        </div>
      </div>

      <h3 className="text-base font-bold text-slate-900 tracking-tight mb-1">
        {path.title}
      </h3>
      <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
        {path.tagline}
      </p>

      {/* Mini metric pills */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
        <div className="flex items-center gap-1.5 truncate">
          <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="font-semibold text-slate-800">{path.marketOutlook.averageSalary}</span>
        </div>
        <div className="flex items-center gap-1.5 truncate">
          <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span>{path.estimatedMonthsToTransition}</span>
        </div>
        <div className="flex items-center gap-1.5 truncate">
          <TrendingUp className="w-3.5 h-3.5 text-sky-600 shrink-0" />
          <span>{path.marketOutlook.demandLevel} Demand</span>
        </div>
        <div className="flex items-center gap-1.5 truncate">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span>{path.transitionDifficulty} Curve</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between pt-2 text-xs font-semibold text-indigo-600">
        <span>Explore Pathway</span>
        <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
      </div>
    </div>
  );
};
