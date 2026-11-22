import { describe, it, expect } from 'vitest';
import { AnalysisEngine } from '../../services/analysisEngine';
import { PRELOADED_INVESTIGATIONS } from '../../data/preloadedInvestigations';

describe('AnalysisEngine', () => {
  describe('analyzeCustomClaim', () => {
    it('deconstructs custom technology claim into 4 distinct epistemic types', () => {
      const inv = AnalysisEngine.analyzeCustomClaim('AI coding assistants will replace junior developers.');
      expect(inv.id).toBeDefined();
      expect(inv.category).toBe('TECHNOLOGY');
      expect(inv.claim).toBe('AI coding assistants will replace junior developers.');
      
      // Deconstruction validation
      expect(inv.deconstruction).toHaveLength(4);
      const types = inv.deconstruction.map((d) => d.type);
      expect(types).toContain('FACT');
      expect(types).toContain('ASSUMPTION');
      expect(types).toContain('OPINION');
      expect(types).toContain('PREDICTION');
    });

    it('generates 5 analytical perspectives (Scientist, Skeptic, Historian, Humanist, Contrarian)', () => {
      const inv = AnalysisEngine.analyzeCustomClaim('Universal basic income will eliminate poverty.');
      expect(inv.perspectives).toHaveLength(5);
      const roles = inv.perspectives.map((p) => p.role);
      expect(roles).toEqual(['SCIENTIST', 'SKEPTIC', 'HISTORIAN', 'HUMANIST', 'CONTRARIAN']);
    });

    it('creates supporting and challenging evidence matrices with limitations', () => {
      const inv = AnalysisEngine.analyzeCustomClaim('Electric vehicles are carbon neutral.');
      expect(inv.evidence.length).toBeGreaterThanOrEqual(2);
      const stances = inv.evidence.map((e) => e.stance);
      expect(stances).toContain('SUPPORTING');
      expect(stances).toContain('CHALLENGING');
      
      inv.evidence.forEach((item) => {
        expect(item.reliabilityLimitations).toBeDefined();
        expect(item.provenance).toBeDefined();
        expect(item.isIllustrative).toBe(true);
      });
    });

    it('builds a connected knowledge graph topology', () => {
      const inv = AnalysisEngine.analyzeCustomClaim('Remote work increases employee productivity.');
      expect(inv.graphNodes.length).toBeGreaterThan(5);
      expect(inv.graphEdges.length).toBeGreaterThan(4);

      const claimNode = inv.graphNodes.find((n) => n.type === 'CLAIM');
      expect(claimNode).toBeDefined();

      const assessmentNode = inv.graphNodes.find((n) => n.type === 'ASSESSMENT');
      expect(assessmentNode).toBeDefined();
    });

    it('provides qualitative confidence rating without manufactured numbers', () => {
      const inv = AnalysisEngine.analyzeCustomClaim('Genetically modified crops cause health problems.');
      expect(['STRONGLY_SUPPORTED', 'PARTIALLY_SUPPORTED', 'MIXED_EVIDENCE', 'INSUFFICIENT_EVIDENCE', 'NOT_VERIFIABLE']).toContain(
        inv.assessment.currentConfidence
      );
    });
  });

  describe('applyChallenge', () => {
    it('applies interactive challenge probe and produces ripple effect', () => {
      const base = PRELOADED_INVESTIGATIONS[0]; // AI replace programmers
      const targetAssumption = base.deconstruction.find((d) => d.type === 'ASSUMPTION')!;

      const updated = AnalysisEngine.applyChallenge(
        base,
        targetAssumption,
        'CHALLENGE_ASSUMPTION',
        'In reality systems architecture requires human negotiation'
      );

      // Check active challenge added
      expect(updated.challenges.length).toBe(base.challenges.length + 1);
      const newest = updated.challenges[0];
      expect(newest.targetId).toBe(targetAssumption.id);
      expect(newest.rippleExplanation).toBeDefined();
      expect(newest.userCritique).toBe('In reality systems architecture requires human negotiation');

      // Check item marked as challenged
      const challengedItem = updated.deconstruction.find((d) => d.id === targetAssumption.id)!;
      expect(challengedItem.isChallenged).toBe(true);
      expect(challengedItem.challengeImpact).toBeDefined();

      // Check graph node status updated
      const node = updated.graphNodes.find((n) => n.refId === targetAssumption.id)!;
      expect(node.status).toBe('CHALLENGED');
    });
  });

  describe('resetChallenges', () => {
    it('restores baseline assessment state and clears all active challenges', () => {
      const base = PRELOADED_INVESTIGATIONS[0];
      const targetAssumption = base.deconstruction.find((d) => d.type === 'ASSUMPTION')!;
      const challenged = AnalysisEngine.applyChallenge(base, targetAssumption, 'WHAT_IF_WRONG');

      const reset = AnalysisEngine.resetChallenges(challenged);
      expect(reset.challenges).toHaveLength(0);
      expect(reset.deconstruction.every((d) => !d.isChallenged)).toBe(true);
      expect(reset.evidence.every((e) => !e.isChallenged)).toBe(true);
      expect(reset.graphNodes.every((n) => n.status === 'NORMAL')).toBe(true);
      expect(reset.assessment.currentConfidence).toBe(reset.assessment.baselineConfidence);
    });
  });

  describe('addCustomEvidence', () => {
    it('appends user custom evidence and updates graph nodes and edges', () => {
      const base = PRELOADED_INVESTIGATIONS[0];
      const initialEvidenceCount = base.evidence.length;
      const initialNodeCount = base.graphNodes.length;

      const updated = AnalysisEngine.addCustomEvidence(base, {
        title: 'Survey of 500 Enterprise CTOs on Code Verification Overhead',
        explanation: 'CTOs report code verification takes 2x longer when written by unvetted models.',
        evidenceType: 'EMPIRICAL',
        stance: 'CHALLENGING',
        provenance: 'Internal Tech Leader Survey Q4',
        reliabilityLimitations: 'Self-reported survey data.',
        relationshipToClaim: 'Directly proves verification bottleneck.',
        relevanceScore: 'HIGH'
      });

      expect(updated.evidence.length).toBe(initialEvidenceCount + 1);
      expect(updated.graphNodes.length).toBe(initialNodeCount + 1);
      const added = updated.evidence[0];
      expect(added.title).toBe('Survey of 500 Enterprise CTOs on Code Verification Overhead');
      expect(added.isUserAdded).toBe(true);
      expect(added.isIllustrative).toBe(false);
    });
  });
});
