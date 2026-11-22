// ECHO Domain Types & Interfaces

export type ClaimCategory = 
  | 'TECHNOLOGY' 
  | 'EDUCATION' 
  | 'SOCIETY' 
  | 'WORK' 
  | 'SCIENCE' 
  | 'GENERAL';

export type DeconstructionType = 
  | 'FACT' 
  | 'ASSUMPTION' 
  | 'OPINION' 
  | 'PREDICTION';

export type VerificationStatus = 
  | 'SUPPORTED' 
  | 'CONTRADICTED' 
  | 'UNVERIFIED' 
  | 'INTERPRETATION' 
  | 'PREDICTION';

export type EvidenceType = 
  | 'EMPIRICAL' 
  | 'STATISTICAL' 
  | 'THEORETICAL' 
  | 'OBSERVATIONAL' 
  | 'ANECDOTAL' 
  | 'HISTORICAL';

export type EvidenceStance = 'SUPPORTING' | 'CHALLENGING';

export type ConfidenceLevel = 
  | 'STRONGLY_SUPPORTED' 
  | 'PARTIALLY_SUPPORTED' 
  | 'MIXED_EVIDENCE' 
  | 'INSUFFICIENT_EVIDENCE' 
  | 'NOT_VERIFIABLE';

export type PerspectiveRole = 
  | 'SCIENTIST' 
  | 'SKEPTIC' 
  | 'HISTORIAN' 
  | 'HUMANIST' 
  | 'CONTRARIAN' 
  | 'STAKEHOLDER';

export type ChallengeActionType = 
  | 'WHAT_IF_WRONG' 
  | 'DISPROVE_EVIDENCE' 
  | 'ALTERNATIVE_EXPLANATION' 
  | 'OVERLOOKED' 
  | 'CHALLENGE_ASSUMPTION';

export interface DeconstructionItem {
  id: string;
  type: DeconstructionType;
  statement: string;
  explanation: string;
  whyItMatters: string;
  neededEvidence: string;
  potentialWeaknesses: string;
  verificationStatus: VerificationStatus;
  isChallenged?: boolean;
  challengeImpact?: string;
  linkedEvidenceIds?: string[];
}

export interface EvidenceItem {
  id: string;
  title: string;
  explanation: string;
  evidenceType: EvidenceType;
  stance: EvidenceStance;
  provenance: string; // Clearly labeled illustrative or user entered
  isIllustrative: boolean;
  isUserAdded?: boolean;
  reliabilityLimitations: string;
  relationshipToClaim: string;
  relevanceScore: 'HIGH' | 'MEDIUM' | 'CONTEXTUAL';
  isChallenged?: boolean;
}

export interface PerspectiveItem {
  id: string;
  role: PerspectiveRole;
  personaTitle: string; // e.g. "The Scientist", "Senior Enterprise Architect"
  focusQuestion: string;
  whatItOverlooks: string;
  criticalQuestions: string[];
  alternativeInterpretations: string;
  requiredEvidence: string;
  keyQuoteOrStance: string;
  color: string;
  icon: string;
  isStakeholder?: boolean;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  subtext?: string;
  type: 'CLAIM' | 'FACT' | 'ASSUMPTION' | 'OPINION' | 'PREDICTION' | 'SUPPORT_EVIDENCE' | 'CHALLENGE_EVIDENCE' | 'PERSPECTIVE' | 'ASSESSMENT';
  x: number;
  y: number;
  status: 'NORMAL' | 'HIGHLIGHTED' | 'CHALLENGED' | 'DISPROVED';
  refId?: string; // links back to deconstruction item, evidence item, etc.
}

export interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  type: 'SUPPORTS' | 'CHALLENGES' | 'ASSUMES' | 'INFORMS' | 'WEAKENS' | 'EVALUATES';
  isDashed?: boolean;
  isHighlighted?: boolean;
}

export interface ActiveChallenge {
  id: string;
  targetId: string; // Target deconstruction item or assumption id
  targetStatement: string;
  actionType: ChallengeActionType;
  actionPrompt: string;
  userCritique?: string;
  rippleExplanation: string;
  affectedItemIds: string[];
  affectedNodeIds: string[];
  confidenceShift: {
    from: ConfidenceLevel;
    to: ConfidenceLevel;
    rationale: string;
  };
  timestamp: string;
}

export interface AssessmentData {
  baselineConfidence: ConfidenceLevel;
  currentConfidence: ConfidenceLevel;
  verdictTitle: string;
  executiveSummary: string;
  whatIsSupported: string[];
  whatRemainsUncertain: string[];
  criticalAssumptions: string[];
  missingEvidenceGaps: string[];
  perspectiveShifts: string[];
  whatWouldStrengthen: string[];
  whatWouldWeaken: string[];
}

export interface Investigation {
  id: string;
  claim: string;
  category: ClaimCategory;
  createdAt: string;
  updatedAt: string;
  isPreloaded?: boolean;
  contextSummary: string;
  deconstruction: DeconstructionItem[];
  evidence: EvidenceItem[];
  perspectives: PerspectiveItem[];
  graphNodes: KnowledgeNode[];
  graphEdges: KnowledgeEdge[];
  challenges: ActiveChallenge[];
  assessment: AssessmentData;
}
