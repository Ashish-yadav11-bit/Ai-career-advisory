export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type SkillCategory = 'technical' | 'soft' | 'domain';

export interface UserSkill {
  name: string;
  level: SkillLevel;
  category: SkillCategory;
}

export interface UserProfile {
  targetRoleOrDomain?: string;
  currentTitle: string;
  experienceLevel: 'student' | 'entry' | 'mid' | 'senior' | 'career_changer';
  yearsOfExperience: number;
  interests: string[];
  skills: UserSkill[];
  preferences: {
    workStyle: 'remote' | 'hybrid' | 'onsite' | 'flexible';
    pace: 'fast-track' | 'steady' | 'exploratory';
    primaryGoal: 'high_salary' | 'work_life_balance' | 'rapid_growth' | 'creative_fulfillment' | 'mission_impact';
    targetTimeCommitmentWeekly: number; // in hours, e.g. 10
  };
  resumeOrBio?: string;
}

export interface SkillGapItem {
  skill: string;
  importance: 'essential' | 'recommended' | 'bonus';
  whyNeeded: string;
  estimatedTimeToAcquire: string;
}

export interface RoadmapPhase {
  phaseTitle: string;
  duration: string;
  objective: string;
  keyMilestones: string[];
  actionableStepThisWeek: string;
}

export interface LearningResource {
  title: string;
  provider: string;
  type: 'Course' | 'Book' | 'Interactive Project' | 'Certification' | 'Documentation' | 'Community';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  whyRecommended: string;
  urlHint?: string;
  isFree: boolean;
}

export interface PortfolioProject {
  title: string;
  description: string;
  difficulty: 'Starter' | 'Intermediate' | 'Capstone';
  skillsDemonstrated: string[];
  realWorldImpact: string;
}

export interface CareerPath {
  id: string;
  title: string;
  tagline: string;
  badge: 'Top Match' | 'Fast Pivot' | 'High Compensation' | 'Emerging Trend' | 'Strategic Next Step';
  matchScore: number; // 0 - 100
  transitionDifficulty: 'Gentle' | 'Moderate' | 'Steep';
  estimatedMonthsToTransition: string;
  whyItFits: string;
  marketOutlook: {
    demandLevel: 'Very High' | 'High' | 'Steady' | 'Growing';
    averageSalary: string;
    salaryRange: string;
    growthRate: string;
    remoteViability: string;
  };
  skillsAnalysis: {
    transferableStrengths: string[];
    criticalGaps: SkillGapItem[];
  };
  roadmap: RoadmapPhase[];
  resources: LearningResource[];
  portfolioProjects: PortfolioProject[];
  interviewStrategy: {
    elevatorPitch: string;
    keyThemesToHighlight: string[];
    sampleInterviewQuestions: string[];
  };
}

export interface CareerAdvisorResponse {
  executiveSummary: string;
  candidateSuperpower: string;
  recommendedPaths: CareerPath[];
  crossPathSkills: string[]; // meta-skills that unlock multiple paths
}
