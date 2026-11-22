import { Investigation } from '../types/echo';

export const PRELOADED_INVESTIGATIONS: Investigation[] = [
  {
    id: 'ai-replace-programmers',
    claim: 'AI will replace all programmers in two years.',
    category: 'TECHNOLOGY',
    createdAt: '2026-11-20T10:00:00.000Z',
    updatedAt: '2026-11-22T08:30:00.000Z',
    isPreloaded: true,
    contextSummary: 'An intense public debate across industry and academia regarding whether autonomous AI coding agents and generative LLMs will make human software engineers entirely obsolete on an aggressive 24-month horizon.',
    deconstruction: [
      {
        id: 'dec-1',
        type: 'FACT',
        statement: 'Modern AI models can generate syntactically valid code and solve standardized competitive programming problems.',
        explanation: 'State-of-the-art models consistently pass benchmarks such as HumanEval and LeetCode medium problems with high accuracy.',
        whyItMatters: 'Demonstrates real technical capability in syntax synthesis and algorithmic pattern matching.',
        neededEvidence: 'Empirical benchmark logs and real-world code generation metrics.',
        potentialWeaknesses: 'Standardized benchmarks test isolated, self-contained functions rather than ambiguous, multi-repository systems.',
        verificationStatus: 'SUPPORTED',
        linkedEvidenceIds: ['ev-supp-1']
      },
      {
        id: 'dec-2',
        type: 'ASSUMPTION',
        statement: 'The core job of a software engineer is typing syntax rather than systems architecture, requirements elicitation, and risk management.',
        explanation: 'Assumes that automating the mechanical generation of code automates the entire economic value created by programmers.',
        whyItMatters: 'If programming is mostly architecture, edge-case negotiation, and business logic, code generation only automates a fraction of the role.',
        neededEvidence: 'Time-allocation studies of enterprise software engineers across the SDLC.',
        potentialWeaknesses: 'Conflates code generation with software engineering.',
        verificationStatus: 'UNVERIFIED',
        linkedEvidenceIds: ['ev-chal-1', 'ev-chal-2']
      },
      {
        id: 'dec-3',
        type: 'ASSUMPTION',
        statement: 'Enterprise organizations can re-architect legal, security, liability, and compliance frameworks to deploy fully autonomous unverified code within 24 months.',
        explanation: 'Assumes rapid corporate adoption and legal sign-off for autonomous systems without human-in-the-loop accountability.',
        whyItMatters: 'Enterprise software migration cycles typically take 3 to 7 years due to regulatory, audit, and liability barriers.',
        neededEvidence: 'Enterprise adoption rate surveys and regulatory precedents in healthcare, finance, and aviation.',
        potentialWeaknesses: 'Ignores organizational inertia, SOC2 compliance, insurance underwriting, and liability laws.',
        verificationStatus: 'UNVERIFIED',
        linkedEvidenceIds: ['ev-chal-3']
      },
      {
        id: 'dec-4',
        type: 'OPINION',
        statement: 'Debugging AI-generated code is faster and less error-prone than humans authoring code with domain context.',
        explanation: 'A subjective assessment of cognitive load; some argue inspecting unfamiliar foreign code introduces severe verification fatigue.',
        whyItMatters: 'If debugging and verifying foreign AI code takes longer than writing tested code, net developer productivity could plateau.',
        neededEvidence: 'Controlled developer studies measuring total cycle time (including debugging and maintenance).',
        potentialWeaknesses: 'Varies wildly by codebase complexity, developer seniority, and test harness quality.',
        verificationStatus: 'INTERPRETATION',
        linkedEvidenceIds: ['ev-chal-4']
      },
      {
        id: 'dec-5',
        type: 'PREDICTION',
        statement: 'Within two years (24 months), the demand for human software developers will reach zero.',
        explanation: 'A total elimination claim with a strict temporal boundary across all global industries.',
        whyItMatters: 'Extreme claims ("all programmers", "in two years") require extraordinary evidence of zero marginal human utility across millions of legacy systems.',
        neededEvidence: 'Economic trajectory data showing net job destruction exceeding new software creation.',
        potentialWeaknesses: 'Historically, automation waves lower the cost of a good, triggering the Jevons Paradox (demand explosion).',
        verificationStatus: 'PREDICTION',
        linkedEvidenceIds: ['ev-chal-2', 'ev-supp-2']
      }
    ],
    evidence: [
      {
        id: 'ev-supp-1',
        title: 'Autonomous Code Completion Benchmarks (SWE-bench / HumanEval)',
        explanation: 'AI systems have progressed from single-line autocompletion to multi-file patch generation, resolving real GitHub issues on benchmark datasets.',
        evidenceType: 'EMPIRICAL',
        stance: 'SUPPORTING',
        provenance: 'Illustrative benchmark simulation (based on published AI research benchmarks)',
        isIllustrative: true,
        reliabilityLimitations: 'Benchmarks frequently suffer from data contamination and represent curated tasks rather than messy legacy production code.',
        relationshipToClaim: 'Provides strong evidence that machine intelligence can automate significant coding subtasks.',
        relevanceScore: 'HIGH'
      },
      {
        id: 'ev-supp-2',
        title: 'Developer Productivity Telemetry in Routine Boilerplate',
        explanation: 'Internal developer velocity reports show 25% to 55% reduction in time spent writing routine tests, API glue code, and boilerplate documentation.',
        evidenceType: 'STATISTICAL',
        stance: 'SUPPORTING',
        provenance: 'Illustrative enterprise tooling survey (aggregated developer telemetry)',
        isIllustrative: true,
        reliabilityLimitations: 'Productivity gains on routine code do not automatically translate to head-count reduction; saved time is often channeled into new features.',
        relationshipToClaim: 'Supports the premise that AI increases coding efficiency, reducing the man-hours needed per unit of basic code.',
        relevanceScore: 'HIGH'
      },
      {
        id: 'ev-chal-1',
        title: 'Software Engineering Time Allocation Breakdown',
        explanation: 'Empirical studies of professional software engineers indicate that only 20% to 30% of engineering hours are spent writing raw syntax. The remaining 70% involves requirements clarification, architecture, debugging, code review, telemetry, and cross-team alignment.',
        evidenceType: 'OBSERVATIONAL',
        stance: 'CHALLENGING',
        provenance: 'Illustrative software engineering methodology studies',
        isIllustrative: true,
        reliabilityLimitations: 'Varies between greenfield startup development and mission-critical enterprise maintenance.',
        relationshipToClaim: 'Directly undermines the assumption that automating typing replaces the software engineer role.',
        relevanceScore: 'HIGH'
      },
      {
        id: 'ev-chal-2',
        title: 'The Jevons Paradox in Computing & Automation History',
        explanation: 'When compilers (like FORTRAN in 1957) and relational databases made programming dramatically cheaper and easier, the demand for human software developers increased exponentially rather than disappearing.',
        evidenceType: 'HISTORICAL',
        stance: 'CHALLENGING',
        provenance: 'Illustrative economic history of technology and labor economics',
        isIllustrative: true,
        reliabilityLimitations: 'Historical analogies are not guarantees; future generative systems could theoretically reach recursive self-improvement.',
        relationshipToClaim: 'Suggests that cheaper software creation will expand the software industry into previously unaffordable domains.',
        relevanceScore: 'HIGH'
      },
      {
        id: 'ev-chal-3',
        title: 'Enterprise Technical Debt & Legacy Infrastructure Friction',
        explanation: 'Critical infrastructure in banking, aviation, energy, and government relies on decades-old legacy codebases (COBOL, C++, custom mainframes) lacking formal specifications, requiring deep tribal human knowledge.',
        evidenceType: 'EMPIRICAL',
        stance: 'CHALLENGING',
        provenance: 'Illustrative IT enterprise infrastructure analysis',
        isIllustrative: true,
        reliabilityLimitations: 'Focused primarily on heavily regulated industries; startups move much faster.',
        relationshipToClaim: 'Proves that a universal transition across all organizations in 24 months is operationally impossible.',
        relevanceScore: 'HIGH'
      },
      {
        id: 'ev-chal-4',
        title: 'Cognitive Verification Bottleneck and Hallucination Liability',
        explanation: 'Auditing complex AI-generated code for subtle security vulnerabilities (such as race conditions and cryptographic flaws) requires senior human expertise. Unsupervised automated deployment carries severe liability risks.',
        evidenceType: 'THEORETICAL',
        stance: 'CHALLENGING',
        provenance: 'Illustrative cybersecurity and software assurance literature',
        isIllustrative: true,
        reliabilityLimitations: 'Automated formal verification tools are evolving rapidly alongside generative models.',
        relationshipToClaim: 'Refutes the idea that human review can be safely dispensed with in two years.',
        relevanceScore: 'MEDIUM'
      }
    ],
    perspectives: [
      {
        id: 'persp-1',
        role: 'SCIENTIST',
        personaTitle: 'The Formal Verification Scientist',
        focusQuestion: 'What are the mathematical and computational bounds of stochastic code generation without formal proof?',
        whatItOverlooks: 'The claim overlooks the fundamental difference between pattern interpolation (probabilistic token generation) and rigorous formal correctness guarantees.',
        criticalQuestions: [
          'Can an LLM reliably detect zero-day logic flaws that were absent from its training corpus?',
          'How does error compounding behave when autonomous agents generate thousands of lines of dependent microservices?',
          'What happens to the distribution of software reliability when training data is poisoned by synthetic AI output?'
        ],
        alternativeInterpretations: 'AI acts as a probabilistic compiler, shifting human effort toward specification languages, theorem provers, and formal constraints.',
        requiredEvidence: 'Empirical bounds on multi-step reasoning drift in autonomous coding agents over 100+ file codebases.',
        keyQuoteOrStance: 'Syntax is cheap; correctness is mathematically hard. Until models can formally verify complex distributed invariants, a human must bear responsibility.',
        color: '#06B6D4',
        icon: 'Microscope'
      },
      {
        id: 'persp-2',
        role: 'SKEPTIC',
        personaTitle: 'The Economic Skeptic',
        focusQuestion: 'Who pays the legal and financial damages when autonomous AI-written software fails catastrophic infrastructure?',
        whatItOverlooks: 'The claim overlooks legal agency, fiduciary accountability, and enterprise insurance requirements. Software is written for humans to execute contracts and commerce.',
        criticalQuestions: [
          'Will insurance underwriters insure a bank or hospital whose production codebase was generated without certified human engineering sign-off?',
          'Does the company save money if they cut programmers but have to hire twice as many security forensic auditors?',
          'What happens to software license liability when proprietary code is synthesized from ambiguous public datasets?'
        ],
        alternativeInterpretations: 'Rather than firing engineers, companies will demand 5x higher software output per engineer, expanding project scopes.',
        requiredEvidence: 'Enterprise risk management surveys and insurance policy definitions regarding autonomous software generation.',
        keyQuoteOrStance: 'Companies do not just pay programmers to write characters; they pay them to be legally and operationally accountable when things break at 3 AM.',
        color: '#F59E0B',
        icon: 'ShieldAlert'
      },
      {
        id: 'persp-3',
        role: 'HISTORIAN',
        personaTitle: 'The Technology Historian',
        focusQuestion: 'How have past automation waves in computing actually reshaped the software labor force?',
        whatItOverlooks: 'The claim repeats a predictable 70-year historical cycle: every time an abstraction layer eliminated tedious work (punch cards, assembly, compilers, fourth-generation languages, low-code), observers predicted the extinction of programmers.',
        criticalQuestions: [
          'Why did the invention of SQL and 4GLs in the 1980s create more database engineers instead of eliminating them?',
          'How did spreadsheet software (VisiCalc/Excel) change accounting: did it destroy bookkeeping, or explode financial modeling demand?',
          'What is the historical time lag between a lab breakthrough and 80% enterprise market penetration?'
        ],
        alternativeInterpretations: 'We are witnessing an elevation of the abstraction level—from writing algorithmic syntax to orchestrating autonomous software ecosystems.',
        requiredEvidence: 'Bureau of Labor Statistics historical tech employment curves across previous automation introductions.',
        keyQuoteOrStance: 'Every tool that made programming easier simply made the world want infinitely more software.',
        color: '#8B5CF6',
        icon: 'History'
      },
      {
        id: 'persp-4',
        role: 'HUMANIST',
        personaTitle: 'The Humanist & Labor Ethicist',
        focusQuestion: 'How does this shift affect human cognitive development, entry-level career pathways, and social equity?',
        whatItOverlooks: 'The claim ignores the apprenticeships and junior developer pipeline: if entry-level tasks are automated away, how do future senior architects develop the intuition needed to supervise the AI?',
        criticalQuestions: [
          'What is the mentorship model for junior software engineers when starter tickets are solved by machines?',
          'Are we risking systemic cognitive atrophy, where future engineers cannot diagnose underlying systems when abstractions fail?',
          'How will power concentrate among the few gatekeepers who own the foundation models and compute clusters?'
        ],
        alternativeInterpretations: 'A bifurcated market: a premium on ultra-senior systems philosophers and prompt orchestrators, with a painful squeeze on junior apprentices.',
        requiredEvidence: 'Longitudinal studies on developer cognitive retention and junior hiring statistics post-2023.',
        keyQuoteOrStance: 'If you eliminate the junior tasks, you inadvertently eliminate the future senior engineers capable of evaluating the AI.',
        color: '#EC4899',
        icon: 'Users'
      },
      {
        id: 'persp-5',
        role: 'CONTRARIAN',
        personaTitle: 'The Systems Contrarian',
        focusQuestion: 'What if code itself is not an asset, but a liability, and the future bottleneck has nothing to do with generating code?',
        whatItOverlooks: 'The claim assumes generating code is the primary constraint. In reality, modern tech companies suffer from having too much code, leading to staggering maintenance overhead and tech debt.',
        criticalQuestions: [
          'If AI produces 10x more code, will that cause catastrophic system bloat and unmaintainable legacy architectures?',
          'What if the winning companies are those that delete code rather than generate it?',
          'Will the scarce skill become defining what NOT to build and ruthlessly scoping product requirements?'
        ],
        alternativeInterpretations: 'Programmers will evolve into software curators, systems editors, and product architects whose value is restraining code volume.',
        requiredEvidence: 'Enterprise codebase growth metrics vs maintenance costs over 5-year horizons.',
        keyQuoteOrStance: 'More code is rarely the solution to business problems. Generating code faster just accelerates the accumulation of technical debt.',
        color: '#10B981',
        icon: 'Flame'
      },
      {
        id: 'persp-6',
        role: 'STAKEHOLDER',
        personaTitle: 'Junior Developer Apprentice',
        focusQuestion: 'How can entry-level software developers transition into this new paradigm?',
        whatItOverlooks: 'The disruption is heavily skewed against individuals trying to break into the tech industry, while magnifying senior engineers with established domain knowledge.',
        criticalQuestions: [
          'How do computer science curricula need to modernize to teach orchestration and verification instead of basic syntax?',
          'What demonstrates competence when basic coding tests can be solved instantaneously by AI?'
        ],
        alternativeInterpretations: 'Junior developers must leap straight to systems-level thinking, product intuition, and security verification.',
        requiredEvidence: 'Job posting requirements for junior vs senior developer roles over 2024-2026.',
        keyQuoteOrStance: 'We are not competing with AI; we are competing with senior engineers wielding AI supercomputers.',
        color: '#38BDF8',
        icon: 'GraduationCap',
        isStakeholder: true
      }
    ],
    graphNodes: [
      { id: 'node-claim', label: 'AI Will Replace All Programmers in 2 Years', type: 'CLAIM', x: 450, y: 70, status: 'NORMAL' },
      { id: 'node-f1', label: 'AI Generates Valid Syntax & Solves Code Benchmarks', type: 'FACT', x: 180, y: 190, status: 'NORMAL', refId: 'dec-1' },
      { id: 'node-a1', label: 'Assumption: Software Engineering = Typing Syntax', type: 'ASSUMPTION', x: 450, y: 200, status: 'NORMAL', refId: 'dec-2' },
      { id: 'node-a2', label: 'Assumption: Enterprise Org & Legal Adoption in 24 Mo', type: 'ASSUMPTION', x: 740, y: 190, status: 'NORMAL', refId: 'dec-3' },
      { id: 'node-ev-s1', label: 'SWE-bench & Copilot Velocity Telemetry', type: 'SUPPORT_EVIDENCE', x: 120, y: 320, status: 'NORMAL', refId: 'ev-supp-1' },
      { id: 'node-ev-c1', label: 'Empirical Study: Coding Is Only 20-30% of Role', type: 'CHALLENGE_EVIDENCE', x: 380, y: 330, status: 'NORMAL', refId: 'ev-chal-1' },
      { id: 'node-ev-c2', label: 'Historical Jevons Paradox in Computing', type: 'CHALLENGE_EVIDENCE', x: 600, y: 330, status: 'NORMAL', refId: 'ev-chal-2' },
      { id: 'node-ev-c3', label: 'Legacy Tech Debt & Compliance Friction', type: 'CHALLENGE_EVIDENCE', x: 820, y: 320, status: 'NORMAL', refId: 'ev-chal-3' },
      { id: 'node-p-sci', label: 'Scientist: Formal Correctness & Proof Limits', type: 'PERSPECTIVE', x: 160, y: 460, status: 'NORMAL', refId: 'persp-1' },
      { id: 'node-p-skept', label: 'Skeptic: Legal Liability & Insurance Accountability', type: 'PERSPECTIVE', x: 390, y: 460, status: 'NORMAL', refId: 'persp-2' },
      { id: 'node-p-hist', label: 'Historian: Past Automation Abstraction Cycles', type: 'PERSPECTIVE', x: 620, y: 460, status: 'NORMAL', refId: 'persp-3' },
      { id: 'node-p-contr', label: 'Contrarian: Code as Liability & Tech Debt', type: 'PERSPECTIVE', x: 840, y: 460, status: 'NORMAL', refId: 'persp-5' },
      { id: 'node-assess', label: 'Assessment: Substantial Augmentation, Total Replacement Highly Improbable', type: 'ASSESSMENT', x: 450, y: 580, status: 'NORMAL' }
    ],
    graphEdges: [
      { id: 'edge-1', source: 'node-f1', target: 'node-claim', label: 'Supports Capabilities', type: 'SUPPORTS' },
      { id: 'edge-2', source: 'node-a1', target: 'node-claim', label: 'Foundational Premise', type: 'ASSUMES' },
      { id: 'edge-3', source: 'node-a2', target: 'node-claim', label: 'Timeline Assumption', type: 'ASSUMES' },
      { id: 'edge-4', source: 'node-ev-s1', target: 'node-f1', label: 'Validates Syntax', type: 'INFORMS' },
      { id: 'edge-5', source: 'node-ev-c1', target: 'node-a1', label: 'Directly Refutes Scope', type: 'WEAKENS' },
      { id: 'edge-6', source: 'node-ev-c2', target: 'node-a1', label: 'Expands Market Demand', type: 'CHALLENGES' },
      { id: 'edge-7', source: 'node-ev-c3', target: 'node-a2', label: 'Proves Multi-Year Lag', type: 'CHALLENGES' },
      { id: 'edge-8', source: 'node-p-sci', target: 'node-claim', label: 'Questions Reliability', type: 'CHALLENGES' },
      { id: 'edge-9', source: 'node-p-skept', target: 'node-a2', label: 'Legal Roadblock', type: 'WEAKENS' },
      { id: 'edge-10', source: 'node-p-hist', target: 'node-a1', label: 'Reframes Role', type: 'INFORMS' },
      { id: 'edge-11', source: 'node-p-contr', target: 'node-claim', label: 'Inverts Premise', type: 'CHALLENGES' },
      { id: 'edge-12', source: 'node-claim', target: 'node-assess', label: 'Evaluated Into', type: 'EVALUATES' }
    ],
    challenges: [
      {
        id: 'chal-preset-1',
        targetId: 'dec-2',
        targetStatement: 'The core job of a software engineer is typing syntax rather than systems architecture, requirements elicitation, and risk management.',
        actionType: 'CHALLENGE_ASSUMPTION',
        actionPrompt: 'What if software engineering is 80% systems requirements and alignment, and only 20% syntax synthesis?',
        userCritique: 'Empirical data shows developer time is overwhelmingly dominated by understanding human constraints, reconciling edge cases, and auditing dependencies.',
        rippleExplanation: 'When this assumption is challenged, the premise of "total replacement" collapses. Even if AI generates 100% of syntax instantly, the remaining 80% of human software engineering work remains untouched.',
        affectedItemIds: ['dec-2', 'dec-5'],
        affectedNodeIds: ['node-a1', 'node-ev-c1', 'node-assess'],
        confidenceShift: {
          from: 'PARTIALLY_SUPPORTED',
          to: 'INSUFFICIENT_EVIDENCE',
          rationale: 'Challenging the syntax-equivalence assumption reveals that the role is augmented, not eliminated. The 2-year deadline has virtually no empirical backing.'
        },
        timestamp: '2026-11-22T08:32:00.000Z'
      }
    ],
    assessment: {
      baselineConfidence: 'PARTIALLY_SUPPORTED',
      currentConfidence: 'INSUFFICIENT_EVIDENCE',
      verdictTitle: 'Substantial Task Automation, but Complete Career Extinction Within 2 Years is Highly Improbable',
      executiveSummary: 'Available evidence strongly confirms that AI coding agents dramatically accelerate routine syntax generation, boilerplate authoring, and localized debugging. However, the claim that ALL human programmers will be replaced within two years relies on two critically flawed assumptions: (1) that software engineering is merely typing syntax, and (2) that global enterprise, legal, and security infrastructures can deploy autonomous unverified systems at scale within 24 months.',
      whatIsSupported: [
        'AI models can write syntactically correct code across major programming languages.',
        'Developers using AI assistance report notable productivity gains in routine coding tasks and exploratory prototyping.',
        'Entry-level and formulaic tasks (such as writing standard API connectors and basic tests) are increasingly automated.'
      ],
      whatRemainsUncertain: [
        'Whether autonomous agents can reliably orchestrate multi-million line legacy codebases without catastrophic hallucination cascade.',
        'How legal liability, software copyright, and insurance standards will be assigned to AI-authored production code.',
        'The exact trajectory of the Jevons Paradox: whether cheaper code will cause total software demand to expand faster than automation eliminates labor.'
      ],
      criticalAssumptions: [
        'That software engineering consists primarily of authoring code rather than systems design and requirements negotiation.',
        'That organizations can legally and technically adopt autonomous unverified code in 24 months.',
        'That debugging and verifying unfamiliar AI code is universally faster than human authoring with contextual awareness.'
      ],
      missingEvidenceGaps: [
        'Controlled longitudinal studies measuring the long-term technical debt and bug rates of purely AI-generated codebases.',
        'Audits of enterprise compliance velocity in safety-critical sectors (health, banking, aerospace).',
        'Independent telemetry on junior developer hiring rates versus senior developer productivity multipliers.'
      ],
      perspectiveShifts: [
        'The Scientist highlights formal proof and verification boundaries that stochastic models cannot circumvent.',
        'The Skeptic spotlights legal liability: code requires human sign-off for financial and physical safety insurance.',
        'The Historian contextualizes this as the latest abstraction cycle (like Fortran, SQL, and Compilers) that expands software scope.',
        'The Contrarian argues that code is liability, and the true future skill is deleting unnecessary code and constraining scope.'
      ],
      whatWouldStrengthen: [
        'Demonstration of autonomous agents maintaining and refactoring a 10-year-old proprietary enterprise codebase with zero human guidance.',
        'Enactment of legal frameworks releasing corporate executives from liability for autonomous code failures.',
        'Consistent month-over-month decline in global software engineer employment listings alongside record software output.'
      ],
      whatWouldWeaken: [
        'Evidence showing exponential growth in software engineering job postings in new AI-adjacent categories.',
        'High-profile production outages or security exploits traced directly to unverified AI-generated code.',
        'Studies demonstrating that debugging foreign AI code causes cognitive verification fatigue that offsets typing gains.'
      ]
    }
  },
  {
    id: 'social-media-intelligence',
    claim: 'Social media is making students less intelligent.',
    category: 'EDUCATION',
    createdAt: '2026-11-19T14:00:00.000Z',
    updatedAt: '2026-11-21T16:00:00.000Z',
    isPreloaded: true,
    contextSummary: 'An ongoing debate regarding the impact of algorithmic short-form video and constant mobile connectivity on adolescent cognition, focus, and standardized learning outcomes.',
    deconstruction: [
      {
        id: 'dec-sm-1',
        type: 'FACT',
        statement: 'Adolescent screen time and daily interaction with short-form social video platforms have increased significantly over the past decade.',
        explanation: 'Empirical usage data from global surveys documents a marked shift toward multi-hour daily social media consumption.',
        whyItMatters: 'Confirms that exposure has reached saturation levels across diverse student demographics.',
        neededEvidence: 'Time-use surveys, device telemetry, and demographic consumption studies.',
        potentialWeaknesses: 'Self-reported screen time often overestimates or underestimates active versus background use.',
        verificationStatus: 'SUPPORTED',
        linkedEvidenceIds: ['ev-sm-supp-1']
      },
      {
        id: 'dec-sm-2',
        type: 'ASSUMPTION',
        statement: 'Reductions in sustained attention spans or shifts in reading habits equate directly to a decline in general intelligence (g-factor).',
        explanation: 'Assumes that cognitive adaptations to digital search and hyperlinked skimming represent cognitive deterioration rather than cognitive reallocation.',
        whyItMatters: 'Conflating attention duration with fluid intelligence or problem-solving capability produces flawed educational interventions.',
        neededEvidence: 'Longitudinal psychometric testing comparing fluid intelligence, crystallized knowledge, and attentional stamina.',
        potentialWeaknesses: 'Intelligence is multi-dimensional; fluid reasoning can remain stable even if sustained text endurance shifts.',
        verificationStatus: 'UNVERIFIED',
        linkedEvidenceIds: ['ev-sm-chal-1']
      },
      {
        id: 'dec-sm-3',
        type: 'OPINION',
        statement: 'Traditional long-form reading is the only authentic measure of deep intellectual capacity in modern education.',
        explanation: 'A normative cultural judgment that prioritizes linear Gutenberg-era text processing over multimodal synthesis.',
        whyItMatters: 'Shapes curriculum design, standardized testing formats, and pedagogical values.',
        neededEvidence: 'Comparative cognitive research on multimodal information synthesis versus linear reading comprehension.',
        potentialWeaknesses: 'Culturally and historically contingent definition of intellectual rigor.',
        verificationStatus: 'INTERPRETATION',
        linkedEvidenceIds: ['ev-sm-chal-2']
      },
      {
        id: 'dec-sm-4',
        type: 'PREDICTION',
        statement: 'Continued exposure to algorithmic feeds will produce permanent, irreversible deficits in generational problem-solving.',
        explanation: 'A deterministic future projection implying irreversible biological or neurological degradation.',
        whyItMatters: 'Prompts moral panic rather than evidence-based digital hygiene frameworks.',
        neededEvidence: 'Neuroplasticity studies demonstrating whether attentional deficits reverse upon reduction of screen time.',
        potentialWeaknesses: 'Human neuroplasticity enables rapid cognitive retraining when environmental incentives change.',
        verificationStatus: 'PREDICTION',
        linkedEvidenceIds: ['ev-sm-chal-1']
      }
    ],
    evidence: [
      {
        id: 'ev-sm-supp-1',
        title: 'Correlations Between Heavy Social Media Use and Fragmented Working Memory',
        explanation: 'Multiple peer-reviewed surveys report that heavy smartphone multitasking correlates with higher self-reported distractibility and lower reading retention on standardized texts.',
        evidenceType: 'STATISTICAL',
        stance: 'SUPPORTING',
        provenance: 'Illustrative educational psychology aggregate findings',
        isIllustrative: true,
        reliabilityLimitations: 'Correlation does not establish causation; students with underlying executive function difficulties may seek social media stimulation as a coping mechanism.',
        relationshipToClaim: 'Provides circumstantial evidence linking heavy media consumption to compromised task focus.',
        relevanceScore: 'HIGH'
      },
      {
        id: 'ev-sm-chal-1',
        title: 'Longitudinal Fluid Intelligence Trends (Flynn Effect Resilience)',
        explanation: 'Standardized matrix reasoning and abstract problem-solving scores have not exhibited a uniform global collapse corresponding to the rise of smartphones, indicating fluid intelligence remains largely insulated.',
        evidenceType: 'EMPIRICAL',
        stance: 'CHALLENGING',
        provenance: 'Illustrative psychometric population data',
        isIllustrative: true,
        reliabilityLimitations: 'Standardized tests may lag contemporary cognitive changes or suffer from test re-norming challenges.',
        relationshipToClaim: 'Contradicts the blanket assertion that students are objectively "less intelligent."',
        relevanceScore: 'HIGH'
      },
      {
        id: 'ev-sm-chal-2',
        title: 'Confounding Socioeconomic and Educational Variables',
        explanation: 'Recent declines in specific standardized scores correlate heavily with educational funding disparities, post-pandemic instructional disruptions, and sleep deprivation, rather than social media algorithms alone.',
        evidenceType: 'STATISTICAL',
        stance: 'CHALLENGING',
        provenance: 'Illustrative macro-educational research',
        isIllustrative: true,
        reliabilityLimitations: 'Disentangling media consumption from sleep debt and mental health stressors is difficult in observational cohorts.',
        relationshipToClaim: 'Shows that blaming social media exclusively ignores major systemic drivers.',
        relevanceScore: 'HIGH'
      }
    ],
    perspectives: [
      {
        id: 'persp-sm-1',
        role: 'SCIENTIST',
        personaTitle: 'The Cognitive Neuroscientist',
        focusQuestion: 'What specific cognitive faculties show structural alteration, and are these changes permanent or functional adaptations?',
        whatItOverlooks: 'The claim uses "intelligent" as an imprecise catch-all. Cognitive research separates working memory, attentional switching, fluid reasoning, and crystallized knowledge.',
        criticalQuestions: [
          'Is the deficit in innate intellectual capacity, or in sustained attentional stamina and sleep disruption?',
          'What degree of cognitive recovery occurs after 14 days of algorithmic detox?'
        ],
        alternativeInterpretations: 'Students suffer from acute sleep deprivation and attentional fragmentation, not an intrinsic loss of intellect.',
        requiredEvidence: 'Controlled fMRI and pre-post digital intervention trials.',
        keyQuoteOrStance: 'Do not confuse an exhausted, overstimulated brain with an unintelligent one. Sleep disruption is the hidden variable.',
        color: '#06B6D4',
        icon: 'Brain'
      },
      {
        id: 'persp-sm-2',
        role: 'HISTORIAN',
        personaTitle: 'The Media Historian',
        focusQuestion: 'How does this debate mirror historical panics over writing, the printing press, radio, and television?',
        whatItOverlooks: 'Socrates famously argued that the written word would destroy human memory and wisdom. Every communication revolution triggers an elite panic that the youth are losing cognitive rigor.',
        criticalQuestions: [
          'How did society adapt when television was accused of turning children’s brains into mush in the 1970s?',
          'What new intellectual skills (hyperlinked synthesis, visual literacy) are being developed that traditional tests fail to measure?'
        ],
        alternativeInterpretations: 'A shift in the cognitive ecology: memorization is outsourced, while synthesis and query formulation become paramount.',
        requiredEvidence: 'Comparative analyses of historical literacy transitions and psychometric adaptations.',
        keyQuoteOrStance: 'Every generation fears the medium it did not grow up with will destroy the intellect of the generation that did.',
        color: '#8B5CF6',
        icon: 'History'
      },
      {
        id: 'persp-sm-3',
        role: 'HUMANIST',
        personaTitle: 'The Adolescent Counselor',
        focusQuestion: 'How are commercial engagement algorithms intentionally weaponized against developing neurobiology?',
        whatItOverlooks: 'Framing this as a student failing obscures the multibillion-dollar behavioral engineering designed by tech conglomerates to capture dopamine loops.',
        criticalQuestions: [
          'How can we expect a 14-year-old prefrontal cortex to resist algorithms tested on billions of behavioral datapoints?',
          'How does algorithmic social comparison degrade self-worth, motivation, and classroom engagement?'
        ],
        alternativeInterpretations: 'Students are victims of predatory corporate design, not willing participants in cognitive decline.',
        requiredEvidence: 'Internal product engagement research and teen behavioral health correlations.',
        keyQuoteOrStance: 'This is not an intellectual deficit; it is an industrial-scale exploitation of dopamine circuitry.',
        color: '#EC4899',
        icon: 'HeartHandshake'
      }
    ],
    graphNodes: [
      { id: 'node-claim-sm', label: 'Social Media Is Making Students Less Intelligent', type: 'CLAIM', x: 450, y: 70, status: 'NORMAL' },
      { id: 'node-f-sm', label: 'Screen Time & Short-Form Video Use Have Surged', type: 'FACT', x: 200, y: 200, status: 'NORMAL', refId: 'dec-sm-1' },
      { id: 'node-a-sm', label: 'Assumption: Attention Span Shifts = Lower G-Factor', type: 'ASSUMPTION', x: 450, y: 200, status: 'NORMAL', refId: 'dec-sm-2' },
      { id: 'node-ev-sm1', label: 'Correlation With Attentional Distractibility', type: 'SUPPORT_EVIDENCE', x: 180, y: 340, status: 'NORMAL', refId: 'ev-sm-supp-1' },
      { id: 'node-ev-sm2', label: 'Flynn Effect Resilience in Fluid Intelligence', type: 'CHALLENGE_EVIDENCE', x: 450, y: 340, status: 'NORMAL', refId: 'ev-sm-chal-1' },
      { id: 'node-ev-sm3', label: 'Confounders: Sleep Loss & School Disruptions', type: 'CHALLENGE_EVIDENCE', x: 720, y: 340, status: 'NORMAL', refId: 'ev-sm-chal-2' },
      { id: 'node-assess-sm', label: 'Assessment: Attentional & Sleep Strain, Not Intellectual Decay', type: 'ASSESSMENT', x: 450, y: 500, status: 'NORMAL' }
    ],
    graphEdges: [
      { id: 'e-sm-1', source: 'node-f-sm', target: 'node-claim-sm', label: 'Establishes Exposure', type: 'INFORMS' },
      { id: 'e-sm-2', source: 'node-a-sm', target: 'node-claim-sm', label: 'Core Cognitive Equivalence', type: 'ASSUMES' },
      { id: 'e-sm-3', source: 'node-ev-sm1', target: 'node-a-sm', label: 'Shows Distraction', type: 'SUPPORTS' },
      { id: 'e-sm-4', source: 'node-ev-sm2', target: 'node-a-sm', label: 'Refutes G-Factor Drop', type: 'CHALLENGES' },
      { id: 'e-sm-5', source: 'node-ev-sm3', target: 'node-claim-sm', label: 'Explains Alternative Factors', type: 'WEAKENS' },
      { id: 'e-sm-6', source: 'node-claim-sm', target: 'node-assess-sm', label: 'Synthesized Into', type: 'EVALUATES' }
    ],
    challenges: [],
    assessment: {
      baselineConfidence: 'MIXED_EVIDENCE',
      currentConfidence: 'MIXED_EVIDENCE',
      verdictTitle: 'Substantial Evidence of Attentional Fragmentation and Sleep Deprivation, but No Foundation for Generic Cognitive Decay',
      executiveSummary: 'The evidence confirms that intensive social media consumption disrupts adolescent sleep, fragments sustained reading concentration, and fuels classroom distractibility. However, equating these attentional and environmental strains with a biological or irreversible decline in general intelligence is scientifically unsupported. Confounding variables—notably chronic sleep deficit and pandemic educational disruptions—play a massive role.',
      whatIsSupported: [
        'Excessive passive screen time correlates with reduced reading stamina on long-form complex texts.',
        'Algorithmic notification systems induce chronic attention switching that impairs working memory retention.',
        'Late-night screen use causes severe sleep deficits that directly depress next-day academic alertness.'
      ],
      whatRemainsUncertain: [
        'Whether observed attentional deficits are permanent neurological changes or fully reversible behavioral habits.',
        'The extent to which new digital competencies (rapid query formulation, parallel synthesis) offset traditional reading changes.',
        'The degree to which pre-existing anxiety and executive dysfunction drive social media consumption rather than vice versa.'
      ],
      criticalAssumptions: [
        'Assuming that short attention spans equal low general intelligence (g-factor).',
        'Assuming that traditional linear book-reading is the sole valid manifestation of intellect.',
        'Assuming that current cognitive habits are irreversible.'
      ],
      missingEvidenceGaps: [
        'Controlled randomized trials comparing digital literacy interventions with complete phone bans over multi-year windows.',
        'Biometric sleep monitoring linked directly to cognitive testing cohorts.'
      ],
      perspectiveShifts: [
        'The Neuroscientist reframes the problem from "stupidity" to chronic sleep debt and dopamine exhaustion.',
        'The Historian reminds us that every technological shift sparked moral panics regarding the collapse of youth intelligence.',
        'The Humanist shifts blame from adolescent character to predatory algorithmic engagement engineering.'
      ],
      whatWouldStrengthen: [
        'Replicated longitudinal studies showing persistent drops in raw fluid intelligence across non-verbal spatial reasoning tests.',
        'Demonstration of permanent neurostructural atrophy in critical reasoning areas solely attributable to algorithmic feeds.'
      ],
      whatWouldWeaken: [
        'Intervention data showing full cognitive recovery within 30 days of structured sleep and digital boundary routines.',
        'Evidence that digital-native students outperform previous generations on multidimensional problem solving.'
      ]
    }
  },
  {
    id: 'four-day-workweek',
    claim: 'A four-day workweek increases productivity.',
    category: 'WORK',
    createdAt: '2026-11-18T09:00:00.000Z',
    updatedAt: '2026-11-21T11:00:00.000Z',
    isPreloaded: true,
    contextSummary: 'Global workplace trials investigating whether reducing weekly work from 40 hours to 32 hours (with 100% pay retention) maintains or boosts total output through reduced burnout and streamlined meetings.',
    deconstruction: [
      {
        id: 'dec-4d-1',
        type: 'FACT',
        statement: 'Multiple international pilot programs (e.g., UK, Iceland, South Africa) reported sustained or increased revenue and employee well-being under 32-hour work regimes.',
        explanation: 'Organizations participating in formal pilots documented self-reported or financial stability while cutting a full working day.',
        whyItMatters: 'Establishes empirical proof-of-concept across hundreds of participating companies.',
        neededEvidence: 'Financial audits, objective output metrics, and employee retention records.',
        potentialWeaknesses: 'Pilots suffer from severe self-selection bias: companies that volunteer already have progressive, adaptable cultures.',
        verificationStatus: 'SUPPORTED',
        linkedEvidenceIds: ['ev-4d-supp-1']
      },
      {
        id: 'dec-4d-2',
        type: 'ASSUMPTION',
        statement: 'Productivity gains observed in knowledge-work sectors (tech, marketing, consulting) translate seamlessly to capital-intensive, shift-based industries (manufacturing, healthcare, logistics).',
        explanation: 'Assumes that all economic productivity is constrained by mental burnout and meeting bloat rather than physical presence and equipment operation time.',
        whyItMatters: 'A nurse, factory operator, or warehouse worker cannot increase physical throughput by 25% just by having Fridays off; patient care requires round-the-clock coverage.',
        neededEvidence: 'Sector-specific trials in hospital wards, logistics distribution centers, and manufacturing plants.',
        potentialWeaknesses: 'In hourly shift roles, cutting hours requires hiring 20% more staff, drastically raising total wage costs.',
        verificationStatus: 'UNVERIFIED',
        linkedEvidenceIds: ['ev-4d-chal-1']
      },
      {
        id: 'dec-4d-3',
        type: 'OPINION',
        statement: 'A standard 40-hour workweek is an arbitrary 20th-century factory artifact that is fundamentally outdated for modern society.',
        explanation: 'A social philosophy position arguing that historical productivity gains should be distributed as leisure rather than endless GDP growth.',
        whyItMatters: 'Frames the issue as a moral and humanitarian imperative rather than a purely technical economic optimization.',
        neededEvidence: 'Historical labor economics and quality-of-life indices.',
        potentialWeaknesses: 'Depends on societal consensus regarding the tradeoff between leisure and material consumption.',
        verificationStatus: 'INTERPRETATION',
        linkedEvidenceIds: ['ev-4d-supp-2']
      },
      {
        id: 'dec-4d-4',
        type: 'PREDICTION',
        statement: 'Within a decade, competitive market pressure will force the global economy to adopt 32-hour standard workweeks.',
        explanation: 'Forecasting a sweeping legislative and corporate transition across diverse economies.',
        whyItMatters: 'Influences long-term labor policy, talent retention strategies, and collective bargaining.',
        neededEvidence: 'Legislative bill progression, union negotiation agreements, and corporate policy trends.',
        potentialWeaknesses: 'Vulnerable to macroeconomic recessions, competitive global off-shoring, and labor shortage pressures.',
        verificationStatus: 'PREDICTION',
        linkedEvidenceIds: ['ev-4d-chal-2']
      }
    ],
    evidence: [
      {
        id: 'ev-4d-supp-1',
        title: 'Results of Large-Scale UK 4-Day Workweek Pilot Trials',
        explanation: 'Over 60 companies participated in a 6-month trial where 92% chose to continue the policy after reporting a 35% average revenue increase compared to similar historical periods alongside a 57% drop in turnover.',
        evidenceType: 'EMPIRICAL',
        stance: 'SUPPORTING',
        provenance: 'Illustrative workplace research trial documentation',
        isIllustrative: true,
        reliabilityLimitations: 'Heavy selection bias (participating firms self-selected); economic tailwinds and novelty effects (Hawthorne effect) during the test window.',
        relationshipToClaim: 'Provides strong empirical evidence that in knowledge work, shorter hours do not harm output.',
        relevanceScore: 'HIGH'
      },
      {
        id: 'ev-4d-supp-2',
        title: 'Meeting Compression and Low-Value Task Elimination Telemetry',
        explanation: 'Teams forced to compress work into four days cut average meeting durations by 30%, reduced redundant status emails, and focused on core asynchronous output.',
        evidenceType: 'OBSERVATIONAL',
        stance: 'SUPPORTING',
        provenance: 'Illustrative organizational workflow telemetry',
        isIllustrative: true,
        reliabilityLimitations: 'May result in higher daily stress if workloads are not genuinely reduced but merely crammed into 8-hour days.',
        relationshipToClaim: 'Explains the causal mechanism behind sustained output: cutting organizational waste.',
        relevanceScore: 'MEDIUM'
      },
      {
        id: 'ev-4d-chal-1',
        title: 'Capital and Staffing Constraints in Healthcare and Physical Shift Work',
        explanation: 'In intensive healthcare and emergency services, reducing weekly shift hours by 20% required immediate hiring of additional clinical staff to maintain legally mandated patient-to-nurse ratios, ballooning public budgets.',
        evidenceType: 'STATISTICAL',
        stance: 'CHALLENGING',
        provenance: 'Illustrative municipal hospital staffing cost analysis',
        isIllustrative: true,
        reliabilityLimitations: 'Focuses strictly on public sector services with fixed 24/7 staffing obligations.',
        relationshipToClaim: 'Proves the claim is false for continuous-coverage industries where output is time-bound.',
        relevanceScore: 'HIGH'
      },
      {
        id: 'ev-4d-chal-2',
        title: 'The Hawthorne Effect and Long-Term Reversion to Baseline',
        explanation: 'Industrial psychology studies demonstrate that initial productivity surges following workplace innovations often fade after 18-24 months as the novelty wears off and baseline work habits return.',
        evidenceType: 'THEORETICAL',
        stance: 'CHALLENGING',
        provenance: 'Illustrative organizational behavior literature',
        isIllustrative: true,
        reliabilityLimitations: 'Longitudinal data past 3 years on four-day workweeks remains scarce globally.',
        relationshipToClaim: 'Suggests early pilot enthusiasm may overstate permanent productivity gains.',
        relevanceScore: 'HIGH'
      }
    ],
    perspectives: [
      {
        id: 'persp-4d-1',
        role: 'SCIENTIST',
        personaTitle: 'The Ergonomics & Sleep Researcher',
        focusQuestion: 'How does a third recovery day impact cognitive stamina, burnout markers, and physical health?',
        whatItOverlooks: 'The physiological reality of cognitive fatigue: after 5-6 hours of intense creative problem solving, human mental output drops sharply. Extra rest restores executive function.',
        criticalQuestions: [
          'What are the measurable changes in salivary cortisol and sleep quality over a 12-month period?',
          'Does work-intensity increase during Monday-Thursday to a degree that induces mid-week exhaustion?'
        ],
        alternativeInterpretations: 'The benefit is not working faster; it is preventing catastrophic error rates caused by Friday afternoon exhaustion.',
        requiredEvidence: 'Biometric health telemetry and error-rate auditing in safety-sensitive tasks.',
        keyQuoteOrStance: 'Human brains are biological engines, not factory dynamos. Continuous 40-hour intellectual output is a physiological fiction.',
        color: '#06B6D4',
        icon: 'Activity'
      },
      {
        id: 'persp-4d-2',
        role: 'SKEPTIC',
        personaTitle: 'The Small Business CFO',
        focusQuestion: 'How can small-margin service businesses afford 100% pay for 80% time without raising consumer prices?',
        whatItOverlooks: 'The severe asymmetry between high-margin software monopolies (which can easily absorb experimental schedules) and low-margin independent retail, dining, and construction businesses.',
        criticalQuestions: [
          'How does a bakery, plumbing company, or daycare cut hours without either slashing revenue or hiring expensive replacement labor?',
          'Will this exacerbate inequality between white-collar knowledge workers and blue-collar hourly workers?'
        ],
        alternativeInterpretations: 'The four-day week is a luxury perk for the tech elite that cannot function across the broader working-class economy.',
        requiredEvidence: 'Profit-and-loss audits of small enterprises attempting 32-hour transitions without subsidies.',
        keyQuoteOrStance: 'A software company can eliminate four hours of pointless Zoom calls. A restaurant kitchen cannot eliminate four hours of frying food.',
        color: '#F59E0B',
        icon: 'DollarSign'
      },
      {
        id: 'persp-4d-3',
        role: 'HISTORIAN',
        personaTitle: 'The Labor Rights Historian',
        focusQuestion: 'What happened when Henry Ford established the 40-hour, 5-day workweek in 1926?',
        whatItOverlooks: 'In 1926, business owners widely declared that moving from 6 days (48 hours) to 5 days (40 hours) would bankrupt American industry. Instead, rested workers produced higher quality cars and had time to become consumers.',
        criticalQuestions: [
          'Why did Keynes predict in 1930 that his grandchildren would work 15 hours a week, and why was he wrong?',
          'How does institutional inertia preserve outdated working patterns decades after technology makes them obsolete?'
        ],
        alternativeInterpretations: 'Current 40-hour norms are an arbitrary cultural habit, not an immutable law of physics.',
        requiredEvidence: 'Historical output records from the 1920-1940 transition to the 40-hour week.',
        keyQuoteOrStance: 'Every reduction in work hours was preceded by confident declarations that civilization would collapse without the extra day.',
        color: '#8B5CF6',
        icon: 'History'
      }
    ],
    graphNodes: [
      { id: 'node-claim-4d', label: 'A 4-Day Workweek Increases Productivity', type: 'CLAIM', x: 450, y: 70, status: 'NORMAL' },
      { id: 'node-f-4d', label: 'Pilot Trials Show Maintained/Higher Revenue in Knowledge Firms', type: 'FACT', x: 200, y: 200, status: 'NORMAL', refId: 'dec-4d-1' },
      { id: 'node-a-4d', label: 'Assumption: Knowledge Work Productivity Applies Universally', type: 'ASSUMPTION', x: 500, y: 200, status: 'NORMAL', refId: 'dec-4d-2' },
      { id: 'node-ev-4d1', label: 'UK Trial: 35% Revenue Boost & 57% Turnover Drop', type: 'SUPPORT_EVIDENCE', x: 180, y: 340, status: 'NORMAL', refId: 'ev-4d-supp-1' },
      { id: 'node-ev-4d2', label: 'Hospital Shift Work: Staffing Costs Explode by 20%', type: 'CHALLENGE_EVIDENCE', x: 450, y: 340, status: 'NORMAL', refId: 'ev-4d-chal-1' },
      { id: 'node-ev-4d3', label: 'Hawthorne Effect: Temporary Surges Often Revert', type: 'CHALLENGE_EVIDENCE', x: 720, y: 340, status: 'NORMAL', refId: 'ev-4d-chal-2' },
      { id: 'node-assess-4d', label: 'Assessment: Strong in Knowledge Work, Unviable in Shift-Labor', type: 'ASSESSMENT', x: 450, y: 500, status: 'NORMAL' }
    ],
    graphEdges: [
      { id: 'e-4d-1', source: 'node-f-4d', target: 'node-claim-4d', label: 'Validates Knowledge Pilots', type: 'SUPPORTS' },
      { id: 'e-4d-2', source: 'node-a-4d', target: 'node-claim-4d', label: 'Universal Generalization', type: 'ASSUMES' },
      { id: 'e-4d-3', source: 'node-ev-4d1', target: 'node-f-4d', label: 'Documents Gains', type: 'INFORMS' },
      { id: 'e-4d-4', source: 'node-ev-4d2', target: 'node-a-4d', label: 'Direct Counterexample', type: 'WEAKENS' },
      { id: 'e-4d-5', source: 'node-ev-4d3', target: 'node-claim-4d', label: 'Questions Permanence', type: 'CHALLENGES' },
      { id: 'e-4d-6', source: 'node-claim-4d', target: 'node-assess-4d', label: 'Synthesized Into', type: 'EVALUATES' }
    ],
    challenges: [],
    assessment: {
      baselineConfidence: 'PARTIALLY_SUPPORTED',
      currentConfidence: 'PARTIALLY_SUPPORTED',
      verdictTitle: 'Partially Supported: Highly Effective for Knowledge and Creative Work, but Ineffective or Cost-Prohibitive for Continuous Shift Labor',
      executiveSummary: 'The claim that a four-day workweek increases productivity is strongly supported within knowledge-work, tech, creative, and administrative sectors where output is bottlenecked by cognitive fatigue, meeting bloat, and employee turnover. However, the claim fails when generalized to physical, shift-based, or continuous-service industries (healthcare, hospitality, construction, manufacturing) where output is strictly coupled to elapsed operational hours.',
      whatIsSupported: [
        'Knowledge-worker burnout, sick days, and turnover decline sharply with a 32-hour model.',
        'Teams voluntarily prune inefficient meetings and asynchronous redundancies to protect core focus time.',
        'Recruitment and talent retention improve dramatically for early-adopter firms.'
      ],
      whatRemainsUncertain: [
        'Whether productivity surges persist beyond a 2-year window or decay as the arrangement becomes normalized.',
        'Whether daily work compression increases stress and burnout during the active four working days.',
        'How client-facing service organizations handle external customer expectations on the fifth day.'
      ],
      criticalAssumptions: [
        'Assuming all economic sectors can eliminate 20% of operational time without losing output.',
        'Assuming trial results from self-selected progressive companies apply to traditional hierarchical corporations.',
        'Assuming productivity can be measured solely by internal output rather than availability.'
      ],
      missingEvidenceGaps: [
        'Multi-year longitudinal audits comparing five-day versus four-day firms through an economic downturn.',
        'Studies tracking whether employees quietly work on their off-day to keep up with compressed milestones.'
      ],
      perspectiveShifts: [
        'The Ergonomist highlights biological limits of intellectual focus and sleep debt remediation.',
        'The CFO exposes the brutal economics of hourly staffing and shift coverage in low-margin sectors.',
        'The Historian points out that the 40-hour week was once fiercely opposed as economically impossible.'
      ],
      whatWouldStrengthen: [
        'Evidence of viable four-day scheduling models successfully deployed in regional public hospitals without budget spikes.',
        'Standardized 5-year longitudinal studies showing sustained output superiority across diverse economic sectors.'
      ],
      whatWouldWeaken: [
        'Widespread pilot rollbacks where participating companies quietly return to 40 hours due to customer churn or client friction.',
        'Evidence showing rising worker anxiety and overtime violation rates during compressed four-day schedules.'
      ]
    }
  },
  {
    id: 'banning-smartphones-schools',
    claim: 'Banning smartphones improves academic performance.',
    category: 'EDUCATION',
    createdAt: '2026-11-17T12:00:00.000Z',
    updatedAt: '2026-11-20T15:00:00.000Z',
    isPreloaded: true,
    contextSummary: 'An escalating global policy trend where national and municipal education authorities (UNESCO, France, UK, Florida, California) enforce school-wide mobile phone prohibitions during classroom and break hours.',
    deconstruction: [
      {
        id: 'dec-ph-1',
        type: 'FACT',
        statement: 'A growing number of OECD nations and major municipal school districts have enacted statewide or national bans on student mobile devices in classrooms.',
        explanation: 'Documented legislative mandates and official school board regulations enacted across North America and Europe between 2018 and 2026.',
        whyItMatters: 'Demonstrates a decisive policy pivot toward phone-free educational environments.',
        neededEvidence: 'Statutory texts and district enforcement guidelines.',
        potentialWeaknesses: 'Enforcement fidelity varies widely between strict lock-box policies and loose "leave in backpacks" rules.',
        verificationStatus: 'SUPPORTED',
        linkedEvidenceIds: ['ev-ph-supp-1']
      },
      {
        id: 'dec-ph-2',
        type: 'ASSUMPTION',
        statement: 'Removing the physical device from the classroom automatically eliminates student digital distraction and restores instructional engagement.',
        explanation: 'Assumes that cognitive engagement is passively restored once the hardware is removed, without altering pedagogy or student motivation.',
        whyItMatters: 'A student who is disengaged or anxious may daydream, sleep, or disengage regardless of phone presence.',
        neededEvidence: 'Observational engagement audits and pedagogical efficacy comparisons before and after bans.',
        potentialWeaknesses: 'Banning hardware does not fix disengaging curricula or underlying educational apathy.',
        verificationStatus: 'UNVERIFIED',
        linkedEvidenceIds: ['ev-ph-chal-1']
      },
      {
        id: 'dec-ph-3',
        type: 'OPINION',
        statement: 'Schools have a moral and civic obligation to serve as tech-free sanctuaries for interpersonal socialization and contemplation.',
        explanation: 'A pedagogical and philosophical stance regarding the social role of schools versus preparing students for ubiquitous digital adulthood.',
        whyItMatters: 'Guides disciplinary policies and community expectations regarding childhood development.',
        neededEvidence: 'Sociological and psychological surveys on school climate and social interaction.',
        potentialWeaknesses: 'Clashes with digital-equity advocates who argue schools should teach healthy digital management rather than abstinence.',
        verificationStatus: 'INTERPRETATION',
        linkedEvidenceIds: ['ev-ph-supp-2']
      },
      {
        id: 'dec-ph-4',
        type: 'PREDICTION',
        statement: 'School districts that enforce total mobile bans will close socio-economic academic achievement gaps within five years.',
        explanation: 'A bold causal forecast linking phone prohibition to systemic closing of historical learning disparities.',
        whyItMatters: 'Distracts policymakers from funding fundamentals if framed as a miracle cure for systemic educational inequality.',
        neededEvidence: 'Longitudinal standardized testing data across matched socio-economic cohorts.',
        potentialWeaknesses: 'Socioeconomic achievement gaps stem primarily from poverty, housing instability, nutrition, and teacher pay.',
        verificationStatus: 'PREDICTION',
        linkedEvidenceIds: ['ev-ph-chal-2']
      }
    ],
    evidence: [
      {
        id: 'ev-ph-supp-1',
        title: 'UNESCO Global Education Monitoring Report on Classroom Distraction',
        explanation: 'Synthesized findings across 14 countries indicating that having a smartphone in proximity—even on silent—causes split-attention deficits and lowers memory retention during complex problem solving.',
        evidenceType: 'EMPIRICAL',
        stance: 'SUPPORTING',
        provenance: 'Illustrative multinational educational synthesis (UNESCO / OECD)',
        isIllustrative: true,
        reliabilityLimitations: 'Synthesizes heterogeneous studies with varying definitions of "ban" and "proximity."',
        relationshipToClaim: 'Directly supports the cognitive justification for removing phones from instructional spaces.',
        relevanceScore: 'HIGH'
      },
      {
        id: 'ev-ph-supp-2',
        title: 'Post-Ban School Climate and Bullying Incident Reports',
        explanation: 'Schools implementing physical pouch or locker systems recorded up to a 40% reduction in classroom behavioral referrals and lunchroom cyberbullying incidents, alongside reported increases in physical playground socializing.',
        evidenceType: 'STATISTICAL',
        stance: 'SUPPORTING',
        provenance: 'Illustrative district-level disciplinary audits',
        isIllustrative: true,
        reliabilityLimitations: 'Relies on teacher-reported disciplinary records, which may reflect confirmation bias following new policy rollouts.',
        relationshipToClaim: 'Provides strong secondary evidence of improved school climate, which indirectly fosters learning.',
        relevanceScore: 'MEDIUM'
      },
      {
        id: 'ev-ph-chal-1',
        title: 'Disparate Impact and the "Second Digital Divide"',
        explanation: 'Low-income students frequently rely on smartphones as their sole internet-capable computing device for homework, translation, public transit schedules, and family coordination. Blanket bans can disproportionately penalize vulnerable students.',
        evidenceType: 'OBSERVATIONAL',
        stance: 'CHALLENGING',
        provenance: 'Illustrative digital equity and sociology of education field work',
        isIllustrative: true,
        reliabilityLimitations: 'Applies mostly to take-home and off-hours policies rather than bell-to-bell classroom restrictions.',
        relationshipToClaim: 'Demonstrates unintended consequences that complicate a simple "bans improve performance" narrative.',
        relevanceScore: 'HIGH'
      },
      {
        id: 'ev-ph-chal-2',
        title: 'Marginal Long-Term Effect on High-Achieving Cohorts',
        explanation: 'Econometric analyses of UK schools following phone bans found modest test gains concentrated almost entirely among historically underperforming and low-achieving students, while high-achieving students showed negligible academic change.',
        evidenceType: 'EMPIRICAL',
        stance: 'CHALLENGING',
        provenance: 'Illustrative London School of Economics econometric paper simulation',
        isIllustrative: true,
        reliabilityLimitations: 'Focused on standardized GCSE examination results in a specific urban context.',
        relationshipToClaim: 'Refines the claim: bans do not universally raise all boats; they function as a targeted intervention for the most vulnerable.',
        relevanceScore: 'HIGH'
      }
    ],
    perspectives: [
      {
        id: 'persp-ph-1',
        role: 'SCIENTIST',
        personaTitle: 'The Cognitive Ergonomist',
        focusQuestion: 'How does the mere presence of a phone in a pocket tax limited prefrontal cognitive capacity ("brain drain")?',
        whatItOverlooks: 'The "brain drain" effect: researchers found that actively inhibiting the impulse to check a nearby phone consumes finite executive control, leaving fewer cognitive resources for problem solving.',
        criticalQuestions: [
          'Does having the phone in a backpack produce the same cognitive drag as having it on the desk or in an external lockbox?',
          'What happens to student cortisol levels and phantom vibration syndrome during the first two weeks of withdrawal?'
        ],
        alternativeInterpretations: 'Bans do not make kids smarter; they liberate cognitive bandwidth previously spent on continuous temptation suppression.',
        requiredEvidence: 'Controlled eye-tracking and working-memory tests with varied device distances.',
        keyQuoteOrStance: 'Even when silenced and face-down, a personal smartphone exerts a magnetic pull on working memory that undermines abstract learning.',
        color: '#06B6D4',
        icon: 'SmartphoneOff'
      },
      {
        id: 'persp-ph-2',
        role: 'SKEPTIC',
        personaTitle: 'The Educational Technologist',
        focusQuestion: 'Does an abstinence-only policy fail to prepare young adults for a world entirely mediated by screens?',
        whatItOverlooks: 'The pedagogical opportunity cost: by treating phones as contraband, schools forfeit the chance to teach digital literacy, research verification, and responsible self-regulation under adult guidance.',
        criticalQuestions: [
          'What happens when students graduate into college and workplaces with zero cultivated discipline for managing digital distractions?',
          'How do teachers handle legitimate educational use cases (calculator apps, field-trip research, language translation)?'
        ],
        alternativeInterpretations: 'Abstinence is an easy administrative fix that punts the hard work of teaching digital maturity down the road.',
        requiredEvidence: 'Longitudinal college-readiness and digital self-regulation data from phone-free versus phone-integrated schools.',
        keyQuoteOrStance: 'We are creating artificial 1990s islands inside schools while dumping kids into a 2030s algorithmic ocean the moment the final bell rings.',
        color: '#F59E0B',
        icon: 'BookOpen'
      },
      {
        id: 'persp-ph-3',
        role: 'HUMANIST',
        personaTitle: 'The Classroom Teacher & Mentor',
        focusQuestion: 'How does the policy transform classroom relationships, peer dialogue, and eye contact?',
        whatItOverlooks: 'The subtle, human culture of the hallway: when phones vanish, students are forced to look up, talk to each other, endure boredom, and make awkward conversation.',
        criticalQuestions: [
          'How does the return of physical boredom stimulate playground creativity and real-world friendship formation?',
          'How does teacher morale improve when educators are no longer forced to act as phone police for 45 minutes every period?'
        ],
        alternativeInterpretations: 'The greatest academic dividend of a phone ban is not test scores; it is the restoration of classroom community and eye contact.',
        requiredEvidence: 'Qualitative teacher retention and student social-connection sentiment audits.',
        keyQuoteOrStance: 'When the phones were locked away, the classrooms became noisy again—in the best possible way. The students were talking to each other.',
        color: '#EC4899',
        icon: 'Smile'
      }
    ],
    graphNodes: [
      { id: 'node-claim-ph', label: 'Banning Smartphones Improves Academic Performance', type: 'CLAIM', x: 450, y: 70, status: 'NORMAL' },
      { id: 'node-f-ph', label: 'International Trend Toward School Phone Prohibitions', type: 'FACT', x: 200, y: 200, status: 'NORMAL', refId: 'dec-ph-1' },
      { id: 'node-a-ph', label: 'Assumption: Removing Hardware Solves Disengagement', type: 'ASSUMPTION', x: 500, y: 200, status: 'NORMAL', refId: 'dec-ph-2' },
      { id: 'node-ev-ph1', label: 'UNESCO: Split-Attention Deficit & Brain Drain', type: 'SUPPORT_EVIDENCE', x: 180, y: 340, status: 'NORMAL', refId: 'ev-ph-supp-1' },
      { id: 'node-ev-ph2', label: 'Gains Concentrated Mostly Among Low-Achievers', type: 'CHALLENGE_EVIDENCE', x: 450, y: 340, status: 'NORMAL', refId: 'ev-ph-chal-2' },
      { id: 'node-ev-ph3', label: 'Second Digital Divide for Low-Income Students', type: 'CHALLENGE_EVIDENCE', x: 720, y: 340, status: 'NORMAL', refId: 'ev-ph-chal-1' },
      { id: 'node-assess-ph', label: 'Assessment: Modest Academic Boost, Large Behavioral & Social Benefit', type: 'ASSESSMENT', x: 450, y: 500, status: 'NORMAL' }
    ],
    graphEdges: [
      { id: 'e-ph-1', source: 'node-f-ph', target: 'node-claim-ph', label: 'Widespread Policy Uptake', type: 'INFORMS' },
      { id: 'e-ph-2', source: 'node-a-ph', target: 'node-claim-ph', label: 'Hardware = Attention', type: 'ASSUMES' },
      { id: 'e-ph-3', source: 'node-ev-ph1', target: 'node-a-ph', label: 'Proves Cognitive Drain', type: 'SUPPORTS' },
      { id: 'e-ph-4', source: 'node-ev-ph2', target: 'node-claim-ph', label: 'Qualifies Demographic Scope', type: 'WEAKENS' },
      { id: 'e-ph-5', source: 'node-ev-ph3', target: 'node-claim-ph', label: 'Highlights Equity Gaps', type: 'CHALLENGES' },
      { id: 'e-ph-6', source: 'node-claim-ph', target: 'node-assess-ph', label: 'Synthesized Into', type: 'EVALUATES' }
    ],
    challenges: [],
    assessment: {
      baselineConfidence: 'PARTIALLY_SUPPORTED',
      currentConfidence: 'PARTIALLY_SUPPORTED',
      verdictTitle: 'Partially Supported: Meaningful Attentional and Social Gains for Lower-Performing Students, but Not a Universal Academic Panacea',
      executiveSummary: 'Evidence across multiple countries confirms that enforcing phone-free school hours reduces instructional friction, alleviates cyberbullying, and yields modest but tangible standardized test gains—especially for struggling and disadvantaged students who are most vulnerable to algorithmic distraction. However, phone bans alone cannot overcome deeper educational deficits, and high-achieving students exhibit minimal academic variation.',
      whatIsSupported: [
        'Classroom distraction decreases significantly when phones are physically inaccessible.',
        'Historically lower-performing students demonstrate the largest academic and engagement rebounds.',
        'School social climate, interpersonal conversation, and physical activity during breaks improve.'
      ],
      whatRemainsUncertain: [
        'Whether abstinence in school hinders long-term digital self-regulation when entering higher education and employment.',
        'The degree of equity distortion for students who rely on smartphones as primary digital lifelines.',
        'Differences in efficacy between strict physical pouch lockboxes versus loose classroom guidelines.'
      ],
      criticalAssumptions: [
        'Assuming hardware removal automatically produces deep intellectual curiosity.',
        'Assuming phone bans can substitute for structural educational funding and teacher compensation.',
        'Assuming digital literacy cannot be taught alongside device presence.'
      ],
      missingEvidenceGaps: [
        'Longitudinal comparisons of adult digital self-regulation between graduates of phone-free versus phone-integrated schools.',
        'Comparative cost-benefit audits of pouch-locking enforcement hardware versus teacher training.'
      ],
      perspectiveShifts: [
        'The Cognitive Ergonomist shows how even a silenced phone leeches working memory capacity.',
        'The Ed-Tech Skeptic warns against an unrealistic abstinence policy in a digital century.',
        'The Classroom Teacher emphasizes the return of real-world eye contact, socialization, and community.'
      ],
      whatWouldStrengthen: [
        'Replicated longitudinal test data demonstrating durable multi-year test score elevation across all socioeconomic strata.',
        'Evidence showing reduced anxiety and adolescent depression directly tied to phone-free school hours.'
      ],
      whatWouldWeaken: [
        'Studies showing that students overcompensate with extreme screen binges immediately upon leaving the school gate.',
        'High rates of student evasion that force teachers into full-time disciplinary policing roles.'
      ]
    }
  }
];
