import {
  Investigation,
  DeconstructionItem,
  EvidenceItem,
  PerspectiveItem,
  KnowledgeNode,
  KnowledgeEdge,
  ActiveChallenge,
  ConfidenceLevel,
  ChallengeActionType
} from '../types/echo';

/**
 * Deterministic, transparent local intelligence engine for ECHO.
 * Handles custom claim deconstruction, ripple effects of challenges,
 * and dynamic knowledge graph layout generation.
 */

// Helper to sanitize strings into IDs
const makeId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

export class AnalysisEngine {
  /**
   * Deconstructs any arbitrary user claim into structured analytical components
   */
  static analyzeCustomClaim(rawClaim: string): Investigation {
    const claim = rawClaim.trim();
    const id = makeId('inv');

    // Categorization heuristic
    let category: Investigation['category'] = 'GENERAL';
    const lower = claim.toLowerCase();
    if (lower.includes('ai') || lower.includes('software') || lower.includes('tech') || lower.includes('robot') || lower.includes('algorithm')) {
      category = 'TECHNOLOGY';
    } else if (lower.includes('school') || lower.includes('student') || lower.includes('education') || lower.includes('learn') || lower.includes('university')) {
      category = 'EDUCATION';
    } else if (lower.includes('work') || lower.includes('job') || lower.includes('productivity') || lower.includes('salary') || lower.includes('office')) {
      category = 'WORK';
    } else if (lower.includes('health') || lower.includes('climate') || lower.includes('energy') || lower.includes('carbon') || lower.includes('diet')) {
      category = 'SCIENCE';
    } else if (lower.includes('social') || lower.includes('media') || lower.includes('people') || lower.includes('society') || lower.includes('government')) {
      category = 'SOCIETY';
    }

    // Deconstruction generation
    const deconstruction: DeconstructionItem[] = [
      {
        id: makeId('dec-fact'),
        type: 'FACT',
        statement: `The subject matter of "${claim}" is actively debated across public, academic, and policy domains.`,
        explanation: 'Empirical premise acknowledging that the claim reflects an ongoing social or technical discourse.',
        whyItMatters: 'Separates the existence of intense discourse from whether the underlying assertion is objectively verified.',
        neededEvidence: 'Bibliometric tracking, media sentiment, and industry debate records.',
        potentialWeaknesses: 'Public prominence does not equate to scientific consensus.',
        verificationStatus: 'SUPPORTED'
      },
      {
        id: makeId('dec-assump'),
        type: 'ASSUMPTION',
        statement: `Assumes that the core mechanisms asserted in "${claim}" operate uniformly without significant contextual or demographic exceptions.`,
        explanation: 'Most sweeping claims assume a universal causal relationship, discounting regional, cultural, or industry variations.',
        whyItMatters: 'If the effect is highly contingent on specific conditions, treating the claim as universal produces flawed conclusions.',
        neededEvidence: 'Sub-cohort analyses, stratified trials, and localized case studies.',
        potentialWeaknesses: 'Universal statements are easily disproved by individual counterexamples.',
        verificationStatus: 'UNVERIFIED'
      },
      {
        id: makeId('dec-opin'),
        type: 'OPINION',
        statement: `Whether the outcome described in "${claim}" is considered beneficial, harmful, or acceptable is a normative value judgment.`,
        explanation: 'What one group views as progress or optimization, another may view as disruption or loss.',
        whyItMatters: 'Clarifies that policy reactions depend on ethics and priorities, not solely on technical mechanics.',
        neededEvidence: 'Stakeholder sentiment analysis, economic welfare metrics, and ethical frameworks.',
        potentialWeaknesses: 'Value systems vary widely between stakeholders.',
        verificationStatus: 'INTERPRETATION'
      },
      {
        id: makeId('dec-pred'),
        type: 'PREDICTION',
        statement: `The trajectory asserted in "${claim}" assumes future conditions will continue along current linear trends without feedback loops.`,
        explanation: 'Predictive claims inherently discount regulatory intervention, market adaptation, and unintended consequences.',
        whyItMatters: 'Complex adaptive systems rarely progress linearly; systemic friction inevitably alters outcomes.',
        neededEvidence: 'Historical trend volatility, feedback model simulations, and regulatory forecasts.',
        potentialWeaknesses: 'Predictions are probabilistic estimates, not deterministic certainties.',
        verificationStatus: 'PREDICTION'
      }
    ];

    // Illustrative Evidence generation
    const evidence: EvidenceItem[] = [
      {
        id: makeId('ev-supp'),
        title: `Illustrative Correlational Indicators Supporting Aspects of the Claim`,
        explanation: `Initial observational telemetry, surveys, or pilot indicators suggesting plausible alignment with "${claim}".`,
        evidenceType: 'STATISTICAL',
        stance: 'SUPPORTING',
        provenance: 'Illustrative analytical baseline (unverified general indicator)',
        isIllustrative: true,
        reliabilityLimitations: 'Observational correlations frequently confuse causation with confounding background factors.',
        relationshipToClaim: 'Provides circumstantial rationale for why many observers find the claim plausible.',
        relevanceScore: 'MEDIUM'
      },
      {
        id: makeId('ev-chal-1'),
        title: `Confounding Variables and Systemic Friction Points`,
        explanation: `Counter-indicators indicating that secondary factors (regulatory resistance, economic cost, human inertia) mitigate the primary assertion.`,
        evidenceType: 'EMPIRICAL',
        stance: 'CHALLENGING',
        provenance: 'Illustrative analytical baseline (unverified counter-indicator)',
        isIllustrative: true,
        reliabilityLimitations: 'Impact magnitude varies significantly depending on governance models and enforcement mechanisms.',
        relationshipToClaim: 'Directly challenges the inevitability and scope of the original assertion.',
        relevanceScore: 'HIGH'
      },
      {
        id: makeId('ev-chal-2'),
        title: `Historical Precedents of Systemic Adaptation`,
        explanation: `Past instances where similar sweeping disruptions prompted institutional safeguards, shifting the final outcome from the initial extreme prediction.`,
        evidenceType: 'HISTORICAL',
        stance: 'CHALLENGING',
        provenance: 'Historical comparative analogies',
        isIllustrative: true,
        reliabilityLimitations: 'Historical analogies are instructive but never identical to novel contemporary phenomena.',
        relationshipToClaim: 'Demonstrates that human institutions adapt dynamically rather than passively succumbing to predicted disruptions.',
        relevanceScore: 'MEDIUM'
      }
    ];

    // 5 Analytical Perspectives
    const perspectives: PerspectiveItem[] = [
      {
        id: makeId('persp-sci'),
        role: 'SCIENTIST',
        personaTitle: 'The Empirical Scientist',
        focusQuestion: `What controlled experiments or quantitative metrics could rigorously test "${claim}"?`,
        whatItOverlooks: 'The claim relies heavily on narrative plausibility rather than reproducible, falsifiable empirical tests.',
        criticalQuestions: [
          'What is the precise independent variable being manipulated, and how is the dependent variable isolated?',
          'What statistical power and sample diversity would be required to rule out sampling bias?',
          'Has this assertion been subjected to pre-registered double-blind replication?'
        ],
        alternativeInterpretations: 'The observed phenomenon may be an artifact of measurement error or transient market noise.',
        requiredEvidence: 'Controlled longitudinal trials with pre-registered methodology and published raw datasets.',
        keyQuoteOrStance: 'Show me the falsifiable hypothesis. Without reproducible controls, this remains a compelling conjecture, not a verified reality.',
        color: '#06B6D4',
        icon: 'Microscope'
      },
      {
        id: makeId('persp-skept'),
        role: 'SKEPTIC',
        personaTitle: 'The Forensic Skeptic',
        focusQuestion: `Who benefits from convincing the public that "${claim}" is an inevitable fact?`,
        whatItOverlooks: 'The commercial, ideological, or political incentives driving the promotion of this narrative.',
        criticalQuestions: [
          'Which companies, lobbyists, or institutions gain market valuation or legislative leverage from this claim?',
          'What negative consequences or hidden costs are being downplayed by vocal proponents?',
          'What happens if the baseline assumptions prove catastrophically mistaken?'
        ],
        alternativeInterpretations: 'The claim functions as a self-fulfilling PR narrative or hype cycle designed to attract capital or attention.',
        requiredEvidence: 'Disclosures of financial conflicts of interest, lobbying expenditures, and vendor dependency audits.',
        keyQuoteOrStance: 'Whenever a bold claim is presented as inevitable, look closely at whose stock price or political influence rises with each headline.',
        color: '#F59E0B',
        icon: 'ShieldAlert'
      },
      {
        id: makeId('persp-hist'),
        role: 'HISTORIAN',
        personaTitle: 'The Institutional Historian',
        focusQuestion: `What historical episodes had identical early rhetoric, and how did they actually unfold?`,
        whatItOverlooks: 'The persistent gap between technological or social euphoria and the decades-long slog of institutional implementation.',
        criticalQuestions: [
          'How long did previous analogous transitions take between initial public awareness and widespread normalization?',
          'What regulatory, legal, and social roadblocks emerged historically that early prophets failed to foresee?',
          'Did the transition enrich the broader public or concentrate power in a newly formed oligopoly?'
        ],
        alternativeInterpretations: 'This is not an unprecedented event; it is the latest chapter in a cyclical renegotiation of power and labor.',
        requiredEvidence: 'Archival policy records, historical economic transition timelines, and comparative case studies.',
        keyQuoteOrStance: 'Human societies rarely follow straight exponential curves. History is the story of friction, inertia, and unexpected institutional detours.',
        color: '#8B5CF6',
        icon: 'History'
      },
      {
        id: makeId('persp-hum'),
        role: 'HUMANIST',
        personaTitle: 'The Humanist & Ethicist',
        focusQuestion: `Who bears the human and social cost if this claim is enacted or accepted as gospel?`,
        whatItOverlooks: 'The human lived experience, psychological dignity, and vulnerable communities that are absent from spreadsheet models.',
        criticalQuestions: [
          'Which marginalized groups or workers have the least agency and protection in this scenario?',
          'How does this shift affect interpersonal empathy, mental health, and community cohesion?',
          'Are we reducing complex human worth to narrow metrics of speed, productivity, or compliance?'
        ],
        alternativeInterpretations: 'The primary metric of success should be human flourishing and resilience, not technical or market velocity.',
        requiredEvidence: 'Qualitative ethnographic field interviews, psychological well-being surveys, and community impact assessments.',
        keyQuoteOrStance: 'Progress that treats human dignity as an acceptable casualty is not progress; it is an ideological blind spot.',
        color: '#EC4899',
        icon: 'HeartHandshake'
      },
      {
        id: makeId('persp-contr'),
        role: 'CONTRARIAN',
        personaTitle: 'The Systems Contrarian',
        focusQuestion: `What if the exact inverse of "${claim}" is where the true strategic reality lies?`,
        whatItOverlooks: 'The secondary systemic rebound: every major action triggers an equal and opposite cultural or economic counter-reaction.',
        criticalQuestions: [
          'If everyone assumes this claim is true and positions accordingly, what enormous opportunity opens up in doing the opposite?',
          'What if the factor being treated as a weakness is actually the hidden core strength of the system?',
          'What unexpected bottleneck will suddenly become 100x more valuable once this claim is realized?'
        ],
        alternativeInterpretations: 'The consensus narrative is saturated; the true leverage point is in the unexamined counter-trend.',
        requiredEvidence: 'Market asymmetry telemetry, niche counter-trend growth curves, and contrarian economic indicators.',
        keyQuoteOrStance: 'When everyone looks in one direction, the most interesting and dangerous things always happen in the direction nobody is watching.',
        color: '#10B981',
        icon: 'Flame'
      }
    ];

    // Build Graph
    const graphNodes: KnowledgeNode[] = [
      { id: 'node-claim', label: claim.length > 45 ? `${claim.slice(0, 42)}...` : claim, type: 'CLAIM', x: 450, y: 70, status: 'NORMAL' },
      { id: 'node-f1', label: 'Empirical Discourse Baseline', type: 'FACT', x: 180, y: 190, status: 'NORMAL', refId: deconstruction[0].id },
      { id: 'node-a1', label: 'Assumption: Universal Uniformity', type: 'ASSUMPTION', x: 450, y: 200, status: 'NORMAL', refId: deconstruction[1].id },
      { id: 'node-ev-s1', label: 'Observational Correlates', type: 'SUPPORT_EVIDENCE', x: 180, y: 340, status: 'NORMAL', refId: evidence[0].id },
      { id: 'node-ev-c1', label: 'Confounding Structural Variables', type: 'CHALLENGE_EVIDENCE', x: 450, y: 340, status: 'NORMAL', refId: evidence[1].id },
      { id: 'node-ev-c2', label: 'Historical Adaptation Safeguards', type: 'CHALLENGE_EVIDENCE', x: 720, y: 340, status: 'NORMAL', refId: evidence[2].id },
      { id: 'node-p-sci', label: 'Scientist: Falsifiability & Metrics', type: 'PERSPECTIVE', x: 180, y: 460, status: 'NORMAL', refId: perspectives[0].id },
      { id: 'node-p-skept', label: 'Skeptic: Hidden Incentives', type: 'PERSPECTIVE', x: 450, y: 460, status: 'NORMAL', refId: perspectives[1].id },
      { id: 'node-p-hist', label: 'Historian: Precedent Cycles', type: 'PERSPECTIVE', x: 720, y: 460, status: 'NORMAL', refId: perspectives[2].id },
      { id: 'node-assess', label: 'Assessment: Partial Plausibility With Major Unverified Assumptions', type: 'ASSESSMENT', x: 450, y: 580, status: 'NORMAL' }
    ];

    const graphEdges: KnowledgeEdge[] = [
      { id: 'edge-1', source: 'node-f1', target: 'node-claim', label: 'Frames Context', type: 'INFORMS' },
      { id: 'edge-2', source: 'node-a1', target: 'node-claim', label: 'Critical Premise', type: 'ASSUMES' },
      { id: 'edge-3', source: 'node-ev-s1', target: 'node-f1', label: 'Supports Context', type: 'SUPPORTS' },
      { id: 'edge-4', source: 'node-ev-c1', target: 'node-a1', label: 'Directly Challenges', type: 'WEAKENS' },
      { id: 'edge-5', source: 'node-ev-c2', target: 'node-claim', label: 'Contextualizes History', type: 'CHALLENGES' },
      { id: 'edge-6', source: 'node-p-sci', target: 'node-claim', label: 'Demands Controls', type: 'INFORMS' },
      { id: 'edge-7', source: 'node-p-skept', target: 'node-a1', label: 'Interrogates Bias', type: 'WEAKENS' },
      { id: 'edge-8', source: 'node-claim', target: 'node-assess', label: 'Synthesized Into', type: 'EVALUATES' }
    ];

    return {
      id,
      claim,
      category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      contextSummary: `An exploratory critical investigation into the claim: "${claim}". Analyzing structural assumptions, opposing evidence, and overlooked angles.`,
      deconstruction,
      evidence,
      perspectives,
      graphNodes,
      graphEdges,
      challenges: [],
      assessment: {
        baselineConfidence: 'MIXED_EVIDENCE',
        currentConfidence: 'MIXED_EVIDENCE',
        verdictTitle: 'Mixed Evidence: Plausible Mechanisms Subject to Substantial Hidden Assumptions and Contextual Variability',
        executiveSummary: `The claim "${claim}" captures genuine real-world trends or concerns, but relies on sweeping assumptions of uniformity, linearity, and universal outcomes. While initial correlational indicators offer surface plausibility, significant counter-pressures, regulatory barriers, and historical precedents indicate that real-world outcomes will be far more nuanced and context-dependent.`,
        whatIsSupported: [
          'The subject matter represents a legitimate, measurable topic of broad public or professional focus.',
          'Initial observations provide plausible rationale for why the claim has gained cultural or market traction.'
        ],
        whatRemainsUncertain: [
          'The true causal relationship once confounding variables and demographic stratifications are accounted for.',
          'The degree to which institutional, legal, and economic feedback loops will constrain the predicted outcome.'
        ],
        criticalAssumptions: [
          'Assuming that current trajectory trends will continue indefinitely without encountering systemic barriers.',
          'Assuming that the phenomenon behaves identically across heterogeneous sectors and cultural environments.'
        ],
        missingEvidenceGaps: [
          'Controlled empirical replication trials with published methodology.',
          'Comprehensive multi-stakeholder audits capturing unintended secondary and tertiary consequences.'
        ],
        perspectiveShifts: [
          'The Scientist shifts focus to falsifiability and rigorous experimental control design.',
          'The Skeptic illuminates financial, organizational, and ideological incentives driving the narrative.',
          'The Historian places the phenomenon within repeating historical cycles of disruption and institutional adaptation.',
          'The Contrarian reveals high-value strategic opportunities created by questioning the prevailing consensus.'
        ],
        whatWouldStrengthen: [
          'Independent, peer-reviewed empirical studies demonstrating robust causal links across diverse sample groups.',
          'Consistent real-world policy or market validations outlasting initial novelty or pilot effects.'
        ],
        whatWouldWeaken: [
          'Replicated counter-trials indicating that the primary correlation disappears when controlling for key confounders.',
          'High-profile systemic failures or legal rulings that enforce heavy friction against the claim.'
        ]
      }
    };
  }

