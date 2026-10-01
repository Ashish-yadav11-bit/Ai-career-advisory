import React from 'react';
import { Compass, Sparkles, SlidersHorizontal, ArrowLeftRight, FileText } from 'lucide-react';
import { PRESET_PERSONAS, PresetPersona } from '../data/sampleProfiles';
import { UserProfile } from '../types';

interface HeaderProps {
  onSelectPersona: (persona: PresetPersona) => void;
  onOpenCompare?: () => void;
  hasResults: boolean;
  onResetToForm: () => void;
  isFormView: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectPersona,
  onOpenCompare,
  hasResults,
  onResetToForm,
  isFormView
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onResetToForm}>
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
            <Compass className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-slate-900 tracking-tight">Ascent</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                Career Intelligence
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">AI Skills & Pathway Architecture</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick preset selector dropdown / buttons */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100/80 p-1 rounded-lg border border-slate-200/60">
            <span className="px-2 font-medium text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Demo Personas:
            </span>
            {PRESET_PERSONAS.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectPersona(p)}
                className="px-2.5 py-1 rounded-md text-slate-700 hover:text-slate-900 hover:bg-white transition-all font-medium flex items-center gap-1"
                title={`${p.name}: ${p.tagline}`}
              >
                <span>{p.avatarEmoji}</span>
                <span>{p.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {hasResults && (
            <div className="flex items-center gap-2">
              {onOpenCompare && (
                <button
                  onClick={onOpenCompare}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline">Compare Paths</span>
                </button>
              )}

              <button
                onClick={onResetToForm}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  isFormView
                    ? 'bg-slate-900 text-white'
                    : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{isFormView ? 'Edit Profile' : 'Adjust Inputs'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
