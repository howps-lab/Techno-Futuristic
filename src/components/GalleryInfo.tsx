import React from 'react';
import { GalleryImage } from '../data/galleryImages';
import { Info, MapPin } from 'lucide-react';

interface GalleryInfoProps {
  image: GalleryImage;
  currentIndex: number;
  total: number;
  onOpenLightbox: () => void;
}

export const GalleryInfo: React.FC<GalleryInfoProps> = ({
  image,
  currentIndex,
  total,
  onOpenLightbox,
}) => {
  return (
    <div className="w-full max-w-xl transition-all duration-500 ease-out">
      {/* Category & Counter Bar (Clean Unboxed Typography with separator) */}
      <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-2">
        <span className="text-[#d9ff4a] font-semibold tracking-wider uppercase">
          {image.category}
        </span>
        <span aria-hidden="true" className="text-slate-600">·</span>
        <span className="tracking-widest">
          {image.date}
        </span>
        <span aria-hidden="true" className="text-slate-600">·</span>
        <span className="tabular-nums font-mono text-slate-300">
          {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* Main Photographic Title */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight leading-none text-balance">
        {image.title}
      </h2>

      {/* Location with Coordinates */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mt-2 font-sans">
        <MapPin className="w-3.5 h-3.5 text-[#d9ff4a]/80 shrink-0" />
        <span className="truncate">{image.location}</span>
        <span className="text-slate-600 hidden sm:inline">({image.coordinates})</span>
      </div>

      {/* Editorial Description */}
      <p className="text-sm sm:text-base text-slate-300/90 mt-3 leading-relaxed font-sans line-clamp-2 sm:line-clamp-3">
        {image.description}
      </p>

      {/* EXIF Data Quick Peek & Info Action */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/10 text-xs font-mono text-slate-400">
        <div className="hidden sm:flex items-center gap-3">
          <span>{image.exif.focalLength}</span>
          <span className="text-slate-600">·</span>
          <span>{image.exif.aperture}</span>
          <span className="text-slate-600">·</span>
          <span>{image.exif.shutter}</span>
          <span className="text-slate-600">·</span>
          <span>ISO {image.exif.iso}</span>
        </div>

        <button
          onClick={onOpenLightbox}
          className="ml-auto inline-flex items-center gap-1.5 text-xs font-sans font-medium text-slate-300 hover:text-[#d9ff4a] transition-colors py-1 cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Technical Archive</span>
        </button>
      </div>
    </div>
  );
};
