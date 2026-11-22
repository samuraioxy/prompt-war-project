import React, { useState } from 'react';
import { X, Plus, ShieldCheck, AlertCircle } from 'lucide-react';
import { EvidenceItem, EvidenceType, EvidenceStance } from '../../types/echo';

interface AddEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newEvidence: Omit<EvidenceItem, 'id' | 'isIllustrative' | 'isUserAdded'>) => void;
}

export const AddEvidenceModal: React.FC<AddEvidenceModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [title, setTitle] = useState('');
  const [explanation, setExplanation] = useState('');
  const [evidenceType, setEvidenceType] = useState<EvidenceType>('EMPIRICAL');
  const [stance, setStance] = useState<EvidenceStance>('SUPPORTING');
  const [provenance, setProvenance] = useState('');
  const [limitations, setLimitations] = useState('');
  const [relationship, setRelationship] = useState('');
  const [relevance, setRelevance] = useState<'HIGH' | 'MEDIUM' | 'CONTEXTUAL'>('HIGH');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !explanation.trim()) return;

    onAdd({
      title: title.trim(),
      explanation: explanation.trim(),
      evidenceType,
      stance,
      provenance: provenance.trim() || 'User-contributed empirical observation',
      reliabilityLimitations: limitations.trim() || 'User-provided qualitative input; requires independent verification.',
      relationshipToClaim: relationship.trim() || 'Directly addresses the validity of the core assertion.',
      relevanceScore: relevance
    });

    // Reset
    setTitle('');
    setExplanation('');
    setProvenance('');
    setLimitations('');
    setRelationship('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-echo-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/40">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Add Custom Evidence Item</h3>
              <p className="text-xs text-slate-400 font-mono">
                Integrate external observations, user telemetry, or verified field notes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-echo-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          {/* Stance Toggle & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[11px]">
                Evidence Stance *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStance('SUPPORTING')}
                  className={`py-2 px-3 rounded-lg border text-center transition-all ${
                    stance === 'SUPPORTING'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500 font-bold'
                      : 'bg-echo-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Supporting
                </button>
                <button
                  type="button"
                  onClick={() => setStance('CHALLENGING')}
                  className={`py-2 px-3 rounded-lg border text-center transition-all ${
                    stance === 'CHALLENGING'
                      ? 'bg-rose-950 text-rose-300 border-rose-500 font-bold'
                      : 'bg-echo-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Challenging
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[11px]">
                Evidence Methodology Type *
              </label>
              <select
                value={evidenceType}
                onChange={(e) => setEvidenceType(e.target.value as EvidenceType)}
                className="w-full bg-echo-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="EMPIRICAL">Empirical (Benchmark/Trial)</option>
                <option value="STATISTICAL">Statistical (Survey/Cohort)</option>
                <option value="THEORETICAL">Theoretical (Formal Model)</option>
                <option value="OBSERVATIONAL">Observational (Field Study)</option>
                <option value="HISTORICAL">Historical (Precedent)</option>
                <option value="ANECDOTAL">Anecdotal (Single Case)</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[11px]">
              Evidence Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Production Outage Telemetry Across Autonomous Commits"
              className="w-full bg-echo-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[11px]">
              Detailed Explanation of Findings *
            </label>
            <textarea
              required
              rows={3}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Describe what was measured, the sample size, or the specific mechanism observed..."
              className="w-full bg-echo-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Provenance & Limitations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[11px]">
                Source / Provenance Description
              </label>
              <input
                type="text"
                value={provenance}
                onChange={(e) => setProvenance(e.target.value)}
                placeholder="E.g., Internal developer velocity audit Q3 2026"
                className="w-full bg-echo-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[11px]">
                Reliability Limitations / Biases
              </label>
              <input
                type="text"
                value={limitations}
                onChange={(e) => setLimitations(e.target.value)}
                placeholder="E.g., Sample limited to seed-stage startups"
                className="w-full bg-echo-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-echo-950 border border-slate-800 text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-350 text-echo-950 font-bold hover:from-cyan-350 hover:to-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.3)]"
            >
              Add to Evidence Matrix
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
