import React from 'react';

interface EchoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const EchoLogo: React.FC<EchoLogoProps> = ({ 
  className = '', 
  size = 'md',
  showText = true 
}) => {
  const sizeMap = {
    sm: { icon: 24, font: 'text-base', sub: 'text-[9px]' },
    md: { icon: 34, font: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 44, font: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 60, font: 'text-4xl', sub: 'text-sm' },
  };

  const { icon, font, sub } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Sonar / Radar Echo Aperture SVG */}
      <div className="relative flex items-center justify-center">
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-500 hover:rotate-45"
        >
          <defs>
            <radialGradient id="echoGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="cyanViolet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F2FE" />
              <stop offset="60%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>

          {/* Ambient Glow */}
          <circle cx="50" cy="50" r="48" fill="url(#echoGlow)" opacity="0.35" />

          {/* Outer Wave */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="url(#cyanViolet)"
            strokeWidth="2.5"
            strokeOpacity="0.4"
            strokeDasharray="6 4"
          />

          {/* Middle Wave */}
          <circle
            cx="50"
            cy="50"
            r="31"
            stroke="#06B6D4"
            strokeWidth="3"
            strokeOpacity="0.75"
          />

          {/* Inner Wave */}
          <circle
            cx="50"
            cy="50"
            r="18"
            stroke="#8B5CF6"
            strokeWidth="3"
          />

          {/* Core Sensing Emitter */}
          <circle cx="50" cy="50" r="7" fill="#00F2FE" />
          
          {/* Subtle Aperture Crosshairs */}
          <line x1="50" y1="2" x2="50" y2="14" stroke="#00F2FE" strokeWidth="2" strokeOpacity="0.8" />
          <line x1="50" y1="86" x2="50" y2="98" stroke="#00F2FE" strokeWidth="2" strokeOpacity="0.8" />
          <line x1="2" y1="50" x2="14" y2="50" stroke="#00F2FE" strokeWidth="2" strokeOpacity="0.8" />
          <line x1="86" y1="50" x2="98" y2="50" stroke="#00F2FE" strokeWidth="2" strokeOpacity="0.8" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 ${font}`}>
              ECHO
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00F2FE]"></span>
          </div>
          <span className={`text-slate-400 uppercase tracking-widest font-mono font-medium ${sub}`}>
            Intelligence System
          </span>
        </div>
      )}
    </div>
  );
};
