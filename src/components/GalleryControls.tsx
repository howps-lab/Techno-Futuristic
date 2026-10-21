import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface GalleryControlsProps {
  currentIndex: number;
  total: number;
  isAutoplay: boolean;
  onToggleAutoplay: () => void;
  isAudioOn: boolean;
  onToggleAudio: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const GalleryControls: React.FC<GalleryControlsProps> = ({
  currentIndex,
  total,
  isAutoplay,
  onToggleAutoplay,
  isAudioOn,
  onToggleAudio,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
      {/* Navigation Buttons and Index Indicator */}
      <div className="flex items-center gap-3">
        {/* Previous Button */}
        <button
          onClick={onPrev}
          className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900/80 hover:bg-[#d9ff4a] text-slate-300 hover:text-black border border-white/10 hover:border-[#d9ff4a] transition-all duration-300 backdrop-blur-md cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(217,255,74,0.4)]"
          aria-label="Previous photograph"
          title="Previous (Left Arrow)"
        >
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900/80 hover:bg-[#d9ff4a] text-slate-300 hover:text-black border border-white/10 hover:border-[#d9ff4a] transition-all duration-300 backdrop-blur-md cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(217,255,74,0.4)]"
          aria-label="Next photograph"
          title="Next (Right Arrow)"
        >
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Slim Linear Progress Indicator */}
        <div className="flex items-center gap-1.5 ml-2">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === currentIndex
                  ? 'w-6 bg-[#d9ff4a] shadow-[0_0_8px_rgba(217,255,74,0.8)]'
                  : 'w-1.5 bg-slate-700/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Auxiliary Controls (Autoplay, Sound, Interaction Hint) */}
      <div className="flex items-center gap-3 text-xs font-mono">
        {/* Autoplay Toggle */}
        <button
          onClick={onToggleAutoplay}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all duration-300 cursor-pointer ${
            isAutoplay
              ? 'border-[#d9ff4a]/60 bg-[#d9ff4a]/10 text-[#d9ff4a] shadow-[0_0_12px_rgba(217,255,74,0.2)]'
              : 'border-white/10 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-white/20'
          }`}
          title="Toggle automatic slideshow (Spacebar)"
        >
          {isAutoplay ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span className="font-sans font-medium text-[11px] uppercase tracking-wider">Auto On</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span className="font-sans font-medium text-[11px] uppercase tracking-wider">Auto Off</span>
            </>
          )}
        </button>

        {/* Ambient Drone Sound Toggle */}
        <button
          onClick={onToggleAudio}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all duration-300 cursor-pointer ${
            isAudioOn
              ? 'border-[#d9ff4a]/60 bg-[#d9ff4a]/10 text-[#d9ff4a] shadow-[0_0_12px_rgba(217,255,74,0.2)]'
              : 'border-white/10 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-white/20'
          }`}
          title="Toggle ambient sci-fi soundscape"
        >
          {isAudioOn ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              <span className="font-sans font-medium text-[11px] uppercase tracking-wider">Audio On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span className="font-sans font-medium text-[11px] uppercase tracking-wider">Muted</span>
            </>
          )}
        </button>

        {/* Navigation hint */}
        <span className="hidden md:inline-block text-slate-500 text-[11px] ml-2">
          Use <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">→</kbd> or Drag
        </span>
      </div>
    </div>
  );
};
