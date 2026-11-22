import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EchoLanding } from '../../components/home/EchoLanding';
import { PRELOADED_INVESTIGATIONS } from '../../data/preloadedInvestigations';

describe('EchoLanding Component', () => {
  it('renders branding headline, tagline, and methodology sections', () => {
    render(
      <EchoLanding
        onSelectInvestigation={vi.fn()}
        onCustomClaimSubmit={vi.fn()}
        recentInvestigations={[]}
        preloadedList={PRELOADED_INVESTIGATIONS}
      />
    );

    expect(screen.getByRole('heading', { name: /See Beyond the Answer/i })).toBeInTheDocument();
    expect(screen.getByText(/Don't just show me what happened/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Curated Master Investigations/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /How ECHO Transforms Information Consumption/i })).toBeInTheDocument();
  });

  it('allows user to enter claim and submit via button click', () => {
    const onSubmit = vi.fn();
    render(
      <EchoLanding
        onSelectInvestigation={vi.fn()}
        onCustomClaimSubmit={onSubmit}
        recentInvestigations={[]}
        preloadedList={PRELOADED_INVESTIGATIONS}
      />
    );

    const input = screen.getByLabelText(/Enter claim to investigate/i);
    fireEvent.change(input, { target: { value: 'Quantum computing will break all modern cryptography.' } });

    const submitBtn = screen.getByRole('button', { name: /Investigate Claim/i });
    fireEvent.click(submitBtn);

    expect(onSubmit).toHaveBeenCalledWith('Quantum computing will break all modern cryptography.');
  });

  it('shows accessible validation error when submitting too short of a claim', () => {
    const onSubmit = vi.fn();
    render(
      <EchoLanding
        onSelectInvestigation={vi.fn()}
        onCustomClaimSubmit={onSubmit}
        recentInvestigations={[]}
        preloadedList={PRELOADED_INVESTIGATIONS}
      />
    );

    const input = screen.getByLabelText(/Enter claim to investigate/i);
    fireEvent.change(input, { target: { value: 'AI' } });

    const submitBtn = screen.getByRole('button', { name: /Investigate Claim/i });
    fireEvent.click(submitBtn);

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toHaveTextContent(/at least 5 characters/i);
  });

  it('selects preloaded investigation on card click or Enter keypress', () => {
    const onSelect = vi.fn();
    render(
      <EchoLanding
        onSelectInvestigation={onSelect}
        onCustomClaimSubmit={vi.fn()}
        recentInvestigations={[]}
        preloadedList={PRELOADED_INVESTIGATIONS}
      />
    );

    const flagshipCard = screen.getByRole('button', {
      name: /Open investigation on: AI will replace all programmers in two years/i
    });
    fireEvent.click(flagshipCard);

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'ai-replace-programmers' })
    );

    // Also test keyboard Enter keypress
    fireEvent.keyDown(flagshipCard, { key: 'Enter', code: 'Enter' });
    expect(onSelect).toHaveBeenCalledTimes(2);
  });
});
