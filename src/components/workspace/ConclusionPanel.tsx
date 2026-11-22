import React from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  ShieldCheck, 
  Layers,
  Sparkles
} from 'lucide-react';
import { AssessmentData, ConfidenceLevel } from '../../types/echo';
import { Badge } from '../common/Badge';

interface ConclusionPanelProps {
  assessment: AssessmentData;
  activeChallengesCount: number;
}

export const ConclusionPanel: React.FC<ConclusionPanelProps> = ({
  assessment,
  activeChallengesCount
}) => {
  return (
    <div className="space-y-6">
      {/* Executive Verdict Banner */}
      <div className="rounded-2xl bg-echo-900/90 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Final Epistemic Synthesis & Verdict
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Assessed Certainty:</span>
              <Badge confidence={assessment.currentConfidence} />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
            {assessment.verdictTitle}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-echo-950/70 p-4 rounded-xl border border-slate-800/80 whitespace-pre-line font-normal">
            {assessment.executiveSummary}
          </p>
        </div>
      </div>

      {/* 2-Column Analytical Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Supported & Uncertainties */}
        <div className="space-y-6">
          {/* What Is Currently Supported */}
          <div className="p-5 rounded-2xl bg-echo-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider">
                What Is Currently Supported by Evidence
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {assessment.whatIsSupported.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-echo-950/50 p-3 rounded-lg border border-slate-800/60 leading-relaxed">
                  <span className="text-emerald-400 font-bold font-mono">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What Remains Uncertain */}
          <div className="p-5 rounded-2xl bg-echo-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <HelpCircle className="w-4 h-4" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider">
                What Remains Uncertain or Contested
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {assessment.whatRemainsUncertain.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-echo-950/50 p-3 rounded-lg border border-slate-800/60 leading-relaxed">
                  <span className="text-amber-400 font-bold font-mono">?</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Critical Assumptions That Matter Most */}
          <div className="p-5 rounded-2xl bg-echo-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-rose-400">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider">
                Load-Bearing Assumptions That Matter Most
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {assessment.criticalAssumptions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-echo-950/50 p-3 rounded-lg border border-slate-800/60 leading-relaxed">
                  <span className="text-rose-400 font-bold font-mono">!</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Missing Evidence, Perspectives, Strengthen/Weaken */}
        <div className="space-y-6">
          {/* Missing Evidence Gaps */}
          <div className="p-5 rounded-2xl bg-echo-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider">
                Critical Missing Evidence Gaps
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {assessment.missingEvidenceGaps.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-echo-950/50 p-3 rounded-lg border border-slate-800/60 leading-relaxed">
                  <span className="text-cyan-400 font-bold font-mono">🔍</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Perspective Shifts */}
          <div className="p-5 rounded-2xl bg-echo-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-violet-400">
              <Eye className="w-4 h-4" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider">
                How Missing Perspectives Shift the Narrative
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {assessment.perspectiveShifts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-echo-950/50 p-3 rounded-lg border border-slate-800/60 leading-relaxed">
                  <span className="text-violet-400 font-bold font-mono">👁</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Strengthen vs Weaken Dual Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] font-bold uppercase">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>What Would Strengthen</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                {assessment.whatWouldStrengthen.map((item, idx) => (
                  <li key={idx} className="leading-snug flex items-start gap-1">
                    <span className="text-emerald-400">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40 space-y-2">
              <div className="flex items-center gap-1.5 text-rose-400 font-mono text-[11px] font-bold uppercase">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>What Would Weaken</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                {assessment.whatWouldWeaken.map((item, idx) => (
                  <li key={idx} className="leading-snug flex items-start gap-1">
                    <span className="text-rose-400">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
