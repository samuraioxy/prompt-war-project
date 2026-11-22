import React from 'react';
import { 
  DeconstructionType, 
  VerificationStatus, 
  ConfidenceLevel, 
  EvidenceType,
  EvidenceStance 
} from '../../types/echo';

interface BadgeProps {
  type?: DeconstructionType;
  verification?: VerificationStatus;
  confidence?: ConfidenceLevel;
  evidenceType?: EvidenceType;
  stance?: EvidenceStance;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  type,
  verification,
  confidence,
  evidenceType,
  stance,
  className = '',
  size = 'md'
}) => {
  const pad = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  if (type) {
    const config = {
      FACT: {
        label: 'FACT',
        classes: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.15)]',
        indicator: 'bg-emerald-400'
      },
      ASSUMPTION: {
        label: 'ASSUMPTION',
        classes: 'bg-amber-950/60 text-amber-300 border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.15)]',
        indicator: 'bg-amber-400'
      },
      OPINION: {
        label: 'OPINION',
        classes: 'bg-violet-950/60 text-violet-300 border-violet-500/40 shadow-[0_0_10px_rgba(139,92,246,0.15)]',
        indicator: 'bg-violet-400'
      },
      PREDICTION: {
        label: 'PREDICTION',
        classes: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.15)]',
        indicator: 'bg-cyan-400'
      }
    }[type];

    return (
      <span className={`inline-flex items-center gap-1.5 font-mono font-semibold tracking-wider rounded-md border ${config.classes} ${pad} ${className}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${config.indicator}`}></span>
        {config.label}
      </span>
    );
  }

  if (verification) {
    const config = {
      SUPPORTED: {
        label: 'Supported by Evidence',
        classes: 'bg-emerald-900/40 text-emerald-200 border-emerald-700/50'
      },
      CONTRADICTED: {
        label: 'Contradicted by Evidence',
        classes: 'bg-rose-900/40 text-rose-200 border-rose-700/50'
      },
      UNVERIFIED: {
        label: 'Unverified Assumption',
        classes: 'bg-amber-900/40 text-amber-200 border-amber-700/50'
      },
      INTERPRETATION: {
        label: 'Interpretation / Value Judgment',
        classes: 'bg-violet-900/40 text-violet-200 border-violet-700/50'
      },
      PREDICTION: {
        label: 'Future Forecast',
        classes: 'bg-cyan-900/40 text-cyan-200 border-cyan-700/50'
      }
    }[verification];

    return (
      <span className={`inline-flex items-center font-medium rounded-full border ${config.classes} ${pad} ${className}`}>
        {config.label}
      </span>
    );
  }

  if (confidence) {
    const config = {
      STRONGLY_SUPPORTED: {
        label: 'Strongly Supported by Available Evidence',
        classes: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]',
        dot: 'bg-emerald-400'
      },
      PARTIALLY_SUPPORTED: {
        label: 'Partially Supported With Caveats',
        classes: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]',
        dot: 'bg-cyan-400'
      },
      MIXED_EVIDENCE: {
        label: 'Mixed Evidence / Competing Drivers',
        classes: 'bg-amber-950/80 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]',
        dot: 'bg-amber-400'
      },
      INSUFFICIENT_EVIDENCE: {
        label: 'Insufficient Evidence / High Uncertainty',
        classes: 'bg-rose-950/80 text-rose-300 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.2)]',
        dot: 'bg-rose-400'
      },
      NOT_VERIFIABLE: {
        label: 'Not Currently Verifiable',
        classes: 'bg-slate-900/80 text-slate-300 border-slate-700 shadow-[0_0_15px_rgba(148,163,184,0.1)]',
        dot: 'bg-slate-400'
      }
    }[confidence];

    return (
      <span className={`inline-flex items-center gap-2 font-mono font-medium rounded-md border ${config.classes} ${pad} ${className}`}>
        <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`}></span>
        {config.label}
      </span>
    );
  }

  if (stance) {
    const isSupport = stance === 'SUPPORTING';
    return (
      <span className={`inline-flex items-center gap-1.5 font-mono font-semibold uppercase tracking-wider rounded border ${pad} ${
        isSupport 
          ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40' 
          : 'bg-rose-950/50 text-rose-300 border-rose-500/40'
      } ${className}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${isSupport ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
        {isSupport ? 'Supporting' : 'Challenging'}
      </span>
    );
  }

  if (evidenceType) {
    return (
      <span className={`inline-flex items-center font-mono text-[11px] uppercase tracking-wider rounded border bg-slate-900/60 text-slate-300 border-slate-700/60 ${pad} ${className}`}>
        {evidenceType}
      </span>
    );
  }

  return null;
};
