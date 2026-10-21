import React from 'react';
import { Eye } from 'lucide-react';

interface HeaderNavProps {
  onOpenInspect: () => void;
  onFilterCategory?: (category: string | null) => void;
  activeFilter?: string | null;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onOpenInspect,
}) => {
  return (
    <header className="relative z-30 w-full px-6 lg:px-12 py-5 flex items-center justify-between gap-8 border-b border-white/5 backdrop-blur-xs select-none">
      {/* Zone 1: Single text element Brand Wordmark */}
      <a
        href="/"
        className="text-lg lg:text-xl font-extrabold tracking-tight text-white font-display whitespace-nowrap shrink-0 hover:text-[#d9ff4a] transition-colors"
      >
        AETHER <span className="text-[#d9ff4a] font-normal">3D</span>
      </a>

      {/* Zone 2: 4 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <span className="text-white hover:text-[#d9ff4a] transition-colors whitespace-nowrap shrink-0 cursor-default">
          Exhibition
        </span>
        <span className="text-slate-400 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-default">
          Spatial Perspective
        </span>
        <span className="text-slate-400 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-default">
          Curated Series
        </span>
        <span className="text-slate-400 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-default">
          Optics & EXIF
        </span>
      </nav>

      {/* Zone 3: 1 Primary Action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenInspect}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-[#d9ff4a] hover:bg-[#c9ef3a] rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(217,255,74,0.35)] hover:shadow-[0_0_25px_rgba(217,255,74,0.6)] whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Inspect Active</span>
        </button>
      </div>
    </header>
  );
};
