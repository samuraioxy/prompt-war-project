import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Layers, 
  Split, 
  Eye, 
  Share2, 
  FileText, 
  RotateCcw, 
  Zap, 
  GitGraph, 
  CheckCircle2, 
  Edit3, 
  Check, 
  X,
  History
} from 'lucide-react';
import { EchoLogo } from '../common/EchoLogo';
import { Badge } from '../common/Badge';
import { Investigation } from '../../types/echo';

export type WorkspaceTab = 
  | 'DECONSTRUCT' 
  | 'EVIDENCE' 
  | 'PERSPECTIVES' 
  | 'GRAPH' 
  | 'CHALLENGE' 
  | 'SYNTHESIS' 
  | 'REPORT';

interface InvestigationHeaderProps {
  investigation: Investigation;
  activeTab: WorkspaceTab;
  onTabChange: (tab: WorkspaceTab) => void;
  onBackToHome: () => void;
  onOpenHistory: () => void;
  onResetChallenges: () => void;
  onRenameClaim: (newTitle: string) => void;
}

export const InvestigationHeader: React.FC<InvestigationHeaderProps> = ({
  investigation,
  activeTab,
  onTabChange,
  onBackToHome,
  onOpenHistory,
  onResetChallenges,
  onRenameClaim
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleInput, setTitleInput] = useState(investigation.claim);

  const handleSaveRename = () => {
    if (titleInput.trim()) {
      onRenameClaim(titleInput.trim());
      setIsEditing(false);
    }
  };

  const handleCancelRename = () => {
    setTitleInput(investigation.claim);
    setIsEditing(false);
  };

  const activeChallengeCount = investigation.challenges.length;

  return (
    <header role="banner" className="sticky top-0 z-40 bg-echo-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between py-3 gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={onBackToHome}
              className="p-1.5 rounded-lg border border-slate-800 bg-echo-900 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none"
              aria-label="Return to Intelligence Workspace Home"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <EchoLogo size="sm" showText={false} />

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                  {investigation.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  ID: {investigation.id.slice(0, 12)}
                </span>
              </div>

              {isEditing ? (
                <div className="flex items-center gap-2 mt-1">
                  <label htmlFor="rename-claim-input" className="sr-only">
                    Rename claim statement
                  </label>
                  <input
                    id="rename-claim-input"
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    className="bg-echo-900 border border-cyan-500 rounded px-2 py-0.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 w-80 max-w-full font-semibold"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveRename}
                    className="p-1 text-emerald-400 hover:text-emerald-300 focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
                    aria-label="Save new claim name"
                  >
                    <Check className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    onClick={handleCancelRename}
                    className="p-1 text-rose-400 hover:text-rose-300 focus-visible:ring-2 focus-visible:ring-rose-400 focus:outline-none"
                    aria-label="Cancel rename"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 group mt-0.5">
                  <h1 className="text-sm sm:text-base font-bold text-white truncate max-w-md sm:max-w-xl group-hover:text-cyan-300 transition-colors">
                    &ldquo;{investigation.claim}&rdquo;
                  </h1>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-cyan-400 transition-opacity focus:opacity-100 focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none"
                    aria-label="Rename Investigation"
                  >
                    <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2.5 shrink-0">
            {activeChallengeCount > 0 && (
              <button
                onClick={onResetChallenges}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-amber-300 bg-amber-950/60 border border-amber-600/40 hover:bg-amber-900/60 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none"
                aria-label={`Reset all ${activeChallengeCount} applied challenges back to baseline`}
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                <span>Reset Challenges ({activeChallengeCount})</span>
              </button>
            )}

            <button
              onClick={onOpenHistory}
              aria-label="Open Investigation History"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-echo-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none"
            >
              <History className="w-3.5 h-3.5 text-violet-400" aria-hidden="true" />
              <span className="hidden md:inline">History</span>
            </button>

            <button
              onClick={() => onTabChange('REPORT')}
              aria-label="Open Intelligence Dossier Report"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 bg-cyan-950/50 border border-cyan-500/40 hover:bg-cyan-900/60 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.15)] focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
              <span>Dossier Report</span>
            </button>
          </div>
        </div>

        {/* Status Strip & Tabs Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1 pt-1 border-t border-slate-900 gap-2">
          {/* Tabs */}
          <nav role="tablist" aria-label="Investigation Analysis Sections" className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none text-xs font-mono">
            <button
              role="tab"
              aria-selected={activeTab === 'DECONSTRUCT'}
              onClick={() => onTabChange('DECONSTRUCT')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none ${
                activeTab === 'DECONSTRUCT'
                  ? 'bg-echo-800 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-echo-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Deconstruct ({investigation.deconstruction.length})</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'EVIDENCE'}
              onClick={() => onTabChange('EVIDENCE')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none ${
                activeTab === 'EVIDENCE'
                  ? 'bg-echo-800 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-echo-900'
              }`}
            >
              <Split className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Evidence Matrix ({investigation.evidence.length})</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'PERSPECTIVES'}
              onClick={() => onTabChange('PERSPECTIVES')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none ${
                activeTab === 'PERSPECTIVES'
                  ? 'bg-echo-800 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-echo-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Missing Perspectives ({investigation.perspectives.length})</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'GRAPH'}
              onClick={() => onTabChange('GRAPH')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none ${
                activeTab === 'GRAPH'
                  ? 'bg-echo-800 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-echo-900'
              }`}
            >
              <GitGraph className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Knowledge Graph</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'CHALLENGE'}
              onClick={() => onTabChange('CHALLENGE')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap relative focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none ${
                activeTab === 'CHALLENGE'
                  ? 'bg-gradient-to-r from-amber-950/80 to-violet-950/80 text-amber-300 border border-amber-500/50 font-semibold shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                  : 'text-amber-400 hover:text-amber-300 hover:bg-echo-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              <span>Challenge Studio</span>
              {activeChallengeCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" aria-hidden="true"></span>
              )}
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'SYNTHESIS'}
              onClick={() => onTabChange('SYNTHESIS')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none ${
                activeTab === 'SYNTHESIS'
                  ? 'bg-echo-800 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-echo-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Synthesis & Verdict</span>
            </button>
          </nav>

          {/* Current Qualitative Confidence Badge */}
          <div className="flex items-center gap-2 pb-1 sm:pb-0">
            <span className="text-[11px] font-mono text-slate-500 hidden lg:inline">
              Assessed Certainty:
            </span>
            <Badge confidence={investigation.assessment.currentConfidence} size="sm" />
          </div>
        </div>
      </div>
    </header>
  );
};
