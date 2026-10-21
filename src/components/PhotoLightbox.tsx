import React, { useEffect } from 'react';
import { GalleryImage } from '../data/galleryImages';
import { X, Camera, Aperture, Clock, Zap, MapPin, Compass } from 'lucide-react';

interface PhotoLightboxProps {
  image: GalleryImage | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  image,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      }
    };

    if (image) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [image, onClose, onNext, onPrev]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${image.title} detail view`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/90 backdrop-blur-xl transition-all duration-300"
      onClick={onClose}
    >
      {/* Lightbox Modal Window */}
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col lg:flex-row bg-[#080c14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-black/60 hover:bg-[#d9ff4a] text-slate-300 hover:text-black border border-white/10 transition-colors cursor-pointer"
          aria-label="Close detail modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Image Showcase (Left/Top) */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[420px] lg:min-h-[580px] bg-black flex items-center justify-center overflow-hidden">
          <img
            src={image.image}
            alt={image.title}
            className="w-full h-full object-contain max-h-[80vh]"
          />
          <div className="absolute inset-0 pointer-events-none border-b lg:border-b-0 lg:border-r border-white/10" />
        </div>

        {/* Technical Data and Editorial Panel (Right/Bottom) */}
        <div className="w-full lg:w-[380px] p-6 lg:p-8 flex flex-col justify-between overflow-y-auto bg-gradient-to-b from-[#080c14] to-[#04060a]">
          <div>
            {/* Category and Date Badge */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-[#d9ff4a] uppercase font-semibold tracking-wider">
                {image.category}
              </span>
              <span>·</span>
              <span>{image.date}</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-2 tracking-tight">
              {image.title}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2 font-sans">
              <MapPin className="w-3.5 h-3.5 text-[#d9ff4a] shrink-0" />
              <span>{image.location}</span>
            </div>

            {/* Editorial Description */}
            <p className="text-sm text-slate-300 mt-4 leading-relaxed font-sans">
              {image.description}
            </p>

            {/* EXIF Technical Data Matrix */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#d9ff4a]" />
                <span>EXIF Telemetry</span>
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                    <Camera className="w-3 h-3 text-[#d9ff4a]" />
                    <span>Camera</span>
                  </div>
                  <div className="text-slate-100 font-medium mt-1 truncate">{image.exif.camera}</div>
                </div>

                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                    <Aperture className="w-3 h-3 text-[#d9ff4a]" />
                    <span>Aperture</span>
                  </div>
                  <div className="text-slate-100 font-medium mt-1">{image.exif.aperture}</div>
                </div>

                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                    <Clock className="w-3 h-3 text-[#d9ff4a]" />
                    <span>Exposure</span>
                  </div>
                  <div className="text-slate-100 font-medium mt-1">{image.exif.shutter}</div>
                </div>

                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                    <Zap className="w-3 h-3 text-[#d9ff4a]" />
                    <span>Sensitivity</span>
                  </div>
                  <div className="text-slate-100 font-medium mt-1">ISO {image.exif.iso}</div>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-lg bg-white/5 border border-white/5 text-[11px] font-mono text-slate-400">
                <div className="text-slate-500">Lens & Optics:</div>
                <div className="text-slate-200 mt-0.5">{image.exif.lens} ({image.exif.focalLength})</div>
                <div className="text-slate-500 mt-2">Geographic Coordinates:</div>
                <div className="text-[#d9ff4a] font-mono mt-0.5">{image.coordinates}</div>
              </div>
            </div>
          </div>

          {/* Footer close note */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Press ESC to return</span>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#d9ff4a] text-slate-200 hover:text-black font-sans font-medium text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
