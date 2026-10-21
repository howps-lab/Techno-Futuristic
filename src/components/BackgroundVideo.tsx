import React, { useState } from 'react';

export const BackgroundVideo: React.FC = () => {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Fallback dark futuristic gradient background */}
      <div className="absolute inset-0 bg-[#05070c]" />

      {/* Looping Full-Page Background Video */}
      {!videoFailed ? (
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-75 contrast-105 brightness-95 transition-opacity duration-1000"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
        >
          <source src="/assets/aistudio/14583123_1280_720_flipped_8f1c3a94.mp4" type="video/mp4" />
          <source src="/videos/14583123_1280_720.mp4" type="video/mp4" />
        </video>
      ) : (
        /* Atmospheric animated fallback mesh if video cannot load */
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-[#05070c] to-[#020306] opacity-90" />
      )}

      {/* Dark Translucent Scrim & Atmospheric Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-[#05070c]/50 to-[#05070c]/70 backdrop-blur-[1px]" />
      <div className="absolute inset-0 cinematic-vignette" />

      {/* Subtle Cyan-Navy Atmospheric Ambient Bloom */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-950/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/4 right-0 w-[32rem] h-[32rem] bg-emerald-950/15 rounded-full blur-[160px]" />
    </div>
  );
};
