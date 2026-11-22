import React, { useState } from 'react';
import { 
  Filter, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Info,
  ShieldAlert
} from 'lucide-react';
import { DeconstructionItem, DeconstructionType, VerificationStatus } from '../../types/echo';
import { Badge } from '../common/Badge';

interface ClaimDeconstructorProps {
  items: DeconstructionItem[];
  onTriggerChallenge: (item: DeconstructionItem) => void;
}

export const ClaimDeconstructor: React.FC<ClaimDeconstructorProps> = ({
  items,
  onTriggerChallenge
}) => {
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<DeconstructionType | 'ALL'>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id || null);

  const filteredItems = items.filter((item) => {
    if (selectedTypeFilter === 'ALL') return true;
    return item.type === selectedTypeFilter;
  });

  const countByType = {
    FACT: items.filter((i) => i.type === 'FACT').length,
    ASSUMPTION: items.filter((i) => i.type === 'ASSUMPTION').length,
    OPINION: items.filter((i) => i.type === 'OPINION').length,
    PREDICTION: items.filter((i) => i.type === 'PREDICTION').length,
  };

  return (
    <div className="space-y-6">
      {/* Editorial Overview Banner */}
      <div className="p-4 rounded-xl bg-echo-900/60 border border-slate-800 text-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Anatomy of the Argument</h3>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
              Every complex claim is built from a mixture of checkable facts, unstated assumptions, value-laden opinions, and future predictions.
              ECHO maps these distinct epistemic layers to prevent conflating correlation with causation, or speculation with proof.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
          <span className="text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>

          <button
            onClick={() => setSelectedTypeFilter('ALL')}
            className={`px-3 py-1 rounded-md transition-colors ${
              selectedTypeFilter === 'ALL'
                ? 'bg-slate-700 text-white font-semibold'
                : 'bg-echo-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Components ({items.length})
          </button>

          <button
            onClick={() => setSelectedTypeFilter('FACT')}
            className={`px-3 py-1 rounded-md transition-colors ${
              selectedTypeFilter === 'FACT'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50 font-semibold'
                : 'bg-echo-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Facts ({countByType.FACT})
          </button>

          <button
            onClick={() => setSelectedTypeFilter('ASSUMPTION')}
            className={`px-3 py-1 rounded-md transition-colors ${
              selectedTypeFilter === 'ASSUMPTION'
                ? 'bg-amber-950 text-amber-300 border border-amber-500/50 font-semibold'
                : 'bg-echo-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Assumptions ({countByType.ASSUMPTION})
          </button>

          <button
            onClick={() => setSelectedTypeFilter('OPINION')}
            className={`px-3 py-1 rounded-md transition-colors ${
              selectedTypeFilter === 'OPINION'
                ? 'bg-violet-950 text-violet-300 border border-violet-500/50 font-semibold'
                : 'bg-echo-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Opinions ({countByType.OPINION})
          </button>

          <button
            onClick={() => setSelectedTypeFilter('PREDICTION')}
            className={`px-3 py-1 rounded-md transition-colors ${
              selectedTypeFilter === 'PREDICTION'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-semibold'
                : 'bg-echo-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Predictions ({countByType.PREDICTION})
          </button>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Showing {filteredItems.length} of {items.length} items
        </div>
      </div>

      {/* Deconstruction Cards Stack */}
      <div className="space-y-4">
        {filteredItems.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          const isChallenged = item.isChallenged;

          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all duration-300 ${
                isChallenged
                  ? 'bg-echo-900/90 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/30'
                  : 'bg-echo-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Header / Primary Statement */}
              <div className="p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Badge type={item.type} />
                    <Badge verification={item.verificationStatus} size="sm" />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onTriggerChallenge(item)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-semibold transition-all ${
                        isChallenged
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-500/60 hover:bg-amber-900'
                          : 'bg-echo-800 text-slate-300 border border-slate-700 hover:text-amber-300 hover:border-amber-500/50'
                      }`}
                    >
                      <Zap className={`w-3.5 h-3.5 ${isChallenged ? 'text-amber-400' : 'text-slate-400'}`} />
                      <span>{isChallenged ? 'Challenged (Review Ripple)' : 'Challenge This'}</span>
                    </button>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="p-1 text-slate-400 hover:text-white transition-colors"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <p className="text-base sm:text-lg font-medium text-white leading-relaxed">
                  {item.statement}
                </p>

                {/* If active challenge exists, show ripple callout */}
                {isChallenged && item.challengeImpact && (
                  <div className="mt-3.5 p-3 rounded-lg bg-amber-950/40 border border-amber-600/30 text-xs font-mono text-amber-200 flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold uppercase tracking-wider text-amber-300">Active Challenge Impact: </span>
                      {item.challengeImpact}
                    </div>
                  </div>
                )}
              </div>

              {/* Collapsible Deep Analytical Details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-3 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-3">
                    <div>
                      <span className="font-mono text-slate-400 uppercase tracking-wider block mb-1">
                        Detailed Explanation
                      </span>
                      <p className="text-slate-300 leading-relaxed bg-echo-950/60 p-3 rounded-lg border border-slate-800">
                        {item.explanation}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-slate-400 uppercase tracking-wider block mb-1">
                        Why It Matters
                      </span>
                      <p className="text-slate-300 leading-relaxed bg-echo-950/60 p-3 rounded-lg border border-slate-800">
                        {item.whyItMatters}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="font-mono text-slate-400 uppercase tracking-wider block mb-1">
                        What Evidence Is Needed to Verify
                      </span>
                      <p className="text-slate-300 leading-relaxed bg-echo-950/60 p-3 rounded-lg border border-slate-800">
                        {item.neededEvidence}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-slate-400 uppercase tracking-wider block mb-1">
                        Potential Vulnerabilities & Weaknesses
                      </span>
                      <p className="text-slate-300 leading-relaxed bg-echo-950/60 p-3 rounded-lg border border-slate-800">
                        {item.potentialWeaknesses}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
