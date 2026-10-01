import React, { useState } from 'react';
import { UserProfile, UserSkill, SkillLevel, SkillCategory } from '../types';
import { PRESET_PERSONAS, PresetPersona } from '../data/sampleProfiles';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Briefcase, 
  Heart, 
  Award, 
  Compass, 
  FileUp, 
  ArrowRight, 
  Clock, 
  DollarSign, 
  Scale, 
  Rocket, 
  Palette, 
  Globe2 
} from 'lucide-react';

interface ProfileBuilderProps {
  initialProfile: UserProfile;
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
  onOpenResumeModal: () => void;
  onSelectPersona: (persona: PresetPersona) => void;
}

const POPULAR_INTERESTS = [
  'Artificial Intelligence & LLMs',
  'Autonomous Agents',
  'Cloud Architecture & DevOps',
  'Product Design & UX Systems',
  'Fintech & Payment Systems',
  'Climate & Clean Tech',
  'Healthcare & Bioinformatics',
  'Developer Tooling',
  'Data Engineering & Big Data',
  'Cybersecurity & Privacy',
  'Interactive Graphics & 3D',
  'Product Management'
];

const SUGGESTED_SKILLS = [
  { name: 'Python', category: 'technical' as SkillCategory },
  { name: 'TypeScript', category: 'technical' as SkillCategory },
  { name: 'React', category: 'technical' as SkillCategory },
  { name: 'SQL & Database Design', category: 'technical' as SkillCategory },
  { name: 'Git & Version Control', category: 'technical' as SkillCategory },
  { name: 'Docker / Containers', category: 'technical' as SkillCategory },
  { name: 'REST & GraphQL APIs', category: 'technical' as SkillCategory },
  { name: 'Figma & UI Design', category: 'technical' as SkillCategory },
  { name: 'Data Analysis & Pandas', category: 'technical' as SkillCategory },
  { name: 'Cross-functional Leadership', category: 'soft' as SkillCategory },
  { name: 'Problem Decomposition', category: 'soft' as SkillCategory },
  { name: 'Technical Writing', category: 'soft' as SkillCategory }
];

