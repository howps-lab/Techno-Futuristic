import React, { useState } from 'react';
import { GalleryImage } from '../data/galleryImages';
import { Maximize2, Camera } from 'lucide-react';

interface GalleryCardProps {
  image: GalleryImage;
  index: number;
  offset: number; // relative to activeIndex (0 = active, 1 = first right, etc.)
  total: number;
  isActive: boolean;
  isSecondaryHighlight: boolean;
  onSelect: (index: number) => void;
  onExpand: (image: GalleryImage) => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  image,
  index,
  offset,
  isActive,
  isSecondaryHighlight,
  onSelect,
  onExpand,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Compute 3D transformation values based on relative offset
  // Desktop layout: Active card sits at left (offset 0), receding procession extends right (offset > 0)
  const getCardTransform = () => {
    // If card is far offscreen, hide it
    if (offset < -2 || offset > 7) {
      return {
        transform: `translate3d(${offset > 0 ? 120 : -100}vw, 0px, -600px) scale(0.3)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: 'none' as const,
        filter: 'brightness(0.2) blur(8px)',
      };
    }

    if (isActive) {
      // Active featured card
      const hoverLift = isHovered ? 'scale(1.02) translate3d(0, -6px, 60px)' : 'scale(1) translate3d(0, 0, 40px)';
      return {
        transform: `translate3d(0px, 0px, 0px) rotateY(-2deg) rotateX(1deg) ${hoverLift}`,
        opacity: 1,
        zIndex: 50,
        filter: 'brightness(1) contrast(1.05)',
        pointerEvents: 'auto' as const,
      };
    }

    if (offset < 0) {
      // Cards immediately to the left of active
      const leftStep = Math.abs(offset);
      return {
        transform: `translate3d(${-leftStep * 60 - 42}px, ${leftStep * 6}px, ${-leftStep * 98}px) rotateY(20deg) scale(${1 - leftStep * 0.12})`,
        opacity: Math.max(0, 0.45 - leftStep * 0.2),
        zIndex: 40 - leftStep,
        filter: `brightness(0.4) blur(${leftStep * 2}px)`,
        pointerEvents: 'auto' as const,
      };
    }

    // Cards receding to the right (offset 1, 2, 3, 4, 5, 6...)
    // Proportional 30% reduction in spacing and coordinates
    const xBase = 273; // distance from featured card's left boundary
    const xSpacing = 115; // spacing between subsequent cards
    const xPos = xBase + (offset - 1) * xSpacing;
    const zPos = -offset * 77;
    const yPos = Math.sin(offset * 0.35) * 10 + (offset * 2);
    const rotY = -16 - Math.min(offset * 2.5, 12);
    const scale = Math.max(0.42, 0.88 - (offset - 1) * 0.09);
    const opacity = Math.max(0.18, 1 - (offset - 1) * 0.13);
    const brightness = Math.max(0.32, 0.85 - (offset - 1) * 0.08);

    const hoverAdjustment = isHovered ? 'translateY(-6px) scale(1.04)' : '';

    return {
      transform: `translate3d(${xPos}px, ${yPos}px, ${zPos}px) rotateY(${rotY}deg) scale(${scale}) ${hoverAdjustment}`,
      opacity,
      zIndex: 40 - offset,
      filter: `brightness(${brightness}) ${offset > 4 ? 'blur(1.5px)' : 'none'}`,
      pointerEvents: 'auto' as const,
    };
  };

  const transformStyle = getCardTransform();

  return (
    <div
      onClick={() => onSelect(index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`gallery-card absolute top-0 left-0 cursor-pointer select-none rounded-2xl group transition-all duration-700 ${
        isActive
          ? 'is-active w-[224px] sm:w-[266px] lg:w-[287px] xl:w-[308px] h-[322px] sm:h-[378px] lg:h-[413px] xl:h-[441px]'
          : isSecondaryHighlight
          ? 'is-secondary-highlight w-[154px] lg:w-[182px] h-[231px] lg:h-[273px]'
          : 'border border-white/10 hover:border-white/30 w-[154px] lg:w-[182px] h-[231px] lg:h-[273px] shadow-2xl shadow-black/80'
      }`}
      style={{
        ...transformStyle,
        transformOrigin: 'center center',
      }}
      role="button"
      tabIndex={0}
      aria-label={`Select photograph ${index + 1}: ${image.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(index);
        }
      }}
    >
      {/* Inner Image Container with Glass Surface */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950/80">
        {/* Loading placeholder skeleton */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-slate-900/80 animate-pulse flex items-center justify-center">
            <Camera className="w-8 h-8 text-slate-700 animate-spin" />
          </div>
        )}

        {/* Real Curated Image */}
        {!imgError ? (
          <img
            src={image.image}
            alt={image.title}
            loading={Math.abs(offset) <= 2 ? 'eager' : 'lazy'}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              isHovered && isActive ? 'scale-105' : 'scale-100'
            }`}
          />
        ) : (
          /* Resilient Fallback Container */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-black p-6 text-center">
            <Camera className="w-10 h-10 text-emerald-400/60 mb-2" />
            <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">
              {image.category}
            </span>
            <span className="text-sm font-semibold text-slate-200 mt-1">{image.title}</span>
          </div>
        )}

        {/* Ambient Dark Scrims for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

        {/* Card Number & Category Micro-Indicator (Unboxed Clean Typography) */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono pointer-events-none">
          <span
            className={`transition-colors duration-300 font-medium ${
              isActive
                ? 'text-[#d9ff4a] drop-shadow-[0_0_8px_rgba(217,255,74,0.8)]'
                : 'text-slate-400'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[11px] text-slate-400 tracking-wider font-sans uppercase">
            {image.category}
          </span>
        </div>

        {/* Bottom Card Title and Details */}
        <div className="absolute bottom-4 left-4 right-4 text-left pointer-events-none">
          <h4
            className={`font-semibold tracking-tight transition-colors duration-300 line-clamp-1 ${
              isActive
                ? 'text-lg sm:text-xl text-white font-display'
                : 'text-sm sm:text-base text-slate-200'
            }`}
          >
            {image.title}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 font-sans">{image.location}</p>
        </div>

        {/* Expand Action Button for Active Card */}
        {isActive && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExpand(image);
            }}
            className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-black/60 hover:bg-[#d9ff4a] text-slate-300 hover:text-black border border-white/10 hover:border-[#d9ff4a] transition-all duration-300 pointer-events-auto backdrop-blur-md shadow-lg"
            title="Inspect photograph and EXIF metadata"
            aria-label="Inspect photograph"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Realistic Floor Reflection for Active Card */}
      {isActive && (
        <div
          className="absolute -bottom-14 left-4 right-4 h-12 rounded-full opacity-40 blur-xl pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(217, 255, 74, 0.6) 0%, rgba(217, 255, 74, 0.15) 50%, transparent 75%)',
          }}
        />
      )}
    </div>
  );
};
