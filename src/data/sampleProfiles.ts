import { UserProfile, CareerAdvisorResponse } from '../types';

export interface PresetPersona {
  id: string;
  name: string;
  tagline: string;
  avatarEmoji: string;
  profile: UserProfile;
  precomputedResponse?: CareerAdvisorResponse;
}

export const PRESET_PERSONAS: PresetPersona[] = [
  {
    id: 'frontend-to-ai',
    name: 'Maya Chen',
    tagline: 'Frontend Dev transitioning to AI Engineer / Agent Systems',
    avatarEmoji: '⚡',
    profile: {
      currentTitle: 'Frontend Engineer (React / TypeScript)',
      experienceLevel: 'mid',
      yearsOfExperience: 3,
      interests: [
        'Artificial Intelligence & LLMs',
        'Developer Tools',
        'Interactive Web Applications',
        'Agentic Workflows',
        'Open Source'
      ],
      skills: [
        { name: 'TypeScript', level: 'advanced', category: 'technical' },
        { name: 'React & Next.js', level: 'advanced', category: 'technical' },
        { name: 'REST APIs & WebSockets', level: 'intermediate', category: 'technical' },
        { name: 'Python Basics', level: 'beginner', category: 'technical' },
        { name: 'UI/UX Sensitivity', level: 'intermediate', category: 'technical' },
        { name: 'System Troubleshooting', level: 'intermediate', category: 'soft' },
        { name: 'Agile Collaboration', level: 'advanced', category: 'soft' }
      ],
      preferences: {
        workStyle: 'remote',
        pace: 'fast-track',
        primaryGoal: 'rapid_growth',
        targetTimeCommitmentWeekly: 12
      },
      resumeOrBio: '3 years building high-velocity modern web apps in TypeScript and React. Passionate about how LLMs and agentic reasoning will reinvent user workflows. Want to bridge the gap between AI backend capabilities and delightful user experiences.'
    }
  },
  {
    id: 'marketing-to-pm',
    name: 'Marcus Vance',
    tagline: 'Digital Marketer pivoting to Technical Product Manager',
    avatarEmoji: '🧭',
    profile: {
      currentTitle: 'Senior Growth & Product Marketing Lead',
      experienceLevel: 'career_changer',
      yearsOfExperience: 5,
      interests: [
        'User Psychology & Retention',
        'Product Strategy & Roadmapping',
        'Data-Driven Decision Making',
        'B2B SaaS Growth',
        'Feature Discovery'
      ],
      skills: [
        { name: 'Customer Analytics (Mixpanel/Amplitude)', level: 'advanced', category: 'technical' },
        { name: 'SQL Querying', level: 'intermediate', category: 'technical' },
        { name: 'Cross-functional Leadership', level: 'advanced', category: 'soft' },
        { name: 'User Interviewing & Research', level: 'advanced', category: 'domain' },
        { name: 'Go-to-Market Strategy', level: 'advanced', category: 'domain' },
        { name: 'Basic Wireframing (Figma)', level: 'intermediate', category: 'technical' }
      ],
      preferences: {
        workStyle: 'hybrid',
        pace: 'steady',
        primaryGoal: 'high_salary',
        targetTimeCommitmentWeekly: 10
      },
      resumeOrBio: '5 years steering acquisition and user onboarding funnels. Built conversion rate experiments and worked closely with product squads. Want to take direct ownership of product vision, technical specs, and feature execution.'
    }
  },
  {
    id: 'biologist-to-datascience',
    name: 'Dr. Elena Rostova',
    tagline: 'Life Sciences Researcher transitioning to Bioinformatics / Health Data Science',
    avatarEmoji: '🧬',
    profile: {
      currentTitle: 'Postdoctoral Biomedical Researcher',
      experienceLevel: 'career_changer',
      yearsOfExperience: 4,
      interests: [
        'Genomics & Precision Medicine',
        'Statistical Modeling',
        'Machine Learning in Healthcare',
        'Scientific Data Pipelines',
        'Healthtech Innovation'
      ],
      skills: [
        { name: 'Scientific Research Methodology', level: 'advanced', category: 'domain' },
        { name: 'Statistical Analysis (R)', level: 'intermediate', category: 'technical' },
        { name: 'Python & Pandas', level: 'beginner', category: 'technical' },
        { name: 'Molecular Biology & Genetics', level: 'advanced', category: 'domain' },
        { name: 'Scientific Writing & Synthesis', level: 'advanced', category: 'soft' },
        { name: 'Critical Problem Decomposition', level: 'advanced', category: 'soft' }
      ],
      preferences: {
        workStyle: 'hybrid',
        pace: 'steady',
        primaryGoal: 'mission_impact',
        targetTimeCommitmentWeekly: 14
      },
      resumeOrBio: 'PhD in Molecular Biology with 4 years lab and computational genomics research. Experienced with high-throughput assay interpretation. Aiming to pivot full-time into computational bioinformatics and clinical ML data engineering.'
    }
  },
  {
    id: 'designer-to-designengineer',
    name: 'Julian Cruz',
    tagline: 'UI/UX Visual Designer pivoting to Design Technologist & Systems Engineer',
    avatarEmoji: '🎨',
    profile: {
      currentTitle: 'Brand & Product UI Designer',
      experienceLevel: 'mid',
      yearsOfExperience: 3,
      interests: [
        'Design Systems & Tokens',
        'Micro-interactions & Motion UI',
        'Accessibility (a11y)',
        'Component Architecture',
        'Creative Coding'
      ],
      skills: [
        { name: 'Figma Auto-layout & Variables', level: 'advanced', category: 'technical' },
        { name: 'Visual Hierarchy & Typography', level: 'advanced', category: 'domain' },
        { name: 'HTML & Modern CSS', level: 'intermediate', category: 'technical' },
        { name: 'JavaScript / React basics', level: 'beginner', category: 'technical' },
        { name: 'Design Critiques & Stakeholder Review', level: 'advanced', category: 'soft' }
      ],
      preferences: {
        workStyle: 'remote',
        pace: 'fast-track',
        primaryGoal: 'creative_fulfillment',
        targetTimeCommitmentWeekly: 10
      },
      resumeOrBio: 'Visual designer with obsession for smooth motion, polished typography, and design tokens. Tired of redlining specs in Figma; eager to write the code that brings component systems and interactive prototypes to life directly.'
    }
  }
];

