import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PerspectiveEngine } from '../../components/workspace/PerspectiveEngine';
import { PRELOADED_INVESTIGATIONS } from '../../data/preloadedInvestigations';

describe('PerspectiveEngine Component', () => {
  const perspectives = PRELOADED_INVESTIGATIONS[0].perspectives;

  it('renders all 5 analytical lenses plus stakeholder buttons', () => {
    render(<PerspectiveEngine perspectives={perspectives} />);
    expect(screen.getByText(/Missing Perspectives Engine/i)).toBeInTheDocument();

    expect(screen.getByRole('tab', { name: /The Formal Verification Scientist/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /The Economic Skeptic/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /The Technology Historian/i })).toBeInTheDocument();
  });

  it('switches active perspective panel when tab is clicked', () => {
    render(<PerspectiveEngine perspectives={perspectives} />);
    
    // Switch to Historian
    const historianTab = screen.getByRole('tab', { name: /The Technology Historian/i });
    fireEvent.click(historianTab);

    expect(screen.getByRole('tabpanel')).toHaveAttribute(
      'aria-label',
      expect.stringContaining('The Technology Historian')
    );
    expect(screen.getByText(/Past automation abstraction cycles/i, { exact: false })).toBeInTheDocument();
  });
});
