import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Split, 
  Eye, 
  Zap, 
  Clock, 
  History,
  ShieldCheck,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { EchoLogo } from '../common/EchoLogo';
import { Investigation } from '../../types/echo';

interface EchoLandingProps {
  onSelectInvestigation: (inv: Investigation) => void;
  onCustomClaimSubmit: (claim: string) => void;
  recentInvestigations: Investigation[];
  preloadedList: Investigation[];
}

export const EchoLanding: React.FC<EchoLandingProps> = ({
  onSelectInvestigation,
  onCustomClaimSubmit,
  recentInvestigations,
  preloadedList
}) => {
  const [claimInput, setClaimInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (claimInput.trim()) {
      onCustomClaimSubmit(claimInput.trim());
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Decorative Grid and Radar Radial */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-violet-600/5 rounded-full blur-2xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-40"></div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-6 mb-12">
        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>AI-Assisted Critical Thinking & Evidence Intelligence</span>
        </div>

        <EchoLogo size="xl" className="mb-4" />

        <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl">
          See Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">the Answer</span>.
        </h1>

        <p className="mt-4 text-xl sm:text-2xl text-slate-300 font-light max-w-2xl italic tracking-wide">
          &ldquo;Don't just show me what happened. Show me what I'm missing.&rdquo;
        </p>

        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl font-normal leading-relaxed">
          ECHO dissects bold assertions into verifiable facts, hidden assumptions, opinions, and predictions.
          Stress-test arguments, reveal suppressed perspectives, and watch how challenging one assumption changes the entire conclusion.
        </p>

        {/* Claim Input Interface */}
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mt-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-violet-600/30 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative flex items-center bg-echo-900 border border-slate-700/80 rounded-xl p-2 shadow-2xl focus-within:border-cyan-400/80 transition-colors">
              <div className="pl-3 pr-2 text-slate-400">
                <Search className="w-5 h-5 text-cyan-400" />
              </div>
              <input
                type="text"
                value={claimInput}
                onChange={(e) => setClaimInput(e.target.value)}
                placeholder="Enter any claim, headline, or workplace assertion to investigate..."
                className="w-full bg-transparent text-white placeholder-slate-500 text-base sm:text-lg focus:outline-none px-2 py-2"
              />
              <button
                type="submit"
                disabled={!claimInput.trim()}
                className="ml-2 inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-sm text-echo-950 bg-gradient-to-r from-cyan-400 to-cyan-350 hover:from-cyan-350 hover:to-cyan-300 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:shadow-[0_0_20px_rgba(0,242,254,0.5)] font-mono font-semibold"
              >
                <span>Investigate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 font-mono px-2">
            <span>Press Enter to launch local intelligence deconstruction</span>
            <span>Deterministic • Offline-Ready • Zero External API Keys</span>
          </div>
        </form>
      </div>

      {/* Preloaded Example Investigations Section */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-mono uppercase tracking-widest text-slate-300">
              Curated Master Investigations
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Click to launch deep intelligence dossier
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {preloadedList.map((inv) => {
            const isFlagship = inv.id === 'ai-replace-programmers';
            return (
              <div
                key={inv.id}
                onClick={() => onSelectInvestigation(inv)}
                className={`relative group cursor-pointer rounded-xl p-5 border transition-all duration-300 ${
                  isFlagship
                    ? 'bg-gradient-to-br from-echo-850 via-echo-900 to-echo-950 border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.1)] hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]'
                    : 'bg-echo-900/80 border-slate-800 hover:border-slate-700 hover:bg-echo-850/80'
                }`}
              >
                {isFlagship && (
                  <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-[10px] font-mono font-bold text-white tracking-widest uppercase shadow-md">
                    Featured Deep Showcase
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase mb-2 border border-slate-700 text-slate-400">
                      {inv.category}
                    </span>
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      &ldquo;{inv.claim}&rdquo;
                    </h3>
                    <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {inv.contextSummary}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-emerald-400/90">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {inv.deconstruction.length} Components
                    </span>
                    <span className="flex items-center gap-1 text-cyan-400/90">
                      <Split className="w-3.5 h-3.5" />
                      {inv.evidence.length} Evidence Items
                    </span>
                    <span className="flex items-center gap-1 text-violet-400/90">
                      <Eye className="w-3.5 h-3.5" />
                      {inv.perspectives.length} Perspectives
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-cyan-400 group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Investigations History Drawer preview */}
      {recentInvestigations.length > 0 && (
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <History className="w-4 h-4 text-violet-400" />
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Recent Workspace Investigations
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentInvestigations.slice(0, 4).map((r) => (
              <button
                key={r.id}
                onClick={() => onSelectInvestigation(r)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-echo-900 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-white transition-colors"
              >
                <Clock className="w-3 h-3 text-slate-500" />
                <span className="max-w-[240px] truncate">{r.claim}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4-Pillar Critical Thinking Architecture Explanation */}
      <div className="mt-6 pt-10 border-t border-slate-800/80">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-white tracking-tight">
            How ECHO Transforms Information Consumption
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl mx-auto">
            The objective is not to tell you what to think. The objective is to help you think with structural clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-echo-900/60 border border-slate-800 rounded-xl p-5 hover:border-cyan-500/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-sm mb-1">1. Deconstruct Claim Anatomy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Separates what can be empirically verified (Facts) from what is taken for granted (Assumptions), value judgments (Opinions), and future projections (Predictions).
            </p>
          </div>

          <div className="bg-echo-900/60 border border-slate-800 rounded-xl p-5 hover:border-cyan-500/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
              <Split className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-sm mb-1">2. Evidence Matrix</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Examines supporting indicators alongside rigorous counter-evidence and systemic friction points, clearly identifying unverified claims without inventing citations.
            </p>
          </div>

          <div className="bg-echo-900/60 border border-slate-800 rounded-xl p-5 hover:border-cyan-500/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-violet-950/60 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-3">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-sm mb-1">3. Missing Perspectives</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Engages five distinct analytical lenses: The Scientist (falsifiability), The Skeptic (incentives), The Historian (precedents), The Humanist (ethics), and The Contrarian (inversions).
            </p>
          </div>

          <div className="bg-echo-900/60 border border-slate-800 rounded-xl p-5 hover:border-cyan-500/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-sm mb-1">4. Challenge & Ripple</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The signature feature: Stress-test any individual assumption and witness how dependent arguments, graph nodes, and the final verdict shift in real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
