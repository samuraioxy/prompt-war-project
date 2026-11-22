import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EvidenceExplorer } from '../../components/workspace/EvidenceExplorer';
import { PRELOADED_INVESTIGATIONS } from '../../data/preloadedInvestigations';

describe('EvidenceExplorer Component', () => {
  const evidence = PRELOADED_INVESTIGATIONS[0].evidence;

  it('renders supporting and challenging evidence groups', () => {
    render(
      <EvidenceExplorer
        evidence={evidence}
        onOpenAddEvidence={vi.fn()}
        onChallengeEvidence={vi.fn()}
      />
    );

    expect(screen.getByText(/Evidence Integrity & Provenance/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Supporting Evidence/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Challenging Evidence/i })).toBeInTheDocument();
  });

  it('filters by stance when stance filter buttons are clicked', () => {
    render(
      <EvidenceExplorer
        evidence={evidence}
        onOpenAddEvidence={vi.fn()}
        onChallengeEvidence={vi.fn()}
      />
    );

    const supportingOnlyBtn = screen.getByRole('button', { name: /^Supporting/i });
    fireEvent.click(supportingOnlyBtn);

    expect(screen.getByRole('heading', { name: /Supporting Evidence/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Challenging Evidence/i })).toBeNull();
  });

  it('triggers onOpenAddEvidence when Add Custom Evidence button is clicked', () => {
    const onAdd = vi.fn();
    render(
      <EvidenceExplorer
        evidence={evidence}
        onOpenAddEvidence={onAdd}
        onChallengeEvidence={vi.fn()}
      />
    );

    const addBtn = screen.getByRole('button', { name: /Add Custom Evidence/i });
    fireEvent.click(addBtn);

    expect(onAdd).toHaveBeenCalledTimes(1);
  });
});
