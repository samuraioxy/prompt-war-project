import React, { useState, useEffect } from 'react';
import { StorageService } from './services/storageService';
import { AnalysisEngine } from './services/analysisEngine';
import { Investigation, DeconstructionItem, EvidenceItem, ChallengeActionType } from './types/echo';
import { PRELOADED_INVESTIGATIONS } from './data/preloadedInvestigations';

// Components
import { EchoLanding } from './components/home/EchoLanding';
import { InvestigationHeader, WorkspaceTab } from './components/workspace/InvestigationHeader';
import { ClaimDeconstructor } from './components/workspace/ClaimDeconstructor';
import { EvidenceExplorer } from './components/workspace/EvidenceExplorer';
import { PerspectiveEngine } from './components/workspace/PerspectiveEngine';
import { KnowledgeGraph } from './components/workspace/KnowledgeGraph';
import { ChallengeStudio } from './components/workspace/ChallengeStudio';
import { ConclusionPanel } from './components/workspace/ConclusionPanel';
import { InvestigationReport } from './components/workspace/InvestigationReport';
import { AddEvidenceModal } from './components/workspace/AddEvidenceModal';
import { InvestigationHistoryModal } from './components/workspace/InvestigationHistoryModal';

export const App: React.FC = () => {
  const [investigations, setInvestigations] = useState<Investigation[]>([]);
  const [activeInvestigation, setActiveInvestigation] = useState<Investigation | null>(null);
  const [currentView, setCurrentView] = useState<'LANDING' | 'WORKSPACE'>('LANDING');
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('DECONSTRUCT');

  // Modals
  const [isAddEvidenceOpen, setIsAddEvidenceOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Initialize storage
  useEffect(() => {
    const list = StorageService.getInvestigations();
    setInvestigations(list);
    const activeId = StorageService.getActiveInvestigationId();
    const found = list.find((i) => i.id === activeId) || list[0] || PRELOADED_INVESTIGATIONS[0];
    setActiveInvestigation(found);
  }, []);

  // Handlers
  const handleSelectInvestigation = (inv: Investigation) => {
    setActiveInvestigation(inv);
    StorageService.setActiveInvestigationId(inv.id);
    setCurrentView('WORKSPACE');
    setActiveTab('DECONSTRUCT');
  };

  const handleCustomClaimSubmit = (claim: string) => {
    const newInv = AnalysisEngine.analyzeCustomClaim(claim);
    StorageService.saveInvestigation(newInv);
    setInvestigations(StorageService.getInvestigations());
    setActiveInvestigation(newInv);
    setCurrentView('WORKSPACE');
    setActiveTab('DECONSTRUCT');
  };

  const handleApplyChallenge = (
    targetItem: DeconstructionItem | EvidenceItem,
    actionType: ChallengeActionType,
    userCritique?: string
  ) => {
    if (!activeInvestigation) return;
    const updated = AnalysisEngine.applyChallenge(
      activeInvestigation,
      targetItem,
      actionType,
      userCritique
    );
    setActiveInvestigation(updated);
    StorageService.saveInvestigation(updated);
    setInvestigations(StorageService.getInvestigations());
  };

  const handleResetChallenges = () => {
    if (!activeInvestigation) return;
    const reset = AnalysisEngine.resetChallenges(activeInvestigation);
    setActiveInvestigation(reset);
    StorageService.saveInvestigation(reset);
    setInvestigations(StorageService.getInvestigations());
  };

  const handleAddEvidence = (newEvidence: Omit<EvidenceItem, 'id' | 'isIllustrative' | 'isUserAdded'>) => {
    if (!activeInvestigation) return;
    const updated = AnalysisEngine.addCustomEvidence(activeInvestigation, newEvidence);
    setActiveInvestigation(updated);
    StorageService.saveInvestigation(updated);
    setInvestigations(StorageService.getInvestigations());
  };

  const handleRenameClaim = (newTitle: string) => {
    if (!activeInvestigation) return;
    const updated = StorageService.renameInvestigation(activeInvestigation.id, newTitle);
    if (updated) {
      setActiveInvestigation(updated);
      setInvestigations(StorageService.getInvestigations());
    }
  };

  const handleDeleteInvestigation = (id: string) => {
    StorageService.deleteInvestigation(id);
    const refreshed = StorageService.getInvestigations();
    setInvestigations(refreshed);
    if (activeInvestigation?.id === id) {
      const nextActive = refreshed[0] || null;
      setActiveInvestigation(nextActive);
      if (!nextActive) setCurrentView('LANDING');
    }
  };

  const handleResetWorkspace = () => {
    const defaultList = StorageService.resetWorkspace();
    setInvestigations(defaultList);
    setActiveInvestigation(defaultList[0]);
    setIsHistoryOpen(false);
  };

  const handleChallengeNodeRef = (refId: string) => {
    if (!activeInvestigation) return;
    const targetItem =
      activeInvestigation.deconstruction.find((d) => d.id === refId) ||
      activeInvestigation.evidence.find((e) => e.id === refId);
    if (targetItem) {
      setActiveTab('CHALLENGE');
    }
  };

  return (
    <div className="min-h-screen bg-echo-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {currentView === 'LANDING' ? (
        <EchoLanding
          onSelectInvestigation={handleSelectInvestigation}
          onCustomClaimSubmit={handleCustomClaimSubmit}
          recentInvestigations={investigations}
          preloadedList={PRELOADED_INVESTIGATIONS}
        />
      ) : activeInvestigation ? (
        <div className="flex-1 flex flex-col">
          {/* Workspace Sticky Header */}
          <InvestigationHeader
            investigation={activeInvestigation}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onBackToHome={() => setCurrentView('LANDING')}
            onOpenHistory={() => setIsHistoryOpen(true)}
            onResetChallenges={handleResetChallenges}
            onRenameClaim={handleRenameClaim}
          />

          {/* Active Workspace Viewport */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {activeTab === 'DECONSTRUCT' && (
              <ClaimDeconstructor
                items={activeInvestigation.deconstruction}
                onTriggerChallenge={(item) => {
                  setActiveTab('CHALLENGE');
                }}
              />
            )}

            {activeTab === 'EVIDENCE' && (
              <EvidenceExplorer
                evidence={activeInvestigation.evidence}
                onOpenAddEvidence={() => setIsAddEvidenceOpen(true)}
                onChallengeEvidence={(ev) => {
                  setActiveTab('CHALLENGE');
                }}
              />
            )}

            {activeTab === 'PERSPECTIVES' && (
              <PerspectiveEngine
                perspectives={activeInvestigation.perspectives}
              />
            )}

            {activeTab === 'GRAPH' && (
              <KnowledgeGraph
                nodes={activeInvestigation.graphNodes}
                edges={activeInvestigation.graphEdges}
                onChallengeNodeRef={handleChallengeNodeRef}
              />
            )}

            {activeTab === 'CHALLENGE' && (
              <ChallengeStudio
                investigation={activeInvestigation}
                onApplyChallenge={handleApplyChallenge}
                onResetChallenges={handleResetChallenges}
              />
            )}

            {activeTab === 'SYNTHESIS' && (
              <ConclusionPanel
                assessment={activeInvestigation.assessment}
                activeChallengesCount={activeInvestigation.challenges.length}
              />
            )}

            {activeTab === 'REPORT' && (
              <InvestigationReport
                investigation={activeInvestigation}
              />
            )}
          </main>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8">
          <button
            onClick={() => setCurrentView('LANDING')}
            className="px-4 py-2 rounded-lg bg-cyan-500 text-echo-950 font-mono font-semibold"
          >
            Launch Investigation Workspace
          </button>
        </div>
      )}

      {/* Add Custom Evidence Modal */}
      <AddEvidenceModal
        isOpen={isAddEvidenceOpen}
        onClose={() => setIsAddEvidenceOpen(false)}
        onAdd={handleAddEvidence}
      />

      {/* History Drawer Modal */}
      <InvestigationHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        investigations={investigations}
        activeId={activeInvestigation?.id || ''}
        onSelect={handleSelectInvestigation}
        onDelete={handleDeleteInvestigation}
        onRename={(id, title) => {
          StorageService.renameInvestigation(id, title);
          setInvestigations(StorageService.getInvestigations());
          if (activeInvestigation?.id === id) {
            setActiveInvestigation({ ...activeInvestigation, claim: title });
          }
        }}
        onResetWorkspace={handleResetWorkspace}
      />
    </div>
  );
};

export default App;
