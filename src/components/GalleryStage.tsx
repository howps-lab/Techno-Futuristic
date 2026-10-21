import React, { useRef, useState, useEffect, useCallback } from 'react';
import { GalleryImage } from '../data/galleryImages';
import { GalleryCard } from './GalleryCard';

interface GalleryStageProps {
  images: GalleryImage[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onExpand: (image: GalleryImage) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const GalleryStage: React.FC<GalleryStageProps> = ({
  images,
  activeIndex,
  onSelect,
  onExpand,
  onNext,
  onPrev,
}) => {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  // Touch and drag swipe state
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);

  // Mouse move handler for subtle 3D parallax on desktop
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;

    setMouseParallax({
      x: xRatio * 6, // degrees
      y: yRatio * -4,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseParallax({ x: 0, y: 0 });
  }, []);

  // Pointer drag & touch gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    touchStartX.current = e.clientX;
    touchStartY.current = e.clientY;
    isDragging.current = true;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current || touchStartX.current === null) return;
    const diffX = e.clientX - touchStartX.current;
    const diffY = touchStartY.current !== null ? Math.abs(e.clientY - touchStartY.current) : 0;

    // Minimum swipe threshold
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > diffY) {
      if (diffX < 0) {
        onNext();
      } else {
        onPrev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    isDragging.current = false;
  };

  // Keyboard navigation listener (Left / Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'KeyD') {
        onNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'KeyA') {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev]);

  // Secondary highlighted card echoing the reference image composition
  const secondaryHighlightIndex = (activeIndex + 2) % images.length;

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="relative w-full h-[365px] sm:h-[420px] lg:h-[462px] xl:h-[490px] flex items-center justify-start select-none touch-pan-y"
    >
      {/* 3D Perspective Stage Container */}
      <div
        className="gallery-stage relative w-full h-full flex items-center transition-transform duration-500 ease-out"
        style={{
          transform: `rotateX(${mouseParallax.y}deg) rotateY(${mouseParallax.x}deg)`,
        }}
      >
        {/* Anchor point container for the gallery cards */}
        <div className="relative w-full h-full flex items-center left-[4%] sm:left-[8%] lg:left-[10%] xl:left-[12%]">
          {images.map((img, idx) => {
            // Compute relative offset from activeIndex
            // Handles wrapping seamlessly
            let offset = idx - activeIndex;
            const half = images.length / 2;
            if (offset > half) offset -= images.length;
            if (offset < -half) offset += images.length;

            const isActive = idx === activeIndex;
            const isSecondary = idx === secondaryHighlightIndex;

            return (
              <GalleryCard
                key={img.id}
                image={img}
                index={idx}
                offset={offset}
                total={images.length}
                isActive={isActive}
                isSecondaryHighlight={isSecondary}
                onSelect={onSelect}
                onExpand={onExpand}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