  /**
   * Applies an interactive challenge to an item within an investigation.
   * Produces a real-time ripple effect across dependent arguments, evidence,
   * graph nodes, and recalculates the final assessment verdict.
   */
  static applyChallenge(
    investigation: Investigation,
    targetItem: DeconstructionItem | EvidenceItem,
    actionType: ChallengeActionType,
    userCritique?: string
  ): Investigation {
    const isDeconstruction = 'verificationStatus' in targetItem;
    const targetStatement = isDeconstruction 
      ? (targetItem as DeconstructionItem).statement 
      : (targetItem as EvidenceItem).title;

    // Determine custom action prompt and ripple explanation based on actionType
    let actionPrompt = '';
    let rippleExplanation = '';
    let fromConf = investigation.assessment.currentConfidence;
    let toConf: ConfidenceLevel = 'INSUFFICIENT_EVIDENCE';

    switch (actionType) {
      case 'CHALLENGE_ASSUMPTION':
        actionPrompt = 'Challenge this foundational assumption';
        rippleExplanation = `By actively challenging "${targetStatement}", the core load-bearing foundation of the claim is destabilized. Arguments that treat this assumption as a settled fact lose their inferential validity, shifting the overall verdict from established probability to unverified conjecture.`;
        toConf = 'INSUFFICIENT_EVIDENCE';
        break;
      case 'WHAT_IF_WRONG':
        actionPrompt = 'What if this premise is completely wrong?';
        rippleExplanation = `Inverting the premise reveals that the claim\'s conclusion depends entirely on this single pivot. If it proves false or inverted, the expected outcome shifts 180 degrees, requiring an entirely different strategic response.`;
        toConf = fromConf === 'STRONGLY_SUPPORTED' ? 'PARTIALLY_SUPPORTED' : 'MIXED_EVIDENCE';
        break;
      case 'DISPROVE_EVIDENCE':
        actionPrompt = 'What evidence would directly disprove this?';
        rippleExplanation = `Identifying falsification criteria shows that current supporting data has not yet ruled out key confounders. The burden of proof shifts back to proponents to demonstrate resilience against this counter-hypothesis.`;
        toConf = 'MIXED_EVIDENCE';
        break;
      case 'ALTERNATIVE_EXPLANATION':
        actionPrompt = 'Show an alternative explanatory model';
        rippleExplanation = `Introducing a viable alternative explanation breaks the monopoly of the original narrative. When two distinct mechanisms can produce the identical observation, the claim can no longer be affirmed with high certainty.`;
        toConf = 'MIXED_EVIDENCE';
        break;
      case 'OVERLOOKED':
        actionPrompt = 'What critical variables are being overlooked?';
        rippleExplanation = `Surfacing overlooked systemic factors (such as human emotional resistance, second-order economic costs, and maintenance debt) reveals significant friction that current linear models ignore.`;
        toConf = 'PARTIALLY_SUPPORTED';
        break;
    }

    // Create the ActiveChallenge record
    const challengeId = makeId('chal');
    const newChallenge: ActiveChallenge = {
      id: challengeId,
      targetId: targetItem.id,
      targetStatement,
      actionType,
      actionPrompt,
      userCritique,
      rippleExplanation,
      affectedItemIds: [targetItem.id],
      affectedNodeIds: [],
      confidenceShift: {
        from: fromConf,
        to: toConf,
        rationale: rippleExplanation
      },
      timestamp: new Date().toISOString()
    };

    // Update the deconstruction item or evidence item
    const updatedDeconstruction = investigation.deconstruction.map((item) => {
      if (item.id === targetItem.id) {
        return {
          ...item,
          isChallenged: true,
          challengeImpact: rippleExplanation
        };
      }
      return item;
    });

    const updatedEvidence = investigation.evidence.map((ev) => {
      if (ev.id === targetItem.id) {
        return {
          ...ev,
          isChallenged: true
        };
      }
      return ev;
    });

    // Update knowledge graph nodes: mark target node as CHALLENGED, highlight affected
    const updatedGraphNodes = investigation.graphNodes.map((node) => {
      if (node.refId === targetItem.id) {
        newChallenge.affectedNodeIds.push(node.id);
        return {
          ...node,
          status: 'CHALLENGED' as const
        };
      }
      if (node.type === 'ASSESSMENT') {
        newChallenge.affectedNodeIds.push(node.id);
        return {
          ...node,
          status: 'HIGHLIGHTED' as const,
          label: `Updated Assessment: ${toConf.replace('_', ' ')} (Challenged)`
        };
      }
      return node;
    });

    // Recalculate Assessment
    const updatedAssessment = {
      ...investigation.assessment,
      currentConfidence: toConf,
      verdictTitle: `Challenged Analysis: Certainty Downgraded to ${toConf.replace('_', ' ')}`,
      executiveSummary: `${investigation.assessment.executiveSummary} \n\n[Active Challenge Applied]: Following an interactive challenge to "${targetStatement}", the inferential chain is significantly qualified. ${rippleExplanation}`
    };

    return {
      ...investigation,
      updatedAt: new Date().toISOString(),
      deconstruction: updatedDeconstruction,
      evidence: updatedEvidence,
      graphNodes: updatedGraphNodes,
      challenges: [newChallenge, ...investigation.challenges],
      assessment: updatedAssessment
    };
  }

