import React, { useState } from 'react';
import { 
  Plus, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Filter, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  Info
} from 'lucide-react';
import { EvidenceItem, EvidenceStance, EvidenceType } from '../../types/echo';
import { Badge } from '../common/Badge';

interface EvidenceExplorerProps {
  evidence: EvidenceItem[];
  onOpenAddEvidence: () => void;
  onChallengeEvidence: (item: EvidenceItem) => void;
}

export const EvidenceExplorer: React.FC<EvidenceExplorerProps> = ({
  evidence,
  onOpenAddEvidence,
  onChallengeEvidence
}) => {
  const [stanceFilter, setStanceFilter] = useState<EvidenceStance | 'ALL'>('ALL');
  const [typeFilter, setTypeFilter] = useState<EvidenceType | 'ALL'>('ALL');

  const filtered = evidence.filter((ev) => {
    if (stanceFilter !== 'ALL' && ev.stance !== stanceFilter) return false;
    if (typeFilter !== 'ALL' && ev.evidenceType !== typeFilter) return false;
    return true;
  });

  const supportingItems = filtered.filter((ev) => ev.stance === 'SUPPORTING');
  const challengingItems = filtered.filter((ev) => ev.stance === 'CHALLENGING');

  return (
    <div className="space-y-6">
      {/* Editorial Transparency Callout */}
      <div className="p-4 rounded-xl bg-echo-900/60 border border-slate-800 text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Evidence Integrity & Provenance</h3>
            <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
              ECHO strictly distinguishes verified facts from illustrative benchmark simulations. No fabricated citations or faux-scientific certainty.
              Add your own verified sources or challenge existing telemetry below.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAddEvidence}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold text-echo-950 bg-gradient-to-r from-cyan-400 to-cyan-350 hover:from-cyan-350 hover:to-cyan-300 transition-all shadow-[0_0_12px_rgba(0,242,254,0.25)] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Evidence</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-slate-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Stance:
          </span>
          <button
            onClick={() => setStanceFilter('ALL')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              stanceFilter === 'ALL'
                ? 'bg-slate-700 text-white font-semibold'
                : 'bg-echo-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Evidence ({evidence.length})
          </button>
          <button
            onClick={() => setStanceFilter('SUPPORTING')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              stanceFilter === 'SUPPORTING'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50 font-semibold'
                : 'bg-echo-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Supporting ({evidence.filter((e) => e.stance === 'SUPPORTING').length})
          </button>
          <button
            onClick={() => setStanceFilter('CHALLENGING')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              stanceFilter === 'CHALLENGING'
                ? 'bg-rose-950 text-rose-300 border border-rose-500/50 font-semibold'
                : 'bg-echo-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Challenging ({evidence.filter((e) => e.stance === 'CHALLENGING').length})
          </button>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Showing {filtered.length} evidence indicators
        </div>
      </div>

      {/* Two Column Side-by-Side Matrix (Supporting vs Challenging) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supporting Evidence Column */}
        {(stanceFilter === 'ALL' || stanceFilter === 'SUPPORTING') && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-900/40">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <h3 className="font-mono text-xs font-bold tracking-wider text-emerald-300 uppercase">
                Supporting Evidence ({supportingItems.length})
              </h3>
            </div>

            {supportingItems.length === 0 ? (
              <div className="p-6 rounded-xl bg-echo-900/30 border border-slate-800 text-center text-slate-500 text-xs font-mono">
                No supporting evidence matching current filter.
              </div>
            ) : (
              supportingItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl bg-echo-900/80 border border-emerald-950/80 hover:border-emerald-600/50 p-5 space-y-3 transition-all duration-200 shadow-[0_0_15px_rgba(16,185,129,0.03)]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Badge stance={item.stance} size="sm" />
                      <Badge evidenceType={item.evidenceType} size="sm" />
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-echo-950 text-slate-400 border border-slate-800">
                      Relevance: {item.relevanceScore}
                    </span>
                  </div>

                  <h4 className="text-base font-semibold text-white leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.explanation}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 space-y-2 text-xs">
                    <div>
                      <span className="font-mono text-slate-400 text-[11px] block">
                        Provenance & Citation Status:
                      </span>
                      <span className="text-slate-300 font-mono text-[11px] flex items-center gap-1.5 mt-0.5">
                        {item.isIllustrative ? (
                          <span className="px-1.5 py-0.2 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40 text-[10px]">
                            Illustrative Benchmark
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40 text-[10px]">
                            User-Verified Source
                          </span>
                        )}
                        <span className="truncate">{item.provenance}</span>
                      </span>
                    </div>

                    <div className="bg-echo-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      <span className="font-mono text-amber-400/90 text-[11px] block font-semibold mb-0.5">
                        Reliability Limitations & Blindspots:
                      </span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {item.reliabilityLimitations}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-slate-500 text-[10px] block">
                        Relationship to Claim:
                      </span>
                      <p className="text-slate-400 text-[11px] italic">
                        {item.relationshipToClaim}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Challenging Evidence Column */}
        {(stanceFilter === 'ALL' || stanceFilter === 'CHALLENGING') && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-rose-900/40">
              <XCircle className="w-4 h-4 text-rose-400" />
              <h3 className="font-mono text-xs font-bold tracking-wider text-rose-300 uppercase">
                Challenging Evidence & Friction Points ({challengingItems.length})
              </h3>
            </div>

            {challengingItems.length === 0 ? (
              <div className="p-6 rounded-xl bg-echo-900/30 border border-slate-800 text-center text-slate-500 text-xs font-mono">
                No challenging evidence matching current filter.
              </div>
            ) : (
              challengingItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl bg-echo-900/80 border border-rose-950/80 hover:border-rose-600/50 p-5 space-y-3 transition-all duration-200 shadow-[0_0_15px_rgba(244,63,94,0.03)]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Badge stance={item.stance} size="sm" />
                      <Badge evidenceType={item.evidenceType} size="sm" />
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-echo-950 text-slate-400 border border-slate-800">
                      Relevance: {item.relevanceScore}
                    </span>
                  </div>

                  <h4 className="text-base font-semibold text-white leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.explanation}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 space-y-2 text-xs">
                    <div>
                      <span className="font-mono text-slate-400 text-[11px] block">
                        Provenance & Citation Status:
                      </span>
                      <span className="text-slate-300 font-mono text-[11px] flex items-center gap-1.5 mt-0.5">
                        {item.isIllustrative ? (
                          <span className="px-1.5 py-0.2 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40 text-[10px]">
                            Illustrative Counterpoint
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40 text-[10px]">
                            User-Verified Source
                          </span>
                        )}
                        <span className="truncate">{item.provenance}</span>
                      </span>
                    </div>

                    <div className="bg-echo-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      <span className="font-mono text-rose-400/90 text-[11px] block font-semibold mb-0.5">
                        Counter-Implication for the Claim:
                      </span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {item.reliabilityLimitations}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-slate-500 text-[10px] block">
                        Relationship to Claim:
                      </span>
                      <p className="text-slate-400 text-[11px] italic">
                        {item.relationshipToClaim}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
