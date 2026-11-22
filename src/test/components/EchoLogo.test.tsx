import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EchoLogo } from '../../components/common/EchoLogo';

describe('EchoLogo Component', () => {
  it('renders ECHO logo text and subtitle by default', () => {
    render(<EchoLogo />);
    expect(screen.getByText('ECHO')).toBeInTheDocument();
    expect(screen.getByText('Intelligence System')).toBeInTheDocument();
  });

  it('renders icon only when showText is false', () => {
    render(<EchoLogo showText={false} />);
    expect(screen.queryByText('ECHO')).toBeNull();
  });

  it('renders SVG aperture graphic with proper waves', () => {
    const { container } = render(<EchoLogo size="xl" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.getAttribute('viewBox')).toBe('0 0 100 100');
  });
});
