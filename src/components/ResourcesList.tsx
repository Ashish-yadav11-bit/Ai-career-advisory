import React, { useState } from 'react';
import { LearningResource } from '../types';
import { BookOpen, ExternalLink, Filter, GraduationCap, Code2, BookmarkCheck, FileText, Users } from 'lucide-react';

interface ResourcesListProps {
  resources: LearningResource[];
}

export const ResourcesList: React.FC<ResourcesListProps> = ({ resources }) => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [onlyFree, setOnlyFree] = useState<boolean>(false);

  const types = ['All', ...Array.from(new Set(resources.map((r) => r.type)))];

  const filteredResources = resources.filter((res) => {
    if (selectedType !== 'All' && res.type !== selectedType) return false;
    if (onlyFree && !res.isFree) return false;
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Book':
        return <BookOpen className="w-4 h-4 text-emerald-600" />;
      case 'Course':
        return <GraduationCap className="w-4 h-4 text-indigo-600" />;
      case 'Interactive Project':
        return <Code2 className="w-4 h-4 text-amber-600" />;
      case 'Documentation':
        return <FileText className="w-4 h-4 text-sky-600" />;
      case 'Community':
        return <Users className="w-4 h-4 text-purple-600" />;
      default:
        return <BookmarkCheck className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 font-semibold uppercase tracking-wider mr-1">Filter:</span>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedType === type
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 select-none">
          <input
            type="checkbox"
            checked={onlyFree}
            onChange={(e) => setOnlyFree(e.target.checked)}
            className="rounded accent-indigo-600 cursor-pointer"
          />
          <span>Free resources only</span>
        </label>
      </div>

      {/* Grid of resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((res, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  {getTypeIcon(res.type)}
                  <span>{res.type}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500">{res.provider}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                    res.isFree
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}>
                    {res.isFree ? 'Free' : 'Paid / Book'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {res.difficulty}
                  </span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                {res.title}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {res.whyRecommended}
              </p>
            </div>

            {res.urlHint && (
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-indigo-600 font-semibold">
                <span className="font-mono text-slate-500">{res.urlHint}</span>
                <span className="flex items-center gap-1">
                  <span>Explore Material</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 text-xs">
          No resources found matching this filter criteria.
        </div>
      )}
    </div>
  );
};
