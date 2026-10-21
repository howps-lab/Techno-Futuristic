import { useState, useEffect, useCallback, useRef } from 'react';
import { galleryImages, GalleryImage } from './data/galleryImages';
import { BackgroundVideo } from './components/BackgroundVideo';
import { AmbientEffects } from './components/AmbientEffects';
import { HeaderNav } from './components/HeaderNav';
import { GalleryStage } from './components/GalleryStage';
import { GalleryInfo } from './components/GalleryInfo';
import { GalleryControls } from './components/GalleryControls';
import { PhotoLightbox } from './components/PhotoLightbox';
import { ambientDrone } from './utils/audioDrone';

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeImage = galleryImages[activeIndex];

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Audio drone toggle
  const handleToggleAudio = useCallback(() => {
    const newState = ambientDrone.toggle();
    setIsAudioOn(newState);
  }, []);

  // Autoplay management
  useEffect(() => {
    // Clear any existing timer
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isAutoplay || prefersReducedMotion || lightboxImage !== null) {
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      handleNext();
    }, 6000);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isAutoplay, handleNext, lightboxImage]);

  // Spacebar hotkey to toggle autoplay, F to inspect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        setIsAutoplay((prev) => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        setLightboxImage(galleryImages[activeIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  return (
    <div className="relative min-h-screen w-full bg-[#05070c] text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-[#d9ff4a] selection:text-black">
      {/* Full-Page Looping Background Video with Scrim & Vignette */}
      <BackgroundVideo />

      {/* Atmospheric Lighting, Floating Particles & Floor Trail */}
      <AmbientEffects />

      {/* Top Navigation Bar */}
      <HeaderNav onOpenInspect={() => setLightboxImage(activeImage)} />

      {/* Main 3D Interactive Exhibition Space */}
      <main className="relative z-20 flex-1 flex flex-col justify-center w-full px-4 sm:px-8 lg:px-12 py-4">
        {/* 3D Perspective Stage */}
        <GalleryStage
          images={galleryImages}
          activeIndex={activeIndex}
          onSelect={handleSelect}
          onExpand={(img) => setLightboxImage(img)}
          onNext={handleNext}
          onPrev={handlePrev}
        />

        {/* Refined Bottom Control & Editorial Information Panel */}
        <div className="relative z-20 mt-4 lg:mt-6 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 p-4 sm:p-6 rounded-2xl bg-[#080d16]/65 border border-white/5 backdrop-blur-md shadow-2xl">
          {/* Active Image Editorial Information */}
          <GalleryInfo
            image={activeImage}
            currentIndex={activeIndex}
            total={galleryImages.length}
            onOpenLightbox={() => setLightboxImage(activeImage)}
          />

          {/* Navigation Controls, Autoplay, Audio & Progress */}
          <div className="w-full lg:w-auto lg:min-w-[420px]">
            <GalleryControls
              currentIndex={activeIndex}
              total={galleryImages.length}
              isAutoplay={isAutoplay}
              onToggleAutoplay={() => setIsAutoplay((prev) => !prev)}
              isAudioOn={isAudioOn}
              onToggleAudio={handleToggleAudio}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-20 w-full px-6 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 border-t border-white/5 select-none gap-2">
        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-sans">Aether Photographic Archives</span>
          <span>·</span>
          <span>Vol. 2026.04</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>3D Perspective Canvas</span>
          <span className="text-[#d9ff4a]">Neon Horizon Engine</span>
        </div>
      </footer>

      {/* Technical Lightbox Modal */}
      <PhotoLightbox
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
