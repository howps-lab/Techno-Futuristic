import React, { useEffect, useRef } from 'react';

interface AmbientEffectsProps {
  activeProgress?: number;
}

export const AmbientEffects: React.FC<AmbientEffectsProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect user reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle definition
    const PARTICLE_COUNT = 36;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: -Math.random() * 0.35 - 0.08,
      alpha: Math.random() * 0.45 + 0.1,
      fadeSpeed: (Math.random() * 0.004 + 0.002) * (Math.random() > 0.5 ? 1 : -1)
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += p.fadeSpeed;

        if (p.alpha > 0.6 || p.alpha < 0.08) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 255, 74, ${Math.max(0, p.alpha)})`;
        ctx.shadowColor = 'rgba(217, 255, 74, 0.8)';
        ctx.shadowBlur = 6;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {/* Floating Stardust Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Luminous Floor Light Trail beneath card procession */}
      <div className="neon-floor-trail" />

      {/* Primary Luminous Core Aura (Centered behind the active left card zone) */}
      <div
        className="absolute top-1/2 left-[18%] -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[31rem] rounded-full opacity-25 blur-[100px] pointer-events-none transition-all duration-1000"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(217, 255, 74, 0.4) 0%, rgba(160, 255, 40, 0.15) 45%, transparent 75%)'
        }}
      />
    </div>
  );
};
