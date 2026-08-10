import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface BannerHeroProps {
  onExploreClick?: () => void;
}

const TOTAL_FRAMES = 177;
const LERP_FACTOR = 0.07;
const FRAME_SCALE = 0.72;

function getFramePath(index: number): string {
  const frameNum = String(index).padStart(3, '0');
  return `/first/ezgif-frame-${frameNum}.jpg`;
}

export const BannerHero: React.FC<BannerHeroProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const targetScrollFractionRef = useRef<number>(0);
  const currentScrollFractionRef = useRef<number>(0);
  const lastRenderedFrameRef = useRef<number>(-1);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Preload 177 frame images in background
    const frames: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();

      let handled = false;
      const onFrameLoad = () => {
        if (handled) return;
        handled = true;
        if (i === 1 && lastRenderedFrameRef.current === -1) {
          drawFrame(0, true);
        }
      };

      img.onload = () => {
        if ('decode' in img) {
          img.decode().then(onFrameLoad).catch(onFrameLoad);
        } else {
          onFrameLoad();
        }
      };

      img.onerror = () => {
        onFrameLoad();
      };

      img.src = getFramePath(i);

      if (img.complete) {
        onFrameLoad();
      }

      frames.push(img);
    }
    framesRef.current = frames;

    // 2. Draw Frame on Canvas with DPR scaling and Cover fit algorithm
    function drawFrame(frameIndex: number, forceRedraw = false) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      if (!forceRedraw && frameIndex === lastRenderedFrameRef.current) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let img = framesRef.current[frameIndex];

      // Fallback to nearest available loaded frame if current frame isn't ready
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          const prev = framesRef.current[frameIndex - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            img = prev;
            break;
          }
          const next = framesRef.current[frameIndex + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            img = next;
            break;
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      const imgAspect = imgWidth / imgHeight;
      const canvasAspect = canvasWidth / canvasHeight;

      let baseWidth: number, baseHeight: number;

      if (canvasAspect > imgAspect) {
        baseWidth = canvasWidth;
        baseHeight = canvasWidth / imgAspect;
      } else {
        baseHeight = canvasHeight;
        baseWidth = canvasHeight * imgAspect;
      }

      const renderWidth = baseWidth * FRAME_SCALE;
      const renderHeight = baseHeight * FRAME_SCALE;

      const offsetX = (canvasWidth - renderWidth) / 2;
      const offsetY = (canvasHeight - renderHeight) / 2;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);

      lastRenderedFrameRef.current = frameIndex;
    }

    // 3. Resize Canvas according to viewport and Device Pixel Ratio (DPR)
    function resizeCanvas() {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }

      lastRenderedFrameRef.current = -1;
      const currentFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentScrollFractionRef.current * (TOTAL_FRAMES - 1)))
      );
      drawFrame(currentFrame, true);
    }

    // 4. Update section-bound scroll fraction (strictly within BannerHero container)
    function updateSectionScrollProgress() {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const maxScrollDistance = rect.height - window.innerHeight;

      if (maxScrollDistance <= 0) {
        targetScrollFractionRef.current = 0;
        return;
      }

      // Calculate scrolled distance strictly inside BannerHero
      const scrolled = -rect.top;
      const fraction = Math.min(1, Math.max(0, scrolled / maxScrollDistance));
      targetScrollFractionRef.current = fraction;
    }

    // 5. Initialize Lenis Smooth Scroll engine
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', () => {
      updateSectionScrollProgress();
    });

    // 6. Continuous Render Loop with RAF & LERP
    let animationFrameId: number;

    function renderLoop(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
      }

      updateSectionScrollProgress();

      const delta = targetScrollFractionRef.current - currentScrollFractionRef.current;
      currentScrollFractionRef.current += delta * LERP_FACTOR;

      if (Math.abs(delta) < 0.00001) {
        currentScrollFractionRef.current = targetScrollFractionRef.current;
      }

      const rawIndex = currentScrollFractionRef.current * (TOTAL_FRAMES - 1);
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(rawIndex))
      );

      drawFrame(frameIndex);

      animationFrameId = requestAnimationFrame(renderLoop);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('scroll', updateSectionScrollProgress, { passive: true });

    updateSectionScrollProgress();
    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', updateSectionScrollProgress);
      cancelAnimationFrame(animationFrameId);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[450vh] bg-black">
      {/* Sticky Inner Viewport Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        
        {/* Layer 1: Radial Charcoal Illumination Glow */}
        <div className="hero-bg-glow" />

        {/* Layer 2: Frame-by-Frame Canvas */}
        <canvas id="scroll-canvas" ref={canvasRef} />

        {/* Layer 3: Side Typography Overlay */}
        <div className="banner-overlay">
          <div className="banner-container">
            
            {/* LEFT ZONE: HI, I'M Section */}
            <div className="hero-left">
              <div className="grunge-title left-title">
                <span className="line">HI, I</span>
                <span className="line">I'M</span>
              </div>

              <div className="subtext-block">
                <svg className="cross-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                <div className="v-divider" />
                <div className="subtext-content">
                  <span>RAW ENERGY.</span>
                  <span>REAL MOVEMENT.</span>
                  <span>NO LIMITS.</span>
                </div>
              </div>
            </div>

            {/* RIGHT ZONE: KING RAGNAR Section */}
            <div className="hero-right">
              <div className="ragnar-title-wrapper">
                <div className="grunge-title right-title">
                  <span className="line">KING</span>
                  <span className="line">RAGNAR</span>
                </div>
                
                {/* Paint Drips & Gold Brush Stroke SVG Underline */}
                <div className="paint-drips-container">
                  <svg className="drips-svg" viewBox="0 0 360 45" fill="#FACC15" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 18 0 L 18 16 Q 18 22 20 22 Q 22 22 22 16 L 22 0 Z" />
                    <path d="M 64 0 L 64 30 Q 64 36 67 36 Q 70 36 70 30 L 70 0 Z" />
                    <path d="M 112 0 L 112 20 Q 112 26 114 26 Q 116 26 116 20 L 116 0 Z" />
                    <path d="M 175 0 L 175 40 Q 175 46 178 46 Q 181 46 181 40 L 181 0 Z" />
                    <path d="M 245 0 L 245 26 Q 245 32 248 32 Q 251 32 251 26 L 251 0 Z" />
                    <path d="M 315 0 L 315 44 Q 315 50 318 50 Q 321 50 321 44 L 321 0 Z" />
                    <path d="M 350 0 L 350 28 Q 350 34 353 34 Q 356 34 356 28 L 356 0 Z" />
                    <path d="M 25 10 Q 170 16 355 8 Q 360 8 355 12 Q 170 22 20 14 Q 15 14 25 10 Z" opacity="0.95" />
                    <path d="M 65 20 Q 200 26 340 18 Q 345 18 340 21 Q 200 30 60 22 Q 55 22 65 20 Z" opacity="0.8" />
                  </svg>
                </div>
              </div>

              <div className="subtext-block right-subtext">
                <svg className="crown-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                </svg>
                <div className="v-divider" />
                <div className="subtext-content">
                  <span>KRUMP IS MY CROWN.</span>
                  <span>THE STREETS ARE MY STAGE.</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

