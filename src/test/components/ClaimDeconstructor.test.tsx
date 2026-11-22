import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ClaimDeconstructor } from '../../components/workspace/ClaimDeconstructor';
import { PRELOADED_INVESTIGATIONS } from '../../data/preloadedInvestigations';

describe('ClaimDeconstructor Component', () => {
  const items = PRELOADED_INVESTIGATIONS[0].deconstruction;

  it('renders all deconstruction items by default', () => {
    render(<ClaimDeconstructor items={items} onTriggerChallenge={vi.fn()} />);
    expect(screen.getByText(/Anatomy of the Argument/i)).toBeInTheDocument();
    expect(screen.getByText(items[0].statement)).toBeInTheDocument();
  });

  it('filters items when category filter button is clicked', () => {
    render(<ClaimDeconstructor items={items} onTriggerChallenge={vi.fn()} />);
    
    // Filter by Facts
    const factsBtn = screen.getByRole('button', { name: /^Facts/i });
    fireEvent.click(factsBtn);

    const factItems = items.filter((i) => i.type === 'FACT');
    const nonFactItems = items.filter((i) => i.type !== 'FACT');

    factItems.forEach((f) => {
      expect(screen.getByText(f.statement)).toBeInTheDocument();
    });

    if (nonFactItems.length > 0) {
      expect(screen.queryByText(nonFactItems[0].statement)).toBeNull();
    }
  });

  it('calls onTriggerChallenge when Challenge button is clicked', () => {
    const onTrigger = vi.fn();
    render(<ClaimDeconstructor items={items} onTriggerChallenge={onTrigger} />);

    const challengeBtns = screen.getAllByRole('button', { name: /Challenge This/i });
    fireEvent.click(challengeBtns[0]);

    expect(onTrigger).toHaveBeenCalledWith(items[0]);
  });
});
