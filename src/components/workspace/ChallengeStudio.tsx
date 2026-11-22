import React, { useState } from 'react';
import { 
  Zap, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle, 
  HelpCircle, 
  Layers, 
  TrendingDown, 
  ShieldAlert, 
  Sparkles,
  Split,
  MessageSquare
} from 'lucide-react';
import { 
  Investigation, 
  DeconstructionItem, 
  EvidenceItem, 
  ChallengeActionType, 
  ActiveChallenge 
} from '../../types/echo';
import { Badge } from '../common/Badge';

interface ChallengeStudioProps {
  investigation: Investigation;
  onApplyChallenge: (
    targetItem: DeconstructionItem | EvidenceItem,
    actionType: ChallengeActionType,
    userCritique?: string
  ) => void;
  onResetChallenges: () => void;
}

export const ChallengeStudio: React.FC<ChallengeStudioProps> = ({
  investigation,
  onApplyChallenge,
  onResetChallenges
}) => {
  const assumptions = investigation.deconstruction.filter((i) => i.type === 'ASSUMPTION');
  const allDeconstructs = investigation.deconstruction;

  const [selectedItemId, setSelectedItemId] = useState<string>(
    assumptions[0]?.id || allDeconstructs[0]?.id || ''
  );
  const [selectedAction, setSelectedAction] = useState<ChallengeActionType>('CHALLENGE_ASSUMPTION');
  const [customCritique, setCustomCritique] = useState<string>('');

  const selectedItem = allDeconstructs.find((i) => i.id === selectedItemId);

  const handleExecuteChallenge = () => {
    if (selectedItem) {
      onApplyChallenge(selectedItem, selectedAction, customCritique.trim() || undefined);
      setCustomCritique('');
    }
  };

  const actionOptions: Array<{ type: ChallengeActionType; label: string; desc: string }> = [
    {
      type: 'CHALLENGE_ASSUMPTION',
      label: 'Challenge This Assumption',
      desc: 'Target the unverified pillar. If the assumption fails, see how the entire conclusion is destabilized.'
    },
    {
      type: 'WHAT_IF_WRONG',
      label: 'What if this is wrong?',
      desc: 'Invert the underlying premise and model the inverted reality.'
    },
    {
      type: 'DISPROVE_EVIDENCE',
      label: 'What evidence would disprove this?',
      desc: 'Establish rigorous falsification criteria and demand proof against counter-hypotheses.'
    },
    {
      type: 'ALTERNATIVE_EXPLANATION',
      label: 'Show an alternative explanation',
      desc: 'Introduce competing causal mechanisms that account for the same observations.'
    },
    {
      type: 'OVERLOOKED',
      label: 'What am I overlooking?',
      desc: 'Expose systemic friction, institutional delays, and hidden maintenance debt.'
    }
  ];

  const activeChallenges = investigation.challenges;

  return (
    <div className="space-y-6">
      {/* Signature Feature Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/40 via-echo-900 to-violet-950/40 border border-amber-500/40 p-6 sm:p-8 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5" />
              <span>Signature Interactive Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Challenge a Claim Studio
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Arguments appear solid until you pull on their load-bearing assumptions.
              Select any premise below, launch an epistemic stress-test, and observe the live ripple effect across the assessment.
            </p>
          </div>

          {activeChallenges.length > 0 && (
            <button
              onClick={onResetChallenges}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold text-amber-200 bg-amber-950/80 border border-amber-600/50 hover:bg-amber-900 transition-colors shadow-lg shrink-0"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Reset All Challenges ({activeChallenges.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Selector & Configuration (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Step 1: Pick Premise to Target */}
          <div className="p-5 rounded-2xl bg-echo-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-[10px]">1</span>
                Select Load-Bearing Premise to Stress-Test
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                {allDeconstructs.length} components available
              </span>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {allDeconstructs.map((item) => {
                const isSelected = item.id === selectedItemId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-start gap-3 ${
                      isSelected
                        ? 'bg-echo-850 border-amber-500/80 ring-1 ring-amber-500/40 shadow-md'
                        : 'bg-echo-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <Badge type={item.type} size="sm" className="shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className={`font-medium leading-relaxed ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {item.statement}
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono block mt-1">
                        Status: {item.verificationStatus}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Choose Challenge Probe */}
          <div className="p-5 rounded-2xl bg-echo-900/80 border border-slate-800 space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-950 border border-amber-800 flex items-center justify-center text-[10px]">2</span>
              Select Challenge Probe Angle
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {actionOptions.map((opt) => {
                const isSelected = selectedAction === opt.type;
                return (
                  <button
                    key={opt.type}
                    onClick={() => setSelectedAction(opt.type)}
                    className={`p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-950/60 border-amber-500 text-amber-200 ring-1 ring-amber-500/50'
                        : 'bg-echo-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-white mb-1">{opt.label}</span>
                    <span className="text-[11px] text-slate-400 leading-normal">{opt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Optional Custom Critique & Execute */}
          <div className="p-5 rounded-2xl bg-echo-900/80 border border-slate-800 space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-violet-400 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-violet-950 border border-violet-800 flex items-center justify-center text-[10px]">3</span>
              Add Your Own Specific Counter-Argument (Optional)
            </span>

            <div className="relative">
              <textarea
                value={customCritique}
                onChange={(e) => setCustomCritique(e.target.value)}
                placeholder="E.g., In enterprise banking, regulatory audits and compliance frameworks require certified human sign-off that cannot be delegated to an AI in 24 months..."
                rows={3}
                className="w-full bg-echo-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <button
              onClick={handleExecuteChallenge}
              disabled={!selectedItem}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono text-xs font-bold text-echo-950 bg-gradient-to-r from-amber-400 via-amber-350 to-cyan-400 hover:from-amber-350 hover:to-cyan-300 transition-all duration-200 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] disabled:opacity-40"
            >
              <Zap className="w-4 h-4 fill-echo-950" />
              <span>Apply Challenge & Trigger Epistemic Ripple</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Live Ripple Effect & Comparison (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Side-by-Side Assessment Shift Comparison */}
          <div className="p-5 rounded-2xl bg-echo-900/90 border border-slate-800 space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Epistemic Assessment Delta</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* Baseline */}
              <div className="p-3.5 rounded-xl bg-echo-950 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
                  Original Baseline
                </span>
                <Badge confidence={investigation.assessment.baselineConfidence} size="sm" />
                <p className="text-[11px] text-slate-400 leading-relaxed mt-2">
                  Unchallenged initial assessment based on naive surface framing.
                </p>
              </div>

              {/* Challenged / Current */}
              <div className="p-3.5 rounded-xl bg-echo-950 border border-amber-500/50 space-y-2 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block font-bold">
                  Challenged State
                </span>
                <Badge confidence={investigation.assessment.currentConfidence} size="sm" />
                <p className="text-[11px] text-amber-200/90 leading-relaxed mt-2">
                  {activeChallenges.length > 0 
                    ? `Confidence shifted following ${activeChallenges.length} active challenge(s).` 
                    : 'Awaiting your challenge trigger.'}
                </p>
              </div>
            </div>

            {/* Ripple Log */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Active Epistemic Ripple Log ({activeChallenges.length})
              </h4>

              {activeChallenges.length === 0 ? (
                <div className="p-4 rounded-xl bg-echo-950/60 border border-dashed border-slate-800 text-center text-xs text-slate-500 font-mono">
                  No active challenges yet. Execute a challenge from the left to watch the arguments realign.
                </div>
              ) : (
                <div className="space-y-3">
                  {activeChallenges.map((chal, cIdx) => (
                    <div
                      key={chal.id}
                      className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-600/40 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                          Probe #{cIdx + 1}: {chal.actionType.replace(/_/g, ' ')}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {new Date(chal.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <div className="font-semibold text-white">
                        &ldquo;{chal.targetStatement}&rdquo;
                      </div>

                      <p className="text-[11px] text-amber-200/90 leading-relaxed bg-echo-950/60 p-2.5 rounded-lg border border-amber-800/30">
                        {chal.rippleExplanation}
                      </p>

                      {chal.userCritique && (
                        <div className="text-[11px] text-cyan-300 italic flex items-start gap-1.5 pt-1">
                          <MessageSquare className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>User note: {chal.userCritique}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