  /**
   * Resets all applied challenges and restores baseline state
   */
  static resetChallenges(investigation: Investigation): Investigation {
    const updatedDeconstruction = investigation.deconstruction.map((item) => ({
      ...item,
      isChallenged: false,
      challengeImpact: undefined
    }));

    const updatedEvidence = investigation.evidence.map((ev) => ({
      ...ev,
      isChallenged: false
    }));

    const updatedGraphNodes = investigation.graphNodes.map((node) => ({
      ...node,
      status: 'NORMAL' as const,
      label: node.type === 'ASSESSMENT' 
        ? `Assessment: ${investigation.assessment.baselineConfidence.replace('_', ' ')}`
        : node.label
    }));

    const updatedAssessment = {
      ...investigation.assessment,
      currentConfidence: investigation.assessment.baselineConfidence,
      verdictTitle: investigation.assessment.verdictTitle.replace(/^Challenged Analysis: Certainty Downgraded to [A-Z_\s]+/, 'Baseline Assessment')
    };

    return {
      ...investigation,
      updatedAt: new Date().toISOString(),
      deconstruction: updatedDeconstruction,
      evidence: updatedEvidence,
      graphNodes: updatedGraphNodes,
      challenges: [],
      assessment: updatedAssessment
    };
  }

  /**
   * Appends user-created evidence to the investigation
   */
  static addCustomEvidence(
    investigation: Investigation,
    newEvidence: Omit<EvidenceItem, 'id' | 'isIllustrative' | 'isUserAdded'>
  ): Investigation {
    const evId = makeId('ev-user');
    const createdItem: EvidenceItem = {
      ...newEvidence,
      id: evId,
      isIllustrative: false,
      isUserAdded: true
    };

    // Add node to graph
    const isSupporting = createdItem.stance === 'SUPPORTING';
    const newNode: KnowledgeNode = {
      id: `node-${evId}`,
      label: createdItem.title.length > 40 ? `${createdItem.title.slice(0, 38)}...` : createdItem.title,
      type: isSupporting ? 'SUPPORT_EVIDENCE' : 'CHALLENGE_EVIDENCE',
      x: isSupporting ? 240 + Math.random() * 40 : 660 + Math.random() * 40,
      y: 360 + Math.random() * 30,
      status: 'NORMAL',
      refId: evId
    };

    const newEdge: KnowledgeEdge = {
      id: makeId('edge-user'),
      source: newNode.id,
      target: isSupporting ? 'node-claim' : 'node-assess',
      label: isSupporting ? 'User Supporting Evidence' : 'User Challenging Counter-Evidence',
      type: isSupporting ? 'SUPPORTS' : 'CHALLENGES'
    };

    return {
      ...investigation,
      updatedAt: new Date().toISOString(),
      evidence: [createdItem, ...investigation.evidence],
      graphNodes: [...investigation.graphNodes, newNode],
      graphEdges: [...investigation.graphEdges, newEdge]
    };
  }
}
