/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserProfile, CareerAdvisorResponse, CareerPath } from './types';
import { PRESET_PERSONAS, FALLBACK_MAYA_ADVICE, PresetPersona } from './data/sampleProfiles';
import { Header } from './components/Header';
import { ProfileBuilder } from './components/ProfileBuilder';
import { CareerPathCard } from './components/CareerPathCard';
import { SkillsAnalysisView } from './components/SkillsAnalysisView';
import { RoadmapTimeline } from './components/RoadmapTimeline';
import { ResourcesList } from './components/ResourcesList';
import { PortfolioProjectsView } from './components/PortfolioProjectsView';
import { InterviewPlaybook } from './components/InterviewPlaybook';
import { RoleDeepDiveChat } from './components/RoleDeepDiveChat';
import { PathComparisonModal } from './components/PathComparisonModal';
import { ResumeParserModal } from './components/ResumeParserModal';
import { 
  Sparkles, 
  Download, 
  ArrowLeft, 
  Share2, 
  Layers, 
  GraduationCap, 
  Code, 
  Briefcase, 
  MessageSquare, 
  TrendingUp, 
  Zap, 
  DollarSign, 
  Clock, 
  Compass, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function App() {
  const [currentProfile, setCurrentProfile] = useState<UserProfile>(PRESET_PERSONAS[0].profile);
  const [advice, setAdvice] = useState<CareerAdvisorResponse | null>(FALLBACK_MAYA_ADVICE);
  const [selectedPathId, setSelectedPathId] = useState<string>(FALLBACK_MAYA_ADVICE.recommendedPaths[0].id);
  const [activeTab, setActiveTab] = useState<'skills' | 'roadmap' | 'resources' | 'portfolio' | 'interview' | 'deepdive'>('skills');
  const [isFormView, setIsFormView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Modals
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Simulated acquired skills
  const [learnedSkills, setLearnedSkills] = useState<string[]>([]);

  const handleSelectPersona = (persona: PresetPersona) => {
    setCurrentProfile(persona.profile);
    setLearnedSkills([]);
    if (persona.precomputedResponse) {
      setAdvice(persona.precomputedResponse);
      setSelectedPathId(persona.precomputedResponse.recommendedPaths[0].id);
      setIsFormView(false);
    } else {
      // Generate advice via server
      handleGenerateAdvice(persona.profile);
    }
  };

  const handleGenerateAdvice = async (profileToUse: UserProfile) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileToUse)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate tailored advice.');
      }

      const data: CareerAdvisorResponse = await response.json();
      setAdvice(data);
      if (data.recommendedPaths.length > 0) {
        setSelectedPathId(data.recommendedPaths[0].id);
      }
      setIsFormView(false);
      setLearnedSkills([]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error communicating with career advisor engine.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLearnedSkill = (skillName: string) => {
    const lower = skillName.toLowerCase();
    if (learnedSkills.includes(lower)) {
      setLearnedSkills(learnedSkills.filter((s) => s !== lower));
    } else {
      setLearnedSkills([...learnedSkills, lower]);
    }
  };

  const activePath: CareerPath | undefined = advice?.recommendedPaths.find(
    (p) => p.id === selectedPathId
  ) || advice?.recommendedPaths[0];

  // Export full roadmap to Markdown
  const handleExportMarkdown = () => {
    if (!advice || !activePath) return;

    let md = `# Career Blueprint: ${activePath.title}\n`;
    md += `**Target Trajectory**: ${activePath.tagline}\n`;
    md += `**Match Score**: ${activePath.matchScore}%\n`;
    md += `**Estimated Transition Horizon**: ${activePath.estimatedMonthsToTransition}\n`;
    md += `**Average Compensation**: ${activePath.marketOutlook.averageSalary} (${activePath.marketOutlook.salaryRange})\n\n`;

    md += `## Executive Assessment\n${advice.executiveSummary}\n\n`;
    md += `**Your Core Superpower**: ${advice.candidateSuperpower}\n\n`;

    md += `## Why This Pathway Fits You\n${activePath.whyItFits}\n\n`;

    md += `## Skills Strategy\n`;
    md += `### Transferable Strengths\n`;
    activePath.skillsAnalysis.transferableStrengths.forEach((s) => {
      md += `- [x] ${s}\n`;
    });

    md += `\n### Critical Skill Gaps to Bridge\n`;
    activePath.skillsAnalysis.criticalGaps.forEach((g) => {
      md += `- [ ] **${g.skill}** (${g.importance}) - ~${g.estimatedTimeToAcquire}\n  *${g.whyNeeded}*\n`;
    });

    md += `\n## Phased Learning Roadmap\n`;
    activePath.roadmap.forEach((phase) => {
      md += `### ${phase.phaseTitle} (${phase.duration})\n`;
      md += `**Objective**: ${phase.objective}\n`;
      phase.keyMilestones.forEach((m) => {
        md += `- [ ] ${m}\n`;
      });
      if (phase.actionableStepThisWeek) {
        md += `*Immediate Sprint Action*: ${phase.actionableStepThisWeek}\n`;
      }
      md += `\n`;
    });

    md += `## Curated Resources\n`;
    activePath.resources.forEach((r) => {
      md += `- **${r.title}** (${r.provider}, ${r.type}, ${r.isFree ? 'Free' : 'Paid'}) - ${r.whyRecommended}\n`;
    });

    md += `\n## Capstone Projects\n`;
    activePath.portfolioProjects.forEach((p) => {
      md += `### ${p.title} (${p.difficulty})\n${p.description}\n*Impact*: ${p.realWorldImpact}\n\n`;
    });

    md += `## Interview Pitch\n> "${activePath.interviewStrategy.elevatorPitch}"\n`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Career-Roadmap-${activePath.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <Header
        onSelectPersona={handleSelectPersona}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        hasResults={Boolean(advice)}
        onResetToForm={() => setIsFormView(!isFormView)}
        isFormView={isFormView}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="font-bold hover:text-rose-950 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {isFormView || !advice ? (
          <ProfileBuilder
            initialProfile={currentProfile}
            onSubmit={(newProfile) => {
              setCurrentProfile(newProfile);
              handleGenerateAdvice(newProfile);
            }}
            isLoading={isLoading}
            onOpenResumeModal={() => setIsResumeModalOpen(true)}
            onSelectPersona={handleSelectPersona}
          />
        ) : (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Executive Synthesis Banner */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100">
                      Workforce Intelligence Synthesis
                    </span>
                    <span className="text-xs text-slate-500">
                      Targeted for {currentProfile.currentTitle}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Strategic Career Architecture
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                    {advice.executiveSummary}
                  </p>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => setIsCompareModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors shadow-sm"
                  >
                    <span>Compare All Paths</span>
                  </button>
                  <button
                    onClick={handleExportMarkdown}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Roadmap</span>
                  </button>
                </div>
              </div>

              {/* Superpower & Cross-Path Multipliers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/70 to-white border border-indigo-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block mb-1">
                    Your Unfair Advantage / Superpower:
                  </span>
                  <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                    {advice.candidateSuperpower}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    High-Leverage Multiplier Skills:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {advice.crossPathSkills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[11px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Pathways Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Recommended Pathways ({advice.recommendedPaths.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Select a specialization to inspect deep skill gap analytics and resources
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {advice.recommendedPaths.map((path) => (
                  <CareerPathCard
                    key={path.id}
                    path={path}
                    isSelected={path.id === activePath?.id}
                    onSelect={() => {
                      setSelectedPathId(path.id);
                      setLearnedSkills([]);
                    }}
                    acquiredGapsCount={learnedSkills.length}
                  />
                ))}
              </div>
            </div>

            {/* Active Pathway Detail Section */}
            {activePath && (
              <div className="space-y-6">
                {/* Active Path Header Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase">
                        {activePath.badge}
                      </span>
                      <span className="text-xs text-slate-500">
                        {activePath.transitionDifficulty} Learning Curve
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                      <span>Baseline Match:</span>
                      <span className="text-lg text-indigo-600 font-extrabold">
                        {activePath.matchScore}%
                      </span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
                    {activePath.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 max-w-3xl">
                    {activePath.whyItFits}
                  </p>

                  {/* Market telemetry bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div>
                      <span className="text-[11px] text-slate-500 font-medium block">Avg. Base Salary</span>
                      <span className="font-bold text-slate-900 text-sm">{activePath.marketOutlook.averageSalary}</span>
                      <span className="text-[10px] text-slate-500 block">{activePath.marketOutlook.salaryRange}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 font-medium block">Transition Horizon</span>
                      <span className="font-bold text-slate-900 text-sm">{activePath.estimatedMonthsToTransition}</span>
                      <span className="text-[10px] text-slate-500 block">At your pace</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 font-medium block">Hiring Velocity</span>
                      <span className="font-bold text-emerald-700 text-sm">{activePath.marketOutlook.demandLevel}</span>
                      <span className="text-[10px] text-slate-500 block">{activePath.marketOutlook.growthRate}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 font-medium block">Work Arrangement</span>
                      <span className="font-bold text-slate-900 text-sm">{activePath.marketOutlook.remoteViability}</span>
                      <span className="text-[10px] text-slate-500 block">Remote / Hybrid flexibility</span>
                    </div>
                  </div>
                </div>

                {/* Sub-view Navigation Tabs */}
                <div className="flex border-b border-slate-200 overflow-x-auto gap-2 no-scrollbar">
                  {[
                    { id: 'skills', label: 'Skills Gap & Parity', icon: Zap },
                    { id: 'roadmap', label: 'Phased Roadmap', icon: Clock },
                    { id: 'resources', label: 'Curated Resources', icon: GraduationCap },
                    { id: 'portfolio', label: 'Portfolio Capstones', icon: Code },
                    { id: 'interview', label: 'Interview Playbook', icon: Briefcase },
                    { id: 'deepdive', label: 'AI Deep-Dive Advisor', icon: MessageSquare }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`inline-flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                          isActive
                            ? 'border-indigo-600 text-indigo-600 bg-white/50'
                            : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content Display */}
                <div>
                  {activeTab === 'skills' && (
                    <SkillsAnalysisView
                      path={activePath}
                      learnedSkills={learnedSkills}
                      onToggleLearnedSkill={toggleLearnedSkill}
                    />
                  )}

                  {activeTab === 'roadmap' && (
                    <RoadmapTimeline
                      phases={activePath.roadmap}
                      roleTitle={activePath.title}
                    />
                  )}

                  {activeTab === 'resources' && (
                    <ResourcesList resources={activePath.resources} />
                  )}

                  {activeTab === 'portfolio' && (
                    <PortfolioProjectsView projects={activePath.portfolioProjects} />
                  )}

                  {activeTab === 'interview' && (
                    <InterviewPlaybook
                      interviewStrategy={activePath.interviewStrategy}
                      roleTitle={activePath.title}
                    />
                  )}

                  {activeTab === 'deepdive' && (
                    <RoleDeepDiveChat
                      roleTitle={activePath.title}
                      userProfile={currentProfile}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Resume Parser Modal */}
      <ResumeParserModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onApplyExtracted={({ currentTitle, yearsOfExperience, skills, interests, bioText }) => {
          setCurrentProfile((prev) => ({
            ...prev,
            currentTitle: currentTitle || prev.currentTitle,
            yearsOfExperience: yearsOfExperience !== undefined ? yearsOfExperience : prev.yearsOfExperience,
            skills: skills.length > 0 ? skills : prev.skills,
            interests: interests.length > 0 ? interests : prev.interests,
            resumeOrBio: bioText
          }));
        }}
      />

      {/* Comparison Modal */}
      {advice && (
        <PathComparisonModal
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
          paths={advice.recommendedPaths}
          onSelectPath={(pathId) => setSelectedPathId(pathId)}
        />
      )}

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 bg-white/60 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Ascent</span>
            <span>·</span>
            <span>AI Career & Skills Advisor</span>
          </div>
          <div>
            Powered by Google Gemini 3.8 Flash Workforce Intelligence
          </div>
        </div>
      </footer>
    </div>
  );
}