export const FALLBACK_MAYA_ADVICE: CareerAdvisorResponse = {
  executiveSummary: "Your strong TypeScript and React foundation provides an exceptional springboard into the burgeoning AI Application & Agent engineering ecosystem. While many AI practitioners struggle with user interfaces and state management, you already possess high-caliber frontend capabilities. By compounding this with LLM orchestration (LangChain/LlamaIndex), vector embeddings, and API design, you can distinguish yourself as an AI Engineer who actually ships user-facing intelligent systems.",
  candidateSuperpower: "Front-end mastery combined with modern API orchestration—a rare duality in AI where product-grade UX is in extreme demand.",
  crossPathSkills: [
    "Prompt Engineering & Structured Outputs",
    "Vector Databases & Semantic Retrieval (RAG)",
    "Python Async & FastAPI",
    "Evaluation & Observability for Generative AI"
  ],
  recommendedPaths: [
    {
      id: 'ai-application-engineer',
      title: 'Fullstack AI Application Engineer',
      tagline: 'Build end-to-end intelligent web products that harness LLMs and autonomous agents.',
      badge: 'Top Match',
      matchScore: 92,
      transitionDifficulty: 'Gentle',
      estimatedMonthsToTransition: '3 to 5 months',
      whyItFits: "Because you already command React and TypeScript, you bypass the steepest part of the web development learning curve. Modern AI apps (chat surfaces, canvas interfaces, generative workspaces) succeed or fail on their frontend execution. Adding backend orchestration and vector retrieval will make you instantly employable at AI startups and scale-ups.",
      marketOutlook: {
        demandLevel: 'Very High',
        averageSalary: '$148,000 / yr',
        salaryRange: '$120,000 – $185,000 / yr',
        growthRate: '+38% YoY growth',
        remoteViability: '94% of roles open to remote'
      },
      skillsAnalysis: {
        transferableStrengths: [
          'TypeScript & React UI architecture',
          'Client-side state management & caching',
          'WebSocket & Streaming HTTP handling (critical for token streams)',
          'Component modularity & design system integration'
        ],
        criticalGaps: [
          {
            skill: 'LLM Orchestration Frameworks',
            importance: 'essential',
            whyNeeded: 'Mastering tools like LangChain, Vercel AI SDK, or LlamaIndex to chain prompts, manage history, and invoke external tools.',
            estimatedTimeToAcquire: '3 weeks'
          },
          {
            skill: 'RAG & Vector Embeddings',
            importance: 'essential',
            whyNeeded: 'Understanding chunking strategies, cosine similarity, hybrid search, and vector stores (Pinecone, Chroma, pgvector).',
            estimatedTimeToAcquire: '4 weeks'
          },
          {
            skill: 'Python / FastAPI Backend Services',
            importance: 'recommended',
            whyNeeded: 'Most model evaluation tooling and scientific libraries remain Python-first; being comfortable writing microservices is a huge multiplier.',
            estimatedTimeToAcquire: '3 weeks'
          },
          {
            skill: 'Evaluation & Tracing (LangSmith / Helicone)',
            importance: 'recommended',
            whyNeeded: 'Understanding latency, token cost optimization, and test suites for generative non-deterministic outputs.',
            estimatedTimeToAcquire: '2 weeks'
          }
        ]
      },
      roadmap: [
        {
          phaseTitle: 'Phase 1: Streaming & SDK Fundamentals',
          duration: 'Weeks 1–4',
          objective: 'Master direct LLM API streaming, token management, and structured JSON generation in TypeScript.',
          keyMilestones: [
            'Integrate Google GenAI and OpenAI APIs with Node/Next.js edge runtime',
            'Implement fluid streaming text and markdown renderers with abort controllers',
            'Enforce schema validation (Zod + structured outputs) for guaranteed JSON schemas'
          ],
          actionableStepThisWeek: 'Build a Next.js server route that streams token chunks from Gemini 3.8 Flash to a typewriter UI with live markdown.'
        },
        {
          phaseTitle: 'Phase 2: Retrieval-Augmented Generation (RAG)',
          duration: 'Weeks 5–8',
          objective: 'Build reliable knowledge-grounded assistants with vector embeddings and hybrid search.',
          keyMilestones: [
            'Learn semantic text splitting & embedding generation',
            'Spin up a vector database with pgvector or Pinecone',
            'Construct a multi-document research assistant that cites exact sources'
          ],
          actionableStepThisWeek: 'Index 10 technical PDF documentation manuals into local vector chunks and query them via cosine similarity.'
        },
        {
          phaseTitle: 'Phase 3: Autonomous Agents & Tool Calling',
          duration: 'Weeks 9–14',
          objective: 'Develop multi-step agents that call APIs, execute code safely, and self-correct on failure.',
          keyMilestones: [
            'Implement function calling with schema validation',
            'Deploy an agentic workflow that writes code, runs unit tests, and patches errors',
            'Ship a polished public portfolio product with telemetry and rate limiting'
          ],
          actionableStepThisWeek: 'Build an AI assistant that can browse a GitHub repo using the GitHub API to write pull request summaries.'
        }
      ],
      resources: [
        {
          title: 'Vercel AI SDK Core Documentation & Guides',
          provider: 'Vercel',
          type: 'Documentation',
          difficulty: 'Intermediate',
          whyRecommended: 'The gold standard for TypeScript developers building generative UI, streaming, and tool calls.',
          urlHint: 'sdk.vercel.ai',
          isFree: true
        },
        {
          title: 'Building Systems with the ChatGPT API & GenAI',
          provider: 'DeepLearning.AI / Andrew Ng',
          type: 'Course',
          difficulty: 'Beginner',
          whyRecommended: 'Foundational mental models for chains, system instructions, and multi-step reasoning.',
          urlHint: 'deeplearning.ai',
          isFree: true
        },
        {
          title: 'LangChain & LlamaIndex for RAG Masterclass',
          provider: 'Harrison Chase & Jerry Liu',
          type: 'Course',
          difficulty: 'Intermediate',
          whyRecommended: 'Deep dive into complex indexing, reranking, and hybrid dense/sparse retrieval.',
          urlHint: 'academy.langchain.com',
          isFree: true
        },
        {
          title: 'Designing Machine Learning Systems',
          provider: 'Chip Huyen (O’Reilly)',
          type: 'Book',
          difficulty: 'Advanced',
          whyRecommended: 'Essential reading on data pipelines, latency, monitoring, and production deployment.',
          urlHint: 'oreilly.com',
          isFree: false
        }
      ],
      portfolioProjects: [
        {
          title: 'DocuQuery: Real-time Multi-doc RAG Workspace',
          description: 'A Notion-like editor where users upload financial or legal PDFs and collaborate with an AI copilot that embeds visual citations directly in the document.',
          difficulty: 'Intermediate',
          skillsDemonstrated: ['Streaming UI', 'Vector Search', 'PDF Chunking', 'TypeScript SDK'],
          realWorldImpact: 'Demonstrates ability to solve document hallucination and build intuitive business workflows.'
        },
        {
          title: 'AgentForge: Autonomous GitHub Issue Resolver',
          description: 'An autonomous agent that accepts a GitHub issue URL, clones the repo, replicates the bug with a test, writes a fix, and opens a verified Pull Request.',
          difficulty: 'Capstone',
          skillsDemonstrated: ['Function Calling', 'Sandbox Execution', 'State Machines', 'FastAPI'],
          realWorldImpact: 'Showcases cutting-edge developer tool capability and autonomous agent orchestration.'
        }
      ],
      interviewStrategy: {
        elevatorPitch: "I am a frontend engineer who realized the biggest bottleneck in AI isn't the model weight, but the user feedback loop. I combine solid React and streaming architecture with vector embeddings and agentic workflows to build AI software people genuinely love using.",
        keyThemesToHighlight: [
          'Handling high-concurrency streaming responses without UI stutter',
          'Designing human-in-the-loop interfaces for non-deterministic AI outputs',
          'Token cost management and caching strategies'
        ],
        sampleInterviewQuestions: [
          'How do you handle dropped connections or token timeouts in a streaming AI chat interface?',
          'What chunking strategy would you use for markdown documentation containing nested code blocks?',
          'How do you measure and mitigate hallucinations in a RAG pipeline?'
        ]
      }
    },
    {
      id: 'design-technologist',
      title: 'Design Systems & Generative UI Engineer',
      tagline: 'Bridge high-end design systems with dynamic, runtime generative interface components.',
      badge: 'Fast Pivot',
      matchScore: 86,
      transitionDifficulty: 'Gentle',
      estimatedMonthsToTransition: '2 to 3 months',
      whyItFits: "Your design intuition and frontend fluency make you the ideal candidate to spearhead 'Generative UI'—where AI generates interactive UI widgets dynamically rather than just flat text.",
      marketOutlook: {
        demandLevel: 'High',
        averageSalary: '$135,000 / yr',
        salaryRange: '$115,000 – $165,000 / yr',
        growthRate: '+24% YoY',
        remoteViability: '88% of roles open to remote'
      },
      skillsAnalysis: {
        transferableStrengths: [
          'Component hierarchy & CSS styling systems',
          'Design token implementation',
          'Accessibility & responsive design',
          'Micro-interactions & animation frameworks'
        ],
        criticalGaps: [
          {
            skill: 'Dynamic Component Streaming',
            importance: 'essential',
            whyNeeded: 'Rendering real React components streamed directly from LLM function calls (Vercel AI SDK React Server Components).',
            estimatedTimeToAcquire: '2 weeks'
          },
          {
            skill: 'Design System Governance & Headless UI',
            importance: 'recommended',
            whyNeeded: 'Radix, Tailwind v4, and automated visual regression testing.',
            estimatedTimeToAcquire: '3 weeks'
          }
        ]
      },
      roadmap: [
        {
          phaseTitle: 'Phase 1: Dynamic Component Architecture',
          duration: 'Weeks 1–3',
          objective: 'Build an interface where LLM function calls dynamically spawn validated React UI cards.',
          keyMilestones: [
            'Create a component registry matching JSON schemas to UI widgets',
            'Implement interactive charts, forms, and tables that stream into the chat view'
          ],
          actionableStepThisWeek: 'Build a flight booking or expense assistant that returns interactive flight selection cards instead of text.'
        },
        {
          phaseTitle: 'Phase 2: Polishing Animation & a11y',
          duration: 'Weeks 4–8',
          objective: 'Add fluid micro-interactions with Motion and strict ARIA accessibility compliance.',
          keyMilestones: [
            'Design transitions for dynamically loaded AI widgets',
            'Ensure keyboard navigability across dynamic AI-spawned forms'
          ],
          actionableStepThisWeek: 'Add layout animation to dynamic list items as they finish streaming.'
        }
      ],
      resources: [
        {
          title: 'Generative UI with React Server Components',
          provider: 'Vercel Guides',
          type: 'Documentation',
          difficulty: 'Intermediate',
          whyRecommended: 'Official blueprint on how to return JSX from AI streams safely.',
          isFree: true
        },
        {
          title: 'Design Systems by Alla Kholmatova',
          provider: 'Smashing Magazine',
          type: 'Book',
          difficulty: 'Intermediate',
          whyRecommended: 'Definitive guide on patterns, shared vocabulary, and maintainable component libraries.',
          isFree: false
        }
      ],
      portfolioProjects: [
        {
          title: 'CanvasMind: Generative UI Dashboard',
          description: 'A natural language business dashboard where typing queries generates interactive interactive revenue graphs, KPI metrics, and editable tables.',
          difficulty: 'Intermediate',
          skillsDemonstrated: ['Generative UI', 'Motion', 'Tailwind', 'Dynamic Components'],
          realWorldImpact: 'Solves the clunky chat experience by turning conversational AI into interactive software.'
        }
      ],
      interviewStrategy: {
        elevatorPitch: "I turn text-heavy AI conversations into delightful, tactile software experiences by dynamically rendering validated design system components.",
        keyThemesToHighlight: ['Component schema isolation', 'Fallbacks for failed AI generation', 'Motion and tactile feedback'],
        sampleInterviewQuestions: [
          'How do you prevent malicious or invalid JSON from breaking your client UI when dynamically rendering components?',
          'How do you manage client state inside a component that was spawned by an AI conversation?'
        ]
      }
    },
    {
      id: 'mlops-platform-engineer',
      title: 'ML Platform & Tooling Engineer',
      tagline: 'Engineer scalable infrastructure, model serving APIs, and developer platforms for machine learning teams.',
      badge: 'High Compensation',
      matchScore: 74,
      transitionDifficulty: 'Steep',
      estimatedMonthsToTransition: '6 to 9 months',
      whyItFits: "If you want to move deeper into systems engineering, your frontend discipline can expand into building internal ML developer portals, model registries, and cluster observability dashboards.",
      marketOutlook: {
        demandLevel: 'Very High',
        averageSalary: '$162,000 / yr',
        salaryRange: '$140,000 – $210,000 / yr',
        growthRate: '+31% YoY',
        remoteViability: '82% of roles open to remote'
      },
      skillsAnalysis: {
        transferableStrengths: [
          'Software engineering rigor & git workflows',
          'API design & telemetry comprehension',
          'DevTools experience'
        ],
        criticalGaps: [
          {
            skill: 'Docker & Kubernetes (K8s)',
            importance: 'essential',
            whyNeeded: 'Containerizing model services and managing GPU nodes for inference.',
            estimatedTimeToAcquire: '6 weeks'
          },
          {
            skill: 'vLLM / TensorRT-LLM Serving',
            importance: 'essential',
            whyNeeded: 'High throughput model serving, continuous batching, and KV cache optimization.',
            estimatedTimeToAcquire: '5 weeks'
          },
          {
            skill: 'Distributed Systems & Cloud Architecture (GCP/AWS)',
            importance: 'recommended',
            whyNeeded: 'Setting up private VPCs, object storage pipelines, and auto-scaling.',
            estimatedTimeToAcquire: '6 weeks'
          }
        ]
      },
      roadmap: [
        {
          phaseTitle: 'Phase 1: Containerization & Cloud Serving',
          duration: 'Months 1–3',
          objective: 'Master Docker, Linux systems, and containerized Python inference servers.',
          keyMilestones: [
            'Package an open-source model (Llama 3 / Mistral) in Docker',
            'Deploy to Google Cloud Run or AWS ECS with autoscaling'
          ],
          actionableStepThisWeek: 'Write a Dockerfile that spins up an inference server with vLLM and benchmarking endpoints.'
        },
        {
          phaseTitle: 'Phase 2: Kubernetes & GPU Orchestration',
          duration: 'Months 4–6',
          objective: 'Scale model workloads and manage cluster deployments.',
          keyMilestones: [
            'Deploy KServe or Ray cluster on Kubernetes',
            'Set up Prometheus & Grafana metrics for TTFT (Time to First Token)'
          ],
          actionableStepThisWeek: 'Set up local Minikube and deploy a sample model service with rolling update configs.'
        }
      ],
      resources: [
        {
          title: 'Full Stack Deep Learning: LLM Bootcamp',
          provider: 'FSDL',
          type: 'Course',
          difficulty: 'Advanced',
          whyRecommended: 'Industry-acclaimed curriculum covering production inference, evaluation, and operations.',
          urlHint: 'fullstackdeeplearning.com',
          isFree: true
        }
      ],
      portfolioProjects: [
        {
          title: 'InferenceWatch: LLM Cluster Observability Suite',
          description: 'A real-time monitoring dashboard and proxy that tracks token latency, GPU utilization, cache hit rates, and dollar cost per customer.',
          difficulty: 'Capstone',
          skillsDemonstrated: ['Docker', 'Prometheus', 'FastAPI Proxy', 'React Telemetry UI'],
          realWorldImpact: 'Demonstrates deep empathy for production engineering costs and infrastructure stability.'
        }
      ],
      interviewStrategy: {
        elevatorPitch: "I bring software engineering reliability and developer-first tooling experience to machine learning infrastructure, turning research models into robust 99.9% uptime production APIs.",
        keyThemesToHighlight: ['Continuous batching & latency optimization', 'Infrastructure as Code', 'Observability'],
        sampleInterviewQuestions: [
          'What is TTFT vs inter-token latency and what causes degradation in each?',
          'How does paged attention and KV cache management improve inference throughput?'
        ]
      }
    }
  ]
};
