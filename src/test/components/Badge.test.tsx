import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../../components/common/Badge';

describe('Badge Component', () => {
  it('renders Deconstruction Type badges correctly', () => {
    const { rerender } = render(<Badge type="FACT" />);
    expect(screen.getByText('FACT')).toBeInTheDocument();

    rerender(<Badge type="ASSUMPTION" />);
    expect(screen.getByText('ASSUMPTION')).toBeInTheDocument();

    rerender(<Badge type="OPINION" />);
    expect(screen.getByText('OPINION')).toBeInTheDocument();

    rerender(<Badge type="PREDICTION" />);
    expect(screen.getByText('PREDICTION')).toBeInTheDocument();
  });

  it('renders Verification Status badges correctly', () => {
    const { rerender } = render(<Badge verification="SUPPORTED" />);
    expect(screen.getByText('Supported by Evidence')).toBeInTheDocument();

    rerender(<Badge verification="UNVERIFIED" />);
    expect(screen.getByText('Unverified Assumption')).toBeInTheDocument();

    rerender(<Badge verification="CONTRADICTED" />);
    expect(screen.getByText('Contradicted by Evidence')).toBeInTheDocument();
  });

  it('renders Qualitative Confidence badges correctly', () => {
    const { rerender } = render(<Badge confidence="STRONGLY_SUPPORTED" />);
    expect(screen.getByText('Strongly Supported by Available Evidence')).toBeInTheDocument();

    rerender(<Badge confidence="INSUFFICIENT_EVIDENCE" />);
    expect(screen.getByText('Insufficient Evidence / High Uncertainty')).toBeInTheDocument();

    rerender(<Badge confidence="MIXED_EVIDENCE" />);
    expect(screen.getByText('Mixed Evidence / Competing Drivers')).toBeInTheDocument();
  });

  it('renders Evidence Stance badges correctly', () => {
    const { rerender } = render(<Badge stance="SUPPORTING" />);
    expect(screen.getByText('Supporting')).toBeInTheDocument();

    rerender(<Badge stance="CHALLENGING" />);
    expect(screen.getByText('Challenging')).toBeInTheDocument();
  });
});