export const ProfileBuilder: React.FC<ProfileBuilderProps> = ({
  initialProfile,
  onSubmit,
  isLoading,
  onOpenResumeModal,
  onSelectPersona
}) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillLevel>('intermediate');
  const [newSkillCategory, setNewSkillCategory] = useState<SkillCategory>('technical');
  const [customInterest, setCustomInterest] = useState('');

  // Sync if initialProfile changes (e.g. persona selected)
  React.useEffect(() => {
    setProfile(initialProfile);
  }, [initialProfile]);

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const exists = profile.skills.some(
      (s) => s.name.toLowerCase() === newSkillName.trim().toLowerCase()
    );
    if (!exists) {
      setProfile({
        ...profile,
        skills: [
          ...profile.skills,
          {
            name: newSkillName.trim(),
            level: newSkillLevel,
            category: newSkillCategory
          }
        ]
      });
    }
    setNewSkillName('');
  };

  const handleAddSuggestedSkill = (name: string, category: SkillCategory) => {
    if (profile.skills.some((s) => s.name.toLowerCase() === name.toLowerCase())) return;
    setProfile({
      ...profile,
      skills: [...profile.skills, { name, level: 'intermediate', category }]
    });
  };

  const handleRemoveSkill = (index: number) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((_, i) => i !== index)
    });
  };

  const handleToggleInterest = (interest: string) => {
    if (profile.interests.includes(interest)) {
      setProfile({
        ...profile,
        interests: profile.interests.filter((i) => i !== interest)
      });
    } else {
      setProfile({
        ...profile,
        interests: [...profile.interests, interest]
      });
    }
  };

  const handleAddCustomInterest = () => {
    if (!customInterest.trim()) return;
    if (!profile.interests.includes(customInterest.trim())) {
      setProfile({
        ...profile,
        interests: [...profile.interests, customInterest.trim()]
      });
    }
    setCustomInterest('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Hero introduction */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Next-Generation Career Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Navigate Your Next Career Leap
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Input your current abilities, background, and intellectual passions. Our AI strategist maps high-demand career pathways, dissects skill gaps, and formulates a step-by-step learning roadmap.
        </p>
      </div>

      {/* Preset Personas Bar */}
      <div className="mb-8 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Instant Demo Profiles</span>
            <span className="text-xs text-slate-500">· Click any to load a real transition scenario</span>
          </div>
          <button
            type="button"
            onClick={onOpenResumeModal}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50/70 hover:bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 transition-colors"
          >
            <FileUp className="w-3.5 h-3.5" />
            <span>Paste Resume / Bio</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {PRESET_PERSONAS.map((persona) => (
            <button
              key={persona.id}
              type="button"
              onClick={() => onSelectPersona(persona)}
              className="text-left p-3 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{persona.avatarEmoji}</span>
                <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {persona.name}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight">
                {persona.tagline}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Background & Career Stage */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Your Current Anchor</h2>
              <p className="text-xs text-slate-500">Where you are currently positioned in the workforce</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Current Role / Profession Title
              </label>
              <input
                type="text"
                required
                value={profile.currentTitle}
                onChange={(e) => setProfile({ ...profile, currentTitle: e.target.value })}
                placeholder="e.g. Frontend Developer, Sales Manager, Biology PhD, Marketing Specialist"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Years of Experience
              </label>
              <input
                type="number"
                min="0"
                max="40"
                value={profile.yearsOfExperience}
                onChange={(e) => setProfile({ ...profile, yearsOfExperience: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Career Stage
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'student', label: 'Student / Grad' },
                { id: 'entry', label: 'Early Career (1-3y)' },
                { id: 'mid', label: 'Mid-Level (3-6y)' },
                { id: 'senior', label: 'Senior (7+y)' },
                { id: 'career_changer', label: 'Career Switcher' }
              ].map((stage) => (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setProfile({ ...profile, experienceLevel: stage.id as any })}
                  className={`px-3 py-2 rounded-xl text-xs font-medium text-center border transition-all ${
                    profile.experienceLevel === stage.id
                      ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {stage.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Step 2: Interests & Passions */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Interests & Intellectual Curiosities</h2>
              <p className="text-xs text-slate-500">What topics, industries, or technologies genuinely energize you?</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {POPULAR_INTERESTS.map((interest) => {
                const isSelected = profile.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleToggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>

            {/* Custom interest addition */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomInterest();
                  }
                }}
                placeholder="Add custom interest (e.g. Robotics, Spatial Audio, EdTech)..."
                className="text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 flex-1"
              />
              <button
                type="button"
                onClick={handleAddCustomInterest}
                className="px-3.5 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shrink-0"
              >
                Add
              </button>
            </div>

            {profile.interests.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5 items-center">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mr-1">
                  Selected ({profile.interests.length}):
                </span>
                {profile.interests.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleInterest(item)}
                      className="hover:text-indigo-900 text-indigo-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Step 3: Current Abilities & Skills Inventory */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Current Abilities & Skills Inventory</h2>
              <p className="text-xs text-slate-500">Your existing toolkit (technical, domain, or soft skills)</p>
            </div>
          </div>

          {/* Quick add suggestions */}
          <div className="mb-4">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Tap to add common proficiencies:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_SKILLS.map((item) => {
                const alreadyHas = profile.skills.some(
                  (s) => s.name.toLowerCase() === item.name.toLowerCase()
                );
                return (
                  <button
                    key={item.name}
                    type="button"
                    disabled={alreadyHas}
                    onClick={() => handleAddSuggestedSkill(item.name, item.category)}
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-md transition-all ${
                      alreadyHas
                        ? 'opacity-40 bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    + {item.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Manual Skill Input */}
          <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Skill Name</label>
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  placeholder="e.g. Next.js, Kubernetes, Project Leadership, Financial Modeling"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Proficiency</label>
                <select
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value as SkillLevel)}
                  className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                >
                  <option value="beginner">Beginner (Foundations)</option>
                  <option value="intermediate">Intermediate (Proficient)</option>
                  <option value="advanced">Advanced (Mastery)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleAddSkill}
                  disabled={!newSkillName.trim()}
                  className="w-full py-2 px-3 text-xs font-semibold bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Skill</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Skills List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700">
                Identified Skills ({profile.skills.length})
              </span>
              {profile.skills.length === 0 && (
                <span className="text-xs text-amber-600">Please add at least 2-3 skills</span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {profile.skills.map((skill, index) => (
                <div
                  key={`${skill.name}-${index}`}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-semibold text-slate-900 truncate">{skill.name}</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                      <span className={`capitalize font-medium ${
                        skill.level === 'advanced' ? 'text-emerald-600' :
                        skill.level === 'intermediate' ? 'text-indigo-600' : 'text-slate-500'
                      }`}>
                        {skill.level}
                      </span>
                      <span>·</span>
                      <span className="capitalize">{skill.category}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step 4: Preferences & Career Priorities */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              04
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Career Drivers & Working Preferences</h2>
              <p className="text-xs text-slate-500">Tune your personal transition constraints</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Work Arrangement
              </label>
              <select
                value={profile.preferences.workStyle}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    preferences: { ...profile.preferences, workStyle: e.target.value as any }
                  })
                }
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
              >
                <option value="remote">Remote-First</option>
                <option value="hybrid">Hybrid (1-3 days in office)</option>
                <option value="onsite">On-Site</option>
                <option value="flexible">Open / Flexible</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Transition Pace
              </label>
              <select
                value={profile.preferences.pace}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    preferences: { ...profile.preferences, pace: e.target.value as any }
                  })
                }
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
              >
                <option value="fast-track">Fast-Track (Intensive 3–5 mos)</option>
                <option value="steady">Steady Progression (6–10 mos)</option>
                <option value="exploratory">Exploratory / Unhurried</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Core Value / Driver
              </label>
              <select
                value={profile.preferences.primaryGoal}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    preferences: { ...profile.preferences, primaryGoal: e.target.value as any }
                  })
                }
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
              >
                <option value="rapid_growth">Accelerated Career Growth</option>
                <option value="high_salary">Top-Tier Compensation</option>
                <option value="work_life_balance">Work-Life Balance & Stability</option>
                <option value="creative_fulfillment">Creative & Craft Autonomy</option>
                <option value="mission_impact">Societal / Mission Impact</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-700">Weekly Learning Bandwidth</span>
              <span className="font-bold text-indigo-600">
                {profile.preferences.targetTimeCommitmentWeekly} hours / week
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="25"
              step="1"
              value={profile.preferences.targetTimeCommitmentWeekly}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  preferences: {
                    ...profile.preferences,
                    targetTimeCommitmentWeekly: parseInt(e.target.value) || 10
                  }
                })
              }
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>Light (4h)</span>
              <span>Moderate (10-12h)</span>
              <span>Intensive Immersion (25h)</span>
            </div>
          </div>
        </section>

        {/* Action Button */}
        <div className="pt-2 flex items-center justify-end">
          <button
            type="submit"
            disabled={isLoading || profile.skills.length === 0}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Synthesizing Market Intelligence & Paths...</span>
              </>
            ) : (
              <>
                <span>Generate Career Blueprint</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
