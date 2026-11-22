import React, { useState } from 'react';
import { 
  X, 
  History, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Clock, 
  ArrowRight, 
  Check, 
  Search,
  CheckCircle2
} from 'lucide-react';
import { Investigation } from '../../types/echo';

interface InvestigationHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  investigations: Investigation[];
  activeId: string;
  onSelect: (inv: Investigation) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
  onResetWorkspace: () => void;
}

export const InvestigationHistoryModal: React.FC<InvestigationHistoryModalProps> = ({
  isOpen,
  onClose,
  investigations,
  activeId,
  onSelect,
  onDelete,
  onRename,
  onResetWorkspace
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleStartRename = (inv: Investigation) => {
    setEditingId(inv.id);
    setEditingTitle(inv.claim);
  };

  const handleSaveRename = (id: string) => {
    if (editingTitle.trim()) {
      onRename(id, editingTitle.trim());
      setEditingId(null);
    }
  };

  const filtered = investigations.filter((inv) =>
    inv.claim.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-echo-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-violet-950 text-violet-400 border border-violet-800/40">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Investigation Dossier History</h3>
              <p className="text-xs text-slate-400 font-mono">
                Locally saved intelligence records stored in browser LocalStorage
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

        {/* Search & Actions Bar */}
        <div className="flex items-center justify-between gap-3 text-xs font-mono">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search past investigations..."
              className="w-full bg-echo-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            onClick={() => {
              if (window.confirm('Reset all saved investigations back to original pristine preloads?')) {
                onResetWorkspace();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-echo-950 border border-slate-800 text-rose-400 hover:bg-rose-950/40 hover:border-rose-700/50 transition-colors"
            title="Reset workspace"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-mono">
              No matching investigations found.
            </div>
          ) : (
            filtered.map((inv) => {
              const isActive = inv.id === activeId;
              const isEditing = editingId === inv.id;

              return (
                <div
                  key={inv.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    isActive
                      ? 'bg-echo-850 border-cyan-500/60 ring-1 ring-cyan-500/30'
                      : 'bg-echo-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          className="bg-echo-900 border border-cyan-500 rounded px-2 py-1 text-xs text-white w-full"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveRename(inv.id)}
                          className="p-1 text-emerald-400 hover:text-emerald-300"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-1 text-rose-400 hover:text-rose-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                            {inv.category}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            {new Date(inv.updatedAt).toLocaleDateString()}
                          </span>
                          {inv.isPreloaded && (
                            <span className="text-[9px] font-mono text-cyan-400">
                              [Curated]
                            </span>
                          )}
                        </div>
                        <h4 className="font-semibold text-white truncate text-sm">
                          &ldquo;{inv.claim}&rdquo;
                        </h4>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {!isEditing && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleStartRename(inv)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-echo-800"
                        title="Rename"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {investigations.length > 1 && (
                        <button
                          onClick={() => onDelete(inv.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => {
                          onSelect(inv);
                          onClose();
                        }}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold ${
                          isActive
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'bg-echo-800 text-slate-200 hover:bg-echo-750'
                        }`}
                      >
                        <span>{isActive ? 'Active' : 'Load'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
