import React, { useState } from 'react';
import { 
  Microscope, 
  ShieldAlert, 
  History, 
  HeartHandshake, 
  Flame, 
  HelpCircle, 
  Quote, 
  Search, 
  CheckCircle2, 
  GraduationCap,
  Sparkles,
  Layers
} from 'lucide-react';
import { PerspectiveItem } from '../../types/echo';

interface PerspectiveEngineProps {
  perspectives: PerspectiveItem[];
}

export const PerspectiveEngine: React.FC<PerspectiveEngineProps> = ({ perspectives }) => {
  const [activeId, setActiveId] = useState<string>(perspectives[0]?.id || '');

  const activePerspective = perspectives.find((p) => p.id === activeId) || perspectives[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Microscope':
        return <Microscope className="w-5 h-5" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5" />;
      case 'History':
        return <History className="w-5 h-5" />;
      case 'HeartHandshake':
      case 'Users':
        return <HeartHandshake className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Perspective Header Editorial */}
      <div className="p-4 rounded-xl bg-echo-900/60 border border-slate-800 text-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-violet-950/60 border border-violet-800/40 text-violet-400 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Missing Perspectives Engine</h3>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
              Most arguments appear convincing only because dissenting, historical, and human angles were excluded from the initial framing.
              ECHO subjects every claim to five distinct analytical lenses plus critical frontline stakeholder testimonies.
            </p>
          </div>
        </div>
      </div>

      {/* Perspective Selector Carousel / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {perspectives.map((p) => {
          const isActive = p.id === activePerspective?.id;
          return (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between h-24 ${
                isActive
                  ? 'bg-echo-850 border-cyan-500/80 shadow-[0_0_15px_rgba(6,182,212,0.2)] ring-1 ring-cyan-500/40'
                  : 'bg-echo-900/70 border-slate-800 hover:border-slate-700 hover:bg-echo-900'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className="p-1.5 rounded-lg border text-white"
                  style={{
                    backgroundColor: `${p.color}15`,
                    borderColor: `${p.color}40`,
                    color: p.color
                  }}
                >
                  {getIcon(p.icon)}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                  {p.role}
                </span>
              </div>
              <span className={`text-xs font-semibold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                {p.personaTitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Perspective Spotlight Dossier */}
      {activePerspective && (
        <div className="rounded-2xl bg-echo-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle colored glow behind card */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ backgroundColor: activePerspective.color }}
          ></div>

          <div className="relative space-y-6">
            {/* Header Badge & Title */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div
                  className="p-3 rounded-xl border flex items-center justify-center text-white"
                  style={{
                    backgroundColor: `${activePerspective.color}20`,
                    borderColor: `${activePerspective.color}50`,
                    color: activePerspective.color
                  }}
                >
                  {getIcon(activePerspective.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border font-semibold"
                      style={{
                        backgroundColor: `${activePerspective.color}15`,
                        borderColor: `${activePerspective.color}40`,
                        color: activePerspective.color
                      }}
                    >
                      {activePerspective.role} LENS
                    </span>
                    {activePerspective.isStakeholder && (
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                        Frontline Stakeholder
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {activePerspective.personaTitle}
                  </h3>
                </div>
              </div>

              {/* Guiding Question Pill */}
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
                  Core Analytical Angle
                </span>
                <span className="text-xs font-mono text-cyan-300">
                  {activePerspective.focusQuestion}
                </span>
              </div>
            </div>

            {/* Core Quote / Stance Callout */}
            <div className="relative p-4 rounded-xl bg-echo-950/80 border border-slate-800/80 flex items-start gap-3">
              <Quote className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base italic text-slate-200 font-serif leading-relaxed">
                &ldquo;{activePerspective.keyQuoteOrStance}&rdquo;
              </p>
            </div>

            {/* Two Column Deep Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-4">
                {/* What is Overlooked */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                    What the Original Claim Overlooks
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-echo-950/50 p-4 rounded-xl border border-slate-800/80">
                    {activePerspective.whatItOverlooks}
                  </p>
                </div>

                {/* Alternative Interpretation */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    Alternative Explanatory Model
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-echo-950/50 p-4 rounded-xl border border-slate-800/80">
                    {activePerspective.alternativeInterpretations}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Critical Interrogation Questions */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    Critical Interrogation Questions
                  </h4>
                  <div className="bg-echo-950/50 p-4 rounded-xl border border-slate-800/80 space-y-2.5">
                    {activePerspective.criticalQuestions.map((q, qIdx) => (
                      <div key={qIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="font-mono text-cyan-400 font-bold shrink-0">{qIdx + 1}.</span>
                        <span className="leading-relaxed">{q}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What Evidence Would Help */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Evidence Required to Test This Perspective
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-echo-950/50 p-4 rounded-xl border border-slate-800/80">
                    {activePerspective.requiredEvidence}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
